import {NextResponse} from 'next/server'
import {createHash,timingSafeEqual} from 'node:crypto'
import {deliverPataBookingAlerts} from '@/lib/pataTelegram'
import {noStore} from '@/lib/pataReservasHttp'

export const dynamic='force-dynamic'
export const maxDuration=30

function authorized(request:Request):boolean{
 const secret=process.env.CRON_SECRET
 const value=request.headers.get('authorization')||''
 if(!secret||secret.length<32||!value.startsWith('Bearer '))return false
 const supplied=value.slice(7)
 if(supplied.length<32||supplied.length>256)return false
 const hash=(s:string)=>createHash('sha256').update(s).digest()
 return timingSafeEqual(hash(secret),hash(supplied))
}

export async function GET(request:Request){
 if(!authorized(request))
  return NextResponse.json({error:'No autorizado'},{status:401,headers:noStore})
 try{
  const result=await deliverPataBookingAlerts({limit:15})
  return NextResponse.json({ok:true,...result},{headers:noStore})
 }catch{
  console.warn('[pata-telegram] No se ha podido procesar la cola')
  return NextResponse.json({error:'No se pudo procesar la cola'},
   {status:503,headers:noStore})
 }
}
