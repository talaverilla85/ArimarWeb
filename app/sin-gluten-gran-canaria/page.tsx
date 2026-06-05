import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'

export const metadata: Metadata = {
  title: 'Comida 100% sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'AriMar es una casa de comidas y freiduría 100% sin gluten en Playa de Arinaga, Gran Canaria. Platos preparados, raciones y comida casera para llevar.',
  alternates: {
    canonical: '/sin-gluten-gran-canaria',
  },
  openGraph: {
    title: 'Comida 100% sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Casa de comidas y freiduría 100% sin gluten en Playa de Arinaga, Gran Canaria. Platos preparados, raciones y comida casera para llevar.',
    type: 'website',
    url: 'https://arimarfoodlab.es/sin-gluten-gran-canaria',
  },
}

const sections = [
  {
    eyebrow: 'Una carta única',
    title: 'No somos un local con opciones sin gluten',
    text: 'AriMar nace como un establecimiento 100 % sin gluten. No hay una carta normal y otra adaptada: toda la carta está elaborada sin ingredientes con gluten, desde los platos de cuchara hasta la freiduría, los arroces, las pastas, las croquetas y los postres.',
  },
  {
    eyebrow: 'Freiduría',
    title: 'Freiduría sin gluten en Gran Canaria',
    text: 'La freiduría suele ser uno de los puntos más delicados cuando alguien necesita evitar el gluten. En AriMar apostamos por una freiduría sin gluten integrada dentro de un modelo de cocina pensado para todos.',
  },
  {
    eyebrow: 'Día a día',
    title: 'Comida casera para llevar',
    text: 'Preparamos elaboraciones de vitrina y platos listos para llevar, pensados para familias, trabajadores, vecinos de Arinaga y personas que quieren comer bien sin cocinar.',
  },
  {
    eyebrow: 'Transparencia',
    title: 'Información clara de alérgenos',
    text: 'Además de trabajar sin ingredientes con gluten, ofrecemos información sobre el resto de alérgenos presentes en cada elaboración. Nuestro equipo puede ayudarte a resolver dudas antes de elegir.',
  },
  {
    eyebrow: 'Local',
    title: 'Estamos en Playa de Arinaga',
    text: 'AriMar está en Playa de Arinaga, en el municipio de Agüimes. Si buscas comida sin gluten en Gran Canaria, puedes venir, mirar la vitrina y elegir qué te apetece.',
  },
]

const highlights = ['Comida para todos', '100 % sin gluten', 'Sin carta aparte', 'Playa de Arinaga']

export default function SinGlutenGranCanariaPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Comida 100 % sin gluten en Gran Canaria
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                En AriMar hemos creado una casa de comidas para todos en Playa de Arinaga: comida casera,
                freiduría, platos preparados y raciones para llevar, con una carta elaborada sin gluten desde
                el origen.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-sm font-semibold text-primary-800 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mx-auto w-44 md:w-52">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-3 shadow-md">
                <Image
                  src={SIN_GLUTEN_IMAGE}
                  alt={SIN_GLUTEN_ALT}
                  width={260}
                  height={220}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-16 rounded-3xl border border-slate-200 bg-white px-6 py-8 md:px-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            La diferencia está en que todos eligen de la misma vitrina
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Una persona que evita el gluten no viene a AriMar a buscar su opcion aparte. Viene a elegir como cualquier
            otra persona: pollo asado, guisos, fritos, raciones o postres según lo que haya ese día.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-6 md:px-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700">
                  {index + 1}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{section.eyebrow}</p>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 tracking-tight">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{section.text}</p>
            </section>
          ))}
        </div>

        <section className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Aquí no preguntas qué puedes comer. Preguntas qué te apetece.
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Te esperamos en Playa de Arinaga con comida casera, freiduría y raciones 100 % sin gluten para llevar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://r.qamarero.com/arimar?mode=PICKUP"
              className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
            >
              Ver carta 100% sin gluten
            </Link>
            <Link
              href="/contacto"
              className="inline-flex justify-center px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Cómo llegar a AriMar
            </Link>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
