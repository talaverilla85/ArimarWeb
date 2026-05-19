import { NextResponse } from 'next/server'
import { ArimarApiError, CARTA_ALERGENOS_CACHE_SECONDS, fetchCartaAlergenos } from '@/lib/arimarCatalogServer'

/** Debe ser literal para Next.js segment config */
export const revalidate = 600

export async function GET() {
  try {
    const payload = await fetchCartaAlergenos()
    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': `public, s-maxage=${CARTA_ALERGENOS_CACHE_SECONDS}, stale-while-revalidate=60`,
      },
    })
  } catch (e) {
    const isProd = process.env.NODE_ENV === 'production'
    if (e instanceof ArimarApiError) {
      return NextResponse.json(
        { error: e.message },
        { status: e.statusCode },
      )
    }
    console.error('[carta-alergenos]', isProd ? (e instanceof Error ? e.message : e) : e)
    return NextResponse.json(
      {
        error: isProd
          ? 'No se pudo cargar la carta de alérgenos. Inténtelo más tarde.'
          : e instanceof Error
            ? e.message
            : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}
