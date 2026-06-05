import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'
import CookieConsent from '@/components/CookieConsent'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Restaurant'],
  name: 'AriMar FoodLab',
  description: 'Casa de comidas y freiduría 100 % sin gluten en Playa de Arinaga, Gran Canaria. Comida casera sin gluten, platos preparados, raciones para llevar e información de alérgenos para elegir con tranquilidad.',
  url: `https://${siteConfig.domain}`,
  telephone: siteConfig.whatsappPhoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.province,
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
  servesCuisine: ['Comida casera', 'Freiduría', 'Takeaway', 'Sin gluten'],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://arimarfoodlab.es'),
  title: 'AriMar - Comida casera y freiduría 100 % sin gluten en Gran Canaria',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  description:
    'Casa de comidas y freiduría 100 % sin gluten en Playa de Arinaga, Gran Canaria. Platos preparados, raciones y comida casera para todos, con una carta elaborada sin gluten.',
  openGraph: {
    title: 'AriMar - Comida casera y freiduría 100 % sin gluten en Gran Canaria',
    description:
      'Establecimiento 100 % sin gluten en Playa de Arinaga, Gran Canaria: comida casera, freiduría, platos preparados y raciones para llevar.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

