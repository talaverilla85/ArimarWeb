import type { Metadata } from 'next'
import Link from 'next/link'
import SolicitudAsados from './SolicitudAsados'

export const metadata: Metadata = {
  title: 'Asados por encargo en Gran Canaria | AriMar',
  description: 'Pata asada canaria entera, tiras de costilla a baja temperatura, lomo asado entero y bondiola. Elaboraciones 100 % sin gluten con recogida en Playa de Arinaga.',
  alternates: { canonical: '/asados-por-encargo-gran-canaria' },
}

const platos = [
  {
    nombre: 'Pata asada canaria',
    subtitulo: 'Tradición canaria, pieza entera',
    formato: 'Se entrega entera, sin cortar',
    introduccion: 'La pata asada es uno de esos platos que reúnen a la gente alrededor de la mesa. Su atractivo está en el contraste entre el exterior bien dorado y la carne que se va sirviendo directamente de la pieza.',
    proceso: 'En AriMar preparamos la pata de cerdo y la asamos en horno con control de temperatura, vigilando el punto interior de la carne. El acabado final busca un exterior apetecible sin renunciar a la jugosidad del interior.',
    resultado: 'Una pieza de sabor profundo, con zonas de textura diferente y una presentación especialmente vistosa para compartir. Se entrega entera: no realizamos el corte ni el loncheado.',
    servicio: 'Ideal para celebraciones y reuniones. Puedes cortarla en casa a tu gusto, según el grosor y la cantidad que quieras servir.',
  },
  {
    nombre: 'Tiras de costilla de cerdo asadas',
    subtitulo: 'Cocción lenta, acabado al horno',
    formato: 'Tiras por unidades; peso a concretar',
    introduccion: 'Las costillas necesitan tiempo para desarrollar su mejor textura. Por eso trabajamos con tiras de costilla, un formato que nos permite controlar la preparación y concretar el peso del encargo.',
    proceso: 'Las sazonamos con ajo y romero y las cocinamos a baja temperatura durante un proceso prolongado, envasadas al vacío. Después, el acabado en horno permite dorar la superficie y aportar el carácter del asado. Puedes consultar el acabado con miel o con salsa barbacoa.',
    resultado: 'La cocción lenta busca una carne tierna y jugosa, mientras que el horno aporta color y una capa exterior más intensa. El resultado combina comodidad de servicio y sabor a asado.',
    servicio: 'Una opción práctica para compartir: se solicita por tiras y se concreta el peso antes de confirmar el pedido.',
  },
  {
    nombre: 'Lomo de cerdo asado',
    subtitulo: 'Una pieza entera, tierna y jugosa',
    formato: 'Se vende entero, sin lonchear',
    introduccion: 'El lomo de cerdo exige especial cuidado porque es una pieza relativamente magra. Bien trabajado, puede ofrecer una carne sorprendentemente tierna y jugosa, sin resultar seca.',
    proceso: 'En AriMar controlamos el asado y el punto de cocción para conservar la jugosidad de la pieza. Buscamos un exterior bien trabajado y un interior uniforme, agradable al corte y con todo el protagonismo del sabor de la carne.',
    resultado: 'Un asado de textura suave, fácil de combinar con distintas guarniciones y apropiado tanto para una comida familiar como para una mesa de celebración.',
    servicio: 'Se entrega la pieza entera. Recomendamos cortarla en lonchas al servir, pero el corte lo realiza el cliente en casa.',
  },
  {
    nombre: 'Bondiola de cerdo asada',
    subtitulo: 'Sabor intenso y textura melosa',
    formato: 'Pieza asada por encargo',
    introduccion: 'La bondiola, también conocida como cabeza de lomo, destaca por su grasa infiltrada. Ese veteado natural es una de las claves de su personalidad y la diferencia de otros cortes más magros.',
    proceso: 'Es una pieza especialmente adecuada para un asado pausado. El calor y el tiempo ayudan a transformar sus tejidos y a desarrollar una textura tierna, manteniendo la riqueza de sabor propia del corte.',
    resultado: 'Una carne sabrosa, con una sensación jugosa y melosa en boca. Es una alternativa excelente para quienes buscan un asado con carácter y una textura generosa.',
    servicio: 'Se prepara por encargo para recoger en AriMar. El tamaño y la presentación se concretan al solicitar presupuesto.',
  },
]

export default function Page() {
  return (
    <main className="bg-white">
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-300 font-semibold uppercase tracking-widest mb-4">AriMar · Playa de Arinaga</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Asados por encargo en Gran Canaria</h1>
          <p className="text-xl max-w-3xl text-slate-200 leading-relaxed">Cuatro piezas con personalidad propia, preparadas en nuestra cocina 100 % sin gluten. Conoce cómo las elaboramos, elige tus favoritas y recoge tu encargo en AriMar.</p>
          <a href="#solicitud" className="inline-block mt-8 rounded-lg bg-emerald-600 px-7 py-3 font-semibold text-white">Solicitar presupuesto</a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Cuatro formas de disfrutar de un buen asado</h2>
        <p className="text-slate-600 text-lg mb-12 max-w-3xl">No todos los cortes se comportan igual en el horno. El tiempo, la temperatura y el acabado se adaptan a cada pieza para conseguir su mejor expresión.</p>
        <div className="space-y-14">
          {platos.map((plato, i) => (
            <article key={plato.nombre} className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="bg-slate-100 min-h-72 flex items-center justify-center text-slate-500 text-center p-8" role="img" aria-label={`Fotografía real pendiente de ${plato.nombre}`}>
                  <span>Fotografía real de AriMar<br />pendiente de incorporar</span>
                </div>
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-3">Especialidad {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">{plato.nombre}</h3>
                  <p className="text-lg font-medium text-emerald-800 mb-5">{plato.subtitulo}</p>
                  <p className="text-slate-600 leading-relaxed">{plato.introduccion}</p>
                  <p className="mt-6 text-sm font-semibold text-slate-700">{plato.formato}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 p-7 md:p-10 bg-white border-t border-slate-100">
                <div><h4 className="text-lg font-bold mb-3">Cómo lo elaboramos</h4><p className="text-slate-600 leading-relaxed">{plato.proceso}</p></div>
                <div><h4 className="text-lg font-bold mb-3">El resultado</h4><p className="text-slate-600 leading-relaxed">{plato.resultado}</p></div>
                <div><h4 className="text-lg font-bold mb-3">Cómo disfrutarlo</h4><p className="text-slate-600 leading-relaxed">{plato.servicio}</p></div>
              </div>
              <div className="px-7 md:px-10 pb-8"><a href="#solicitud" className="font-semibold text-emerald-700">Consultar disponibilidad y presupuesto →</a></div>
            </article>
          ))}
        </div>
      </section>
      <section id="solicitud" className="bg-slate-50 px-6 py-16"><div className="max-w-3xl mx-auto"><SolicitudAsados /></div></section>
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-4">Recogida en AriMar</h2>
        <p className="text-slate-600">Los encargos se recogen en nuestro establecimiento de Playa de Arinaga. La solicitud no constituye un pedido confirmado: contactaremos contigo para concretar disponibilidad, cantidades, precio y fecha.</p>
        <p className="mt-4"><Link href="/contacto" className="text-emerald-700 underline">Contacto y cómo llegar</Link></p>
      </section>
    </main>
  )
}
