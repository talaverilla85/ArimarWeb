import {NextResponse} from 'next/server'
import {validAdmin} from '@/lib/pataReservasAdmin'
import {getOrders,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,dateRange} from '@/lib/pataReservasDates'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 const u=new URL(request.url),from=u.searchParams.get('from'),to=u.searchParams.get('to')
 if(!dateISO(from)||!dateISO(to)||!dateRange(from,to))
 return NextResponse.json({error:'Intervalo incorrecto'},{status:400,headers:noStore})
 try{return NextResponse.json({orders:await getOrders(from,to)},{headers:noStore})}
 catch(e){return fail(e)}
}
