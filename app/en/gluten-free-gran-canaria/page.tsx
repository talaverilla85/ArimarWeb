import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SIN_GLUTEN_ALT, SIN_GLUTEN_IMAGE } from '@/components/SinGlutenBlock'

export const metadata: Metadata = {
  title: 'Gluten Free Gran Canaria: 100% Gluten-Free Food | AriMar',
  description:
    '100% gluten-free takeaway food in Gran Canaria. Homemade dishes, fried food and online ordering for collection at AriMar in Playa de Arinaga.',
  alternates: {
    canonical: '/en/gluten-free-gran-canaria',
    languages: {
      'es-ES': '/sin-gluten-gran-canaria',
      'en': '/en/gluten-free-gran-canaria',
    },
  },
  openGraph: {
    title: 'Gluten Free Gran Canaria: 100% Gluten-Free Food | AriMar',
    description:
      'A 100% gluten-free takeaway in Gran Canaria. Order online and collect in Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/en/gluten-free-gran-canaria',
  },
}

const faqs = [
  ['Is AriMar 100% gluten-free?', 'Yes. AriMar is a 100% gluten-free takeaway and food shop in Playa de Arinaga, Gran Canaria.'],
  ['Can I order before travelling to AriMar?', 'Yes. You can check what is available and place your order online before coming to collect it.'],
  ['Is AriMar only for people with coeliac disease?', 'No. We make homemade food for everyone, with one gluten-free menu for the whole group.'],
  ['Where is AriMar?', 'AriMar is in Playa de Arinaga, Agüimes, on the island of Gran Canaria.'],
]

export default function GlutenFreeGranCanariaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-4xl mx-auto">
        <header className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-6 py-10 md:px-10 md:py-12 mb-14 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[1fr_220px] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-3">AriMar · Playa de Arinaga · Gran Canaria</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-5 tracking-tight">100% gluten-free food in Gran Canaria</h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Visiting Gran Canaria or living on the island? AriMar is a 100% gluten-free takeaway in Playa de Arinaga,
                with homemade dishes, fried food, daily specials and desserts. Check what is available, order online and collect it from us.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/hoy" className="inline-flex justify-center px-7 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md">Order online</Link>
                <Link href="/contacto" className="inline-flex justify-center px-7 py-3 border border-primary-200 bg-white/70 text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors">Find AriMar</Link>
              </div>
            </div>
            <div className="mx-auto w-44 md:w-52">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-3 shadow-md">
                <Image src={SIN_GLUTEN_IMAGE} alt={SIN_GLUTEN_ALT} width={260} height={220} className="h-auto w-full object-contain" priority />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-12 rounded-3xl border border-slate-200 bg-white px-6 py-8 md:px-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">One menu. 100% gluten-free.</h2>
          <p className="text-slate-600 leading-relaxed">
            AriMar is not a restaurant with a few gluten-free options. Our food offer is gluten-free from the start,
            so everyone in the group can choose from the same selection. We also provide information about other allergens.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Gluten-free takeaway in Gran Canaria</h2>
            <p className="text-slate-600 leading-relaxed">Our daily selection can include homemade stews, rice dishes, meat, salads, croquettes, fried food and desserts. Availability changes with daily production.</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Order before you travel</h2>
            <p className="text-slate-600 leading-relaxed">You can place an online order before coming to Playa de Arinaga and collect it ready to take to your accommodation, the beach or the next stop on your Gran Canaria trip.</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3">100% gluten-free fried food</h2>
            <p className="text-slate-600 leading-relaxed">Our fried food is part of a food business designed around a gluten-free offer, rather than a small adapted section of a conventional menu.</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Playa de Arinaga, Agüimes</h2>
            <p className="text-slate-600 leading-relaxed">We are in Playa de Arinaga, Gran Canaria, and open every day from 11:30 to 16:00. You can choose from the display counter or order online for collection.</p>
          </section>
        </div>

        <section className="mb-12 rounded-3xl bg-slate-900 px-6 py-9 md:px-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Gluten-free food sorted before you arrive</h2>
          <p className="text-white/80 leading-relaxed mb-6">
            If you are planning a holiday in Gran Canaria, you can check AriMar before travelling, order online and collect your food when you pass through Playa de Arinaga.
          </p>
          <Link href="/hoy" className="inline-flex justify-center px-7 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">See today's food and order</Link>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">Gluten-free Gran Canaria: quick questions</h2>
          <div className="space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-800">{q}</summary>
                <p className="pt-3 text-slate-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/sin-gluten-gran-canaria" className="font-semibold text-primary-700 hover:underline">Español</Link>
          <span className="text-slate-300">·</span>
          <Link href="/carta" className="font-semibold text-primary-700 hover:underline">Menu / carta</Link>
          <span className="text-slate-300">·</span>
          <Link href="/contacto" className="font-semibold text-primary-700 hover:underline">Location & contact</Link>
        </div>
      </div>
    </div>
  )
}
