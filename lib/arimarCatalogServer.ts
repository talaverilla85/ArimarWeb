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
  let res: Response
  try {
    res = await fetch(url, {
      ...options,
      signal: options.signal ?? AbortSignal.timeout(25_000),
    })
  } catch (err) {
    throw wrapUpstreamError(err, url.split('/auth')[0] || url)
  }
  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    if (text.trimStart().startsWith('<')) {
      throw new ArimarApiError(
        `Gestión devolvió HTML en lugar de JSON (${res.status}). Suele indicar URL incorrecta (falta /api-backend), nginx sin proxy o Cloudflare Access bloqueando a Vercel.`,
        res.status >= 400 ? res.status : 502,
      )
    }
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

/** Base URL de la API: añade /api-backend si apunta al frontend Next (no al puerto 8000 directo). */
export function normalizeArimarApiBase(raw: string): string {
  let base = raw.trim().replace(/\/$/, '')
  if (!base) return base
  try {
    const u = new URL(base)
    const directBackend =
      u.port === '8000' || /:8000$/.test(base) || u.hostname.startsWith('backend')
    if (!directBackend && !base.endsWith('/api-backend')) {
      base = `${base}/api-backend`
    }
  } catch {
    if (!base.endsWith('/api-backend')) base = `${base}/api-backend`
  }
  return base
}

function requireEnv() {
  const base = normalizeArimarApiBase(process.env.ARIMAR_API_URL || '')
  const email = process.env.ARIMAR_LOGIN_EMAIL?.trim()
  const password = process.env.ARIMAR_LOGIN_PASSWORD
  if (!base || !email || !password) {
    throw new ArimarApiError(
      'Integración AriMar no configurada (ARIMAR_API_URL, ARIMAR_LOGIN_EMAIL, ARIMAR_LOGIN_PASSWORD). Redespliegue en Vercel tras añadir variables.',
      503,
    )
  }
  return { base, email, password }
}

function wrapUpstreamError(err: unknown, base: string): ArimarApiError {
  if (err instanceof ArimarApiError) return err
  const msg = err instanceof Error ? err.message : String(err)
  const cause =
    err instanceof Error && err.cause instanceof Error ? err.cause.message : ''
  const combined = `${msg} ${cause}`.toLowerCase()
  if (
    combined.includes('fetch failed') ||
    combined.includes('enotfound') ||
    combined.includes('getaddrinfo') ||
    combined.includes('econnrefused') ||
    combined.includes('timed out') ||
    combined.includes('timeout')
  ) {
    return new ArimarApiError(
      `No se puede conectar con Gestión en ${base}. Compruebe que el dominio tenga DNS público, que el túnel Cloudflare esté activo y que ARIMAR_API_URL sea la URL HTTPS correcta (con /api-backend si usa el frontend).`,
      502,
    )
  }
  return new ArimarApiError(msg || 'Error al contactar con Gestión', 502)
}

async function arimarBearerToken(): Promise<{ base: string; token: string }> {
  const { base, email, password } = requireEnv()
  try {
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
  } catch (err) {
    throw wrapUpstreamError(err, base)
  }
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
  try {
    const products = await fetchCatalogProducts()
    return {
      elaboraciones: mapToElaboraciones(products),
      actualizadoEn: new Date().toISOString(),
    }
  } catch (err) {
    const base = normalizeArimarApiBase(process.env.ARIMAR_API_URL || '')
    throw wrapUpstreamError(err, base || 'Gestión')
  }
}
