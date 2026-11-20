import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Comer sin gluten en Gran Canaria | AriMar 100 % sin gluten',
  description:
    '¿Buscas dónde comer sin gluten en Gran Canaria? En AriMar encontrarás comida casera 100 % sin gluten para llevar. Pide online y recoge en Playa de Arinaga.',
  alternates: {
    canonical: '/sin-gluten-gran-canaria',
    languages: {
      'es-ES': '/sin-gluten-gran-canaria',
      'en': '/en/gluten-free-gran-canaria',
    },
  },
  openGraph: {
    title: 'Comer sin gluten en Gran Canaria | AriMar 100 % sin gluten',
    description:
      'Comida casera 100 % sin gluten para llevar en Gran Canaria. Consulta la oferta, pide online y recoge en Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/sin-gluten-gran-canaria',
    images: [
      {
        url: '/images/arimar-vitrina-comida-para-llevar.webp',
        alt: 'Vitrina de comida preparada 100 % sin gluten para llevar de AriMar',
      },
    ],
  },
}

const dudasViajeros = [
  {
    question: '¿Dónde puedo comprar comida sin gluten en Gran Canaria?',
    answer:
      'En AriMar, Avenida Polizón 67, Playa de Arinaga (Agüimes). Preparamos comida casera 100 % sin gluten para llevar. Puedes consultar la oferta diaria antes de desplazarte.',
  },
  {
    question: '¿Toda la comida de AriMar es apta para celíacos?',
    answer:
      'Toda nuestra carta se elabora sin ingredientes con gluten, no solo una selección de platos. También informamos de los ingredientes y de otros alérgenos de cada elaboración para que puedas elegir con claridad.',
  },
  {
    question: '¿Puedo recoger comida sin gluten y llevarla a mi alojamiento?',
    answer:
      'Sí. Puedes hacer tu pedido online, recogerlo en nuestro local de Playa de Arinaga y llevártelo al alojamiento o donde prefieras. No disponemos de comedor ni de reparto a domicilio.',
  },
  {
    question: '¿Qué comida sin gluten puedo encontrar?',
    answer:
      'Según la producción del día, elaboramos guisos, arroces, ensaladas, asados, croquetas, fritos y otras raciones. Consulta las existencias actuales antes de hacer tu pedido.',
  },
] as const

const directorios = [
  {
    name: 'CeliNews',
    description: 'Guía para celíacos',
    domain: 'celinews.com',
    href: 'https://celinews.com/gran-canaria-sin-gluten-para-celiacos/',
    wordmark: 'font-bold tracking-tight',
  },
  {
    name: 'NoGluApp',
    description: 'App sin gluten',
    domain: 'nogluapp.com',
    href: 'https://nogluapp.com/restaurante/2391',
    wordmark: 'font-extrabold tracking-tight',
  },
  {
    name: 'Find Me Gluten Free',
    description: 'Guía internacional',
    domain: 'findmeglutenfree.com',
    href: 'https://www.findmeglutenfree.com/biz/arimar/6616784932569088',
    wordmark: 'font-bold tracking-tight',
  },
  {
    name: 'Canarias7',
    description: 'Directorio de empresas',
    domain: 'canarias7.es',
    href: 'https://servicios.canarias7.es/empresas/arimar.html',
    wordmark: 'font-extrabold tracking-tight',
  },
] as const

const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2'

