import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AriMar PRO | Elaboraciones sin gluten para profesionales',
  description: 'Suministro de elaboraciones 100 % sin gluten para hostelería y comercios de Gran Canaria. Consulta formatos y condiciones.',
  alternates: { canonical: '/profesionales' },
}

const soluciones = [
  { numero: '01', titulo: 'Croquetas artesanas', texto: 'Cuatro variedades elaboradas en nuestra cocina 100 % sin gluten. Los formatos y las cantidades para profesionales se concretan según cada solicitud.' },
  { numero: '02', titulo: 'Carnes y platos preparados', texto: 'Elaboraciones para negocios que buscan ampliar su oferta sin gluten. Consulta las opciones disponibles y sus condiciones de conservación.' },
  { numero: '03', titulo: 'Suministro adaptado', texto: 'Estudiamos con cada establecimiento las cantidades, los formatos y la frecuencia de suministro.' },
]

export default function Page() {
  return (
    <main className="bg-[#f7f9f8] text-[#1e3330]">
      <header className="relative overflow-hidden bg-[#19363a] px-6 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_0.8fr] md:items-end">
          <div>
            <p className="mb-7 inline-block border-b border-[#8db9ad] pb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#a7d7c7]">AriMar PRO / Gran Canaria</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Elaboraciones 100 % sin gluten <span className="text-[#a4d4c3]">para profesionales</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#d1e2de]">
              Una propuesta para restaurantes, cafeterías y tiendas que quieren incorporar productos preparados en una cocina especializada sin gluten.
            </p>
          </div>
          <aside className="border-l-2 border-[#9dcbbb] bg-white/10 p-7 md:mb-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#b9dfd2]">Trabajemos juntos</p>
            <p className="mb-6 text-lg leading-relaxed text-white">Cuéntanos qué necesita tu negocio. Estudiamos cada solicitud de forma individual.</p>
            <a href="mailto:info@arimarfoodlab.es?subject=AriMar%20PRO%20-%20Solicitud%20de%20informaci%C3%B3n" className="inline-flex w-full items-center justify-center bg-[#d9ecdf] px-5 py-3 font-bold text-[#19363a] hover:bg-white">Consultar condiciones ↗</a>
          </aside>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#37745d]">AriMar / Para negocios</p>
            <h2 className="text-3xl font-bold md:text-4xl">Productos que pueden encajar en tu establecimiento.</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-slate-600">Partimos de nuestras elaboraciones y valoramos el formato más adecuado para cada cliente profesional. Sin catálogo cerrado ni condiciones inventadas.</p>
        </div>
        <div className="mt-14 border-t-2 border-[#28594d]">
          {soluciones.map((s) => (
            <article key={s.numero} className="grid gap-4 border-b border-[#d5e0db] py-8 md:grid-cols-[100px_1fr_1.25fr] md:items-start md:gap-8">
              <p className="text-3xl font-light text-[#5f8b7b]">{s.numero}</p>
              <h3 className="text-2xl font-bold">{s.titulo}</h3>
              <p className="max-w-xl leading-relaxed text-slate-600">{s.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d0e0d8] bg-[#e7f0eb] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3f7d68]">Próxima incorporación</p>
            <h2 className="text-3xl font-bold md:text-4xl">Catálogo de elaboraciones</h2>
          </div>
          <div>
            <p className="mb-5 text-lg leading-relaxed text-slate-700">Estamos preparando el listado de productos para profesionales. Lo incorporaremos cuando estén definidos sus formatos y disponibilidad.</p>
            <p className="border-l-4 border-[#5c9b81] pl-5 text-slate-600">Mientras tanto, puedes escribirnos para consultar productos concretos, cantidades y opciones de suministro.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">¿Hablamos de tu negocio?</h2>
          <p className="mt-2 text-slate-600">Cada propuesta se confirma según producto, capacidad y logística.</p>
        </div>
        <a href="mailto:info@arimarfoodlab.es?subject=AriMar%20PRO%20-%20Solicitud%20de%20informaci%C3%B3n" className="inline-flex justify-center bg-[#285f50] px-7 py-4 font-semibold text-white hover:bg-[#204d40]">Solicitar información profesional →</a>
      </section>
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <Link href="/" className="text-sm font-semibold text-[#37745d] underline underline-offset-4">Volver a AriMar</Link>
      </div>
    </main>
  )
}
