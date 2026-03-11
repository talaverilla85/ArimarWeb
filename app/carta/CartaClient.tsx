'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const categoriesSeo = [
  'Platos del día',
  'Pollo asado',
  'Potajes',
  'Cremas',
  'Arroces y pastas',
  'Guisos y fritos',
  'Postres caseros',
]

const antojoButtons = [
  { id: 'prisa' as const, label: 'Vengo con prisa' },
  { id: 'cuchara' as const, label: 'Me apetece cuchara' },
  { id: 'ligero' as const, label: 'Quiero algo ligero' },
  { id: 'capricho' as const, label: 'Hoy toca capricho' },
]

const antojoToCategories: Record<string, string[]> = {
  prisa: ['Platos del día', 'Arroces y pastas', 'Guisos y fritos'],
  cuchara: ['Potajes', 'Cremas'],
  ligero: ['Cremas', 'Platos del día'],
  capricho: ['Postres caseros', 'Pollo asado'],
}

const cartaItems = [
  {
    src: '/images/carta-crema.webp',
    alt: 'Cremas y sopas del día en AriMar FoodLab, comida para llevar en Playa de Arinaga',
    title: 'Cremas y sopas',
    description: 'De cuchara, suaves y caseras, según el día.',
  },
  {
    src: '/images/carta-potaje.webp',
    alt: 'Potaje tradicional, comida casera para llevar en Agüimes',
    title: 'Potajes',
    description: 'Legumbres y verduras de temporada, como en casa.',
  },
  {
    src: '/images/carta-pasta.webp',
    alt: 'Arroces y pastas caseros para llevar, AriMar FoodLab Playa de Arinaga',
    title: 'Arroces y pastas',
    description: 'Platos de arroz y pasta listos para llevar.',
  },
  {
    src: '/images/carta-carne-estofada.webp',
    alt: 'Guisos y fritos caseros para llevar en Playa de Arinaga',
    title: 'Guisos y fritos',
    description: 'Carnes guisadas y frituras hechas al momento.',
  },
  {
    src: '/images/carta-vegetal.webp',
    alt: 'Pollo asado y acompañamientos para llevar en AriMar FoodLab',
    title: 'Pollo asado',
    description: 'Pollo asado y combinaciones pensadas para compartir.',
  },
  {
    src: '/images/carta-postre-vaso.webp',
    alt: 'Postres caseros en vaso, AriMar FoodLab',
    title: 'Postres caseros',
    description: 'Dulces caseros para cerrar la comida.',
  },
]

const faqs = [
  { q: '¿Dónde está AriMar?', a: 'Estamos en Playa de Arinaga, Agüimes (Gran Canaria). Dirección: Avenida Polizón 67. Puedes ver el horario y la ubicación en nuestra página de contacto.' },
  { q: '¿La carta es fija o cambia?', a: 'La carta cambia cada día según temporada y producción. Solemos tener de cuchara (potajes, cremas), pastas, arroces, guisos, platos vegetales y postres.' },
  { q: '¿Puedo pedir para llevar?', a: 'Sí. Todo nuestro menú es comida para llevar. Abrimos todos los días de 11:30 a 16:00. Para horario completo y cómo llegar: Horario y ubicación.' },
  { q: '¿Qué tipo de comida puedo encontrar en AriMar?', a: 'Comida casera para llevar: potajes, cremas, pastas, arroces, guisos, vegetales y postres. Elaborada con productos de calidad en Playa de Arinaga.' },
  {
    q: '¿Sois una freiduría?',
    a: 'Sí. AriMar es una freiduría moderna de comida casera para llevar en Playa de Arinaga. Aquí encontrarás platos del día, pollo asado, potajes, cremas, arroces, guisos, fritos y postres caseros, en una propuesta pensada para el día a día y para recoger con facilidad.',
  },
]

