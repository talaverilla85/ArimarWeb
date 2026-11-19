import {NextResponse} from 'next/server'
import {checkoutReady,createTestPayment,verifyCheckoutToken} from '@/lib/pataMonei'
import {beginCheckout,attachPayment} from '@/lib/pataCheckoutDb'
import {validOrigin} from '@/lib/pataReservasAdmin'
import {fail,noStore,parseBody,rejectOrigin,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
export async function POST(request:Request){
 if(!checkoutReady())return unavailable()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request)
  if(typeof a.id!=='string'||!uuid.test(a.id)||typeof a.key!=='string'
   ||!uuid.test(a.key)||typeof a.checkoutToken!=='string'
   ||!verifyCheckoutToken(a.id,a.key,a.checkoutToken))
    return NextResponse.json({error:'Reserva no autorizada.'},{status:403,headers:noStore})
  // First call persists PAYMENT_PENDING in Postgres. Concurrent/ambiguous
  // calls never open another MONEI payment for the same reservation.
  const order=await beginCheckout(a.id)
  if(order.phase==='EXISTING'&&order.redirectUrl)
   return NextResponse.json({redirectUrl:order.redirectUrl},{headers:noStore})
  if(order.phase!=='NEW')throw Error('PATA_CHECKOUT_IN_PROGRESS_OR_EXPIRED')
  const payment=await createTestPayment({
   orderId:order.orderCode,amount:order.amount,name:order.name,email:order.email
  })
  await attachPayment(order.orderCode,payment.paymentId,payment.url,order.amount)
  return NextResponse.json({redirectUrl:payment.url},{headers:noStore})
 }catch(e){return fail(e)}
}
