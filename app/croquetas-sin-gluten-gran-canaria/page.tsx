import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Croquetas sin gluten en Gran Canaria | AriMar FoodLab',
  description:
    'Croquetas caseras sin gluten: jamón serrano, queso de cabra y cebolla, atún y piquillo o pollo asado. Ración de 9 unidades por 7 €. Recogida en Playa de Arinaga.',
  alternates: { canonical: '/croquetas-sin-gluten-gran-canaria' },
  openGraph: {
    title: 'Croquetas caseras sin gluten | AriMar, Gran Canaria',
    description:
      'Cuatro sabores de croquetas, 9 unidades por 7 € y recogida en AriMar, Playa de Arinaga. Toda nuestra cocina es 100 % sin gluten.',
    url: 'https://arimarfoodlab.es/croquetas-sin-gluten-gran-canaria',
    type: 'website',
    images: [
      {
        url: '/images/arimar-freiduria-pizarra.webp',
        width: 1024,
        height: 1536,
        alt: 'La pizarra real de AriMar con los sabores de nuestras croquetas',
      },
    ],
  },
}

const sabores = [
  {
    number: '01',
    title: 'Jamón serrano',
    description: 'Incorporamos virutas de jamón serrano a una masa suave elaborada con leche sin lactosa y harina de maíz. La sal y un toque de nuez moscada redondean ese sabor clásico de las croquetas de siempre.',
    allergenNote: 'Leche',
  },
  {
    number: '02',
    title: 'Queso de cabra y cebolla caramelizada',
    description: 'El queso semicurado de Agüimes pone el carácter y la cebolla caramelizada aporta el contrapunto dulce. Los unimos en una masa de leche sin lactosa y harina de maíz, con la sal justa para que destaque el sabor del queso.',
    allergenNote: 'Leche',
  },
  {
    number: '03',
    title: 'Atún y pimiento del piquillo',
    description: 'El atún en aceite y el pimiento del piquillo se encuentran en una masa preparada con leche sin lactosa y harina de maíz. La sal equilibra una combinación con sabor marinero y el toque delicado del pimiento.',
    allergenNote: 'Leche y Pescado',
  },
  {
    number: '04',
    title: 'Pollo asado',
    description: 'Desmigamos nuestro pollo asado y lo incorporamos a una masa de leche sin lactosa y harina de maíz. El fondo de pollo potencia el sabor del asado y la sal termina de redondear una croqueta que sabe a cocina de casa.',
    allergenNote: 'Leche',
  },
]

