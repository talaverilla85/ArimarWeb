import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'
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
    eyebrow: 'Ubicación local',
    title: 'Estamos en el corazón de Playa de Arinaga',
    text: 'AriMar está en Avenida Polizón 67, local, en Playa de Arinaga, dentro del municipio de Agüimes. Somos una casa de comidas para llevar con vitrina diaria y recogida en local.',
  },
  {
    eyebrow: 'Vitrina diaria',
    title: 'Comida casera, freiduría y platos preparados',
    text: 'En la vitrina puedes encontrar comida casera, freiduría, platos preparados y raciones para llevar según producción diaria. Cocinamos para vecinos, familias, trabajadores y visitantes que pasan por Arinaga.',
  },
  {
    eyebrow: 'Desde el origen',
    title: 'Establecimiento 100 % sin gluten',
    text: 'AriMar es un establecimiento 100 % sin gluten: toda la carta está elaborada sin gluten y no trabajamos con ingredientes con gluten. Informamos del resto de alérgenos para que puedas decidir con claridad.',
  },
  {
    eyebrow: 'Cercanía',
    title: 'Para elegir con tranquilidad',
    text: 'Nuestro objetivo es que las personas celíacas puedan mirar la vitrina y elegir qué les apetece, con información clara y un equipo cercano para resolver dudas.',
  },
]

const highlights = ['Playa de Arinaga', 'Avenida Polizón 67', '100 % sin gluten', 'Recogida en local']

export default function ComidaSinGlutenPlayaDeArinagaPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-sky-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-sky-100/70 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Comida sin gluten en Playa de Arinaga
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Si buscas comida sin gluten en Playa de Arinaga, AriMar ofrece comida casera, freiduría y platos
                preparados 100 % sin gluten para llevar.
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
                Una casa de comidas sin gluten en una calle de barrio
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Estamos en {siteConfig.address.street}, {siteConfig.address.locality}, cerca de la playa y de la vida diaria de Arinaga.
                Puedes pasar, mirar la vitrina y elegir comida casera 100 % sin gluten para llevar.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50/70 border border-primary-100 px-5 py-5 text-center">
              <p className="text-3xl font-bold text-primary-700">Arinaga</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">recogida en local todos los días</p>
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
              Ven a AriMar en Playa de Arinaga
            </h2>
            <p className="text-white/75 mb-8 leading-relaxed">
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
                className="inline-flex justify-center px-8 py-3 border border-white/25 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Ver ubicación
              </Link>
            </div>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
