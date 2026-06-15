import Image from 'next/image'
import Link from 'next/link'
import { getGoogleReviews } from '@/lib/googleReviews'
import { siteConfig } from '@/lib/siteConfig'

export default async function GoogleReviewsSection() {
  const data = await getGoogleReviews()
  if (!data || data.userRatingCount === 0) return null

  const ratingLabel = data.rating.toLocaleString('es-ES', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <section
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200"
      aria-labelledby="google-reviews-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-3">
            Reseñas de Google
          </p>
          <h2 id="google-reviews-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <p className="text-4xl md:text-5xl font-bold text-slate-800 tabular-nums">{ratingLabel}</p>
            <div className="text-center sm:text-left">
              <StarRow rating={data.rating} size="lg" />
              <p className="text-slate-600 text-sm md:text-base mt-1">
                {data.userRatingCount.toLocaleString('es-ES')}{' '}
                {data.userRatingCount === 1 ? 'valoración' : 'valoraciones'} en Google
              </p>
            </div>
          </div>
        </div>

        {data.reviews.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 list-none pl-0 mb-10">
            {data.reviews.map((review) => (
              <li
                key={`${review.authorName}-${review.relativeTime}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  {review.profilePhotoUrl ? (
                    <Image
                      src={review.profilePhotoUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full shrink-0"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold shrink-0"
                      aria-hidden
                    >
                      {review.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{review.authorName}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <StarRow rating={review.rating} size="sm" />
                      {review.relativeTime ? (
                        <span className="text-xs text-slate-500">{review.relativeTime}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-5">
                  {review.text}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={siteConfig.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 min-h-[48px] border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Ver en Google
          </a>
          <Link
            href="/opinar"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 min-h-[48px] bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Deja tu opinión
          </Link>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">Reseñas publicadas por clientes en Google</p>
      </div>
    </section>
  )
}

function StarRow({ rating, size }: { rating: number; size: 'sm' | 'lg' }) {
  const starClass = size === 'lg' ? 'w-6 h-6 md:w-7 md:h-7' : 'w-4 h-4'
  const clamped = Math.max(0, Math.min(5, rating))

  return (
    <div className="flex gap-0.5" role="img" aria-label={`${clamped} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, clamped - i))
        return (
          <span key={i} className={`relative inline-block ${starClass}`} aria-hidden>
            <svg className={`${starClass} text-slate-200`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {fill > 0 ? (
              <svg
                className={`${starClass} text-amber-400 absolute inset-0`}
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
