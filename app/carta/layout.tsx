import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Comida para llevar en Playa de Arinaga · Carta | AriMar FoodLab',
  description:
    'Comida para llevar en Playa de Arinaga, Agüimes (Gran Canaria). Carta casera de rotación diaria: potajes, cremas, pastas, arroces, guisos, vegetales y postres. AriMar FoodLab, Avenida Polizón 67.',
  alternates: {
    canonical: `${domain}/carta`,
  },
  openGraph: {
    title: 'Comida para llevar en Playa de Arinaga · Carta | AriMar FoodLab',
    description:
      'Comida para llevar en Playa de Arinaga, Agüimes. Carta diaria: potajes, cremas, pastas, guisos y postres. AriMar FoodLab.',
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
