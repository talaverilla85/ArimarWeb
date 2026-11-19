import 'server-only'
import {siteConfig} from '@/lib/siteConfig'
import type {EmailJob} from '@/lib/pataCheckoutDb'

export function emailDeliveryReady(){
 return process.env.VERCEL_ENV==='preview'
  &&process.env.PATA_EMAIL_DELIVERY_ENABLED==='true'
  &&(process.env.PATA_RESEND_API_KEY||'').startsWith('re_')
  &&Boolean(process.env.PATA_EMAIL_FROM)
  &&(process.env.PATA_EMAIL_WORKER_SECRET||'').length>=32
  &&Boolean(process.env.PATA_EMAIL_INTERNAL_TO)
}
function escape(v:string){
 return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c))
}
function displayDate(iso:string){
 return new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',weekday:'long',day:'numeric',
  month:'long',year:'numeric'}).format(new Date(iso+'T12:00:00Z'))
}
function makeContent(job:EmailJob){
 const date=displayDate(job.date)
 const name=job.customerName
 const qty=job.quantity
 const amount=(job.amount/100).toLocaleString('es-ES',{style:'currency',currency:'EUR'})
 const address=[siteConfig.address.street,siteConfig.address.postalCode,
  siteConfig.address.locality,'Gran Canaria'].join(', ')
 const title='Reserva '+job.reference+' confirmada · AriMar'
 const text=[
  'Hola '+name+':','','Tu reserva de pata asada de AriMar está CONFIRMADA y el pago se ha registrado correctamente.','',
  'Número de reserva: '+job.reference,
  'Producto: pata asada canaria entera, asada y con hueso',
  'Cantidad: '+qty,
  'Total pagado: '+amount,
  'Fecha de recogida: '+date,
  'Horario de recogida: 11:30 a 16:00 h',
  'Dirección: '+address,'',
  'La pata se entrega entera, con hueso, sin cortar.',
  'Para modificar o consultar tu encargo, escribe a '+siteConfig.legal.email+' indicando tu número de reserva.',
  'Condiciones de anulación y reembolso: https://'+siteConfig.domain+'/legal/pedidos-reembolsos','',
  'Gracias por confiar en AriMar.'
 ].join('\n')
 const html=[
  '<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1e293b;max-width:600px;margin:auto">',
  '<p style="font-weight:800;color:#207f85">AriMar · 100 % sin gluten</p>',
  '<h1 style="font-size:26px">¡Tu pata asada está confirmada!</h1>',
  '<p>Hola '+escape(name)+', tu pago está confirmado y ya tenemos tu encargo.</p>',
  '<p style="background:#f1f8f7;border-radius:12px;padding:18px"><strong>Número de reserva</strong><br>',
  '<span style="font-size:24px;font-weight:800">'+escape(job.reference)+'</span></p>',
  '<p>Producto: <b>Pata asada entera con hueso</b></p>',
  '<p>Unidades: <b>'+qty+'</b> · Importe pagado: <b>'+escape(amount)+'</b></p>',
  '<p>Recogida: <b>'+escape(date)+'</b> · Horario: <b>11:30–16:00 h</b></p>',
  '<p>Dirección: '+escape(address)+'</p>',
  '<p>Se entrega entera, con hueso y sin lonchear.</p>',
  '<p>Para cualquier cambio, escribe a '+escape(siteConfig.legal.email)+' indicando tu referencia.',
  ' Consulta las <a href="https://'+siteConfig.domain+'/legal/pedidos-reembolsos">',
  'condiciones de anulación y reembolso</a>.</p>',
  '<p>Gracias por confiar en AriMar.</p></div>'
 ].join('')
 return {title,text,html}
}
export async function sendJob(job:EmailJob){
 const internal=job.kind==='ARI_INTERNAL'
 const content=makeContent(job)
 const recipient=internal?process.env.PATA_EMAIL_INTERNAL_TO:job.email
 if(!recipient)throw Error('PATA_EMAIL_RECIPIENT_MISSING')
 const payload=internal?{
  from:process.env.PATA_EMAIL_FROM,to:[recipient],
  subject:'Nuevo encargo PAGADO '+job.reference+' · '+job.quantity+' patas',
  text:[
   'Pago confirmado por MONEI. Encargo para cocina.',
   'Referencia: '+job.reference,'Cliente: '+job.customerName,
   'Fecha: '+job.date,'Patas: '+job.quantity,
   'Total: '+job.amount/100+' EUR',
   'Comprobar el estado actual en el panel antes de preparar.'
  ].join('\n'),
 }:{
  from:process.env.PATA_EMAIL_FROM,to:[recipient],
  subject:content.title,text:content.text,html:content.html
 }
 const response=await fetch('https://api.resend.com/emails',{
  method:'POST',cache:'no-store',signal:AbortSignal.timeout(12000),
  headers:{
   Authorization:'Bearer '+process.env.PATA_RESEND_API_KEY,
   'Content-Type':'application/json',
   'Idempotency-Key':'arimar-pata-'+job.id
  },body:JSON.stringify(payload)
 })
 if(!response.ok)throw Error('PATA_EMAIL_PROVIDER_'+response.status)
 const result=await response.json() as {id?:string}
 if(!result?.id)throw Error('PATA_EMAIL_PROVIDER_NO_ID')
 return result.id
}
