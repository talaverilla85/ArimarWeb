import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedir - AriMar',
  description: 'Realiza tu pedido online en AriMar. Comida para llevar en Playa de Arinaga.',
  openGraph: {
    title: 'Pedir - AriMar',
    description: 'Realiza tu pedido online.',
    type: 'website',
  },
}

export default function PedirLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


