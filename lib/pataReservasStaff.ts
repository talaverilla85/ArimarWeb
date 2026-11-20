import 'server-only'
import {createHash,createHmac,timingSafeEqual} from 'node:crypto'
import {NextResponse} from 'next/server'
const cookieName='pata_counter_session'
const ttl=8*60*60*1000
const cookiePath='/api/pata-asada/staff'
function hash(value:string){return createHash('sha256').update(value).digest()}
function equal(a:string,b:string){return timingSafeEqual(hash(a),hash(b))}
function signingKey(){return process.env.PATA_STAFF_SESSION_SECRET||''}
export function staffConfigured(){
 return (process.env.PATA_STAFF_PASSWORD||'').length>=20&&signingKey().length>=32
}
function signature(payload:string){
 return createHmac('sha256',signingKey()).update('pata-counter-v1:'+payload).digest('hex')
}
export function staffPasswordCorrect(value:string){
 return staffConfigured()&&equal(value,process.env.PATA_STAFF_PASSWORD!)
}
export function staffAuthenticated(request:Request){
 if(!staffConfigured())return false
 const raw=request.headers.get('cookie')||''
 const cookie=raw.split(';').map(x=>x.trim())
  .find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1)
 if(!cookie)return false
 const [payload,sig,extra]=cookie.split('.')
 if(!payload||!sig||extra!==undefined||!/^[a-f0-9]{64}$/.test(sig))return false
 if(!equal(signature(payload),sig))return false
 let until=0
 try{until=Number(Buffer.from(payload,'base64url').toString('utf8'))}catch{return false}
 return Number.isSafeInteger(until)&&until>Date.now()&&until<=Date.now()+ttl
}
export function setStaffCookie(response:NextResponse){
 const payload=Buffer.from(String(Date.now()+ttl)).toString('base64url')
 response.cookies.set(cookieName,payload+'.'+signature(payload),{
  httpOnly:true,secure:process.env.NODE_ENV==='production',
  sameSite:'strict',path:cookiePath,maxAge:ttl/1000
 })
}
export function clearStaffCookie(response:NextResponse){
 response.cookies.set(cookieName,'',{
  httpOnly:true,secure:true,sameSite:'strict',path:cookiePath,maxAge:0
 })
}
