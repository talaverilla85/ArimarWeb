import { siteConfig } from '@/lib/siteConfig'

const SITE_URL = `https://${siteConfig.domain}`
export const RESTAURANT_ID = `${SITE_URL}/#restaurant`

/** Schema Restaurant canónico (sameAs, identidad de marca). */
export function buildRestaurantJsonLd(options?: { pageUrl?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: 'AriMar FoodLab',
    alternateName: 'AriMar',
    url: options?.pageUrl ?? SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Casa de comidas y freiduría 100% sin gluten en Playa de Arinaga, Gran Canaria.',
    telephone: `+${siteConfig.whatsappPhoneE164}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.province,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'ES',
    },
    sameAs: [siteConfig.instagramUrl, siteConfig.facebookUrl],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.857688,
      longitude: -15.414344,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '11:30',
      closes: '16:00',
    },
    servesCuisine: ['Comida casera', 'Freiduría', 'Takeaway', 'Sin gluten'],
  }
}

export function buildJsonLdGraph(items: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  }
}
