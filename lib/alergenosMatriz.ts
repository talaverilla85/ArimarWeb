/** Utilidades matriz elaboración × alérgenos (cliente y servidor). */

export type ElaboracionAlergenos = {
  id: number
  nombre: string
  alergenos: string[]
}

export type CartaAlergenosPayload = {
  elaboraciones: ElaboracionAlergenos[]
  actualizadoEn: string
}

export function normalizeAllergenList(raw: unknown): string[] {
  if (raw == null) return []
  if (Array.isArray(raw)) {
    return raw.map((a) => String(a || '').trim()).filter(Boolean)
  }
  if (typeof raw === 'string') {
    return raw
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (typeof raw === 'object') {
    const vals = Object.values(raw as Record<string, unknown>)
    const out: string[] = []
    for (const v of vals) {
      if (typeof v === 'string' && v.trim()) out.push(v.trim())
      else if (Array.isArray(v)) {
        for (const x of v) {
          const t = String(x || '').trim()
          if (t) out.push(t)
        }
      }
    }
    return out
  }
  return []
}

export function allergensFromProduct(p: Record<string, unknown>): string[] {
  const v = p.allergens ?? p.alergenos
  return normalizeAllergenList(v)
}

export function esElaboracionCatalogo(p: Record<string, unknown>): boolean {
  const t = String(p.escandallo_type || 'elaboracion')
    .trim()
    .toLowerCase()
  return t !== 'preelaboracion'
}

export function columnasAlergenos(elaboraciones: ElaboracionAlergenos[]): string[] {
  const seen = new Map<string, string>()
  for (const e of elaboraciones) {
    for (const a of e.alergenos || []) {
      const t = String(a || '').trim()
      if (!t) continue
      const k = t.toLowerCase()
      if (!seen.has(k)) seen.set(k, t)
    }
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
}

export function tieneAlergeno(fila: ElaboracionAlergenos, col: string): boolean {
  const ck = col.trim().toLowerCase()
  return (fila.alergenos || []).some((a) => String(a || '').trim().toLowerCase() === ck)
}

/** Elaboraciones que no declaran ninguno de los alérgenos indicados (filtro «Sin …» acumulativo). */
export function filtrarSinAlergenos(
  elaboraciones: ElaboracionAlergenos[],
  excluir: string | string[] | null | undefined,
): ElaboracionAlergenos[] {
  const keys = (Array.isArray(excluir) ? excluir : excluir ? [excluir] : [])
    .map((k) => k.trim())
    .filter(Boolean)
  if (keys.length === 0) return elaboraciones
  return elaboraciones.filter((row) => !keys.some((key) => tieneAlergeno(row, key)))
}

/** @deprecated Usar filtrarSinAlergenos */
export function filtrarSinAlergeno(
  elaboraciones: ElaboracionAlergenos[],
  excluir: string | null | undefined,
): ElaboracionAlergenos[] {
  return filtrarSinAlergenos(elaboraciones, excluir)
}

/** Texto legible: «Apio», «Apio ni Lactosa», «Apio, Lactosa ni Soja». */
export function textoAlergenosExcluidos(nombres: string[]): string {
  if (nombres.length === 0) return ''
  if (nombres.length === 1) return nombres[0]
  if (nombres.length === 2) return `${nombres[0]} ni ${nombres[1]}`
  return `${nombres.slice(0, -1).join(', ')} ni ${nombres[nombres.length - 1]}`
}

export function elaboracionesOrdenadas(elaboraciones: ElaboracionAlergenos[]): ElaboracionAlergenos[] {
  return [...elaboraciones].sort((a, b) =>
    String(a?.nombre || '').localeCompare(String(b?.nombre || ''), 'es', { sensitivity: 'base' }),
  )
}

export function fmtActualizado(iso: string | null | undefined): string | null {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Atlantic/Canary',
    })
  } catch {
    return String(iso)
  }
}
