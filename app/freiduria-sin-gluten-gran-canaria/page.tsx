import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'Croquetas caseras, fingers de pollo y fritos en una cocina 100 % sin gluten. Descubre la freiduría de AriMar en Playa de Arinaga, Gran Canaria. Consulta y pide para recoger.',
  alternates: {
    canonical: '/freiduria-sin-gluten-gran-canaria',
  },
  openGraph: {
    title: 'Freiduría sin gluten en Gran Canaria | AriMar FoodLab',
    description:
      'Croquetas caseras, pollo crujiente y comida para llevar. Nuestra freiduría 100 % sin gluten está en Playa de Arinaga, Gran Canaria.',
    url: 'https://arimarfoodlab.es/freiduria-sin-gluten-gran-canaria',
    type: 'website',
    images: [
      {
        url: '/images/arimar-freiduria-pollo-kentucky.webp',
        width: 1600,
        height: 1067,
        alt: 'Fingers de pollo estilo Kentucky elaborados en AriMar',
      },
    ],
  },
}

const croquetas = [
  {
    number: '01',
    name: 'Jamón serrano',
    description: 'Una de esas croquetas clásicas que siempre apetece repetir.',
  },
  {
    number: '02',
    name: 'Rulo de cabra y cebolla caramelizada',
    description: 'Un contraste de sabores para los que buscan algo diferente.',
  },
  {
    number: '03',
    name: 'Atún y pimiento del piquillo',
    description: 'Una combinación con personalidad y sabor a cocina de casa.',
  },
  {
    number: '04',
    name: 'Pollo asado',
    description: 'Nuestro pollo asado llevado también al mundo de las croquetas.',
  },
]

