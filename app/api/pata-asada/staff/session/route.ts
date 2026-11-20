import {NextResponse} from 'next/server'
import {reservationsReady} from '@/lib/pataReservasDb'
import {clearStaffCookie,setStaffCookie,staffAuthenticated,staffConfigured,staffPasswordCorrect} from '@/lib/pataReservasStaff'
import {noStore,parseBody,rejectOrigin,unavailable} from '@/lib/pataReservasHttp'
import {validOrigin} from '@/lib/pataReservasAdmin'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 return NextResponse.json({authenticated:reservationsReady()&&staffAuthenticated(request)},{headers:noStore})
}
export async function POST(request:Request){
 if(!reservationsReady()||!staffConfigured())return unavailable()
 if(!validOrigin(request))return rejectOrigin()
 try{
  const body=await parseBody(request)
  const password=typeof body.password==='string'?body.password.slice(0,512):''
  if(!staffPasswordCorrect(password))
   return NextResponse.json({error:'Contraseña de mostrador incorrecta'},{status:401,headers:noStore})
  const response=NextResponse.json({authenticated:true},{headers:noStore})
  setStaffCookie(response)
  return response
 }catch{
  return NextResponse.json({error:'Datos de acceso incorrectos'},{status:400,headers:noStore})
 }
}
export async function DELETE(request:Request){
 if(!validOrigin(request))return rejectOrigin()
 const response=NextResponse.json({authenticated:false},{headers:noStore})
 clearStaffCookie(response)
 return response
}
