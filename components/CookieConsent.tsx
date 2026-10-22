'use client'

import { useEffect, useState } from 'react'

type ConsentState = 'unknown' | 'accepted' | 'rejected'

const GA_MEASUREMENT_ID = 'G-49P4CL0T8K'

function installConversionTracking() {
  if (typeof window === 'undefined') return
  if ((window as any).arimarTrackingInstalled) return

  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    const anchor = target?.closest('a') as HTMLAnchorElement | null
    if (!anchor) return

    const href = anchor.getAttribute('href') || ''
    const absoluteHref = anchor.href || href
    let eventName: string | null = null

    if (href.startsWith('tel:')) {
      eventName = 'click_llamar'
    } else if (absoluteHref.includes('wa.me/')) {
      eventName = 'click_whatsapp'
    } else if (
      absoluteHref.includes('google.com/maps') ||
      absoluteHref.includes('maps.google.com') ||
      absoluteHref.includes('goo.gl/maps')
    ) {
      eventName = 'click_maps'
    } else if (
      href === '/hoy' ||
      href === '/pedir' ||
      absoluteHref.includes('r.qamarero.com/arimar')
    ) {
      eventName = 'click_pedir'
    } else if (
      href === '/opinar' ||
      absoluteHref.includes('g.page/r/') ||
      absoluteHref.includes('search.google.com/local/writereview')
    ) {
      eventName = 'click_resena'
    }

    if (!eventName || typeof (window as any).gtag !== 'function') return

    ;(window as any).gtag('event', eventName, {
      link_url: absoluteHref,
      link_text: anchor.textContent?.trim().slice(0, 120) || undefined,
      page_location: window.location.href,
      transport_type: 'beacon',
    })
  }

  document.addEventListener('click', handler, true)
  ;(window as any).arimarTrackingInstalled = true
}

function loadGA4() {
  if (typeof window === 'undefined') return

  if (!(window as any).ga4Loaded) {
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

  installConversionTracking()
}

const CONSENT_KEY = 'cookie_consent'
const CONSENT_DATE_KEY = 'cookie_consent_date'
const CONSENT_VALIDITY_MS = 730 * 24 * 60 * 60 * 1000

/** Borra cookies propias de análisis de este dominio cuando se retira el consentimiento. */
function clearAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(';')
    .map((part) => part.split('=')[0]?.trim())
    .filter((name): name is string => !!name && (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')))

  const domains = ['', '; domain=' + window.location.hostname, '; domain=.arimarfoodlab.es']
  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domain
    }
  }
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('unknown')
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY)
      const date = Number(window.localStorage.getItem(CONSENT_DATE_KEY))
      const valid = date > 0 && Date.now() >= date && Date.now() - date < CONSENT_VALIDITY_MS

      if (valid && stored === 'accepted') {
        setConsent('accepted')
        loadGA4()
      } else if (valid && stored === 'rejected') {
        setConsent('rejected')
      }
    } catch {
      // Si localStorage no está disponible, mostramos el aviso de nuevo.
    }

    const openSettings = () => setSettingsOpen(true)
    window.addEventListener('arimar:open-cookie-settings', openSettings)
    return () => window.removeEventListener('arimar:open-cookie-settings', openSettings)
  }, [])

  function saveChoice(value: 'accepted' | 'rejected') {
    try {
      window.localStorage.setItem(CONSENT_KEY, value)
      window.localStorage.setItem(CONSENT_DATE_KEY, String(Date.now()))
    } catch {
      // El navegador puede bloquear el almacenamiento local.
    }
    setConsent(value)
    setSettingsOpen(false)
  }

  function handleAccept() {
    saveChoice('accepted')
    loadGA4()
  }

  function handleReject() {
    const analyticsWasActive = !!(window as any).ga4Loaded
    saveChoice('rejected')
    clearAnalyticsCookies()
    // Si GA4 ya estaba cargado, la recarga detiene sus scripts y eventos.
    if (analyticsWasActive) window.location.reload()
  }

  if (consent !== 'unknown' && !settingsOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4" role="region" aria-label="Preferencias de cookies">
      <div className="max-w-4xl mx-auto rounded-2xl bg-white/95 border border-slate-200 shadow-lg backdrop-blur-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="text-sm text-slate-700">
          <p className="font-medium text-slate-900 mb-1">¿Nos permites medir el uso de la web?</p>
          <p>
            Usamos Google Analytics 4 para conocer las visitas y mejorar AriMar. Solo se activa si aceptas.
            Puedes rechazarlo sin afectar a tus pedidos y cambiar de opinión cuando quieras.
            {' '}<a href="/legal/cookies" className="font-semibold text-primary-700 underline underline-offset-2">Política de cookies</a>.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 justify-end sm:flex-col">
          <button type="button" onClick={handleReject}
            className="min-w-28 px-4 py-2 rounded-lg border-2 border-primary-500 text-sm font-semibold text-primary-800 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
            Rechazar
          </button>
          <button type="button" onClick={handleAccept}
            className="min-w-28 px-4 py-2 rounded-lg border-2 border-primary-500 bg-primary-500 text-sm font-semibold text-white hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
