import Image from 'next/image'

const items = [
  { title: 'Producción por lotes', text: 'Cocinamos en tandas para que siempre tengas platos listos, ricos y sin prisas.' },
  { title: 'Raciones claras', text: 'Porciones equilibradas y etiquetadas. Para comer bien y no desperdiciar.' },
  { title: 'Cocina profesional, trato cercano', text: 'Equipo pro para clavar el punto… y sabor de los que apetece repetir.' },
  { title: 'Misma calidad cada día', text: 'Si vienes hoy o mañana, quieres lo mismo: que esté igual de bueno.' },
]

export default function CocinamosBlock() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
              Cómo cocinamos
            </h2>
            <p className="text-sm md:text-base text-slate-600 mb-6">
              Hecho en Playa de Arinaga, para llevarte el sabor de casa donde quieras.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm flex flex-col gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
                    •
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
            <Image
              src="/images/cocina-lote-linea.webp"
              alt="Cocina con producción por lotes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
