import {NextResponse} from 'next/server'
import {validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {manualBooking,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,operationalDay,shiftDate} from '@/lib/pataReservasDates'
import {fail,noStore,parseBody,rejectOrigin,str,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request),date=a.date,quantity=a.quantity
  const name=str(a.name,100),phone=str(a.phone??'',30),notes=str(a.notes??'',500)
  if(!dateISO(date)||date<operationalDay()||date>shiftDate(operationalDay(),365)
   ||typeof quantity!=='number'||!Number.isInteger(quantity)||Number(quantity)<1||Number(quantity)>3
   ||!name||name.length<2||phone===null||notes===null)
  return NextResponse.json({error:'Datos incorrectos'},{status:400,headers:noStore})
  const id=await manualBooking({date,quantity:Number(quantity),name,phone,notes})
  return NextResponse.json({id,status:'MANUAL_CONFIRMED'},{status:201,headers:noStore})
 }catch(e){return fail(e)}
}
