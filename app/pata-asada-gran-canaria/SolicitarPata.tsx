'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { getWhatsAppUrl } from '@/lib/siteConfig'
import CalendarioPataCliente from './CalendarioPataCliente'
import ReservaPataModalCliente from './ReservaPataModalCliente'
import { PATA_PRECIO_EUR, PATA_PESO_FINAL_KG_APROX, PATA_PESO_CRUDO_KG_APROX, PATA_MAX_UNIDADES_DIA } from '@/lib/pataAsadaConfig'

/**
 * El día operativo de encargos se calcula en Canarias, independientemente
 * de la zona horaria del visitante. Desde las 16:00:00 h de Canarias,
 * se considera que la solicitud se presenta al día siguiente.
 */
function diaOperativoCanarias(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Atlantic/Canary',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date())
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const fechaCanarias = [part('year'), part('month'), part('day')].join('-')
  if (Number(part('hour')) < 16) return fechaCanarias

  const siguiente = new Date(fechaCanarias + 'T12:00:00Z')
  siguiente.setUTCDate(siguiente.getUTCDate() + 1)
  return siguiente.toISOString().slice(0, 10)
}

/**
 * Lunes a jueves: fecha + 2 días naturales.
 * Viernes, sábado y domingo: martes siguiente, por reposición del proveedor.
 * Disponibilidad definitiva y hora de recogida: siempre confirmación humana.
 */
function primeraFechaRecogida(hoy: string): string {
  const date = new Date(hoy + 'T12:00:00Z')
  const weekday = date.getUTCDay()
  const daysAhead = weekday === 5 ? 4 : weekday === 6 ? 3 : 2
  date.setUTCDate(date.getUTCDate() + daysAhead)
  return date.toISOString().slice(0, 10)
}

function fechaLegible(value: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value + 'T12:00:00Z'))
}

/** Formato español para el mensaje de WhatsApp; el calendario mantiene YYYY-MM-DD. */
function fechaWhatsApp(value: string): string {
  const [year, month, day] = value.split('-')
  return [day, month, year].join('/')
}

