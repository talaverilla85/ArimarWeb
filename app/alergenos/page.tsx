import type { Metadata } from 'next'
import AlergenosClient from './AlergenosClient'

export const metadata: Metadata = {
  title: 'Alérgenos y carta 100 % sin gluten | AriMar FoodLab',
  description:
    'AriMar es un establecimiento 100 % sin gluten en Playa de Arinaga, Gran Canaria. Consulta el resto de alérgenos declarados en cada elaboración.',
  openGraph: {
    title: 'Alérgenos y carta 100 % sin gluten | AriMar FoodLab',
    description:
      'Información clara de alérgenos en AriMar FoodLab: comida casera y freiduría 100 % sin gluten en Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/alergenos',
  },
  alternates: {
    canonical: '/alergenos',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AlergenosPage() {
  return <AlergenosClient />
}
