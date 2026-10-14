import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'El blog de AriMar | Celiaquía, vida sin gluten e historias de nuestra cocina',
  description: 'Sin gluten, con mucho que contar. Actualidad sobre celiaquía, alimentación sin gluten, historias de la cocina y celebraciones de AriMar en Gran Canaria.',
  alternates: { canonical: '/blog' },
}

const categorias = [
  {
    id: 'vivir-sin-gluten',
    numero: '01',
    titulo: 'Vivir sin gluten',
    descripcion: 'Información útil sobre celiaquía, alimentación sin gluten y hábitos cotidianos. Queremos compartir contenidos claros, prácticos y basados en fuentes fiables.',
    etiqueta: 'Información y consejos',
  },
  {
    id: 'eventos-arimar',
    numero: '02',
    titulo: 'AriMar en eventos',
    descripcion: 'Celebraciones, encargos especiales y momentos compartidos. Aquí contaremos historias reales de los eventos en los que nuestra cocina ha estado presente.',
    etiqueta: 'Historias para compartir',
  },
  {
    id: 'dentro-de-arimar',
    numero: '03',
    titulo: 'Dentro de AriMar',
    descripcion: 'Nuevas elaboraciones, pequeños detalles de nuestro trabajo y novedades de la casa. Una ventana a lo que ocurre detrás de cada plato.',
    etiqueta: 'Nuestra cocina',
  },
]

export default function BlogPage() {
  return (
    <main className="bg-[#fafbf9] text-slate-900">
      <header className="bg-slate-900 px-6 py-20 md:py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            AriMar · Playa de Arinaga
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Sin gluten, con mucho que contar
          </h1>
          <h2 className="mt-6 text-2xl font-semibold text-emerald-200 md:text-3xl">
            El blog de AriMar
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
            Actualidad sobre celiaquía, historias de nuestra cocina, celebraciones y todo lo que sucede alrededor de AriMar.
          </p>
          <a
            href="#descubre"
            className="mt-9 inline-block rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Descubre de qué hablamos ↓
          </a>
        </div>
      </header>

      <section id="descubre" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Un espacio para compartir
        </p>
        <h2 className="mb-5 max-w-3xl text-3xl font-bold md:text-4xl">
          Porque vivir sin gluten también está lleno de historias
        </h2>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-slate-600">
          No queremos hablar solo de nuestros platos. Este espacio nace para compartir información interesante, contar lo que hacemos y dar voz a los momentos que nos reúnen alrededor de una mesa.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {categorias.map((categoria) => (
            <article
              id={categoria.id}
              key={categoria.id}
              className="flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/60 p-7 shadow-sm shadow-emerald-950/5"
            >
              <p className="mb-6 text-sm font-semibold tracking-widest text-emerald-700">
                {categoria.numero} · {categoria.etiqueta}
              </p>
              <h3 className="mb-4 text-2xl font-bold">{categoria.titulo}</h3>
              <p className="leading-relaxed text-slate-600">{categoria.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf2ee] px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-2xl border border-emerald-200 bg-white/90 p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Próximas publicaciones
          </p>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Estamos preparando las primeras historias
          </h2>
          <p className="max-w-3xl leading-relaxed text-slate-600">
            Aquí aparecerán nuestros artículos sobre vida sin gluten, novedades de AriMar y celebraciones reales. Queremos publicar contenido cuidado, útil y con fotografías auténticas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="mb-4 text-2xl font-bold">Conoce AriMar</h2>
        <p className="mb-6 max-w-3xl leading-relaxed text-slate-600">
          Somos una casa de comidas 100 % sin gluten en Playa de Arinaga, Gran Canaria. Si quieres conocer algunas de nuestras elaboraciones, puedes empezar por aquí.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/croquetas-sin-gluten-gran-canaria" className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white">
            Nuestras croquetas
          </Link>
          <Link href="/comida-para-eventos-gran-canaria" className="rounded-xl border border-emerald-200 px-6 py-3 font-semibold text-emerald-800">
            Comida para eventos
          </Link>
        </div>
      </section>
    </main>
  )
}
