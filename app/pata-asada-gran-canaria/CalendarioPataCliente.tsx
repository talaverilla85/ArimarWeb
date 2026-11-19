'use client'
import {useEffect,useState} from 'react'

type Props={
 from:string;to:string;value:string;quantity:number;
 available:Record<string,number>;
 status:'loading'|'ready'|'error';
 onSelect:(date:string)=>void;onReload:()=>void
}
function monthShift(m:string,amount:number):string{
 const d=new Date(m+'-01T12:00:00Z')
 d.setUTCMonth(d.getUTCMonth()+amount)
 return d.toISOString().slice(0,7)
}
function titleFor(m:string):string{
 const name=new Intl.DateTimeFormat('es-ES',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(m+'-01T12:00:00Z'))
 return name.charAt(0).toLocaleUpperCase('es-ES')+name.slice(1)
}
export default function CalendarioPataCliente({
 from,to,value,quantity,available,status,onSelect,onReload
}:Props){
 const [month,setMonth]=useState(()=>from.slice(0,7))
 const firstMonth=from.slice(0,7),lastMonth=to.slice(0,7)
 useEffect(()=>{
  if(month<firstMonth||month>lastMonth)setMonth(firstMonth)
 },[month,firstMonth,lastMonth])
 const [year,mon]=month.split('-').map(Number)
 const maxDay=new Date(Date.UTC(year,mon,0)).getUTCDate()
 const offset=(new Date(Date.UTC(year,mon-1,1)).getUTCDay()+6)%7
 const left=month>firstMonth,right=month<lastMonth
 const visibleCount=Array.from({length:maxDay},(_,i)=>{
  const date=month+'-'+String(i+1).padStart(2,'0')
  return date>=from&&date<=to&&((available[date]??0)>=quantity) ? 1:0
 }).reduce<number>((a,b)=>a+b,0)
 return <div className="mt-2 rounded-2xl border border-[#C7DFE0] bg-white p-3 sm:p-5">
  <div className="flex flex-wrap items-center justify-between gap-2">
   <button type="button" disabled={!left||status==='loading'} onClick={()=>setMonth(monthShift(month,-1))}
    aria-label="Mes anterior" className="rounded-lg border border-[#C7DFE0] px-3 py-2 font-bold text-[#207F85] disabled:opacity-30">‹</button>
   <div className="flex flex-col items-center gap-2 sm:flex-row">
    <strong aria-live="polite" className="text-base font-extrabold text-[#1E293B]">{titleFor(month)}</strong>
    <input type="month" aria-label="Elegir mes" value={month} min={firstMonth} max={lastMonth}
      onChange={e=>{if(e.target.value>=firstMonth&&e.target.value<=lastMonth)setMonth(e.target.value)}}
      className="max-w-[158px] rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-700"/>
   </div>
   <button type="button" disabled={!right||status==='loading'} onClick={()=>setMonth(monthShift(month,1))}
    aria-label="Mes siguiente" className="rounded-lg border border-[#C7DFE0] px-3 py-2 font-bold text-[#207F85] disabled:opacity-30">›</button>
  </div>
  <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 sm:gap-2">
   {['L','M','X','J','V','S','D'].map((d,i)=><span key={i} className="py-1">{d}</span>)}
  </div>
  {status==='loading'?
   <p role="status" className="py-10 text-center text-sm text-slate-600">Consultando fechas disponibles…</p>:
   status==='error'?
   <div role="alert" className="space-y-3 py-6 text-center">
    <p className="text-sm font-semibold text-rose-700">No podemos consultar la disponibilidad ahora. No se permiten solicitudes sin comprobarla.</p>
    <button type="button" onClick={onReload} className="rounded-lg border border-[#207F85] px-4 py-2 text-sm font-bold text-[#207F85]">Volver a intentar</button>
   </div>:
   <>
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
     {Array.from({length:offset},(_,i)=><span key={'blank-'+i} aria-hidden="true"/>)}
     {Array.from({length:maxDay},(_,i)=>{
      const date=month+'-'+String(i+1).padStart(2,'0')
      const leftUnits=available[date]??0
      const selectable=date>=from&&date<=to&&quantity>0&&leftUnits>=quantity
      if(!selectable) return <div key={date} aria-hidden="true" className="min-h-12 sm:min-h-16"/>
      return <button type="button" key={date} onClick={()=>onSelect(date)}
       aria-pressed={value===date}
       aria-label={date+': '+leftUnits+' patas disponibles'}
       className={'flex min-h-12 flex-col items-center justify-center rounded-xl border px-1 py-2 text-sm font-extrabold transition hover:border-[#207F85] sm:min-h-16 '+(value===date
        ?'border-[#207F85] bg-[#207F85] text-white ring-2 ring-[#80D0D1]'
        :'border-[#C7DFE0] bg-[#F1F8F7] text-[#1E293B]')}>
       <span>{i+1}</span>
       <span className={'mt-0.5 text-[10px] font-medium '+(value===date?'text-white':'text-[#207F85]')}>{leftUnits} libres</span>
      </button>
     })}
    </div>
    {visibleCount===0&&<p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900" role="status">
     No hay fechas disponibles este mes para {quantity} {quantity===1?'pata':'patas'}. Consulta otro mes o reduce la cantidad.
    </p>}
    <p className="mt-4 text-xs leading-relaxed text-slate-600">
     Solo aparecen los días que admiten la cantidad solicitada. Las fechas bloqueadas o completas no se muestran.
    </p>
   </>
  }
 </div>
}