export default function SinGlutenGranCanariaPage() {
  return (
    <div className="overflow-hidden bg-white pb-16 text-slate-900">
      <section className="relative bg-gradient-to-br from-[#f2f9f7] via-white to-[#fbf7ef] pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.19em] text-primary-800">
              Gran Canaria · Comida sin gluten para llevar
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.8rem]">
              Comer sin gluten en Gran Canaria.
              <span className="mt-3 block text-primary-700">
                Y comer lo que te apetece.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Pollo asado, guisos, croquetas, arroces y platos preparados.
              Una única carta para todos, elaborada en nuestra cocina 100 % sin gluten.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              Estamos en Playa de Arinaga. Si vives en la isla o vienes de vacaciones,
              puedes mirar qué tenemos hoy, hacer tu pedido y recogerlo en nuestro local.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href={siteConfig.pedirPath} className={buttonClass}>
                Ver qué hay hoy y pedir <span aria-hidden="true">→</span>
              </Link>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                Cómo llegar <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary-200 pt-6 text-sm font-semibold text-slate-600">
              <span>100 % sin gluten</span>
              <span>Comida para llevar</span>
              <span>Playa de Arinaga</span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-2xl lg:aspect-[5/4]">
              <Image
                src="/images/arimar-vitrina-comida-para-llevar.webp"
                alt="Vitrina real de AriMar llena de platos caseros preparados para llevar, con etiquetas de ingredientes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">
              La vitrina de AriMar, en Playa de Arinaga. Platos sujetos a disponibilidad.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 md:py-24" aria-labelledby="una-carta">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.86fr_1.14fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Toda la carta
            </p>
            <h2 id="una-carta" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              No tenemos una carta «especial» sin gluten.
              <span className="mt-2 block text-primary-700">Toda la carta lo es.</span>
            </h2>
          </div>
          <div className="border-t-2 border-primary-500 pt-7">
            <p className="text-lg leading-relaxed text-slate-700">
              No necesitas elegir entre un par de platos adaptados. En AriMar
              trabajamos sin ingredientes con gluten en todas nuestras elaboraciones:
              desde los guisos y arroces hasta las croquetas y los fritos.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              También indicamos otros alérgenos e ingredientes en el etiquetado.
              Si necesitas información sobre un plato concreto, puedes consultarla
              antes de pedir.
            </p>
            <Link
              href="/carta"
              className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
            >
              Conocer nuestra carta <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-20 md:py-24" aria-labelledby="para-toda-gran-canaria">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
            <Image
              src="/images/arimar-20261023-ropa-vieja.webp"
              alt="Ropa vieja con garbanzos y carne, uno de los platos preparados sin gluten de AriMar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Para vecinos y viajeros
            </p>
            <h2 id="para-toda-gran-canaria" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Tu comida resuelta, también cuando estás de vacaciones.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Un almuerzo para llevar a casa, al alojamiento o a la playa.
              Elige entre lo que tenemos preparado cada día y haz tu pedido
              antes de desplazarte hasta Playa de Arinaga.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              No disponemos de comedor ni servicio de entrega a domicilio.
              Recoges tu comida en Avenida Polizón 67, Agüimes, Gran Canaria.
            </p>
          </div>
        </div>
      </section>

      {/* Presencia de AriMar en la asociación y en directorios especializados. */}
      <section className="py-20 md:py-28" aria-labelledby="donde-nos-encuentras">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.21em] text-primary-800">
              Nuestra presencia
            </p>
            <h2 id="donde-nos-encuentras" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              También nos puedes encontrar en
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Encuentra nuestra ficha en ASOCECA y en guías y aplicaciones
              utilizadas para buscar comida sin gluten en Gran Canaria.
            </p>
          </div>

          <a
            href="https://asoceca.org/establecimiento/arimar-foodlab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver ficha de AriMar en ASOCECA, FACE Restauración"
            className="group mx-auto mt-11 flex max-w-3xl flex-col items-center gap-5 border-y border-primary-200 py-7 transition-colors hover:bg-primary-50/30 sm:flex-row sm:justify-center sm:gap-7 sm:px-5"
          >
            <Image
              src="/images/arimar-face-restauracion.webp"
              alt="Distintivo FACE Restauración Sin Gluten Gluten Free"
              width={96}
              height={96}
              className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
            />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                Asociación de celíacos
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                ASOCECA · FACE Restauración
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Consulta nuestra ficha en el directorio de ASOCECA,
                diferenciada de las apariciones en guías y apps.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-2xl font-bold text-primary-700 transition-transform group-hover:translate-x-1"
            >↗</span>
          </a>

          <div className="mt-12">
            <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Guías, apps y medios donde aparecemos
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
              {directorios.map((directorio) => (
                <a
                  key={directorio.href}
                  href={directorio.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[112px] flex-col items-center justify-center text-center"
                  aria-label={'Ver AriMar en ' + directorio.name}
                >
                  <div className="flex min-h-[60px] items-center justify-center gap-2.5">
                    <Image
                      src={'https://www.google.com/s2/favicons?domain=' + directorio.domain + '&sz=128'}
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      unoptimized
                      loading="lazy"
                      className="h-9 w-9 shrink-0 rounded-md object-contain"
                    />
                    <span className={directorio.wordmark + ' max-w-[155px] text-left text-base leading-tight text-slate-800 transition-colors group-hover:text-primary-800 sm:text-lg'}>
                      {directorio.name}
                    </span>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">{directorio.description}</span>
                  <span className="mt-2 h-px w-9 bg-primary-300 transition-all group-hover:w-16 group-hover:bg-primary-600" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-9 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Las guías y directorios muestran información sobre AriMar; su inclusión
            no implica que esas plataformas certifiquen el establecimiento ni que
            exista una colaboración comercial con ellas.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f9f7] py-16 md:py-20" aria-labelledby="dudas-celiacos">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Para quienes viven o viajan a la isla
            </p>
            <h2 id="dudas-celiacos" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              ¿Buscas dónde comer sin gluten en Gran Canaria?
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Resolvemos las dudas más habituales antes de venir.
              Aquí encontrarás comida para llevar y recoger, no servicio de restaurante en mesa.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {dudasViajeros.map((duda) => (
              <details key={duda.question} className="group py-5">
                <summary className="cursor-pointer pr-5 text-base font-bold leading-snug text-slate-900 marker:text-primary-700 hover:text-primary-800">
                  {duda.question}
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                  {duda.answer}
                </p>
              </details>
            ))}
            <div className="pt-5">
              <Link
                href={siteConfig.pedirPath}
                className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                Ver los platos disponibles y pedir <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-50 to-[#f8f4ed] px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="hacer-pedido">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Tu disfruta, nosotros cocinamos
            </p>
            <h2 id="hacer-pedido" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Qué te apetece comer hoy?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Comida preparada 100 % sin gluten. Pídela para recoger en Playa de Arinaga.
            </p>
          </div>
          <Link href={siteConfig.pedirPath} className={buttonClass}>
            Ver disponibilidad y pedir <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
