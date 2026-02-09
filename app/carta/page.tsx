'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Carta de AriMar',
  description: 'Carta completa de comida para llevar en Playa de Arinaga',
  provider: {
    '@type': 'LocalBusiness',
    name: 'AriMar',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa de Arinaga',
      addressRegion: 'Gran Canaria',
      addressCountry: 'ES',
    },
  },
}

const cartaImages = [
  { src: '/images/carta-crema.webp', alt: 'Crema' },
  { src: '/images/carta-potaje.webp', alt: 'Potaje' },
  { src: '/images/carta-pasta.webp', alt: 'Pasta' },
  { src: '/images/carta-carne-estofada.webp', alt: 'Carne estofada' },
  { src: '/images/carta-vegetal.webp', alt: 'Plato vegetal' },
  { src: '/images/carta-postre-vaso.webp', alt: 'Postre' },
]

export default function CartaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/pedir"
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Carta
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              La carta cambia según lo que se cocina cada día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartaImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
