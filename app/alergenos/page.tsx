import type { Metadata } from 'next'
import AlergenosClient from './AlergenosClient'

export const metadata: Metadata = {
  title: 'Carta de alérgenos | AriMar FoodLab',
  description:
    'Carta de alérgenos de AriMar FoodLab, establecimiento 100 % sin gluten en Playa de Arinaga. Información actualizada desde nuestra cocina.',
  openGraph: {
    title: 'Carta de alérgenos | AriMar FoodLab',
    description:
      'Alérgenos de las elaboraciones de AriMar FoodLab: local 100 % sin gluten, comida casera para llevar en Playa de Arinaga.',
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
