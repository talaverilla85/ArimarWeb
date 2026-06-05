import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'

export const metadata: Metadata = {
  title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'AriMar es una casa de comidas y freiduría 100% sin gluten en Playa de Arinaga, Gran Canaria. Croquetas, fritos, papas y comida casera para llevar.',
  alternates: {
    canonical: '/freiduria-sin-gluten-gran-canaria',
  },
  openGraph: {
    title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Casa de comidas y freiduría 100% sin gluten en Playa de Arinaga, Gran Canaria. Croquetas, fritos, papas y comida casera para llevar.',
    type: 'website',
    url: 'https://arimarfoodlab.es/freiduria-sin-gluten-gran-canaria',
  },
}

const sections = [
  {
    eyebrow: 'Base del proyecto',
    title: 'Una freiduría para todos, sin gluten',
    text: 'AriMar es un establecimiento 100 % sin gluten en Playa de Arinaga. No trabajamos con ingredientes con gluten y toda la carta está elaborada sin gluten, incluyendo nuestras elaboraciones de freiduría.',
  },
  {
    eyebrow: 'Freír con tranquilidad',
    title: 'La freiduría importa',
    text: 'Sabemos que la freiduría es uno de los puntos más delicados para quien necesita evitar el gluten. Por eso nuestro planteamiento no es adaptar unos pocos platos, sino trabajar desde una cocina y una carta 100 % sin gluten para todos.',
  },
  {
    eyebrow: 'No es una esquina de la carta',
    title: 'No somos un local con algunas opciones adaptadas',
    text: 'En AriMar no tienes que buscar una pequeña sección aparte. Nuestra vitrina, nuestras raciones y nuestras elaboraciones parten de una misma idea: comida casera y freiduría sin gluten para elegir con tranquilidad.',
  },
  {
    eyebrow: 'Vitrina diaria',
    title: 'Croquetas, fritos, papas y vitrina',
    text: 'Preparamos croquetas, fritos, papas, elaboraciones de vitrina y comida para llevar según producción diaria. La oferta cambia, pero el punto de partida se mantiene: una casa de comidas 100 % sin gluten en Gran Canaria.',
  },
]

const highlights = ['100 % sin gluten', 'Freiduría sin gluten', 'Playa de Arinaga', 'Gran Canaria']

export default function FreiduriaSinGlutenGranCanariaPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-emerald-100/70 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Freiduría sin gluten en Gran Canaria
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                En AriMar unimos casa de comidas, freiduría y comida casera para llevar en un establecimiento
                100 % sin gluten en Playa de Arinaga.
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
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
                La freiduría, desde el principio sin gluten
              </h2>
              <p className="text-slate-600 leading-relaxed">
                No partimos de una cocina mixta con unas pocas elaboraciones adaptadas. La freiduría de AriMar
                forma parte de un modelo completo de casa de comidas 100 % sin gluten, con información del resto
                de alérgenos y una vitrina pensada para elegir con tranquilidad.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50/70 border border-primary-100 px-5 py-5 text-center">
              <p className="text-4xl font-bold text-primary-700">100%</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">carta elaborada sin gluten</p>
            </div>
          </div>
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

        <section className="rounded-3xl bg-slate-900 px-6 py-10 md:px-10 text-center shadow-sm mb-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Mira la carta y ven a vernos
            </h2>
            <p className="text-white/75 mb-8 leading-relaxed">
              Informamos del resto de alérgenos para que puedas decidir con claridad y consultar cualquier duda
              con nuestro equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hoy"
                className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Ver carta 100% sin gluten
              </Link>
              <Link
                href="/contacto"
                className="inline-flex justify-center px-8 py-3 border border-white/25 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Cómo llegar
              </Link>
            </div>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
