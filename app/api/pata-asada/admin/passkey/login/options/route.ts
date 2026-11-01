import {generateAuthenticationOptions} from '@simplewebauthn/server'
import {NextResponse} from 'next/server'
import {passkeySettings,assertPasskeyOrigin,getActiveKey,issueChallenge,writeTicket} from '@/lib/pataPasskeys'
import {reservationsReady} from '@/lib/pataReservasDb'
import {noStore,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 const settings=passkeySettings()
 if(!reservationsReady()||!settings)return unavailable()
 if(!assertPasskeyOrigin(request,settings.origin))
  return NextResponse.json({error:'Origen no autorizado'},{status:403,headers:noStore})
 const key=await getActiveKey()
 if(!key)return NextResponse.json({error:'No hay ningún móvil autorizado todavía.'},{status:409,headers:noStore})
 try{
  const options=await generateAuthenticationOptions({
   rpID:settings.rpID,userVerification:'required',
   allowCredentials:[{id:key.id,transports:key.transports}],
  })
  const ticket=await issueChallenge(options.challenge,'login')
  const response=NextResponse.json(options,{headers:noStore})
  writeTicket(response,ticket)
  return response
 }catch(e){
  console.error('[passkey-login-options]',e)
  return NextResponse.json({error:'No se pudo iniciar el acceso.'},{status:500,headers:noStore})
 }
}
