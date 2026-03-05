import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Restaurant'],
  name: 'AriMar FoodLab',
  description: 'Freiduría y comida casera para llevar en Playa de Arinaga, Agüimes (Gran Canaria). Pollo asado, cremas, potajes, pastas, arroces, guisos, opciones vegetarianas y postres.',
  url: `https://www.${siteConfig.domain}`,
  telephone: `+34 ${siteConfig.whatsappPhoneE164.slice(3, 6)} ${siteConfig.whatsappPhoneE164.slice(6, 9)} ${siteConfig.whatsappPhoneE164.slice(9)}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.street}, local`,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.municipality + ', ' + siteConfig.address.region,
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.857688,
    longitude: -15.414344,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '11:30',
    closes: '16:00',
  },
  servesCuisine: ['Comida casera', 'Freiduría', 'Takeaway'],
}

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

