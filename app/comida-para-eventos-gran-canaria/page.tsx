import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comida sin gluten para cumpleaños y eventos en Gran Canaria | AriMar',
  description: 'Comida preparada 100 % sin gluten para cumpleaños, celebraciones, bautizos, comuniones y reuniones. Encargos con recogida en AriMar, Playa de Arinaga.',
  alternates: { canonical: '/comida-para-eventos-gran-canaria' },
}

const propuestas = [
  { numero: '01', titulo: 'Algo para compartir', detalle: 'Croquetas, ensaladas y otras elaboraciones, según disponibilidad y el tipo de celebración.' },
  { numero: '02', titulo: 'Platos para la mesa', detalle: 'Arroces, carnes y platos preparados para disfrutar en grupo.' },
  { numero: '03', titulo: 'Asados especiales', detalle: 'Pata asada, tiras de costilla, lomo o bondiola, preparados por encargo.' },
]

export default function Page() {
  return (
    <main className="bg-[#fffdf8] text-[#29382e]">
      <header className="overflow-hidden bg-[#faeee3] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_0.75fr] md:items-center">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.19em] text-[#956345]">AriMar · Para celebrar</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.13] tracking-tight md:text-6xl">
              Comida <span className="text-[#a66343]">100 % sin gluten</span> para cumpleaños y eventos en Gran Canaria
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#685b52] md:text-xl">
              Cumpleaños, bautizos, comuniones, bodas o reuniones de empresa. Tú preparas la ocasión y nosotros elaboramos los platos acordados para recoger en AriMar, Playa de Arinaga.
            </p>
            <a href="#como-funciona" className="mt-8 inline-flex rounded-full bg-[#355947] px-8 py-3 font-semibold text-white hover:bg-[#294837]">
              Descubre cómo funciona ↓
            </a>
          </div>
          <aside className="relative border-y-2 border-[#d9af8c] py-8 md:border-y-0 md:border-l-2 md:py-10 md:pl-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#956345]">Nuestra forma de celebrar</p>
            <p className="text-3xl font-semibold leading-snug text-[#5c4236]">Momentos para compartir.<br /><span className="italic text-[#ab6945]">Sabores para recordar.</span></p>
            <p className="mt-6 text-sm leading-relaxed text-[#78695d]">Cocina 100 % sin gluten, preparada por encargo para recoger en nuestro establecimiento.</p>
          </aside>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 grid gap-7 md:grid-cols-[0.95fr_1.35fr] md:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ae7351]">La mesa es la protagonista</p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Tú eliges el motivo. Nosotros cocinamos.</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-[#6a6a5c]">Preparamos elaboraciones para diferentes tipos de encuentros. Puedes contarnos qué tienes en mente y valoraremos contigo las opciones disponibles.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {propuestas.map((p, i) => (
            <article key={p.numero} className={`relative overflow-hidden p-7 md:min-h-72 ${i === 1 ? 'bg-[#e8efe6]' : i === 2 ? 'bg-[#f2e6d6]' : 'bg-[#f9eddf]'}`}>
              <p className="mb-10 border-b border-[#b7a998]/60 pb-4 text-xs font-bold uppercase tracking-widest text-[#8f704f]">Opción {p.numero}</p>
              <h3 className="mb-4 text-2xl font-bold leading-tight">{p.titulo}</h3>
              <p className="leading-relaxed text-[#625e55]">{p.detalle}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-right">
          <div className="flex flex-col items-end gap-3">
            <Link href="/pata-asada-gran-canaria" className="font-semibold text-[#426b50] underline decoration-[#d2a67e] underline-offset-8">Pata asada canaria por encargo para tu celebración ↗</Link>
            <Link href="/asados-por-encargo-gran-canaria" className="font-semibold text-[#426b50] underline decoration-[#d2a67e] underline-offset-8">Conoce todos nuestros asados por encargo ↗</Link>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#355947] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.2fr] md:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#cce4d1]">Así de sencillo</p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Cuéntanos qué celebras.</h2>
            <p className="mt-5 leading-relaxed text-[#e5eee6]">Prepararemos una propuesta según los platos, cantidades y disponibilidad.</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-5 border-b border-white/25 pb-6">
              <span className="text-xl font-light text-[#cce4d1]">01</span>
              <p><strong className="block text-lg">Consúltanos tu idea</strong><span className="text-[#e1eae2]">Cuéntanos la fecha, el tipo de celebración y lo que te gustaría encargar.</span></p>
            </div>
            <div className="flex gap-5 border-b border-white/25 pb-6">
              <span className="text-xl font-light text-[#cce4d1]">02</span>
              <p><strong className="block text-lg">Concretamos el encargo</strong><span className="text-[#e1eae2]">Confirmamos disponibilidad, elaboraciones, cantidades y presupuesto.</span></p>
            </div>
            <div className="flex gap-5">
              <span className="text-xl font-light text-[#cce4d1]">03</span>
              <p><strong className="block text-lg">Recógelo en AriMar</strong><span className="text-[#e1eae2]">La recogida se realiza en nuestro establecimiento de Playa de Arinaga.</span></p>
            </div>
            <a href="mailto:info@arimarfoodlab.es?subject=Comida%20para%20evento%20-%20Solicitud%20de%20presupuesto" className="mt-5 inline-block rounded-full bg-[#f5e7d8] px-8 py-4 font-bold text-[#355947] hover:bg-white">
              Solicitar presupuesto →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="border-l-4 border-[#c6966f] pl-5 leading-relaxed text-[#66675e]">
          Nuestro servicio es de comida preparada por encargo y recogida en AriMar. No incluye transporte, montaje, personal de sala ni catering en el lugar de la celebración.
        </p>
      </section>
    </main>
  )
}
