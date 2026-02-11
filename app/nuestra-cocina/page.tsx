import type { Metadata } from 'next'
import NuestraCocinaClient from './NuestraCocinaClient'

export const metadata: Metadata = {
  title: 'Nuestra cocina | AriMar FoodLab – Playa de Arinaga',
  description:
    'Así cocinamos en AriMar FoodLab: selección corta que rota a diario, control del punto y consistencia con cocina profesional. Comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria.',
}

export default function NuestraCocinaPage() {
  return <NuestraCocinaClient />
}
