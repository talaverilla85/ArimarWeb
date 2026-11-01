import {NextResponse} from 'next/server'
import {makeHold,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,firstPickupDate,shiftDate,operationalDay} from '@/lib/pataReservasDates'
import {fail,noStore,parseBody,rejectOrigin,str,unavailable} from '@/lib/pataReservasHttp'
import {validOrigin} from '@/lib/pataReservasAdmin'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 if(!reservationsReady()||process.env.PATA_PUBLIC_HOLDS_ENABLED!=='true')return unavailable()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const a=await parseBody(request)
  const date=a.date
  const quantity=a.quantity
  const name=str(a.name,100),email=str(a.email,254),phone=str(a.phone,30),notes=str(a.notes??'',500)
  const key=a.key
  if(!dateISO(date)||date<firstPickupDate()||date>shiftDate(operationalDay(),62)
   ||!Number.isInteger(quantity)||Number(quantity)<1||Number(quantity)>3
   ||!name||name.length<2||!email||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
   ||!phone||phone.replace(/\D/g,'').length<6
   ||notes===null||typeof key!=='string'
   ||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(key)){
   return NextResponse.json({error:'Revisa fecha, unidades y datos de contacto.'},
      {status:400,headers:noStore})
  }
  const hold=await makeHold({date,quantity:Number(quantity),name,email,phone,notes,key})
  return NextResponse.json({id:hold.id,holdUntil:hold.holdUntil,
     status:'HELD',checkoutAvailable:false},{status:201,headers:noStore})
 }catch(e){return fail(e)}
}
