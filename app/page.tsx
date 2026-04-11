import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import { faqCanonicalPath, homeFaqTeasers } from '@/lib/faqContent'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Qué es AriMar */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="mas-facil-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="mas-facil-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Qué es AriMar
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-5 text-center">
            AriMar es una freiduría moderna de comida casera para llevar en Playa de Arinaga que nace para dar respuesta a los ritmos de vida actuales y a la creciente demanda de una comida casera, equilibrada y fácil de recoger, pensada para quienes quieren comer bien sin tener que dedicar cada día tiempo a cocinar.
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
            Queremos que ese tiempo pueda invertirse en lo que de verdad importa: la familia, la crianza, el deporte, el descanso, el ocio o, simplemente, llegar a casa con la tranquilidad de tener la comida resuelta, sin renunciar a la calidad.
          </p>
        </div>
      </section>

      {/* Qué encontrarás en AriMar */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            Qué encontrarás en AriMar
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-6">
            Una selección de comida casera para llevar pensada para el día a día.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {['Platos del día', 'Pollo asado', 'Potajes', 'Cremas', 'Arroces y pastas', 'Guisos y fritos', 'Postres caseros'].map(
              (item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-primary-100/70 bg-primary-50/60 text-sm md:text-base text-primary-800/90 shadow-sm hover:bg-primary-50/80 transition-colors"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            En AriMar encontrarás una selección de comida casera para llevar pensada para el día a día: platos del día, pollo asado, potajes, cremas, arroces, pastas, guisos, fritos y postres caseros. Una propuesta variada y cercana, propia de una freiduría moderna, donde la cocina de siempre se adapta a una forma de comer más cómoda, práctica y actual.
          </p>
        </div>
      </section>

      {/* Otro concepto de freiduría */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Otro concepto de freiduría
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-10">
            Apostamos por una forma más clara, organizada y actual de llevarte comida casera de calidad: recogida fácil, información transparente y una cocina pensada para acompañarte en el día a día.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Recogida fácil</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vienes, ves la vitrina del día y eliges lo que te apetece. También puedes hacer tu pedido y pasar a recogerlo a la hora que mejor te encaje.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Información clara</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Etiquetas con ingredientes y alérgenos para que sepas siempre qué estás comiendo y puedas elegir con tranquilidad.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Cocina para tu día a día</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Platos pensados para encajar en tu rutina: comida casera que puedes llevarte a casa, al trabajo o cerca del mar, sin renunciar al sabor ni a la calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación y entorno */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="ubicacion-entorno-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="ubicacion-entorno-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
            Dónde está AriMar
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
            AriMar está en el corazón de Playa de Arinaga, en una calle peatonal con vida propia y escenario habitual de eventos y ferias durante el año. Estamos a un paso de la playa, en un entorno perfecto para llevarte tu comida y disfrutarla con calma, y muy cerca del colegio y del centro de salud, en una ubicación cómoda para el día a día.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
          >
            Ver ubicación y horario
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Cómo encaja en tu día */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="encaja-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="encaja-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
            Cómo encaja en tu día
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            AriMar está pensada para quienes viven, trabajan o pasan por Arinaga y quieren resolver la comida de forma sencilla, sin renunciar al sabor ni a la calidad. Puedes disfrutarla en casa, en la oficina o cerca del mar, según lo que te pida el día.
          </p>
        </div>
      </section>

      {/* FAQ: resumen en home; listado completo en /preguntas-frecuentes */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="faq-home-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-home-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="text-slate-600 text-sm md:text-base mb-8">
            Estas son algunas de las más habituales. La lista completa está en nuestra página de ayuda.
          </p>
          <ul className="space-y-6 list-none pl-0">
            {homeFaqTeasers.map((item) => (
              <li key={item.question} className="border-b border-slate-200 pb-6 last:border-0">
                <h3 className="text-base font-semibold text-slate-800 mb-2">{item.question}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link
              href={faqCanonicalPath}
              className="inline-flex items-center justify-center px-6 py-3 text-primary-700 font-semibold rounded-lg border-2 border-primary-200 hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Ver todas las preguntas frecuentes
            </Link>
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              ¿Te apetece probar AriMar?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Ven a vernos a Playa de Arinaga, descubre nuestra carta de comida casera para llevar y decide si prefieres pedir por adelantado o elegir en la vitrina del día.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/proximamente"
                className="inline-block px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Pedir
              </Link>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/carta"
                  className="inline-block px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Ver carta
                </Link>
                <Link
                  href="/contacto"
                  className="inline-block px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Ver ubicación
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
