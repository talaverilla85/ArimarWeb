'use client'
import {useEffect,useRef,useState} from 'react'
import InstallPataAdmin from './InstallPataAdmin'
type Day={date:string;capacity:number;occupied:number;available:number;blocked:boolean;note:string|null}
type Order={id:string;date:string;quantity:number;name:string;phone:string|null;email:string|null;status:string;source:string;notes:string|null;amountCents?:number}
const input='w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-teal-700 focus:outline-none'
function dayCanary(){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Atlantic/Canary',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const f=(t:string)=>p.find(x=>x.type===t)?.value||'';return [f('year'),f('month'),f('day')].join('-')}
function monthBounds(month:string){
 const start=month+'-01'
 const d=new Date(start+'T12:00:00Z')
 d.setUTCMonth(d.getUTCMonth()+1)
 d.setUTCDate(0)
 return {from:start,to:d.toISOString().slice(0,10)}
}
function shiftMonth(month:string,amount:number){
 const d=new Date(month+'-01T12:00:00Z')
 d.setUTCMonth(d.getUTCMonth()+amount)
 return d.toISOString().slice(0,7)
}
function monthLabel(month:string){
 const label=new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',month:'long',year:'numeric'}).format(new Date(month+'-01T12:00:00Z'))
 return label.charAt(0).toLocaleUpperCase('es-ES')+label.slice(1)
}
async function api(path:string,options?:RequestInit){
 const response=await fetch('/api/pata-asada/admin/'+path,{cache:'no-store',credentials:'same-origin',...options,
 headers:{...(options?.body?{'Content-Type':'application/json'}:{}),...(options?.headers||{})}})
 const data=await response.json()
 if(!response.ok)throw new Error(data.error||'Error de comunicación')
 return data
}
export default function PanelPataAsada(){
 const today=dayCanary()
 const [authenticated,setAuthenticated]=useState<boolean|null>(null)
 const [password,setPassword]=useState('')
 const [selected,setSelected]=useState(today)
 const [viewMonth,setViewMonth]=useState(()=>dayCanary().slice(0,7))
 const [loadingCalendar,setLoadingCalendar]=useState(false)
 const [configOpen,setConfigOpen]=useState(false)
 const [configError,setConfigError]=useState('')
 const closeDialogButton=useRef<HTMLButtonElement>(null)
 const previousFocus=useRef<HTMLElement|null>(null)
 const [days,setDays]=useState<Day[]>([])
 const [orders,setOrders]=useState<Order[]>([])
 const [upcomingOrders,setUpcomingOrders]=useState<Order[]>([])
 const [nextOrderCursor,setNextOrderCursor]=useState<string|null>(null)
 const [loadingOrders,setLoadingOrders]=useState(false)
 const [ordersError,setOrdersError]=useState('')
 const [orderView,setOrderView]=useState<'upcoming'|'month'>('upcoming')
 const [selectedOnly,setSelectedOnly]=useState(false)
 const [capacity,setCapacity]=useState(3)
 const [blocked,setBlocked]=useState(false)
 const [note,setNote]=useState('')
 const [name,setName]=useState('')
 const [phone,setPhone]=useState('')
 const [quantity,setQuantity]=useState(1)
 const [message,setMessage]=useState('')
 const [loading,setLoading]=useState(false)
 async function loadUpcoming(cursor:string|null=null,append=false){
  setLoadingOrders(true)
  setOrdersError('')
  try{
   const q=cursor?'?cursor='+encodeURIComponent(cursor):''
   const result=await api('upcoming'+q)
   setUpcomingOrders(prev=>append?[...prev,...result.orders]:result.orders)
   setNextOrderCursor(result.nextCursor)
  }catch(e){setOrdersError(e instanceof Error?e.message:'No se pudo consultar los encargos')}
  finally{setLoadingOrders(false)}
 }
 async function refresh(month=viewMonth){
  const {from,to}=monthBounds(month)
  const [d,o]=await Promise.all([api('days?from='+from+'&to='+to),api('orders?from='+from+'&to='+to)])
  if(month===viewMonth){setDays(d.days);setOrders(o.orders)}
  await loadUpcoming()
 }
 useEffect(()=>{api('session').then(d=>setAuthenticated(d.authenticated)).catch(()=>setAuthenticated(false))},[])
 useEffect(()=>{
  if(!configOpen)return
  const originalOverflow=document.body.style.overflow
  document.body.style.overflow='hidden'
  closeDialogButton.current?.focus()
  return ()=>{
   document.body.style.overflow=originalOverflow
   previousFocus.current?.focus()
  }
 },[configOpen])
 useEffect(()=>{if(authenticated)void loadUpcoming()},[authenticated])
 useEffect(()=>{
  if(!authenticated)return
  let active=true
  const {from,to}=monthBounds(viewMonth)
  setLoadingCalendar(true)
  setDays([])
  setOrders([])
  setMessage('')
  Promise.all([api('days?from='+from+'&to='+to),api('orders?from='+from+'&to='+to)])
   .then(([d,o])=>{if(active){setDays(d.days);setOrders(o.orders)}})
   .catch(e=>{if(active)setMessage(e instanceof Error?e.message:'Error al cargar el mes')})
   .finally(()=>{if(active)setLoadingCalendar(false)})
  return ()=>{active=false}
 },[authenticated,viewMonth])
 useEffect(()=>{
  const d=days.find(x=>x.date===selected)
  setCapacity(d?.capacity??3);setBlocked(d?.blocked??false);setNote(d?.note??'')
 },[selected,days])
 async function action(fn:()=>Promise<void>){
  setLoading(true);setMessage('')
  try{await fn();await refresh();setMessage('Cambios guardados correctamente.')}
  catch(e){setMessage(e instanceof Error?e.message:'Error desconocido')}
  finally{setLoading(false)}
 }
 function openDateConfig(date:string){
  const day=days.find(d=>d.date===date)
  if(!day)return
  previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
  setSelected(date)
  setCapacity(day.capacity)
  setBlocked(day.blocked)
  setNote(day.note??'')
  setConfigError('')
  setConfigOpen(true)
 }
 function closeDateConfig(){
  if(loading)return
  setConfigOpen(false)
  setConfigError('')
 }
 async function saveDateConfig(){
  if(loading||loadingCalendar||historical||!current)return
  setLoading(true)
  setConfigError('')
  try{
   await api('days',{method:'PATCH',body:JSON.stringify({date:selected,capacity,blocked,note})})
   await refresh()
   setMessage('Disponibilidad del '+readableDate(selected)+' guardada correctamente.')
   setConfigOpen(false)
  }catch(e){
   setConfigError(e instanceof Error?e.message:'No se pudo actualizar la fecha')
  }finally{
   setLoading(false)
  }
 }
 function handleDialogKeys(e:React.KeyboardEvent<HTMLDivElement>){
  if(e.key==='Escape'){e.preventDefault();closeDateConfig();return}
  if(e.key!=='Tab')return
  const focusable=e.currentTarget.querySelectorAll<HTMLElement>(
   'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  )
  if(!focusable.length)return
  const first=focusable[0],last=focusable[focusable.length-1]
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
 function navigateMonth(month:string){
  if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))return
  setViewMonth(month)
  setSelected(month===today.slice(0,7)?today:month+'-01')
 }
 const current=days.find(x=>x.date===selected)
 const historical=selected<today
 const {from:monthStart}=monthBounds(viewMonth)
 const leadDays=(new Date(monthStart+'T12:00:00Z').getUTCDay()+6)%7
 const confirmedForMonth=orders.filter(o=>o.status==='PAID'||o.status==='MANUAL_CONFIRMED')
  .sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id))
 const shownOrders=(orderView==='upcoming'?upcomingOrders:confirmedForMonth)
  .filter(o=>orderView!=='month'||!selectedOnly||o.date===selected)
 const shownUnits=shownOrders.reduce((total,o)=>total+o.quantity,0)
 function readableDate(date:string){
  return new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',weekday:'short',
   day:'numeric',month:'short',year:'numeric'}).format(new Date(date+'T12:00:00Z'))
 }
 if(authenticated===null)return <main className="mx-auto min-h-[70vh] max-w-5xl px-6 pb-20 pt-36">Comprobando acceso…</main>
 if(!authenticated)return <main className="mx-auto min-h-[75vh] max-w-lg px-6 pb-20 pt-36">
  <div className="rounded-3xl border bg-white p-8 shadow-lg">
   <p className="text-xs font-bold uppercase tracking-widest text-teal-700">AriMar · Gestión interna</p>
   <h1 className="mt-3 text-3xl font-black text-slate-900">Patas asadas</h1>
   <p className="my-5 text-sm text-slate-600">Panel privado de disponibilidad y reservas. No activa cobros.</p>
   <form onSubmit={e=>{e.preventDefault();action(async()=>{await api('session',{method:'POST',body:JSON.stringify({password})});setAuthenticated(true);setPassword('')})}}>
    <label className="block text-sm font-semibold">Clave de administración
     <input className={input+' mt-2'} type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/>
    </label>
    <button disabled={loading} className="mt-5 w-full rounded-xl bg-[#207F85] px-5 py-3 font-bold text-white disabled:opacity-50">Entrar</button>
   </form>
   {message&&<p role="alert" className="mt-4 text-sm text-rose-700">{message}</p>}
  </div>
 </main>
 return <main className="mx-auto min-h-screen max-w-6xl px-5 pb-20 pt-32 text-slate-800">
  <div className="flex flex-wrap items-start justify-between gap-4">
   <div><p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">AriMar · Uso interno</p>
    <h1 className="mt-2 text-3xl font-black">Disponibilidad de pata asada</h1>
    <p className="mt-2 text-sm text-slate-600">Máximo 3 por fecha · Precio 90 € · Los pagos online aún están desactivados.</p>
   </div>
   <button className="rounded-xl border px-4 py-2 text-sm" onClick={()=>action(async()=>{await api('session',{method:'DELETE'});setAuthenticated(false)})}>Salir</button>
  </div>
  <InstallPataAdmin/>
  {message&&<p role="status" className="my-5 rounded-xl border bg-slate-50 p-3 text-sm">{message}</p>}
  <section className="mt-7 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
   <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
     <h2 className="text-xl font-extrabold">Calendario de disponibilidad</h2>
     <p className="mt-1 text-sm text-slate-600">Consulta y planifica cualquier mes. Elige un día para gestionarlo.</p>
    </div>
    <button type="button" onClick={()=>navigateMonth(today.slice(0,7))}
     className="self-start rounded-lg border border-teal-700 px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50">
     Ir a este mes
    </button>
   </div>
   <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
    <button type="button" onClick={()=>navigateMonth(shiftMonth(viewMonth,-1))}
     aria-label="Mes anterior" className="rounded-lg border bg-white px-3 py-2 font-bold hover:bg-slate-100">‹ <span className="hidden sm:inline">Anterior</span></button>
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
     <strong aria-live="polite" className="text-base font-extrabold sm:text-lg">{monthLabel(viewMonth)}</strong>
     <input type="month" value={viewMonth} aria-label="Elegir mes y año"
      onChange={e=>navigateMonth(e.target.value)}
      className="max-w-[165px] rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800"/>
    </div>
    <button type="button" onClick={()=>navigateMonth(shiftMonth(viewMonth,1))}
     aria-label="Mes siguiente" className="rounded-lg border bg-white px-3 py-2 font-bold hover:bg-slate-100"><span className="hidden sm:inline">Siguiente</span> ›</button>
   </div>
   <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-600 sm:gap-2">
    {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(w=><div key={w} className="py-1">{w}</div>)}
   </div>
   {loadingCalendar
    ? <p className="py-10 text-center text-slate-600" role="status">Cargando disponibilidad del mes…</p>
    : <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {Array.from({length:leadDays},(_,i)=><div key={'blank-'+i} aria-hidden="true"/>)}
      {days.map(d=><button key={d.date} type="button" onClick={()=>openDateConfig(d.date)}
       aria-pressed={selected===d.date}
       aria-label={d.date+': '+(d.blocked?'fecha bloqueada':d.available+' patas disponibles de '+d.capacity)}
       className={'min-h-20 rounded-xl border p-1.5 text-center transition hover:border-teal-600 sm:min-h-24 sm:p-2 '+(selected===d.date?'border-teal-700 ring-2 ring-teal-700':'border-slate-200')+(d.blocked?' bg-slate-200':d.available===0?' bg-rose-50':d.available===3?' bg-teal-50':' bg-amber-50')}>
        <span className="block text-sm font-bold sm:text-base">{Number(d.date.slice(-2))}</span>
        <span className="mt-1 block text-base font-black sm:text-xl">{d.blocked?'×':d.available}</span>
        <span className="block text-[9px] leading-tight sm:text-xs">{d.blocked?'Bloqueado':d.available===0?'Completo':'libres'}</span>
       </button>)}
     </div>}
   <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
    <span>🟢 3 disponibles</span><span>🟡 1 o 2 disponibles</span>
    <span>🔴 Completo</span><span>⚪ Bloqueado</span>
   </div>
  </section>
  <div className="mt-6">
   <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
    <h2 className="text-xl font-extrabold">Añadir encargo manual</h2>
    <p className="mt-2 text-sm text-slate-600">Pedidos gestionados por WhatsApp o teléfono. Ocupan unidades inmediatamente y aparecen en la lista de encargos.</p>
    <label className="mt-4 block text-sm font-semibold">Fecha de recogida
     <input className={input+' mt-2'} type="date" min={today} value={selected}
      onChange={e=>{const date=e.target.value;setSelected(date);if(date&&date.slice(0,7)!==viewMonth)setViewMonth(date.slice(0,7))}}/>
    </label>
    <p className="mt-2 text-sm text-slate-600">Disponibles para esa fecha: <strong>{current?.available??'—'}</strong> de {current?.capacity??3} {current?.blocked?'· Día bloqueado':''}</p>
    <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={e=>{e.preventDefault();action(async()=>{
     await api('manual',{method:'POST',body:JSON.stringify({date:selected,quantity,name,phone,notes:''})})
     setName('');setPhone('')
    })}}>
     <label className="block text-sm font-semibold">Nombre del cliente
      <input className={input+' mt-2'} required minLength={2} maxLength={100} value={name} onChange={e=>setName(e.target.value)}/>
     </label>
     <label className="block text-sm font-semibold">Teléfono (opcional)
      <input className={input+' mt-2'} maxLength={30} value={phone} onChange={e=>setPhone(e.target.value)}/>
     </label>
     <label className="block text-sm font-semibold">Número de patas
      <select className={input+' mt-2'} value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
       {[1,2,3].map(n=><option key={n}>{n}</option>)}
      </select>
     </label>
     <p className="text-sm sm:col-span-2">Importe del encargo: <strong>{quantity*90} €</strong> (el panel no cobra).</p>
     <button disabled={loading||loadingCalendar||historical||!current||current.blocked||quantity>current.available} className="rounded-xl bg-[#207F85] px-5 py-3 font-bold text-white disabled:opacity-50 sm:col-span-2 sm:justify-self-start">Registrar encargo</button>
    </form>
   </section>
  </div>
  <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
   <div className="flex flex-wrap items-start justify-between gap-3">
    <div>
     <p className="text-xs font-bold uppercase tracking-widest text-teal-800">Producción · Patas asadas</p>
     <h2 className="mt-1 text-2xl font-extrabold">Lista de encargos confirmados</h2>
     <p className="mt-2 max-w-2xl text-sm text-slate-600">
      Los pedidos quedan guardados en la base de datos. Aquí aparecen los cobrados online y los confirmados manualmente; nunca las solicitudes pendientes de pago.
     </p>
    </div>
    <button type="button" disabled={loadingOrders} onClick={()=>{void refresh(viewMonth).catch(e=>setMessage(e instanceof Error?e.message:'Error al actualizar'))}}
      className="rounded-xl border border-teal-700 px-4 py-2 text-sm font-bold text-teal-800 hover:bg-teal-50 disabled:opacity-50">
      Actualizar lista
    </button>
   </div>
   <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Vista de encargos">
    <button type="button" onClick={()=>setOrderView('upcoming')}
      aria-pressed={orderView==='upcoming'}
      className={'rounded-xl px-4 py-2 text-sm font-bold '+(orderView==='upcoming'?'bg-[#207F85] text-white':'border bg-slate-50 text-slate-700')}>
      Próximos encargos
    </button>
    <button type="button" onClick={()=>setOrderView('month')}
      aria-pressed={orderView==='month'}
      className={'rounded-xl px-4 py-2 text-sm font-bold '+(orderView==='month'?'bg-[#207F85] text-white':'border bg-slate-50 text-slate-700')}>
      Mes seleccionado ({monthLabel(viewMonth)})
    </button>
   </div>
   {orderView==='month'&&<label className="mt-4 flex items-center gap-2 text-sm font-medium">
    <input type="checkbox" checked={selectedOnly} onChange={e=>setSelectedOnly(e.target.checked)}/>
    Solo el día {readableDate(selected)}
   </label>}
   <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 p-3 text-sm">
    <span><strong>{shownOrders.length}</strong> encargos mostrados</span>
    <span><strong>{shownUnits}</strong> patas en total</span>
    <span className="text-slate-600">{orderView==='upcoming'?'Ordenados por fecha de recogida':'Periodo: '+monthLabel(viewMonth)}</span>
   </div>
   {ordersError&&orderView==='upcoming'&&<p role="alert" className="mt-4 text-sm font-semibold text-rose-700">{ordersError}</p>}
   {(loadingOrders&&orderView==='upcoming'&&upcomingOrders.length===0)|| (loadingCalendar&&orderView==='month')
    ?<p role="status" className="py-7 text-center text-sm text-slate-600">Cargando encargos…</p>
    :shownOrders.length===0
     ?<p className="mt-4 rounded-xl border border-dashed p-6 text-center text-sm text-slate-600">
      No hay encargos confirmados en esta vista.
     </p>
     :<div className="mt-3 divide-y divide-slate-200">
      {shownOrders.map(o=><article key={o.id} className="grid gap-3 py-4 sm:grid-cols-[1.4fr_1.2fr_0.7fr_auto] sm:items-center">
       <div className="min-w-0">
        <p className="text-base font-extrabold text-slate-900">{o.name}</p>
        <p className="text-xs text-slate-500">Ref. {o.id.slice(0,8).toUpperCase()}</p>
        {o.phone&&<a href={'tel:'+o.phone} className="text-sm font-medium text-teal-800 underline">{o.phone}</a>}
       </div>
       <div>
        <p className="font-bold">{readableDate(o.date)}</p>
        <p className="text-xs text-slate-500">Recogida en AriMar</p>
       </div>
       <div>
        <p className="font-bold">{o.quantity} {o.quantity===1?'pata':'patas'}</p>
        <p className="text-sm text-slate-600">{((o.amountCents??o.quantity*9000)/100).toLocaleString('es-ES',{style:'currency',currency:'EUR'})}</p>
       </div>
       <div>
        <span className={'inline-block rounded-full px-3 py-1 text-xs font-bold '+(o.status==='PAID'?'bg-teal-100 text-teal-900':'bg-amber-100 text-amber-900')}>
         {o.status==='PAID'?'Pago confirmado':'Confirmado manualmente'}
        </span>
        <p className="mt-1 text-xs text-slate-500">{o.source==='MANUAL'?'WhatsApp / teléfono':'Reserva online'}</p>
       </div>
       {o.notes&&<p className="text-xs text-slate-600 sm:col-span-4">Observaciones: {o.notes}</p>}
      </article>)}
     </div>}
   {orderView==='upcoming'&&nextOrderCursor&&<button type="button"
    onClick={()=>{void loadUpcoming(nextOrderCursor,true)}} disabled={loadingOrders}
    className="mt-5 w-full rounded-xl border border-teal-700 px-5 py-3 text-sm font-bold text-teal-800 hover:bg-teal-50 disabled:opacity-50">
    {loadingOrders?'Cargando…':'Cargar más encargos'}
   </button>}
   <p className="mt-4 text-xs leading-relaxed text-slate-500">
    Los encargos introducidos manualmente cuentan para producción, pero su estado no acredita el cobro.
    Para ver pagos pendientes o incidencias se mantiene el registro administrativo por fecha.
   </p>
  </section>

  {configOpen&&current&&<div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 px-3 py-4 sm:px-6"
   onMouseDown={e=>{if(e.target===e.currentTarget)closeDateConfig()}}>
    <div role="dialog" aria-modal="true" aria-labelledby="pata-config-title"
     aria-describedby="pata-config-description" onKeyDown={handleDialogKeys}
     className="w-full max-w-xl max-h-[92dvh] overflow-y-auto rounded-3xl bg-white text-slate-800 shadow-2xl"
    >
     <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
      <div>
       <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">Disponibilidad · AriMar</p>
       <h2 id="pata-config-title" className="mt-1 text-xl font-extrabold sm:text-2xl">
        {readableDate(selected)}
       </h2>
       <p id="pata-config-description" className="mt-1 text-sm text-slate-600">
        {historical?'Consulta de una fecha anterior.': 'Modifica la capacidad o bloquea este día.'}
       </p>
      </div>
      <button ref={closeDialogButton} type="button" onClick={closeDateConfig} disabled={loading}
       aria-label="Cerrar configuración de fecha"
       className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-50">×</button>
     </div>
     <div className="space-y-5 px-5 py-5 sm:px-7">
      <div className="grid grid-cols-3 gap-2 text-center">
       <div className="rounded-xl bg-slate-50 p-3">
        <p className="text-2xl font-black">{current.capacity}</p>
        <p className="mt-1 text-xs text-slate-600">Capacidad</p>
       </div>
       <div className="rounded-xl bg-amber-50 p-3">
        <p className="text-2xl font-black">{current.occupied}</p>
        <p className="mt-1 text-xs text-slate-600">Ocupadas</p>
       </div>
       <div className="rounded-xl bg-teal-50 p-3">
        <p className="text-2xl font-black">{current.available}</p>
        <p className="mt-1 text-xs text-slate-600">Disponibles</p>
       </div>
      </div>
      {current.blocked&&<p className="rounded-xl bg-slate-100 p-3 text-sm font-bold">Este día está bloqueado para nuevos encargos.</p>}
      <label className="block text-sm font-semibold">
       Capacidad máxima de esta fecha
       <select className={input+' mt-2'} value={capacity} disabled={historical||loading}
        onChange={e=>setCapacity(Number(e.target.value))}>
        {[0,1,2,3].map(n=><option key={n} value={n}>{n} {n===1?'pata':'patas'}</option>)}
       </select>
      </label>
      <label className="flex items-center gap-3 text-sm font-semibold">
       <input type="checkbox" checked={blocked} disabled={historical||loading}
        onChange={e=>setBlocked(e.target.checked)} className="h-5 w-5 accent-teal-700"/>
       Bloquear esta fecha para nuevos encargos
      </label>
      <label className="block text-sm font-semibold">
       Nota interna (opcional)
       <textarea className={input+' mt-2'} rows={2} maxLength={250} value={note}
        disabled={historical||loading} onChange={e=>setNote(e.target.value)}
        placeholder="Festivo, falta de proveedor, motivo del bloqueo…"/>
      </label>
      <div className="rounded-xl border border-slate-200 p-3">
       <h3 className="text-sm font-bold">Encargos registrados para este día</h3>
       {orders.filter(o=>o.date===selected).length===0
        ?<p className="mt-2 text-sm text-slate-500">Todavía no hay encargos.</p>
        :<div className="mt-2 divide-y">
         {orders.filter(o=>o.date===selected).map(o=><div key={o.id} className="flex justify-between gap-3 py-2 text-sm">
          <div><span className="font-semibold">{o.name}</span>
           <p className="text-xs text-slate-500">{o.status==='PAID'?'Pagado':o.status==='MANUAL_CONFIRMED'?'Manual confirmado':o.status}</p>
          </div>
          <strong>{o.quantity} {o.quantity===1?'pata':'patas'}</strong>
         </div>)}
        </div>}
      </div>
      {configError&&<p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{configError}</p>}
      {historical&&<p className="text-sm font-semibold text-amber-800">La configuración de fechas pasadas no se puede modificar.</p>}
     </div>
     <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
      <button type="button" onClick={closeDateConfig} disabled={loading}
       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold disabled:opacity-50">Cerrar</button>
      {!historical&&<button type="button" disabled={loading||loadingCalendar||capacity<current.occupied}
       onClick={()=>{void saveDateConfig()}}
       className="rounded-xl bg-[#207F85] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#18686D] disabled:opacity-50">
       {loading?'Guardando…':'Guardar cambios'}
      </button>}
     </div>
    </div>
   </div>}
 </main>
}
