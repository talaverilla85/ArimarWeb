import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'AriMar PRO | Cocina 100 % sin gluten para profesionales en Gran Canaria',
  description:
    '¿Cuántas mesas pierdes por no ofrecer alternativas sin gluten? Descubre AriMar PRO: croquetas, lasaña, carnes asadas y otras elaboraciones para hostelería en Gran Canaria.',
  alternates: { canonical: '/profesionales' },
}

const consultaEmail =
  'mailto:info@arimarfoodlab.es?subject=AriMar%20PRO%20-%20Consulta%20para%20profesionales'

const consultaWhatsapp = getWhatsAppUrl(
  'Hola, soy profesional de hostelería o comercio y me gustaría conocer las elaboraciones 100 % sin gluten de AriMar PRO.',
)

const ventajas = [
  {
    numero: '01',
    titulo: 'Una cocina dedicada al sin gluten',
    descripcion:
      'En AriMar no trabajamos con ingredientes que contienen gluten. No es una alternativa de nuestra carta: es la base de toda nuestra cocina.',
  },
  {
    numero: '02',
    titulo: 'Elaboración propia, con método',
    descripcion:
      'Cocinamos con recetas estandarizadas y una forma de trabajar organizada para cuidar la regularidad de nuestras elaboraciones.',
  },
  {
    numero: '03',
    titulo: 'Información clara',
    descripcion:
      'Prestamos atención a los ingredientes y al etiquetado de alérgenos para que cada establecimiento pueda valorar qué producto encaja en su oferta.',
  },
]

