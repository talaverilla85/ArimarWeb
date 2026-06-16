import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import JsonLdScript from '@/components/JsonLdScript'
import { RESTAURANT_ID } from '@/lib/restaurantJsonLd'
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

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Carta AriMar FoodLab',
  url: `https://${siteConfig.domain}/carta`,
  description:
    'Carta de comida para llevar que varía según el día. Incluye potajes, cremas, pastas, arroces, guisos, vegetales y postres.',
  provider: {
    '@id': RESTAURANT_ID,
  },
}

export default function CartaPage() {
  return (
    <>
      <JsonLdScript data={menuJsonLd} />
      <CartaClient />
    </>
  )
}
