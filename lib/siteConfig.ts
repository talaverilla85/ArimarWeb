/**
 * Configuración única del sitio. Usar para WhatsApp, dominio y mensajes por defecto.
 */
export const siteConfig = {
  /** Teléfono en formato E.164 sin el símbolo + (ej: 346XXXXXXXX) */
  whatsappPhoneE164: '34614881678',
  /** Mensaje por defecto al abrir WhatsApp */
  whatsappMessage: 'Hola, me gustaría información sobre AriMar',
  /** Dominio del sitio (sin protocolo) */
  domain: 'arimarfoodlab.es',
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
