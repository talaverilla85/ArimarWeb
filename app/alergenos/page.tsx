import type { Metadata } from 'next'
import AlergenosClient from './AlergenosClient'

export const metadata: Metadata = {
  title: 'Carta de alérgenos | AriMar FoodLab',
  description:
    'Matriz de alérgenos de las elaboraciones de AriMar FoodLab en Playa de Arinaga. Información actualizada desde nuestra cocina.',
  openGraph: {
    title: 'Carta de alérgenos | AriMar FoodLab',
    description:
      'Consulta los alérgenos declarados en las elaboraciones de AriMar FoodLab, comida casera para llevar en Playa de Arinaga.',
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
