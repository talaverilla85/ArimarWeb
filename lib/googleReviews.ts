import { unstable_cache } from 'next/cache'
import { siteConfig } from '@/lib/siteConfig'

/** Refresco en servidor (horas). Las reseñas no cambian cada minuto. */
export const GOOGLE_REVIEWS_CACHE_SECONDS = 6 * 60 * 60

export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTime: string
  profilePhotoUrl?: string
}

export type GoogleReviewsData = {
  rating: number
  userRatingCount: number
  reviews: GoogleReview[]
  fetchedAt: string
}

const PLACE_SEARCH_QUERY = `${siteConfig.legal.businessName}, ${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.municipality}`

type PlaceDetailsResponse = {
  status: string
  error_message?: string
  result?: {
    rating?: number
    user_ratings_total?: number
    reviews?: Array<{
      author_name?: string
      rating?: number
      text?: string
      relative_time_description?: string
      profile_photo_url?: string
    }>
  }
}

type FindPlaceResponse = {
  status: string
  candidates?: Array<{ place_id?: string }>
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim()
  if (configured) return configured

  const input = encodeURIComponent(PLACE_SEARCH_QUERY)
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&key=${apiKey}`

  const res = await fetch(url, { next: { revalidate: 86_400 } })
  if (!res.ok) return null

  const json = (await res.json()) as FindPlaceResponse
  if (json.status !== 'OK') {
    console.error('[google-reviews] findplace', json.status)
    return null
  }

  return json.candidates?.[0]?.place_id ?? null
}

async function fetchGoogleReviewsRaw(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  if (!apiKey) return null

  const placeId = await resolvePlaceId(apiKey)
  if (!placeId) return null

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'rating,user_ratings_total,reviews',
    language: 'es',
    key: apiKey,
  })

  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
    next: { revalidate: GOOGLE_REVIEWS_CACHE_SECONDS },
  })

  if (!res.ok) return null

  const json = (await res.json()) as PlaceDetailsResponse
  if (json.status !== 'OK' || !json.result) {
    console.error('[google-reviews] details', json.status, json.error_message)
    return null
  }

  const { rating, user_ratings_total, reviews } = json.result

  return {
    rating: rating ?? 0,
    userRatingCount: user_ratings_total ?? 0,
    reviews: (reviews ?? [])
      .filter((r) => r.text?.trim())
      .slice(0, 5)
      .map((r) => ({
        authorName: r.author_name ?? 'Cliente',
        rating: r.rating ?? 0,
        text: r.text?.trim() ?? '',
        relativeTime: r.relative_time_description ?? '',
        profilePhotoUrl: r.profile_photo_url,
      })),
    fetchedAt: new Date().toISOString(),
  }
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  return unstable_cache(fetchGoogleReviewsRaw, ['arimar-google-reviews-v1'], {
    revalidate: GOOGLE_REVIEWS_CACHE_SECONDS,
  })()
}
