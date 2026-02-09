'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/carta"
              className={`text-sm font-medium transition-colors ${
                pathname === '/carta'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Carta
            </Link>
            <Link
              href="/nuestra-cocina"
              className={`text-sm font-medium transition-colors ${
                pathname === '/nuestra-cocina'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Nuestra Cocina
            </Link>
            <Link
              href="/valores"
              className={`text-sm font-medium transition-colors ${
                pathname === '/valores'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Valores
            </Link>
            <Link
              href="/contacto"
              className={`text-sm font-medium transition-colors ${
                pathname === '/contacto'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/proximamente"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
            >
              Pedir
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/carta"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === '/carta'
                    ? 'text-slate-800'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Carta
              </Link>
              <Link
                href="/nuestra-cocina"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === '/nuestra-cocina'
                    ? 'text-slate-800'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Nuestra Cocina
              </Link>
              <Link
                href="/valores"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === '/valores'
                    ? 'text-slate-800'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Valores
              </Link>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === '/contacto'
                    ? 'text-slate-800'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

