'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cartaFaqTeasers, faqCanonicalPath } from '@/lib/faqContent'
import SeoInternalLinks from '@/components/SeoInternalLinks'
import { featuredDishes } from '@/lib/featuredDishes'
import { siteConfig } from '@/lib/siteConfig'

const hotDishes = featuredDishes.filter((dish) => ['pollo-agridulce', 'ropa-vieja', 'pollo-asado'].includes(dish.id))
const lighterDishes = featuredDishes.filter((dish) => ['ensalada-mixta-aguacate', 'poke-pollo', 'vinagreta-marisco'].includes(dish.id))

function DishTiles({ dishes }: { dishes: typeof featuredDishes }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <article key={dish.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image src={dish.image} alt={dish.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
          </div>
          <div className="p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-700">{dish.category}</p>
            <h3 className="text-xl font-bold text-slate-900">{dish.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{dish.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function CartaClient() {
  return (
    <>
      <div className="pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-14 grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-50 via-white to-amber-50 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">La cocina de AriMar · Playa de Arinaga</p>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Nuestra carta. Comida casera para todos.</h1>
              <p className="mb-5 text-lg leading-relaxed text-slate-700">
                Ropa vieja, pollo agridulce, croquetas, tortillas, ensaladas, guisos y asados.
                Toda nuestra cocina es <strong>100 % sin gluten</strong> y está pensada para llevar.
              </p>
              <p className="mb-8 leading-relaxed text-slate-600">
                Tenemos elaboraciones habituales y otras que cambian con la producción. Las fotos muestran platos reales de AriMar,
                no un listado de existencias en tiempo real.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={siteConfig.pedirPath} className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">
                  Ver qué hay hoy y pedir <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <Link href="/contacto" className="inline-flex rounded-xl border border-primary-200 bg-white px-7 py-3 font-bold text-primary-700 hover:bg-primary-50">
                  Visítanos
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-white shadow-md">
              <Image src="/images/arimar-20261023-ensalada-fresca-aguacate.webp"
                alt="Ensalada mixta con aguacate, atun, huevo y verduras en cuenco kraft de AriMar"
                fill priority sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover" />
              <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                Así se ve la comida de AriMar
              </div>
            </div>
          </header>

          <section className="mb-16 scroll-mt-24" id="platos-caseros" aria-labelledby="platos-caseros-title">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">De nuestra cocina</p>
              <h2 id="platos-caseros-title" className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Platos de los que te resuelven la comida
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Guisos, carnes y raciones con sabor casero. Además de estas elaboraciones, preparamos
                tortilla de papas, carne fiesta, estofados y otros platos según la producción.
              </p>
            </div>
            <DishTiles dishes={hotDishes} />
            <div className="mt-7 flex flex-wrap gap-3">
              {['Tortilla de papas', 'Carne fiesta', 'Estofado de ternera', 'Garbanzada', 'Arroces'].map((name) => (
                <span key={name} className="rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800">
                  {name}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-16 overflow-hidden rounded-[2rem] bg-amber-50 px-6 py-10 sm:px-10" aria-labelledby="freiduria-carta-title">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">El placer de la freiduría</p>
                <h2 id="freiduria-carta-title" className="mb-5 text-3xl font-bold text-slate-900 md:text-4xl">
                  Croquetas sin gluten, pero con todo el sabor.
                </h2>
                <p className="mb-5 text-lg leading-relaxed text-slate-700">
                  Una freiduría dentro de una cocina concebida completamente sin gluten.
                  Entre nuestras elaboraciones están las croquetas caseras, los torreznos y las frituras del día.
                </p>
                <Link href="/freiduria-sin-gluten-gran-canaria"
                  className="inline-flex font-bold text-primary-700 underline-offset-4 hover:underline">
                  Descubre nuestra freiduría <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </div>
              <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="mb-5 text-xl font-bold text-slate-900">Sabores de croquetas AriMar</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {['Jamón serrano', 'Rulo de cabra y cebolla caramelizada', 'Atún y pimiento asado', 'Pollo asado'].map((name) => (
                    <li key={name} className="flex items-start gap-3 border-b border-slate-100 pb-3 text-slate-700">
                      <span className="mt-1 text-primary-700" aria-hidden="true">●</span>{name}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-slate-500">Pregunta por los sabores disponibles en cada momento.</p>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="ensaladas-y-ligeros" aria-labelledby="frescos-carta-title">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Fresco, ligero, diferente</p>
              <h2 id="frescos-carta-title" className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Ensaladas, platos fríos y propuestas frescas
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                También tenemos opciones frescas y elaboraciones más ligeras. En nuestra carta habitual
                encontrarás ensaladas, ensaladilla, cremas y otros platos que varían según el día.
              </p>
            </div>
            <DishTiles dishes={lighterDishes} />
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              Otras propuestas de nuestra cocina: ensalada César, ensalada mixta con aguacate, ensaladilla y papas arrugadas.
              Consulta la disponibilidad actual antes de hacer tu pedido.
            </p>
          </section>

          <section className="mb-16 grid items-center gap-8 overflow-hidden rounded-[2rem] bg-slate-900 text-white lg:grid-cols-2" aria-labelledby="asados-carta-title">
            <div className="relative aspect-[4/3] min-h-[290px] w-full lg:aspect-auto lg:h-full">
              <Image src="/images/arimar-20261023-pata-horno.webp"
                alt="Pata asada canaria de AriMar en el horno durante su preparacion"
                fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="px-7 pb-9 sm:px-10 lg:py-12 lg:pr-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">Encargos y ocasiones especiales</p>
              <h2 id="asados-carta-title" className="mb-4 text-3xl font-bold md:text-4xl">Asados que merecen compartir mesa.</h2>
              <p className="mb-6 text-lg leading-relaxed text-white/80">
                Además del pollo asado, preparamos elaboraciones por encargo, como nuestra pata asada canaria.
                Pide información y organiza la recogida en Playa de Arinaga.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pata-asada-gran-canaria" className="inline-flex rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600">Pata asada por encargo</Link>
                <Link href="/pollos-asados-arinaga" className="inline-flex rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">Pollos asados</Link>
              </div>
            </div>
          </section>

          <section className="mb-16 rounded-3xl border border-primary-100 bg-primary-50 px-6 py-8 text-center sm:px-10" aria-labelledby="disponibilidad-title">
            <h2 id="disponibilidad-title" className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
              ¿Qué hay disponible hoy?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-slate-600">
              Nuestra vitrina cambia. Consulta qué platos y raciones puedes pedir ahora y elige tu hora de recogida.
              Si necesitas información sobre ingredientes o alérgenos de algún plato, habla con nuestro equipo antes de pedir.
            </p>
            <Link href={siteConfig.pedirPath} className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">
              Ver disponibilidad y pedir <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </section>

          <section className="mx-auto mb-12 max-w-3xl" aria-labelledby="faq-carta-title">
            <h2 id="faq-carta-title" className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">Dudas sobre nuestra carta</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {cartaFaqTeasers.map((item) => (
                <div key={item.question} className="py-5">
                  <h3 className="mb-2 font-bold text-slate-900">{item.question}</h3>
                  <p className="leading-relaxed text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
            <Link href={faqCanonicalPath} className="mt-6 inline-flex font-semibold text-primary-700 underline-offset-4 hover:underline">
              Todas las preguntas frecuentes <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </section>

          <SeoInternalLinks className="mx-auto max-w-3xl" />
        </div>
      </div>
    </>
  )
}
