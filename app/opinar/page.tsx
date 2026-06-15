import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Deja tu opinión | AriMar FoodLab',
  description:
    'Cuéntanos tu experiencia en AriMar: comida, servicio y ambiente. Tu reseña en Google ayuda a quien busca opciones en Playa de Arinaga.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: '/opinar',
  },
}

export default function OpinarPage() {
  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50/50 px-6 py-10 md:px-12 md:py-14 text-center shadow-sm">
          <div className="flex justify-center gap-1 mb-5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 md:w-10 md:h-10 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-3">
            Tu opinión cuenta
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            ¿Te ha gustado AriMar?
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
            Si ya nos has visitado, cuéntanos en Google cómo fue tu experiencia en conjunto: la comida, el trato, la
            recogida, el local… Un comentario sincero ayuda a quienes buscan dónde comer en Arinaga a saber qué se van
            a encontrar cuando vengan.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto mt-4">
            Si puedes, añade fotos a tu reseña — la vitrina, tu plato o el momento —. Así otras personas pueden
            imaginarse mejor la visita.
          </p>
        </header>

        <div className="mt-8 md:mt-10 space-y-6">
          <a
            href={siteConfig.googleReviewUrl}
            className="flex w-full justify-center items-center gap-3 px-8 py-4 min-h-[52px] bg-primary-500 text-white text-base md:text-lg font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <GoogleIcon className="w-6 h-6 shrink-0" />
            Dejar reseña en Google
          </a>

          <p className="text-center text-sm text-slate-500 leading-relaxed px-2">
            Solo te llevará un minuto. Necesitarás una cuenta de Google; en el formulario podrás escribir tu comentario
            y subir fotos.
          </p>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto justify-center px-6 py-3 min-h-[44px] border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Volver al inicio
            </Link>
            <Link
              href="/carta"
              className="inline-flex w-full sm:w-auto justify-center px-6 py-3 min-h-[44px] border border-primary-200 text-primary-700 text-sm font-semibold rounded-lg hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Ver carta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
