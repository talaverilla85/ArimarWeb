import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Próximamente - AriMar',
  description:
    'Pedir online estará disponible muy pronto. AriMar, comida para llevar en Playa de Arinaga.',
}

export default function ProximamentePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Próximamente
        </h1>

        {/* Mensaje claro sobre pedidos online */}
        <p className="text-xl text-slate-600 mb-10">
          <strong>Pedir online estará disponible muy pronto.</strong> Mientras
          tanto, estamos encantados de atenderte y resolver cualquier duda.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 items-center mb-6">
          {/* CTA principal: Visítanos */}
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            Visítanos
          </Link>

          {/* CTA secundario: Síguenos → IG/FB */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.instagram.com/arimarfoodlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-primary-500 text-primary-500 text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Síguenos en Instagram
            </a>
            <a
              href="https://www.facebook.com/AriMarFoodLab/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-primary-500 text-primary-500 text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Síguenos en Facebook
            </a>
          </div>
        </div>

        {/* Aclaración sobre WhatsApp: solo información */}
        <p className="text-sm text-slate-500">
          El WhatsApp de AriMar está disponible solo para ofrecerte{' '}
          <strong>información y resolver consultas</strong>. Los pedidos online
          se activarán en esta página muy pronto.
        </p>
      </div>
    </div>
  )
}