export default function CroquetasSinGlutenGranCanariaPage() {
  return (
    <div className="overflow-hidden bg-white pb-20">
      <header className="bg-gradient-to-br from-amber-50 via-white to-primary-50 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="mb-12 text-sm text-slate-600">
            <Link href="/" className="hover:text-primary-700 hover:underline">AriMar</Link>
            <span className="mx-2 text-slate-400" aria-hidden="true">/</span>
            <Link href="/freiduria-sin-gluten-gran-canaria" className="hover:text-primary-700 hover:underline">Freiduría</Link>
            <span className="mx-2 text-slate-400" aria-hidden="true">/</span>
            <span className="font-medium text-slate-900">Croquetas</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                De la freiduría de AriMar · Playa de Arinaga
              </p>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem]">
                Croquetas caseras sin gluten.
                <span className="mt-2 block text-primary-700">Las de siempre, para todos.</span>
              </h1>
              <p className="mb-5 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
                De jamón serrano, de pollo asado, de atún y pimiento del piquillo o de queso de cabra
                con cebolla caramelizada. Cuatro maneras de disfrutar un clásico,
                elaborado en nuestra cocina 100 % sin gluten.
              </p>
              <p className="mb-8 max-w-2xl leading-relaxed text-slate-600">
                Estamos en Playa de Arinaga, Agüimes, Gran Canaria. Puedes consultar
                qué sabores tenemos disponibles y organizar la recogida antes de venir.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={siteConfig.pedirPath}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-500 px-7 py-3 font-bold text-white transition-colors hover:bg-primary-600">
                  Ver qué hay hoy y pedir <span className="ml-2" aria-hidden="true">→</span>
                </Link>
                <Link href="#sabores"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-primary-200 bg-white px-7 py-3 font-bold text-primary-800 hover:bg-primary-50">
                  Descubrir sabores
                </Link>
              </div>
            </div>

            <aside className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white px-7 py-9 shadow-lg sm:px-10">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Un pequeño placer para compartir... o no
              </p>
              <p className="text-[5.5rem] font-black leading-none tracking-tight text-primary-700 sm:text-[7rem]">9</p>
              <p className="mb-7 text-2xl font-bold text-slate-900">croquetas por ración</p>
              <div className="mb-6 h-px bg-primary-100" aria-hidden="true" />
              <div className="flex items-end justify-between gap-4">
                <span className="text-lg font-semibold text-slate-700">Precio de la ración</span>
                <strong className="text-4xl font-extrabold tracking-tight text-slate-900">7 €</strong>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-500">
                La disponibilidad de sabores depende de la producción del día.
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section id="sabores" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="sabores-title">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Nuestros sabores</p>
          <h2 id="sabores-title" className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Cuatro sabores. Difícil quedarse con uno.
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Estos son los cuatro sabores que elaboramos en AriMar. No todos tienen por qué
            estar disponibles cada día: consulta la oferta antes de hacer tu pedido.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sabores.map((sabor) => (
            <article key={sabor.number}
              className="rounded-[1.75rem] border border-primary-100 bg-gradient-to-br from-white to-primary-50/40 p-7 transition-shadow hover:shadow-md sm:p-9">
              <p className="mb-8 text-sm font-extrabold tracking-[0.18em] text-primary-700">{sabor.number} / 04</p>
              <h3 className="mb-3 text-2xl font-bold leading-tight text-slate-900">{sabor.title}</h3>
              <p className="leading-relaxed text-slate-600">{sabor.description}</p>
              <div className="mt-6 border-t border-primary-100 pt-4">
                <p className="text-sm leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900">Alérgenos identificados en los ingredientes descritos: </span>
                  {sabor.allergenNote}.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Información parcial; falta validar empanado, ingredientes secundarios y declaración completa.
                  Consúltanos antes de pedir si tienes una alergia.
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">
          Estas descripciones explican cómo elaboramos cada sabor, pero no constituyen una lista
          exhaustiva de ingredientes ni una declaración definitiva de alérgenos.
          Hasta validar las fichas completas de ARIST, consúltanos si tienes alguna alergia.
        </p>
      </section>

      <section className="bg-slate-900 py-16 text-white md:py-20" aria-labelledby="ingredientes-title">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">
              Sabor e información clara
            </p>
            <h2 id="ingredientes-title" className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
              ¿Quieres saber qué lleva cada croqueta?
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-white/85">
              Todas nuestras croquetas se elaboran en la cocina 100 % sin gluten de AriMar.
              Cada sabor lleva ingredientes diferentes y puede contener otros alérgenos.
            </p>
            <p className="mb-7 leading-relaxed text-white/70">
              Si necesitas conocer la composición completa de una variedad,
              consúltanos directamente antes de realizar el pedido.
              Preferimos comprobar contigo la información del sabor concreto.
            </p>
            <a
              href={getWhatsAppUrl('Hola, AriMar. Quiero consultar los ingredientes y alérgenos de vuestras croquetas antes de pedir.')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">
              Consultar ingredientes por WhatsApp <span className="ml-2" aria-hidden="true">→</span>
            </a>
          </div>
          <figure className="overflow-hidden rounded-[2rem] bg-white/10 shadow-xl">
            <div className="relative mx-auto aspect-[4/5] max-w-md">
              <Image
                src="/images/arimar-freiduria-pizarra.webp"
                alt="La pizarra auténtica de AriMar que anuncia nuestros fritos y los sabores de croquetas"
                fill
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-5 py-4 text-sm text-white/75">
              Nuestra pizarra de fritos, fotografiada en el local de AriMar.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="recogida-title">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              Del obrador a casa
            </p>
            <h2 id="recogida-title" className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Te las preparamos para llevar.
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              AriMar es una casa de comidas para llevar, sin comedor.
              Puedes pasar por la vitrina o pedir online y recoger tu comida
              en Avenida Polizón 67, Playa de Arinaga.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={siteConfig.pedirPath}
                className="inline-flex rounded-xl bg-primary-500 px-6 py-3 font-bold text-white hover:bg-primary-600">
                Ver disponibilidad y pedir
              </Link>
              <Link href="/contacto"
                className="inline-flex rounded-xl border-2 border-primary-200 px-6 py-3 font-bold text-primary-700 hover:bg-primary-50">
                Dónde estamos
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:items-stretch">
            {[
              { number: '01', title: 'Escoge', text: 'Conoce los sabores y consulta cuáles tenemos hoy.' },
              { number: '02', title: 'Pide', text: 'Haz el pedido online o pregúntanos por WhatsApp.' },
              { number: '03', title: 'Recoge', text: 'Pasa por AriMar en Playa de Arinaga.' },
            ].map((item) => (
              <div key={item.number} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="mb-6 text-sm font-bold tracking-[0.18em] text-primary-700">{item.number}</p>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-16" aria-labelledby="croquetas-faq-title">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="croquetas-faq-title" className="mb-7 text-3xl font-bold tracking-tight text-slate-900">
            Algunas preguntas antes de pedir
          </h2>
          <div className="divide-y divide-primary-100 border-y border-primary-100">
            <details className="py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Cuántas croquetas vienen en una ración?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">9 unidades por 7 €.</p>
            </details>
            <details className="py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Son todas las croquetas sin gluten?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                Sí. Toda nuestra cocina, incluida la freiduría, es 100 % sin gluten.
                Si tienes otras alergias, consúltanos los ingredientes del sabor elegido.
              </p>
            </details>
            <details className="py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Tenéis siempre los cuatro sabores?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                No necesariamente. La disponibilidad cambia según la producción del día
                y algunos sabores pueden agotarse.
              </p>
            </details>
            <details className="py-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                ¿Dónde puedo recogerlas?
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                En Avenida Polizón 67, Playa de Arinaga (Agüimes, Gran Canaria).
                Somos un establecimiento de comida para llevar, sin comedor.
              </p>
            </details>
          </div>
          <p className="mt-8 leading-relaxed text-slate-600">
            ¿Quieres ver qué más hacemos? Conoce nuestra{' '}
            <Link href="/freiduria-sin-gluten-gran-canaria"
              className="font-bold text-primary-700 underline underline-offset-2">
              freiduría sin gluten
            </Link>{' '}
            o explora toda la{' '}
            <Link href="/carta" className="font-bold text-primary-700 underline underline-offset-2">
              carta de AriMar
            </Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
