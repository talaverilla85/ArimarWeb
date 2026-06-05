import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'

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
    eyebrow: 'Día a día',
    title: 'Una solución práctica para el día a día',
    text: 'AriMar está pensado para familias, trabajadores, vecinos, turistas y personas que quieren resolver la comida sin cocinar. Una sola carta para todos, elaborada sin gluten desde el origen.',
  },
  {
    eyebrow: 'Vitrina y raciones',
    title: 'Platos preparados y raciones para llevar',
    text: 'Preparamos platos preparados, raciones, guisos, arroces, pastas, carnes, fritos y postres. La carta cambia según producción diaria, temporada y disponibilidad.',
  },
  {
    eyebrow: 'Sin gluten desde el origen',
    title: 'Toda la carta está elaborada sin gluten',
    text: 'Somos un establecimiento 100 % sin gluten y no trabajamos con ingredientes con gluten. Nuestro modelo parte de una carta completa sin gluten, no de una selección pequeña adaptada.',
  },
  {
    eyebrow: 'Claridad al elegir',
    title: 'Información visible de alérgenos',
    text: 'Además de trabajar sin ingredientes con gluten, informamos del resto de alérgenos presentes en cada elaboración para que puedas elegir con claridad.',
  },
]

const highlights = ['Platos preparados', 'Raciones para llevar', 'Freiduría sin gluten', 'Vitrina diaria']

export default function ComidaParaLlevarSinGlutenGranCanariaPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-amber-100/70 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Comida para llevar sin gluten en Gran Canaria
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Comida casera 100 % sin gluten para llevar desde Playa de Arinaga: vitrina diaria, raciones,
                freiduría y platos preparados para resolver la comida con tranquilidad.
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
                Resolver la comida sin cocinar y sin preguntar cada detalle
              </h2>
              <p className="text-slate-600 leading-relaxed">
                AriMar nace para que puedas mirar la vitrina, elegir qué te apetece y llevarte comida casera
                100 % sin gluten a casa, al trabajo o donde te pida el día. Además, informamos del resto de
                alérgenos presentes en cada elaboración.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50/70 border border-primary-100 px-5 py-5 text-center">
              <p className="text-4xl font-bold text-primary-700">11:30</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">vitrina y recogida hasta las 16:00</p>
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
              Elige en carta o prepara tu pedido
            </h2>
            <p className="text-white/75 mb-8 leading-relaxed">
              Puedes consultar nuestra carta 100 % sin gluten y, cuando el canal online esté activo, hacer tu pedido
              para recoger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hoy"
                className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Ver carta 100% sin gluten
              </Link>
              <Link
                href="/proximamente"
                className="inline-flex justify-center px-8 py-3 border border-white/25 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Pedir
              </Link>
            </div>
          </div>
        </section>

        <SeoInternalLinks />
      </div>
    </div>
  )
}
