import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

const pagePath = '/comida-sin-gluten-playa-de-arinaga'
const pageUrl = 'https://arimarfoodlab.es' + pagePath

export const metadata: Metadata = {
  // Preservamos el titulo, la URL y la intencion local de esta pagina.
  title: 'Comida sin gluten en Playa de Arinaga | AriMar FoodLab',
  description:
    'Comida 100 % sin gluten para llevar en Playa de Arinaga. Visítanos en Avenida Polizón 67, consulta los platos del día y recoge tu pedido en AriMar, Agüimes.',
  alternates: { canonical: pagePath },
  openGraph: {
    title: 'Comida sin gluten en Playa de Arinaga | AriMar FoodLab',
    description:
      'Comida casera sin gluten para recoger en Avenida Polizón 67, Playa de Arinaga. Consulta qué hay hoy y cómo llegar.',
    type: 'website',
    locale: 'es_ES',
    url: pageUrl,
    images: [
      {
        url: '/images/arimar-freiduria-pizarra.webp',
        alt: 'Pizarra auténtica de AriMar junto a las plantas del local en Playa de Arinaga',
      },
    ],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://arimarfoodlab.es/' },
    { '@type': 'ListItem', position: 2, name: 'Comida sin gluten en Playa de Arinaga', item: pageUrl },
  ],
}

const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3 font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2'

const opciones = [
  {
    title: 'Platos preparados del día',
    text: 'Guisos, arroces, ensaladas y otras elaboraciones de nuestra vitrina. La selección cambia según producción.',
    href: '/comida-para-llevar-sin-gluten-gran-canaria',
    label: 'Descubrir la comida para llevar',
  },
  {
    title: 'Pollo asado',
    text: 'Nuestro pollo asado con papas naturales y su propio jugo, disponible según existencias.',
    href: '/pollos-asados-arinaga',
    label: 'Conocer el pollo asado',
  },
  {
    title: 'Croquetas y fritos',
    text: 'Croquetas de distintos sabores, fingers de pollo y otras frituras para recoger y disfrutar donde quieras.',
    href: '/freiduria-sin-gluten-gran-canaria',
    label: 'Ver la freiduría',
  },
] as const

