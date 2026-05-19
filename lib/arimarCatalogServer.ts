/**
 * Cliente servidor: login + catálogo AriMar Gestión.
 * Solo importar desde API routes / Server Components (nunca en el browser).
 */

import {
  allergensFromProduct,
  esElaboracionCatalogo,
  type CartaAlergenosPayload,
  type ElaboracionAlergenos,
} from '@/lib/alergenosMatriz'

const CACHE_SECONDS = 600 // 10 minutos

export { CACHE_SECONDS as CARTA_ALERGENOS_CACHE_SECONDS }

export class ArimarApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ArimarApiError'
    this.statusCode = statusCode
  }
}

async function arimarJson(url: string, options: RequestInit = {}): Promise<unknown> {
  const res = await fetch(url, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(25_000),
  })
  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    const detail = (data as { detail?: unknown })?.detail
    let msg: string
    if (typeof detail === 'string') {
      msg = detail
    } else if (Array.isArray(detail)) {
      msg = detail
        .map((d) => (typeof d === 'object' && d && 'msg' in d ? String((d as { msg: string }).msg) : JSON.stringify(d)))
        .join('; ')
    } else {
      msg = (data as { error?: string })?.error || `AriMar HTTP ${res.status}`
    }
    throw new ArimarApiError(msg, res.status)
  }
  return data
}

function requireEnv() {
  const base = (process.env.ARIMAR_API_URL || '').replace(/\/$/, '')
  const email = process.env.ARIMAR_LOGIN_EMAIL?.trim()
  const password = process.env.ARIMAR_LOGIN_PASSWORD
  if (!base || !email || !password) {
    throw new ArimarApiError(
      'Integración AriMar no configurada (ARIMAR_API_URL, ARIMAR_LOGIN_EMAIL, ARIMAR_LOGIN_PASSWORD).',
      503,
    )
  }
  return { base, email, password }
}

async function arimarBearerToken(): Promise<{ base: string; token: string }> {
  const { base, email, password } = requireEnv()
  const loginData = (await arimarJson(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })) as { access_token?: string }

  const token = loginData?.access_token
  if (!token) {
    throw new ArimarApiError('AriMar: respuesta de login sin access_token.', 502)
  }
  return { base, token }
}

async function fetchCatalogProducts(): Promise<Record<string, unknown>[]> {
  const { base, token } = await arimarBearerToken()
  const data = await arimarJson(`${base}/catalog/products`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return Array.isArray(data) ? (data as Record<string, unknown>[]) : []
}

function mapToElaboraciones(products: Record<string, unknown>[]): ElaboracionAlergenos[] {
  return products
    .filter(esElaboracionCatalogo)
    .map((p) => ({
      id: Number(p.id),
      nombre: String(p.name || '').trim() || 'Sin nombre',
      alergenos: allergensFromProduct(p),
    }))
    .filter((e) => e.nombre && !Number.isNaN(e.id))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
}

/** Obtiene la carta de alérgenos desde Gestión (login + catálogo). */
export async function fetchCartaAlergenos(): Promise<CartaAlergenosPayload> {
  const products = await fetchCatalogProducts()
  return {
    elaboraciones: mapToElaboraciones(products),
    actualizadoEn: new Date().toISOString(),
  }
}
