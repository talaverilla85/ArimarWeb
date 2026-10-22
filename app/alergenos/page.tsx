import type { Metadata } from 'next'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/siteConfig'

// Pausa temporal de consulta pública. El componente AlergenosClient permanece intacto
// para recuperarlo cuando se validen todas las fichas en ARIST.
export const metadata: Metadata = {
  title: 'Carta de alérgenos en revisión | AriMar',
  description: 'La consulta online de alérgenos de AriMar se encuentra temporalmente en revisión. Para información sobre un plato, consúltanos antes de pedir.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/alergenos' },
}

export default function AlergenosPage() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto rounded-3xl border border-primary-100 bg-white p-7 sm:p-10 shadow-sm text-center">
        <p className="text-sm font-semibold tracking-wide uppercase text-primary-700 mb-4">AriMar · Información alimentaria</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-5">
          Carta de alérgenos temporalmente en revisión
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 mb-5">
          Estamos actualizando las fichas de nuestras elaboraciones. Por el momento,
          la consulta online de alérgenos no está disponible.
        </p>
        <p className="text-slate-600 leading-relaxed mb-8">
          Si necesitas conocer los ingredientes o alérgenos de algún plato, consulta
          con nuestro equipo antes de realizar el pedido. Podemos comprobar contigo
          la información del producto concreto.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppUrl('Hola, AriMar. Quisiera consultar los ingredientes y alérgenos de un plato antes de pedir.')}
            className="inline-flex justify-center rounded-lg bg-primary-500 px-7 py-3 text-white font-semibold hover:bg-primary-600"
          >
            Consultar por WhatsApp
          </a>
          <Link href="/contacto" className="inline-flex justify-center rounded-lg border border-primary-200 px-7 py-3 text-primary-700 font-semibold hover:bg-primary-50">
            Contacto y ubicación
          </Link>
        </div>
      </div>
    </section>
  )
}
