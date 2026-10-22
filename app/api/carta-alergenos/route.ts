import { NextResponse } from 'next/server'
import { ArimarApiError, CARTA_ALERGENOS_CACHE_SECONDS, fetchCartaAlergenos } from '@/lib/arimarCatalogServer'

/** Debe ser literal para Next.js segment config */
export const revalidate = 0

// Ocultar temporalmente el catálogo de alérgenos hasta validar las fichas en ARIST.
// Revertir este indicador y volver a revalidate = 600 cuando esté validado.
const CATALOGO_ALERGENOS_PUBLICO = false

export async function GET() {
  if (!CATALOGO_ALERGENOS_PUBLICO) {
    return NextResponse.json(
      { error: 'La consulta online de alérgenos está temporalmente en revisión. Contacta con AriMar antes de pedir.' },
      { status: 503, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  }
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
