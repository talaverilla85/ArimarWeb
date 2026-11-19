import { NextResponse } from 'next/server'
import {getDays,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,dateRange,shiftDate,operationalDay} from '@/lib/pataReservasDates'
import {fail,noStore,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady()||process.env.NEXT_PUBLIC_PATA_CALENDAR_PREVIEW!=='true')return unavailable()
 const u=new URL(request.url)
 const from=u.searchParams.get('from'),to=u.searchParams.get('to')
 const today=operationalDay()
 if(!dateISO(from)||!dateISO(to)||!dateRange(from,to)
  ||from<today||to>shiftDate(today,62))
 return NextResponse.json({error:'Intervalo de fechas incorrecto'},{status:400,headers:noStore})
 try{
  const days=await getDays(from,to)
  // Respuesta estrictamente pública: sin notas internas, nombres,
  // fechas bloqueadas o completas, ni referencias de encargos.
  return NextResponse.json({
   days:days.filter(d=>!d.blocked&&d.available>0)
    .map(d=>({date:d.date,available:d.available}))
  },{headers:noStore})
 }catch(e){return fail(e)}
}
