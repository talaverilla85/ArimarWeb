import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

const pagePath = '/pollos-asados-arinaga'
const pageUrl = 'https://arimarfoodlab.es' + pagePath
const chickenImage = '/images/arimar-20261023-pollos-asados.webp'

export const metadata: Metadata = {
  title: 'Pollo asado en Arinaga con papas y jugo | 13 € – AriMar',
  description:
    'Pollo asado jugoso y dorado, con papas naturales en dados y su propio jugo por 13 €. Lo preparamos a diario. Pide para recoger en Playa de Arinaga.',
  alternates: { canonical: pagePath },
  openGraph: {
    title: 'Pollo asado con papas y su jugo · 13 € | AriMar',
    description:
      'Pollo asado a diario con papas naturales cortadas en dados y su propio jugo. Todo por 13 € para recoger en Playa de Arinaga.',
    type: 'website',
    locale: 'es_ES',
    url: pageUrl,
    images: [
      {
        url: chickenImage,
        alt: 'Pollos asados de AriMar durante su cocción en el horno',
      },
    ],
  },
}

const breadcrumbs = {
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
      name: 'Pollo asado en Arinaga',
      item: pageUrl,
    },
  ],
}

const orderButton =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2'

export default function PollosAsadosArinagaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <main className="overflow-hidden bg-white pb-20 text-slate-900">
        {/* Producto primero: el visitante ve el pollo, lo que incluye y el precio. */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f6faf9] via-white to-[#fff9f0] pt-28 pb-14 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="mb-8 text-xs font-medium text-slate-500 md:mb-12">
              <Link href="/" className="hover:text-primary-700">Inicio</Link>
              <span aria-hidden="true" className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Pollo asado</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
              <div className="max-w-xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.19em] text-primary-700 md:text-sm">
                  Pollo asado · Playa de Arinaga
                </p>
                <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.7rem]">
                  Pollo asado en Arinaga.
                  <span className="mt-2 block text-primary-700">
                    Con papas y su propio jugo.
                  </span>
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-700 md:text-xl">
                  Piel dorada, carne jugosa y papas naturales en dados, hechas en dos tiempos.
                  Lo acompañamos con el jugo del propio asado para aprovechar todo su sabor.
                </p>

                <div className="mt-8 flex items-end gap-4 border-t border-primary-200/80 pt-7">
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-6xl">
                    13 €
                  </span>
                  <span className="max-w-[200px] pb-1 text-sm leading-snug text-slate-600">
                    Pollo asado, papas naturales y su jugo. Todo incluido.
                  </span>
                </div>

                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Link href={siteConfig.pedirPath} className={orderButton}>
                    Ver disponibilidad y pedir
                    <span aria-hidden="true">→</span>
                  </Link>
                  <span className="text-sm font-medium text-slate-600">
                    A diario · Hasta agotar existencias
                  </span>
                </div>
                <p className="mt-6 text-sm text-slate-500">
                  Recogida en {siteConfig.address.street}, {siteConfig.address.locality}.
                </p>
              </div>

              <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={chickenImage}
                    alt="Pollos asados de AriMar dorándose en el horno durante su preparación"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-16 text-white sm:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-100">
                      De nuestro horno
                    </p>
                    <p className="mt-2 max-w-xs text-xl font-semibold leading-snug sm:text-2xl">
                      El dorado se ve. El sabor, se disfruta.
                    </p>
                    <p className="mt-2 text-xs text-white/80">Fotografía real de nuestra cocina</p>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* Relato gastronómico, sin tarjetas repetidas ni mensajes genéricos de la marca. */}
        <section className="py-20 md:py-28" aria-labelledby="punto-de-coccion">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                El pollo
              </p>
              <h2 id="punto-de-coccion" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Dorado por fuera.
                <span className="block text-primary-700">Jugoso por dentro.</span>
              </h2>
            </div>
            <div className="border-t-2 border-primary-500 pt-7">
              <p className="text-lg leading-relaxed text-slate-700">
                Un buen pollo asado no depende solo del color de la piel. Durante la cocción
                controlamos la temperatura interior con una sonda para comprobar su punto:
                buscamos una carne bien cocinada, que conserve su jugosidad, y un exterior
                apetecible y dorado.
              </p>
              <p className="mt-5 leading-relaxed text-slate-600">
                Lo sazonamos con una selección de especias que potencia el sabor natural del
                pollo sin taparlo. Utilizamos especias certificadas sin gluten, como parte
                de nuestra forma de trabajar.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f4ed] py-20 md:py-28" aria-labelledby="papas-naturales">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Las papas
              </p>
              <h2 id="papas-naturales" className="text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Naturales, cortadas cada día.
                <span className="block text-primary-700">Y hechas en dos tiempos.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-700">
                Las papas no son un añadido de última hora. Las cortamos en dados cada día
                y cuidamos las dos fases de cocción para conseguir el contraste que nos gusta.
              </p>
            </div>

            <div className="mt-12 grid gap-8 border-t border-[#d9cec0] pt-9 sm:grid-cols-2 sm:gap-14">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-700">
                  Primera cocción
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  Tiernas por dentro
                </h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  Primero buscamos que las papas se cocinen bien por dentro y queden suaves.
                </p>
              </div>
              <div className="border-t border-[#d9cec0] pt-7 sm:border-l sm:border-t-0 sm:pl-12 sm:pt-0">
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-700">
                  Segunda cocción
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  Doradas por fuera
                </h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  Después terminamos el dorado para lograr un exterior apetecible con ese
                  punto ligeramente crujiente.
                </p>
              </div>
            </div>
            <p className="mt-11 text-sm font-semibold text-primary-800">
              Siempre incluidas con el pollo asado de 13 €.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary-900 py-20 text-white md:py-28" aria-labelledby="jugo-asado">
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full border border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-8 top-8 h-60 w-60 rounded-full border border-white/10" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
                El jugo
              </p>
              <h2 id="jugo-asado" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Lo bueno del asado también está en su jugo.
              </h2>
            </div>
            <div className="border-t border-primary-300/50 pt-7">
              <p className="text-lg leading-relaxed text-white/85">
                Acompañamos el pollo y las papas con su propio jugo del asado, donde se
                concentra el sabor de la carne y nuestra selección de especias.
                Es parte de lo que hace que el conjunto tenga ese sabor que apetece repetir.
              </p>
              <p className="mt-7 text-sm font-semibold text-primary-100">
                Pollo, papas y jugo. No hace falta complicarlo más.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="donde-comprar-pollo">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1fr] md:gap-16 lg:px-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Para llevar en Arinaga
              </p>
              <h2 id="donde-comprar-pollo" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                ¿Dónde comprar pollo asado en Playa de Arinaga?
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Preparamos pollo asado todos los días en AriMar, en Avenida Polizón 67,
                Playa de Arinaga (Agüimes, Gran Canaria).
                Puedes acercarte al local o consultar las unidades disponibles y
                pedir online para recoger.
              </p>
              <p className="text-base text-slate-600">
                Atendemos de 11:30 a 16:00, salvo cambios puntuales de horario.
                El pollo está disponible hasta agotar existencias.
              </p>
              <div className="flex flex-wrap gap-5 pt-2 text-base font-semibold">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900"
                >
                  Cómo llegar <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/carta"
                  className="text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900"
                >
                  Ver la carta completa <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary-50 to-[#f6f1e9] px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="pedir-pollo">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Tu comida, lista para recoger
              </p>
              <h2 id="pedir-pollo" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Hoy apetece pollo asado.
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Pollo asado, papas naturales y su jugo. <strong>Todo por 13 €.</strong>
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Elaborado en una cocina 100 % sin gluten · Sujeto a disponibilidad diaria.
              </p>
            </div>
            <Link href={siteConfig.pedirPath} className={orderButton}>
              Consultar y pedir
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