export default function ProfesionalesPage() {
  return (
    <main className="bg-[#fbfdfc] pt-16 text-slate-800 md:pt-20">
      {/* Una presentación gastronómica, no un catálogo industrial */}
      <section className="relative overflow-hidden border-b border-primary-100 bg-gradient-to-br from-[#f1faf9] via-white to-[#eaf5f2]">
        <div className="mx-auto grid max-w-7xl items-stretch gap-9 px-5 py-12 sm:px-8 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:py-20 lg:px-12">
          <div className="flex flex-col justify-center py-4">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-bold tracking-wide text-primary-700 shadow-sm">
                AriMar <span className="ml-1 text-primary-500">PRO</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Desde Playa de Arinaga
              </span>
            </div>
            <h1 className="max-w-2xl text-[2.65rem] font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]">
              ¿Cuántas mesas has perdido por no tener <span className="text-primary-600">una opción sin gluten?</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
              Cuando una persona celíaca no encuentra una alternativa adecuada, puede marcharse todo el grupo. AriMar PRO te ayuda a ampliar tu carta con elaboraciones de nuestra cocina 100 % sin gluten.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={consultaEmail}
                className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              >
                Hablemos de tu negocio <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <a
                href="#elaboraciones"
                className="inline-flex items-center justify-center rounded-xl border border-primary-200 bg-white px-6 py-3.5 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                Conoce nuestras elaboraciones
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Trato directo · Elaboraciones 100 % sin gluten · Gran Canaria
            </p>
          </div>
          <div className="relative min-h-[350px] overflow-hidden rounded-[1.8rem] bg-[#d5eae7] shadow-xl shadow-primary-900/10 md:min-h-[540px]">
            <Image
              src="/images/cocina-servicio.webp"
              alt="Preparación y servicio de elaboraciones en la cocina de AriMar"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent px-7 pb-7 pt-24 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-100">De nuestra cocina a la tuya</p>
              <p className="mt-2 text-xl font-semibold">Comida de verdad, hecha con cuidado.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12" aria-labelledby="situaciones-heading">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-primary-600">¿Te resulta familiar?</p>
          <h2 id="situaciones-heading" className="max-w-3xl text-3xl font-bold text-slate-900 md:text-4xl">No siempre pierdes a un cliente. A veces pierdes a toda la mesa.</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              'Un grupo pregunta por opciones sin gluten y termina eligiendo otro restaurante.',
              'Una persona celíaca solo encuentra una ensalada mientras los demás disfrutan de la carta.',
              'Tu equipo no puede asegurar cómo se ha preparado o servido un plato.',
            ].map((frase) => <div key={frase} className="rounded-2xl border border-primary-100 bg-[#f6faf8] p-6 text-lg leading-relaxed text-slate-700">{frase}</div>)}
          </div>
          <p className="mt-8 text-xl font-semibold text-primary-800">No necesitas transformar toda tu cocina para empezar a estudiar nuevas opciones.</p>
          <p className="mt-3 max-w-4xl text-slate-600">Eso sí: recibir un producto elaborado sin gluten no basta por sí solo. La conservación, regeneración, manipulación y servicio en tu establecimiento deben prevenir la contaminación cruzada.</p>
        </div>
      </section>

      {/* Confianza a partir del trabajo diario; sin sellos ni certificaciones inventadas */}
      <section className="border-b border-slate-100 bg-white px-5 py-14 sm:px-8 md:py-16 lg:px-12" aria-labelledby="confianza-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-primary-600">Lo que nos define</p>
            <h2 id="confianza-heading" className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              La tranquilidad empieza en cómo cocinamos.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Para nosotros, trabajar sin gluten significa cuidar el producto y prestar atención a cada detalle de la elaboración.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {ventajas.map((ventaja) => (
              <div key={ventaja.numero} className="border-t-2 border-primary-200 pt-6">
                <span className="text-sm font-bold tracking-widest text-primary-600">{ventaja.numero}</span>
                <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900">{ventaja.titulo}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elaboraciones: catálogo pendiente, sin atribuir formatos no confirmados */}
      <section id="elaboraciones" className="bg-[#f6faf8] px-5 py-16 sm:px-8 md:py-24 lg:px-12" aria-labelledby="elaboraciones-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.9fr] md:items-end md:gap-16">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-primary-600">Hecho en AriMar</p>
              <h2 id="elaboraciones-heading" className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                Elaboraciones con el sabor de nuestra casa de comidas.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-600">
              Queremos que puedas ofrecer a tus clientes buenos platos sin gluten sin perder la personalidad de tu establecimiento.
              Estas son algunas de las familias de productos que podemos valorar contigo.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { titulo: 'Costillas asadas a baja temperatura', detalle: 'Cocción lenta durante 14 horas. Una propuesta para terminar y servir según las condiciones acordadas.' },
              { titulo: 'Pechuga de pollo rellena de crema de ciruelas', detalle: 'Una alternativa diferente para enriquecer la carta.' },
              { titulo: 'Lasaña boloñesa', detalle: 'Una receta reconocible, pensada para facilitar una oferta más variada.' },
              { titulo: 'Croquetas artesanas', detalle: 'Jamón, pollo asado, atún con piquillo y queso de cabra con cebolla caramelizada.' },
              { titulo: 'Lomo de cerdo asado a baja temperatura', detalle: 'Carne asada con salsa, para valorar su incorporación a distintos servicios.' },
              { titulo: 'Pulled pork', detalle: 'Cerdo desmenuzado, versátil para distintas propuestas gastronómicas.' },
            ].map((producto, index) => (
              <article key={producto.titulo} className="overflow-hidden rounded-2xl border border-primary-100 bg-white p-7 shadow-sm">
                <span className="text-sm font-bold tracking-widest text-primary-600">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{producto.titulo}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{producto.detalle}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-primary-200 bg-white p-7">
            <h3 className="text-xl font-bold text-slate-900">Solicita nuestro catálogo profesional</h3>
            <p className="mt-2 text-slate-600">Consulta presentaciones, conservación, disponibilidad y condiciones de suministro. Cada propuesta se estudia con tu negocio.</p>
            <a href={consultaEmail} className="mt-4 inline-block font-bold text-primary-700 underline underline-offset-4">Solicitar información →</a>
          </div>
        </div>
      </section>

      {/* Una cocina humana y el cuidado en el envasado, no una fábrica */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12" aria-labelledby="trabajo-heading">
        <div className="mx-auto grid max-w-6xl gap-11 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-20">
          <div className="grid grid-cols-[1.1fr_0.8fr] items-end gap-3">
            <div className="relative min-h-[340px] overflow-hidden rounded-3xl bg-primary-50 md:min-h-[430px]">
              <Image
                src="/images/cocina-emplatado.webp"
                alt="Trabajo de emplatado y preparación en la cocina de AriMar"
                fill
                sizes="(max-width: 768px) 60vw, 27vw"
                className="object-cover"
              />
            </div>
            <div className="relative mb-6 min-h-[235px] overflow-hidden rounded-3xl bg-[#eaf3f1] md:min-h-[310px]">
              <Image
                src="/images/packaging-tupper.webp"
                alt="Presentación y envasado de comida preparada"
                fill
                sizes="(max-width: 768px) 38vw, 18vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.17em] text-primary-600">Cercanía y oficio</p>
            <h2 id="trabajo-heading" className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Detrás de cada producto hay una cocina, no una cadena de montaje.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              AriMar nace como una casa de comidas para todo el mundo. Cocinamos, probamos y preparamos elaboraciones que también pueden encontrar su lugar en otros establecimientos.
            </p>
            <p className="mt-5 leading-relaxed text-slate-600">
              Hablamos de recetas reconocibles, trabajo diario y atención a ingredientes y alérgenos.
              Si eres profesional, queremos conocer tu negocio antes de proponerte un producto.
            </p>
            <div className="mt-8 border-l-4 border-primary-400 bg-primary-50 px-6 py-5">
              <p className="text-lg font-semibold text-primary-800">AriMar FoodLab · Playa de Arinaga</p>
              <p className="mt-1 text-slate-600">«Tú disfruta, nosotros cocinamos».</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversación comercial, sin promesas logísticas no definidas */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-16 text-white sm:px-8 md:py-20 lg:px-12" aria-labelledby="contacto-pro-heading">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary-100">¿Trabajamos juntos?</p>
            <h2 id="contacto-pro-heading" className="text-3xl font-bold leading-tight md:text-4xl">
              Que una persona sea celíaca no debería decidir dónde come todo el grupo.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Cuéntanos qué elaboraciones te interesan. Estudiaremos contigo las cantidades, la conservación, la disponibilidad y las condiciones de suministro.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={consultaEmail}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-7 py-3.5 font-bold text-primary-800 transition-colors hover:bg-primary-50 md:w-72"
            >
              Solicitar información →
            </a>
            <a
              href={consultaWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/60 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 md:w-72"
            >
              Escribir por WhatsApp ↗
            </a>
            <p className="mt-2 text-center text-sm text-white/75 md:w-72">Sin precios ni compromisos automáticos: hablamos de cada propuesta.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500 sm:px-8 lg:px-12">
        <Link href="/" className="font-semibold text-primary-700 underline underline-offset-4">
          Volver a la web de AriMar
        </Link>
      </div>
    </main>
  )
}
