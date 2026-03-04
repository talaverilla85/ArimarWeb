'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AriMar',
  description: 'Comida para llevar en Playa de Arinaga, Gran Canaria',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida Polizón 67',
    addressLocality: 'Playa de Arinaga',
    addressRegion: 'Agüimes, Gran Canaria',
    addressCountry: 'ES',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-variedad-tuppers.webp"
            alt="Variedad de tuppers con comida"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            AriMar – Freiduría y comida casera para llevar en Playa de Arinaga
          </h1>
          <p className="text-sm md:text-base text-white/80 mb-4 tracking-wide uppercase">
            Playa de Arinaga · Comida para llevar
          </p>
          <p className="text-lg md:text-xl text-white/85 mb-6 max-w-2xl mx-auto leading-relaxed">
            Platos que aguantan para que lo disfrutes en casa, en la oficina o en la playa.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-10">
            {['Cocina diaria', 'Producción por lotes', 'Residuo 0'].map((item) => (
              <div
                key={item}
                className="px-4 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 text-sm md:text-base backdrop-blur-sm shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/proximamente"
            className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            Pedir ahora
          </Link>
        </motion.div>
      </section>

      {/* Banner informativo bajo el hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 bg-white/70 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pl-4 sm:pl-5 border-l-4 border-primary-400">
          <p className="text-sm md:text-base text-slate-700">
            <span className="font-semibold text-primary-600">
              Platos caseros diarios para llevar en Playa de Arinaga
            </span>
            <br />
            <span className="text-slate-600">
              Pollo asado · Guisos · Vegetales · Postres · Opciones sin gluten
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
        </div>
      </section>

      {/* Bloque "Cómo cocinamos" */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
                Cómo cocinamos
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-6">
                Hecho en Playa de Arinaga, para llevarte el sabor de casa donde quieras.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {[
                  {
                    title: 'Producción por lotes',
                    text: 'Cocinamos en tandas para que siempre tengas platos listos, ricos y sin prisas.',
                  },
                  {
                    title: 'Raciones claras',
                    text: 'Porciones equilibradas y etiquetadas. Para comer bien y no desperdiciar.',
                  },
                  {
                    title: 'Cocina profesional, trato cercano',
                    text: 'Equipo pro para clavar el punto… y sabor de los que apetece repetir.',
                  },
                  {
                    title: 'Misma calidad cada día',
                    text: 'Si vienes hoy o mañana, quieres lo mismo: que esté igual de bueno.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm flex flex-col gap-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
                      •
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100"
            >
              <Image
                src="/images/cocina-lote-linea.webp"
                alt="Cocina con producción por lotes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloque "Envases y presentación" */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 order-2 lg:order-1"
            >
              <Image
                src="/images/packaging-tupper.webp"
                alt="Envases y packaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
                Así te lo llevas
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Envases compostables.</strong> Ligeros y limpios, pensados para el día a día.
                </p>
                <p>
                  <strong className="text-slate-800">Etiquetado claro.</strong> Fecha, ingredientes y alérgenos. Fácil y transparente.
                </p>
                <p>
                  <strong className="text-slate-800">Listo para Arinaga.</strong> Aguanta el trayecto y llega perfecto a casa o la playa.
                </p>  
              </div>
            </motion.div>
          </div>
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