export default function FreiduriaSinGlutenGranCanariaPage() {
  return (
    <div className="overflow-hidden bg-white pb-20">
      <header className="relative bg-gradient-to-br from-primary-50 via-white to-amber-50 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="pointer-events-none absolute -right-24 top-4 h-80 w-80 rounded-full bg-primary-100/50 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:gap-16 lg:px-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800 md:text-sm">
              AriMar · Playa de Arinaga · Gran Canaria
            </p>
            <h1 className="mb-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem]">
              Freiduría sin gluten.
              <span className="mt-2 block text-primary-700">Aquí manda el sabor.</span>
            </h1>
            <p className="mb-5 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Croquetas caseras, pollo crujiente y ese antojo que pide algo recién hecho.
              En AriMar, toda la cocina —también nuestra freiduría— es 100 % sin gluten.
            </p>
            <p className="mb-8 max-w-xl leading-relaxed text-slate-600">
              Estamos en Playa de Arinaga, Agüimes. Si vienes desde cualquier otro punto de
              Gran Canaria, puedes consultar la disponibilidad y pedir antes de desplazarte.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={siteConfig.pedirPath}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-500 px-7 py-3 font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                Ver qué hay hoy y pedir <span className="ml-2" aria-hidden="true">→</span>
              </Link>
              <Link href="/contacto"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-primary-200 bg-white px-7 py-3 font-bold text-primary-800 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                Cómo llegar
              </Link>
            </div>
            <p className="mt-7 text-sm font-medium text-slate-600">
              <span className="text-primary-700" aria-hidden="true">●</span> Comida para llevar
              <span className="mx-2 text-slate-300" aria-hidden="true">·</span> Recogida en local
              <span className="mx-2 text-slate-300" aria-hidden="true">·</span> Sin comedor
            </p>
          </div>

          <figure className="relative mx-auto w-full max-w-[490px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] border-[7px] border-white bg-white shadow-2xl">
              <Image
                src="/images/arimar-freiduria-pizarra.webp"
                alt="Pizarra de AriMar con el mensaje Nuestros fritos, croquetas y fingers de pollo, junto a las plantas del local"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-slate-900/95 px-5 py-4 text-sm font-semibold text-white shadow-lg sm:left-8 sm:right-auto">
              Nuestra pizarra. Nuestra freiduría. AriMar.
            </figcaption>
          </figure>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="croquetas-title">
          <div className="mb-11 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Una de nuestras especialidades
              </p>
              <h2 id="croquetas-title" className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Croquetas con nombre y apellidos.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Las hacemos en nuestro obrador y no necesitas buscar una versión aparte sin gluten:
              así son las croquetas de AriMar. Estos son nuestros cuatro sabores;
              la disponibilidad de cada uno depende de la producción.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[2rem] border border-primary-100 bg-primary-50/60 sm:grid-cols-2">
            {croquetas.map((item) => (
              <article key={item.number}
                className="border-b border-primary-100 p-7 sm:p-9 sm:odd:border-r sm:last:border-b-0">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-bold tracking-widest text-primary-700">{item.number} / 04</span>
                  <span className="h-px w-16 bg-primary-200" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 md:text-2xl">{item.name}</h3>
                <p className="leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Los productos contienen otros ingredientes y pueden presentar otros alérgenos.
            Consúltanos si necesitas información sobre un sabor concreto antes de pedir.
          </p>
        </section>

        <section className="bg-slate-900 py-16 text-white md:py-24" aria-labelledby="crujientes-title">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:gap-16 lg:px-8">
            <figure className="relative overflow-hidden rounded-[2rem] bg-slate-800 shadow-xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/arimar-freiduria-pollo-kentucky.webp"
                  alt="Fingers de pollo crujiente estilo Kentucky en un cuenco de cartón de AriMar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-5 py-4 text-sm text-white/75">
                Fingers de pollo estilo Kentucky · fotografía real de AriMar
              </figcaption>
            </figure>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
                Más allá de las croquetas
              </p>
              <h2 id="crujientes-title" className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Ese crujiente que no necesita presentación.
              </h2>
              <p className="mb-5 text-lg leading-relaxed text-white/85">
                También preparamos propuestas como nuestros fingers de pollo estilo Kentucky,
                torreznos y otras frituras según la producción de cada día.
              </p>
              <p className="mb-8 leading-relaxed text-white/70">
                Las imágenes muestran elaboraciones reales de nuestra cocina, no un inventario en tiempo real.
                Si has venido por algo concreto, comprueba primero qué tenemos disponible.
              </p>
              <Link href={siteConfig.pedirPath}
                className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white transition-colors hover:bg-primary-600">
                Consultar los platos de hoy <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="cocina-title">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Sin una carta aparte
              </p>
              <h2 id="cocina-title" className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Nuestra cocina es sin gluten. Y punto.
              </h2>
              <p className="mb-5 text-lg leading-relaxed text-slate-700">
                No tenemos una freidora para unos clientes y otra carta para los demás:
                AriMar es una casa de comidas y freiduría concebida al completo sin gluten.
                Cocinamos para todos desde la misma idea.
              </p>
              <p className="mb-6 leading-relaxed text-slate-600">
                Eso no significa que todos los platos sean adecuados para cualquier alergia:
                si necesitas información sobre leche, huevo, pescado u otros ingredientes,
                habla con nuestro equipo antes de realizar el pedido.
              </p>
              <Link href="/nuestra-cocina" className="inline-flex font-bold text-primary-700 underline-offset-4 hover:underline">
                Conoce cómo trabajamos en AriMar <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>
            <figure className="relative overflow-hidden rounded-[2rem] border border-primary-100 bg-white shadow-lg">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/arimar-20261023-vitrina-arimar.webp"
                  alt="Vitrina real de AriMar con platos caseros preparados para llevar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 53vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-5 py-4 text-sm font-medium text-slate-600">
                Así es nuestra vitrina en Playa de Arinaga.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-primary-50 py-16 md:py-20" aria-labelledby="pedido-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Ven a recoger tu comida
              </p>
              <h2 id="pedido-title" className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                De nuestra freiduría a tu mesa, sin complicaciones.
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Estamos en Avenida Polizón 67, Playa de Arinaga (Agüimes). No tenemos comedor:
                eliges lo que te apetece y te lo llevas.
              </p>
            </div>
            <div className="mb-9 grid gap-5 md:grid-cols-3">
              {[
                { step: '01', title: 'Mira qué hay hoy', text: 'La disponibilidad de croquetas y fritos cambia según la producción.' },
                { step: '02', title: 'Haz tu pedido', text: 'Puedes pedir online o consultarnos si buscas un sabor concreto.' },
                { step: '03', title: 'Pásate por AriMar', text: 'Recoge en nuestro local de Playa de Arinaga y disfruta donde quieras.' },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-primary-100 bg-white p-7">
                  <p className="mb-5 text-sm font-bold tracking-widest text-primary-700">{item.step}</p>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={siteConfig.pedirPath}
                className="inline-flex min-h-12 items-center rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">
                Ver disponibilidad y pedir <span className="ml-2" aria-hidden="true">→</span>
              </Link>
              <a
                href={getWhatsAppUrl('Hola, AriMar. ¿Qué croquetas y fritos tenéis disponibles? Quiero consultar antes de hacer mi pedido.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-xl border-2 border-primary-200 bg-white px-7 py-3 font-bold text-primary-800 hover:bg-primary-50">
                Preguntar por WhatsApp
              </a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-xl border-2 border-primary-200 bg-white px-7 py-3 font-bold text-primary-800 hover:bg-primary-50">
                Ver ubicación
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="freiduria-faq">
          <h2 id="freiduria-faq" className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
            Preguntas sobre nuestra freiduría
          </h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            <details className="group py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Las croquetas de AriMar son sin gluten?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                Sí. Todas nuestras croquetas se elaboran sin gluten. Si tienes otras alergias
                o intolerancias, consúltanos los ingredientes del sabor que te interese.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Siempre tenéis todos los sabores y fritos?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                No necesariamente. La producción varía y algunos sabores pueden agotarse.
                Lo mejor es consultar nuestra disponibilidad online antes de desplazarte.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Dónde puedo recoger el pedido?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                En AriMar, Avenida Polizón 67, Playa de Arinaga, Gran Canaria.
                Somos un establecimiento de comida para llevar, sin comedor.
              </p>
            </details>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SeoInternalLinks />
        </div>
      </main>
    </div>
  )
}
