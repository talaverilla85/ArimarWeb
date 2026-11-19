import 'server-only'
import {createHmac,createHash,timingSafeEqual} from 'node:crypto'

const MONEI_API='https://api.monei.com/v1/payments'
export type MoneiPayment={
 id:string;orderId:string;amount:number;currency:string;status:string;
 livemode:boolean;nextAction?:{redirectUrl?:string}
}
function testKey(){
 const key=process.env.PATA_MONEI_TEST_KEY||''
 if(!key.startsWith('pk_test_')||key.length<20)throw Error('PATA_TEST_KEY_MISSING')
 return key
}
function checkoutSecret(){
 const secret=process.env.PATA_CHECKOUT_TOKEN_SECRET||''
 if(secret.length<32)throw Error('PATA_CHECKOUT_SECRET_MISSING')
 return secret
}
export function checkoutReady(){
 const origin=process.env.PATA_CHECKOUT_ORIGIN||''
 let validOrigin=false
 try{
  const url=new URL(origin)
  validOrigin=url.protocol==='https:'&&url.origin===origin&&url.hostname.endsWith('.vercel.app')
 }catch{}
 return process.env.VERCEL_ENV==='preview'&&process.env.PATA_RESERVAS_ENABLED==='true'
  &&process.env.PATA_PUBLIC_HOLDS_ENABLED==='true'
  &&process.env.PATA_CHECKOUT_ENABLED==='true'&&process.env.PATA_MONEI_MODE==='test'
  &&Boolean(process.env.PATA_DATABASE_URL)
  &&validOrigin&&(process.env.PATA_MONEI_TEST_KEY||'').startsWith('pk_test_')
  &&(process.env.PATA_CHECKOUT_TOKEN_SECRET||'').length>=32
}
export function checkoutOrigin(){
 if(!checkoutReady())throw Error('PATA_CHECKOUT_DISABLED')
 return process.env.PATA_CHECKOUT_ORIGIN!
}
export function makeCheckoutToken(id:string,key:string){
 return createHmac('sha256',checkoutSecret()).update('checkout:'+id+':'+key).digest('hex')
}
export function verifyCheckoutToken(id:string,key:string,received:string){
 if(!/^[0-9a-f]{64}$/.test(received))return false
 const expected=makeCheckoutToken(id,key)
 return timingSafeEqual(Buffer.from(expected,'hex'),Buffer.from(received,'hex'))
}
export function verifyMoneiSignature(body:string,header:string){
 if(!header||header.length>1024||body.length>20000)return false
 const pairs=header.split(',').map(x=>x.trim())
 const t=pairs.find(x=>x.startsWith('t='))?.slice(2)
 if(!t||! /^\d{10}$/.test(t))return false
 const age=Math.abs(Math.floor(Date.now()/1000)-Number(t))
 if(age>300)return false
 const expected=createHmac('sha256',testKey()).update(t+'.'+body).digest()
 const candidates=pairs.filter(x=>x.startsWith('v1=')).map(x=>x.slice(3))
 return candidates.some(s=>/^[0-9a-f]{64}$/.test(s)
  &&timingSafeEqual(expected,Buffer.from(s,'hex')))
}
export function callbackHash(raw:string){
 return createHash('sha256').update(raw).digest('hex')
}
export async function createTestPayment(input:{orderId:string;amount:number;name:string;email:string}){
 const origin=checkoutOrigin()
 const body={
  amount:input.amount,currency:'EUR',orderId:input.orderId,
  description:'AriMar - pata asada por encargo',
  customer:{name:input.name,email:input.email},
  callbackUrl:origin+'/api/pata-asada/monei-callback',
  completeUrl:origin+'/pata-asada-gran-canaria/reserva-resultado',
  cancelUrl:origin+'/pata-asada-gran-canaria/reserva-resultado?cancelado=1',
 }
 const response=await fetch(MONEI_API,{
  method:'POST',headers:{Authorization:testKey(),'Content-Type':'application/json',Accept:'application/json'},
  body:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(15000)
 })
 if(!response.ok){
  // Do NOT retry payment creation blindly: the provider may already have accepted it.
  throw Error('PATA_MONEI_CREATE_UNCERTAIN_'+response.status)
 }
 const payment=await response.json() as MoneiPayment
 if(!payment||typeof payment.id!=='string'||payment.orderId!==input.orderId
  ||payment.amount!==input.amount||payment.currency!=='EUR'||payment.livemode!==false
  ||typeof payment.nextAction?.redirectUrl!=='string')
  throw Error('PATA_MONEI_UNEXPECTED_RESPONSE')
 const redirect=new URL(payment.nextAction.redirectUrl)
 if(redirect.protocol!=='https:'||!(redirect.hostname==='monei.com'||redirect.hostname.endsWith('.monei.com')))
  throw Error('PATA_MONEI_INVALID_REDIRECT')
 return {paymentId:payment.id,url:redirect.href}
}
