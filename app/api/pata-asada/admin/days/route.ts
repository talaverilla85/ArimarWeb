import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {getDays,configureDay,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,dateRange,operationalDay} from '@/lib/pataReservasDates'
import {fail,noStore,parseBody,rejectOrigin,unauthorized,unavailable,str} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 const u=new URL(request.url),from=u.searchParams.get('from'),to=u.searchParams.get('to')
 if(!dateISO(from)||!dateISO(to)||!dateRange(from,to))
 return NextResponse.json({error:'Intervalo incorrecto'},{status:400,headers:noStore})
 try{return NextResponse.json({days:await getDays(from,to)},{headers:noStore})}
 catch(e){return fail(e)}
}
export async function PATCH(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request),date=a.date,capacity=a.capacity,blocked=a.blocked,note=str(a.note??'',250)
  if(!dateISO(date)||date<operationalDay()
   ||typeof capacity!=='number'||!Number.isInteger(capacity)||Number(capacity)<0||Number(capacity)>3
   ||typeof blocked!=='boolean'||note===null)
   return NextResponse.json({error:'Datos incorrectos'},{status:400,headers:noStore})
  await configureDay({date,capacity:Number(capacity),blocked,note})
  return NextResponse.json({ok:true},{headers:noStore})
 }catch(e){return fail(e)}
}
