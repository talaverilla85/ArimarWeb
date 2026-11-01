import {NextResponse} from 'next/server'
import {validInternalOrdersToken} from '@/lib/pataReservasInternalAuth'
import {getConfirmedOrdersForIntegration,reservationsReady} from '@/lib/pataReservasDb'
import {dateISO,dateRange} from '@/lib/pataReservasDates'
import {fail,noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function GET(request:Request){
 if(!reservationsReady()||process.env.PATA_INTERNAL_ORDERS_ENABLED!=='true')return unavailable()
 if(!validInternalOrdersToken(request))return unauthorized()
 const url=new URL(request.url)
 const from=url.searchParams.get('from'),to=url.searchParams.get('to')
 const view=url.searchParams.get('view')||'summary'
 if(!dateISO(from)||!dateISO(to)||!dateRange(from,to,31)
  ||!['summary','detail'].includes(view))
  return NextResponse.json({error:'Consulta incorrecta. Intervalo máximo: 32 días.'},
  {status:400,headers:noStore})
 try{
  const confirmed=await getConfirmedOrdersForIntegration(from,to)
  if(view==='detail'){
   return NextResponse.json({
    version:1,from,to,orders:confirmed.map(o=>({
     id:o.id,pickupDate:o.date,quantity:o.quantity,
     customerName:o.name,source:o.source,status:o.status,
     amountCents:o.amountCents,notes:o.notes
    }))
   },{headers:noStore})
  }
  const totals=new Map<string,{pickupDate:string;orders:number;units:number}>()
  for(const order of confirmed){
   const item=totals.get(order.date)||{pickupDate:order.date,orders:0,units:0}
   item.orders+=1;item.units+=order.quantity;totals.set(order.date,item)
  }
  return NextResponse.json({
   version:1,from,to,days:[...totals.values()],totalOrders:confirmed.length,
   totalUnits:confirmed.reduce((n,o)=>n+o.quantity,0)
  },{headers:noStore})
 }catch(e){return fail(e)}
}
