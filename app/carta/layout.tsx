import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Carta · Comida para llevar Playa de Arinaga | AriMar FoodLab',
  description:
    'Carta de comida casera para llevar en Playa de Arinaga, Agüimes. Potajes, cremas, pastas, arroces, guisos y postres. AriMar FoodLab, Avenida Polizón 67.',
  alternates: {
    canonical: `${domain}/carta`,
  },
  openGraph: {
    title: 'Carta · Comida para llevar Playa de Arinaga | AriMar FoodLab',
    description:
      'Comida casera para llevar en Playa de Arinaga, Agüimes. Carta diaria: potajes, cremas, pastas, guisos y postres.',
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
