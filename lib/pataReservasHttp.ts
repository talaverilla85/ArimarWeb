import { NextResponse } from 'next/server'
export const noStore={'Cache-Control':'no-store, max-age=0'}
export function unavailable(){
 return NextResponse.json({error:'Las reservas online todavía no están activadas.'},
 {status:503,headers:noStore})
}
export function unauthorized(){
 return NextResponse.json({error:'Acceso no autorizado'}, {status:401,headers:noStore})
}
export function rejectOrigin() {
 return NextResponse.json({error:'Origen no autorizado'}, {status:403,headers:noStore})
}
export function fail(error:unknown){
 const message=error instanceof Error?error.message:''
 const messages:Record<string,[number,string]>={
  PATA_CAPACITY_FULL:[409,'No quedan suficientes patas libres para esa fecha.'],
  PATA_DATE_BLOCKED:[409,'La fecha está bloqueada.'],
  PATA_CAPACITY_BELOW_BOOKED:[409,'No puedes reducir la capacidad por debajo de los encargos existentes.'],
  PATA_HOLD_EXPIRED:[409,'La retención ya no está vigente.'],
  PATA_IDEMPOTENCY_CONFLICT:[409,'La solicitud de reserva ya se utilizó con otros datos.'],
  PATA_INVALID_INPUT:[400,'Datos de reserva incorrectos.']
 }
 const match=Object.keys(messages).find(key=>message.includes(key))
 if(match){const [status,msg]=messages[match];return NextResponse.json({error:msg},{status,headers:noStore})}
 console.error('[pata-reservas]',message.split('\\n')[0].slice(0,100))
 return NextResponse.json({error:'No se pudo completar la operación.'},{status:500,headers:noStore})
}
export async function parseBody(request:Request):Promise<Record<string,unknown>> {
 const text=await request.text()
 if(text.length>3000)throw new Error('PATA_INVALID_INPUT')
 const value:unknown=JSON.parse(text)
 if(!value||Array.isArray(value)||typeof value!=='object')throw new Error('PATA_INVALID_INPUT')
 return value as Record<string,unknown>
}
export function str(v:unknown,max:number):string|null {
 if(typeof v!=='string'||v.length>max)return null
 return v.trim()
}
