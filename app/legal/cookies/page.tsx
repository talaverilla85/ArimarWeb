import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies - AriMar',
  description: 'Política de cookies de AriMar. Información sobre el uso de cookies en nuestro sitio web.',
}

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Política de Cookies
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="text-slate-600 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet, 
              smartphone) cuando visita un sitio web. Las cookies permiten que el sitio web recuerde sus acciones 
              y preferencias durante un período de tiempo, por lo que no tiene que volver a configurarlas cada 
              vez que regrese al sitio o navegue de una página a otra.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Tipos de Cookies que Utilizamos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              En nuestro sitio web utilizamos los siguientes tipos de cookies:
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Cookies Técnicas</h3>
            <p className="text-slate-600 leading-relaxed">
              Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de 
              las diferentes opciones o servicios que en ella existen.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Cookies de Análisis</h3>
            <p className="text-slate-600 leading-relaxed">
              Son aquellas que permiten el seguimiento y análisis del comportamiento de los usuarios en los sitios 
              web. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad 
              del sitio web y para la elaboración de perfiles de navegación de los usuarios.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Cookies de Terceros</h3>
            <p className="text-slate-600 leading-relaxed">
              Son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado 
              por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Cookies Específicas Utilizadas</h2>
            <div className="bg-slate-50 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Google Analytics</h3>
              <p className="text-slate-600 leading-relaxed mb-2">
                Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Esta herramienta utiliza 
                cookies para recopilar información sobre cómo los visitantes utilizan nuestro sitio.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>Duración:</strong> Cookies persistentes<br />
                <strong>Finalidad:</strong> Análisis estadístico del uso del sitio web
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Gestión de Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración 
              de las opciones del navegador instalado en su ordenador:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
                  Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
                  Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
                  Edge
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Consentimiento</h2>
            <p className="text-slate-600 leading-relaxed">
              Al navegar y continuar en nuestro sitio web estará consintiendo el uso de las cookies antes 
              descritas, en las condiciones contenidas en la presente Política de Cookies.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Puede retirar su consentimiento en cualquier momento eliminando las cookies almacenadas en su 
              navegador mediante la configuración del mismo, tal y como se ha indicado anteriormente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Actualización de la Política</h2>
            <p className="text-slate-600 leading-relaxed">
              AriMar puede modificar esta Política de Cookies en función de exigencias legislativas, 
              reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas 
              por la Agencia Española de Protección de Datos.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

