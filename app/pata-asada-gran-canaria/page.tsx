import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Pata asada canaria por encargo en Gran Canaria | AriMar',
  description:
    'Encarga pata asada canaria entera, elaborada en la cocina 100 % sin gluten de AriMar. Recogida en Playa de Arinaga, Agüimes. Consulta disponibilidad y presupuesto.',
  alternates: { canonical: '/pata-asada-gran-canaria' },
  openGraph: {
    title: 'Pata asada canaria por encargo en Gran Canaria | AriMar',
    description:
      'La tradición de la pata asada canaria, hecha por encargo en AriMar. Se entrega entera y se recoge en Playa de Arinaga.',
    type: 'website',
  },
}

const whatsapp = getWhatsAppUrl(
  'Hola, quiero consultar una pata asada canaria entera por encargo para recoger en AriMar. ¿Me podéis indicar disponibilidad y presupuesto?',
)

const email =
  'mailto:info@arimarfoodlab.es?subject=Pata%20asada%20canaria%20por%20encargo%20-%20Consulta'

const preguntas = [
  {
    pregunta: '¿Dónde puedo encargar pata asada canaria en Gran Canaria?',
    respuesta:
      'Puedes consultar la preparación de una pata asada canaria entera en AriMar, nuestra casa de comidas 100 % sin gluten en Playa de Arinaga (Agüimes). Los encargos se recogen en el establecimiento.',
  },
  {
    pregunta: '¿La pata asada se entrega entera o cortada?',
    respuesta:
      'La entregamos entera, sin cortar ni lonchear. Así puedes presentar la pieza y servirla en casa a tu gusto.',
  },
  {
    pregunta: '¿La pata asada de AriMar es sin gluten?',
    respuesta:
      'Sí. Elaboramos la pata en nuestra cocina dedicada a preparaciones 100 % sin gluten. Si necesitas información sobre ingredientes o algún otro alérgeno, consúltanos antes de confirmar el encargo.',
  },
  {
    pregunta: '¿Puedo encargarla para un cumpleaños o una reunión?',
    respuesta:
      'Sí, es una opción para celebraciones y comidas en grupo. Indícanos la fecha y el tipo de encuentro para que podamos valorar disponibilidad y tamaño de la pieza.',
  },
  {
    pregunta: '¿Cuánto cuesta una pata asada entera?',
    respuesta:
      'Te facilitaremos un presupuesto antes de confirmar el pedido. El importe depende de las características y el peso de la pieza acordada.',
  },
  {
    pregunta: '¿La lleváis al lugar del evento?',
    respuesta:
      'No ofrecemos transporte ni servicio de corte en el evento. La pata se prepara por encargo para recoger en AriMar, en Playa de Arinaga.',
  },
]

