import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLdScript from '@/components/JsonLdScript'
import { buildRestaurantJsonLd } from '@/lib/restaurantJsonLd'
import CookieConsent from '@/components/CookieConsent'

const restaurantJsonLd = buildRestaurantJsonLd()

export const metadata: Metadata = {
  metadataBase: new URL('https://arimarfoodlab.es'),
  title: 'AriMar - Comida casera y freiduría en Playa de Arinaga, Gran Canaria',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  description:
    'Casa de comidas y freiduría en Playa de Arinaga, Gran Canaria. Comida casera para llevar, apta para celíacos y pensada para todo el mundo.',
  openGraph: {
    title: 'AriMar - Comida casera y freiduría en Playa de Arinaga',
    description:
      'Comida casera, freiduría y platos preparados para llevar en Playa de Arinaga. Carta apta para celíacos.',
    url: 'https://arimarfoodlab.es/',
    type: 'website',
  },
  keywords: 'comida sin gluten Gran Canaria, freiduría sin gluten Gran Canaria, comida para llevar sin gluten, celíacos Gran Canaria, AriMar Playa de Arinaga, comida casera sin gluten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <JsonLdScript data={restaurantJsonLd} />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased relative">
        <CookieConsent />
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

