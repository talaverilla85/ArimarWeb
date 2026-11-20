import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

const paginaItaliana = '/it/senza-glutine-gran-canaria'

export const metadata: Metadata = {
  title: 'Senza glutine a Gran Canaria | Cucina da asporto | AriMar',
  description:
    'Cerchi dove mangiare senza glutine a Gran Canaria? AriMar prepara piatti fatti in casa 100% senza glutine. Ordina online e ritira a Playa de Arinaga.',
  alternates: {
    canonical: paginaItaliana,
    languages: {
      'es-ES': '/sin-gluten-gran-canaria',
      'en': '/en/gluten-free-gran-canaria',
      'it-IT': paginaItaliana,
    },
  },
  openGraph: {
    title: 'Senza glutine a Gran Canaria | Cucina da asporto | AriMar',
    description:
      'Cucina casalinga 100% senza glutine a Gran Canaria. Scopri i piatti del giorno, ordina online e ritira a Playa de Arinaga.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://arimarfoodlab.es/it/senza-glutine-gran-canaria',
    images: [
      {
        url: '/images/arimar-vitrina-comida-para-llevar.webp',
        alt: 'Vetrina di AriMar con piatti fatti in casa e preparati senza glutine',
      },
    ],
  },
}

const domande = [
  {
    domanda: 'Dove mangiare senza glutine a Gran Canaria?',
    risposta:
      'Da AriMar trovi piatti pronti da asporto, preparati senza ingredienti contenenti glutine. Siamo in Avenida Polizón 67, Playa de Arinaga, nel comune di Agüimes, a Gran Canaria. Puoi controllare il menù del giorno prima di venire.',
  },
  {
    domanda: 'Tutti i piatti di AriMar sono senza glutine?',
    risposta:
      'Sì. Da AriMar non esiste un piccolo menù a parte: tutta la nostra proposta è preparata senza ingredienti contenenti glutine. Forniamo anche informazioni sugli ingredienti e sugli altri allergeni di ogni preparazione.',
  },
  {
    domanda: 'Sono celiaco: posso chiedere informazioni su ingredienti e allergeni?',
    risposta:
      'Certamente. AriMar è una gastronomia 100% senza glutine. Se hai la celiachia o altre esigenze alimentari, puoi chiedere al nostro personale informazioni sul piatto prima di acquistarlo. Puoi inoltre consultare la nostra scheda nell’elenco di ASOCECA, l’associazione locale dei celiaci.',
  },
  {
    domanda: 'Posso ordinare e portare il cibo a casa o in appartamento?',
    risposta:
      'Sì. Controlla la disponibilità, ordina online e ritira i piatti presso il nostro locale a Playa de Arinaga. Puoi portarli a casa, in appartamento o in spiaggia. Non abbiamo una sala con tavoli e non effettuiamo consegne a domicilio.',
  },
  {
    domanda: 'Che cosa posso trovare da mangiare?',
    risposta:
      'A seconda del giorno prepariamo pollo arrosto, stufati, riso, insalate, crocchette, fritti e altri piatti casalinghi. Le proposte cambiano e alcune possono esaurirsi: verifica sempre la disponibilità aggiornata.',
  },
  {
    domanda: 'Dove si trova AriMar e quali sono gli orari?',
    risposta:
      'Ci trovi in Avenida Polizón 67, Playa de Arinaga, Agüimes, nella zona sud-orientale di Gran Canaria. Il nostro orario abituale è tutti i giorni dalle 11:30 alle 16:00. Prima di spostarti apposta, verifica eventuali modifiche sul sito.',
  },
] as const

const guide = [
  {
    nome: 'CeliNews',
    descrizione: 'Guida per celiaci a Gran Canaria',
    dominio: 'celinews.com',
    href: 'https://celinews.com/gran-canaria-sin-gluten-para-celiacos/',
    stile: 'font-bold tracking-tight',
  },
  {
    nome: 'NoGluApp',
    descrizione: 'App dedicata al senza glutine',
    dominio: 'nogluapp.com',
    href: 'https://nogluapp.com/restaurante/2391',
    stile: 'font-extrabold tracking-tight',
  },
  {
    nome: 'Find Me Gluten Free',
    descrizione: 'Guida internazionale',
    dominio: 'findmeglutenfree.com',
    href: 'https://www.findmeglutenfree.com/biz/arimar/6616784932569088',
    stile: 'font-bold tracking-tight',
  },
  {
    nome: 'Canarias7',
    descrizione: 'Elenco delle attività locali',
    dominio: 'canarias7.es',
    href: 'https://servicios.canarias7.es/empresas/arimar.html',
    stile: 'font-extrabold tracking-tight',
  },
] as const

