import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Pollo asado en Arinaga para llevar | AriMar',
  description:
    'Pollo asado para llevar en Playa de Arinaga, todos los días y 100 % sin gluten. Consulta disponibilidad, pide online y recoge en Avenida Polizón 67.',
  alternates: {
    canonical: '/pollos-asados-arinaga',
  },
  openGraph: {
    title: 'Pollo asado en Arinaga para llevar | AriMar',
    description:
      'Pollo asado todos los días en Playa de Arinaga, 100 % sin gluten. Pídelo online para recoger en AriMar, Avenida Polizón 67.',
    type: 'website',
    url: 'https://arimarfoodlab.es/pollos-asados-arinaga',
  },
}

const sections = [
  {
    eyebrow: 'Para llevar',
    title: 'Pollo asado para resolver la comida',
    text: 'Preparamos pollo asado a diario en Playa de Arinaga para que resuelvas la comida de casa, del trabajo o de un día de playa. Consulta las unidades disponibles y recógelo en el local.',
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
    eyebrow: 'Disponibilidad',
    title: 'Consulta lo disponible y pide online',
    text: 'Preparamos pollo asado todos los días, sujeto a existencias. Consulta lo que queda disponible, haz tu pedido online y recógelo en AriMar.',
  },
]

const highlights = ['Pollo asado a diario', 'Para llevar', '100 % sin gluten', 'Playa de Arinaga']

const internalLinks = [
  { href: '/carta', label: 'Carta 100% sin gluten' },
  { href: '/sin-gluten-gran-canaria', label: 'Comida 100% sin gluten en Gran Canaria' },
  { href: '/comida-para-llevar-sin-gluten-gran-canaria', label: 'Comida para llevar sin gluten' },
  { href: '/comida-sin-gluten-playa-de-arinaga', label: 'Sin gluten en Playa de Arinaga' },
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
                Pollo asado para llevar en Playa de Arinaga
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Pollo asado todos los días y 100 % sin gluten. Comprueba la disponibilidad,
                haz tu pedido online y recógelo en AriMar, Avenida Polizón 67.
              </p>
              <div className="mt-6">
                <Link
                  href="/hoy"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
                >
                  Consultar disponibilidad y pedir
                </Link>
              </div>
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
            <div className="mx-auto w-full max-w-sm md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <Image
                  src="/images/arimar-20261023-pollos-asados.webp"
                  alt="Pollos asados de AriMar en el horno de nuestra cocina, para recoger en Playa de Arinaga"
                  fill
                  sizes="(max-width: 768px) 80vw, 220px"
                  className="object-cover"
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
                Si buscas pollo asado para llevar en Arinaga, en AriMar lo preparamos a diario en
                una cocina 100 % sin gluten. Consulta las unidades disponibles antes de desplazarte;
                también puedes elegir otras elaboraciones de nuestra vitrina del día.
              </p>
            </div>
            <Link
              href="/hoy"
              className="rounded-2xl bg-primary-50/70 border border-primary-100 px-5 py-6 text-center font-bold text-primary-800 hover:bg-primary-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Ver disponibilidad y pedir
            </Link>
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
              Estamos en {siteConfig.address.street}, {siteConfig.address.locality}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hoy"
                className="inline-flex justify-center px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Ver disponibilidad y pedir
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
