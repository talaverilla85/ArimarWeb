import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/siteConfig'

const CartaClient = dynamic(() => import('./CartaClient'), { ssr: true })

export const metadata: Metadata = {
  title: 'Carta AriMar – Comida casera para llevar en Playa de Arinaga',
  description:
    'Carta de AriMar FoodLab en Playa de Arinaga: pollo asado, potajes, cremas, pastas, arroces, guisos y postres caseros para llevar en Agüimes (Gran Canaria).',
  openGraph: {
    title: 'Carta AriMar – Comida casera para llevar en Playa de Arinaga',
    description:
      'Descubre la carta de AriMar FoodLab: platos del día, pollo asado, potajes, cremas, guisos y postres caseros para llevar en Playa de Arinaga (Agüimes).',
    type: 'website',
    url: 'https://arimarfoodlab.es/carta',
  },
  keywords:
    'carta AriMar, comida casera para llevar, pollo asado, potajes, cremas, guisos, platos del día, Playa de Arinaga, Agüimes',
  alternates: {
    canonical: '/carta',
  },
}

function buildJsonLd() {
  return {
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
}

export default function CartaPage() {
  const jsonLd = buildJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CartaClient />
    </>
  )
}
