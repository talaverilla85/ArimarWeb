'use client'
import {useCallback,useEffect,useRef,useState,type FormEvent} from 'react'
import CalendarioPataCliente from '@/app/pata-asada-gran-canaria/CalendarioPataCliente'
type PublicDay={date:string;available:number}
type Calendar={from:string;to:string;available:Record<string,number>}
type Confirmation={reference:string;date:string;quantity:number;name:string;amountCents:number}
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
function readableDate(date:string){
 const text=new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',
  weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(date+'T12:00:00Z'))
 return text.charAt(0).toLocaleUpperCase('es-ES')+text.slice(1)
}
export default function PanelMostradorPata(){
 const [authenticated,setAuthenticated]=useState<boolean|null>(null)
 const [password,setPassword]=useState('')
 const [loginBusy,setLoginBusy]=useState(false)
 const [calendar,setCalendar]=useState<Calendar|null>(null)
 const [calendarBusy,setCalendarBusy]=useState(false)
 const [calendarError,setCalendarError]=useState('')
 const [selected,setSelected]=useState('')
 const [quantity,setQuantity]=useState(1)
 const [name,setName]=useState('')
 const [phone,setPhone]=useState('')
 const [operator,setOperator]=useState('')
 const [notes,setNotes]=useState('')
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 const [confirmation,setConfirmation]=useState<Confirmation|null>(null)
 const keyRef=useRef<string|null>(null)
 const formRef=useRef<HTMLDivElement>(null)
 const [reload,setReload]=useState(0)
 const loadCalendar=useCallback(async()=>{
  setCalendarBusy(true);setCalendarError('')
  try{
   const data=await staffApi('days') as {from:string;to:string;days:PublicDay[]}
   const available:Record<string,number>={}
   for(const day of data.days){
    if(typeof day.date==='string'&&Number.isInteger(day.available)
      &&day.available>=1&&day.available<=3)available[day.date]=day.available
   }
   setCalendar({from:data.from,to:data.to,available})
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
 useEffect(()=>{
  if(authenticated&&reload>0)void loadCalendar()
 },[reload,authenticated,loadCalendar])
 const left=calendar?.available[selected]??0
 function change(action:()=>void){
  keyRef.current=null
  setError('')
  action()
 }
 function pick(date:string){
  if(!calendar?.available[date]||busy)return
  change(()=>{setSelected(date);setQuantity(1);setConfirmation(null)})
  window.requestAnimationFrame(()=>formRef.current?.scrollIntoView({behavior:'smooth',block:'start'}))
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
  if(busy||!selected||left<quantity)return
  if(!keyRef.current)keyRef.current=crypto.randomUUID()
  setBusy(true);setError('')
  const customer=name.trim(),units=quantity,date=selected
  try{
   const result=await staffApi('book',{method:'POST',body:JSON.stringify({
    key:keyRef.current,date,quantity:units,
    name:customer,phone:phone.trim(),notes:notes.trim(),operator:operator.trim()
   })}) as {reference:string;amountCents:number;date:string;quantity:number}
   setConfirmation({reference:result.reference,amountCents:result.amountCents,
    date:result.date,quantity:result.quantity,name:customer})
   setName('');setPhone('');setNotes('');setSelected('');setQuantity(1)
   keyRef.current=null
   await loadCalendar()
  }catch(e){setError(e instanceof Error?e.message:'No se pudo registrar')}
  finally{setBusy(false)}
 }
 async function logout(){
  if(busy)return
  await staffApi('session',{method:'DELETE'})
  setAuthenticated(false);setCalendar(null);setConfirmation(null)
 }
 if(authenticated===null)return <main className="mx-auto max-w-3xl px-4 pb-20 pt-32 text-slate-700">Comprobando acceso al mostrador…</main>
 if(!authenticated)return <main className="mx-auto min-h-[75vh] max-w-lg px-4 pb-20 pt-32 text-slate-800">
  <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
   <p className="text-xs font-extrabold uppercase tracking-widest text-[#207F85]">AriMar · Equipo de mostrador</p>
   <h1 className="mt-3 text-3xl font-black">Reservar pata asada</h1>
   <p className="mt-3 text-sm leading-relaxed text-slate-600">
    Acceso para dependientes. Permite registrar encargos, no modificar fechas ni consultar el panel administrativo.
   </p>
   <form className="mt-6" onSubmit={login}>
    <label className="block text-sm font-semibold">Contraseña del mostrador
     <input className={input} type="password" autoComplete="current-password"
      value={password} onChange={e=>setPassword(e.target.value)}
      required maxLength={512}/>
    </label>
    <button disabled={loginBusy} className="mt-5 min-h-14 w-full rounded-xl bg-[#207F85] px-5 py-3 text-base font-extrabold text-white disabled:opacity-50">
     {loginBusy?'Comprobando…':'Acceder al mostrador'}
    </button>
   </form>
   {error&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{error}</p>}
  </div>
 </main>
 return <main className="mx-auto max-w-5xl px-3 pb-24 pt-28 text-slate-800 sm:px-6 sm:pt-32">
  <header className="flex flex-wrap items-start justify-between gap-3 px-1">
   <div>
    <p className="text-xs font-extrabold uppercase tracking-wider text-[#207F85]">AriMar · Mostrador</p>
    <h1 className="mt-2 text-2xl font-black sm:text-3xl">Nueva reserva de pata asada</h1>
    <p className="mt-2 text-sm text-slate-600">Reservas presenciales · Máximo 3 patas por día</p>
   </div>
   <button type="button" onClick={()=>void logout()}
    className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold">Salir</button>
  </header>

  {confirmation&&<section className="mt-6 rounded-2xl border-2 border-teal-600 bg-[#F1F8F7] p-5" aria-live="polite">
   <p className="text-sm font-extrabold uppercase tracking-widest text-[#207F85]">Reserva registrada</p>
   <p className="mt-2 text-2xl font-black tabular-nums text-[#1E293B]">{confirmation.reference}</p>
   <p className="mt-2 text-sm text-slate-700">{confirmation.name} · {readableDate(confirmation.date)}</p>
   <p className="text-sm text-slate-700">{confirmation.quantity} {confirmation.quantity===1?'pata':'patas'} · {confirmation.amountCents/100} €</p>
   <p className="mt-3 rounded-lg bg-white p-3 text-sm font-semibold text-amber-900">
    Encargo confirmado. Cobro no registrado en esta pantalla: comprueba el pago por separado.
   </p>
   <button className="mt-4 min-h-12 rounded-xl border border-[#207F85] bg-white px-4 font-bold text-[#207F85]"
    type="button" onClick={()=>{const summary=
     'AriMar · Reserva '+confirmation.reference+'\n'+confirmation.name+'\n'+
     readableDate(confirmation.date)+'\n'+confirmation.quantity+' patas · '+
     confirmation.amountCents/100+' €\nRecogida: 11:30–16:00 h\nPago: pendiente de comprobación'
     void navigator.clipboard?.writeText(summary)}}>
    Copiar datos de la reserva
   </button>
  </section>}

  <section className="mt-6 rounded-2xl border bg-white p-3 shadow-sm sm:p-6">
   <div className="flex items-start justify-between gap-3 px-1">
    <div>
     <h2 className="text-xl font-black">1. Elige el día de recogida</h2>
     <p className="mt-1 text-sm text-slate-600">Solo se muestran las fechas disponibles.</p>
    </div>
    <button type="button" disabled={calendarBusy} onClick={()=>void loadCalendar()}
     className="min-h-12 shrink-0 rounded-xl border px-3 text-sm font-bold text-[#207F85] disabled:opacity-50">Actualizar</button>
   </div>
   {calendarError&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{calendarError}</p>}
   {calendar&&<CalendarioPataCliente
    from={calendar.from} to={calendar.to} quantity={1} value={selected}
    available={calendar.available}
    status={calendarBusy?'loading':'ready'} onSelect={pick}
    onReload={()=>void loadCalendar()}/>}
   {!calendar&&!calendarError&&<p className="py-10 text-center text-slate-600">Cargando calendario…</p>}
  </section>

  {selected&&<section ref={formRef} className="mt-5 scroll-mt-28 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
   <h2 className="text-xl font-black">2. Datos del encargo</h2>
   <p className="mt-2 text-base font-extrabold capitalize text-[#207F85]">{readableDate(selected)}</p>
   <p className="mt-1 text-sm text-slate-600">{left} patas libres · Recogida de 11:30 a 16:00 h</p>
   <form onSubmit={submit} className="mt-5 space-y-4">
    <label className="block text-sm font-semibold">Dependiente que registra
     <input className={input} value={operator} minLength={2} maxLength={60}
      autoComplete="off" required disabled={busy} placeholder="Tu nombre"
      onChange={e=>change(()=>setOperator(e.target.value))}/>
    </label>
    <label className="block text-sm font-semibold">Nombre del cliente
     <input className={input} value={name} minLength={2} maxLength={100}
      autoComplete="name" required disabled={busy}
      onChange={e=>change(()=>setName(e.target.value))}/>
    </label>
    <label className="block text-sm font-semibold">Teléfono de contacto
     <input className={input} value={phone} type="tel" inputMode="tel"
      autoComplete="tel" required maxLength={30} minLength={6} disabled={busy}
      onChange={e=>change(()=>setPhone(e.target.value))}/>
    </label>
    <label className="block text-sm font-semibold">Patas enteras
     <select className={input} disabled={busy} value={quantity}
      onChange={e=>change(()=>setQuantity(Number(e.target.value)))}>
      {Array.from({length:Math.max(1,Math.min(3,left))},(_,i)=><option key={i+1} value={i+1}>{i+1} · {(i+1)*90} €</option>)}
     </select>
    </label>
    <details className="rounded-xl border border-slate-200 p-3">
     <summary className="min-h-10 cursor-pointer font-semibold text-[#207F85]">Observaciones (opcional)</summary>
     <textarea className={input} rows={2} value={notes} maxLength={420}
      disabled={busy} onChange={e=>change(()=>setNotes(e.target.value))}/>
    </details>
    <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
     <div><p className="text-xs text-slate-500">Importe del encargo</p>
      <p className="text-2xl font-black">{quantity*90} €</p></div>
     <button disabled={busy||quantity>left}
      className="min-h-14 rounded-xl bg-[#207F85] px-5 py-3 text-base font-extrabold text-white disabled:opacity-50">
      {busy?'Registrando…':'Confirmar reserva'}
     </button>
    </div>
    <p className="text-xs leading-relaxed text-slate-600">
     Al confirmar se descuentan las unidades disponibles. Esta pantalla no cobra ni confirma que el pedido esté pagado.
    </p>
    {error&&<p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{error}</p>}
   </form>
  </section>}
  {!selected&&<p className="mt-5 text-center text-sm text-slate-500">Selecciona una fecha para registrar una reserva.</p>}
 </main>
}
