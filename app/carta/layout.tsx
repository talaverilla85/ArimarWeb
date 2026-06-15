import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Carta de comida casera | AriMar FoodLab – Playa de Arinaga',
  description:
    'Carta de comida casera y freiduría en Playa de Arinaga, Gran Canaria. Establecimiento apto para celíacos: platos preparados, raciones para llevar, potajes, guisos y postres.',
  alternates: {
    canonical: `${domain}/carta`,
  },
  openGraph: {
    title: 'Carta de comida casera | AriMar FoodLab – Playa de Arinaga',
    description:
      'Comida casera y freiduría para llevar en Playa de Arinaga. Carta apta para celíacos, pensada para todos.',
    type: 'website',
    url: `${domain}/carta`,
  },
}

export default function CartaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
