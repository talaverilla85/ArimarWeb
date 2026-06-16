import { unstable_cache } from 'next/cache'
import { siteConfig } from '@/lib/siteConfig'

/** Refresco en servidor (horas). Las reseñas no cambian cada minuto. */
export const GOOGLE_REVIEWS_CACHE_SECONDS = 6 * 60 * 60

const ARIMAR_LAT = 27.857688
const ARIMAR_LNG = -15.414344

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

export type GoogleReviewsErrorReason =
  | 'missing_api_key'
  | 'place_not_found'
  | 'google_api_error'
  | 'no_reviews'

export type GoogleReviewsResult =
  | { ok: true; data: GoogleReviewsData }
  | { ok: false; reason: GoogleReviewsErrorReason; detail?: string }

const PLACE_QUERIES = [
  `AriMar FoodLab, ${siteConfig.address.street}, ${siteConfig.address.locality}`,
  'AriMar FoodLab Playa de Arinaga',
  'AriMar Agüimes Gran Canaria',
]

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
  error_message?: string
  candidates?: Array<{ place_id?: string }>
}

type NearbySearchResponse = {
  status: string
  error_message?: string
  results?: Array<{ place_id?: string; name?: string }>
}

async function findPlaceFromText(apiKey: string, query: string): Promise<string | null> {
  const input = encodeURIComponent(query)
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&key=${apiKey}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null

  const json = (await res.json()) as FindPlaceResponse
  if (json.status !== 'OK') {
    console.error('[google-reviews] findplace', query, json.status, json.error_message)
    return null
  }

  return json.candidates?.[0]?.place_id ?? null
}

async function findPlaceNearby(apiKey: string): Promise<string | null> {
  const params = new URLSearchParams({
    location: `${ARIMAR_LAT},${ARIMAR_LNG}`,
    radius: '300',
    keyword: 'AriMar FoodLab',
    key: apiKey,
  })
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null

  const json = (await res.json()) as NearbySearchResponse
  if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
    console.error('[google-reviews] nearby', json.status, json.error_message)
    return null
  }

  const match =
    json.results?.find((r) => r.name?.toLowerCase().includes('arimar')) ?? json.results?.[0]

  return match?.place_id ?? null
}

async function resolvePlaceId(apiKey: string): Promise<{ placeId: string | null; detail?: string }> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim()
  if (configured) return { placeId: configured }

  for (const query of PLACE_QUERIES) {
    const placeId = await findPlaceFromText(apiKey, query)
    if (placeId) return { placeId }
  }

  const nearbyId = await findPlaceNearby(apiKey)
  if (nearbyId) return { placeId: nearbyId }

  return { placeId: null, detail: 'No se encontró el negocio en Google Places' }
}

function mapReviews(result: NonNullable<PlaceDetailsResponse['result']>): GoogleReviewsData {
  const { rating, user_ratings_total, reviews } = result

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

async function fetchGoogleReviewsUncached(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  if (!apiKey) {
    return { ok: false, reason: 'missing_api_key' }
  }

  const { placeId, detail: placeDetail } = await resolvePlaceId(apiKey)
  if (!placeId) {
    return { ok: false, reason: 'place_not_found', detail: placeDetail }
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'rating,user_ratings_total,reviews',
    language: 'es',
    key: apiKey,
  })

  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return { ok: false, reason: 'google_api_error', detail: `HTTP ${res.status}` }
  }

  const json = (await res.json()) as PlaceDetailsResponse
  if (json.status !== 'OK' || !json.result) {
    return {
      ok: false,
      reason: 'google_api_error',
      detail: json.error_message ?? json.status,
    }
  }

  const data = mapReviews(json.result)
  if (data.userRatingCount === 0) {
    return { ok: false, reason: 'no_reviews', detail: 'Sin valoraciones públicas aún' }
  }

  return { ok: true, data }
}

const getCachedGoogleReviews = unstable_cache(
  async () => {
    const result = await fetchGoogleReviewsUncached()
    if (!result.ok) throw new Error(`${result.reason}:${result.detail ?? ''}`)
    return result.data
  },
  ['arimar-google-reviews-v3'],
  { revalidate: GOOGLE_REVIEWS_CACHE_SECONDS },
)

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const result = await getGoogleReviewsResult()
  return result.ok ? result.data : null
}

export async function getGoogleReviewsResult(): Promise<GoogleReviewsResult> {
  try {
    const data = await getCachedGoogleReviews()
    return { ok: true, data }
  } catch (e) {
    const message = e instanceof Error ? e.message : ''
    if (message.startsWith('missing_api_key')) {
      return { ok: false, reason: 'missing_api_key' }
    }
    // Reintento sin caché (p. ej. tras añadir la clave en Vercel o si falló el primer intento)
    return fetchGoogleReviewsUncached()
  }
}
