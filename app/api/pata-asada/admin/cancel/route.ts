import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {getDays,reservationsReady} from '@/lib/pataReservasDb'
import {cancelManualBooking,verifyManualCancellation} from '@/lib/pataReservasStaffDb'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export async function POST(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const data=await parseBody(request)
  const id=data.id,reason=str(data.reason,150)
  if(typeof id!=='string'||!uuid.test(id))
   return NextResponse.json({error:'No se reconoce el identificador interno de esta reserva. Actualiza el calendario e inténtalo de nuevo.'},
    {status:400,headers:noStore})
  if(!reason||reason.length<5)
   return NextResponse.json({error:'Escribe un motivo de anulación de al menos 5 caracteres.'},
    {status:400,headers:noStore})
  const status=await cancelManualBooking(id,reason)
  if(status==='ALREADY_CANCELED')
   return NextResponse.json({error:'Esta reserva ya está anulada. Actualiza el calendario.'},
    {status:409,headers:noStore})
  if(status!=='CANCELED')throw Error('PATA_CANCEL_NOT_CONFIRMED')
  const {date,quantity}=await verifyManualCancellation(id)
  const [day]=await getDays(date,date)
  if(!day)throw Error('PATA_CANCEL_NOT_CONFIRMED')
  return NextResponse.json({status,verified:true,date,quantity,capacity:day.capacity,
   occupied:day.occupied,available:day.available,blocked:day.blocked},
   {headers:noStore})
 }catch(e){
  const err=e as {code?:string;message?:string}
  console.error('[pata-admin-cancel] failure',err?.code||'unknown',
   /PATA_[A-Z_]+/.exec(err?.message||'')?.[0]||'database-or-request')
  return fail(e)
 }
}
