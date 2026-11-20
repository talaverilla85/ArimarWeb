'use client'

import {useEffect,useRef,useState,type FormEvent,type KeyboardEvent} from 'react'
import Link from 'next/link'
import CalendarioPataCliente from './CalendarioPataCliente'
import {getWhatsAppUrl,siteConfig} from '@/lib/siteConfig'
import {PATA_PRECIO_EUR,PATA_PESO_FINAL_KG_APROX,PATA_PESO_CRUDO_KG_APROX} from '@/lib/pataAsadaConfig'

// Production explicitly keeps payment disabled; MONEI stays on sandbox branch.
const PAYMENT_TEST=false
type PublicDay={date:string;available:number}
type LoadingState='loading'|'ready'|'error'

function canaryBusinessDay(){
 const parts=new Intl.DateTimeFormat('en-GB',{
  timeZone:'Atlantic/Canary',hourCycle:'h23',year:'numeric',
  month:'2-digit',day:'2-digit',hour:'2-digit'
 }).formatToParts(new Date())
 const value=(type:string)=>parts.find(x=>x.type===type)?.value??''
 const date=[value('year'),value('month'),value('day')].join('-')
 return Number(value('hour'))>=16?addDays(date,1):date
}
function addDays(date:string,days:number){
 const d=new Date(date+'T12:00:00Z')
 d.setUTCDate(d.getUTCDate()+days)
 return d.toISOString().slice(0,10)
}
function firstPickup(day:string){
 const week=new Date(day+'T12:00:00Z').getUTCDay()
 return addDays(day,week===5?4:week===6?3:2)
}
function displayDay(date:string){
 return new Intl.DateTimeFormat('es-ES',{
  timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'
 }).format(new Date(date+'T12:00:00Z'))
}
function whatsAppDay(date:string){
 const [y,m,d]=date.split('-')
 return [d,m,y].join('/')
}
async function fetchAvailability(from:string,to:string,signal?:AbortSignal){
 const response=await fetch(
  '/api/pata-asada/availability?from='+encodeURIComponent(from)+'&to='+encodeURIComponent(to),
  {cache:'no-store',signal}
 )
 if(!response.ok)throw Error('No se pudo consultar la disponibilidad. Inténtalo de nuevo.')
 const data:unknown=await response.json()
 if(!data||typeof data!=='object'||!('days' in data)||!Array.isArray(data.days))
  throw Error('La disponibilidad recibida no es válida.')
 const entries:Record<string,number>={}
 for(const row of data.days as PublicDay[]){
  if(row&&typeof row.date==='string'&&Number.isInteger(row.available)
    &&row.available>=1&&row.available<=3)entries[row.date]=row.available
 }
 return entries
}
const input='mt-1.5 w-full min-h-12 rounded-xl border border-[#C7DFE0] bg-white px-4 py-3 text-base text-[#1E293B] outline-none focus:border-[#207F85] focus:ring-2 focus:ring-[#207F85]/20'

