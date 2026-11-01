import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
const cookieName='pata_admin'
const ttl=8*60*60*1000
const hash=(v:string)=>createHash('sha256').update(v).digest()
function secureCompare(a:string,b:string) { return timingSafeEqual(hash(a),hash(b)) }
function signingKey(){return process.env.PATA_ADMIN_SESSION_SECRET||''}
export function adminConfigured(){
 return Boolean(process.env.PATA_ADMIN_PASSWORD && process.env.PATA_ADMIN_PASSWORD.length>=16 &&
 signingKey().length>=32)
}
function signature(payload:string){return createHmac('sha256',signingKey()).update(payload).digest('hex')}
export function validAdmin(request:Request):boolean{
 if(!adminConfigured())return false
 const cookies=request.headers.get('cookie')||''
 const value=cookies.split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1)
 if(!value)return false
 const [payload,received,...rest]=value.split('.')
 if(!payload||!received||rest.length||!/^[a-f0-9]{64}$/.test(received))return false
 if(!secureCompare(signature(payload),received))return false
 const expiry=Number(Buffer.from(payload,'base64url').toString('utf8'))
 return Number.isSafeInteger(expiry)&&expiry>Date.now()&&expiry<=Date.now()+ttl
}
export function passwordCorrect(password:string):boolean{
 return adminConfigured() && secureCompare(password,process.env.PATA_ADMIN_PASSWORD!)
}
export function setAdminCookie(response:NextResponse){
 const payload=Buffer.from(String(Date.now()+ttl)).toString('base64url')
 response.cookies.set(cookieName,payload+'.'+signature(payload),{
  httpOnly:true,secure:process.env.NODE_ENV==='production',
  sameSite:'strict',path:'/api/pata-asada/admin',maxAge:ttl/1000
 })
}
export function clearAdminCookie(response:NextResponse){
 response.cookies.set(cookieName,'',{httpOnly:true,secure:true,sameSite:'strict',
 path:'/api/pata-asada/admin',maxAge:0})
}
export function validOrigin(request:Request):boolean{
 const origin=request.headers.get('origin')
 return Boolean(origin && origin===new URL(request.url).origin)
}
