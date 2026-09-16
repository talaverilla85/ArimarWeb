import type { Metadata } from 'next'

const domain = 'https://arimarfoodlab.es'

export const metadata: Metadata = {
  title: 'Carta 100% sin gluten | Comida casera en Playa de Arinaga',
  description:
    'Consulta la carta 100% sin gluten de AriMar en Playa de Arinaga: comida casera, freiduría, platos preparados, raciones, guisos, arroces y postres para llevar.',
  alternates: {
    canonical: `${domain}/carta`,
  },
  openGraph: {
    title: 'Carta 100% sin gluten | AriMar Playa de Arinaga',
    description:
      'Comida casera, freiduría y platos preparados 100% sin gluten para llevar en Playa de Arinaga.',
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
