import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Croquetas caseras 100 % sin gluten en Gran Canaria | AriMar',
  description: 'Croquetas artesanas sin gluten y sin lactosa, excepto las de queso de cabra: jamón, queso de cabra y cebolla, atún y piquillo, y pollo asado. Raciones de 9 unidades en Playa de Arinaga.',
  alternates: { canonical: '/croquetas-sin-gluten-gran-canaria' },
}

const variedades = [
  {
    numero: '01',
    nombre: 'Jamón',
    subtitulo: 'La clásica',
    sinLactosa: true,
    descripcion: 'El sabor del jamón se integra en una masa cremosa y suave, con el contraste de un exterior dorado y crujiente.',
  },
  {
    numero: '02',
    nombre: 'Queso de cabra y cebolla',
    subtitulo: 'Con personalidad',
    sinLactosa: false,
    descripcion: 'El carácter del queso de cabra se combina con la suavidad y el dulzor de la cebolla. Una croqueta de sabor intenso y textura cremosa.',
  },
  {
    numero: '03',
    nombre: 'Atún y piquillo',
    subtitulo: 'Sabores que combinan',
    sinLactosa: true,
    descripcion: 'Una combinación de atún y pimientos del piquillo en una masa delicada y equilibrada, pensada para disfrutar de ambos sabores.',
  },
  {
    numero: '04',
    nombre: 'Pollo asado',
    subtitulo: 'De nuestra cocina',
    sinLactosa: true,
    descripcion: 'El sabor del pollo asado da lugar a una croqueta jugosa, con gusto profundo y un interior especialmente cremoso.',
  },
]

export default function Page() {
  return (
    <main className="bg-[#fffdf8] text-[#283c31]">
      <header className="overflow-hidden bg-[#f5e8d2] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.5fr_0.75fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#876643]">Hechas a mano · Playa de Arinaga</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight md:text-6xl">
              Croquetas caseras <span className="text-[#a2643d]">100 % sin gluten</span> en Gran Canaria
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#62594b] md:text-xl">
              Cuatro variedades elaboradas a mano. Cremosas por dentro, crujientes por fuera y, salvo las de queso de cabra, también sin lactosa.
            </p>
            <a href="#sabores" className="mt-9 inline-flex rounded-full bg-[#315840] px-7 py-3 font-semibold text-white hover:bg-[#254833]">Descubre los cuatro sabores ↓</a>
          </div>
          <div className="relative flex flex-col items-center justify-center border-[10px] border-double border-[#d7b88b] bg-[#fff7e9] px-6 py-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.21em] text-[#865f3e]">Nuestra ración</p>
            <p className="mt-3 text-8xl font-black leading-none tracking-tight text-[#3c6149]">9</p>
            <p className="mt-2 text-xl font-bold text-[#3c6149]">croquetas</p>
            <p className="mt-6 max-w-xs border-t border-[#dabf98] pt-5 text-sm leading-relaxed text-[#6f6453]">También puedes consultarnos cantidades mayores.</p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.3fr] md:gap-20 md:py-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.19em] text-[#aa744d]">El secreto está en el cuidado</p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">Una croqueta de verdad, sin gluten.</h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>Preparamos cada masa incorporando los ingredientes de su variedad. Buscamos una textura suave y cremosa sin renunciar al sabor de siempre.</p>
          <p>Formamos las croquetas a mano y las rebozamos con ingredientes sin gluten. Al freírlas, el exterior queda crujiente y contrasta con el interior cremoso.</p>
          <p className="border-l-4 border-[#c5905e] bg-[#fbf1e6] px-5 py-4 text-base text-[#655441]"><strong>Importante:</strong> todas las variedades son sin gluten. Las de jamón, atún y piquillo, y pollo asado también son sin lactosa. Las de queso de cabra y cebolla contienen lácteos.</p>
        </div>
      </section>

      <section id="sabores" className="bg-[#edf3ec] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-5 border-b-2 border-[#496f55] pb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#497552]">La carta de croquetas</p>
              <h2 className="text-3xl font-bold md:text-5xl">Cuatro sabores. Una misma filosofía.</h2>
            </div>
            <p className="text-sm font-semibold text-[#497552]">Todas sin gluten · 3 variedades sin lactosa</p>
          </div>
          <div className="grid gap-x-14 md:grid-cols-2">
            {variedades.map((v) => (
              <article key={v.numero} className="border-b border-[#c6d4c5] py-8 md:py-11">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="font-serif text-5xl italic text-[#8fac95]">{v.numero}</p>
                  <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${v.sinLactosa ? 'bg-white text-[#366846]' : 'bg-[#f7e4cf] text-[#805334]'}`}>
                    {v.sinLactosa ? 'Sin gluten · Sin lactosa' : 'Sin gluten · Con lácteos'}
                  </span>
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#718575]">{v.subtitulo}</p>
                <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">{v.nombre}</h3>
                <p className="max-w-lg leading-relaxed text-[#5c6a5f]">{v.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1fr] md:items-center md:gap-20 md:py-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#a16a42]">Para disfrutar a tu manera</p>
          <h2 className="text-3xl font-bold md:text-4xl">Nueve croquetas. Cuatro sabores para elegir.</h2>
          <p className="mt-6 leading-relaxed text-slate-600">Nuestra ración habitual es de 9 unidades. Para cantidades mayores o para consultar la disponibilidad de croquetas congeladas, ponte en contacto con AriMar.</p>
        </div>
        <div className="border-l-4 border-[#bd895a] bg-[#f8efdf] p-8 md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8a633f]">AriMar · Playa de Arinaga</p>
          <p className="mb-7 text-xl font-semibold leading-relaxed">¿Quieres consultar variedades, cantidades o disponibilidad?</p>
          <a href="mailto:info@arimarfoodlab.es?subject=Consulta%20sobre%20croquetas%20AriMar" className="inline-block rounded-full bg-[#315840] px-7 py-3 font-semibold text-white hover:bg-[#254833]">Pregúntanos por las croquetas →</a>
          <p className="mt-5 text-xs leading-relaxed text-[#77695a]">La disponibilidad puede variar. Recogida en nuestro establecimiento.</p>
        </div>
      </section>
    </main>
  )
}
