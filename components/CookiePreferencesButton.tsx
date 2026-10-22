'use client'

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('arimar:open-cookie-settings'))}
      className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      Cambiar preferencias de cookies
    </button>
  )
}
