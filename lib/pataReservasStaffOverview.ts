import 'server-only'
import {neon} from '@neondatabase/serverless'
import {shiftDate,todayCanary} from '@/lib/pataReservasDates'

export type StaffOrderSummary={
 id:string;date:string;quantity:number;name:string;phone:string|null;
 reference:string|null;staffCreator:string|null;
 status:'PAID'|'MANUAL_CONFIRMED'|'CANCELED';source:'WEB'|'MANUAL';
 paymentMethod:'PENDING'|'CASH'|'CARD'|'MONEI'|null;
 paymentDate:string|null;paymentReceipt:string|null
}

function normalize(row:Record<string,unknown>):StaffOrderSummary{
 return {
  id:String(row.id),date:String(row.date),quantity:Number(row.quantity),
  name:String(row.name),phone:row.phone==null?null:String(row.phone),
  reference:row.reference==null?null:String(row.reference),
  staffCreator:row.staffCreator==null?null:String(row.staffCreator),
  status:row.status as StaffOrderSummary['status'],
  source:row.source as StaffOrderSummary['source'],
  paymentMethod:row.paymentMethod==null?null:row.paymentMethod as StaffOrderSummary['paymentMethod'],
  paymentDate:row.paymentDate==null?null:String(row.paymentDate),
  paymentReceipt:row.paymentReceipt==null?null:String(row.paymentReceipt)
 }
}

/**
 * Vista de consulta del mostrador: reservas confirmadas futuras y 40 movimientos
 * recientes (anulados o con fecha de recogida ya pasada).
 * No devuelve notas, correo ni datos internos del administrador.
 */
export async function getStaffOrderOverview(){
 if(!process.env.PATA_DATABASE_URL)throw Error('PATA_DATABASE_NOT_CONFIGURED')
 const sql=neon(process.env.PATA_DATABASE_URL)
 const today=todayCanary()
 const historyFrom=shiftDate(today,-30)
 const futureTo=shiftDate(today,63)
 const [activeRows,historyRows]=await Promise.all([
  sql`SELECT id::text AS id,pickup_date::text AS date,quantity,
    customer_name AS name,customer_phone AS phone,
    reservation_reference AS reference,staff_creator AS "staffCreator",
    status,source,manual_payment_method AS "paymentMethod",
    manual_payment_date::text AS "paymentDate",
    manual_payment_receipt AS "paymentReceipt"
   FROM pata_orders
   WHERE pickup_date BETWEEN ${today}::date AND ${futureTo}::date
     AND status IN ('PAID','MANUAL_CONFIRMED')
   ORDER BY pickup_date ASC,created_at ASC,id ASC LIMIT 250`,
  sql`SELECT id::text AS id,pickup_date::text AS date,quantity,
    customer_name AS name,customer_phone AS phone,
    reservation_reference AS reference,staff_creator AS "staffCreator",
    status,source,manual_payment_method AS "paymentMethod",
    manual_payment_date::text AS "paymentDate",
    manual_payment_receipt AS "paymentReceipt"
   FROM pata_orders
   WHERE pickup_date BETWEEN ${historyFrom}::date AND ${futureTo}::date
    AND (status='CANCELED' OR
      (pickup_date < ${today}::date AND status IN ('PAID','MANUAL_CONFIRMED')))
   ORDER BY pickup_date DESC,created_at DESC,id DESC LIMIT 40`
 ])
 return {active:activeRows.map(r=>normalize(r as Record<string,unknown>)),
  history:historyRows.map(r=>normalize(r as Record<string,unknown>))}
}
