import {NextResponse} from 'next/server'
import {staffAuthenticated} from '@/lib/pataReservasStaff'
import {parseReviewEmail} from '@/lib/pataReviewEmail'
import {bookFromCounter} from '@/lib/pataReservasStaffDb'
import {reservationsReady} from '@/lib/pataReservasDb'
import {firstPickupDate,operationalDay,shiftDate,dateISO,todayCanary} from '@/lib/pataReservasDates'
import {validOrigin} from '@/lib/pataReservasAdmin'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export async function POST(request:Request){
 if(!reservationsReady())return unavailable()
 if(!staffAuthenticated(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const data=await parseBody(request)
  const date=data.date,quantity=data.quantity,key=data.key
  const name=str(data.name,100),phone=str(data.phone,30)
  const notes=str(data.notes??'',420),operator=str(data.operator,60)
  const review=parseReviewEmail(data)
  const paymentMethod=data.paymentMethod,paymentDate=data.paymentDate
  const paymentReceipt=str(data.paymentReceipt,100)
  const first=firstPickupDate(),last=shiftDate(operationalDay(),62)
  if(!dateISO(date)||date<first||date>last
   ||typeof quantity!=='number'||!Number.isInteger(quantity)||quantity<1||quantity>3
   ||!name||name.length<2||!phone||phone.length<6||phone.replace(/\D/g,'').length<6
   ||!operator||operator.length<2||notes===null||typeof key!=='string'||!uuid.test(key)
   ||(paymentMethod!=='CARD'&&paymentMethod!=='CASH')
   ||!dateISO(paymentDate)||paymentDate>todayCanary()||!paymentReceipt||!review)
   return NextResponse.json({error:'Revisa fecha, cliente, teléfono, empleado, forma de pago, ticket y correo electrónico si se indica.'},
    {status:400,headers:noStore})
  const order=await bookFromCounter({date,quantity,name,phone,notes,operator,key,
   paymentMethod,paymentDate,paymentReceipt,email:review!.email,reviewConsent:review!.reviewConsent})
  return NextResponse.json({
   reference:order.reference,status:'MANUAL_CONFIRMED',
   date,quantity,amountCents:quantity*9000,
   paymentStatus:'MANUALLY_RECORDED',paymentMethod,paymentDate,paymentReceipt
  },{status:201,headers:noStore})
 }catch(e){return fail(e)}
}
