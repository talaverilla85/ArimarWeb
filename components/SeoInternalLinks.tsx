import Link from 'next/link'

const seoLinks = [
  { href: '/sin-gluten-gran-canaria', label: 'Comida 100% sin gluten en Gran Canaria' },
  { href: '/freiduria-sin-gluten-gran-canaria', label: 'Freiduría sin gluten' },
  { href: '/comida-para-llevar-sin-gluten-gran-canaria', label: 'Comida para llevar sin gluten' },
  { href: '/comida-sin-gluten-playa-de-arinaga', label: 'Sin gluten en Playa de Arinaga' },
  { href: '/carta', label: 'Carta' },
  { href: '/alergenos', label: 'Alérgenos' },
]

export default function SeoInternalLinks({ className = '' }: { className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-7 shadow-sm ${className}`}
      aria-labelledby="enlaces-sin-gluten-heading"
    >
      <h2 id="enlaces-sin-gluten-heading" className="text-xl md:text-2xl font-bold text-slate-800 mb-4 tracking-tight">
        También te puede interesar
      </h2>
      <ul className="flex flex-wrap gap-2 list-none pl-0">
        {seoLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-full border border-primary-100 bg-primary-50/70 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
