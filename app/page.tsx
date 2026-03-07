import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/home/HeroSection'
import CocinamosBlock from '@/components/home/CocinamosBlock'
import EnvasesBlock from '@/components/home/EnvasesBlock'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Banner informativo bajo el hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 bg-white/70 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pl-4 sm:pl-5 border-l-4 border-primary-400">
          <p className="text-sm md:text-base text-slate-700">
            <span className="font-semibold text-primary-600">
              Platos caseros diarios para llevar en Playa de Arinaga
            </span>
            <br />
            <span className="text-slate-600">
              Pollo asado · Cremas y potajes · Pastas y arroces · Guisos de carne o pescado · Opciones vegetarianas · Postres caseros · Sin gluten disponible
            </span>
            <br />
            <span className="font-medium text-slate-800">
              Muy pronto en Avenida Polizón 67
            </span>
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Ver ubicación
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Más fácil para ti, mejor organizado para nosotros */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="mas-facil-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="mas-facil-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight text-center">
            Más fácil para ti, mejor organizado para nosotros
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-5 text-center">
            AriMar nace con una idea sencilla: que puedas comer casero sin perder tiempo. Puedes pedir desde la web, elegir tu hora de recogida y venir directamente cuando te toque. Así organizamos mejor la cocina, reducimos esperas y conseguimos que todo fluya con más orden.
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
            Trabajamos con una carta cuidada de platos, combinando opciones fijas con otras que van rotando según el día. Así mantenemos variedad, agilidad en el servicio y una oferta pensada para el ritmo real de Playa de Arinaga.
          </p>

          {/* Subsección: Cómo funciona (bifurcación elegante) */}
          <div className="mt-16 md:mt-20 pt-12 border-t border-slate-200/80">
            <p id="como-funciona-label" className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center mb-10">
              Cómo funciona
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0 max-w-4xl mx-auto">
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Si vienes al local</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Ves la vitrina del día, eliges lo que te apetece y te lo llevas.
                </p>
              </div>

              <div className="hidden lg:flex flex-shrink-0 flex-1 max-w-[4rem] flex-row items-center justify-center px-1" aria-hidden>
                <span className="h-px flex-1 bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 flex-shrink-0" />
                <span className="h-px flex-1 bg-slate-300" />
              </div>
              <div className="lg:hidden flex flex-col items-center py-3" aria-hidden>
                <span className="w-px h-6 bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 my-2" />
                <span className="w-px h-6 bg-slate-200" />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Si prefieres pedir desde la web</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Eliges la comida con calma, seleccionas tu hora de recogida y pasas por el local cuando te venga mejor.
                </p>
              </div>
            </div>

            <p className="mt-12 text-center text-lg md:text-xl font-semibold text-slate-800 tracking-tight text-balance">
              Menos tiempo esperando. Más tiempo para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque "Hoy en cocina" / Lo que solemos cocinar */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            Lo que solemos cocinar
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-6">
            Rotación diaria según temporada y producción.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {['Potajes', 'Cremas', 'Pastas', 'Arroces', 'Guisos', 'Vegetales', 'Postres'].map(
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
            Cada día cocinamos una selección distinta según temporada y producción. Lo justo para que todo se mueva, todo esté en buen punto y siempre encuentres opciones para el día a día.
          </p>
        </div>
      </section>

      {/* Hecho para el ritmo de aquí */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="ritmo-heading">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="ritmo-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
            Hecho para el ritmo de aquí
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Estamos en Playa de Arinaga, en Agüimes, Gran Canaria. AriMar nace para el ritmo de aquí: salir del trabajo, venir de la playa o simplemente no cocinar y llevarte comida hecha con cabeza.
          </p>
        </div>
      </section>

      <CocinamosBlock />
      <EnvasesBlock />

      {/* FAQ Home */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="faq-home-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-home-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 tracking-tight">
            Preguntas frecuentes
          </h2>
          <ul className="space-y-6 list-none pl-0">
            <li className="border-b border-slate-200 pb-6">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿La carta cambia cada día?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Sí. Rotamos la oferta según temporada y producción: potajes, cremas, pastas, arroces, guisos, vegetales y postres. Siempre una selección corta y del día.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Incluís alérgenos en la etiqueta?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Sí. Etiquetamos fecha, ingredientes y alérgenos en cada envase para que sea fácil y transparente.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Dónde estáis?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                En Playa de Arinaga, Agüimes (Gran Canaria). Avenida Polizón 67. Horario y mapa en la <Link href="/contacto" className="text-primary-600 font-medium underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded">página de contacto</Link>.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Sois una freiduría?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                No somos una freiduría tradicional; somos otro concepto de freiduría en Arinaga, con cocina casera para llevar, rotación diaria y una selección corta que se mueve cada día.
              </p>
            </li>
            <li className="pb-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Se puede reservar para una hora concreta?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                No hace falta reservar: vienes, ves la vitrina y te llevas lo que quieras. Si necesitas cantidad grande o un encargo especial, contáctanos por <Link href="/contacto" className="text-primary-600 font-medium underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded">WhatsApp</Link>.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Callout de ubicación */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="rounded-2xl border border-slate-300 bg-white/70 px-6 py-8 md:px-8 md:py-10 shadow-md text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 tracking-tight">
                📍 Estamos en Playa de Arinaga
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4">
                Ven a vernos y llévate comida lista sin complicarte.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
              >
                Ver ubicación
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
              <Image
                src="/images/Ari.png"
                alt="Ari, la mascota de AriMar"
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA final: pedidos online */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-10 md:px-10 text-center shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Pedidos online muy pronto
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Estamos ultimando la tienda online. Mientras tanto, puedes seguirnos y
              ver qué cocinamos cada día en Playa de Arinaga.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/proximamente"
                className="inline-block px-8 py-3 bg-primary-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Pedir (muy pronto)
              </Link>
              <Link
                href="https://www.instagram.com/arimarfoodlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Síguenos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
