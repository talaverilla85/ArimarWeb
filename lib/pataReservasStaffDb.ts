import 'server-only'
import {neon} from '@neondatabase/serverless'
export async function bookFromCounter(input:{
 date:string;quantity:number;name:string;phone:string;
 notes:string;operator:string;key:string
}){
 if(!process.env.PATA_DATABASE_URL)throw Error('PATA_DATABASE_NOT_CONFIGURED')
 const db=neon(process.env.PATA_DATABASE_URL)
 const rows=await db`SELECT order_id::text AS id, reservation_ref AS reference
  FROM pata_staff_booking(
   ${input.date}::date,${input.quantity},${input.name},
   ${input.phone},${input.notes},${input.operator},${input.key}::uuid)`
 if(rows.length!==1||!rows[0].id||!rows[0].reference)throw Error('PATA_STAFF_BOOKING_FAILED')
 return {id:String(rows[0].id),reference:String(rows[0].reference)}
}
export async function cancelManualBooking(id:string,reason:string){
 if(!process.env.PATA_DATABASE_URL)throw Error('PATA_DATABASE_NOT_CONFIGURED')
 const db=neon(process.env.PATA_DATABASE_URL)
 const rows=await db`SELECT pata_cancel_manual(${id}::uuid,${reason}) AS result`
 return String(rows[0]?.result||'PATA_CANCEL_FAILED')
}
