'use client'
import {useEffect,useState} from 'react'
type Day={date:string;capacity:number;occupied:number;available:number;blocked:boolean;note:string|null}
type Order={id:string;date:string;quantity:number;name:string;phone:string|null;email:string|null;status:string;source:string;notes:string|null}
const input='w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-teal-700 focus:outline-none'
function dayCanary(){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Atlantic/Canary',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const f=(t:string)=>p.find(x=>x.type===t)?.value||'';return [f('year'),f('month'),f('day')].join('-')}
function plus(date:string,n:number){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
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
 const [days,setDays]=useState<Day[]>([])
 const [orders,setOrders]=useState<Order[]>([])
 const [capacity,setCapacity]=useState(3)
 const [blocked,setBlocked]=useState(false)
 const [note,setNote]=useState('')
 const [name,setName]=useState('')
 const [phone,setPhone]=useState('')
 const [quantity,setQuantity]=useState(1)
 const [message,setMessage]=useState('')
 const [loading,setLoading]=useState(false)
 async function refresh(){
  const from=today,to=plus(today,30)
  const [d,o]=await Promise.all([api('days?from='+from+'&to='+to),api('orders?from='+from+'&to='+to)])
  setDays(d.days);setOrders(o.orders)
 }
 useEffect(()=>{api('session').then(d=>setAuthenticated(d.authenticated)).catch(()=>setAuthenticated(false))},[])
 useEffect(()=>{
  if(authenticated)refresh().catch(e=>setMessage(e.message))
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[authenticated])
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
 const current=days.find(x=>x.date===selected)
 const selectedOrders=orders.filter(x=>x.date===selected)
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
  {message&&<p role="status" className="my-5 rounded-xl border bg-slate-50 p-3 text-sm">{message}</p>}
  <section className="mt-7 rounded-2xl border bg-white p-5 shadow-sm">
   <h2 className="text-xl font-extrabold">Calendario · Próximos 31 días</h2>
   <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
    {days.map(d=><button key={d.date} type="button" onClick={()=>setSelected(d.date)}
     className={'rounded-xl border p-2 text-left transition '+(selected===d.date?'border-teal-700 ring-2 ring-teal-700':'border-slate-200')+(d.blocked?' bg-slate-200':d.available===0?' bg-rose-50':d.available===3?' bg-teal-50':' bg-amber-50')}>
      <span className="block text-xs font-medium text-slate-600">{d.date.slice(5)}</span>
      <span className="block text-lg font-black">{d.blocked?'×':d.available}</span>
      <span className="block text-[11px]">{d.blocked?'Bloqueado':'libres / '+d.capacity}</span>
     </button>)}
   </div>
  </section>
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
   <section className="rounded-2xl border bg-white p-5">
    <h2 className="text-xl font-extrabold">Configurar fecha</h2>
    <label className="mt-4 block text-sm font-semibold">Fecha
     <input className={input+' mt-2'} type="date" min={today} value={selected} onChange={e=>setSelected(e.target.value)}/>
    </label>
    <p className="mt-3 text-sm text-slate-600">Ya ocupadas: <strong>{current?.occupied??0}</strong> · Libres: <strong>{current?.available??'—'}</strong></p>
    <label className="mt-4 block text-sm font-semibold">Capacidad máxima
     <select className={input+' mt-2'} value={capacity} onChange={e=>setCapacity(Number(e.target.value))}>
      {[0,1,2,3].map(n=><option key={n} value={n}>{n} {n===1?'pata':'patas'}</option>)}
     </select>
    </label>
    <label className="mt-4 flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={blocked} onChange={e=>setBlocked(e.target.checked)}/> Fecha bloqueada</label>
    <label className="mt-4 block text-sm font-semibold">Nota interna
     <input className={input+' mt-2'} value={note} maxLength={250} onChange={e=>setNote(e.target.value)} placeholder="Festivo, falta de proveedor…"/>
    </label>
    <button disabled={loading||!selected} onClick={()=>action(async()=>{await api('days',{method:'PATCH',body:JSON.stringify({date:selected,capacity,blocked,note})})})}
     className="mt-5 rounded-xl bg-[#207F85] px-5 py-3 font-bold text-white disabled:opacity-50">Guardar disponibilidad</button>
   </section>
   <section className="rounded-2xl border bg-white p-5">
    <h2 className="text-xl font-extrabold">Añadir encargo manual</h2>
    <p className="mt-2 text-sm text-slate-600">Pedidos gestionados por WhatsApp o teléfono. Ocupan unidades inmediatamente.</p>
    <form className="mt-4 space-y-4" onSubmit={e=>{e.preventDefault();action(async()=>{
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
     <p className="text-sm">Importe del encargo: <strong>{quantity*90} €</strong> (el panel no cobra).</p>
     <button disabled={loading||!selected} className="rounded-xl bg-[#207F85] px-5 py-3 font-bold text-white disabled:opacity-50">Registrar encargo</button>
    </form>
   </section>
  </div>
  <section className="mt-6 rounded-2xl border bg-white p-5">
   <h2 className="text-xl font-extrabold">Encargos del {selected}</h2>
   {selectedOrders.length===0?<p className="mt-3 text-sm text-slate-600">No hay encargos registrados para este día.</p>:
    <div className="mt-4 divide-y">{selectedOrders.map(o=><article key={o.id} className="flex flex-wrap justify-between gap-3 py-3">
     <div><strong>{o.name}</strong><p className="text-sm text-slate-500">{o.phone||o.email||'Sin contacto'} · {o.source==='MANUAL'?'Encargo manual':'Solicitud online'}</p></div>
     <div className="text-right"><strong>{o.quantity} {o.quantity===1?'pata':'patas'}</strong>
      <p className="text-xs text-slate-600">{o.status==='MANUAL_CONFIRMED'?'Confirmado manualmente':o.status}</p></div>
    </article>)}</div>}
  </section>
 </main>
}
