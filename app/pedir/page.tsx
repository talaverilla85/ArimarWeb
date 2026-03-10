import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const PedirClient = dynamic(() => import('./PedirClient'), { ssr: true })

export const metadata: Metadata = {
  title: 'Pedir comida para llevar | AriMar FoodLab – Playa de Arinaga',
  description:
    'Haz tu encargo en AriMar FoodLab y recoge tu comida casera para llevar en Playa de Arinaga. Pedir platos del día, pollo asado y guisos con hora de recogida en el local.',
  openGraph: {
    title: 'Pedir comida para llevar | AriMar FoodLab – Playa de Arinaga',
    description:
      'Encarga tu comida casera en AriMar FoodLab y recógela en nuestro local de Playa de Arinaga (Agüimes). Pedidos para llevar con recogida en horario de 11:30 a 16:00.',
    type: 'website',
    url: 'https://arimarfoodlab.es/pedir',
  },
  keywords:
    'pedir comida para llevar, encargo comida casera, recogida en local, pedidos AriMar, Playa de Arinaga',
  alternates: {
    canonical: '/pedir',
  },
}

export default function PedirPage() {
  return <PedirClient />
}
