import type { Metadata } from 'next'

const domain = 'https://www.arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Nuestra cocina 100 % sin gluten | AriMar FoodLab – Gran Canaria',
  description:
    'Así cocinamos en AriMar FoodLab: carta 100 % sin gluten, procesos organizados, etiquetado de elaboraciones y comida casera para llevar en Playa de Arinaga, Gran Canaria.',
  alternates: {
    canonical: `${domain}/nuestra-cocina`,
  },
  openGraph: {
    title: 'Nuestra cocina 100 % sin gluten | AriMar FoodLab – Gran Canaria',
    description:
      'Método, organización y control para ofrecer comida casera 100 % sin gluten en Playa de Arinaga, Gran Canaria.',
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
