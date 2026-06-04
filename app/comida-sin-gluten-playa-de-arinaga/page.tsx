import type { Metadata } from 'next'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Comida sin gluten en Playa de Arinaga | AriMar FoodLab',
  description:
    'AriMar ofrece comida casera, freiduría y platos preparados 100% sin gluten en Playa de Arinaga, Gran Canaria.',
  alternates: {
    canonical: '/comida-sin-gluten-playa-de-arinaga',
  },
  openGraph: {
    title: 'Comida sin gluten en Playa de Arinaga | AriMar FoodLab',
    description:
      'Comida casera, freiduría y platos preparados 100% sin gluten en Playa de Arinaga, Gran Canaria.',
    type: 'website',
    url: 'https://arimarfoodlab.es/comida-sin-gluten-playa-de-arinaga',
  },
}

const sections = [
  {
    title: 'Estamos en el corazón de Playa de Arinaga',
    text: 'AriMar está en Avenida Polizón 67, local, en Playa de Arinaga, dentro del municipio de Agüimes. Somos una casa de comidas para llevar con vitrina diaria y recogida en local.',
  },
  {
    title: 'Comida casera, freiduría y platos preparados',
    text: 'En la vitrina puedes encontrar comida casera, freiduría, platos preparados y raciones para llevar según producción diaria. Cocinamos para vecinos, familias, trabajadores y visitantes que pasan por Arinaga.',
  },
  {
    title: 'Establecimiento 100 % sin gluten',
    text: 'AriMar es un establecimiento 100 % sin gluten: toda la carta está elaborada sin gluten y no trabajamos con ingredientes con gluten. Informamos del resto de alérgenos para que puedas decidir con claridad.',
  },
  {
    title: 'Para elegir con tranquilidad',
    text: 'Nuestro objetivo es que las personas celíacas puedan mirar la vitrina y elegir qué les apetece, con información clara y un equipo cercano para resolver dudas.',
  },
]

export default function ComidaSinGlutenPlayaDeArinagaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
            Tu disfruta, nosotros cocinamos.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
            Comida sin gluten en Playa de Arinaga
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Si buscas comida sin gluten en Playa de Arinaga, AriMar ofrece comida casera, freiduría y platos
            preparados 100 % sin gluten para llevar.
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
            Ven a AriMar en Playa de Arinaga
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Estamos en {siteConfig.address.street}, {siteConfig.address.locality}. Puedes consultar la ubicación
            y llegar directamente con Google Maps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
            >
              Abrir en Google Maps
            </a>
            <Link
              href="/contacto"
              className="inline-flex justify-center px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Ver ubicación
            </Link>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
