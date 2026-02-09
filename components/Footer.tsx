import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-primary-500 font-semibold text-sm mb-3 italic">
              "Tu Disfruta, nosotros cocinamos por tí"
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Comida casera de calidad en Playa de Arinaga, Gran Canaria. 
              Profesionalidad, cercanía y el sabor de casa.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              Información
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/carta"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Carta
                </Link>
              </li>
              <li>
                <Link
                  href="/nuestra-cocina"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Nuestra Cocina
                </Link>
              </li>
              <li>
                <Link
                  href="/valores"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Valores
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} AriMar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

