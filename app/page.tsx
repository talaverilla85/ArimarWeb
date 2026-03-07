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
            Cada día cocinamos una selección corta de platos caseros que va cambiando:
            algo de cuchara, algo vegetal, algo de carne o pescado y un par de cosas dulces.
            Lo justo para que todo se mueva y nada se quede.
          </p>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl mx-auto mt-6">
            AriMar es otro concepto de freiduría en Arinaga: cocina casera para llevar, con
            rotación diaria y una selección corta que se mueve cada día.
          </p>
        </div>
      </section>

      <CocinamosBlock />
      <EnvasesBlock />

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
                href="/proximamente"
                className="inline-block px-8 py-3 border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
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