export default function CartaClient() {
  const [selectedAntojo, setSelectedAntojo] = useState<'prisa' | 'cuchara' | 'ligero' | 'capricho' | null>(null)
  const highlightedCats = selectedAntojo ? antojoToCategories[selectedAntojo] ?? [] : []
  const microtext =
    highlightedCats.length === 0
      ? null
      : highlightedCats.length === 1
        ? `Hoy te encaja: ${highlightedCats[0]}.`
        : highlightedCats.length === 2
          ? `Hoy te encaja: ${highlightedCats[0]} y ${highlightedCats[1]}.`
          : `Hoy te encaja: ${highlightedCats[0]}, ${highlightedCats[1]} y ${highlightedCats[2]}.`

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/proximamente"
          className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <span>Pedir ahora</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Link>
      </div>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Descubre nuestra carta
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              En la carta de AriMar encontrarás una selección de comida casera para llevar pensada
              para el día a día: platos del día, pollo asado, potajes, cremas, arroces, pastas,
              guisos, fritos y postres caseros. Una propuesta variada, cercana y propia de una
              freiduría moderna en Playa de Arinaga, pensada para que elijas fácilmente lo que más
              te apetece en cada momento.
            </p>
          </header>

          <section
            className="mb-16 text-center bg-primary-50/40 border border-primary-100/70 rounded-3xl px-4 py-8 sm:px-8"
            aria-labelledby="elige-antojo-heading"
          >
            <h2 id="elige-antojo-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
              Elige tu antojo
            </h2>
            <p className="text-slate-600 mb-8">Te ayudamos a elegir según el momento.</p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8" role="group" aria-label="Momento del día">
              {antojoButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  aria-pressed={selectedAntojo === btn.id}
                  onClick={() => setSelectedAntojo(selectedAntojo === btn.id ? null : btn.id)}
                  className={`px-4 py-2.5 rounded-full border-2 text-sm md:text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    selectedAntojo === btn.id
                      ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <nav aria-label="Categorías recomendadas según tu elección">
              <ul className="flex flex-wrap justify-center gap-2 md:gap-3 list-none pl-0 mb-4">
                {categoriesSeo.map((cat) => {
                  const isHighlighted = highlightedCats.includes(cat)
                  return (
                    <li key={cat}>
                      <span
                        className={`inline-block px-4 py-2 rounded-full border text-sm md:text-base transition-all duration-300 ${
                          isHighlighted
                            ? 'border-primary-400 bg-primary-50 text-primary-800 shadow-md ring-2 ring-primary-200 scale-105'
                            : 'border-primary-100/70 bg-primary-50/60 text-primary-800/90'
                        }`}
                      >
                        {cat}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </nav>
            {microtext && (
              <p className="text-slate-600 font-medium" aria-live="polite">
                {microtext}
              </p>
            )}
          </section>

          <section
            className="mb-16 bg-slate-50/80 border border-slate-200 rounded-3xl px-4 py-8 sm:px-8"
            aria-labelledby="carta-seo-heading"
          >
            <h2 id="carta-seo-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Una carta pensada para el día a día
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl mb-6">
              En AriMar trabajamos con una carta de rotación diaria para que siempre encuentres
              opciones variadas y caseras según temporada y producción. Así puedes elegir entre
              platos de cuchara, elaboraciones más ligeras, propuestas para compartir o algo dulce
              para completar tu comida.
            </p>
            <ul className="flex flex-wrap gap-2 md:gap-3 list-disc list-inside pl-0 [list-style:none]">
              {categoriesSeo.map((cat) => (
                <li key={cat}>
                  <span className="inline-block px-4 py-2 rounded-full border border-primary-100/70 bg-primary-50/60 text-sm md:text-base text-primary-800/90">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-20" aria-labelledby="carta-visual-heading">
            <h2 id="carta-visual-heading" className="sr-only">
              Carta visual de AriMar FoodLab
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cartaItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <p className="text-center mb-16">
            <Link
              href="/contacto"
              className="text-primary-600 font-semibold hover:text-primary-700 hover:underline"
            >
              Horario y ubicación
            </Link>
          </p>

          <section
            className="max-w-3xl mx-auto bg-slate-50/80 border border-slate-200 rounded-3xl px-4 py-8 sm:px-8"
            aria-labelledby="faq-heading"
          >
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 tracking-tight">
              Preguntas frecuentes
            </h2>
            <ul className="space-y-6 list-none pl-0">
              {faqs.map((faq, i) => (
                <li key={i} className="border-b border-slate-200 pb-6 last:border-0">
                  <h3 className="text-base font-semibold text-slate-800 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.a.includes('Horario y ubicación')
                      ? <>
                          {faq.a.slice(0, faq.a.indexOf('Horario y ubicación'))}
                          <Link href="/contacto" className="text-primary-600 font-medium hover:underline">
                            Horario y ubicación
                          </Link>
                          {faq.a.slice(faq.a.indexOf('Horario y ubicación') + 'Horario y ubicación'.length)}
                        </>
                      : faq.a}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
