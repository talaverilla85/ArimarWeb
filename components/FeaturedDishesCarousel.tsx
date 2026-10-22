'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { featuredDishes } from '@/lib/featuredDishes'

const dishes = featuredDishes.filter((dish) => dish.id !== 'pollo-agridulce')

export default function FeaturedDishesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function move(direction: -1 | 1) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.85, 420), behavior: 'smooth' })
  }

  return (
    <section id="platos-destacados" className="bg-white py-16 md:py-24 scroll-mt-24" aria-labelledby="platos-destacados-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">De nuestro obrador a tu mesa</p>
            <h2 id="platos-destacados-heading" className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Platos nuestros. Fotos reales.
            </h2>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              En AriMar hay comida casera, freiduría, ensaladas y asados. Esta es una muestra de lo que elaboramos:
              la disponibilidad cambia según el día.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Ver platos anteriores" aria-controls="platos-destacados-galeria"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Ver más platos" aria-controls="platos-destacados-galeria"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-primary-500 text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div id="platos-destacados-galeria" ref={scrollRef} tabIndex={0}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:gap-6"
          aria-label="Galería desplazable de platos de AriMar">
          {dishes.map((dish) => (
            <article key={dish.id} className="group w-[79vw] max-w-[360px] flex-none snap-start overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-sm transition-shadow hover:shadow-lg sm:w-[340px]">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image src={dish.image} alt={dish.alt} fill sizes="(max-width: 640px) 80vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-700">{dish.category}</p>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{dish.name}</h3>
                <p className="min-h-12 text-sm leading-relaxed text-slate-600">{dish.description}</p>
                <Link href={dish.href} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary-700 underline-offset-4 hover:underline">
                  {dish.id === 'pata-asada' ? 'Ver encargos' : 'Ver carta'} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">Desliza para explorar. Consulta los platos disponibles antes de desplazarte.</p>
          <Link href="/carta" className="inline-flex rounded-xl border border-primary-200 px-6 py-3 font-semibold text-primary-700 hover:bg-primary-50">
            Descubrir la carta completa <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
