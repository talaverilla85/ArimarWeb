import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Valores - AriMar',
  description: 'Conoce la ideología de AriMar: calidad, transparencia y mejora continua en cada plato.',
  openGraph: {
    title: 'Valores - AriMar',
    description: 'Calidad, transparencia y mejora continua: nuestros valores fundamentales.',
    type: 'website',
  },
}

export default function ValoresPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nuestros Valores
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            La ideología que guía cada decisión en AriMar
          </p>
        </div>

        {/* Calidad */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-6">
                <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Calidad</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              La calidad no es negociable. Es el fundamento de todo lo que hacemos. 
              No buscamos atajos ni compromisos. Cada ingrediente se selecciona con 
              criterio, cada proceso se ejecuta con precisión, cada plato se entrega 
              con orgullo.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Para nosotros, calidad significa:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Ingredientes frescos y de proveedores de confianza</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Tecnología profesional que garantiza resultados consistentes</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Procesos estandarizados que aseguran la excelencia en cada pedido</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Equipo formado y comprometido con la excelencia</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Transparencia */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-6">
                <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Transparencia</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Creemos que tienes derecho a saber cómo trabajamos. No tenemos nada que ocultar. 
              Al contrario, estamos orgullosos de nuestros procesos y queremos compartirlos contigo.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Nuestra transparencia se refleja en:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Información clara sobre nuestros procesos y tecnología</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Comunicación honesta sobre ingredientes y alérgenos</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Apertura a preguntas y feedback de nuestros clientes</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Compromiso con prácticas éticas y sostenibles</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Mejora Continua */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-6">
                <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Mejora Continua</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              El conformismo no tiene cabida en AriMar. Siempre buscamos hacerlo mejor. 
              Cada día es una oportunidad para aprender, optimizar y superarnos.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Nuestro compromiso con la mejora continua incluye:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Escucha activa del feedback de nuestros clientes</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Formación continua de nuestro equipo</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Evaluación constante de nuestros procesos</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Inversión en tecnología y equipamiento que mejore nuestros resultados</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-slate-800 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Innovación constante en recetas y técnicas culinarias</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-slate-50 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Valores que se sienten en cada plato
          </h2>
          <p className="text-slate-600 mb-6">
            Descubre la diferencia que marca nuestra forma de trabajar
          </p>
          <Link
            href="/proximamente"
            className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            Hacer pedido
          </Link>
        </div>
      </div>
    </div>
  )
}

