import {NextResponse} from 'next/server'
import {createHash,timingSafeEqual} from 'node:crypto'
import {emailDeliveryReady,sendJob} from '@/lib/pataMail'
import {claimEmail,finishEmail} from '@/lib/pataCheckoutDb'
import {noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export const maxDuration=30
function verifiedBearer(request:Request){
 const secret=process.env.PATA_EMAIL_WORKER_SECRET||''
 const auth=request.headers.get('authorization')||''
 if(!secret||!auth.startsWith('Bearer '))return false
 const a=createHash('sha256').update(secret).digest()
 const b=createHash('sha256').update(auth.slice(7)).digest()
 return timingSafeEqual(a,b)
}
// Connect an authenticated scheduler ONLY after testing provider credentials.
export async function POST(request:Request){
 if(!emailDeliveryReady())return unavailable()
 if(!verifiedBearer(request))return unauthorized()
 let sent=0,failed=0
 try{
  for(let i=0;i<4;i++){
   const job=await claimEmail()
   if(!job)break
   try{
    const messageId=await sendJob(job)
    if(await finishEmail(job.id,job.attempt,true,messageId))sent++
   }catch(e){
    failed++
    console.error('[pata-email-worker]',job.id,e instanceof Error?e.message:'provider failure')
    await finishEmail(job.id,job.attempt,false,null)
   }
  }
  return NextResponse.json({processed:sent+failed,sent,failed},{headers:noStore})
 }catch(e){
  console.error('[pata-email-worker]',e instanceof Error?e.message:'database')
  return NextResponse.json({error:'No se pudo completar la entrega'},{status:503,headers:noStore})
 }
}
