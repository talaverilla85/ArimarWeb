import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Pollos asados en Arinaga | AriMar FoodLab',
  description:
    'Pollos asados para llevar en Playa de Arinaga. AriMar ofrece comida casera, freiduría y platos preparados 100% sin gluten en Gran Canaria.',
  alternates: {
    canonical: '/pollos-asados-arinaga',
  },
  openGraph: {
    title: 'Pollos asados en Arinaga | AriMar FoodLab',
    description:
      'Pollos asados para llevar en Playa de Arinaga, dentro de una propuesta de comida casera 100% sin gluten en Gran Canaria.',
    type: 'website',
    url: 'https://arimarfoodlab.es/pollos-asados-arinaga',
  },
}

const sections = [
  {
    eyebrow: 'Para llevar',
    title: 'Pollo asado para resolver la comida',
    text: 'En AriMar preparamos pollos asados para llevar en Playa de Arinaga dentro de nuestra propuesta de comida casera. Una opción práctica para casa, el trabajo, la playa o esos días en los que no apetece cocinar.',
  },
  {
    eyebrow: 'Arinaga',
    title: 'Comida para llevar en una calle de barrio',
    text: 'Estamos en Avenida Polizón 67, local, en Playa de Arinaga. Puedes pasar por el local, mirar la vitrina del día y elegir entre pollo asado, raciones, freiduría, guisos y elaboraciones preparadas según producción.',
  },
  {
    eyebrow: 'Sin gluten',
    title: 'Pollos asados dentro de una carta 100 % sin gluten',
    text: 'AriMar es un establecimiento 100 % sin gluten: toda la carta está elaborada sin gluten y no trabajamos con ingredientes con gluten. También informamos del resto de alérgenos presentes en cada elaboración.',
  },
  {
    eyebrow: 'Cercanía',
    title: 'Encargos y dudas por teléfono',
    text: 'Si quieres preguntar qué hay hoy o consultar disponibilidad de pollos asados para recoger, puedes llamarnos. Te orientamos con cercanía para que elijas con tranquilidad.',
  },
]

const highlights = ['Pollo asado Arinaga', 'Para llevar', '100 % sin gluten', 'Playa de Arinaga']

const internalLinks = [
  { href: '/carta', label: 'Carta 100% sin gluten' },
  { href: '/sin-gluten-gran-canaria', label: 'Comida 100% sin gluten en Gran Canaria' },
  { href: '/comida-para-llevar-sin-gluten-gran-canaria', label: 'Comida para llevar sin gluten' },
  { href: '/comida-sin-gluten-playa-de-arinaga', label: 'Sin gluten en Playa de Arinaga' },
  { href: '/alergenos', label: 'Alérgenos' },
]

export default function PollosAsadosArinagaPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-orange-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-orange-100/70 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-primary-700 font-semibold tracking-wide uppercase mb-3">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">
                Pollos asados en Playa de Arinaga
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Pollos asados para llevar en Arinaga dentro de una casa de comidas 100 % sin gluten:
                comida casera, freiduría, platos preparados y raciones para recoger en el local.
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
                Pollo asado, comida casera y vitrina diaria
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Si buscas pollo asado para llevar en Arinaga, AriMar combina esa idea de comida cómoda con una
                vitrina de elaboraciones caseras 100 % sin gluten. La carta rota según producción diaria,
                temporada y disponibilidad.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50/70 border border-primary-100 px-5 py-5 text-center">
              <p className="text-4xl font-bold text-primary-700">614</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">88 16 78 para llamar a AriMar</p>
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
              Ven a por tu pollo asado en Arinaga
            </h2>
            <p className="text-white/75 mb-8 leading-relaxed">
              Estamos en {siteConfig.address.street}, {siteConfig.address.locality}. Consulta la carta, ven al local
              o llámanos para resolver cualquier duda antes de venir.
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
                className="inline-flex justify-center px-8 py-3 border border-white/25 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Cómo llegar
              </Link>
              <a
                href={`tel:${siteConfig.whatsappPhoneE164}`}
                className="inline-flex justify-center px-8 py-3 border border-white/25 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Llamar a AriMar
              </a>
            </div>
          </div>
        </section>

        <section
          className="rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-7 shadow-sm"
          aria-labelledby="enlaces-pollos-heading"
        >
          <h2 id="enlaces-pollos-heading" className="text-xl md:text-2xl font-bold text-slate-800 mb-4 tracking-tight">
            También te puede interesar
          </h2>
          <ul className="flex flex-wrap gap-2 list-none pl-0">
            {internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-primary-100 bg-primary-50/70 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
