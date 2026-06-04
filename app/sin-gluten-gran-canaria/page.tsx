import type { Metadata } from 'next'
import Link from 'next/link'

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
    title: 'No somos un local con opciones sin gluten',
    text: 'AriMar nace como un establecimiento 100 % sin gluten. Toda la carta está elaborada sin ingredientes con gluten, desde los platos de cuchara hasta la freiduría, los arroces, las pastas, las croquetas y los postres.',
  },
  {
    title: 'Freiduría sin gluten en Gran Canaria',
    text: 'Sabemos que para muchas personas celíacas la freiduría suele ser uno de los puntos más delicados cuando comen fuera. En AriMar apostamos por una freiduría sin gluten, integrada dentro de nuestro modelo de cocina 100 % sin gluten.',
  },
  {
    title: 'Comida casera para llevar',
    text: 'Preparamos elaboraciones de vitrina y platos listos para llevar, pensados para familias, trabajadores, vecinos de Arinaga y personas que quieren comer bien sin cocinar.',
  },
  {
    title: 'Información clara de alérgenos',
    text: 'Además de trabajar sin ingredientes con gluten, ofrecemos información sobre el resto de alérgenos presentes en cada elaboración. Nuestro equipo puede ayudarte a resolver dudas antes de elegir.',
  },
  {
    title: 'Estamos en Playa de Arinaga',
    text: 'AriMar está en Playa de Arinaga, en el municipio de Agüimes. Si buscas comida sin gluten en Gran Canaria, puedes venir, mirar la vitrina y elegir qué te apetece.',
  },
]

export default function SinGlutenGranCanariaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
            Tu disfruta, nosotros cocinamos.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
            Comida 100 % sin gluten en Gran Canaria
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            En AriMar hemos creado una casa de comidas diferente en Playa de Arinaga: un establecimiento
            100 % sin gluten donde puedes encontrar comida casera, freiduría, platos preparados y raciones
            para llevar.
          </p>
        </header>

        <div className="space-y-8 mb-16">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-6 md:px-8 shadow-sm"
              aria-labelledby={`${section.title.toLowerCase().replaceAll(' ', '-')}-heading`}
            >
              <h2
                id={`${section.title.toLowerCase().replaceAll(' ', '-')}-heading`}
                className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight"
              >
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>

        <section className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Aquí no preguntas qué puedes comer. Preguntas qué te apetece.
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Te esperamos en Playa de Arinaga con comida casera, freiduría y raciones 100 % sin gluten para llevar.
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
              Cómo llegar a AriMar
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
