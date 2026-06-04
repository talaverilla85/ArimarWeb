import type { Metadata } from 'next'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'

export const metadata: Metadata = {
  title: 'Comida para llevar sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'Comida casera para llevar 100% sin gluten en Playa de Arinaga. Platos preparados, raciones, freiduría y elaboraciones diarias en AriMar FoodLab.',
  alternates: {
    canonical: '/comida-para-llevar-sin-gluten-gran-canaria',
  },
  openGraph: {
    title: 'Comida para llevar sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Comida casera para llevar 100% sin gluten en Playa de Arinaga. Platos preparados, raciones, freiduría y elaboraciones diarias.',
    type: 'website',
    url: 'https://arimarfoodlab.es/comida-para-llevar-sin-gluten-gran-canaria',
  },
}

const sections = [
  {
    title: 'Una solución práctica para el día a día',
    text: 'AriMar está pensado para familias, trabajadores, vecinos, turistas y personas celíacas que quieren resolver la comida sin cocinar y sin tener que preguntar qué parte de la carta pueden elegir.',
  },
  {
    title: 'Platos preparados y raciones para llevar',
    text: 'Preparamos platos preparados, raciones, guisos, arroces, pastas, carnes, fritos y postres. La carta cambia según producción diaria, temporada y disponibilidad.',
  },
  {
    title: 'Toda la carta está elaborada sin gluten',
    text: 'Somos un establecimiento 100 % sin gluten y no trabajamos con ingredientes con gluten. Nuestro modelo parte de una carta completa sin gluten, no de una selección pequeña adaptada.',
  },
  {
    title: 'Información visible de alérgenos',
    text: 'Además de trabajar sin ingredientes con gluten, informamos del resto de alérgenos presentes en cada elaboración para que puedas elegir con claridad.',
  },
]

export default function ComidaParaLlevarSinGlutenGranCanariaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
            Tu disfruta, nosotros cocinamos.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
            Comida para llevar sin gluten en Gran Canaria
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comida casera 100 % sin gluten para llevar desde Playa de Arinaga: vitrina diaria, raciones,
            freiduría y platos preparados para resolver la comida con tranquilidad.
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
            Elige en carta o prepara tu pedido
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Puedes consultar nuestra carta 100 % sin gluten y, cuando el canal online esté activo, hacer tu pedido para recoger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/carta"
              className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
            >
              Ver carta 100% sin gluten
            </Link>
            <Link
              href="/proximamente"
              className="inline-flex justify-center px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Pedir
            </Link>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
