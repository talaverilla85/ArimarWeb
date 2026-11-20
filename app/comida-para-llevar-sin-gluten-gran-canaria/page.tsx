import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

const pagePath = '/comida-para-llevar-sin-gluten-gran-canaria'
const pageUrl = 'https://arimarfoodlab.es' + pagePath

export const metadata: Metadata = {
  // Se conserva el titulo y la URL actuales: la mejora es de intencion y contenido.
  title: 'Comida para llevar sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'Comida casera y platos preparados para llevar en Gran Canaria: guisos, arroces, ensaladas y asados. Consulta la vitrina del día, pide online y recoge en Playa de Arinaga.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Comida para llevar sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Platos preparados para llevar: guisos, arroces, ensaladas y asados. Elige lo que hay disponible hoy y recoge en Playa de Arinaga.',
    type: 'website',
    locale: 'es_ES',
    url: pageUrl,
    images: [
      {
        url: '/images/hero-variedad-tuppers.webp',
        alt: 'Variedad de platos caseros preparados de AriMar para llevar',
      },
    ],
  },
}

const platos = [
  {
    name: 'Ropa vieja',
    note: 'Guisos de los que apetecen cuando quieres comer como en casa.',
    image: '/images/arimar-20261023-ropa-vieja.webp',
    alt: 'Ropa vieja casera de AriMar, con carne y garbanzos, preparada para llevar',
  },
  {
    name: 'Arroces del día',
    note: 'Elaboraciones que cambian con la producción, como nuestro arroz negro con gambas.',
    image: '/images/arimar-20261023-arroz-negro.webp',
    alt: 'Arroz negro con gambas preparado en AriMar y servido en una bandeja para llevar',
  },
  {
    name: 'Algo fresco',
    note: 'Ensaladas y propuestas como el poke de pollo para cambiar de plato.',
    image: '/images/arimar-20261023-poke-pollo.webp',
    alt: 'Poke de pollo crujiente de AriMar con arroz y verduras en un cuenco',
  },
] as const

const related = [
  { href: '/pollos-asados-arinaga', title: 'Pollo asado', description: 'Con papas naturales y su jugo' },
  { href: '/croquetas-sin-gluten-gran-canaria', title: 'Croquetas', description: 'Cuatro sabores, elaboración propia' },
  { href: '/freiduria-sin-gluten-gran-canaria', title: 'Freiduría', description: 'Fingers de pollo y otras frituras' },
] as const

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://arimarfoodlab.es/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Comida para llevar en Gran Canaria',
      item: pageUrl,
    },
  ],
}

const orderButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'

