import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {manualBooking,reservationsReady,type ManualPaymentMethod} from '@/lib/pataReservasDb'
import {dateISO,operationalDay,todayCanary} from '@/lib/pataReservasDates'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const methods:ManualPaymentMethod[]=['PENDING','CARD','CASH','MONEI']
export async function POST(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request),date=a.date,quantity=a.quantity
  const name=str(a.name,100),phone=str(a.phone,30),notes=str(a.notes??'',500)
  const paymentMethod=a.paymentMethod
  const paymentDate=a.paymentDate??null
  const paymentReceipt=str(a.paymentReceipt??'',100)
  if(!dateISO(date)||date<operationalDay()
   ||typeof quantity!=='number'||!Number.isInteger(quantity)||quantity<1||quantity>3
   ||!name||name.length<2||!phone||phone.replace(/\D/g,'').length<6||notes===null
   ||typeof paymentMethod!=='string'||!methods.includes(paymentMethod as ManualPaymentMethod)
   ||paymentReceipt===null
   ||(paymentMethod==='PENDING'&&(paymentDate!==null||paymentReceipt!==''))
   ||(paymentMethod!=='PENDING'&&(!dateISO(paymentDate)||paymentDate>todayCanary()||!paymentReceipt)))
    return NextResponse.json({error:'Revisa los datos: teléfono obligatorio. Si hay un cobro, indica la fecha y el número de ticket o factura.'},
     {status:400,headers:noStore})
  const result=await manualBooking({
   date,quantity,name,phone,notes,
   paymentMethod:paymentMethod as ManualPaymentMethod,
   paymentDate:paymentMethod==='PENDING'?null:paymentDate as string,
   paymentReceipt:paymentMethod==='PENDING'?null:paymentReceipt
  })
  return NextResponse.json({
   ...result,status:'MANUAL_CONFIRMED',manualPaymentMethod:paymentMethod,
   manualPaymentDate:paymentMethod==='PENDING'?null:paymentDate,
   manualPaymentReceipt:paymentMethod==='PENDING'?null:paymentReceipt
  },{status:201,headers:noStore})
 }catch(e){return fail(e)}
}
