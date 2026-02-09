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
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Cookies que Utilizamos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              En nuestro sitio web utilizamos únicamente <strong>cookies técnicas</strong>, necesarias para el 
              correcto funcionamiento del sitio (por ejemplo, sesión o preferencias de visualización). No utilizamos 
              cookies de análisis, publicitarias ni de terceros.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Son cookies que permiten la navegación a través de la página web y el uso de las opciones y servicios 
              que en ella existen. No requieren consentimiento previo por ser estrictamente necesarias.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Gestión de Cookies</h2>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Consentimiento</h2>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Actualización de la Política</h2>
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

