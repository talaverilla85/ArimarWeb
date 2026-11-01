import {verifyAuthenticationResponse,type AuthenticationResponseJSON} from '@simplewebauthn/server'
import {NextResponse} from 'next/server'
import {setAdminCookie} from '@/lib/pataReservasAdmin'
import {reservationsReady} from '@/lib/pataReservasDb'
import {passkeySettings,assertPasskeyOrigin,consumeChallenge,getActiveKey,updateKeyCounter,removeTicket,webauthnPayload} from '@/lib/pataPasskeys'
import {noStore,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 const settings=passkeySettings()
 if(!reservationsReady()||!settings)return unavailable()
 if(!assertPasskeyOrigin(request,settings.origin))
  return NextResponse.json({error:'Origen no autorizado'},{status:403,headers:noStore})
 const challenge=await consumeChallenge(request,'login')
 if(!challenge)return NextResponse.json({error:'El acceso ha caducado. Vuelve a intentarlo.'},{status:409,headers:noStore})
 try{
  const payload=await webauthnPayload(request)
  const key=await getActiveKey()
  if(!key||payload.id!==key.id)return NextResponse.json({error:'Dispositivo no autorizado.'},{status:401,headers:noStore})
  const result=await verifyAuthenticationResponse({
   response:payload as unknown as AuthenticationResponseJSON,
   expectedChallenge:challenge,expectedOrigin:settings.origin,expectedRPID:settings.rpID,
   credential:{id:key.id,publicKey:key.publicKey,counter:key.counter,transports:key.transports},
   requireUserVerification:true
  })
  if(!result.verified)return NextResponse.json({error:'No se pudo verificar la credencial.'},{status:401,headers:noStore})
  await updateKeyCounter(key.id,result.authenticationInfo.newCounter)
  const response=NextResponse.json({authenticated:true},{headers:noStore})
  setAdminCookie(response)
  removeTicket(response)
  return response
 }catch(e){
  console.error('[passkey-login-verify]',e instanceof Error?e.message:'invalid')
  return NextResponse.json({error:'La credencial no se ha podido verificar.'},{status:401,headers:noStore})
 }
}
