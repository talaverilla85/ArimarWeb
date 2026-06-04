import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Carta 100 % sin gluten en Playa de Arinaga | AriMar FoodLab',
  description:
    'Carta 100 % sin gluten en Playa de Arinaga, Gran Canaria. Platos preparados, freiduría sin gluten, comida casera, raciones para llevar, potajes, guisos y postres.',
  alternates: {
    canonical: `${domain}/carta`,
  },
  openGraph: {
    title: 'Carta 100 % sin gluten en Playa de Arinaga | AriMar FoodLab',
    description:
      'Comida casera y freiduría 100 % sin gluten para llevar en Playa de Arinaga, Gran Canaria.',
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
