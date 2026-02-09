import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad - AriMar',
  description: 'Política de privacidad de AriMar. Protección de datos personales.',
}

export default function PrivacidadPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Información General</h2>
            <p className="text-slate-600 leading-relaxed">
              En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo 
              de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento 
              de datos personales y a la libre circulación de estos datos (RGPD), y de la Ley Orgánica 3/2018, de 5 de 
              diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos 
              sobre el tratamiento de sus datos personales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Responsable del Tratamiento</h2>
            <p className="text-slate-600 leading-relaxed">
              El responsable del tratamiento de los datos personales es:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Denominación: AriMar</li>
              <li>Domicilio: Playa de Arinaga, Gran Canaria, España</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Datos que Recopilamos</h2>
            <p className="text-slate-600 leading-relaxed">
              Podemos recopilar los siguientes tipos de datos personales:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Datos de identificación: nombre, apellidos</li>
              <li>Datos de contacto: dirección de correo electrónico, número de teléfono</li>
              <li>Datos de navegación: dirección IP, cookies, datos de uso del sitio web</li>
              <li>Datos de pedidos: información relacionada con los pedidos realizados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Finalidad del Tratamiento</h2>
            <p className="text-slate-600 leading-relaxed">
              Los datos personales que recopilamos se utilizan para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Gestión y procesamiento de pedidos</li>
              <li>Comunicación con el cliente sobre su pedido</li>
              <li>Mejora de nuestros servicios</li>
              <li>Cumplimiento de obligaciones legales</li>
              <li>Análisis estadístico y mejora de la experiencia del usuario</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Base Legal</h2>
            <p className="text-slate-600 leading-relaxed">
              El tratamiento de sus datos personales se basa en:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>El consentimiento del interesado</li>
              <li>La ejecución de un contrato o medidas precontractuales</li>
              <li>El cumplimiento de obligaciones legales</li>
              <li>El interés legítimo del responsable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Conservación de los Datos</h2>
            <p className="text-slate-600 leading-relaxed">
              Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para 
              la que fueron recabados y para determinar las posibles responsabilidades que se pudieran derivar de 
              dicha finalidad y del tratamiento de los datos, así como durante los plazos establecidos en la legislación aplicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Derechos del Interesado</h2>
            <p className="text-slate-600 leading-relaxed">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos o incompletos</li>
              <li>Suprimir sus datos cuando ya no sean necesarios</li>
              <li>Oponerse al tratamiento de sus datos</li>
              <li>Solicitar la limitación del tratamiento</li>
              <li>Portabilidad de los datos</li>
              <li>Retirar el consentimiento en cualquier momento</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Para ejercer estos derechos, puede contactarnos a través de los medios indicados en la sección de contacto.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Seguridad</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los 
              datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Modificaciones</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar se reserva el derecho de modificar la presente Política de Privacidad para adaptarla a 
              novedades legislativas, jurisprudenciales o de interpretación de la Agencia Española de Protección de Datos.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

