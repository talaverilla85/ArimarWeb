'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'

/** Categorías de la carta (6): SEO e interactivo */
const categoriesSeo = [
  'Potajes',
  'Cremas',
  'Pastas y arroces',
  'Guisos',
  'Vegetales',
  'Postres',
]

const antojoButtons = [
  { id: 'prisa' as const, label: 'Vengo con prisa' },
  { id: 'cuchara' as const, label: 'Me apetece cuchara' },
  { id: 'ligero' as const, label: 'Quiero algo ligero' },
  { id: 'capricho' as const, label: 'Hoy toca capricho' },
]

const antojoToCategories: Record<string, string[]> = {
  prisa: ['Pastas y arroces', 'Guisos'],
  cuchara: ['Potajes', 'Cremas'],
  ligero: ['Vegetales', 'Cremas'],
  capricho: ['Postres', 'Pastas y arroces'],
}

const cartaItems = [
  {
    src: '/images/carta-crema.webp',
    alt: 'Crema o sopa del día en AriMar FoodLab, comida para llevar Playa de Arinaga',
    title: 'Cremas y sopas',
    description: 'De cuchara, según el día.',
  },
  {
    src: '/images/carta-potaje.webp',
    alt: 'Potaje tradicional, comida casera para llevar en Agüimes',
    title: 'Potajes',
    description: 'Legumbres y verduras de temporada.',
  },
  {
    src: '/images/carta-pasta.webp',
    alt: 'Pasta y arroz caseros para llevar, AriMar FoodLab Playa de Arinaga',
    title: 'Pastas y arroces',
    description: 'Platos de pasta y arroz caseros.',
  },
  {
    src: '/images/carta-carne-estofada.webp',
    alt: 'Guisos y carnes para llevar en Playa de Arinaga',
    title: 'Guisos',
    description: 'Carnes y guisos que repiten.',
  },
  {
    src: '/images/carta-vegetal.webp',
    alt: 'Platos vegetales, comida para llevar Playa de Arinaga',
    title: 'Vegetales',
    description: 'Opciones vegetales y ligeras.',
  },
  {
    src: '/images/carta-postre-vaso.webp',
    alt: 'Postres caseros, AriMar FoodLab',
    title: 'Postres',
    description: 'Algo dulce para cerrar.',
  },
]

const faqs = [
  {
    q: '¿Dónde está AriMar FoodLab?',
    a: 'Estamos en Playa de Arinaga, Agüimes (Gran Canaria). Dirección: Avenida Polizón 67. Puedes ver el horario y la ubicación en nuestra página de contacto.',
  },
  {
    q: '¿La carta es fija o cambia?',
    a: 'La carta cambia cada día según temporada y producción. Solemos tener de cuchara (potajes, cremas), pastas, arroces, guisos, platos vegetales y postres.',
  },
  {
    q: '¿Puedo pedir para llevar?',
    a: 'Sí. Todo nuestro menú es comida para llevar. Abrimos todos los días de 11:30 a 16:00. Para horario completo y cómo llegar: Horario y ubicación.',
  },
  {
    q: '¿Qué tipo de comida hacéis?',
    a: 'Comida casera para llevar: potajes, cremas, pastas, arroces, guisos, vegetales y postres. Elaborada con productos de calidad en Playa de Arinaga.',
  },
]

function buildJsonLd() {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'AriMar FoodLab',
    description:
      'Comida casera para llevar en Playa de Arinaga, Agüimes. Carta diaria con potajes, cremas, pastas, arroces, guisos y postres.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.municipality + ', ' + siteConfig.address.region,
      addressCountry: 'ES',
    },
    url: 'https://www.arimarfoodlab.es/carta',
    hasMenu: {
      '@type': 'Menu',
      name: 'Carta AriMar FoodLab',
      description: 'Carta de comida para llevar que varía según el día. Incluye potajes, cremas, pastas, arroces, guisos, vegetales y postres.',
    },
  }
  return restaurant
}

export default function CartaPage() {
  const jsonLd = buildJsonLd()
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Floating CTA */}
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
          {/* Hero: H1 + párrafo */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Comida para llevar en Playa de Arinaga
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              En AriMar FoodLab elaboramos comida casera para llevar en Playa de Arinaga, Agüimes.
              Nuestra carta cambia cada día según temporada y producción: potajes, cremas, pastas,
              arroces, guisos, platos vegetales y postres. Todo pensado para que te lo lleves y lo
              disfrutes en casa, en la oficina o donde prefieras. Estamos en Avenida Polizón 67.
              Ven a vernos y llévate la comida lista sin complicarte.
            </p>
          </header>

          {/* Bloque interactivo: Elige tu antojo */}
          <section
            className="mb-16 text-center"
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
                  className="px-4 py-2.5 rounded-full border-2 text-sm md:text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  style={{
                    borderColor: selectedAntojo === btn.id ? 'var(--color-primary-500, #0d9488)' : 'var(--color-slate-200, #e2e8f0)',
                    backgroundColor: selectedAntojo === btn.id ? 'var(--color-primary-50, #f0fdfa)' : 'white',
                    color: selectedAntojo === btn.id ? 'var(--color-primary-800, #115e59)' : 'var(--color-slate-700, #334155)',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Categorías (chips) con resaltado */}
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

          {/* SEO: H2 + párrafo indexable + lista categorías */}
          <section className="mb-16" aria-labelledby="carta-seo-heading">
            <h2 id="carta-seo-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Comida para llevar en Playa de Arinaga
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl mb-6">
              En Playa de Arinaga, Agüimes (Gran Canaria), AriMar FoodLab ofrece comida para llevar
              con carta de rotación diaria. Potajes, cremas, pastas, arroces, guisos, platos
              vegetales y postres elaborados con productos de calidad. Ideal para recoger y
              disfrutar en casa o en la playa. Estamos en Avenida Polizón 67; horario de atención
              todos los días. Ven a probar nuestra comida casera en el sur de Gran Canaria.
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

          {/* Grid de cards con h3 + descripción + alt */}
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

          {/* Enlace interno Horario y ubicación */}
          <p className="text-center mb-16">
            <Link
              href="/contacto"
              className="text-primary-600 font-semibold hover:text-primary-700 hover:underline"
            >
              Horario y ubicación
            </Link>
          </p>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto" aria-labelledby="faq-heading">
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
