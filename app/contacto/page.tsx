import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contacto | AriMar FoodLab – Playa de Arinaga',
  description:
    'Contacto de AriMar FoodLab en Playa de Arinaga (Agüimes), Gran Canaria: WhatsApp, ubicación en Google Maps, horario y cómo llegar.',
  openGraph: {
    title: 'Contacto | AriMar FoodLab – Playa de Arinaga',
    description:
      'Contacto de AriMar FoodLab en Playa de Arinaga (Agüimes), Gran Canaria: WhatsApp, ubicación en Google Maps, horario y cómo llegar.',
    type: 'website',
  },
  alternates: {
    canonical: '/contacto',
  },
}

export default function ContactoPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Ubicación y horario
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Dudas, encargos o sugerencias? Escríbenos y te ayudamos.
          </p>
        </header>

        {/* Bloque WhatsApp + Ari */}
        <section className="mb-16" aria-labelledby="whatsapp-heading">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 id="whatsapp-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
                  WhatsApp
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Es la forma más rápida de hablar con nosotros.
                </p>
                <p className="text-slate-500 text-sm mb-6">
                  Si es para un día concreto, dinos hora aproximada y lo preparamos.
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Hablar por WhatsApp
                </a>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="w-40 h-40 rounded-2xl bg-primary-50/30 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/Ari.png"
                    alt="Ari, la mascota de AriMar"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-slate-600 mt-3 text-center md:text-right">
                  Soy Ari 😊 Escríbenos y te ayudamos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación + mapa */}
        <section className="mb-16" aria-labelledby="ubicacion-heading">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 id="ubicacion-heading" className="text-2xl font-bold text-slate-800 tracking-tight">Ubicación</h2>
            </div>
            <p className="text-slate-800 font-semibold mb-1">AriMar FoodLab</p>
            <p className="text-slate-600 leading-relaxed mb-4">
              {siteConfig.address.street}<br />
              {siteConfig.address.locality}<br />
              {siteConfig.address.municipality}, {siteConfig.address.region}<br />
              {siteConfig.address.country}
            </p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
            >
              Ver en Google Maps
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-3">Cómo llegar</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed mb-8">
              <li>Recogida en local (sin comedor).</li>
              <li>Acceso rápido desde la avenida principal.</li>
              <li>Si vienes de la playa, estás a un paseo.</li>
            </ul>
            {siteConfig.mapsEmbedUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  title="Ubicación de AriMar FoodLab en Google Maps"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* Horario de recogida */}
        <section className="mb-16" aria-labelledby="horario-heading">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 id="horario-heading" className="text-2xl font-bold text-slate-800 tracking-tight">Horario de recogida</h2>
            </div>
            <p className="text-slate-600 mb-1">
              <span className="font-medium text-slate-800">Todos los días</span> — 11:30 – 16:00
            </p>
            <p className="text-slate-500 text-xs italic">
              *En días especiales puede variar. Actualizamos en Google Maps.*
            </p>
          </div>
        </section>

        {/* CTA final: ¿Hablamos? */}
        <section className="mb-16 text-center" aria-labelledby="hablamos-heading">
          <div className="bg-slate-50 rounded-2xl p-10 md:p-12">
            <h2 id="hablamos-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              ¿Hablamos?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              Si quieres reservar para un día concreto o preguntar qué hay hoy, escríbenos por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hablar por WhatsApp
              </a>
              <Link
                href="/carta"
                className="w-full sm:w-auto inline-flex justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Descubrir la carta
              </Link>
              <Link
                href="/proximamente"
                className="text-slate-500 text-sm font-medium hover:text-slate-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                Pedir (próximamente)
              </Link>
            </div>
          </div>
        </section>

        {/* SEO: texto indexable */}
        <section className="pt-8 border-t border-slate-200" aria-labelledby="seo-heading">
          <h2 id="seo-heading" className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
            AriMar FoodLab – Comida casera y freiduría para llevar en Playa de Arinaga
          </h2>
          <div className="max-w-3xl space-y-4 text-slate-600 leading-relaxed">
            <p>
              Tu opción diaria de comida rica y fresca para llevar en Playa de Arinaga (Agüimes, Gran Canaria). Todo para recoger en local: sin comedor, enfocado 100% en takeaway express a casa, oficina o playa.
            </p>
            <p>
              Platos rotativos cada día según temporada y producción: pollo asado fresco, cremas y potajes de cuchara, pastas y arroces, guisos de carne o pescado, opciones vegetarianas y sin gluten. Envases compostables y etiquetas claras con nuestros ingredientes y alérgenos en cada tupper.
            </p>
            <p>
              Estamos en Avenida Polizón 67, local. Horario: todos los días 11:30 – 16:00.
            </p>
            <p>
              Para pedidos normales: usa nuestra web para indicar día y hora de recogida. Para encargos de mayor volumen: escríbenos por WhatsApp. Muy pronto abrimos – síguenos para ver avances. 🌊🍲
            </p>
          </div>

          <h2 id="faq-heading" className="text-xl font-bold text-slate-800 mt-12 mb-6 tracking-tight">
            Preguntas frecuentes
          </h2>
          <ul className="space-y-6 list-none pl-0 max-w-3xl">
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Cómo hago un encargo o reservo mi pedido?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Para pedidos normales: entra en nuestra web y selecciona día y hora de recogida. Para encargos de mayor volumen: escríbenos por WhatsApp y te ayudamos a organizarlo.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Dónde y cómo se recoge el pedido?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                En nuestro local: Avenida Polizón 67, Playa de Arinaga (Agüimes). Recogida express sin esperas largas. Consulta ubicación exacta y cómo llegar en{' '}
                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium hover:underline">
                  Google Maps
                </a>.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Incluís información de alérgenos y ingredientes?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sí, cada tupper lleva etiqueta clara con: ingredientes principales, alérgenos, fecha de caducidad y número de lote. Marcamos siempre las opciones sin gluten y vegetarianas.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Tenéis opciones sin gluten o vegetarianas?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sí, varias opciones disponibles cada día. Pásate por el local y elige con tranquilidad viendo las etiquetas.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Hacéis pollo asado?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sí, pollo asado es uno de los platos que solemos tener.
              </p>
            </li>
            <li className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-base font-semibold text-slate-800 mb-2">¿Abrís todos los días? ¿Horario?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sí, de lunes a domingo de 11:30 a 16:00. Recogida en local – sin comedor.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
