import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl, siteConfig } from '@/lib/siteConfig'
import SolicitarPata from './SolicitarPata'

const path = '/pata-asada-gran-canaria'
const url = 'https://' + siteConfig.domain + path
const photo = 'https://' + siteConfig.domain + '/images/pata-asada-canaria-arimar-real.jpg'
const mensaje = 'Hola, AriMar. Quisiera información y presupuesto para encargar una pata asada canaria entera para una celebración. ¿Me podéis ayudar?'
const whatsapp = getWhatsAppUrl(mensaje)

export const metadata: Metadata = {
  title: 'Pata asada canaria por encargo en Gran Canaria | AriMar',
  description: '¿Buscas dónde comprar pata asada canaria en Gran Canaria? En AriMar la preparamos entera, 100 % sin gluten, para cumpleaños y eventos. Recogida en Playa de Arinaga.',
  alternates: { canonical: path },
  openGraph: {
    type: 'website',
    url,
    title: 'Pata asada canaria por encargo en Gran Canaria | AriMar',
    description: 'Tu próxima celebración merece una buena pata asada. Elaboración propia, control de temperatura y recogida en Playa de Arinaga.',
    locale: 'es_ES',
    images: [{ url: photo, alt: 'Pata asada canaria de AriMar recién salida del horno' }],
  },
  twitter: { card: 'summary_large_image', title: 'Pata asada por encargo en Gran Canaria | AriMar', images: [photo] },
}

const preguntas = [
  {
    q: '¿Dónde comprar pata asada canaria en Gran Canaria?',
    a: 'Puedes comprar pata asada canaria por encargo en AriMar, en Avenida Polizón 67, Playa de Arinaga (Agüimes, Gran Canaria). La elaboramos en nuestra cocina 100 % sin gluten. Consulta disponibilidad y presupuesto por WhatsApp antes de acudir a recogerla.',
  },
  {
    q: '¿La pata asada se entrega entera o cortada?',
    a: 'Se entrega la pieza entera, sin cortar ni lonchear. Puedes llevarla a tu celebración y servirla al grosor que prefieras.',
  },
  {
    q: '¿Puedo encargar una pata asada desde Vecindario, Carrizal, Telde o Las Palmas?',
    a: 'Sí, puedes consultar tu encargo desde cualquier municipio de Gran Canaria. La pata se recoge en nuestro establecimiento de Playa de Arinaga; no realizamos el reparto a domicilio ni el corte durante el evento.',
  },
  {
    q: '¿Con cuánta antelación tengo que pedirla?',
    a: 'Es mejor consultar cuanto antes, especialmente si la necesitas para un fin de semana o una fecha señalada. Confirmaremos el plazo disponible para tu encargo.',
  },
  {
    q: '¿Cuánto cuesta una pata asada entera?',
    a: 'El presupuesto depende del tamaño y del peso de la pieza, así como de la disponibilidad. Escríbenos con la fecha y el número de comensales y te informaremos antes de confirmar el pedido.',
  },
  {
    q: '¿Es una pata asada sin gluten?',
    a: 'Sí. La elaboramos en nuestra cocina de AriMar, que trabaja 100 % sin gluten. Si tienes otras alergias o necesidades alimentarias, indícanoslo antes de encargar.',
  },
  {
    q: '¿Hacéis entrega a domicilio o catering para eventos?',
    a: 'Nuestro servicio consiste en elaborar la pata por encargo para recoger en AriMar, Playa de Arinaga. No incluye transporte, corte en el evento ni personal de catering.',
  },
]

