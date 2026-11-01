import 'server-only'
import { neon } from '@neondatabase/serverless'
function db() {
  if (!process.env.PATA_DATABASE_URL) throw new Error('PATA_DATABASE_NOT_CONFIGURED')
  return neon(process.env.PATA_DATABASE_URL)
}
export type Day = {date:string;capacity:number;occupied:number;available:number;blocked:boolean;note:string|null}
export function reservationsEnabled() { return process.env.PATA_RESERVAS_ENABLED === 'true' }
export function reservationsReady() { return reservationsEnabled() && Boolean(process.env.PATA_DATABASE_URL) }
export async function getDays(from:string,to:string):Promise<Day[]> {
  const sql=db()
  const rows=await sql`WITH calendar AS (
    SELECT generate_series(${from}::date,${to}::date,interval '1 day')::date AS d
  ), taken AS (
    SELECT pickup_date,coalesce(sum(quantity),0)::integer AS total
    FROM pata_orders WHERE pickup_date BETWEEN ${from}::date AND ${to}::date
    AND (status IN ('PAYMENT_PENDING','PAID','MANUAL_CONFIRMED','REFUND_REQUIRED')
      OR (status='HELD' AND hold_expires_at>now()))
    GROUP BY pickup_date
  )
  SELECT c.d::text AS date, coalesce(a.capacity,3)::integer AS capacity,
  coalesce(t.total,0)::integer AS occupied,
  coalesce(a.blocked,false) AS blocked,a.note
  FROM calendar c
  LEFT JOIN pata_availability_days a ON a.pickup_date=c.d
  LEFT JOIN taken t ON t.pickup_date=c.d
  ORDER BY c.d`
  return rows.map(r=>{
    const capacity=Number(r.capacity),occupied=Number(r.occupied),blocked=Boolean(r.blocked)
    return {date:String(r.date),capacity,occupied,blocked,
      available:blocked?0:Math.max(0,capacity-occupied),note:r.note?String(r.note):null}
  })
}
export async function makeHold(a:{
 date:string;quantity:number;name:string;email:string;phone:string;notes:string;key:string
}) {
 const sql=db()
 const rows=await sql`SELECT * FROM pata_make_hold(${a.date}::date,${a.quantity},
 ${a.name},${a.email},${a.phone},${a.notes},${a.key}::uuid)`
 return {id:String(rows[0].order_id),holdUntil:String(rows[0].hold_until)}
}
export async function manualBooking(a:{
 date:string;quantity:number;name:string;phone:string;notes:string
}){
 const sql=db()
 const rows=await sql`SELECT pata_manual_booking(${a.date}::date,${a.quantity},
 ${a.name},${a.phone},${a.notes}) AS id`
 return String(rows[0].id)
}
export async function configureDay(a:{date:string;capacity:number;blocked:boolean;note:string}){
 const sql=db()
 await sql`SELECT pata_configure_day(${a.date}::date,${a.capacity},${a.blocked},${a.note})`
}
export async function getOrders(from:string,to:string) {
 const sql=db()
 return await sql`SELECT id::text,pickup_date::text AS date,quantity,
 customer_name AS name,customer_phone AS phone,customer_email AS email,
 notes,status,source,created_at::text AS created
 FROM pata_orders WHERE pickup_date BETWEEN ${from}::date AND ${to}::date
 ORDER BY pickup_date,created_at DESC LIMIT 500`
}


/**
 * Encargos aptos para cocina: pagos MONEI confirmados o encargos
 * introducidos expresamente por el personal. Nunca HELD/PAYMENT_PENDING.
 * Orden estable (fecha de recogida, fecha de creación, id) para paginación.
 */
export type ConfirmedPataOrder = {
 id:string;date:string;quantity:number;name:string;
 phone:string|null;email:string|null;notes:string|null;
 source:'WEB'|'MANUAL';status:'PAID'|'MANUAL_CONFIRMED';
 created:string;amountCents:number;
}
function normalizeConfirmed(row:Record<string,unknown>):ConfirmedPataOrder {
 return {
  id:String(row.id),date:String(row.date),quantity:Number(row.quantity),
  name:String(row.name),phone:row.phone==null?null:String(row.phone),
  email:row.email==null?null:String(row.email),notes:row.notes==null?null:String(row.notes),
  source:row.source as ConfirmedPataOrder['source'],
  status:row.status as ConfirmedPataOrder['status'],
  created:String(row.created),amountCents:Number(row.amount_cents)
 }
}
export type PataOrderCursor = {date:string;created:string;id:string}
export async function getUpcomingConfirmedOrders(
 from:string,cursor:PataOrderCursor|null,limit=40
):Promise<{orders:ConfirmedPataOrder[];next:PataOrderCursor|null}>{
 const sql=db()
 const cursorDate=cursor?.date??null
 const cursorCreated=cursor?.created??null
 const cursorId=cursor?.id??null
 const rows=await sql`SELECT id::text AS id,pickup_date::text AS date,quantity,
  customer_name AS name,customer_phone AS phone,customer_email AS email,
  notes,source,status,created_at::text AS created,amount_cents
  FROM pata_orders
  WHERE pickup_date>=${from}::date AND status IN ('PAID','MANUAL_CONFIRMED')
  AND (${cursorDate}::date IS NULL
   OR (pickup_date,created_at,id) > (${cursorDate}::date,${cursorCreated}::timestamptz,${cursorId}::uuid))
  ORDER BY pickup_date ASC,created_at ASC,id ASC LIMIT ${limit+1}`
 const more=rows.length>limit
 const orders=rows.slice(0,limit).map(r=>normalizeConfirmed(r as Record<string,unknown>))
 const last=orders.at(-1)
 return {orders,next:more&&last?{date:last.date,created:last.created,id:last.id}:null}
}

export async function getConfirmedOrdersForIntegration(from:string,to:string) {
 const sql=db()
 const rows=await sql`SELECT id::text AS id,pickup_date::text AS date,quantity,
  customer_name AS name,customer_phone AS phone,customer_email AS email,
  notes,source,status,created_at::text AS created,amount_cents
  FROM pata_orders
  WHERE pickup_date BETWEEN ${from}::date AND ${to}::date
   AND status IN ('PAID','MANUAL_CONFIRMED')
  ORDER BY pickup_date,created_at,id LIMIT 500`
 return rows.map(r=>normalizeConfirmed(r as Record<string,unknown>))
}
