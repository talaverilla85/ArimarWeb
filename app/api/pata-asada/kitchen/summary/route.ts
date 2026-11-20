import {NextResponse} from 'next/server'
import {getConfirmedPataDayTotals,reservationsReady} from '@/lib/pataReservasDb'
import {noStore} from '@/lib/pataReservasHttp'

export const dynamic='force-dynamic'
const headers={...noStore,'X-Robots-Tag':'noindex, nofollow'}

export async function GET(){
 if(!reservationsReady())
  return NextResponse.json({error:'Reservas no disponibles'},{status:503,headers})
 try{
  const days=await getConfirmedPataDayTotals()
  return NextResponse.json({days},{headers})
 }catch{
  return NextResponse.json({error:'No se pudo consultar el resumen'},{status:503,headers})
 }
}
