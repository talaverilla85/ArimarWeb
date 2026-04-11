/**
 * FAQs canónicas del sitio. Una sola fuente de verdad para /preguntas-frecuentes y schema FAQPage.
 */
export const faqCanonicalPath = '/preguntas-frecuentes' as const

export type FaqItem = { question: string; answer: string }

export const siteFaqItems: FaqItem[] = [
  {
    question: '¿Qué tipo de comida puedo encontrar en AriMar?',
    answer:
      'Comida casera para llevar: platos del día, pollo asado, potajes, cremas, arroces, pastas, guisos, fritos y postres caseros. Elaboramos en Playa de Arinaga (Agüimes, Gran Canaria) con foco en recogida rápida en local.',
  },
  {
    question: '¿Sois una freiduría?',
    answer:
      'Sí. AriMar es una freiduría moderna de comida casera para llevar: recetas reconocibles, vitrina del día y opción de encargar con hora de recogida. No disponemos de comedor; todo el servicio es takeaway.',
  },
  {
    question: '¿La carta es fija o cambia?',
    answer:
      'La carta rota cada día según temporada y producción. Solemos tener platos de cuchara (potajes, cremas), pastas, arroces, guisos, opciones vegetales y postres, además de platos del día y pollo asado cuando toca.',
  },
  {
    question: '¿Cómo hago un pedido o encargo para recoger?',
    answer:
      'Puedes pasar por el local y elegir en la vitrina del día, o hacer tu pedido (incluido online cuando activemos el canal) y recoger a la hora que mejor te encaje. Para dudas o encargos especiales también puedes escribirnos por WhatsApp.',
  },
  {
    question: '¿Dónde está AriMar y cómo recojo el pedido?',
    answer:
      'Estamos en Avenida Polizón 67, local, en Playa de Arinaga (Agüimes, Gran Canaria). La recogida es en el local, sin comedor. Horario y mapa detallado están en la página de contacto de esta web.',
  },
  {
    question: '¿Cuál es el horario? ¿Abrís todos los días?',
    answer:
      'Sí, abrimos todos los días de 11:30 a 16:00. El horario puede variar en días especiales; lo actualizamos en Google Maps y en la página de contacto.',
  },
  {
    question: '¿Incluís alérgenos e información de ingredientes?',
    answer:
      'Sí. Cada tupper lleva etiqueta con ingredientes principales, alérgenos, fecha de caducidad y número de lote para que elijas con tranquilidad.',
  },
  {
    question: '¿Tenéis opciones sin gluten o vegetarianas?',
    answer:
      'Sí, solemos tener varias opciones cada día. Te recomendamos revisar las etiquetas en vitrina o preguntarnos por WhatsApp si tienes una necesidad concreta.',
  },
  {
    question: '¿Hacéis pollo asado?',
    answer:
      'Sí, el pollo asado es uno de los platos que solemos ofrecer según el día y la producción.',
  },
  {
    question: '¿Puedo pedir online?',
    answer:
      'Muy pronto podrás pedir desde esta web (enlace a la tienda online). Mientras tanto, puedes contactarnos por WhatsApp para consultas e incidencias.',
  },
  {
    question: '¿Dónde comer en Playa de Arinaga si quiero comida casera para llevar?',
    answer:
      'En la zona hay buenos sitios para comer en local. AriMar apuesta por llevarte comida casera de calidad donde tú quieras: casa, trabajo, playa u otro plan, sin depender de sentarte en un restaurante.',
  },
]

/** Tres preguntas representativas para la home (el resto vive en la página canónica). */
export const homeFaqTeasers: FaqItem[] = [siteFaqItems[0], siteFaqItems[3], siteFaqItems[4]]

/** Preguntas muy ligadas a la carta; el resto en /preguntas-frecuentes */
export const cartaFaqTeasers: FaqItem[] = [siteFaqItems[2], siteFaqItems[1]]

export function buildFaqPageJsonLd(items: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
