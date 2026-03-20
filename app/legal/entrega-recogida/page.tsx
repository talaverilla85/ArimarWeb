import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datos de entrega y recogida - AriMar',
  description:
    'Información sobre recogida en local, plazos y costes de entrega para pedidos de AriMar.',
}

export default function EntregaRecogidaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Datos de entrega y recogida
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Modalidad del servicio</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar opera exclusivamente con recogida en local. Actualmente no se realizan envíos a
              domicilio ni entregas mediante empresa de transporte.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Empresa de transporte</h2>
            <p className="text-slate-600 leading-relaxed">
              No aplica. No existe empresa de transporte asignada porque todos los pedidos se recogen en
              nuestro establecimiento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Plazos de entrega</h2>
            <p className="text-slate-600 leading-relaxed">
              No aplica envío. La disponibilidad y hora de recogida se muestran durante el proceso de pedido
              en la plataforma de compra.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Gastos de envío</h2>
            <p className="text-slate-600 leading-relaxed">
              No hay gastos de envío, ya que no se presta servicio de reparto. El cliente recoge su pedido
              en local.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
