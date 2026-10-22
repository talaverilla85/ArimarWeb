/** Fotografías reales de AriMar, optimizadas para la web.
 * Son ejemplos de elaboraciones, no garantía de disponibilidad diaria.
 */
export type FeaturedDish = {
  id: string
  name: string
  image: string
  alt: string
  category: string
  description: string
  href: string
}

export const featuredDishes: FeaturedDish[] = [
  {
    id: 'pollo-agridulce',
    name: 'Pollo agridulce',
    image: '/images/arimar-pollo-agridulce.webp',
    alt: 'Ración real de pollo agridulce de AriMar con verduras en envase blanco',
    category: 'Favorito de la casa',
    description: 'Una de esas raciones que apetece repetir.',
    href: '/carta',
  },
  {
    id: 'carne-fiesta',
    name: 'Carne fiesta con papas',
    image: '/images/arimar-carne-fiesta.webp',
    alt: 'Carne fiesta con papas de AriMar servida en una bandeja blanca',
    category: 'Cocina canaria',
    description: 'Sabor de siempre, preparado para llevar.',
    href: '/carta',
  },
  {
    id: 'poke-pollo',
    name: 'Poke de pollo',
    image: '/images/arimar-poke-pollo.webp',
    alt: 'Poke de pollo de AriMar con arroz, aguacate y verduras',
    category: 'Opciones frescas',
    description: 'Color, variedad y una comida completa.',
    href: '/carta',
  },
  {
    id: 'estofado-ternera',
    name: 'Estofado de ternera',
    image: '/images/arimar-estofado-ternera.webp',
    alt: 'Estofado de ternera con papas de AriMar en envase para llevar',
    category: 'De cuchara y guiso',
    description: 'Cocina casera para disfrutar sin cocinar.',
    href: '/carta',
  },
  {
    id: 'ensalada-col',
    name: 'Ensalada de col',
    image: '/images/arimar-ensalada-col.webp',
    alt: 'Ensalada de col preparada por AriMar en un bol',
    category: 'Ensaladas',
    description: 'Una alternativa fresca para acompañar o llevar.',
    href: '/carta',
  },
  {
    id: 'costillas',
    name: 'Costillas asadas',
    image: '/images/arimar-costillas-asadas.webp',
    alt: 'Costillas de cerdo asadas en el obrador de AriMar',
    category: 'Asados',
    description: 'Otro ejemplo de nuestros asados y encargos.',
    href: '/pata-asada-gran-canaria',
  },
  {
    id: 'crema-calabaza',
    name: 'Crema de calabaza',
    image: '/images/arimar-crema-calabaza.webp',
    alt: 'Crema de calabaza y zanahoria elaborada por AriMar',
    category: 'Cocina de diario',
    description: 'Platos de cuchara que cambian con la producción.',
    href: '/carta',
  },
  {
    id: 'pata-asada',
    name: 'Pata asada canaria',
    image: '/images/pata-asada-canaria-arimar-real.jpg',
    alt: 'Pata de cerdo asada de AriMar, fotografía de elaboración real',
    category: 'Por encargo',
    description: 'Para reuniones, celebraciones y una buena comida.',
    href: '/pata-asada-gran-canaria',
  },
]
