import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Nuestra cocina | AriMar FoodLab – Playa de Arinaga',
  description:
    'Así cocinamos en AriMar FoodLab: selección corta que rota a diario, control de punto y uniformidad con cocina profesional. Comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria.',
  alternates: {
    canonical: `${domain}/nuestra-cocina`,
  },
  openGraph: {
    title: 'Nuestra cocina | AriMar FoodLab – Playa de Arinaga',
    description:
      'Selección corta que rota a diario, control de punto y uniformidad. Comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria.',
    type: 'website',
    url: `${domain}/nuestra-cocina`,
  },
}

export default function NuestraCocinaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
