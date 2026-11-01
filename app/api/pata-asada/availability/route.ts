import { NextResponse } from 'next/server'
import {getDays,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,dateRange,shiftDate,operationalDay} from '@/lib/pataReservasDates'
import {fail,noStore,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 const u=new URL(request.url)
 const from=u.searchParams.get('from')
 const to=u.searchParams.get('to')
 if(!dateISO(from)||!dateISO(to)||!dateRange(from,to)
 ||from<operationalDay()||to>shiftDate(operationalDay(),62))
 return NextResponse.json({error:'Intervalo de fechas incorrecto'},{status:400,headers:noStore})
 try{return NextResponse.json({days:await getDays(from,to)},{headers:noStore})}
 catch(e){return fail(e)}
}
