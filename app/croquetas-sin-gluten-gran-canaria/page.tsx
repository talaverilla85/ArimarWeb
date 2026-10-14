import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Croquetas caseras 100 % sin gluten en Gran Canaria | AriMar',
  description: 'Descubre las croquetas artesanas sin gluten de AriMar: jamón, queso de cabra y cebolla, atún y piquillo, y pollo asado. Elaboradas a mano en Playa de Arinaga.',
  alternates: { canonical: '/croquetas-sin-gluten-gran-canaria' },
}

const variedades = [
  { nombre: 'Croquetas de jamón', descripcion: 'Una de las grandes clásicas. El sabor del jamón se integra en una masa cremosa y suave, con el contraste de un rebozado dorado y crujiente.' },
  { nombre: 'Croquetas de queso de cabra y cebolla', descripcion: 'El carácter del queso de cabra se combina con la suavidad y el dulzor de la cebolla. Una variedad con personalidad propia y un interior especialmente cremoso.' },
  { nombre: 'Croquetas de atún y pimientos del piquillo', descripcion: 'Una combinación de sabores reconocibles: atún y piquillo en una masa delicada, equilibrada y pensada para disfrutar de ambos ingredientes.' },
  { nombre: 'Croquetas de pollo asado', descripcion: 'Aprovechamos el sabor del pollo asado para preparar una croqueta jugosa, de gusto profundo y textura cremosa.' },
]

export default function Page() {
  return <main className="bg-[#fafbf9]">
    <section className="bg-slate-900 text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-emerald-300 font-semibold uppercase tracking-widest mb-4">AriMar · Playa de Arinaga</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Croquetas caseras 100 % sin gluten en Gran Canaria</h1>
        <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">Cuatro variedades elaboradas a mano, con un interior cremoso y un exterior crujiente. Todo el sabor de una buena croqueta, en nuestra cocina especializada 100 % sin gluten.</p>
        <a href="#variedades" className="inline-block mt-8 bg-emerald-600 rounded-lg px-7 py-3 font-semibold">Descubre nuestras variedades</a>
      </div>
    </section>
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-5">Croquetas elaboradas a mano, de principio a fin</h2>
      <div className="max-w-3xl space-y-4 text-slate-700 leading-relaxed text-lg">
        <p>En AriMar preparamos nuestras croquetas a partir de una masa suave y cremosa, incorporando los ingredientes de cada variedad para que tengan un sabor reconocible y diferente.</p>
        <p>Después viene el trabajo artesanal: damos forma a cada croqueta a mano y la rebozamos con ingredientes sin gluten. Al freírla buscamos el contraste que tanto nos gusta: una capa exterior crujiente y un interior delicado y cremoso.</p>
        <p>Elaboramos nuestras croquetas en una cocina 100 % sin gluten, sin renunciar a las recetas tradicionales ni a la variedad de sabores.</p>
      </div>
    </section>
    <section id="variedades" className="bg-[#eaf2ee] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Nuestras cuatro variedades de croquetas sin gluten</h2>
        <p className="text-slate-600 mb-10">Cada sabor tiene su propia personalidad. Estas son las cuatro variedades que preparamos en AriMar.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {variedades.map((v, i) => <article key={v.nombre} className="rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-md shadow-emerald-950/5">
            <div className="bg-emerald-50 min-h-44 flex items-center justify-center text-center text-slate-500 p-6">Fotografía real de AriMar pendiente</div>
            <div className="p-7">
              <p className="text-emerald-700 text-sm font-semibold mb-3">VARIEDAD {String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-2xl font-bold mb-4">{v.nombre}</h3>
              <p className="text-slate-600 leading-relaxed">{v.descripcion}</p>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-5">Raciones de 9 unidades, encargos grandes y croquetas congeladas</h2>
      <p className="text-slate-600 max-w-3xl leading-relaxed mb-5">Nuestra ración habitual incluye 9 croquetas. Si necesitas una cantidad mayor para una reunión, celebración o evento, ponte en contacto con nosotros y estudiaremos tu encargo.</p>
      <p className="text-slate-600 max-w-3xl leading-relaxed mb-8">También puedes consultarnos la posibilidad de adquirir nuestras croquetas congeladas, para conservarlas y prepararlas cuando las necesites. Los formatos y cantidades de venta congelada se concretan directamente con AriMar. Si tienes un negocio de hostelería o una tienda especializada, consúltanos las opciones de suministro profesional.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/comida-para-eventos-gran-canaria" className="rounded-lg bg-emerald-700 text-white px-6 py-3 font-semibold">Croquetas para celebraciones</Link>
        <Link href="/profesionales" className="rounded-lg border border-emerald-200 px-6 py-3 font-semibold text-emerald-800">Información para profesionales</Link>
        <a href="mailto:info@arimarfoodlab.es?subject=Consulta%20sobre%20croquetas%20AriMar" className="rounded-lg border border-slate-300 px-6 py-3 font-semibold">Consultar disponibilidad</a>
      </div>
      <p className="text-sm text-slate-500 mt-8">Recogida en AriMar, Playa de Arinaga. La disponibilidad de variedades puede variar.</p>
    </section>
  </main>
}
