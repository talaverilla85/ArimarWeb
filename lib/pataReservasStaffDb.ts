import 'server-only'
import {neon} from '@neondatabase/serverless'
export async function bookFromCounter(input:{
 date:string;quantity:number;name:string;phone:string;
 notes:string;operator:string;key:string;
 paymentMethod:'CARD'|'CASH';paymentDate:string;paymentReceipt:string;
 email:string;reviewConsent:boolean
}){
 if(!process.env.PATA_DATABASE_URL)throw Error('PATA_DATABASE_NOT_CONFIGURED')
 const db=neon(process.env.PATA_DATABASE_URL)
 const rows=await db`SELECT order_id::text AS id, reservation_ref AS reference
  FROM pata_staff_booking_paid_with_review_email(
   ${input.date}::date,${input.quantity},${input.name},
   ${input.phone},${input.notes},${input.operator},${input.key}::uuid,
   ${input.paymentMethod},${input.paymentDate}::date,${input.paymentReceipt},
   ${input.email},${input.reviewConsent})`
 if(rows.length!==1||!rows[0].id||!rows[0].reference)throw Error('PATA_STAFF_BOOKING_FAILED')
 return {id:String(rows[0].id),reference:String(rows[0].reference)}
}
/**
 * Anulación atómica y condicionada: no depende de una función SQL creada
 * por migraciones anteriores. Solo afecta a encargos manuales confirmados;
 * libera cupo sin borrar el registro ni realizar reembolsos.
 */
export async function cancelManualBooking(id:string,reason:string){
 if(!process.env.PATA_DATABASE_URL)throw Error('PATA_DATABASE_NOT_CONFIGURED')
 const db=neon(process.env.PATA_DATABASE_URL)
 const rows=await db`WITH changed AS (
   UPDATE pata_orders
   SET status='CANCELED',
       notes=left(concat_ws(chr(10),nullif(notes,''),'ANULACIÓN: '||trim(${reason})),500),
       updated_at=now()
   WHERE id=${id}::uuid AND source='MANUAL' AND status='MANUAL_CONFIRMED'
   RETURNING id
  )
  SELECT CASE
   WHEN EXISTS(SELECT 1 FROM changed) THEN 'CANCELED'
   WHEN NOT EXISTS(SELECT 1 FROM pata_orders WHERE id=${id}::uuid) THEN 'PATA_ORDER_NOT_FOUND'
   WHEN EXISTS(SELECT 1 FROM pata_orders WHERE id=${id}::uuid AND source<>'MANUAL') THEN 'PATA_MANUAL_ONLY'
   WHEN EXISTS(SELECT 1 FROM pata_orders WHERE id=${id}::uuid AND status='CANCELED') THEN 'ALREADY_CANCELED'
   ELSE 'PATA_INVALID_ORDER'
  END AS result`
 const result=String(rows[0]?.result||'PATA_CANCEL_FAILED')
 if(result.startsWith('PATA_'))throw Error(result)
 return result
}
