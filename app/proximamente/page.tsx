import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Próximamente - AriMar',
  description: 'Pedidos online próximamente. AriMar, comida para llevar en Playa de Arinaga.',
}

export default function ProximamentePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Próximamente
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          Estamos preparando la tienda online. Mientras tanto, escríbenos por WhatsApp para hacer tu pedido.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
        >
          Contactar por WhatsApp
        </Link>
      </div>
    </div>
  )
}
