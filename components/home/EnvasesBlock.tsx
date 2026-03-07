import Image from 'next/image'

export default function EnvasesBlock() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 order-2 lg:order-1">
            <Image
              src="/images/packaging-tupper.webp"
              alt="Envases y packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
              Así te lo llevas
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">Envases compostables.</strong> Ligeros y limpios, pensados para el día a día.
              </p>
              <p>
                <strong className="text-slate-800">Etiquetado claro.</strong> Fecha, ingredientes y alérgenos. Fácil y transparente.
              </p>
              <p>
                <strong className="text-slate-800">Listo para Arinaga.</strong> Aguanta el trayecto y llega perfecto a casa o la playa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
