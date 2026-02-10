import type { Metadata } from 'next'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contacto - AriMar',
  description: 'Contacta con AriMar en Playa de Arinaga, Gran Canaria. WhatsApp, ubicación y horarios.',
  openGraph: {
    title: 'Contacto - AriMar',
    description: 'Contacta con nosotros en Playa de Arinaga, Gran Canaria.',
    type: 'website',
  },
}

export default function ContactoPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Contacto
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte
          </p>
        </div>

        {/* WhatsApp CTA */}
        <section className="mb-16">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Escríbenos por WhatsApp y te responderemos lo antes posible
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Abrir WhatsApp
            </a>
          </div>
        </section>

        {/* Ubicación */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Ubicación</h2>
            </div>
            <p className="text-lg text-slate-600 mb-4">
              <strong className="text-slate-800">AriMar</strong>
            </p>
            <p className="text-lg text-slate-600 mb-4">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.locality}
              <br />
              {siteConfig.address.municipality}
              <br />
              {siteConfig.address.region}, {siteConfig.address.country}
            </p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-800 font-semibold hover:underline"
            >
              Ver en Google Maps
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

        {/* Horario */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Horario</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Todos los días</span>
                <span className="text-slate-800 font-semibold">11:30 - 16:00</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-slate-50 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            ¿Listo para hacer tu pedido?
          </h2>
          <p className="text-slate-600 mb-6">
            Haz tu pedido ahora y disfruta de la calidad AriMar
          </p>
          <a
            href="/proximamente"
            className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            Hacer pedido
          </a>
        </div>
      </div>
    </div>
  )
}

