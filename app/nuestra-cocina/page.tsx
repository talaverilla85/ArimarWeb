'use client'

import type { Metadata } from 'next'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function NuestraCocinaPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Imagen cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] rounded-lg overflow-hidden mb-16 bg-slate-100"
        >
          <Image
            src="/images/cocina-emplatado.webp"
            alt="Cocina y emplatado"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Sección "Producción real" */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Producción real
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Cocina central.</strong> Un solo espacio donde se cocina todo, con control total sobre procesos y calidad.
                </p>
                <p>
                  <strong className="text-slate-800">Lotes.</strong> Producción organizada que permite optimizar ingredientes, tiempo y energía.
                </p>
                <p>
                  <strong className="text-slate-800">Control.</strong> Cada lote se registra, se etiqueta y se gestiona. Sabemos qué hay, cuándo se hizo y cuándo caduca.
                </p>
                <p>
                  <strong className="text-slate-800">Seguridad alimentaria.</strong> Protocolos que garantizan que cada plato sea seguro para consumir.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100"
            >
              <Image
                src="/images/cocina-servicio.webp"
                alt="Cocina en servicio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
