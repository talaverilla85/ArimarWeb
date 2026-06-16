import { NextResponse } from 'next/server'
import { GOOGLE_REVIEWS_CACHE_SECONDS, getGoogleReviewsResult } from '@/lib/googleReviews'

/** Debe ser literal para Next.js segment config (6 h). */
export const revalidate = 21_600

const ERROR_MESSAGES: Record<string, string> = {
  missing_api_key:
    'Falta GOOGLE_PLACES_API_KEY en Vercel (Settings → Environment Variables → Production) y redeploy.',
  place_not_found:
    'Google no encontró el negocio. Añade GOOGLE_PLACE_ID en Vercel o revisa el nombre en Google Maps.',
  google_api_error:
    'Error al llamar a Google Places. Activa Places API en Google Cloud y revisa la clave.',
  no_reviews: 'El negocio aún no tiene valoraciones públicas en Google.',
}

export async function GET() {
  const result = await getGoogleReviewsResult()

  if (!result.ok) {
    const message = ERROR_MESSAGES[result.reason] ?? 'Reseñas no disponibles.'
    return NextResponse.json(
      {
        error: message,
        reason: result.reason,
        detail: result.detail ?? null,
      },
      { status: 503 },
    )
  }

  return NextResponse.json(result.data, {
    headers: {
      'Cache-Control': `public, s-maxage=${GOOGLE_REVIEWS_CACHE_SECONDS}, stale-while-revalidate=300`,
    },
  })
}
