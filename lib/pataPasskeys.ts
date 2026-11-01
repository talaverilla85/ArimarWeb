import 'server-only'
import {createHash,randomBytes} from 'node:crypto'
import {neon} from '@neondatabase/serverless'
import type {AuthenticatorTransportFuture,WebAuthnCredential} from '@simplewebauthn/server'
import {NextResponse} from 'next/server'

const cookieName='pata_passkey_ticket'
const ticketPath='/api/pata-asada/admin/passkey'
function db() {
 if(!process.env.PATA_DATABASE_URL)throw new Error('PATA_DATABASE_NOT_CONFIGURED')
 return neon(process.env.PATA_DATABASE_URL)
}
export function passkeySettings(){
 const origin=process.env.PATA_WEBAUTHN_ORIGIN||''
 if(process.env.PATA_PASSKEYS_ENABLED!=='true'||!origin.startsWith('https://'))return null
 const url=new URL(origin)
 if(url.origin!==origin)return null
 return {origin,rpID:url.hostname,requireDeviceBound:process.env.PATA_REQUIRE_DEVICE_BOUND_PASSKEY==='true'}
}
export function passkeyOnly(){return process.env.PATA_ADMIN_PASSKEY_ONLY==='true'}
export function assertPasskeyOrigin(request:Request,expectedOrigin:string){
 return new URL(request.url).origin===expectedOrigin && request.headers.get('origin')===expectedOrigin
}
function sha(value:string){return createHash('sha256').update(value).digest('hex')}
export function writeTicket(response:NextResponse,ticket:string){
 response.cookies.set(cookieName,ticket,{
  httpOnly:true,secure:true,sameSite:'strict',path:ticketPath,maxAge:300,
 })
}
export function removeTicket(response:NextResponse){
 response.cookies.set(cookieName,'',{httpOnly:true,secure:true,sameSite:'strict',path:ticketPath,maxAge:0})
}
export async function issueChallenge(challenge:string,purpose:'register'|'login'){
 const ticket=randomBytes(32).toString('base64url')
 const sql=db()
 await sql`INSERT INTO pata_admin_webauthn_challenges(ticket_hash,challenge,purpose,expires_at)
 VALUES(${sha(ticket)},${challenge},${purpose},now()+interval '5 minutes')`
 return ticket
}
export async function consumeChallenge(request:Request,purpose:'register'|'login'){
 const cookies=request.headers.get('cookie')||''
 const ticket=cookies.split(';').map(x=>x.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1)
 if(!ticket||! /^[A-Za-z0-9_-]{42,48}$/.test(ticket))return null
 const sql=db()
 const records=await sql`DELETE FROM pata_admin_webauthn_challenges
 WHERE ticket_hash=${sha(ticket)} AND purpose=${purpose} AND expires_at>now()
 RETURNING challenge`
 return records.length?String(records[0].challenge):null
}
export type StoredPasskey={
 id:string;publicKey:Uint8Array;counter:number;
 transports:AuthenticatorTransportFuture[];deviceType:string;backedUp:boolean
}
function fromRow(row:Record<string,unknown>):StoredPasskey{
 return {
  id:String(row.id),publicKey:new Uint8Array(Buffer.from(String(row.public_key_b64),'base64')),
  counter:Number(row.sign_counter),
  transports:Array.isArray(row.transports)?row.transports as AuthenticatorTransportFuture[]:[],
  deviceType:String(row.device_type),backedUp:Boolean(row.backed_up)
 }
}
export async function getActiveKey(){
 const sql=db()
 const rows=await sql`SELECT id,public_key_b64,sign_counter,transports,device_type,backed_up
 FROM pata_admin_passkeys WHERE revoked_at IS NULL LIMIT 1`
 return rows.length?fromRow(rows[0] as Record<string,unknown>):null
}
export async function storeFirstKey(key:WebAuthnCredential,deviceType:string,backedUp:boolean){
 const sql=db()
 const rows=await sql`INSERT INTO pata_admin_passkeys(
 id,public_key_b64,sign_counter,transports,device_type,backed_up
 ) VALUES (
 ${key.id},${Buffer.from(key.publicKey).toString('base64')},${key.counter},
 ${JSON.stringify(key.transports??[])}::jsonb,${deviceType},${backedUp}
 )
 ON CONFLICT DO NOTHING RETURNING id`
 if(rows.length===0)throw new Error('ALREADY_REGISTERED')
}
export async function updateKeyCounter(id:string,count:number){
 const sql=db()
 const rows=await sql`UPDATE pata_admin_passkeys SET sign_counter=${count}
 WHERE id=${id} AND revoked_at IS NULL AND sign_counter<=${count} RETURNING id`
 if(!rows.length)throw new Error('COUNTER_REPLAY')
}
export async function webauthnPayload(request:Request):Promise<Record<string,unknown>>{
 const text=await request.text()
 if(text.length>20000)throw new Error('INVALID_WEBAUTHN_PAYLOAD')
 const data:unknown=JSON.parse(text)
 if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('INVALID_WEBAUTHN_PAYLOAD')
 return data as Record<string,unknown>
}
