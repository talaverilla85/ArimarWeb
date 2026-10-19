'use client'

import { useState, type FormEvent } from 'react'
import { getWhatsAppUrl } from '@/lib/siteConfig'

export default function SolicitarPata() {
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [ocasion, setOcasion] = useState('Reunión familiar')
  const [personas, setPersonas] = useState('')
  const [comentarios, setComentarios] = useState('')

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const lines = [
      'Hola, AriMar. Quisiera consultar un encargo de pata asada canaria.',
      '',
      'Nombre: ' + nombre.trim(),
      'Fecha deseada de recogida: ' + fecha,
      'Ocasión: ' + ocasion,
      'Número aproximado de personas: ' + (personas || 'Por concretar'),
      'Comentarios: ' + (comentarios.trim() || 'Sin observaciones'),
      '',
      '¿Podéis indicarme disponibilidad, tamaño de la pieza y presupuesto?',
    ]
    window.location.href = getWhatsAppUrl(lines.join('\n'))
  }

  const field = 'mt-2 block w-full rounded-xl border border-[#C7DFE0] bg-white px-4 py-3 text-[#1E293B] outline-none focus:border-[#207F85] focus:ring-2 focus:ring-[#207F85]/20'

  return (
    <div className="overflow-hidden rounded-3xl border border-[#D7E7E8] bg-white shadow-xl shadow-[#1E293B]/10" id="solicitar-presupuesto">
      <div className="bg-[#1E293B] px-6 py-8 text-white md:px-9">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B7E1E1]">Encargos para celebraciones</p>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">¿Reservamos tu pata asada?</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Cuéntanos cuándo la necesitas y para cuántas personas. Te responderemos por WhatsApp con las opciones disponibles.</p>
      </div>
      <form onSubmit={enviar} className="grid gap-5 p-6 md:grid-cols-2 md:p-9">
        <label className="text-sm font-semibold text-[#1E293B]">
          Tu nombre
          <input className={field} required autoComplete="name" maxLength={80} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="¿Cómo te llamas?" />
        </label>
        <label className="text-sm font-semibold text-[#1E293B]">
          Fecha deseada de recogida
          <input className={field} required type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <label className="text-sm font-semibold text-[#1E293B]">
          Tipo de celebración
          <select className={field} value={ocasion} onChange={(e) => setOcasion(e.target.value)}>
            <option>Reunión familiar</option>
            <option>Cumpleaños</option>
            <option>Evento de empresa</option>
            <option>Otra celebración</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#1E293B]">
          Número aproximado de personas
          <input className={field} type="number" inputMode="numeric" min={1} max={1000} value={personas} onChange={(e) => setPersonas(e.target.value)} placeholder="Ej.: 15" />
        </label>
        <label className="text-sm font-semibold text-[#1E293B] md:col-span-2">
          Cuéntanos algo más (opcional)
          <textarea className={field} rows={3} maxLength={500} value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Tamaño de la pieza, hora aproximada u otras dudas..." />
        </label>
        <div className="md:col-span-2">
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#207F85] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#18686D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#207F85]">
            Consultar mi encargo por WhatsApp <span aria-hidden="true">↗</span>
          </button>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">Se abrirá WhatsApp con tu consulta ya preparada. No se envía ni se confirma ningún pedido hasta que tú lo mandes y AriMar responda con disponibilidad y presupuesto.</p>
        </div>
      </form>
    </div>
  )
}
