import 'server-only'
import {neon} from '@neondatabase/serverless'
function sql(){const url=process.env.PATA_DATABASE_URL;if(!url)throw Error('PATA_DB_NOT_CONFIGURED');return neon(url)}
export type CheckoutState={orderCode:string;amount:number;name:string;email:string;phase:string;redirectUrl:string|null}
export async function beginCheckout(id:string):Promise<CheckoutState>{
 const rows=await sql()`SELECT * FROM pata_begin_checkout(${id}::uuid)`
 if(rows.length!==1)throw Error('PATA_BEGIN_FAILED')
 const r=rows[0]
 return {orderCode:String(r.order_code),amount:Number(r.amount),
  name:String(r.buyer_name),email:String(r.buyer_email),phase:String(r.phase),
  redirectUrl:r.redirect_url?String(r.redirect_url):null}
}
export async function attachPayment(code:string,paymentId:string,url:string,amount:number){
 await sql()`SELECT pata_attach_payment(${code},${paymentId},${url},${amount})`
}
export async function applyMoneiPayment(p:{
 orderId:string;paymentId:string;status:string;amount:number;currency:string;
 livemode:boolean;hash:string
}){
 const rows=await sql()`SELECT pata_apply_monei_event(${p.orderId},${p.paymentId},
 ${p.status},${p.amount},${p.currency},${p.livemode},${p.hash}::char(64)) AS result`
 return String(rows[0].result)
}
export type EmailJob={
 id:string;orderId:string;kind:'CUSTOMER_CONFIRMED'|'ARI_INTERNAL';attempt:number;
 reference:string;customerName:string;email:string|null;date:string;quantity:number;amount:number
}
export async function claimEmail():Promise<EmailJob|null>{
 const rows=await sql()`SELECT * FROM pata_claim_email()`
 if(!rows.length)return null
 const r=rows[0]
 return {
  id:String(r.job_id),orderId:String(r.order_id),kind:r.job_kind as EmailJob['kind'],
  attempt:Number(r.attempt),reference:String(r.reservation_ref),customerName:String(r.customer_name),
  email:r.customer_email?String(r.customer_email):null,date:String(r.pickup_date).slice(0,10),
  quantity:Number(r.quantity),amount:Number(r.amount_cents)
 }
}
export async function finishEmail(id:string,attempt:number,success:boolean,providerId:string|null){
 const rows=await sql()`SELECT pata_finish_email(${id}::uuid,${attempt},${success},${providerId}) AS success`
 return rows[0]?.success===true
}
