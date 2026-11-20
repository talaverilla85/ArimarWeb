import {NextResponse} from 'next/server'
import {getDays,reservationsReady} from '@/lib/pataReservasDb'
import {staffAuthenticated} from '@/lib/pataReservasStaff'
import {operationalDay,firstPickupDate,shiftDate} from '@/lib/pataReservasDates'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!staffAuthenticated(request))return unauthorized()
 const today=operationalDay()
 const from=firstPickupDate(),to=shiftDate(today,62)
 try{
  const days=await getDays(from,to)
  return NextResponse.json({
   from,to,days:days.filter(d=>!d.blocked&&d.available>0)
    .map(d=>({date:d.date,available:d.available}))
  },{headers:noStore})
 }catch(e){return fail(e)}
}
