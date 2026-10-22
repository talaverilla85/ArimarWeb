import type { Metadata } from 'next'
import CookiePreferencesButton from '@/components/CookiePreferencesButton'

export const metadata: Metadata = {
  alternates: { canonical: '/legal/cookies' },
  title: 'Política de Cookies - AriMar',
  description: 'Información sobre Google Analytics 4, las cookies utilizadas y cómo aceptar, rechazar o retirar el consentimiento en AriMar.',
}

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
          Política de Cookies
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-sm text-slate-500">Actualizada el 22 de octubre de 2026.</p>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Cookies y tecnologías que utilizamos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              La web de AriMar utiliza <strong>Google Analytics 4 (GA4) de Google</strong> para medir
              estadísticas de visitas e interacciones, como clics en pedidos, WhatsApp o cómo llegar.
              <strong> GA4 solamente se activa si acepta las cookies de análisis.</strong> Si las rechaza,
              no cargamos el script de Google Analytics desde esta web.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm text-left text-slate-600">
                <thead><tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-200 p-3">Tecnología</th>
                  <th className="border border-slate-200 p-3">Finalidad</th>
                  <th className="border border-slate-200 p-3">Duración orientativa</th>
                </tr></thead>
                <tbody>
                  <tr><td className="border border-slate-200 p-3">_ga</td>
                    <td className="border border-slate-200 p-3">Identificar visitantes de forma estadística (Google Analytics, solo con consentimiento).</td>
                    <td className="border border-slate-200 p-3">Hasta 2 años.</td></tr>
                  <tr><td className="border border-slate-200 p-3">_ga_*</td>
                    <td className="border border-slate-200 p-3">Mantener el estado de las sesiones de análisis (Google Analytics, solo con consentimiento).</td>
                    <td className="border border-slate-200 p-3">Hasta 2 años.</td></tr>
                  <tr><td className="border border-slate-200 p-3">cookie_consent y cookie_consent_date</td>
                    <td className="border border-slate-200 p-3">Recordar la decisión de aceptar o rechazar el análisis y cuándo se tomó. Se guardan en el almacenamiento local del navegador (no son cookies).</td>
                    <td className="border border-slate-200 p-3">Hasta 24 meses, salvo que cambie su decisión o borre los datos del navegador.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 leading-relaxed mt-4">
              No instalamos cookies de publicidad desde esta web. La duración efectiva depende también
              del navegador y de la configuración de Google. Puede consultar la{' '}
              <a href="https://support.google.com/analytics/answer/11397207?hl=es" target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">información de Google Analytics sobre cookies</a>.
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

          <section className="mb-8 scroll-mt-32" id="preferencias">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Consentimiento y preferencias</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Puede aceptar o rechazar las cookies de análisis desde el aviso inicial.
              Rechazarlas no impide navegar ni realizar pedidos. Continuar navegando por la web no supone aceptar.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Puede cambiar su elección o retirar el consentimiento en cualquier momento desde este botón
              o desde «Configurar cookies» en el pie de la página. Si retira su consentimiento,
              detenemos la analítica y eliminamos las cookies de Google Analytics de este dominio
              que sean accesibles desde su navegador.
            </p>
            <CookiePreferencesButton />
            <p className="text-slate-600 leading-relaxed mt-4">
              La medición solo se reanudará si vuelve a aceptar las cookies de análisis.
              También puede bloquear o eliminar cookies desde la configuración del navegador.
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

