'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  columnasAlergenos,
  elaboracionesOrdenadas,
  fmtActualizado,
  tieneAlergeno,
  type CartaAlergenosPayload,
} from '@/lib/alergenosMatriz'

export default function AlergenosClient() {
  const [data, setData] = useState<CartaAlergenosPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/carta-alergenos', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error || `Error ${res.status}`)
      }
      setData(json as CartaAlergenosPayload)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo cargar la carta de alérgenos.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filas = useMemo(
    () => elaboracionesOrdenadas(data?.elaboraciones ?? []),
    [data?.elaboraciones],
  )
  const cols = useMemo(() => columnasAlergenos(filas), [filas])
  const actualizadoStr = fmtActualizado(data?.actualizadoEn)

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight">
            Carta de alérgenos
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Información de alérgenos declarados en nuestras elaboraciones. Los datos se actualizan desde
            nuestra cocina cuando cambia una receta.
          </p>
          {actualizadoStr && !loading && !error && (
            <p className="text-sm text-slate-500 mt-3">Actualizado el {actualizadoStr} (hora Canarias)</p>
          )}
        </header>

        {loading && (
          <p className="text-center text-slate-500 py-12" role="status">
            Cargando carta de alérgenos…
          </p>
        )}

        {error && !loading && (
          <div
            className="max-w-xl mx-auto rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm text-center"
            role="alert"
          >
            {error}
            <button
              type="button"
              onClick={() => void load()}
              className="mt-3 block w-full text-primary-600 font-semibold underline underline-offset-2"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && filas.length === 0 && (
          <p className="text-center text-slate-500 py-12">No hay elaboraciones publicadas en este momento.</p>
        )}

        {!loading && !error && filas.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th
                      scope="col"
                      className="sticky left-0 z-20 bg-slate-100 text-left font-semibold text-slate-800 px-3 py-3 min-w-[180px] sm:min-w-[220px] shadow-[2px_0_4px_rgba(0,0,0,0.06)]"
                    >
                      Elaboración
                    </th>
                    {cols.map((c) => (
                      <th
                        key={c}
                        scope="col"
                        title={c}
                        className="px-2 py-3 text-center font-semibold text-slate-700 text-xs sm:text-sm max-w-[88px] whitespace-normal leading-tight align-bottom"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filas.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}
                    >
                      <td
                        className={`sticky left-0 z-10 px-3 py-2.5 font-medium text-slate-800 shadow-[2px_0_4px_rgba(0,0,0,0.04)] ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }`}
                      >
                        {row.nombre}
                      </td>
                      {cols.map((c) => (
                        <td key={c} className="px-2 py-2.5 text-center align-middle">
                          {tieneAlergeno(row, c) ? (
                            <span
                              className="inline-flex items-center justify-center text-primary-600 font-bold text-lg leading-none"
                              title={`${row.nombre}: ${c}`}
                              aria-label={`${row.nombre} contiene ${c}`}
                            >
                              ✓
                            </span>
                          ) : (
                            <span className="text-slate-300" aria-hidden>
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 px-4 py-3 border-t border-slate-100">
              ✓ = el plato declara ese alérgeno según la información de elaboración. Consulte con el
              personal si tiene alergias graves.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}