/** Fotografias de elaboraciones de AriMar seleccionadas para la web.
 * La disponibilidad real depende de la produccion diaria.
 * Las imagenes han sido optimizadas a WebP, conservando el archivo fuente.
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
    image: '/images/arimar-20261023-pollo-agridulce.webp',
    alt: 'Pollo agridulce de AriMar con pimientos y piña en una bandeja blanca',
    category: 'Favorito de la casa',
    description: 'Pollo con verduras, piña y salsa agridulce.',
    href: '/carta',
  },
  {
    id: 'tortilla-papas',
    name: 'Tortilla de papas',
    image: '/images/arimar-20261023-tortilla-papas.webp',
    alt: 'Tortilla de papas de AriMar servida entera en un plato',
    category: 'De siempre',
    description: 'Nuestra tortilla casera, para compartir o llevar.',
    href: '/carta',
  },
  {
    id: 'pollo-asado',
    name: 'Pollo asado',
    image: '/images/arimar-20261023-pollos-asados.webp',
    alt: 'Pollos asados de AriMar dentro del horno de cocina',
    category: 'Asados',
    description: 'Pollo asado preparado en nuestra cocina.',
    href: '/pollos-asados-arinaga',
  },
  {
    id: 'ensalada-mixta-aguacate',
    name: 'Ensalada mixta con aguacate',
    image: '/images/arimar-20261023-ensalada-mixta-aguacate-foco.webp',
    alt: 'Ensalada mixta con aguacate, atun, huevo y verduras de AriMar',
    category: 'Ensaladas',
    description: 'Una mezcla fresca y completa con aguacate.',
    href: '/carta',
  },
  {
    id: 'ensaladilla-rusa',
    name: 'Ensaladilla rusa',
    image: '/images/arimar-20261023-ensaladilla-rusa-foco.webp',
    alt: 'Ensaladilla rusa de AriMar en su envase etiquetado',
    category: 'Platos fríos',
    description: 'De las elaboraciones que apetecen todo el año.',
    href: '/carta',
  },
  {
    id: 'vinagreta-marisco',
    name: 'Vinagreta de marisco',
    image: '/images/arimar-20261023-vinagreta-marisco.webp',
    alt: 'Vinagreta de marisco de AriMar con verduras en un cuenco',
    category: 'Platos fríos',
    description: 'Marisco y verduras en una propuesta fresca.',
    href: '/carta',
  },
  {
    id: 'costillas',
    name: 'Costillas asadas',
    image: '/images/arimar-20261023-costillas-asadas.webp',
    alt: 'Costillas glaseadas de AriMar presentadas sobre papas asadas',
    category: 'Asados',
    description: 'Costillas asadas con su salsa y acompañamiento.',
    href: '/carta',
  },
  {
    id: 'pata-asada',
    name: 'Pata asada canaria',
    image: '/images/arimar-20261023-pata-asada.webp',
    alt: 'Pata de cerdo asada de AriMar, cortada en raciones en una bandeja',
    category: 'Por encargo',
    description: 'Pata asada para reuniones y celebraciones.',
    href: '/pata-asada-gran-canaria',
  },
  {
    id: 'arroz-negro',
    name: 'Arroz negro con gambas',
    image: '/images/arimar-20261023-arroz-negro.webp',
    alt: 'Arroz negro con gambas preparado para llevar en una bandeja blanca',
    category: 'Arroces',
    description: 'Un ejemplo de los arroces que preparamos según el día.',
    href: '/carta',
  },
  {
    id: 'mousse-limon',
    name: 'Mousse de limón',
    image: '/images/arimar-20261023-mousse-limon.webp',
    alt: 'Mousse de limon de AriMar en un vaso de postre',
    category: 'Postres',
    description: 'Una propuesta dulce y refrescante para terminar.',
    href: '/carta',
  },
]