const datosEstructurados = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': url + '#webpage',
      name: 'Pata asada canaria por encargo en Gran Canaria',
      url,
      description: 'Pata asada canaria entera para celebraciones y recogida en AriMar, Playa de Arinaga.',
      inLanguage: 'es-ES',
      about: { '@id': url + '#servicio' },
    },
    {
      '@type': 'Service',
      '@id': url + '#servicio',
      name: 'Elaboración de pata asada canaria por encargo',
      serviceType: 'Preparación de pata asada canaria entera por encargo para celebraciones',
      description: 'Elaboramos pata de cerdo asada con control de temperatura interior en nuestra cocina 100 % sin gluten. Se solicita presupuesto y se recoge la pieza entera en AriMar, Playa de Arinaga, Gran Canaria.',
      image: photo,
      provider: { '@id': 'https://' + siteConfig.domain + '/#restaurant' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Gran Canaria' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceLocation: {
          '@type': 'Place',
          name: 'AriMar FoodLab',
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.locality,
            addressRegion: siteConfig.address.province,
            postalCode: siteConfig.address.postalCode,
            addressCountry: 'ES',
          },
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': url + '#migas',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AriMar', item: 'https://' + siteConfig.domain + '/' },
        { '@type': 'ListItem', position: 2, name: 'Pata asada canaria', item: url },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': url + '#preguntas',
      mainEntity: preguntas.map(({ q, a }) => ({
        '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

const ventajas = [
  { numero: '01', titulo: 'Corteza bien dorada', detalle: 'Buscamos ese contraste entre la superficie tostada y el interior de la pieza.' },
  { numero: '02', titulo: 'El punto bajo control', detalle: 'Utilizamos la sonda de nuestro horno RATIONAL para seguir la temperatura interior durante el asado.' },
  { numero: '03', titulo: 'Para compartir', detalle: 'Una pata entera pensada para cumpleaños, encuentros familiares y celebraciones.' },
]

const pasos = [
  { numero: '01', titulo: 'Cuéntanos la ocasión', detalle: 'Dinos la fecha, el número aproximado de comensales y qué tienes en mente.' },
  { numero: '02', titulo: 'Concretamos tu pieza', detalle: 'Te confirmamos disponibilidad, tamaño, precio y condiciones de recogida.' },
  { numero: '03', titulo: 'Recógela en Arinaga', detalle: 'Preparamos el asado acordado para que lo recojas en nuestro local. Se entrega entero y sin lonchear.' },
]

export default function PataAsadaPage() {
  return (
    <div className="overflow-hidden bg-[#F8FAFC] text-[#1E293B] pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados).replace(/</g, '\\u003c') }} />

      <section className="relative overflow-hidden bg-[#1E293B] text-white" aria-labelledby="pata-h1">
        <div className="absolute -right-20 -top-44 h-96 w-96 rounded-full border-[70px] border-[#207F85]/20" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:py-28">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#B7E1E1]">
              <span>AriMar · Playa de Arinaga</span><span className="h-1 w-1 rounded-full bg-[#B7E1E1]" /><span>Cocina 100 % sin gluten</span>
            </div>
            <h1 id="pata-h1" className="mt-8 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.8rem]">
              Pata asada <span className="text-[#80D0D1]">canaria</span> por encargo en Gran Canaria
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#E3EEEE] md:text-xl">
              Piel dorada, carne jugosa y una pieza para reunir a los tuyos. La preparamos en nuestra cocina de Playa de Arinaga para cumpleaños, reuniones y celebraciones.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-[#207F85] px-7 py-4 text-base font-extrabold text-white shadow-lg transition hover:bg-[#278F95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Encargar pata asada <span className="ml-2" aria-hidden="true">↗</span>
              </a>
              <a href="#por-que-jugosa" className="inline-flex items-center justify-center rounded-xl border border-white/50 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10">Descubre cómo la asamos ↓</a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-300">Por encargo y según disponibilidad · Recogida en nuestro local de Agüimes · La solicitud no confirma el pedido.</p>
          </div>
          <figure className="relative min-h-[360px] bg-[#F3F3EF] lg:min-h-[670px]">
            <Image
              src="/images/pata-asada-canaria-arimar-real.jpg"
              alt="Pata asada canaria auténtica de AriMar, con la piel dorada, recién salida del horno"
              fill priority sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#1E293B]/85 p-4 text-sm font-semibold text-white backdrop-blur-sm">
              Nuestra pata asada, de verdad. Fotografía tomada en la cocina de AriMar.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="border-b border-[#D9E8E8] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-9 gap-y-3 px-6 py-5 text-sm font-bold text-[#207F85]">
          <span>✓ Elaboración propia</span><span>✓ 100 % sin gluten</span><span>✓ Pieza entera para compartir</span><span>✓ Recogida en Playa de Arinaga</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28" aria-labelledby="celebrar-h2">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#207F85]">La protagonista de la mesa</p>
            <h2 id="celebrar-h2" className="mt-4 text-3xl font-black leading-tight md:text-5xl">Hay celebraciones que merecen una buena pata asada.</h2>
          </div>
          <div className="self-end">
            <p className="text-lg leading-relaxed text-slate-600">Un cumpleaños, un almuerzo con amigos, una reunión familiar o una celebración de empresa. La pata asada canaria es una de esas elaboraciones que convierten el momento de servir en parte de la fiesta.</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">En AriMar la preparamos entera, con su piel bien dorada y controlando la cocción para cuidar el interior. Tú decides cuándo compartirla.</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600"><strong className="text-[#1E293B]">¿Buscas comprar pata asada canaria en Gran Canaria?</strong> Puedes encargar una pieza completa y recogerla en Playa de Arinaga, cerca de Vecindario y Carrizal. También recibimos consultas desde Telde y otros municipios de la isla: concretamos la fecha, el tamaño y el presupuesto antes de preparar tu pedido.</p>
            <Link href="/contacto" className="mt-7 inline-flex font-bold text-[#207F85] underline underline-offset-4">¿Organizas algo más grande? Consúltanos opciones para eventos ↗</Link>
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {ventajas.map((item) => (
            <article key={item.numero} className="rounded-2xl border border-[#DFE9E9] bg-white p-7 shadow-sm">
              <p className="mb-8 text-sm font-extrabold tracking-widest text-[#207F85]">{item.numero}</p>
              <h3 className="text-xl font-extrabold">{item.titulo}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{item.detalle}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="por-que-jugosa" className="bg-white px-6 py-20 md:py-28" aria-labelledby="sonda-h2">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#EFF5F5]">
            <Image src="/images/cocina-rational.webp" alt="Equipamiento RATIONAL de la cocina de AriMar, utilizado para controlar los asados" width={900} height={780} sizes="(max-width: 1024px) 100vw, 42vw" className="h-[360px] w-full object-cover md:h-[510px]" />
            <p className="border-t border-[#CFE4E4] px-6 py-4 text-sm font-semibold text-[#207F85]">Nuestra cocina, nuestro proceso. Sin imágenes de catálogo.</p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#207F85]">Así cuidamos el asado</p>
            <h2 id="sonda-h2" className="mt-4 text-3xl font-black leading-tight md:text-5xl">¿Por qué queda tan jugosa?</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Una buena pata asada no depende solo del tiempo que pasa en el horno. También importa saber qué está ocurriendo en el centro de la pieza.</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">Por eso trabajamos con la <strong className="text-[#1E293B]">sonda de temperatura interior de nuestro horno RATIONAL</strong>. Programamos el punto de cocción que buscamos y seguimos la temperatura de la carne durante el proceso. Ese control nos ayuda a evitar una cocción excesiva y a mantener la jugosidad, mientras cuidamos el acabado dorado de la piel.</p>
            <div className="mt-8 border-l-4 border-[#207F85] bg-[#F8FAFC] p-6">
              <p className="text-xl font-extrabold">No se trata de cocinar más. Se trata de cocinar en su punto.</p>
              <p className="mt-2 text-sm text-slate-600">El resultado también depende de la pieza, de la preparación y del asado completo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E9F3F3] px-6 py-20 md:py-24" aria-labelledby="pasos-h2">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#207F85]">Cómo hacer tu encargo</p>
            <h2 id="pasos-h2" className="mt-4 text-3xl font-black md:text-5xl">Pata asada para cumpleaños y eventos, sin complicaciones.</h2>
            <p className="mt-5 text-lg text-slate-600">¿Quieres reservar una pata asada entera para llevar? Todo empieza con una consulta. Te ayudamos a concretar una pieza adecuada y un presupuesto antes de confirmar nada.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pasos.map((p) => (
              <div key={p.numero} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#207F85] text-lg font-black text-white">{p.numero}</span>
                <h3 className="mt-7 text-xl font-extrabold">{p.titulo}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{p.detalle}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-600">Importante: ofrecemos elaboración y recogida en AriMar. No incluye transporte, servicio de sala, montaje ni corte de la pata en la celebración.</p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28" aria-label="Solicita presupuesto de pata asada">
        <div className="mx-auto max-w-3xl"><SolicitarPata /></div>
      </section>

      <section className="bg-white px-6 py-20 md:py-24" aria-labelledby="faq-h2">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#207F85]">Antes de encargar</p>
          <h2 id="faq-h2" className="mt-4 text-3xl font-black md:text-4xl">Preguntas frecuentes sobre nuestra pata asada</h2>
          <div className="mt-9 divide-y divide-[#DAE7E7] border-y border-[#DAE7E7]">
            {preguntas.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-lg font-bold marker:hidden">
                  <span>{q}</span><span className="text-2xl font-light text-[#207F85] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pt-3 leading-relaxed text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1E293B] px-6 py-16 text-white md:py-20" aria-labelledby="final-pata-h2">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B7E1E1]">Tú disfruta, nosotros cocinamos</p>
            <h2 id="final-pata-h2" className="mt-3 text-3xl font-black md:text-5xl">La próxima celebración puede tener sabor a AriMar.</h2>
            <p className="mt-4 text-lg text-slate-200">Pregunta por nuestra pata asada canaria. Estamos en Avenida Polizón 67, Playa de Arinaga (Agüimes, Gran Canaria).</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm">
              <Link href="/contacto" className="font-semibold text-[#B7E1E1] underline underline-offset-4">Dónde estamos ↗</Link>
              <Link href="/carta" className="font-semibold text-[#B7E1E1] underline underline-offset-4">Descubre nuestra carta ↗</Link>
            </div>
          </div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-xl bg-[#207F85] px-8 py-4 font-extrabold text-white transition hover:bg-[#278F95]">Consultar disponibilidad ↗</a>
        </div>
      </section>
    </div>
  )
}
