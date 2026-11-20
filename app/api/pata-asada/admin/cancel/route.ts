import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {reservationsReady} from '@/lib/pataReservasDb'
import {cancelManualBooking} from '@/lib/pataReservasStaffDb'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export async function POST(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const data=await parseBody(request)
  const id=data.id,reason=str(data.reason,150)
  if(typeof id!=='string'||!uuid.test(id)||!reason||reason.length<5)
   return NextResponse.json({error:'Indica la reserva y un motivo de al menos 5 caracteres.'},
    {status:400,headers:noStore})
  const status=await cancelManualBooking(id,reason)
  return NextResponse.json({status},{headers:noStore})
 }catch(e){return fail(e)}
}
