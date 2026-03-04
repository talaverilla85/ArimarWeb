import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AriMar | Freiduría y Comida Casera para Llevar en Playa de Arinaga – Gran Canaria',
  description: 'Freiduría en Playa de Arinaga con platos caseros diarios, pollo asado fresco, opciones sin gluten y vegetarianas. Todo listo para llevar a casa o playa. Envases compostables y etiquetado completo. Muy pronto abrimos.',
  keywords: 'comida para llevar, Playa de Arinaga, Gran Canaria, freiduría, comida casera, takeaway',
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

