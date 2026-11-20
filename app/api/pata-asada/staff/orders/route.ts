import {NextResponse} from 'next/server'
import {staffAuthenticated} from '@/lib/pataReservasStaff'
import {getStaffOrderOverview} from '@/lib/pataReservasStaffOverview'
import {reservationsReady} from '@/lib/pataReservasDb'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'

export const dynamic='force-dynamic'

export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!staffAuthenticated(request))return unauthorized()
 try{
  const data=await getStaffOrderOverview()
  return NextResponse.json(data,{headers:noStore})
 }catch(e){return fail(e)}
}
