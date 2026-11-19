import {NextResponse} from 'next/server'
import {reservationsReady} from '@/lib/pataReservasDb'
import {adminConfigured,clearAdminCookie,passwordCorrect,setAdminCookie,validAdmin,validOrigin} from '@/lib/pataReservasAdmin'
import {noStore,parseBody,rejectOrigin,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 return NextResponse.json({authenticated:reservationsReady()&&validAdmin(request)},{headers:noStore})
}
export async function POST(request:Request){
 if(!reservationsReady()||!adminConfigured())return unavailable()
 if(!validOrigin(request))return rejectOrigin()
 let password=''
 try{const body=await parseBody(request);if(typeof body.password==='string')password=body.password.slice(0,512)}
 catch{return NextResponse.json({error:'Solicitud incorrecta'},{status:400,headers:noStore})}
 if(!passwordCorrect(password))return NextResponse.json({error:'Contraseña incorrecta'},{status:401,headers:noStore})
 const r=NextResponse.json({authenticated:true},{headers:noStore})
 setAdminCookie(r)
 return r
}
export async function DELETE(request:Request){
 if(!validOrigin(request))return rejectOrigin()
 const r=NextResponse.json({authenticated:false},{headers:noStore})
 clearAdminCookie(r)
 return r
}
