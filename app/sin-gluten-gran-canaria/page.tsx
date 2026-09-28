import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'

export const metadata: Metadata = {
  title: 'Sin gluten en Gran Canaria: comida 100% gluten free | AriMar',
  description:
    'AriMar es una casa de comidas 100% sin gluten en Gran Canaria. Comida casera, freiduría, platos preparados y pedido online para recoger en Playa de Arinaga.',
  alternates: {
    canonical: '/sin-gluten-gran-canaria',
    languages: {
      'es-ES': '/sin-gluten-gran-canaria',
      'en': '/en/gluten-free-gran-canaria',
    },
  },
  openGraph: {
    title: 'Sin gluten en Gran Canaria: comida 100% gluten free | AriMar',
    description:
      'Comida casera, freiduría y platos preparados 100% sin gluten en Gran Canaria. Pide online y recoge en Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/sin-gluten-gran-canaria',
  },
}

const sections = [
  {
    eyebrow: '100 % sin gluten',
    title: 'No tenemos unas pocas opciones sin gluten',
    text: 'AriMar nace como un establecimiento 100 % sin gluten. No hay una carta normal y otra adaptada: la comida que elaboramos parte de una cocina sin ingredientes con gluten, desde los platos de cuchara hasta la freiduría, los arroces, las pastas, las croquetas y los postres.',
  },
  {
    eyebrow: 'Para toda Gran Canaria',
    title: 'Una parada que puede encajar en tu día o en tus vacaciones',
    text: 'Estamos en Playa de Arinaga, pero AriMar no está pensado solo para quien vive cerca. Puedes consultar lo disponible y hacer tu pedido online antes de desplazarte, para recogerlo preparado cuando vengas.',
  },
  {
    eyebrow: 'Freiduría',
    title: 'Freiduría 100 % sin gluten',
    text: 'La freiduría suele ser uno de los puntos que más dudas genera cuando se necesita evitar el gluten. En AriMar forma parte de una cocina concebida sin gluten, no de una pequeña selección adaptada dentro de una cocina convencional.',
  },
  {
    eyebrow: 'Comida para llevar',
    title: 'Comida casera, vitrina y platos preparados',
    text: 'Preparamos comida para llevar con elaboraciones que cambian según la producción del día: guisos, arroces, carnes, ensaladas, fritos, croquetas, postres y otras propuestas caseras.',
  },
  {
    eyebrow: 'Alérgenos',
    title: 'Información para elegir con claridad',
    text: 'Además del gluten, informamos del resto de alérgenos presentes en cada elaboración. Si tienes dudas sobre un plato concreto, nuestro equipo puede ayudarte antes de elegir.',
  },
  {
    eyebrow: 'Playa de Arinaga',
    title: 'Dónde encontrar AriMar en Gran Canaria',
    text: 'Estamos en Playa de Arinaga, Agüimes. Abrimos todos los días de 11:30 a 16:00. Puedes venir a elegir en la vitrina o hacer el pedido online para recoger.',
  },
]

const faqs = [
  {
    q: '¿AriMar es 100 % sin gluten?',
    a: 'Sí. AriMar es una casa de comidas y freiduría 100 % sin gluten en Playa de Arinaga, Gran Canaria.',
  },
  {
    q: '¿Puedo pedir antes de desplazarme hasta AriMar?',
    a: 'Sí. Puedes consultar la oferta disponible y hacer tu pedido online para recogerlo en el local.',
  },
  {
    q: '¿AriMar es solo para personas celíacas?',
    a: 'No. Nuestra propuesta es comida casera para todos con una única carta elaborada sin gluten, para que todo el grupo pueda elegir de la misma oferta.',
  },
  {
    q: '¿Dónde está AriMar?',
    a: 'En Playa de Arinaga, en el municipio de Agüimes, Gran Canaria.',
  },
]

const highlights = ['100 % sin gluten', 'Pedido online', 'Comida para llevar', 'Gran Canaria']

export default function SinGlutenGranCanariaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                AriMar · Playa de Arinaga · Gran Canaria
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Sin gluten en Gran Canaria: comida 100 % gluten free
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Si vives en la isla o estás preparando tus vacaciones en Gran Canaria, en AriMar encontrarás
                comida casera, freiduría y platos preparados 100 % sin gluten para llevar. Puedes pedir online
                antes de venir y recoger en Playa de Arinaga.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {highlights.map((item) => (
                  <span key={item} className="rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-sm font-semibold text-primary-800 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/hoy" className="inline-flex justify-center px-7 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md">
                  Ver qué hay hoy y pedir
                </Link>
                <Link href="/contacto" className="inline-flex justify-center px-7 py-3 border border-primary-200 bg-white/70 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
                  Cómo llegar
                </Link>
              </div>
            </div>
            <div className="mx-auto w-44 md:w-52">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-3 shadow-md">
                <Image src={SIN_GLUTEN_IMAGE} alt={SIN_GLUTEN_ALT} width={260} height={220} className="h-auto w-full object-contain" priority />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-14 rounded-3xl border border-slate-200 bg-white px-6 py-8 md:px-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-2">Gran Canaria sin gluten</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            Aquí no preguntas qué puedes comer. Preguntas qué te apetece.
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Queremos que buscar comida sin gluten en Gran Canaria sea más sencillo. En AriMar todos eligen de la
            misma oferta: no existe una carta aparte para quien evita el gluten. Consulta nuestra
            <Link href="/carta" className="font-semibold text-primary-700 hover:underline"> carta</Link>, mira qué
            tenemos disponible hoy y organiza la recogida antes de venir.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {sections.map((section, index) => (
            <section key={section.title} className="rounded-2xl border border-slate-200 bg-white px-6 py-6 md:px-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700">{index + 1}</span>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{section.eyebrow}</p>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 tracking-tight">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{section.text}</p>
            </section>
          ))}
        </div>

        <section className="mb-14 rounded-3xl bg-slate-900 px-6 py-9 md:px-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-300 mb-2">¿Vienes de vacaciones?</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Puedes dejar una comida sin gluten resuelta antes de llegar
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Consulta online lo que tenemos disponible, haz tu pedido y recógelo en AriMar cuando pases por Playa
            de Arinaga. Una opción práctica para llevar al alojamiento, a la playa o continuar tu ruta por Gran Canaria.
          </p>
          <Link href="/hoy" className="inline-flex justify-center px-7 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
            Hacer pedido online
          </Link>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 tracking-tight">
            Preguntas sobre AriMar y la comida sin gluten en Gran Canaria
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-800">{faq.q}</summary>
                <p className="pt-3 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            AriMar: comida 100 % sin gluten en Gran Canaria
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Estamos en Playa de Arinaga y abrimos todos los días de 11:30 a 16:00. Elige en el local o haz tu pedido online para recoger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hoy" className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md">
              Pedir online
            </Link>
            <Link href="/en/gluten-free-gran-canaria" className="inline-flex justify-center px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-100 transition-colors">
              English: Gluten-free Gran Canaria
            </Link>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
