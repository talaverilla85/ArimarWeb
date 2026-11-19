import {NextResponse} from 'next/server'
import {checkoutReady,verifyMoneiSignature,callbackHash} from '@/lib/pataMonei'
import {applyMoneiPayment} from '@/lib/pataCheckoutDb'
import {noStore,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 if(!checkoutReady())return unavailable()
 const raw=await request.text()
 const signature=request.headers.get('monei-signature')||''
 if(!verifyMoneiSignature(raw,signature))
  return NextResponse.json({error:'Firma no válida'},{status:401,headers:noStore})
 let p:unknown
 try{p=JSON.parse(raw)}
 catch{return NextResponse.json({error:'JSON incorrecto'},{status:400,headers:noStore})}
 if(!p||typeof p!=='object'||Array.isArray(p))
  return NextResponse.json({error:'Pago incorrecto'},{status:400,headers:noStore})
 const data=p as Record<string,unknown>
 if(typeof data.id!=='string'||!data.id||data.id.length>100
  ||typeof data.orderId!=='string'||data.orderId.length>40
  ||typeof data.status!=='string'||typeof data.amount!=='number'
  ||!Number.isInteger(data.amount)||data.currency!=='EUR'||data.livemode!==false)
  return NextResponse.json({error:'Datos de pago incompatibles'},{status:400,headers:noStore})
 try{
  const result=await applyMoneiPayment({
   orderId:data.orderId,paymentId:data.id,status:data.status,
   amount:data.amount,currency:'EUR',livemode:false,hash:callbackHash(raw)
  })
  return NextResponse.json({received:true,result},{headers:noStore})
 }catch(e){
  console.error('[pata-monei-callback]',e instanceof Error?e.message:'database')
  // Non-2xx => provider retries signed notification.
  return NextResponse.json({error:'Procesamiento pendiente de conciliación'},
   {status:503,headers:noStore})
 }
}
