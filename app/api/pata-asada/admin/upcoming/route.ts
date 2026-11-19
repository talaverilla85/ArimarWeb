import {NextResponse} from 'next/server'
import {validAdmin} from '@/lib/pataReservasAdmin'
import {getUpcomingConfirmedOrders,reservationsReady,type PataOrderCursor} from '@/lib/pataReservasDb'
import {dateISO,todayCanary} from '@/lib/pataReservasDates'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
function decodeCursor(encoded:string|null):PataOrderCursor|null {
 if(!encoded)return null
 if(encoded.length>400)throw new Error('INVALID_CURSOR')
 const raw:unknown=JSON.parse(Buffer.from(encoded,'base64url').toString('utf8'))
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('INVALID_CURSOR')
 const {date,created,id}=raw as Record<string,unknown>
 if(!dateISO(date)||typeof created!=='string'||created.length>80
  ||Number.isNaN(Date.parse(created))||typeof id!=='string'||!uuid.test(id))
  throw new Error('INVALID_CURSOR')
 return {date,created,id}
}
export async function GET(request:Request){
 if(!reservationsReady())return unavailable()
 if(!validAdmin(request))return unauthorized()
 const u=new URL(request.url)
 const from=u.searchParams.get('from')||todayCanary()
 if(!dateISO(from))return NextResponse.json({error:'Fecha incorrecta'},{status:400,headers:noStore})
 let cursor:PataOrderCursor|null
 try{cursor=decodeCursor(u.searchParams.get('cursor'))}
 catch{return NextResponse.json({error:'Paginación incorrecta'},{status:400,headers:noStore})}
 try{
  const result=await getUpcomingConfirmedOrders(from,cursor,40)
  const nextCursor=result.next?Buffer.from(JSON.stringify(result.next)).toString('base64url'):null
  return NextResponse.json({orders:result.orders,nextCursor},{headers:noStore})
 }catch(e){return fail(e)}
}
