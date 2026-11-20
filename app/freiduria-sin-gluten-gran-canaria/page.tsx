import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'

const pagePath = '/freiduria-sin-gluten-gran-canaria'
const pageUrl = 'https://arimarfoodlab.es' + pagePath

export const metadata: Metadata = {
  // Conservamos el titulo y la URL por su historial de posicionamiento.
  title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'Freiduría en Playa de Arinaga: fingers de pollo crujiente, croquetas caseras, churros de pescado y otros fritos para llevar. Consulta disponibilidad y pide online.',
  alternates: { canonical: pagePath },
  openGraph: {
    title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Fingers de pollo, croquetas caseras, churros de pescado y fritos para llevar desde Playa de Arinaga. Consulta raciones y disponibilidad.',
    url: pageUrl,
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/images/arimar-freiduria-pollo-kentucky.webp',
        width: 1600,
        height: 1067,
        alt: 'Fingers de pollo crujiente estilo Kentucky de AriMar',
      },
    ],
  },
}

const fritos = [
  {
    name: 'Fingers de pollo estilo Kentucky',
    amount: '280–300 g',
    price: '7 €',
    text: 'Pollo crujiente por fuera y tierno por dentro. Una de las raciones protagonistas de nuestra freiduría.',
  },
  {
    name: 'Croquetas caseras',
    amount: '9 unidades · 270 g aprox.',
    price: '7 €',
    text: 'De jamón, pollo asado, atún con piquillo o queso de cabra con cebolla. Los sabores disponibles pueden variar.',
  },
  {
    name: 'Churros de pescado',
    amount: '300 g',
    price: '7 €',
    text: 'Tiras de pescado con rebozado, preparadas para disfrutar de un bocado de pescado frito.',
  },
  {
    name: 'Torreznos',
    amount: '180 g',
    price: '5 €',
    text: 'Una ración para quienes buscan ese punto crujiente. Consulta si los tenemos en la vitrina del día.',
  },
] as const

const primaryButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'

