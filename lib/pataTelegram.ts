import 'server-only'
import {neon} from '@neondatabase/serverless'

type AlertOrder={
 id:string;reference:string;date:string;quantity:number;
 amount:number;name:string;phone:string|null;source:string;status:string;
 staff:string|null;paymentMethod:string|null
}
const escapeHtml=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;')

function formatOrder(order:AlertOrder):string{
 const date=new Intl.DateTimeFormat('es-ES',{
  timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'
 }).format(new Date(order.date+'T12:00:00Z'))
 const total=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'})
  .format(order.amount/100)
 const origin=order.source==='WEB'?'Web (pago confirmado)':
  order.staff?'Mostrador · '+order.staff:'Administración'
 const payment=order.source==='WEB'?'Pago online confirmado':
  order.paymentMethod==='PENDING'?'Pendiente de cobro':
  order.paymentMethod==='CARD'?'Tarjeta':
  order.paymentMethod==='CASH'?'Efectivo':
  order.paymentMethod==='MONEI'?'MONEI':'Registrado manualmente'
 return [
  '🥩 <b>AriMar · Nueva reserva de pata asada</b>',
  '',
  '🧾 <b>Referencia:</b> '+escapeHtml(order.reference),
  '📅 <b>Recogida:</b> '+escapeHtml(date),
  '📦 <b>Cantidad:</b> '+order.quantity+' '+(order.quantity===1?'pata entera':'patas enteras'),
  '💶 <b>Importe:</b> '+escapeHtml(total),
  '👤 <b>Cliente:</b> '+escapeHtml(order.name),
  ...(order.phone?['☎️ <b>Teléfono:</b> '+escapeHtml(order.phone)]:[]),
  '📍 <b>Origen:</b> '+escapeHtml(origin),
  '💳 <b>Pago:</b> '+escapeHtml(payment)
 ].join('\n')
}

function telegramConfigured():{token:string;chat:string}|null{
 const token=process.env.PATA_TELEGRAM_BOT_TOKEN?.trim()||''
 const chat=process.env.PATA_TELEGRAM_CHAT_ID?.trim()||''
 if(!/^\d{6,12}:[A-Za-z0-9_-]{30,}$/.test(token)||!/^(-?\d{4,20})$/.test(chat))
  return null
 return {token,chat}
}

/** El outbox de Neon garantiza que un reintento no notifique otra vez la misma reserva. */
export async function deliverPataBookingAlerts(options?:{
 orderId?:string;limit?:number
}):Promise<{sent:number;failed:number;skipped:number;configured:boolean}>{
 const config=telegramConfigured()
 if(!config||!process.env.PATA_DATABASE_URL)
  return {sent:0,failed:0,skipped:0,configured:false}
 const sql=neon(process.env.PATA_DATABASE_URL)
 const id=options?.orderId??null
 const limit=Math.max(1,Math.min(20,options?.limit??1))
 const claims=await sql`WITH candidates AS (
   SELECT n.order_id FROM public.pata_booking_notification_queue n
   WHERE n.sent_at IS NULL
     AND n.next_attempt_at<=now()
     AND (n.claimed_at IS NULL OR n.claimed_at<now()-interval '2 minutes')
     AND (${id}::uuid IS NULL OR n.order_id=${id}::uuid)
   ORDER BY n.created_at ASC
   FOR UPDATE SKIP LOCKED LIMIT ${limit}
  )
  UPDATE public.pata_booking_notification_queue n
  SET claimed_at=now(), attempts=n.attempts+1
  FROM candidates c WHERE n.order_id=c.order_id
  RETURNING n.order_id::text AS id`
 let sent=0,failed=0,skipped=0
 for(const claimed of claims){
  const orderId=String(claimed.id)
  try{
   const rows=await sql`SELECT id::text AS id,
      reservation_reference AS reference,pickup_date::text AS date,quantity,
      amount_cents AS amount,customer_name AS name,
      customer_phone AS phone,source,status,staff_creator AS staff,
      manual_payment_method AS "paymentMethod"
      FROM public.pata_orders WHERE id=${orderId}::uuid LIMIT 1`
   const row=rows[0] as Record<string,unknown>|undefined
   if(!row||!(row.status==='PAID'||row.status==='MANUAL_CONFIRMED')){
    await sql`UPDATE public.pata_booking_notification_queue
     SET sent_at=now(),claimed_at=null,last_error='SKIPPED_NONCONFIRMED'
     WHERE order_id=${orderId}::uuid AND sent_at IS NULL`
    skipped++
    continue
   }
   const order:AlertOrder={
    id:orderId,reference:String(row.reference||''),date:String(row.date),
    quantity:Number(row.quantity),amount:Number(row.amount),
    name:String(row.name||''),phone:row.phone?String(row.phone):null,
    source:String(row.source||''),status:String(row.status),
    staff:row.staff?String(row.staff):null,
    paymentMethod:row.paymentMethod?String(row.paymentMethod):null
   }
   const controller=new AbortController()
   const timer=setTimeout(()=>controller.abort(),4500)
   let ok=false
   let reason='TELEGRAM_SEND_FAILED'
   try{
    const response=await fetch('https://api.telegram.org/bot'+config.token+'/sendMessage',{
     method:'POST',headers:{'Content-Type':'application/json'},
     body:JSON.stringify({
      chat_id:config.chat,text:formatOrder(order),parse_mode:'HTML',
      disable_web_page_preview:true
     }),signal:controller.signal,cache:'no-store'
    })
    ok=response.ok
    if(ok){
     const result:unknown=await response.json()
     ok=Boolean(result&&typeof result==='object'&&'ok' in result&&result.ok===true)
    }
    if(!ok)reason='TELEGRAM_HTTP_'+response.status
   }catch{reason='TELEGRAM_NETWORK_OR_TIMEOUT'}
   finally{clearTimeout(timer)}
   if(ok){
    await sql`UPDATE public.pata_booking_notification_queue
     SET sent_at=now(),claimed_at=null,last_error=null
     WHERE order_id=${orderId}::uuid AND sent_at IS NULL`
    sent++
   }else{
    await sql`UPDATE public.pata_booking_notification_queue
     SET claimed_at=null,last_error=${reason},
      next_attempt_at=now()+interval '5 minutes'*least(attempts,12)
     WHERE order_id=${orderId}::uuid AND sent_at IS NULL`
    failed++
    console.warn('[pata-telegram] Aviso pendiente de reintento:',reason)
   }
  }catch{
   failed++
   await sql`UPDATE public.pata_booking_notification_queue
    SET claimed_at=null,last_error='DELIVERY_ERROR',
      next_attempt_at=now()+interval '5 minutes'*least(attempts,12)
    WHERE order_id=${orderId}::uuid AND sent_at IS NULL`
   console.warn('[pata-telegram] Aviso pendiente de reintento')
  }
 }
 return {sent,failed,skipped,configured:true}
}

/** No dejar que un fallo de Telegram altere la reserva ya confirmada. */
export async function notifyConfirmedPataBooking(id:string):Promise<void>{
 try{await deliverPataBookingAlerts({orderId:id,limit:1})}
 catch{console.warn('[pata-telegram] Error no bloqueante al intentar el aviso')}
}