const CALENDARIO_PREVIEW=process.env.NEXT_PUBLIC_PATA_CALENDAR_PREVIEW==='true'
const PAGO_PRUEBAS=process.env.NEXT_PUBLIC_PATA_CHECKOUT_PREVIEW==='true'
type PublicDay={date:string;available:number}
function sumarDias(fecha:string,n:number):string {
 const d=new Date(fecha+'T12:00:00Z')
 d.setUTCDate(d.getUTCDate()+n)
 return d.toISOString().slice(0,10)
}
function SolicitarPataLegacy() {
  const [diaOperativo, setDiaOperativo] = useState(diaOperativoCanarias)
  const [nombre, setNombre] = useState('')
  const [correo,setCorreo]=useState('')
  const [telefono,setTelefono]=useState('')
  const checkoutRequestKey=useRef<string|null>(null)
  const [fecha, setFecha] = useState('')
  const [unidades, setUnidades] = useState('1')
  const [ocasion, setOcasion] = useState('Reunión familiar')
  const [comentarios, setComentarios] = useState('')
  const [errorFecha, setErrorFecha] = useState('')
  const [disponibilidad,setDisponibilidad]=useState<Record<string,number>>({})
  const [estadoDisponibilidad,setEstadoDisponibilidad]=useState<'loading'|'ready'|'error'>('loading')
  const [actualizacion,setActualizacion]=useState(0)
  const [enviando,setEnviando]=useState(false)
  const dateInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const actualizar = () => setDiaOperativo(diaOperativoCanarias())
    actualizar()
    const interval = window.setInterval(actualizar, 1_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(()=>{
    if(!CALENDARIO_PREVIEW)return
    const interval=window.setInterval(()=>setActualizacion(n=>n+1),120_000)
    return ()=>window.clearInterval(interval)
  },[])
  useEffect(()=>{
    if(!CALENDARIO_PREVIEW)return
    const abort=new AbortController()
    let active=true
    setEstadoDisponibilidad('loading')
    const url='/api/pata-asada/availability?from='+diaOperativo+'&to='+sumarDias(diaOperativo,62)
    fetch(url,{cache:'no-store',signal:abort.signal})
      .then(async(response)=>{
        if(!response.ok)throw new Error('No se pudo consultar el calendario.')
        const payload:unknown=await response.json()
        if(!payload||typeof payload!=='object'||!('days' in payload)||!Array.isArray(payload.days))
          throw new Error('Respuesta de disponibilidad incorrecta.')
        const byDate:Record<string,number>={}
        for(const row of payload.days as PublicDay[]){
          if(row&&typeof row.date==='string'&&Number.isInteger(row.available)&&row.available>=1&&row.available<=3)
            byDate[row.date]=row.available
        }
        if(active){setDisponibilidad(byDate);setEstadoDisponibilidad('ready')}
      })
      .catch(()=>{
        if(active){setDisponibilidad({});setEstadoDisponibilidad('error')}
      })
    return ()=>{active=false;abort.abort()}
  },[diaOperativo,actualizacion])

  const primerDia = primeraFechaRecogida(diaOperativo)
  const ultimoDia = sumarDias(diaOperativo,62)
  const diaValido = !!fecha && fecha >= primerDia &&
    (!CALENDARIO_PREVIEW || (fecha<=ultimoDia&&estadoDisponibilidad==='ready'&&
       (disponibilidad[fecha]??0)>=Number(unidades)))
  const unidadesNumero = Number(unidades)
  const unidadesValidas = Number.isSafeInteger(unidadesNumero) && unidadesNumero >= 1 && unidadesNumero <= PATA_MAX_UNIDADES_DIA
  const importeTotal = unidadesValidas ? unidadesNumero * PATA_PRECIO_EUR : 0

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(enviando)return
    const fechaMinimaActual=primeraFechaRecogida(diaOperativoCanarias())
    if (!fecha || fecha < fechaMinimaActual || (CALENDARIO_PREVIEW && fecha>sumarDias(diaOperativoCanarias(),62))) {
      setErrorFecha('Esa fecha ya no admite solicitudes. Selecciona otra disponible.')
      setFecha('')
      return
    }
    if(!unidadesValidas)return
    if(PAGO_PRUEBAS&&(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo.trim())||telefono.replace(/\D/g,'').length<6)){
      setErrorFecha('Para pagar necesitamos un correo válido y un teléfono de contacto.')
      return
    }
    setErrorFecha('')
    setEnviando(true)
    try{
      if(CALENDARIO_PREVIEW){
        // Revalidar justo antes de preparar WhatsApp: NO supone retención.
        const response=await fetch('/api/pata-asada/availability?from='+fecha+'&to='+fecha,{cache:'no-store'})
        if(!response.ok)throw new Error('No podemos comprobar la disponibilidad. Vuelve a intentarlo.')
        const payload:unknown=await response.json()
        const rows=(payload as {days?:PublicDay[]})?.days
        const available=Array.isArray(rows)?rows.find(x=>x.date===fecha)?.available??0:0
        if(available<unidadesNumero){
          setFecha('')
          setActualizacion(v=>v+1)
          throw new Error('Esta fecha ya no tiene suficientes unidades. Elige otra fecha.')
        }
      }
      if(PAGO_PRUEBAS){
        // Reservar atómicamente en la base de datos, después crear checkout.
        // Ambos endpoints están desactivados hasta contar con credenciales MONEI de prueba.
        if(!checkoutRequestKey.current)checkoutRequestKey.current=crypto.randomUUID()
        const key=checkoutRequestKey.current
        const reserve=await fetch('/api/pata-asada/reservations',{
          method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            key,date:fecha,quantity:unidadesNumero,name:nombre.trim(),
            email:correo.trim(),phone:telefono.trim(),
            notes:[ocasion,comentarios].filter(Boolean).join(' · ').slice(0,500)
          }),cache:'no-store'
        })
        const reservation=await reserve.json() as {id?:string;checkoutToken?:string;error?:string}
        if(!reserve.ok||!reservation.id||!reservation.checkoutToken){
          throw new Error(reservation.error||'No se pudo retener la fecha seleccionada.')
        }
        const checkout=await fetch('/api/pata-asada/checkout',{
          method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:reservation.id,key,checkoutToken:reservation.checkoutToken}),
          cache:'no-store'
        })
        const result=await checkout.json() as {redirectUrl?:string;error?:string}
        if(!checkout.ok||!result.redirectUrl){
          throw new Error(result.error||'No se pudo iniciar el pago de prueba. Consulta con AriMar antes de repetirlo.')
        }
        const url=new URL(result.redirectUrl)
        if(url.protocol!=='https:'||!(url.hostname==='monei.com'||url.hostname.endsWith('.monei.com')))
          throw new Error('La pasarela ha devuelto un destino de pago incorrecto.')
        window.location.assign(url.toString())
        return
      }
      const lines = [
        'Hola, AriMar. Quisiera solicitar pata asada canaria.',
        '',
        'Nombre: ' + nombre.trim(),
        'Cantidad: ' + unidadesNumero + (unidadesNumero === 1 ? ' pata entera' : ' patas enteras'),
        'Importe: ' + PATA_PRECIO_EUR + ' € por unidad. Total: ' + importeTotal + ' €.',
        'Peso aprox.: ' + PATA_PESO_FINAL_KG_APROX + ' kg TERMINADA CON HUESO por pieza (' + PATA_PESO_CRUDO_KG_APROX + ' kg en crudo).',
        'Fecha de recogida: ' + fechaWhatsApp(fecha),
        'Ocasión: ' + ocasion,
        'Observaciones: ' + (comentarios.trim() || 'Sin observaciones'),
        'Esta solicitud queda pendiente de confirmación y pago; no constituye reserva automática.',
      ]
      window.location.href = getWhatsAppUrl(lines.join('\n'))
    }catch(error){
      setErrorFecha(error instanceof Error?error.message:'No se pudo comprobar la fecha.')
    }finally{
      setEnviando(false)
    }
  }

  function updateBookingFields(fn:()=>void){checkoutRequestKey.current=null;fn()}
  const field = 'mt-2 block w-full rounded-xl border border-[#C7DFE0] bg-white px-4 py-3 text-[#1E293B] outline-none focus:border-[#207F85] focus:ring-2 focus:ring-[#207F85]/20'

  return (
    <div className="overflow-hidden rounded-3xl border border-[#D7E7E8] bg-white shadow-xl shadow-[#1E293B]/10" id="solicitar-presupuesto">
      <div className="bg-[#1E293B] px-6 py-8 text-white md:px-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B7E1E1]">Encargos para celebraciones</p>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Solicita tus patas asadas</h2>
        <p className="mt-3 leading-relaxed text-slate-200">90 € por pata entera. Peso final aproximado: 7,5 kg una vez asada y con hueso. {PAGO_PRUEBAS?'Modo de prueba de MONEI: no se realizan cobros reales.':'Selecciona fecha y cantidad; confirmaremos la disponibilidad antes del pago.'}</p>
      </div>

      <form onSubmit={enviar} className="grid gap-5 p-6 md:grid-cols-2 md:p-9">
        <label className="text-sm font-semibold text-[#1E293B]">
          Tu nombre
          <input className={field} required autoComplete="name" maxLength={80} value={nombre} onChange={(e) => updateBookingFields(()=>setNombre(e.target.value))} placeholder="¿Cómo te llamas?" />
        </label>
        {PAGO_PRUEBAS&&<>
          <label className="text-sm font-semibold text-[#1E293B]">Tu correo electrónico
            <input className={field} required type="email" autoComplete="email" maxLength={254}
              value={correo} onChange={e=>updateBookingFields(()=>setCorreo(e.target.value))}
              placeholder="correo@ejemplo.es"/>
          </label>
          <label className="text-sm font-semibold text-[#1E293B]">Teléfono de contacto
            <input className={field} required type="tel" autoComplete="tel" maxLength={30}
              value={telefono} onChange={e=>updateBookingFields(()=>setTelefono(e.target.value))}
              placeholder="600 000 000"/>
          </label>
        </>}
        <label className="text-sm font-semibold text-[#1E293B]">
          Número de patas enteras
          <input className={field} required type="number" inputMode="numeric" min={1} max={PATA_MAX_UNIDADES_DIA} step={1} value={unidades} onChange={(e) => updateBookingFields(()=>setUnidades(e.target.value))} />
          <span className="mt-2 block text-xs font-normal leading-relaxed text-slate-500">
            {PAGO_PRUEBAS?'Modo de pruebas: el sistema retiene unidades durante 15 minutos y redirige al pago de prueba de MONEI.':'Hasta 3 patas por fecha, sujeto a disponibilidad real. De momento la confirmamos personalmente por WhatsApp; el calendario no descuenta unidades automáticamente.'} Se entregan enteras y con hueso.
          </span>
        </label>

        <div className="md:col-span-2">
          <label htmlFor="pata-fecha" className="block text-sm font-semibold text-[#1E293B]">
            Fecha deseada de recogida
          </label>
          {CALENDARIO_PREVIEW
            ? <CalendarioPataCliente from={primerDia} to={ultimoDia} value={fecha} quantity={unidadesNumero}
                available={disponibilidad} status={estadoDisponibilidad}
                onSelect={(date)=>{updateBookingFields(()=>setFecha(date));setErrorFecha('')}}
                onReload={()=>setActualizacion(n=>n+1)}/>
            : <input
                ref={dateInput}
                id="pata-fecha"
                className={field + ' cursor-pointer'}
                required type="date" min={primerDia}
                value={diaValido ? fecha : ''}
                onClick={() => { try { dateInput.current?.showPicker?.() } catch { /* algunos navegadores abren su propio calendario */ } }}
                onChange={(e) => { updateBookingFields(()=>setFecha(e.target.value)); setErrorFecha('') }}
                aria-describedby="pata-fecha-ayuda" aria-invalid={!!errorFecha}
              />}
          <p id="pata-fecha-ayuda" className="mt-2 text-sm leading-relaxed text-slate-600">
            Primera fecha seleccionable: <strong className="text-[#207F85]">{fechaLegible(primerDia)}</strong>. {CALENDARIO_PREVIEW?'Las fechas mostradas se consultan en la disponibilidad real de AriMar, pero solo se reservan tras nuestra confirmación y el pago.':'La fecha solicitada está sujeta a confirmación por WhatsApp.'}
            <span className="mt-1 block font-semibold text-[#1E293B]">Horario de recogida: de 11:30 a 16:00 h. Confirmaremos la hora exacta contigo.</span>
          </p>
          {CALENDARIO_PREVIEW&&fecha&&estadoDisponibilidad==='ready'&&(disponibilidad[fecha]??0)<unidadesNumero&&<p role="alert" className="mt-2 text-sm font-semibold text-amber-800">No quedan suficientes patas para esa fecha. Selecciona otra o reduce la cantidad.</p>}
          {errorFecha && <p className="mt-2 text-sm font-semibold text-red-700" role="alert">{errorFecha}</p>}
        </div>

        <label className="text-sm font-semibold text-[#1E293B] md:col-span-2">
          Tipo de celebración
          <select className={field} value={ocasion} onChange={(e) => updateBookingFields(()=>setOcasion(e.target.value))}>
            <option>Reunión familiar</option>
            <option>Cumpleaños</option>
            <option>Evento de empresa</option>
            <option>Otra celebración</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#1E293B] md:col-span-2">
          Observaciones (opcional)
          <textarea className={field} rows={3} maxLength={500} value={comentarios} onChange={(e) => updateBookingFields(()=>setComentarios(e.target.value))} placeholder="Indica cualquier necesidad concreta. La hora de recogida se confirmará contigo." />
        </label>

        <div className="md:col-span-2 rounded-2xl border border-[#D7E7E8] bg-[#F1F8F7] px-5 py-5">
          <p className="text-sm font-semibold text-[#207F85]">Precio cerrado: {PATA_PRECIO_EUR} € por pata entera</p>
          <p className="mt-1 text-2xl font-extrabold text-[#1E293B]">Total: {importeTotal} €</p>
          <p className="mt-2 text-sm text-slate-600">Peso aproximado por pieza: {PATA_PESO_FINAL_KG_APROX.toLocaleString('es-ES')} kg <strong>terminada y con hueso</strong>, desde unos {PATA_PESO_CRUDO_KG_APROX.toLocaleString('es-ES')} kg en crudo. Peso variable según la pieza. {PAGO_PRUEBAS?'Se abrirá únicamente la pasarela de PRUEBAS de MONEI.':'No se cobra nada desde este formulario.'}</p>
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={!diaValido || !unidadesValidas || enviando} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#207F85] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#18686D] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#207F85]">
            {enviando?'Comprobando disponibilidad…':PAGO_PRUEBAS?'Continuar al pago de prueba':'Enviar solicitud por WhatsApp'} <span aria-hidden="true">↗</span>
          </button>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {PAGO_PRUEBAS?'El pago se completará en el entorno de prueba de MONEI. Solo recibirás una confirmación con número de reserva cuando el servidor verifique el pago.':<>
              Se abrirá WhatsApp con tu solicitud preparada: deberás pulsar Enviar. {CALENDARIO_PREVIEW?'Las fechas se consultan en la base de datos, pero las unidades no quedan retenidas hasta recibir la confirmación de AriMar.':'El calendario no garantiza disponibilidad en tiempo real.'} No se cobra nada en esta página. AriMar confirmará la fecha por WhatsApp y enviará el enlace de pago después.
            </>}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">¿Necesitas una fecha anterior a las habilitadas? <a href={getWhatsAppUrl('Hola, AriMar. Quisiera consultar si excepcionalmente podéis preparar un encargo urgente de pata asada.')} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#207F85] underline underline-offset-4">Consúltanos por WhatsApp</a>; estará sujeto a disponibilidad.</p>
        </div>
      </form>
    </div>
  )
}

// Preview only: public production keeps the existing WhatsApp flow and SEO.
export default function SolicitarPata(){
 return CALENDARIO_PREVIEW?<ReservaPataModalCliente/>:<SolicitarPataLegacy/>
}
