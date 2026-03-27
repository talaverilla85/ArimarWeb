/**
 * Configuración única del sitio. Usar para WhatsApp, dominio y mensajes por defecto.
 */
export const siteConfig = {
  legal: {
    ownerName: 'AriMar FoodLab S.L',
    businessName: 'AriMar FoodLab S.L',
    nif: 'B-23826688',
    email: 'info@arimarfoodlab.es',
  },
  whatsappPhoneE164: '34614881678',
  whatsappPhoneDisplay: '614 88 16 78',
  whatsappMessage: 'Hola, buenos días. Tengo una consulta',
  domain: 'arimarfoodlab.es',

  address: {
    street: 'Avenida Polizón 67, local',
    postalCode: '35118',
    locality: 'Playa de Arinaga',
    province: 'Las Palmas',
    municipality: 'Agüimes',
    region: 'Gran Canaria',
    country: 'España',
  },

  // ✅ Link normal para abrir Google Maps (botón)
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida+Poliz%C3%B3n+67,+Playa+de+Arinaga,+Ag%C3%BCimes',

  // ✅ Link embed para mostrar el mapa dentro de la web (iframe)
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14109.768197235702!2d-15.414344072341878!3d27.85768820651033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40a1a45ac285f7%3A0xf8a78393826fee5!2sAriMar!5e0!3m2!1ses!2ses!4v1770771808126!5m2!1ses!2ses',
} as const

/**
 * Genera la URL de WhatsApp (wa.me). Funciona en móvil (app) y escritorio (Web/app).
 * @param message - Mensaje opcional; si no se pasa, usa siteConfig.whatsappMessage
 */
export function getWhatsAppUrl(message?: string): string {
  const text = message ?? siteConfig.whatsappMessage
  const params = new URLSearchParams({ text })
  return `https://wa.me/${siteConfig.whatsappPhoneE164}?${params.toString()}`
}
