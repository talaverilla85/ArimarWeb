import {generateRegistrationOptions} from '@simplewebauthn/server'
import {NextResponse} from 'next/server'
import {validAdmin} from '@/lib/pataReservasAdmin'
import {reservationsReady} from '@/lib/pataReservasDb'
import {passkeySettings,assertPasskeyOrigin,getActiveKey,issueChallenge,writeTicket} from '@/lib/pataPasskeys'
import {noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 const setting=passkeySettings()
 if(!reservationsReady()||!setting)return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!assertPasskeyOrigin(request,setting.origin))
  return NextResponse.json({error:'Origen no autorizado'},{status:403,headers:noStore})
 if(await getActiveKey())
  return NextResponse.json({error:'Ya hay un dispositivo registrado.'},{status:409,headers:noStore})
 try{
  const options=await generateRegistrationOptions({
   rpName:'AriMar · Gestión',rpID:setting.rpID,
   userID:new TextEncoder().encode('arimar-pata-admin'),
   userName:'AriMar Administrador',userDisplayName:'AriMar Administrador',
   attestationType:'none',authenticatorSelection:{
    authenticatorAttachment:'platform',residentKey:'preferred',userVerification:'required'
   }
  })
  const ticket=await issueChallenge(options.challenge,'register')
  const response=NextResponse.json(options,{headers:noStore})
  writeTicket(response,ticket)
  return response
 }catch(e){console.error('[passkey-register-options]',e);return NextResponse.json({error:'No se pudo iniciar el registro.'},{status:500,headers:noStore})}
}
