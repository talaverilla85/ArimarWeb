import Link from 'next/link'
import Image from 'next/image'
import SinGlutenBlock from '@/components/SinGlutenBlock'
import { siteConfig } from '@/lib/siteConfig'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-amber-50 pt-28 pb-12 md:pt-32 md:pb-20" aria-labelledby="portada-titulo">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-800 md:text-sm">
            AriMar · Playa de Arinaga · Gran Canaria
          </p>
          <h1 id="portada-titulo" className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]">
            Comida casera y freiduría <span className="text-primary-700">100 % sin gluten</span> en Arinaga.
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-slate-700 md:text-xl">
            Ropa vieja, pollo agridulce, croquetas, ensaladas, asados y mucho más.
            Elaboramos comida para llevar que apetece de verdad.
          </p>
          <p className="mb-8 text-base leading-relaxed text-slate-600">
            Una sola carta para todos. Estamos en Playa de Arinaga, pero si vienes de otro punto de Gran Canaria,
            también puedes consultar lo disponible y pedir antes de desplazarte.
          </p>
          <div className="mb-7 flex flex-wrap gap-3">
            <Link href={siteConfig.pedirPath}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-500 px-7 py-3 font-bold text-white shadow-md transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              Ver qué hay hoy y pedir <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link href="/carta"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-primary-200 bg-white px-7 py-3 font-bold text-primary-800 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              Explorar la carta
            </Link>
          </div>
          <div className="max-w-md">
            <SinGlutenBlock variant="hero" />
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-[6px] border-white bg-amber-50 shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/arimar-20261023-pollo-agridulce-hero.webp"
              alt="Pollo agridulce real de AriMar, elaborado en Playa de Arinaga"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-slate-900/90 px-5 py-4 text-white shadow-lg backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-200">De nuestra cocina</p>
              <p className="mt-1 text-lg font-bold">Pollo agridulce</p>
            </div>
          </div>
          <div className="absolute -right-2 -top-4 hidden rotate-6 rounded-2xl border border-primary-100 bg-white px-5 py-3 text-center shadow-lg sm:block">
            <p className="text-2xl font-extrabold text-primary-700">100 %</p>
            <p className="text-xs font-semibold text-slate-600">sin gluten</p>
          </div>
        </div>
      </div>
    </section>
  )
}
