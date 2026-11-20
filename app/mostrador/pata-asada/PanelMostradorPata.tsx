'use client'
import {useCallback,useEffect,useRef,useState,type FormEvent,type KeyboardEvent} from 'react'
type PaymentMethod='CARD'|'CASH'
type Day={date:string;capacity:number;available:number;blocked:boolean}
type Calendar={from:string;to:string;first:string;today:string;days:Day[]}
type Confirmation={
 reference:string;date:string;quantity:number;name:string;amountCents:number;
 paymentMethod:PaymentMethod;paymentDate:string;paymentReceipt:string
}
const input='mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-[#207F85] focus:ring-2 focus:ring-[#207F85]/20'
async function staffApi(path:string,init?:RequestInit){
 const response=await fetch('/api/pata-asada/staff/'+path,{
  ...init,cache:'no-store',credentials:'same-origin',
  headers:{...(init?.body?{'Content-Type':'application/json'}:{}),...(init?.headers||{})}
 })
 const body=await response.json()
 if(!response.ok)throw Error(body.error||'No se pudo contactar con AriMar')
 return body
}
function dateLabel(date:string){
 const text=new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',
  weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date+'T12:00:00Z'))
 return text.charAt(0).toLocaleUpperCase('es-ES')+text.slice(1)
}
function monthLabel(month:string){
 const text=new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',month:'long',year:'numeric'})
 .format(new Date(month+'-01T12:00:00Z'))
 return text.charAt(0).toLocaleUpperCase('es-ES')+text.slice(1)
}
function moveMonth(month:string,months:number){
 const date=new Date(month+'-01T12:00:00Z')
 date.setUTCMonth(date.getUTCMonth()+months)
 return date.toISOString().slice(0,7)
}
export default function PanelMostradorPata(){
 const [authenticated,setAuthenticated]=useState<boolean|null>(null)
 const [password,setPassword]=useState('')
 const [loginBusy,setLoginBusy]=useState(false)
 const [calendar,setCalendar]=useState<Calendar|null>(null)
 const [month,setMonth]=useState('')
 const [calendarBusy,setCalendarBusy]=useState(false)
 const [calendarError,setCalendarError]=useState('')
 const [selected,setSelected]=useState('')
 const [modalOpen,setModalOpen]=useState(false)
 const closeButton=useRef<HTMLButtonElement|null>(null)
 const previousFocus=useRef<HTMLElement|null>(null)
 const keyRef=useRef<string|null>(null)
 const [quantity,setQuantity]=useState(1)
 const [name,setName]=useState('')
 const [phone,setPhone]=useState('')
 const [email,setEmail]=useState('')
 const [reviewConsent,setReviewConsent]=useState(false)
 const [operator,setOperator]=useState('')
 const [notes,setNotes]=useState('')
 const [paymentMethod,setPaymentMethod]=useState<PaymentMethod>('CASH')
 const [paymentDate,setPaymentDate]=useState('')
 const [paymentReceipt,setPaymentReceipt]=useState('')
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 const [confirmation,setConfirmation]=useState<Confirmation|null>(null)
 const [reload,setReload]=useState(0)
 const loadCalendar=useCallback(async()=>{
  setCalendarBusy(true);setCalendarError('')
  try{
   const data=await staffApi('days') as Calendar
   if(!data.today||!data.first||!Array.isArray(data.days))throw Error('Calendario no disponible')
   setCalendar(data)
   setMonth(old=>old&&old>=data.from.slice(0,7)&&old<=data.to.slice(0,7)
    ?old:data.today.slice(0,7))
  }catch(e){
   setCalendarError(e instanceof Error?e.message:'No se pudo cargar el calendario')
   setCalendar(null)
  }finally{setCalendarBusy(false)}
 },[])
 useEffect(()=>{
  staffApi('session').then(data=>setAuthenticated(Boolean(data.authenticated)))
   .catch(()=>setAuthenticated(false))
 },[])
 useEffect(()=>{
  if(!authenticated)return
  void loadCalendar()
  const interval=window.setInterval(()=>setReload(n=>n+1),60000)
  return ()=>window.clearInterval(interval)
 },[authenticated,loadCalendar])
 useEffect(()=>{if(authenticated&&reload>0)void loadCalendar()},[reload,authenticated,loadCalendar])
 useEffect(()=>{
  if(!modalOpen)return
  const previousOverflow=document.body.style.overflow
  document.body.style.overflow='hidden'
  closeButton.current?.focus()
  return ()=>{
   document.body.style.overflow=previousOverflow
   previousFocus.current?.focus()
  }
 },[modalOpen])
 const chosen=calendar?.days.find(d=>d.date===selected)
 const left=chosen?.available??0
 const valid=Boolean(chosen&&calendar&&selected>=calendar.first&&!chosen.blocked&&left>0)
 function change(action:()=>void){
  keyRef.current=null
  setError('')
  action()
 }
 function pick(date:string){
  const day=calendar?.days.find(d=>d.date===date)
  if(!calendar||!day||date<calendar.first||day.blocked||day.available<1||busy)return
  previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
  change(()=>{
   setSelected(date);setQuantity(1);setName('');setPhone('');setEmail('');setReviewConsent(false);setNotes('')
   setPaymentMethod('CASH');setPaymentDate(calendar.today);setPaymentReceipt('')
   setConfirmation(null);setModalOpen(true)
  })
 }
 function close(){
  if(busy)return
  setModalOpen(false)
  setSelected('');setError('');keyRef.current=null
 }
 function handleModalKeys(event:KeyboardEvent<HTMLDivElement>){
  if(event.key==='Escape'){event.preventDefault();close();return}
  if(event.key!=='Tab')return
  const focusable=event.currentTarget.querySelectorAll<HTMLElement>(
   'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])'
  )
  if(focusable.length===0)return
  const first=focusable[0],last=focusable[focusable.length-1]
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }
 async function login(event:FormEvent<HTMLFormElement>){
  event.preventDefault()
  if(loginBusy)return
  setLoginBusy(true);setError('')
  try{
   await staffApi('session',{method:'POST',body:JSON.stringify({password})})
   setPassword('');setAuthenticated(true)
  }catch(e){setError(e instanceof Error?e.message:'Error de acceso')}
  finally{setLoginBusy(false)}
 }
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault()
  if(busy||!valid||quantity>left||!calendar)return
  if(!paymentDate||paymentDate>calendar.today||!paymentReceipt.trim()){
   setError('Indica la fecha del pago y el número de ticket o factura.');return
  }
  if(!keyRef.current)keyRef.current=crypto.randomUUID()
  const customer=name.trim(),units=quantity,date=selected
  setBusy(true);setError('')
  try{
   const result=await staffApi('book',{method:'POST',body:JSON.stringify({
    key:keyRef.current,date,quantity:units,
    name:customer,phone:phone.trim(),notes:notes.trim(),operator:operator.trim(),
    paymentMethod,paymentDate,paymentReceipt:paymentReceipt.trim(),
    email:email.trim(),reviewConsent
   })}) as {
    reference:string;amountCents:number;date:string;quantity:number;
    paymentMethod:PaymentMethod;paymentDate:string;paymentReceipt:string
   }
   setConfirmation({reference:result.reference,amountCents:result.amountCents,
    date:result.date,quantity:result.quantity,name:customer,
    paymentMethod:result.paymentMethod,paymentDate:result.paymentDate,
    paymentReceipt:result.paymentReceipt})
   setName('');setPhone('');setEmail('');setReviewConsent(false);setNotes('');setSelected('');setQuantity(1)
   setPaymentReceipt('');keyRef.current=null
   setModalOpen(false)
   await loadCalendar()
  }catch(e){setError(e instanceof Error?e.message:'No se pudo registrar')}
  finally{setBusy(false)}
 }
 async function logout(){
  if(busy)return
  await staffApi('session',{method:'DELETE'})
  setAuthenticated(false);setCalendar(null);setConfirmation(null);setModalOpen(false)
 }
 if(authenticated===null)return <main className="mx-auto max-w-3xl px-4 pb-20 pt-32 text-slate-700">Comprobando acceso al mostrador…</main>
 if(!authenticated)return <main className="mx-auto min-h-[75vh] max-w-lg px-4 pb-20 pt-32 text-slate-800">
  <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
   <p className="text-xs font-extrabold uppercase tracking-widest text-[#207F85]">AriMar · Equipo de mostrador</p>
   <h1 className="mt-3 text-3xl font-black">Reservar pata asada</h1>
   <p className="mt-3 text-sm leading-relaxed text-slate-600">
    Acceso para dependientes. Registra encargos y tickets sin modificar la capacidad ni bloquear fechas.
   </p>
   <form className="mt-6" onSubmit={login}>
    <label className="block text-sm font-semibold">Contraseña del mostrador
     <input className={input} type="password" autoComplete="current-password"
      value={password} onChange={e=>setPassword(e.target.value)} required maxLength={512}/>
    </label>
    <button disabled={loginBusy} className="mt-5 min-h-14 w-full rounded-xl bg-[#207F85] px-5 py-3 text-base font-extrabold text-white disabled:opacity-50">
     {loginBusy?'Comprobando…':'Acceder al mostrador'}
    </button>
   </form>
   {error&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{error}</p>}
  </div>
 </main>
 const firstMonth=calendar?.from.slice(0,7)??''
 const lastMonth=calendar?.to.slice(0,7)??''
 const monthStart=month+'-01'
 const [year,mm]=month.split('-').map(Number)
 const maxDay=year&&mm?new Date(Date.UTC(year,mm,0)).getUTCDate():0
 const weekday=year&&mm?(new Date(Date.UTC(year,mm-1,1)).getUTCDay()+6)%7:0
 const daysByDate=new Map(calendar?.days.map(d=>[d.date,d])??[])
 return <main className="mx-auto max-w-5xl px-3 pb-24 pt-28 text-slate-800 sm:px-6 sm:pt-32">
  <header className="flex flex-wrap items-start justify-between gap-3 px-1">
   <div>
    <p className="text-xs font-extrabold uppercase tracking-wider text-[#207F85]">AriMar · Mostrador</p>
    <h1 className="mt-2 text-2xl font-black sm:text-3xl">Reservas de pata asada</h1>
    <p className="mt-2 text-sm text-slate-600">Máximo 3 patas por día · 90 € por unidad · Recogida 11:30–16:00 h</p>
   </div>
   <button type="button" onClick={()=>void logout()}
    className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold">Salir</button>
  </header>
  {confirmation&&<section className="mt-6 rounded-2xl border-2 border-teal-600 bg-[#F1F8F7] p-5" aria-live="polite">
   <p className="text-sm font-extrabold uppercase tracking-widest text-[#207F85]">Reserva registrada</p>
   <p className="mt-2 text-2xl font-black tabular-nums text-[#1E293B]">{confirmation.reference}</p>
   <p className="mt-2 text-sm text-slate-700">{confirmation.name} · {dateLabel(confirmation.date)}</p>
   <p className="text-sm text-slate-700">{confirmation.quantity} {confirmation.quantity===1?'pata':'patas'} · {confirmation.amountCents/100} €</p>
   <p className="mt-2 text-sm font-semibold text-teal-900">
    Cobro anotado: {confirmation.paymentMethod==='CARD'?'Tarjeta':'Efectivo'} · {confirmation.paymentDate.split('-').reverse().join('/')}
   </p>
   <p className="text-sm font-semibold text-teal-900">Ticket/factura: {confirmation.paymentReceipt}</p>
   <p className="mt-2 text-xs text-slate-600">El registro anota el pago realizado en caja; no efectúa el cobro.</p>
   <button className="mt-4 min-h-12 rounded-xl border border-[#207F85] bg-white px-4 font-bold text-[#207F85]"
    type="button" onClick={()=>{const summary=
     'AriMar · Reserva '+confirmation.reference+'\n'+confirmation.name+'\n'+
     dateLabel(confirmation.date)+'\n'+confirmation.quantity+' patas · '+
     confirmation.amountCents/100+' €\nRecogida: 11:30–16:00 h\n'+
     'Cobro: '+(confirmation.paymentMethod==='CARD'?'Tarjeta':'Efectivo')+
     ' · '+confirmation.paymentDate+'\nTicket/factura: '+confirmation.paymentReceipt
     void navigator.clipboard?.writeText(summary)}}>Copiar datos de la reserva</button>
  </section>}
  <section className="mt-6 rounded-2xl border bg-white p-3 shadow-sm sm:p-6">
   <div className="flex flex-wrap items-start justify-between gap-3 px-1">
    <div>
     <h2 className="text-xl font-black">Calendario de disponibilidad</h2>
     <p className="mt-1 text-sm text-slate-600">Pulsa una fecha disponible para registrar el encargo.</p>
    </div>
    <button type="button" disabled={calendarBusy} onClick={()=>void loadCalendar()}
     className="min-h-12 shrink-0 rounded-xl border border-[#207F85] px-3 text-sm font-bold text-[#207F85] disabled:opacity-50">
     {calendarBusy?'Actualizando…':'Actualizar'}</button>
   </div>
   {calendarError&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{calendarError}</p>}
   {calendar&&<div className="mt-5">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
     <button type="button" onClick={()=>setMonth(moveMonth(month,-1))}
      disabled={calendarBusy||!month||month<=firstMonth}
      aria-label="Mes anterior" className="min-h-11 rounded-lg border bg-white px-3 text-sm font-bold disabled:opacity-30">‹ Anterior</button>
     <strong aria-live="polite" className="text-base font-extrabold sm:text-lg">{month&&monthLabel(month)}</strong>
     <button type="button" onClick={()=>setMonth(moveMonth(month,1))}
      disabled={calendarBusy||!month||month>=lastMonth}
      aria-label="Mes siguiente" className="min-h-11 rounded-lg border bg-white px-3 text-sm font-bold disabled:opacity-30">Siguiente ›</button>
    </div>
    <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-600 sm:gap-2">
     {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=><div key={d} className="py-1">{d}</div>)}
    </div>
    {calendarBusy?<p className="py-10 text-center text-sm text-slate-600">Actualizando calendario…</p>:
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
     {Array.from({length:weekday},(_,i)=><div key={'empty-'+i} aria-hidden="true"/>)}
     {Array.from({length:maxDay},(_,i)=>{
      const date=month+'-'+String(i+1).padStart(2,'0')
      const d=daysByDate.get(date)
      if(!d)return <div key={date} aria-hidden="true" className="min-h-20 sm:min-h-24"/>
      const past=date<calendar.today,isToday=date===calendar.today
      const canBook=date>=calendar.first&&!d.blocked&&d.available>0
      return <button key={date} type="button" disabled={!canBook} onClick={()=>pick(date)}
       aria-current={isToday?'date':undefined}
       aria-label={date+': '+(past?'fecha pasada, ':isToday?'hoy, ':'')+
        (d.blocked?'bloqueado':d.available+' patas libres')}
       className={'min-h-20 rounded-xl border p-1.5 text-center transition sm:min-h-24 sm:p-2 '+
        (isToday?'border-[#207F85] ring-2 ring-[#207F85] ':
         selected===date?'border-[#207F85] ring-2 ring-[#207F85]/50 ':'border-slate-200 ')+
        (past?'bg-rose-100 text-rose-800 ':
         d.blocked?'bg-slate-200 text-slate-700 ':
         d.available===0?'bg-rose-50 text-slate-900 ':
         d.available===3?'bg-teal-50 text-slate-900 ':'bg-amber-50 text-slate-900 ')+
        (canBook?'hover:border-[#207F85]':'cursor-not-allowed')}>
       <span className="block text-sm font-bold sm:text-base">{i+1}</span>
       <span className="mt-1 block text-base font-black sm:text-xl">{d.blocked?'×':d.available}</span>
       <span className="block text-[9px] leading-tight sm:text-xs">
        {past?'Pasado':isToday?'Hoy':d.blocked?'Bloqueado':d.available===0?'Completo':date<calendar.first?'Próx.':'libres'}
       </span>
      </button>
     })}
    </div>}
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
     <span>🟢 3 disponibles</span><span>🟡 1–2 disponibles</span>
     <span>🔴 Completo</span><span>⚪ Bloqueado</span>
     <span className="font-semibold text-rose-800">▣ Día pasado</span>
     <span className="font-semibold text-[#207F85]">▢ Hoy (borde)</span>
    </div>
    <p className="mt-3 text-xs leading-relaxed text-slate-600">
     Las fechas que todavía no cumplen el plazo mínimo de preparación se muestran, pero no permiten reservar.
    </p>
   </div>}
  </section>
  {modalOpen&&valid&&calendar&&<div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 px-3 py-3 sm:px-6"
   onMouseDown={e=>{if(e.target===e.currentTarget)close()}}>
   <div role="dialog" aria-modal="true" aria-labelledby="mostrador-date-title" aria-describedby="mostrador-date-description"
    onKeyDown={handleModalKeys}
    className="flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white text-slate-800 shadow-2xl">
    <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
     <div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#207F85]">AriMar · Reserva presencial</p>
      <h2 id="mostrador-date-title" className="mt-1 text-xl font-extrabold sm:text-2xl">{dateLabel(selected)}</h2>
      <p id="mostrador-date-description" className="mt-1 text-sm text-slate-600">
       {left} {left===1?'pata disponible':'patas disponibles'} · Recogida 11:30–16:00 h
      </p>
     </div>
     <button type="button" ref={closeButton} disabled={busy} onClick={close} aria-label="Cerrar ventana"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold disabled:opacity-40">×</button>
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
     <form id="mostrador-booking-form" onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-semibold">Dependiente que registra
       <input className={input} value={operator} minLength={2} maxLength={60} autoComplete="off"
        required disabled={busy} placeholder="Tu nombre"
        onChange={e=>change(()=>setOperator(e.target.value))}/>
      </label>
      <label className="block text-sm font-semibold">Nombre del cliente
       <input className={input} value={name} minLength={2} maxLength={100} autoComplete="name"
        required disabled={busy} onChange={e=>change(()=>setName(e.target.value))}/>
      </label>
      <label className="block text-sm font-semibold">Teléfono de contacto (obligatorio)
       <input className={input} value={phone} type="tel" inputMode="tel" autoComplete="tel"
        required minLength={6} maxLength={30} disabled={busy} onChange={e=>change(()=>setPhone(e.target.value))}/>
      </label>
      <label className="block text-sm font-semibold">Correo electrónico (opcional)
       <input className={input} type="email" autoComplete="email" maxLength={254} disabled={busy}
        value={email} placeholder="correo@ejemplo.com"
        onChange={e=>change(()=>{setEmail(e.target.value);setReviewConsent(false)})}/>
      </label>
      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
       <input type="checkbox" checked={reviewConsent} disabled={busy||!email.trim()}
        className="mt-1 h-5 w-5 shrink-0 accent-[#207F85]"
        onChange={e=>change(()=>setReviewConsent(e.target.checked))}/>
       <span>El cliente autoriza a AriMar a enviarle por correo una invitación para valorar su experiencia en Google (opcional). Preguntar al cliente antes de marcar.</span>
      </label>
      <label className="block text-sm font-semibold">Patas enteras
       <select className={input} disabled={busy} value={Math.min(left,quantity)}
        onChange={e=>change(()=>setQuantity(Number(e.target.value)))}>
        {Array.from({length:Math.min(3,left)},(_,i)=><option key={i+1} value={i+1}>
         {i+1} {i===0?'pata':'patas'} · {(i+1)*90} €
        </option>)}
       </select>
      </label>
      <label className="block text-sm font-semibold">Forma de pago
       <select className={input} required value={paymentMethod} disabled={busy}
        onChange={e=>change(()=>setPaymentMethod(e.target.value as PaymentMethod))}>
        <option value="CASH">Efectivo</option>
        <option value="CARD">Tarjeta</option>
       </select>
      </label>
      <label className="block text-sm font-semibold">Fecha de pago
       <input className={input} type="date" required max={calendar.today} disabled={busy}
        value={paymentDate} onChange={e=>change(()=>setPaymentDate(e.target.value))}/>
      </label>
      <label className="block text-sm font-semibold">Número de factura/ticket
       <input className={input} required maxLength={100} disabled={busy}
        placeholder="Número del ticket emitido en caja" value={paymentReceipt}
        onChange={e=>change(()=>setPaymentReceipt(e.target.value))}/>
      </label>
      <details className="rounded-xl border border-slate-200 p-3">
       <summary className="min-h-10 cursor-pointer font-semibold text-[#207F85]">Observaciones (opcional)</summary>
       <textarea className={input} rows={2} value={notes} maxLength={420} disabled={busy}
        onChange={e=>change(()=>setNotes(e.target.value))}/>
      </details>
      <div className="rounded-xl bg-[#F1F8F7] p-4">
       <p className="text-xs text-slate-600">Importe total</p>
       <p className="text-2xl font-black text-[#1E293B]">{Math.min(left,quantity)*90} €</p>
       <p className="mt-2 text-xs leading-relaxed text-slate-600">
        El pago debe realizarse en caja antes de registrarlo aquí. Esta pantalla no cobra; guarda su fecha y número de ticket.
       </p>
      </div>
      {error&&<p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{error}</p>}
     </form>
    </div>
    <div className="flex shrink-0 justify-end gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
     <button type="button" disabled={busy} onClick={close}
      className="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold disabled:opacity-50">Cerrar</button>
     <button type="submit" form="mostrador-booking-form" disabled={busy||!paymentReceipt.trim()||!paymentDate||quantity>left}
      className="min-h-12 rounded-xl bg-[#207F85] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">
      {busy?'Registrando…':'Confirmar reserva'}
     </button>
    </div>
   </div>
  </div>}
 </main>
}
