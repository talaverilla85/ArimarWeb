import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal - AriMar',
  description: 'Aviso legal de AriMar. Información legal y términos de uso.',
}

export default function AvisoLegalPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Aviso Legal
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Datos Identificativos</h2>
            <p className="text-slate-600 leading-relaxed">
              En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, 
              de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, 
              a continuación se reflejan los siguientes datos:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Denominación social: AriMar</li>
              <li>
                Domicilio: Avenida Polizón 67, Playa de Arinaga, Agüimes, Gran Canaria, España
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Objeto</h2>
            <p className="text-slate-600 leading-relaxed">
              El presente aviso legal regula el uso del sitio web www.arimarfoodlab.es (en adelante, el "Sitio Web"), 
              del cual es titular AriMar.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              La navegación por el sitio web de AriMar atribuye la condición de usuario del mismo e implica 
              la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este 
              Aviso Legal, que pueden sufrir modificaciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Condiciones de Uso</h2>
            <p className="text-slate-600 leading-relaxed">
              El acceso y uso del sitio web se rige por la legalidad vigente y por el principio de buena fe 
              comprometiéndose el usuario a realizar un buen uso de la web. No se permite el uso del sitio web 
              con fines o efectos ilícitos, prohibidos en este Aviso Legal, lesivos de los derechos e intereses 
              de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir 
              la normal utilización de los servicios o documentos, archivos y toda clase de contenidos almacenados 
              en cualquier equipo informático.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar es titular de todos los derechos sobre el software del sitio web así como de los derechos 
              de propiedad industrial e intelectual referidos a los contenidos que se incluyan, a excepción de 
              los derechos sobre productos y servicios de carácter público que no son propiedad de esta empresa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Responsabilidad</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar no se hace responsable de la información y contenidos almacenados en foros, chats, generadores 
              de blogs, comentarios, redes sociales o cualquier otro medio que permita a terceros publicar contenidos 
              de forma independiente en la página web.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Sin embargo, y en cumplimiento de lo dispuesto en los artículos 11 y 16 de la LSSI-CE, AriMar se 
              compromete a retirar o en su caso bloquear aquellos contenidos que puedan afectar o contravenir la 
              legislación nacional o internacional, derechos de terceros o la moral y el orden público.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Modificaciones</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar se reserva el derecho de realizar sin previo aviso las modificaciones que considere oportunas 
              en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a 
              través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Legislación Aplicable</h2>
            <p className="text-slate-600 leading-relaxed">
              La relación entre AriMar y el Usuario se regirá por la normativa española vigente y cualquier 
              controversia se someterá a los Juzgados y tribunales de la ciudad de Las Palmas de Gran Canaria.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