export default function PataAsadaPage() {
  return (
    <main className="bg-[#fffdf9] pt-16 text-slate-800 md:pt-20">
      <section className="overflow-hidden bg-[#edf7f5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14 md:py-20 lg:px-12">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.23em] text-primary-700">
              AriMar · Especialidades por encargo
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.11] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Pata asada canaria <span className="text-primary-600">por encargo</span> en Gran Canaria
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Una pieza para compartir, con el exterior bien dorado y la carne sabrosa por dentro.
              La preparamos en la cocina 100 % sin gluten de AriMar y te la entregamos
              <strong className="text-slate-800"> entera, sin cortar</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-7 py-4 font-bold text-white shadow-sm transition-colors hover:bg-primary-600"
              >
                Consultar mi encargo <span className="ml-2" aria-hidden="true">↗</span>
              </a>
              <a
                href="#como-la-hacemos"
                className="inline-flex items-center justify-center rounded-xl border border-primary-200 bg-white px-7 py-4 font-semibold text-primary-800 hover:bg-primary-50"
              >
                Conoce nuestra pata asada
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Recogida en Playa de Arinaga · Disponibilidad y presupuesto por confirmar
            </p>
          </div>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-primary-100 bg-white p-7 shadow-xl shadow-primary-900/10 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              El sello de la casa
            </p>
            <div className="mt-9 border-b border-primary-100 pb-10">
              <p className="text-5xl font-extrabold leading-[1.09] tracking-tight text-primary-700 sm:text-6xl">
                Entera.<br />Doradita.<br />Para compartir.
              </p>
            </div>
            <div className="mt-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">Pata asada de cerdo</p>
                <p className="mt-1 text-sm text-slate-500">Tradición canaria · Elaboración por encargo</p>
              </div>
              <span className="shrink-0 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-bold text-primary-800">
                Sin gluten
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="como-la-hacemos" className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-primary-50 shadow-sm md:min-h-[470px]">
            <Image
              src="/images/cocina-rational.webp"
              alt="Equipamiento de horno profesional utilizado en la cocina de AriMar"
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-6 pb-6 pt-24 text-sm font-semibold text-white">
              Nuestra cocina y el control de la cocción
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              De nuestro horno a tu mesa
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
              El punto de una buena pata asada se trabaja desde dentro.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Asamos la pieza con un programa de horno y controlamos la temperatura interior mediante sonda.
              Ese seguimiento nos ayuda a trabajar la cocción y mantener la jugosidad de la carne.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              El acabado final busca ese exterior tostado tan característico de la pata asada canaria.
              No la loncheamos: sale de AriMar como una pieza entera para que la presentes y cortes cuando vayas a servirla.
            </p>
            <div className="mt-8 border-l-4 border-primary-500 bg-primary-50 px-6 py-5">
              <p className="text-lg font-bold text-primary-800">Una pieza, muchos momentos.</p>
              <p className="mt-2 leading-relaxed text-slate-600">
                Para una mesa familiar, un cumpleaños o una reunión especial. Consulta con nosotros las opciones disponibles para tu fecha.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f8f7] px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
            Encargar es sencillo
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Tú organizas el encuentro. Nosotros preparamos la pata.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'Cuéntanos la ocasión', 'Indícanos para qué día la necesitas y si es una comida familiar, celebración o reunión.'],
              ['02', 'Concretamos el encargo', 'Revisamos disponibilidad, peso de la pieza y presupuesto antes de confirmar nada.'],
              ['03', 'Recógela en AriMar', 'La tendrás preparada para recoger en nuestro local de Playa de Arinaga, sin cortar ni lonchear.'],
            ].map(([numero, titulo, detalle]) => (
              <article key={numero} className="border-t-2 border-primary-300 bg-white px-6 pb-8 pt-6 shadow-sm">
                <p className="text-3xl font-light text-primary-500">{numero}</p>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{titulo}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{detalle}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary-600 px-7 py-3.5 font-bold text-white hover:bg-primary-700"
            >
              Preguntar por WhatsApp ↗
            </a>
            <a
              href={email}
              className="rounded-xl border border-primary-200 bg-white px-7 py-3.5 font-semibold text-primary-800 hover:bg-primary-50"
            >
              Consultar por correo
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-20 lg:px-12" aria-labelledby="preguntas-pata">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              Todo claro antes de encargar
            </p>
            <h2 id="preguntas-pata" className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Preguntas frecuentes sobre nuestra pata asada
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              La recogida se realiza en AriMar, en Playa de Arinaga (Agüimes, Gran Canaria).
            </p>
          </div>
          <div className="divide-y divide-primary-100 border-t-2 border-primary-300">
            {preguntas.map(({ pregunta, respuesta }) => (
              <article key={pregunta} className="py-6">
                <h3 className="text-lg font-bold text-slate-900">{pregunta}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{respuesta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-primary-100 bg-primary-700 px-5 py-14 text-white sm:px-8 md:py-18 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-100">
              Especialidades de AriMar
            </p>
            <h2 className="text-2xl font-bold md:text-3xl">¿Te apetece algo más para compartir?</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-white/85">
              Además de la pata, también elaboramos costillas, lomo y bondiola por encargo.
            </p>
          </div>
          <Link
            href="/asados-por-encargo-gran-canaria"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-7 py-4 font-bold text-primary-800 hover:bg-primary-50"
          >
            Ver todos los asados →
          </Link>
        </div>
      </section>
    </main>
  )
}
