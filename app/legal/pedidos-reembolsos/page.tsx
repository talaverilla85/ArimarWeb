import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Anulación de pedidos, devoluciones y reembolsos - AriMar',
  description:
    'Política de anulación de pedidos, devoluciones y reembolsos de AriMar para pedidos de recogida en local.',
}

export default function PedidosReembolsosPage() {
  const phoneDisplay = `+34 ${siteConfig.whatsappPhoneE164.slice(3)}`

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Anulación de pedidos, devoluciones y reembolsos
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Ámbito y canal de compra</h2>
            <p className="text-slate-600 leading-relaxed">
              Los pedidos se realizan desde nuestra web y se formalizan en la plataforma externa de pedidos
              online (Qamarero), con modalidad exclusiva de recogida en local.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Anulación de pedidos</h2>
            <p className="text-slate-600 leading-relaxed">
              Si necesita anular un pedido, debe contactar lo antes posible por WhatsApp o teléfono.
              Se intentará gestionar la anulación siempre que el pedido no haya entrado en fase de preparación.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Teléfono / WhatsApp: {phoneDisplay}</li>
              <li>Correo electrónico: {siteConfig.legal.email}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Devoluciones</h2>
            <p className="text-slate-600 leading-relaxed">
              Por tratarse de productos alimentarios perecederos y preparados para consumo, no se admiten
              devoluciones una vez entregado el pedido, salvo en casos de producto defectuoso, error en la
              preparación o incidencia imputable al establecimiento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Reembolsos</h2>
            <p className="text-slate-600 leading-relaxed">
              En caso de incidencia justificada, se evaluará el caso y, cuando corresponda, se realizará
              el reembolso total o parcial por el mismo medio de pago utilizado en la compra, conforme a
              los plazos de la entidad de pago.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Atención de incidencias</h2>
            <p className="text-slate-600 leading-relaxed">
              Para cualquier incidencia relacionada con pedidos, puede contactar con nosotros aportando:
              nombre, fecha, hora estimada de recogida y detalle de la incidencia para su revisión.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
