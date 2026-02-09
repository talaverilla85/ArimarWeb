import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AriMar - Comida para llevar en Playa de Arinaga, Gran Canaria',
  description: 'Comida para llevar de calidad en Playa de Arinaga. Tecnología, higiene y sabor en cada plato.',
  keywords: 'comida para llevar, Playa de Arinaga, Gran Canaria, comida rápida, takeaway',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head />
      <body className="bg-slate-50 text-slate-800 antialiased relative">
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'url(/images/bg-textura-reciclado.webp)',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative z-10">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