export default function ReservaPataModalCliente(){
 const [businessDay,setBusinessDay]=useState(canaryBusinessDay)
 const [availability,setAvailability]=useState<Record<string,number>>({})
 const [calendarState,setCalendarState]=useState<LoadingState>('loading')
 const [reload,setReload]=useState(0)
 const [selected,setSelected]=useState('')
 const [modalOpen,setModalOpen]=useState(false)
 const [modalUnits,setModalUnits]=useState<number|null>(null)
 const [modalBusy,setModalBusy]=useState(false)
 const [customerName,setCustomerName]=useState('')
 const [email,setEmail]=useState('')
 const [phone,setPhone]=useState('')
 const [quantity,setQuantity]=useState(1)
 const [notes,setNotes]=useState('')
 const [error,setError]=useState('')
 const [submitting,setSubmitting]=useState(false)
 const checkoutKey=useRef<string|null>(null)
 const dialogRef=useRef<HTMLDivElement|null>(null)
 const closeRef=useRef<HTMLButtonElement|null>(null)
 const previousFocus=useRef<HTMLElement|null>(null)

 const startDate=firstPickup(businessDay)
 const endDate=addDays(businessDay,62)
 const total=quantity*PATA_PRECIO_EUR

 useEffect(()=>{
  const update=()=>setBusinessDay(canaryBusinessDay())
  const clock=window.setInterval(update,30000)
  const recheck=window.setInterval(()=>setReload(x=>x+1),120000)
  return ()=>{window.clearInterval(clock);window.clearInterval(recheck)}
 },[])
 useEffect(()=>{
  const ctrl=new AbortController()
  let active=true
  setCalendarState('loading')
  fetchAvailability(businessDay,addDays(businessDay,62),ctrl.signal)
   .then(days=>{
    if(!active)return
    setAvailability(days)
    setCalendarState('ready')
   })
   .catch(()=>{if(active){setCalendarState('error');setAvailability({})}})
  return ()=>{active=false;ctrl.abort()}
 },[businessDay,reload])

 useEffect(()=>{
  if(!modalOpen||!selected)return
  const ctrl=new AbortController()
  let active=true
  setModalBusy(true)
  fetchAvailability(selected,selected,ctrl.signal)
   .then(days=>{
    if(!active)return
    const units=days[selected]??0
    setModalUnits(units)
    if(units===0)setReload(n=>n+1)
   })
   .catch(()=>{if(active){setModalUnits(0);setError('No se pudo comprobar la fecha. Cierra y selecciona otra.') }})
   .finally(()=>{if(active)setModalBusy(false)})
  return ()=>{active=false;ctrl.abort()}
 },[modalOpen,selected])

 useEffect(()=>{
  if(!modalOpen)return
  const oldOverflow=document.body.style.overflow
  document.body.style.overflow='hidden'
  closeRef.current?.focus()
  return ()=>{
   document.body.style.overflow=oldOverflow
   previousFocus.current?.focus()
  }
 },[modalOpen])

 function closeModal(){
  if(submitting)return
  setModalOpen(false)
  setModalUnits(null)
  setError('')
 }
 function selectDay(day:string){
  if(calendarState!=='ready'||day<startDate||day>endDate||(availability[day]??0)<1)return
  previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
  checkoutKey.current=null
  setSelected(day)
  setQuantity(1)
  setError('')
  setModalUnits(null)
  setModalOpen(true)
 }
 function modalKeys(event:KeyboardEvent<HTMLDivElement>){
  if(event.key==='Escape'){
   event.preventDefault()
   closeModal()
   return
  }
  if(event.key!=='Tab')return
  const focusable=dialogRef.current?.querySelectorAll<HTMLElement>(
   'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])'
  )
  if(!focusable?.length)return
  const first=focusable[0],last=focusable[focusable.length-1]
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }
 function changeData(action:()=>void){
  checkoutKey.current=null
  action()
 }
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault()
  if(submitting)return
  setError('')
  if(selected<firstPickup(canaryBusinessDay())||selected>addDays(canaryBusinessDay(),62)){
   setError('Esta fecha ya no admite solicitudes. Selecciona otra.')
   setReload(n=>n+1)
   return
  }
  if(quantity<1||quantity>3||!Number.isInteger(quantity))return
  if(!customerName.trim()||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())
    ||phone.replace(/\D/g,'').length<6){
   setError('Revisa el nombre, el correo electrónico y el teléfono.')
   return
  }
  setSubmitting(true)
  try{
   const fresh=await fetchAvailability(selected,selected)
   const remaining=fresh[selected]??0
   setModalUnits(remaining)
   if(remaining<quantity){
    setReload(v=>v+1)
    throw Error('Ya no quedan suficientes unidades para ese día. Elige otra cantidad o fecha.')
   }
   if(PAYMENT_TEST){
    if(!checkoutKey.current)checkoutKey.current=crypto.randomUUID()
    const key=checkoutKey.current
    const reserve=await fetch('/api/pata-asada/reservations',{
     method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',
     body:JSON.stringify({
      date:selected,quantity,name:customerName.trim(),email:email.trim(),
      phone:phone.trim(),notes:notes.trim().slice(0,400),key
     })
    })
    const hold=await reserve.json() as {id?:string;checkoutToken?:string;error?:string}
    if(!reserve.ok||!hold.id||!hold.checkoutToken)
     throw Error(hold.error||'No se pudo reservar la fecha. Inténtalo de nuevo.')
    const checkout=await fetch('/api/pata-asada/checkout',{
     method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',
     body:JSON.stringify({id:hold.id,key,checkoutToken:hold.checkoutToken})
    })
    const result=await checkout.json() as {redirectUrl?:string;error?:string}
    if(!checkout.ok||!result.redirectUrl)
     throw Error(result.error||'El pago de pruebas no ha podido iniciarse. Contacta con AriMar antes de repetirlo.')
    const url=new URL(result.redirectUrl)
    if(url.protocol!=='https:'||!(url.hostname==='monei.com'||url.hostname.endsWith('.monei.com')))
     throw Error('La pasarela de pago ha devuelto una dirección no válida.')
    window.location.assign(url.href)
    return
   }
   const lines=[
    'Hola, AriMar. Quiero encargar pata asada.',
    '',
    '*Fecha de recogida:* '+whatsAppDay(selected),
    '*Cantidad:* '+quantity+(quantity===1?' pata entera':' patas enteras'),
    '*Total:* '+total+' €',
    '',
    '*Nombre:* '+customerName.trim(),
    '*Teléfono:* '+phone.trim(),
    '*Correo:* '+email.trim(),
    ...(notes.trim()?['*Observaciones:* '+notes.trim()]:[]),
    '',
    '¿Me confirmáis la disponibilidad y cómo puedo realizar el pago? Gracias.'
   ]
   window.location.href=getWhatsAppUrl(lines.join('\n'))
  }catch(e){
   setError(e instanceof Error?e.message:'No se pudo procesar la solicitud.')
  }finally{setSubmitting(false)}
 }

 return <div id="solicitar-presupuesto" className="overflow-hidden rounded-3xl border border-[#D7E7E8] bg-white shadow-xl shadow-[#1E293B]/10">
  <header className="bg-[#1E293B] px-4 py-6 text-white sm:px-9 sm:py-9">
   <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B7E1E1]">Encargos · AriMar 100 % sin gluten</p>
   <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">¿Qué día recoges tu pata asada?</h2>
   <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
    Elige una fecha disponible para abrir tu reserva. La pata se entrega entera y con hueso, por 90 € la unidad.
   </p>
  </header>
  <div className="px-3 py-4 sm:px-9 sm:py-8">
   <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 sm:gap-3">
    <div className="rounded-xl bg-[#F1F8F7] p-3">
     <span className="block text-xs text-[#207F85]">Precio por pata entera</span>
     <strong className="mt-1 block text-lg text-[#1E293B]">90 €</strong>
    </div>
    <div className="rounded-xl bg-[#F1F8F7] p-3">
     <span className="block text-xs text-[#207F85]">Recogida en AriMar</span>
     <strong className="mt-1 block text-lg text-[#1E293B]">11:30–16:00</strong>
    </div>
    <div className="col-span-2 rounded-xl bg-[#F1F8F7] px-3 py-2.5 sm:col-span-1 sm:p-3">
     <span className="block text-xs text-[#207F85]">Peso una vez asada, con hueso</span>
     <strong className="mt-1 block text-base text-[#1E293B] sm:text-lg">≈ 7,5 kg</strong>
    </div>
   </div>
   <div className="mt-4 sm:mt-6">
    <h3 className="text-base font-bold text-[#1E293B]">Selecciona una fecha</h3>
    <p className="mt-1 text-sm text-slate-600">Pulsa un día disponible para indicar las unidades y tus datos.</p>
    <CalendarioPataCliente
     from={startDate} to={endDate} quantity={1} value={selected}
     available={availability} status={calendarState}
     onSelect={selectDay} onReload={()=>setReload(n=>n+1)}/>
   </div>
   <div className="mt-5 flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[#D7E7E8] bg-[#FAFCFC] p-4">
    <p className="max-w-xl text-sm leading-relaxed text-slate-600">
     {PAYMENT_TEST
      ?'Modo de pruebas: podrás continuar a la pasarela MONEI de pruebas. No se aceptan pagos reales.'
      :'Las solicitudes se gestionan por WhatsApp hasta que activemos el pago online. La fecha no queda reservada al seleccionar el día.'}
    </p>
    <a href={getWhatsAppUrl('Hola AriMar. Quería consultar una fecha especial para pata asada.')}
     target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#207F85] underline underline-offset-2">
     ¿Necesitas otra fecha?
    </a>
   </div>
  </div>

  {modalOpen&&<div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#101c29]/75 sm:px-5 sm:py-5"
   onMouseDown={e=>{if(e.target===e.currentTarget)closeModal()}}>
   <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pata-reserva-title"
     aria-describedby="pata-reserva-description" onKeyDown={modalKeys}
     className="flex h-[100dvh] w-full max-w-xl flex-col overflow-hidden bg-white text-[#1E293B] shadow-2xl sm:h-auto sm:max-h-[92dvh] sm:rounded-3xl">
    <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#D7E7E8] px-4 py-3 sm:px-7 sm:py-5">
     <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#207F85]">Tu reserva · AriMar</p>
      <h3 id="pata-reserva-title" className="mt-1 text-lg font-extrabold sm:text-2xl">Pata asada por encargo</h3>
      <p id="pata-reserva-description" className="mt-1 text-sm font-medium capitalize text-slate-600">{displayDay(selected)}</p>
     </div>
     <button ref={closeRef} type="button" onClick={closeModal} disabled={submitting}
      aria-label="Cerrar formulario de reserva"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl text-[#1E293B] hover:bg-slate-200 disabled:opacity-50">×</button>
    </div>
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
     <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-7 sm:py-5">
      <div className="rounded-xl border border-[#C7DFE0] bg-[#F1F8F7] p-3 sm:p-4">
       <div className="flex items-start justify-between gap-3">
        <div>
         <p className="text-xs font-semibold uppercase tracking-wide text-[#207F85]">Fecha de recogida</p>
         <p className="mt-1 text-sm font-extrabold capitalize">{displayDay(selected)}</p>
         <p className="mt-1 text-xs text-slate-600">11:30–16:00 · {siteConfig.address.locality}</p>
        </div>
        <button type="button" onClick={closeModal} className="min-h-11 shrink-0 rounded-lg px-2 text-sm font-bold text-[#207F85] underline">Cambiar día</button>
       </div>
       <p className="mt-3 text-xs font-medium text-[#207F85]">
        {modalBusy?'Comprobando unidades disponibles…':
          modalUnits===0?'Fecha sin disponibilidad en este momento':
          modalUnits===null?'Consultando…':
          modalUnits+' '+(modalUnits===1?'pata disponible':'patas disponibles')}
       </p>
      </div>

      <label className="block text-sm font-semibold">Número de patas enteras
       <select className={input} value={quantity} required
        disabled={modalBusy||!modalUnits||submitting}
        onChange={e=>changeData(()=>setQuantity(Number(e.target.value)))}>
        {Array.from({length:Math.max(1,Math.min(3,modalUnits??1))},(_,i)=>{
         const n=i+1
         return <option key={n} value={n}>{n} {n===1?'pata':'patas'} — {n*PATA_PRECIO_EUR} €</option>
        })}
       </select>
      </label>
      {modalUnits!==null&&quantity>modalUnits&&<p role="alert" className="text-sm font-semibold text-rose-700">
       Quedan menos patas disponibles. Reduce la cantidad o elige otro día.
      </p>}

      <div className="grid gap-4 sm:grid-cols-2">
       <label className="block text-sm font-semibold sm:col-span-2">Nombre y apellidos
        <input className={input} value={customerName} required autoComplete="name" maxLength={100} enterKeyHint="next"
         placeholder="Nombre de quien recoge" disabled={submitting}
         onChange={e=>changeData(()=>setCustomerName(e.target.value))}/>
       </label>
       <label className="block text-sm font-semibold">Correo electrónico
        <input className={input} type="email" inputMode="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" required autoComplete="email" maxLength={254}
         value={email} placeholder="tu@correo.es" disabled={submitting}
         onChange={e=>changeData(()=>setEmail(e.target.value))}/>
       </label>
       <label className="block text-sm font-semibold">Teléfono
        <input className={input} type="tel" inputMode="tel" enterKeyHint="done" required autoComplete="tel" maxLength={30}
         value={phone} placeholder="600 000 000" disabled={submitting}
         onChange={e=>changeData(()=>setPhone(e.target.value))}/>
       </label>
      </div>
      <details className="rounded-xl border border-[#D7E7E8] px-3 py-1">
       <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-[#207F85]">
        Añadir observaciones <span className="text-xs font-normal text-slate-500">(opcional) +</span>
       </summary>
       <label className="block pb-3 text-sm font-semibold">
        Observaciones para AriMar
        <textarea className={input} rows={2} maxLength={400} disabled={submitting}
         value={notes} onChange={e=>changeData(()=>setNotes(e.target.value))}
         placeholder="¿Hay algo importante que debamos saber?"/>
       </label>
      </details>
      <p className="text-xs leading-relaxed text-slate-500">
       Pieza entera, sin deshuesar ni cortar. Peso aproximado de {PATA_PESO_FINAL_KG_APROX.toLocaleString('es-ES')} kg terminada con hueso.
       Solo recogida en local. Consulta nuestra <Link className="font-bold text-[#207F85] underline"
       href="/legal/pedidos-reembolsos" target="_blank">política de cancelaciones y reembolsos</Link> y la
       <Link className="ml-1 font-bold text-[#207F85] underline" href="/legal/privacidad" target="_blank">política de privacidad</Link>.
      </p>
      {error&&<p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{error}</p>}
     </div>
     <footer className="shrink-0 border-t border-[#D7E7E8] bg-white px-4 pt-3 sm:px-7 sm:py-4"
       style={{paddingBottom:'calc(0.75rem + env(safe-area-inset-bottom))'}}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
       <div><p className="text-xs text-slate-500">Total {quantity===1?'por 1 pata':'por '+quantity+' patas'}</p>
        <strong className="text-2xl font-extrabold">{total} €</strong></div>
       <button type="submit"
        disabled={submitting||modalBusy||!modalUnits||modalUnits<quantity}
        className="min-h-14 w-full rounded-xl bg-[#207F85] px-5 py-3 text-base font-extrabold text-white hover:bg-[#18686D] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12 sm:w-auto">
        {submitting?'Comprobando…':PAYMENT_TEST?'Reservar y pagar (pruebas)':'Solicitar por WhatsApp'}
       </button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
       {PAYMENT_TEST?'Solo pruebas de MONEI. Tu reserva se confirmará tras verificar el pago y recibirás una referencia por correo.':
        'El pago online todavía no está activo. Te confirmaremos disponibilidad y pago por WhatsApp; esta solicitud no reserva unidades.'}
      </p>
     </footer>
    </form>
   </div>
  </div>}
 </div>
}
