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
    'https://www.google.com/maps/search/?api=1&query=Avenida+Poliz%C3%B3n+67,+Playa+de+Arinaga,+Ag%C3%BCimes',
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