export default function FreiduriaSinGlutenGranCanariaPage() {
  return (
    <div className="overflow-hidden bg-white pb-20 text-slate-900">
      <header className="relative bg-gradient-to-br from-primary-50 via-white to-amber-50 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="mb-8 text-xs font-medium text-slate-500 md:mb-12">
            <Link href="/" className="hover:text-primary-700">Inicio</Link>
            <span className="mx-2 text-slate-400" aria-hidden="true">/</span>
            <span className="text-slate-700">Freiduría</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[0.93fr_1.07fr] lg:gap-14">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.19em] text-primary-800 md:text-sm">
                Fritos para llevar · Playa de Arinaga
              </p>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.7rem]">
                Freiduría en Arinaga.
                <span className="mt-2 block text-primary-700">El crujiente tiene su sitio.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
                Fingers de pollo, croquetas caseras, churros de pescado y otras frituras
                para llevar. Raciones para cuando te apetece algo sabroso sin tener que cocinar.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                Nuestra freiduría forma parte de una cocina 100 % sin gluten.
                Preparamos las raciones en Playa de Arinaga, Gran Canaria,
                y su disponibilidad depende de la producción del día.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href={siteConfig.pedirPath} className={primaryButton}>
                  Ver disponibilidad y pedir <span aria-hidden="true">→</span>
                </Link>
                <a href="#raciones" className="inline-flex min-h-12 items-center font-semibold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                  Ver nuestras raciones
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Para recoger en {siteConfig.address.street}, {siteConfig.address.locality}.
              </p>
            </div>
            <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/images/arimar-freiduria-pollo-kentucky.webp"
                  alt="Fingers de pollo estilo Kentucky crujientes, preparados en AriMar para llevar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 53vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" aria-hidden="true" />
                <figcaption className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-14 text-white sm:px-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-100">Fingers estilo Kentucky</p>
                  <p className="mt-2 text-xl font-bold">280–300 g · 7 €</p>
                  <p className="mt-1 text-xs text-white/80">Fotografía real de AriMar</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </header>

      <section id="raciones" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="raciones-titulo">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Qué sale de nuestra freidora</p>
            <h2 id="raciones-titulo" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              De los fingers a las croquetas.
              <span className="block text-primary-700">Hay más de un antojo.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Estas son algunas de nuestras raciones habituales. No todo está disponible
              todos los días: consulta lo que tenemos preparado antes de desplazarte.
            </p>
          </div>
          <div className="mt-12 border-t-2 border-primary-500">
            {fritos.map((frito) => (
              <article key={frito.name} className="grid gap-4 border-b border-slate-200 py-7 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8 md:py-9">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{frito.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-primary-700">{frito.amount} por ración</p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{frito.text}</p>
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{frito.price}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 text-sm leading-relaxed text-slate-500">
            Precios de las raciones indicadas. Disponibilidad sujeta a producción. Si necesitas
            conocer otros alérgenos o ingredientes, consúltanos antes de pedir.
          </p>
        </div>
      </section>

      <section className="bg-[#f6faf9] py-20 md:py-24" aria-labelledby="croquetas-especialidad">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <figure className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[1.75rem] bg-white shadow-lg">
              <Image
                src="/images/arimar-freiduria-pizarra.webp"
                alt="Pizarra de la freiduría de AriMar con la selección de croquetas y fritos"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">Nuestra pizarra, en Playa de Arinaga.</figcaption>
          </figure>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Una especialidad con página propia</p>
            <h2 id="croquetas-especialidad" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Las croquetas merecen capítulo aparte.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Preparamos croquetas de jamón serrano, queso de cabra con cebolla caramelizada,
              atún con piquillo y pollo asado. Nueve unidades por ración, 7 €.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              Cada sabor tiene sus ingredientes y su historia. Si vienes buscando
              croquetas, te contamos todo sobre ellas en su propia página.
            </p>
            <Link href="/croquetas-sin-gluten-gran-canaria"
              className="mt-8 inline-flex min-h-12 items-center gap-2 font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
              Conoce nuestras croquetas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white md:py-24" aria-labelledby="fritos-para-llevar">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">Fritos para llevar</p>
            <h2 id="fritos-para-llevar" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Elige lo que te apetece. Lo recoges y listo.
            </h2>
          </div>
          <div className="border-t border-primary-300/50 pt-7">
            <p className="text-lg leading-relaxed text-white/85">
              Estamos en Avenida Polizón 67, Playa de Arinaga (Agüimes).
              Puedes consultar las frituras disponibles y pedir online para recoger
              en el local. No disponemos de comedor.
            </p>
            <p className="mt-5 leading-relaxed text-white/75">
              Trabajamos 100 % sin gluten en toda nuestra cocina. Para otros alérgenos
              como leche, huevo o pescado, comprueba la información del producto antes de pedir.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={siteConfig.pedirPath} className={primaryButton}>
                Ver qué hay hoy y pedir <span aria-hidden="true">→</span>
              </Link>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center font-bold text-white underline decoration-white/40 underline-offset-4 hover:text-primary-200">
                Cómo llegar <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8" aria-labelledby="preguntas-freiduria">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Antes de venir</p>
        <h2 id="preguntas-freiduria" className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
          Preguntas sobre nuestras frituras
        </h2>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          <details className="group py-5">
            <summary className="cursor-pointer font-semibold text-slate-900">¿Qué fritos puedo comprar para llevar en Arinaga?</summary>
            <p className="mt-3 leading-relaxed text-slate-600">
              Entre nuestras raciones habituales hay fingers de pollo, croquetas,
              churros de pescado y torreznos. Consulta la disponibilidad diaria antes de venir.
            </p>
          </details>
          <details className="group py-5">
            <summary className="cursor-pointer font-semibold text-slate-900">¿Son frituras sin gluten?</summary>
            <p className="mt-3 leading-relaxed text-slate-600">
              Sí. Nuestra cocina y freiduría trabajan 100 % sin gluten.
              Si necesitas información sobre otros alérgenos, consúltanos antes de pedir.
            </p>
          </details>
          <details className="group py-5">
            <summary className="cursor-pointer font-semibold text-slate-900">¿Dónde puedo recoger el pedido?</summary>
            <p className="mt-3 leading-relaxed text-slate-600">
              En Avenida Polizón 67, Playa de Arinaga, Gran Canaria. Puedes
              pedir online y recoger tu comida en el local.
            </p>
          </details>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-primary-700">
          <Link href="/croquetas-sin-gluten-gran-canaria" className="underline underline-offset-4 hover:text-primary-900">
            Ver sabores de croquetas
          </Link>
          <a
            href={getWhatsAppUrl('Hola, AriMar. Quería consultar qué fritos tenéis disponibles y sus ingredientes antes de pedir.')}
            target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary-900">
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
