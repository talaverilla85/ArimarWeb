'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PedirPage() {
  useEffect(() => {
    // Redirección automática después de 3 segundos
    const timer = setTimeout(() => {
      window.location.href = 'https://r.qamarero.com/arimar?mode=PICKUP'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-variedad-tuppers.webp"
          alt="Variedad de tuppers"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Estás a punto de pedir en nuestra tienda online
          </h1>
        </div>
        
        <a
          href="https://r.qamarero.com/arimar?mode=PICKUP"
          className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
        >
          Ir a la tienda
        </a>
        
        <p className="text-sm text-white/80 mt-6">
          Si no eres redirigido automáticamente, haz clic en el botón de arriba
        </p>
      </motion.div>
    </div>
  )
}
