import {NextResponse} from 'next/server'
import {getDays,reservationsReady} from '@/lib/pataReservasDb'
import {staffAuthenticated} from '@/lib/pataReservasStaff'
import {operationalDay,firstPickupDate,shiftDate,todayCanary} from '@/lib/pataReservasDates'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!staffAuthenticated(request))return unauthorized()
 const today=todayCanary()
 const first=firstPickupDate()
 const from=today.slice(0,7)+'-01'
 const to=shiftDate(operationalDay(),62)
 try{
  const days=await getDays(from,to)
  return NextResponse.json({
   today,first,from,to,
   days:days.map(d=>({date:d.date,capacity:d.capacity,available:d.available,blocked:d.blocked}))
  },{headers:noStore})
 }catch(e){return fail(e)}
}