const pulsantePrincipale =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2'

export default function SenzaGlutineGranCanariaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'it-IT',
    mainEntity: domande.map(({ domanda, risposta }) => ({
      '@type': 'Question',
      name: domanda,
      acceptedAnswer: { '@type': 'Answer', text: risposta },
    })),
  }

  return (
    <div lang="it" className="overflow-hidden bg-white pb-16 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-[#f2f9f7] via-white to-[#fbf7ef] pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.19em] text-primary-800">
              Playa de Arinaga · Gastronomia 100% senza glutine
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.8rem]">
              Mangiare senza glutine a Gran Canaria.
              <span className="mt-3 block text-primary-700">
                Senza rinunciare al gusto.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Pollo arrosto, stufati, riso, crocchette e piatti pronti fatti in casa.
              Un&apos;unica proposta per tutti, preparata nella nostra cucina 100% senza glutine.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              Vivi a Gran Canaria o sei qui in vacanza? Scopri cosa abbiamo preparato
              oggi, ordina online e passa a ritirare il tuo pranzo a Playa de Arinaga.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href={siteConfig.pedirPath} className={pulsantePrincipale}>
                Scopri i piatti di oggi e ordina <span aria-hidden="true">→</span>
              </Link>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                Indicazioni stradali <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Il sistema per gli ordini online è attualmente in spagnolo.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary-200 pt-6 text-sm font-semibold text-slate-600">
              <span>100% senza glutine</span>
              <span>Piatti da asporto</span>
              <span>Playa de Arinaga</span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-2xl lg:aspect-[5/4]">
              <Image
                src="/images/arimar-vitrina-comida-para-llevar.webp"
                alt="Vetrina reale di AriMar con numerosi piatti pronti fatti in casa senza glutine"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">
              La nostra vetrina a Playa de Arinaga. I piatti variano secondo la disponibilità.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 md:py-24" aria-labelledby="tutto-senza-glutine">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.86fr_1.14fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Un menù per tutti
            </p>
            <h2 id="tutto-senza-glutine" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Niente menù separati.
              <span className="mt-2 block text-primary-700">
                Da noi è tutto senza glutine.
              </span>
            </h2>
          </div>
          <div className="border-t-2 border-primary-500 pt-7">
            <p className="text-lg leading-relaxed text-slate-700">
              Non devi accontentarti di due o tre alternative. Da AriMar tutti i
              piatti sono preparati senza ingredienti contenenti glutine: dalle
              ricette tradizionali delle Canarie ai piatti di riso, dalle crocchette
              alle specialità fritte.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              Ti aiutiamo anche a conoscere gli ingredienti e gli altri allergeni
              presenti nelle preparazioni. Se hai la celiachia o esigenze specifiche,
              chiedici informazioni prima di scegliere.
            </p>
            <Link
              href="/carta"
              className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
            >
              Scopri il nostro menù <span className="font-normal">(in spagnolo)</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-20 md:py-24" aria-labelledby="cucina-da-asporto">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
            <Image
              src="/images/arimar-20261023-ropa-vieja.webp"
              alt="Ropa vieja, piatto tradizionale delle Canarie con ceci e carne, preparato senza glutine da AriMar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Per chi vive qui e per chi è in vacanza
            </p>
            <h2 id="cucina-da-asporto" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Il pranzo è pronto. Al resto pensi tu.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Una giornata di lavoro, una pausa a casa o un&apos;escursione
              sull&apos;isola: da AriMar trovi cucina casalinga senza glutine
              da portare dove preferisci. Consulta la disponibilità e ordina
              prima di raggiungerci.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              Siamo una gastronomia da asporto: non abbiamo una sala ristorante
              né un servizio di consegna a domicilio. Il ritiro avviene in
              Avenida Polizón 67, Playa de Arinaga, Agüimes, Gran Canaria.
            </p>
            <Link
              href="/freiduria-sin-gluten-gran-canaria"
              className="mt-7 inline-flex min-h-11 items-center font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
            >
              Scopri le nostre fritture senza glutine <span className="font-normal">(in spagnolo)</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="dove-ci-trovi">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.21em] text-primary-800">
              La nostra presenza
            </p>
            <h2 id="dove-ci-trovi" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Puoi trovare AriMar anche qui
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              La nostra scheda è presente nell&apos;elenco di ASOCECA e in alcune
              guide e app che aiutano a trovare locali senza glutine a Gran Canaria.
            </p>
          </div>

          <a
            href="https://asoceca.org/establecimiento/arimar-foodlab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consulta la scheda di AriMar sul sito di ASOCECA e FACE Restauración"
            className="group mx-auto mt-11 flex max-w-3xl flex-col items-center gap-5 border-y border-primary-200 py-7 transition-colors hover:bg-primary-50/30 sm:flex-row sm:justify-center sm:gap-7 sm:px-5"
          >
            <Image
              src="/images/arimar-face-restauracion.webp"
              alt="Logo distintivo FACE Restauración Sin Gluten"
              width={96}
              height={96}
              className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
            />
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                Associazione locale dei celiaci
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                ASOCECA · FACE Restauración
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Consulta la scheda di AriMar nell&apos;elenco di ASOCECA,
                l&apos;associazione dei celiaci delle Canarie.
              </p>
            </div>
            <span aria-hidden="true" className="text-2xl font-bold text-primary-700 transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </a>

          <div className="mt-12">
            <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Guide, app e media in cui siamo presenti
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
              {guide.map((guida) => (
                <a
                  key={guida.href}
                  href={guida.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[112px] flex-col items-center justify-center text-center"
                  aria-label={'Trova AriMar su ' + guida.nome}
                >
                  <div className="flex min-h-[60px] items-center justify-center gap-2.5">
                    <Image
                      src={'https://www.google.com/s2/favicons?domain=' + guida.dominio + '&sz=128'}
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      unoptimized
                      loading="lazy"
                      className="h-9 w-9 shrink-0 rounded-md object-contain"
                    />
                    <span className={guida.stile + ' max-w-[155px] text-left text-base leading-tight text-slate-800 transition-colors group-hover:text-primary-800 sm:text-lg'}>
                      {guida.nome}
                    </span>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">{guida.descrizione}</span>
                  <span className="mt-2 h-px w-9 bg-primary-300 transition-all group-hover:w-16 group-hover:bg-primary-600" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-9 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Essere presenti in guide e directory non significa che tali piattaforme
            certifichino AriMar o che esista una collaborazione commerciale con esse.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f9f7] py-16 md:py-20" aria-labelledby="domande-celiachia">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 sm:px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Vivi qui o stai organizzando un viaggio?
            </p>
            <h2 id="domande-celiachia" className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Dove mangiare senza glutine a Gran Canaria?
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Alcune risposte utili per chi cerca cibo senza glutine a Gran Canaria,
              per chi convive con la celiachia e per chi desidera un pranzo da asporto.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {domande.map(({ domanda, risposta }) => (
              <details key={domanda} className="group py-5">
                <summary className="cursor-pointer pr-5 text-base font-bold leading-snug text-slate-900 marker:text-primary-700 hover:text-primary-800">
                  {domanda}
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                  {risposta}
                </p>
              </details>
            ))}
            <div className="pt-5">
              <Link
                href={siteConfig.pedirPath}
                className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-800 underline decoration-primary-300 underline-offset-4 hover:text-primary-950"
              >
                Guarda la disponibilità e ordina <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-50 to-[#f8f4ed] px-6 py-12 sm:mx-6 sm:px-10 md:mx-8 md:py-16" aria-labelledby="ordina-oggi">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-800">
              Al pranzo pensiamo noi
            </p>
            <h2 id="ordina-oggi" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Che cosa ti va di mangiare oggi?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Piatti fatti in casa 100% senza glutine, pronti da ritirare a Playa de Arinaga.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Link href={siteConfig.pedirPath} className={pulsantePrincipale}>
              Scopri i piatti di oggi <span aria-hidden="true">→</span>
            </Link>
            <span className="text-xs text-slate-500">Ordini online in spagnolo</span>
          </div>
        </div>
      </section>

      <nav aria-label="Scegli la lingua" className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center gap-4 px-4 text-sm font-semibold text-primary-800 sm:px-6 lg:px-8">
        <span className="text-slate-500">Questa pagina in altre lingue:</span>
        <Link href="/sin-gluten-gran-canaria" lang="es" className="underline decoration-primary-300 underline-offset-4 hover:text-primary-950">
          Español
        </Link>
        <Link href="/en/gluten-free-gran-canaria" lang="en" className="underline decoration-primary-300 underline-offset-4 hover:text-primary-950">
          English
        </Link>
      </nav>
    </div>
  )
}
