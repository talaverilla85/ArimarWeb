'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { getWhatsAppUrl } from '@/lib/siteConfig'

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

export default function SolicitarPata() {
  const [diaOperativo, setDiaOperativo] = useState(diaOperativoCanarias)
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [unidades, setUnidades] = useState('1')
  const [ocasion, setOcasion] = useState('Reunión familiar')
  const [comentarios, setComentarios] = useState('')
  const [errorFecha, setErrorFecha] = useState('')
  const dateInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const actualizar = () => setDiaOperativo(diaOperativoCanarias())
    actualizar()
    const interval = window.setInterval(actualizar, 1_000)
    return () => window.clearInterval(interval)
  }, [])

  const primerDia = primeraFechaRecogida(diaOperativo)
  const diaValido = !!fecha && fecha >= primerDia
  const unidadesNumero = Number(unidades)
  const unidadesValidas = Number.isSafeInteger(unidadesNumero) && unidadesNumero >= 1

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fechaMinimaActual = primeraFechaRecogida(diaOperativoCanarias())
    if (!fecha || fecha < fechaMinimaActual) {
      setErrorFecha('Esa fecha ya no admite solicitudes. Elige una de las fechas habilitadas.')
      setFecha('')
      return
    }
    if (!unidadesValidas) return

    const lines = [
      'Hola, AriMar. Quisiera solicitar disponibilidad de pata asada canaria por encargo.',
      '',
      'Nombre: ' + nombre.trim(),
      'Número de patas enteras solicitado: ' + unidadesNumero,
      'Fecha deseada de recogida: ' + fecha,
      'Ocasión: ' + ocasion,
      'Observaciones: ' + (comentarios.trim() || 'Sin observaciones'),
      '',
      'Entiendo que la fecha y la cantidad requieren confirmación de AriMar.',
      'Una vez confirmados disponibilidad, precio y recogida, espero vuestro enlace de pago anticipado.',
      'Mi solicitud de reserva queda pendiente de confirmación de AriMar y del pago.',
    ]
    window.location.href = getWhatsAppUrl(lines.join('\n'))
  }

  const field = 'mt-2 block w-full rounded-xl border border-[#C7DFE0] bg-white px-4 py-3 text-[#1E293B] outline-none focus:border-[#207F85] focus:ring-2 focus:ring-[#207F85]/20'

  return (
    <div className="overflow-hidden rounded-3xl border border-[#D7E7E8] bg-white shadow-xl shadow-[#1E293B]/10" id="solicitar-presupuesto">
      <div className="bg-[#1E293B] px-6 py-8 text-white md:px-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B7E1E1]">Encargos para celebraciones</p>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Solicita tus patas asadas</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Selecciona la fecha de recogida y el número de patas enteras. Recibiremos tu solicitud por WhatsApp y te confirmaremos los detalles antes del pago.</p>
      </div>

      <form onSubmit={enviar} className="grid gap-5 p-6 md:grid-cols-2 md:p-9">
        <label className="text-sm font-semibold text-[#1E293B]">
          Tu nombre
          <input className={field} required autoComplete="name" maxLength={80} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="¿Cómo te llamas?" />
        </label>
        <label className="text-sm font-semibold text-[#1E293B]">
          Número de patas enteras
          <input className={field} required type="number" inputMode="numeric" min={1} step={1} value={unidades} onChange={(e) => setUnidades(e.target.value)} />
          <span className="mt-2 block text-xs font-normal leading-relaxed text-slate-500">Vendemos patas enteras por unidades, sin cortar ni lonchear. La cantidad está sujeta a confirmación de AriMar; no recomendamos cantidades según el número de personas.</span>
        </label>

        <div className="md:col-span-2">
          <label htmlFor="pata-fecha" className="block text-sm font-semibold text-[#1E293B]">
            Fecha deseada de recogida
          </label>
          <input
            ref={dateInput}
            id="pata-fecha"
            className={field + ' cursor-pointer'}
            required
            type="date"
            min={primerDia}
            value={diaValido ? fecha : ''}
            onClick={() => { try { dateInput.current?.showPicker?.() } catch { /* algunos navegadores abren su propio calendario */ } }}
            onChange={(e) => { setFecha(e.target.value); setErrorFecha('') }}
            aria-describedby="pata-fecha-ayuda"
            aria-invalid={!!errorFecha}
          />
          <p id="pata-fecha-ayuda" className="mt-2 text-sm leading-relaxed text-slate-600">
            Primera fecha seleccionable: <strong className="text-[#207F85]">{fechaLegible(primerDia)}</strong>. La fecha solicitada está sujeta a confirmación por WhatsApp.
          </p>
          {errorFecha && <p className="mt-2 text-sm font-semibold text-red-700" role="alert">{errorFecha}</p>}
        </div>

        <label className="text-sm font-semibold text-[#1E293B] md:col-span-2">
          Tipo de celebración
          <select className={field} value={ocasion} onChange={(e) => setOcasion(e.target.value)}>
            <option>Reunión familiar</option>
            <option>Cumpleaños</option>
            <option>Evento de empresa</option>
            <option>Otra celebración</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#1E293B] md:col-span-2">
          Observaciones (opcional)
          <textarea className={field} rows={3} maxLength={500} value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Indica cualquier necesidad concreta. La hora de recogida se confirmará contigo." />
        </label>

        <div className="md:col-span-2">
          <button type="submit" disabled={!diaValido || !unidadesValidas} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#207F85] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#18686D] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#207F85]">
            Enviar solicitud por WhatsApp <span aria-hidden="true">↗</span>
          </button>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">Se abrirá WhatsApp con tu solicitud preparada: deberás pulsar Enviar. El calendario no garantiza disponibilidad en tiempo real y no se cobra nada en esta página. AriMar confirmará por WhatsApp y enviará el enlace de pago después.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">¿Necesitas una fecha anterior a las habilitadas? <a href={getWhatsAppUrl('Hola, AriMar. Quisiera consultar si excepcionalmente podéis preparar un encargo urgente de pata asada.')} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#207F85] underline underline-offset-4">Consúltanos por WhatsApp</a>; estará sujeto a disponibilidad.</p>
        </div>
      </form>
    </div>
  )
}