export default function ComidaSinGlutenPlayaDeArinagaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="overflow-hidden bg-white pb-20 text-slate-900">
        <header className="bg-gradient-to-br from-primary-50 via-white to-amber-50 pt-28 pb-16 md:pt-32 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="mb-10 text-xs font-medium text-slate-500 md:mb-12">
              <Link href="/" className="hover:text-primary-700">Inicio</Link>
              <span className="mx-2 text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-700">Sin gluten en Playa de Arinaga</span>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
              <div className="max-w-xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.19em] text-primary-800 md:text-sm">
                  Playa de Arinaga · Agüimes · Gran Canaria
                </p>
                <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.7rem]">
                  Comida sin gluten en Playa de Arinaga.
                  <span className="mt-2 block text-primary-700">Aquí tienes dónde recogerla.</span>
                </h1>
                <p className="mt-7 text-lg leading-relaxed text-slate-700 md:text-xl">
                  En Avenida Polizón 67 encontrarás nuestra casa de comidas para llevar.
                  Platos preparados, raciones, asados y fritos en una cocina 100 % sin gluten.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Puedes venir a elegir en la vitrina o consultar desde el móvil
                  las elaboraciones disponibles antes de acercarte.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={siteConfig.pedirPath} className={buttonClass}>
                    Ver qué hay hoy y pedir <span aria-hidden="true">→</span>
                  </Link>
                  <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                    Cómo llegar <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="mt-7 text-sm font-medium text-slate-600">
                  {siteConfig.address.street} · {siteConfig.address.locality}
                </p>
              </div>

              <figure className="mx-auto w-full max-w-md lg:max-w-none">
                <div className="relative aspect-[2/3] overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-xl sm:aspect-[4/5] lg:aspect-[2/3]">
                  <Image
                    src="/images/arimar-freiduria-pizarra.webp"
                    alt="Pizarra original de AriMar fotografiada junto a las plantas del local de Playa de Arinaga"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 44vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-slate-500">
                  Una imagen real de nuestro local en Playa de Arinaga.
                </figcaption>
              </figure>
            </div>
          </div>
        </header>

        <section className="py-20 md:py-24" aria-labelledby="donde-estamos">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Estamos en el barrio</p>
              <h2 id="donde-estamos" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Tu comida para llevar,
                <span className="block text-primary-700">en Avenida Polizón 67.</span>
              </h2>
            </div>
            <div className="border-t-2 border-primary-500 pt-7">
              <p className="text-lg leading-relaxed text-slate-700">
                Nos encontrarás en {siteConfig.address.street}, {siteConfig.address.locality},
                dentro del municipio de {siteConfig.address.municipality}. Estamos abiertos
                todos los días de 11:30 a 16:00, salvo cambios puntuales de horario.
              </p>
              <p className="mt-5 leading-relaxed text-slate-600">
                Somos un establecimiento de recogida, sin comedor. Si estás por Arinaga,
                trabajas por la zona o vienes de otro punto del sureste de Gran Canaria,
                puedes consultar antes lo que tenemos preparado y pasar a recogerlo.
              </p>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                Abrir ubicación en Google Maps <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f5f0] py-20 md:py-24" aria-labelledby="que-encontraras">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Qué puedes llevarte</p>
              <h2 id="que-encontraras" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                ¿Qué te apetece comer hoy?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                La vitrina cambia según lo que elaboramos cada día.
                Estas son algunas de nuestras opciones; consulta la disponibilidad antes de venir.
              </p>
            </div>

            <div className="mt-11 border-t-2 border-primary-500">
              {opciones.map((opcion) => (
                <article key={opcion.href} className="grid gap-4 border-b border-[#d8d5cc] py-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{opcion.title}</h3>
                  <div>
                    <p className="leading-relaxed text-slate-700">{opcion.text}</p>
                    <Link href={opcion.href} className="mt-4 inline-flex min-h-10 items-center font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                      {opcion.label} <span className="ml-2" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Si te interesan específicamente las croquetas, puedes conocer nuestros
              {' '}<Link href="/croquetas-sin-gluten-gran-canaria" className="font-semibold text-primary-800 underline underline-offset-4">cuatro sabores</Link>.
            </p>
          </div>
        </section>

        <section className="bg-primary-900 py-20 text-white md:py-24" aria-labelledby="sin-gluten-local">
          <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">Una misma cocina para todos</p>
              <h2 id="sin-gluten-local" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Sin gluten, sin una carta aparte.
              </h2>
            </div>
            <div className="border-t border-primary-300/50 pt-7">
              <p className="text-lg leading-relaxed text-white/85">
                En AriMar no hay una pequeña selección de platos adaptados.
                Toda nuestra propuesta se elabora en una cocina sin ingredientes con gluten:
                desde las comidas preparadas hasta la freiduría.
              </p>
              <p className="mt-5 leading-relaxed text-white/75">
                Cada elaboración puede contener otros alérgenos. Si necesitas conocer
                los ingredientes de un plato concreto, consúltanos antes de realizar tu pedido.
              </p>
              <Link href="/sin-gluten-gran-canaria"
                className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-100 underline decoration-primary-300/60 underline-offset-4 hover:text-white">
                Conoce nuestra propuesta sin gluten en Gran Canaria <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="preguntas-locales">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Antes de acercarte</p>
            <h2 id="preguntas-locales" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Preguntas habituales en Playa de Arinaga
            </h2>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              <details className="py-5">
                <summary className="cursor-pointer font-bold text-slate-900">
                  ¿Dónde puedo comprar comida sin gluten en Playa de Arinaga?
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">
                  En AriMar, Avenida Polizón 67, local, Playa de Arinaga (Agüimes).
                  Preparamos comida sin gluten para llevar y recoger en el establecimiento.
                </p>
              </details>
              <details className="py-5">
                <summary className="cursor-pointer font-bold text-slate-900">
                  ¿Puedo hacer un pedido antes de pasar?
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Sí. Puedes consultar los platos disponibles en la tienda online
                  y hacer tu pedido para recoger en el local.
                </p>
              </details>
              <details className="py-5">
                <summary className="cursor-pointer font-bold text-slate-900">
                  ¿Hay mesas para comer allí?
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">
                  No disponemos de comedor. Nuestra comida está preparada para llevar.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="mx-4 rounded-[1.75rem] bg-gradient-to-br from-primary-50 to-amber-50 px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="pedido-local">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Te lo preparamos para recoger</p>
              <h2 id="pedido-local" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                ¿Vienes a por tu comida?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                Mira qué hay hoy y recógelo en Playa de Arinaga,
                en {siteConfig.address.street}.
              </p>
            </div>
            <Link href={siteConfig.pedirPath} className={buttonClass}>
              Consultar disponibilidad y pedir <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
