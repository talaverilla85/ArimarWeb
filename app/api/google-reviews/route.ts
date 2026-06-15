import { NextResponse } from 'next/server'
import { GOOGLE_REVIEWS_CACHE_SECONDS, getGoogleReviews } from '@/lib/googleReviews'

export const revalidate = GOOGLE_REVIEWS_CACHE_SECONDS

export async function GET() {
  const data = await getGoogleReviews()

  if (!data) {
    return NextResponse.json(
      { error: 'Reseñas no disponibles. Configure GOOGLE_PLACES_API_KEY en el servidor.' },
      { status: 503 },
    )
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${GOOGLE_REVIEWS_CACHE_SECONDS}, stale-while-revalidate=300`,
    },
  })
}
