import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import JsonLdScript from '@/components/JsonLdScript'
import { RESTAURANT_ID } from '@/lib/restaurantJsonLd'
import { siteConfig } from '@/lib/siteConfig'

const CartaClient = dynamic(() => import('./CartaClient'), { ssr: true })

export const metadata: Metadata = {
  title: 'Carta AriMar – Comida casera para llevar en Playa de Arinaga',
  description:
    'Descubre nuestra comida casera 100 % sin gluten: ropa vieja, pollo agridulce, croquetas, guisos, ensaladas y asados. Carta y pedidos para recoger en AriMar, Gran Canaria.',
  openGraph: {
    title: 'Carta AriMar – Comida casera para llevar en Playa de Arinaga',
    description:
      'Platos reales de AriMar: pollo agridulce, ropa vieja, croquetas, ensaladas y asados. Toda nuestra cocina 100 % sin gluten para recoger en Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/carta',
  },
  keywords:
    'carta AriMar, comida casera para llevar, pollo agridulce, croquetas sin gluten, ropa vieja, Playa de Arinaga, Agüimes, Gran Canaria',
  alternates: {
    canonical: '/carta',
  },
}

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Carta AriMar FoodLab',
  url: 'https://' + siteConfig.domain + '/carta',
  description:
    'Carta variable de comida casera para llevar, 100 % sin gluten. Incluye raciones, guisos, croquetas, ensaladas, pollo asado y platos del día, según disponibilidad.',
  provider: { '@id': RESTAURANT_ID },
}

export default function CartaPage() {
  return (
    <>
      <JsonLdScript data={menuJsonLd} />
      <CartaClient />
    </>
  )
}
