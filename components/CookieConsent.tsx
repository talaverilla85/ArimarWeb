'use client'

import { useEffect, useState } from 'react'

type ConsentState = 'unknown' | 'accepted' | 'rejected'

const GA_MEASUREMENT_ID = 'G-49P4CL0T8K'

function loadGA4() {
  if (typeof window === 'undefined') return

  if ((window as any).ga4Loaded) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).gtag =
    (window as any).gtag ||
    function gtag() {
      ;(window as any).dataLayer.push(arguments)
    }

  ;(window as any).gtag('js', new Date())
  ;(window as any).gtag('config', GA_MEASUREMENT_ID)

  ;(window as any).ga4Loaded = true
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('unknown')

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem('cookie_consent')
      if (stored === 'accepted') {
        setConsent('accepted')
        loadGA4()
      } else if (stored === 'rejected') {
        setConsent('rejected')
      }
    } catch {
      // ignorar errores de acceso a storage
    }
  }, [])

  const handleAccept = () => {
    setConsent('accepted')
    try {
      window.localStorage.setItem('cookie_consent', 'accepted')
    } catch {
      // ignorar
    }
    loadGA4()
  }

  const handleReject = () => {
    setConsent('rejected')
    try {
      window.localStorage.setItem('cookie_consent', 'rejected')
    } catch {
      // ignorar
    }
  }

  if (consent !== 'unknown') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="max-w-4xl mx-auto rounded-2xl bg-white/95 border border-slate-200 shadow-lg backdrop-blur-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="text-sm text-slate-700">
          <p className="font-medium text-slate-900 mb-1">Usamos cookies para mejorar la experiencia.</p>
          <p>
            AriMar utiliza cookies de analítica (Google Analytics 4) para entender cómo se usa la web. Puedes
            aceptarlas o rechazarlas. Siempre podrás cambiar de opinión desde la política de cookies.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 justify-end sm:flex-col">
          <button
            type="button"
            onClick={handleReject}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-3 py-2 rounded-lg bg-primary-500 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

