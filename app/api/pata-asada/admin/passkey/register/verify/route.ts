import {verifyRegistrationResponse,type RegistrationResponseJSON} from '@simplewebauthn/server'
import {NextResponse} from 'next/server'
import {validAdmin} from '@/lib/pataReservasAdmin'
import {reservationsReady} from '@/lib/pataReservasDb'
import {passkeySettings,assertPasskeyOrigin,consumeChallenge,removeTicket,storeFirstKey,webauthnPayload} from '@/lib/pataPasskeys'
import {noStore,unauthorized,unavailable} from '@/lib/pataReservasHttp'
export const dynamic='force-dynamic'
export async function POST(request:Request){
 const setting=passkeySettings()
 if(!reservationsReady()||!setting)return unavailable()
 if(!validAdmin(request))return unauthorized()
 if(!assertPasskeyOrigin(request,setting.origin))
  return NextResponse.json({error:'Origen no autorizado'},{status:403,headers:noStore})
 const challenge=await consumeChallenge(request,'register')
 if(!challenge)return NextResponse.json({error:'El intento ha caducado. Vuelve a intentarlo.'},{status:409,headers:noStore})
 try{
  const payload=await webauthnPayload(request)
  const result=await verifyRegistrationResponse({
   response:payload as unknown as RegistrationResponseJSON,
   expectedChallenge:challenge,expectedOrigin:setting.origin,expectedRPID:setting.rpID,
   requireUserVerification:true,
  })
  if(!result.verified||!result.registrationInfo)return NextResponse.json({error:'No se pudo verificar la huella o PIN del dispositivo.'},{status:400,headers:noStore})
  const {credential,credentialDeviceType,credentialBackedUp}=result.registrationInfo
  if(setting.requireDeviceBound&&credentialDeviceType!=='singleDevice')
   return NextResponse.json({error:'El móvil ha ofrecido una passkey sincronizable. Este modo exige una credencial vinculada a un único dispositivo.'},{status:409,headers:noStore})
  await storeFirstKey(credential,credentialDeviceType,credentialBackedUp)
  const response=NextResponse.json({registered:true,deviceType:credentialDeviceType,backedUp:credentialBackedUp},{headers:noStore})
  removeTicket(response)
  return response
 }catch(e){
  console.error('[passkey-register-verify]',e instanceof Error?e.message:'invalid')
  return NextResponse.json({error:'Registro no validado. Comprueba la configuración del móvil.'},{status:400,headers:noStore})
 }
}