export default function ComidaParaLlevarSinGlutenGranCanariaPage() {
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
              <span className="text-slate-700">Comida para llevar</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[0.91fr_1.09fr] lg:gap-14">
              <div className="max-w-xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.19em] text-primary-800 md:text-sm">
                  Platos preparados · Playa de Arinaga
                </p>
                <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
                  Comida casera para llevar en Gran Canaria.
                  <span className="mt-2 block text-primary-700">Hoy cocinamos nosotros.</span>
                </h1>
                <p className="mt-7 text-lg leading-relaxed text-slate-700 md:text-xl">
                  ¿No te apetece cocinar? Tenemos platos preparados para llevar:
                  guisos, arroces, ensaladas, asados y otras elaboraciones que
                  van saliendo de nuestra cocina.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Elige en nuestra vitrina o consulta desde el móvil qué hay hoy.
                  La oferta cambia con la producción y algunas raciones pueden agotarse.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Link href={siteConfig.pedirPath} className={orderButton}>
                    Ver los platos de hoy y pedir <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/carta"
                    className="inline-flex min-h-12 items-center font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900"
                  >
                    Conocer la carta
                  </Link>
                </div>
                <p className="mt-7 text-sm text-slate-500">
                  Cocina 100 % sin gluten · Recogida en Playa de Arinaga, Agüimes.
                </p>
              </div>

              <figure className="mx-auto w-full max-w-xl lg:max-w-none">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src="/images/hero-variedad-tuppers.webp"
                    alt="Variedad de elaboraciones caseras de AriMar preparadas en recipientes para llevar"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-slate-500">
                  Comida preparada en nuestra cocina. La disponibilidad depende del día.
                </figcaption>
              </figure>
            </div>
          </div>
        </header>

        <section className="py-20 md:py-28" aria-labelledby="que-comer-hoy">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-end md:gap-16">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                  Algunas ideas para comer
                </p>
                <h2 id="que-comer-hoy" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  De cuchara, de tenedor.
                  <span className="block text-primary-700">Y para cada antojo.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-600">
                Hay platos que repetimos y otros que cambian. Estos son ejemplos
                reales de nuestra cocina, no una promesa de disponibilidad diaria.
              </p>
            </div>

            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.9fr_0.95fr] lg:gap-7">
              {platos.map((plato, index) => (
                <figure key={plato.name} className={index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100 sm:aspect-[5/4] lg:aspect-[4/5]">
                    <Image
                      src={plato.image}
                      alt={plato.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="pt-5">
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{plato.name}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{plato.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-10 text-sm font-medium text-slate-500">
              Las fotografías muestran elaboraciones reales de AriMar. Puedes consultar la oferta actual desde
              la tienda online antes de desplazarte.
            </p>
          </div>
        </section>

        <section className="bg-[#f8f5ef] py-20 md:py-24" aria-labelledby="comida-lista-para-recoger">
          <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 md:grid-cols-[0.87fr_1.13fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                La comida ya está hecha
              </p>
              <h2 id="comida-lista-para-recoger" className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                No es un menú cerrado.
                <span className="block text-primary-700">Elige lo que te apetece.</span>
              </h2>
            </div>
            <div className="border-t-2 border-primary-500 pt-7">
              <p className="text-lg leading-relaxed text-slate-700">
                Preparamos comida para llevar pensando en quienes quieren resolver
                un almuerzo en casa, en el trabajo o después de una mañana de playa.
                Puedes combinar diferentes raciones según lo que tengamos preparado.
              </p>
              <p className="mt-5 leading-relaxed text-slate-600">
                Encontrarás platos de cuchara, carnes, arroces, propuestas frescas y
                elaboraciones para compartir, según la producción. No necesitas
                escoger un menú fijo ni encargar un catering: eliges tu comida y la recoges.
              </p>
              <p className="mt-6 text-sm font-semibold text-primary-800">
                Si buscas un plato concreto, comprueba las existencias del día.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="especialidades-para-llevar">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Si vienes por algo concreto
              </p>
              <h2 id="especialidades-para-llevar" className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Algunas elaboraciones tienen su propia historia.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                El pollo asado, las croquetas y los fritos también forman parte
                de nuestra propuesta. Puedes conocerlos mejor antes de pedir.
              </p>
            </div>
            <div className="border-t-2 border-primary-500">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col gap-2 border-b border-slate-200 py-6 transition-colors hover:bg-primary-50/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-3"
                >
                  <span className="text-xl font-bold text-slate-900 group-hover:text-primary-800">{item.title}</span>
                  <span className="flex items-center justify-between gap-6 text-sm text-slate-600 sm:gap-10">
                    {item.description}
                    <span className="text-xl font-semibold text-primary-700" aria-hidden="true">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white md:py-24" aria-labelledby="recogida-arinaga">
          <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
                Comida preparada para recoger
              </p>
              <h2 id="recogida-arinaga" className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                ¿Dónde comprar comida para llevar en Gran Canaria?
              </h2>
            </div>
            <div className="border-t border-white/30 pt-7">
              <p className="text-lg leading-relaxed text-white/85">
                Nos encontrarás en {siteConfig.address.street}, {siteConfig.address.locality},
                en el municipio de {siteConfig.address.municipality}.
                Puedes venir a elegir directamente en la vitrina o consultar la disponibilidad
                y hacer un pedido online para recoger en el local.
              </p>
              <p className="mt-5 leading-relaxed text-white/75">
                Abrimos todos los días de 11:30 a 16:00, salvo cambios puntuales.
                Somos una casa de comidas para llevar, sin comedor y sin entrega a domicilio.
              </p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 hover:text-primary-200"
                >
                  Cómo llegar <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/contacto"
                  className="underline decoration-white/40 underline-offset-4 hover:text-primary-200"
                >
                  Ver ubicación y horario <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-4 mt-12 rounded-[1.75rem] bg-gradient-to-br from-primary-50 to-[#f6f1e9] px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="pedir-comida">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Tu disfruta, nosotros cocinamos.
              </p>
              <h2 id="pedir-comida" className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                ¿Qué te apetece comer hoy?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Mira los platos que tenemos disponibles y deja tu pedido preparado para recoger
                en Playa de Arinaga.
              </p>
            </div>
            <Link href={siteConfig.pedirPath} className={orderButton}>
              Ver disponibilidad y pedir <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
