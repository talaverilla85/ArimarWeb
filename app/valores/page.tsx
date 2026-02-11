import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Nuestros valores | AriMar FoodLab – Playa de Arinaga',
  description:
    'Los valores de AriMar FoodLab: sabor honesto, selección corta y rotación diaria, punto y consistencia, etiqueta clara y mejora continua. Comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria.',
  openGraph: {
    title: 'Nuestros valores | AriMar FoodLab – Playa de Arinaga',
    description:
      'Los valores de AriMar FoodLab: sabor honesto, selección corta y rotación diaria, punto y consistencia, etiqueta clara y mejora continua. Comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria.',
    type: 'website',
  },
}

const valueCards = [
  {
    title: 'Sabor honesto',
    text: 'Recetas reconocibles, bien hechas, sin artificios.',
    icon: 'check',
  },
  {
    title: 'Selección corta, frescura real',
    text: 'Preferimos pocas opciones que roten, a una carta interminable.',
    icon: 'leaf',
  },
  {
    title: 'Punto y consistencia',
    text: 'Cuidamos tiempos y cocciones para que el plato salga igual de bien cada día.',
    icon: 'target',
  },
  {
    title: 'Etiqueta clara',
    text: 'Ingredientes y alérgenos, para que elijas con tranquilidad.',
    icon: 'tag',
  },
  {
    title: 'Cercanía',
    text: 'Hablamos claro y te atendemos como nos gusta que nos atiendan.',
    icon: 'heart',
  },
  {
    title: 'Menos desperdicio, más aprovechamiento',
    text: 'Planificamos y rotamos para tirar menos y aprovechar mejor lo que cocinamos.',
    icon: 'recycle',
  },
]

const expectList = [
  'Trato cercano y claro.',
  'Platos que cambian según producción y temporada.',
  'Etiquetado con ingredientes y alérgenos.',
  'Cocina con método, orden y limpieza.',
  'Envases pensados para llevarlo bien.',
]

const faqs = [
  {
    q: '¿La carta cambia cada día?',
    a: 'Sí. Trabajamos con rotación diaria según producción y temporada: pocas opciones, frescas y bien hechas.',
  },
  {
    q: '¿Incluís alérgenos en la etiqueta?',
    a: 'Sí. Cada plato lleva etiqueta con ingredientes y alérgenos para que puedas elegir con tranquilidad.',
  },
  {
    q: '¿Dónde estáis?',
    a: 'En Playa de Arinaga, Agüimes (Gran Canaria). Avenida Polizón 67. Horario y cómo llegar en la página de contacto.',
  },
]

function Icon({ name }: { name: string }) {
  const className = 'w-6 h-6 text-primary-600 flex-shrink-0'
  switch (name) {
    case 'check':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'leaf':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    case 'target':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'tag':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'recycle':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
  }
}

export default function ValoresPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Nuestros valores
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Lo que prometemos cuando no nos estás mirando: método, cercanía y respeto por el producto.
          </p>
          <div className="relative aspect-video rounded-2xl overflow-hidden mt-10 bg-slate-100 shadow-md">
            <Image
              src="/images/valores-hero.webp"
              alt="Cocina y equipo de AriMar FoodLab en Playa de Arinaga"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        </header>

        {/* 6 cards */}
        <section className="mb-20" aria-labelledby="manda-heading">
          <h2 id="manda-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 tracking-tight text-center">
            Lo que manda en nuestra cocina
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={card.icon} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lo que puedes esperar siempre */}
        <section className="mb-20" aria-labelledby="esperar-heading">
          <h2 id="esperar-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 tracking-tight text-center">
            Lo que puedes esperar siempre
          </h2>
          <ul className="space-y-3 list-disc pl-6 max-w-2xl mx-auto text-slate-600 leading-relaxed">
            {expectList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Callout local + CTA */}
        <div className="mb-20 space-y-8">
          <div className="rounded-2xl border border-primary-200/80 bg-primary-50/40 px-6 py-6 text-center">
            <p className="text-slate-700 leading-relaxed">
              Hecho en Playa de Arinaga (Agüimes), Gran Canaria, para cuando sales del trabajo, vienes de la playa o simplemente no te apetece cocinar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex justify-center px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-md"
            >
              Ver ubicación y contacto
            </Link>
            <Link
              href="/carta"
              className="w-full sm:w-auto inline-flex justify-center px-8 py-3.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Ver carta
            </Link>
            <Link
              href="/proximamente"
              className="w-full sm:w-auto inline-flex justify-center px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
            >
              Pedir (próximamente)
            </Link>
          </div>
        </div>

        {/* SEO: H2 + párrafo + mini FAQ */}
        <section className="pt-8 border-t border-slate-200" aria-labelledby="seo-heading">
          <h2 id="seo-heading" className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
            Comida para llevar en Playa de Arinaga
          </h2>
          <p className="text-slate-600 leading-relaxed mb-10 max-w-3xl">
            En AriMar FoodLab elaboramos comida casera para llevar en Playa de Arinaga, Agüimes (Gran Canaria). La carta rota cada día: pocas opciones, frescas y bien hechas, con control del punto y de las cocciones. Cada plato lleva etiqueta con ingredientes y alérgenos para que elijas con tranquilidad. Pensado para recoger y disfrutar en casa, en la oficina o donde prefieras. Estamos en Avenida Polizón 67; horario y ubicación en la página de contacto.
          </p>
          <ul className="space-y-6 list-none pl-0">
            {faqs.map((faq) => (
              <li key={faq.q} className="border-b border-slate-200 pb-6 last:border-0">
                <h3 className="text-base font-semibold text-slate-800 mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
