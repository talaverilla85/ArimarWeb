import Link from 'next/link'

type LeaveReviewCtaProps = {
  variant?: 'card' | 'inline'
  className?: string
}

export default function LeaveReviewCta({ variant = 'card', className = '' }: LeaveReviewCtaProps) {
  if (variant === 'inline') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-slate-600 text-sm md:text-base mb-4">
          ¿Ya nos has visitado? Cuéntanos cómo fue la experiencia — comida, servicio y ambiente — y ayuda a quien busca
          opciones a saber qué encontrará aquí.
        </p>
        <Link
          href="/opinar"
          className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-3 min-h-[48px] border border-primary-200 text-primary-700 text-sm md:text-base font-semibold rounded-lg hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <StarIcon className="w-5 h-5 text-amber-500" />
          ¿Te ha gustado AriMar?
        </Link>
      </div>
    )
  }

  return (
    <section
      className={`rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50/40 px-6 py-8 md:px-10 md:py-10 text-center shadow-sm ${className}`}
      aria-labelledby="leave-review-heading"
    >
      <div className="flex justify-center gap-1 mb-4" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
        ))}
      </div>
      <h2 id="leave-review-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
        ¿Te ha gustado AriMar?
      </h2>
      <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-6 text-sm md:text-base">
        Si ya nos conoces, deja tu opinión en Google sobre la comida, el trato y la experiencia en general. Ayudas a
        quien busca dónde comer en Arinaga a saber qué le espera — y si puedes, añade fotos.
      </p>
      <Link
        href="/opinar"
        className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 min-h-[48px] bg-primary-500 text-white text-base font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        Deja tu opinión
        <span aria-hidden>→</span>
      </Link>
    </section>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
