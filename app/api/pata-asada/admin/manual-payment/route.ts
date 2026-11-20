import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {completeManualPayment,reservationsReady,type ManualPaymentMethod} from '@/lib/pataReservasDb'
import {dateISO,todayCanary} from '@/lib/pataReservasDates'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const methods=['CARD','CASH','MONEI']
export async function PATCH(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request)
  const id=a.id,method=a.paymentMethod,day=a.paymentDate,receipt=str(a.paymentReceipt,100)
  if(typeof id!=='string'||!uuid.test(id)
   ||typeof method!=='string'||!methods.includes(method)
   ||!dateISO(day)||day>todayCanary()||!receipt)
   return NextResponse.json({
    error:'Indica un método de pago, una fecha válida y el número de ticket/factura.'
   },{status:400,headers:noStore})
  const reference=await completeManualPayment({
   id,paymentMethod:method as Exclude<ManualPaymentMethod,'PENDING'>,
   paymentDate:day,paymentReceipt:receipt
  })
  return NextResponse.json({reference,updated:true},{headers:noStore})
 }catch(e){return fail(e)}
}
