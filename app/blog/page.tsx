import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'El blog de AriMar | Celiaquía, vida sin gluten e historias de nuestra cocina',
  description: 'Sin gluten, con mucho que contar. Actualidad sobre celiaquía, alimentación sin gluten, historias de nuestra cocina y celebraciones de AriMar en Gran Canaria.',
  alternates: { canonical: '/blog' },
}

const secciones = [
  {
    id: 'vivir-sin-gluten',
    numero: '01',
    tema: 'Conocer',
    titulo: 'Vivir sin gluten',
    descripcion: 'Información útil sobre celiaquía, alimentación sin gluten y el día a día. Historias y contenidos prácticos, contrastados y contados con claridad.',
    detalle: 'Celiaquía · Alimentación · Vida cotidiana',
  },
  {
    id: 'eventos-arimar',
    numero: '02',
    tema: 'Compartir',
    titulo: 'AriMar en eventos',
    descripcion: 'Celebraciones, encargos especiales y momentos que merecen ser recordados. Aquí contaremos experiencias reales en las que nuestra cocina ha estado presente.',
    detalle: 'Celebraciones · Encuentros · Historias reales',
  },
  {
    id: 'dentro-de-arimar',
    numero: '03',
    tema: 'Descubrir',
    titulo: 'Dentro de AriMar',
    descripcion: 'Lo que se cuece entre fogones: novedades, nuevos platos y pequeños detalles del trabajo que hacemos cada día en Playa de Arinaga.',
    detalle: 'Cocina · Elaboraciones · Novedades',
  },
]

export default function BlogPage() {
  return (
    <main className="bg-[#fbfaf6] text-slate-900">
      <header className="overflow-hidden border-b border-[#dfded6] bg-[#f5f0e5] px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between border-y border-[#c8cfc4] py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#426353] md:text-xs">
            <span>Historias y actualidad</span>
            <span>AriMar · Gran Canaria</span>
          </div>
          <div className="grid items-end gap-10 pt-14 md:grid-cols-[minmax(0,1.65fr)_minmax(0,0.8fr)] md:pt-20">
            <div>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#47715b]">
                Una mirada a la vida sin gluten
              </p>
              <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.07] tracking-tight text-[#22352d] sm:text-6xl md:text-7xl">
                Sin gluten, <span className="italic text-[#538569]">con mucho</span> que contar
              </h1>
              <h2 className="mt-9 border-l-4 border-[#c89a66] pl-5 text-2xl font-semibold text-[#254634] md:text-3xl">
                El blog de AriMar
              </h2>
            </div>
            <div className="border-t-2 border-[#254634] pt-6 md:mb-2">
              <p className="text-xl leading-relaxed text-[#4b584e]">
                Historias de nuestra cocina, celebraciones y noticias que importan a quienes viven sin gluten.
              </p>
              <a href="#explorar" className="mt-8 inline-flex items-center gap-3 font-semibold text-[#256049] underline decoration-[#c89a66] underline-offset-8">
                Explorar el blog <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
          <p className="mt-14 border-t border-[#c8cfc4] pt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#697469]">
            Historias auténticas · Ideas para compartir · Sin gluten
          </p>
        </div>
      </header>

      <section id="explorar" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#537965]">Tres maneras de descubrirnos</p>
            <h2 className="text-3xl font-bold leading-tight text-[#22352d] md:text-4xl">Una revista de historias cercanas.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Un espacio para aprender, descubrir y compartir. Queremos hablar de lo que pasa dentro de AriMar, pero también de todo lo que hay fuera de nuestra cocina.
          </p>
        </div>
        <div className="mt-14 border-t-2 border-[#30483a]">
          {secciones.map((seccion) => (
            <article key={seccion.id} id={seccion.id} className="grid gap-4 border-b border-[#d7ddd3] py-9 md:grid-cols-[90px_1fr_1.15fr] md:gap-9 md:py-12">
              <p className="text-4xl font-light text-[#ba9162]">{seccion.numero}</p>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#567a63]">{seccion.tema}</p>
                <h3 className="text-2xl font-bold leading-tight text-[#233b2f] md:text-3xl">{seccion.titulo}</h3>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{seccion.detalle}</p>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">{seccion.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#243c31] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c1d9c7]">Próximamente</p>
            <h2 className="text-3xl font-bold md:text-4xl">Las primeras historias están por llegar.</h2>
          </div>
          <p className="self-center text-lg leading-relaxed text-[#d8e5dc]">
            Publicaremos artículos útiles y experiencias reales, con sus fuentes y fotografías cuando corresponda. Preferimos empezar con buenas historias antes que llenar este espacio de publicaciones sin valor.
          </p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-[#254634]">De nuestra cocina a tu mesa.</p>
        <div className="flex flex-wrap gap-5 text-sm font-semibold text-[#306749]">
          <Link href="/croquetas-sin-gluten-gran-canaria" className="underline underline-offset-4">Nuestras croquetas</Link>
          <Link href="/comida-para-eventos-gran-canaria" className="underline underline-offset-4">Comida para eventos</Link>
        </div>
      </footer>
    </main>
  )
}
