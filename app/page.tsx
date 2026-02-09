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
    addressLocality: 'Playa de Arinaga',
    addressRegion: 'Gran Canaria',
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
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Comida para llevar, hecha con cabeza.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Cocina diaria · Producción por lotes · Residuo 0
          </p>
          <Link
            href="/pedir"
            className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            Pedir ahora
          </Link>
        </motion.div>
      </section>

      {/* Bloque "Hoy en cocina" */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16">
            Hoy en cocina
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: '/images/carta-crema.webp', alt: 'Crema' },
              { src: '/images/carta-potaje.webp', alt: 'Potaje' },
              { src: '/images/carta-pasta.webp', alt: 'Pasta' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm text-slate-600 text-center">
                  Producción diaria · Rotación constante
                </p>
              </motion.div>
            ))}
          </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Cómo cocinamos
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Producción por lotes.</strong> Cocina central que optimiza recursos y garantiza frescura.
                </p>
                <p>
                  <strong className="text-slate-800">Control de raciones y caducidades.</strong> Cada lote se etiqueta, se controla y se gestiona para evitar desperdicio.
                </p>
                <p>
                  <strong className="text-slate-800">Tecnología Rational.</strong> Equipamiento profesional que cocina con precisión y conserva nutrientes.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100"
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

      {/* Bloque "Cocinar sin desperdiciar" */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
            Cocinar sin desperdiciar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { src: '/images/residuo0-caducidad.webp', alt: 'Control de caducidades' },
              { src: '/images/residuo0-aprovechamiento.webp', alt: 'Aprovechamiento de alimentos' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Aquí no se tira comida:<br />
              lo que tiene vida corta baja de precio,<br />
              lo que no se vende se planifica mejor.
            </p>
          </motion.div>
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
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 order-2 lg:order-1"
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Envases y presentación
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Envases compostables.</strong> Materiales que vuelven a la tierra.
                </p>
                <p>
                  <strong className="text-slate-800">Etiquetado claro.</strong> Fecha, contenido, alérgenos. Sin sorpresas.
                </p>
                <p>
                  <strong className="text-slate-800">Listo para llevar.</strong> Empaquetado que aguanta el trayecto.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
