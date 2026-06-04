'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  columnasAlergenos,
  elaboracionesOrdenadas,
  filtrarSinAlergenos,
  fmtActualizado,
  textoAlergenosExcluidos,
  tieneAlergeno,
  type CartaAlergenosPayload,
} from '@/lib/alergenosMatriz'
import SinGlutenBlock from '@/components/SinGlutenBlock'

export default function AlergenosClient() {
  const [data, setData] = useState<CartaAlergenosPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sinAlergenos, setSinAlergenos] = useState<string[]>([])

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
  const filasVisibles = useMemo(
    () => filtrarSinAlergenos(filas, sinAlergenos),
    [filas, sinAlergenos],
  )
  const actualizadoStr = fmtActualizado(data?.actualizadoEn)
  const filtroActivo = sinAlergenos.length > 0
  const textoExcluidos = textoAlergenosExcluidos(sinAlergenos)

  const toggleSinAlergeno = (nombre: string) => {
    setSinAlergenos((prev) =>
      prev.includes(nombre) ? prev.filter((a) => a !== nombre) : [...prev, nombre],
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-3 tracking-tight">
            Alérgenos y carta 100 % sin gluten
          </h1>
          <div className="h-1 w-16 bg-primary-500 mx-auto rounded-full mb-4" aria-hidden />
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            AriMar es un establecimiento 100 % sin gluten. Toda nuestra carta está elaborada sin ingredientes
            con gluten. Además, informamos del resto de alérgenos presentes en cada elaboración para que el
            cliente pueda decidir con claridad y consultar cualquier duda con nuestro equipo.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <SinGlutenBlock variant="inline" />
          </div>
          {actualizadoStr && !loading && !error && (
            <p className="text-sm text-slate-500 mt-3">Actualizado el {actualizadoStr} (hora Canarias)</p>
          )}
        </header>

        <section
          className="mb-10 rounded-2xl border border-primary-100 bg-primary-50/50 px-5 py-6 md:px-8 text-center"
          aria-labelledby="informacion-clara-heading"
        >
          <h2 id="informacion-clara-heading" className="text-xl md:text-2xl font-bold text-slate-800 mb-3 tracking-tight">
            Información clara para comer con tranquilidad
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Sabemos que para una persona celíaca no basta con que un plato no lleve gluten en la receta.
            Por eso AriMar se plantea desde su origen como un establecimiento 100 % sin gluten, con una
            carta clara, etiquetado de elaboraciones e información visible sobre alérgenos.
          </p>
        </section>

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
          <div className="bg-white rounded-2xl border border-primary-200 shadow-md overflow-hidden ring-1 ring-primary-100">
            <div className="px-4 sm:px-5 py-4 border-b border-primary-100 bg-primary-50/40">
              <p className="text-sm font-semibold text-primary-800 mb-2">
                Buscar elaboraciones sin alérgeno
              </p>
              <div className="flex flex-wrap gap-2 -mx-1 px-1 pb-1 max-h-[9rem] overflow-y-auto sm:max-h-none">
                {cols.map((c) => {
                  const activo = sinAlergenos.includes(c)
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleSinAlergeno(c)}
                      aria-pressed={activo}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                        activo
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-100'
                      }`}
                    >
                      Sin {c}
                    </button>
                  )
                })}
                {filtroActivo && (
                  <button
                    type="button"
                    onClick={() => setSinAlergenos([])}
                    className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-300 bg-white hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Ver todo
                  </button>
                )}
              </div>
              {filtroActivo ? (
                <p className="mt-3 text-sm text-primary-800">
                  <span className="font-semibold">{filasVisibles.length}</span>
                  {filasVisibles.length === 1 ? ' elaboración' : ' elaboraciones'} sin{' '}
                  <span className="font-semibold">{textoExcluidos}</span>
                  {filas.length !== filasVisibles.length && (
                    <span className="text-slate-600">
                      {' '}
                      (de {filas.length} en total; van desapareciendo al añadir filtros)
                    </span>
                  )}
                  {filasVisibles.length === 0 && (
                    <span className="text-slate-600"> — quite algún filtro o consulte en el local.</span>
                  )}
                </p>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  Pulse uno o varios alérgenos: cada «Sin …» activo reduce la lista (sin Apio, sin Lactosa,
                  etc. a la vez).
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Filtro orientativo según la declaración en receta. No sustituye consultar con el local si
                tiene alergia grave o intolerancia.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-primary-600 text-white border-b border-primary-700">
                    <th
                      scope="col"
                      className="sticky left-0 z-20 bg-primary-600 text-left font-semibold text-white px-3 py-3.5 min-w-[180px] sm:min-w-[220px] shadow-[2px_0_6px_rgba(0,0,0,0.12)]"
                    >
                      Elaboración
                    </th>
                    {cols.map((c) => (
                      <th
                        key={c}
                        scope="col"
                        title={c}
                        className="px-2 py-3.5 text-center font-semibold text-white text-xs sm:text-sm max-w-[88px] whitespace-normal leading-tight align-bottom bg-primary-600"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filasVisibles.length === 0 && filtroActivo ? (
                    <tr>
                      <td
                        colSpan={cols.length + 1}
                        className="px-4 py-10 text-center text-slate-500 text-sm"
                      >
                        Ninguna elaboración coincide con sin {textoExcluidos}. Pruebe «Ver todo» o quite algún
                        filtro.
                      </td>
                    </tr>
                  ) : null}
                  {filasVisibles.map((row, idx) => {
                    const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-primary-50'
                    return (
                    <tr
                      key={row.id}
                      className={`${rowBg} transition-colors hover:bg-primary-100/50 border-b border-primary-100/60 last:border-b-0`}
                    >
                      <td
                        className={`sticky left-0 z-10 px-3 py-2.5 font-medium text-slate-800 shadow-[2px_0_4px_rgba(0,0,0,0.06)] ${rowBg}`}
                      >
                        {row.nombre}
                      </td>
                      {cols.map((c) => (
                        <td key={c} className="px-2 py-2.5 text-center align-middle">
                          {tieneAlergeno(row, c) ? (
                            <span
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-base leading-none"
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
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-600 px-4 py-3 border-t border-primary-100 bg-primary-50/50">
              ✓ = el plato declara ese alérgeno según la información de elaboración. Consulte con el
              personal si tiene alergias graves.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}