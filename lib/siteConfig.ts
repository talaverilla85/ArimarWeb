/**
 * Configuración única del sitio. Usar para WhatsApp, dominio y mensajes por defecto.
 */
export const siteConfig = {
  /** Teléfono en formato E.164 sin el símbolo + (ej: 346XXXXXXXX) */
  whatsappPhoneE164: '34614881678',
  /** Mensaje por defecto al abrir WhatsApp */
  whatsappMessage: 'Hola, buenos días. Tengo una consulta',
  /** Dominio del sitio (sin protocolo) */
  domain: 'arimarfoodlab.es',
  /** Dirección física del local */
  address: {
    street: 'Avenida Polizón 67',
    locality: 'Playa de Arinaga',
    municipality: 'Agüimes',
    region: 'Gran Canaria',
    country: 'España',
  },
  /** URL de Google Maps para la ubicación */
  mapsUrl:
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
