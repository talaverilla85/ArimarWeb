import type { Metadata } from 'next'
import Link from 'next/link'
import { buildFaqPageJsonLd, faqCanonicalPath, siteFaqItems } from '@/lib/faqContent'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sin gluten | AriMar FoodLab – Playa de Arinaga',
  description:
    'Respuestas sobre carta 100 % sin gluten, alérgenos, horario, ubicación y comida casera para llevar en AriMar FoodLab (Playa de Arinaga, Gran Canaria).',
  openGraph: {
    title: 'Preguntas frecuentes sin gluten | AriMar FoodLab – Playa de Arinaga',
    description:
      'Carta 100 % sin gluten, horario, ubicación, alérgenos y pedidos para llevar en AriMar FoodLab, Playa de Arinaga.',
    type: 'website',
    url: `https://arimarfoodlab.es${faqCanonicalPath}`,
  },
  alternates: {
    canonical: faqCanonicalPath,
  },
}

const faqJsonLd = buildFaqPageJsonLd(siteFaqItems)

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Preguntas frecuentes
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Aquí reunimos las dudas más habituales sobre nuestra carta 100 % sin gluten, alérgenos,
              pedidos y ubicación en Playa de Arinaga. Si no encuentras lo que buscas,{' '}
              <Link
                href="/contacto"
                className="text-primary-600 font-semibold underline underline-offset-2 hover:decoration-2"
              >
                escríbenos desde contacto
              </Link>
              .
            </p>
          </header>

          <ul className="space-y-6 list-none pl-0">
            {siteFaqItems.map((item) => (
              <li
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.answer}</p>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center text-slate-600 text-sm">
            <Link href="/hoy" className="text-primary-600 font-semibold hover:underline">
              Ver carta 100% sin gluten
            </Link>
            {' · '}
            <Link href="/contacto" className="text-primary-600 font-semibold hover:underline">
              Ubicación y horario
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
