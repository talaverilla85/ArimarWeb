import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Gluten-Free Gran Canaria | 100% Gluten-Free Food | AriMar',
  description:
    "Looking for gluten-free food in Gran Canaria? AriMar is a 100% gluten-free takeaway in Playa de Arinaga. See today's dishes, order online and collect.",
  alternates: {
    canonical: '/en/gluten-free-gran-canaria',
    languages: {
      'es-ES': '/sin-gluten-gran-canaria',
      'en': '/en/gluten-free-gran-canaria',
    },
  },
  openGraph: {
    title: 'Gluten-Free Gran Canaria | 100% Gluten-Free Food | AriMar',
    description:
      'Homemade gluten-free takeaway in Gran Canaria. Explore the daily selection, order online and collect in Playa de Arinaga.',
    type: 'website',
    url: 'https://arimarfoodlab.es/en/gluten-free-gran-canaria',
    locale: 'en_GB',
    images: [
      {
        url: '/images/arimar-vitrina-comida-para-llevar.webp',
        alt: 'The AriMar display counter with freshly prepared gluten-free food to take away',
      },
    ],
  },
}

const travellerQuestions = [
  {
    question: 'Where can I find gluten-free takeaway food in Gran Canaria?',
    answer:
      'Visit AriMar at Avenida Polizón 67 in Playa de Arinaga, Agüimes, Gran Canaria. We prepare homemade food in a 100% gluten-free kitchen, available to take away. Check our daily selection before travelling.',
  },
  {
    question: 'Is all the food at AriMar gluten-free?',
    answer:
      'Yes. Our entire food selection is made without gluten-containing ingredients, rather than having just a few adapted dishes. We also provide information about other ingredients and allergens, so you can check individual dishes before ordering.',
  },
  {
    question: 'I have coeliac disease. Can I ask about ingredients and allergens?',
    answer:
      'Of course. AriMar is a 100% gluten-free food business, and you can ask our team about ingredients and other allergens before choosing. You can also check our listing with ASOCECA, the local coeliac association.',
  },
  {
    question: 'Can I order food and take it back to my holiday accommodation?',
    answer:
      'Yes. Check what is available, order online and collect your food from our shop in Playa de Arinaga. Take it back to your apartment, your hotel or the beach. We do not have a sit-down dining area or home delivery.',
  },
  {
    question: 'What gluten-free dishes can I buy?',
    answer:
      'Depending on what we cook that day, you may find roast chicken, homemade stews, rice dishes, salads, croquettes, fried food and other prepared meals. Please check the current selection, as items can sell out.',
  },
  {
    question: 'Where is AriMar and when is it open?',
    answer:
      'AriMar is at Avenida Polizón 67, Playa de Arinaga, in the south-east of Gran Canaria. Our usual opening hours are every day from 11:30 am to 4:00 pm. Check the website before making a special journey.',
  },
] as const

const directories = [
  {
    name: 'CeliNews',
    description: 'Gran Canaria gluten-free guide',
    domain: 'celinews.com',
    href: 'https://celinews.com/gran-canaria-sin-gluten-para-celiacos/',
    wordmark: 'font-bold tracking-tight',
  },
  {
    name: 'NoGluApp',
    description: 'Gluten-free discovery app',
    domain: 'nogluapp.com',
    href: 'https://nogluapp.com/restaurante/2391',
    wordmark: 'font-extrabold tracking-tight',
  },
  {
    name: 'Find Me Gluten Free',
    description: 'International gluten-free guide',
    domain: 'findmeglutenfree.com',
    href: 'https://www.findmeglutenfree.com/biz/arimar/6616784932569088',
    wordmark: 'font-bold tracking-tight',
  },
  {
    name: 'Canarias7',
    description: 'Local business directory',
    domain: 'canarias7.es',
    href: 'https://servicios.canarias7.es/empresas/arimar.html',
    wordmark: 'font-extrabold tracking-tight',
  },
] as const

const buttonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2'

export default function GlutenFreeGranCanariaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-GB',
    mainEntity: travellerQuestions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <div lang="en-GB" className="overflow-hidden bg-white pb-16 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-[#f2f9f7] via-white to-[#fbf7ef] pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.19em] text-primary-800">
              Playa de Arinaga · 100% gluten-free takeaway
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.8rem]">
              Eating gluten-free in Gran Canaria.
              <span className="mt-3 block text-primary-700">
                Without missing out on flavour.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Roast chicken, homemade stews, rice dishes, croquettes and freshly prepared meals.
              One food selection for everyone, made in our 100% gluten-free kitchen.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              Living in Gran Canaria or here on holiday? Browse today's food, order online
              and collect it from our takeaway in Playa de Arinaga.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href={siteConfig.pedirPath} className={buttonClass}>
                See today's food &amp; order <span aria-hidden="true">→</span>
              </Link>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                Find us on the map <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary-200 pt-6 text-sm font-semibold text-slate-600">
              <span>100% gluten-free</span>
              <span>Takeaway &amp; collection</span>
              <span>Playa de Arinaga</span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-2xl lg:aspect-[5/4]">
              <Image
                src="/images/arimar-vitrina-comida-para-llevar.webp"
                alt="Real photo of the AriMar display counter, filled with homemade gluten-free takeaway dishes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">
              Our food display in Playa de Arinaga. Dishes depend on daily availability.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 md:py-24" aria-labelledby="one-menu">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.86fr_1.14fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Every dish
            </p>
            <h2 id="one-menu" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              No separate gluten-free menu.
              <span className="mt-2 block text-primary-700">
                Everything we make is gluten-free.
              </span>
            </h2>
          </div>
          <div className="border-t-2 border-primary-500 pt-7">
            <p className="text-lg leading-relaxed text-slate-700">
              You won't find just one or two adapted dishes. At AriMar, our homemade
              food is made without gluten-containing ingredients — from hearty stews
              and rice dishes to croquettes and fried favourites.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              We also provide information about ingredients and other allergens.
              If you have coeliac disease or another dietary requirement, please
              ask our team about a particular dish before ordering.
            </p>
            <Link
              href="/carta"
              className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
            >
              Explore our menu <span className="font-normal">(Spanish)</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-20 md:py-24" aria-labelledby="holiday-takeaway">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
            <Image
              src="/images/arimar-20261023-ropa-vieja.webp"
              alt="Ropa vieja, a traditional Canarian dish with chickpeas and meat, prepared at AriMar without gluten"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              For locals and visitors
            </p>
            <h2 id="holiday-takeaway" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Gluten-free holiday food, without the hassle.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Heading to the beach, exploring Gran Canaria or staying in a holiday apartment?
              Pick up a homemade meal and take it with you. You can check what's cooking
              today and order before making the journey.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              We're a takeaway, not a sit-down restaurant: there is no dining room
              or delivery service. Collect from Avenida Polizón 67, Playa de Arinaga,
              Agüimes, in south-east Gran Canaria.
            </p>
            <Link
              href="/freiduria-sin-gluten-gran-canaria"
              className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
            >
              Discover our gluten-free fried food <span className="font-normal">(Spanish)</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="listed-on">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.21em] text-primary-800">
              Where we're listed
            </p>
            <h2 id="listed-on" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              You can also find AriMar on
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Find our listing with the local coeliac association, plus gluten-free
              guides and apps that help people discover places to eat in Gran Canaria.
            </p>
          </div>

          <a
            href="https://asoceca.org/establecimiento/arimar-foodlab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit AriMar's listing with ASOCECA and FACE Restauración"
            className="group mx-auto mt-11 flex max-w-3xl flex-col items-center gap-5 border-y border-primary-200 py-7 transition-colors hover:bg-primary-50/30 sm:flex-row sm:justify-center sm:gap-7 sm:px-5"
          >
            <Image
              src="/images/arimar-face-restauracion.webp"
              alt="FACE Restauración Sin Gluten distintive logo"
              width={96}
              height={96}
              className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
            />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                Local coeliac association
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                ASOCECA · FACE Restauración
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                View AriMar's listing with ASOCECA, the coeliac association in the Canary Islands.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-2xl font-bold text-primary-700 transition-transform group-hover:translate-x-1"
            >↗</span>
          </a>

          <div className="mt-12">
            <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Gluten-free guides, apps and local media
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
              {directories.map((directory) => (
                <a
                  key={directory.href}
                  href={directory.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[112px] flex-col items-center justify-center text-center"
                  aria-label={'Find AriMar on ' + directory.name}
                >
                  <div className="flex min-h-[60px] items-center justify-center gap-2.5">
                    <Image
                      src={'https://www.google.com/s2/favicons?domain=' + directory.domain + '&sz=128'}
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      unoptimized
                      loading="lazy"
                      className="h-9 w-9 shrink-0 rounded-md object-contain"
                    />
                    <span className={directory.wordmark + ' max-w-[155px] text-left text-base leading-tight text-slate-800 transition-colors group-hover:text-primary-800 sm:text-lg'}>
                      {directory.name}
                    </span>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">{directory.description}</span>
                  <span className="mt-2 h-px w-9 bg-primary-300 transition-all group-hover:w-16 group-hover:bg-primary-600" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-9 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Listings in third-party guides and directories do not mean that those
            platforms certify AriMar or have a commercial partnership with us.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f9f7] py-16 md:py-20" aria-labelledby="coeliac-questions">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Planning a gluten-free trip?
            </p>
            <h2 id="coeliac-questions" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Where to eat gluten-free in Gran Canaria: your questions answered.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Useful answers for people with coeliac disease, travellers and
              island residents looking for gluten-free takeaway. All orders
              are collected from our shop in Playa de Arinaga.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {travellerQuestions.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer pr-5 text-base font-bold leading-snug text-slate-900 marker:text-primary-700 hover:text-primary-800">
                  {question}
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
            <div className="pt-5">
              <Link
                href={siteConfig.pedirPath}
                className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                See available dishes &amp; order <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-50 to-[#f8f4ed] px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="order-today">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              You enjoy your day. We'll do the cooking.
            </p>
            <h2 id="order-today" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              What do you fancy eating today?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Homemade 100% gluten-free food, ready to collect in Playa de Arinaga.
            </p>
          </div>
          <Link href={siteConfig.pedirPath} className={buttonClass}>
            See today's food &amp; order <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <nav aria-label="Language and useful links" className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center gap-4 px-4 text-sm font-semibold text-primary-800 sm:px-6 lg:px-8">
        <Link href="/sin-gluten-gran-canaria" lang="es" className="underline decoration-primary-300 underline-offset-4 hover:text-primary-950">
          Ver esta página en español
        </Link>
        <Link href="/contacto" className="underline decoration-primary-300 underline-offset-4 hover:text-primary-950">
          Contact &amp; directions (Spanish)
        </Link>
      </nav>
    </div>
  )
}
