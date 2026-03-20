import Link from 'next/link'
import Logo from './Logo'
import { siteConfig } from '@/lib/siteConfig'

const phoneDisplay = `+34 ${siteConfig.whatsappPhoneE164.slice(3, 6)} ${siteConfig.whatsappPhoneE164.slice(6, 9)} ${siteConfig.whatsappPhoneE164.slice(9)}`

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-primary-500 font-semibold text-sm mb-3 italic">
              "Tú disfruta, nosotros cocinamos por ti"
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Comida casera de calidad en Playa de Arinaga, Gran Canaria. 
              Profesionalidad, cercanía y el sabor de casa.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed" aria-label="Nombre, dirección y teléfono">
              <span className="font-semibold text-slate-800">AriMar FoodLab</span>
              {' · '}
              {siteConfig.address.street}, local, {siteConfig.address.locality}
              {' · '}
              <a href={`tel:${siteConfig.whatsappPhoneE164}`} className="text-primary-600 underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded">
                {phoneDisplay}
              </a>
              {' · '}
              <a
                href="https://www.instagram.com/arimarfoodlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded"
              >
                Instagram @arimarfoodlab
              </a>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              Información
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/carta"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Descubrir la carta
                </Link>
              </li>
              <li>
                <Link
                  href="/nuestra-cocina"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Nuestra Cocina
                </Link>
              </li>
              <li>
                <Link
                  href="/valores"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Valores
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Ver ubicación
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/pedidos-reembolsos"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Pedidos y reembolsos
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/entrega-recogida"
                  className="text-sm text-slate-600 underline underline-offset-2 hover:text-primary-500 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded transition-colors"
                >
                  Entrega y recogida
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} AriMar FoodLab. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

