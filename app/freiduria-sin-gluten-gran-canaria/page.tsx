import type { Metadata } from 'next'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'

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
    title: 'Una freiduría pensada para personas celíacas',
    text: 'AriMar es un establecimiento 100 % sin gluten en Playa de Arinaga. No trabajamos con ingredientes con gluten y toda la carta está elaborada sin gluten, incluyendo nuestras elaboraciones de freiduría.',
  },
  {
    title: 'La freiduría importa',
    text: 'Sabemos que la freiduría es uno de los puntos más delicados para muchas personas celíacas cuando comen fuera. Por eso nuestro planteamiento no es adaptar unos pocos platos, sino trabajar desde una cocina y una carta 100 % sin gluten.',
  },
  {
    title: 'No somos un local con algunas opciones adaptadas',
    text: 'En AriMar no tienes que buscar una pequeña sección aparte. Nuestra vitrina, nuestras raciones y nuestras elaboraciones parten de una misma idea: comida casera y freiduría sin gluten para elegir con tranquilidad.',
  },
  {
    title: 'Croquetas, fritos, papas y vitrina',
    text: 'Preparamos croquetas, fritos, papas, elaboraciones de vitrina y comida para llevar según producción diaria. La oferta cambia, pero el punto de partida se mantiene: una casa de comidas 100 % sin gluten en Gran Canaria.',
  },
]

export default function FreiduriaSinGlutenGranCanariaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
            Tu disfruta, nosotros cocinamos.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
            Freiduría sin gluten en Gran Canaria
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            En AriMar unimos casa de comidas, freiduría y comida casera para llevar en un establecimiento
            100 % sin gluten en Playa de Arinaga.
          </p>
        </header>

        <div className="space-y-8 mb-16">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-6 md:px-8 shadow-sm"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>

        <section className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Mira la carta y ven a vernos
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Informamos del resto de alérgenos para que puedas decidir con claridad y consultar cualquier duda con nuestro equipo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/carta"
              className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
            >
              Ver carta 100% sin gluten
            </Link>
            <Link
              href="/contacto"
              className="inline-flex justify-center px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Cómo llegar
            </Link>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
