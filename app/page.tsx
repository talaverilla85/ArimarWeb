import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GoogleReviewsSection from '@/components/GoogleReviewsSection'
import LeaveReviewCta from '@/components/LeaveReviewCta'
import SocialLinks from '@/components/SocialLinks'
import HeroSection from '@/components/home/HeroSection'
import FeaturedDishesCarousel from '@/components/FeaturedDishesCarousel'
import SinGlutenBlock from '@/components/SinGlutenBlock'
import { faqCanonicalPath, homeFaqTeasers } from '@/lib/faqContent'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDishesCarousel />

      <section className="bg-slate-50 py-16 md:py-24" aria-labelledby="comida-dia-a-dia-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white bg-white shadow-lg">
            <Image src="/images/arimar-20261023-vitrina-arimar.webp"
              alt="Vitrina de AriMar con platos preparados en envases etiquetados para llevar"
              fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Comida para llevar en Gran Canaria</p>
            <h2 id="comida-dia-a-dia-heading" className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Elige lo que te apetece. Nosotros nos encargamos de cocinar.
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              AriMar es una casa de comidas y freiduría en Playa de Arinaga. Preparamos platos para quienes
              quieren comer bien sin tener que cocinar cada día: ropa vieja, guisos, arroces, tortillas, ensaladas,
              pollo asado y croquetas, entre otras elaboraciones.
            </p>
            <p className="mb-7 leading-relaxed text-slate-600">
              Hay platos habituales y otros que rotan con la producción. Puedes acercarte a ver la vitrina
              o consultar la disponibilidad y hacer tu pedido antes de venir.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/carta" className="inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600">
                Conocer nuestra carta <span className="ml-2" aria-hidden="true">→</span>
              </Link>
              <Link href="/contacto" className="inline-flex items-center rounded-xl border border-primary-200 bg-white px-6 py-3 font-semibold text-primary-800 hover:bg-primary-50">
                Ver dónde estamos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" aria-labelledby="sin-gluten-home-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Una carta, para todos</p>
            <h2 id="sin-gluten-home-heading" className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              El sabor va primero. El gluten, fuera.
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-slate-700">
              En AriMar no existe una carta aparte. Toda nuestra propuesta se elabora en una cocina 100 % sin gluten,
              tanto si vienes porque eres celíaco como si simplemente quieres disfrutar de comida casera.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              La misma vitrina para familias, vecinos y visitantes de toda Gran Canaria. Si necesitas consultar
              los ingredientes o algún otro alérgeno, pregunta a nuestro equipo antes de hacer el pedido.
            </p>
            <Link href="/sin-gluten-gran-canaria" className="inline-flex font-semibold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-800">
              Descubre nuestro concepto 100 % sin gluten <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="rounded-[2rem] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-6 py-9 shadow-sm md:px-10">
            <SinGlutenBlock variant="inline" />
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-primary-100 pt-7">
              <div>
                <p className="text-base font-bold text-slate-900">Cocina propia</p>
                <p className="mt-1 text-sm text-slate-600">Platos preparados en nuestro obrador.</p>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">Recogida fácil</p>
                <p className="mt-1 text-sm text-slate-600">Consulta y encarga antes de desplazarte.</p>
              </div>
            </div>
            <Link href="/nuestra-cocina" className="mt-7 inline-flex font-semibold text-primary-700 hover:underline">
              Así trabajamos en AriMar <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white md:py-20" aria-labelledby="asados-home-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-slate-800">
            <Image src="/images/arimar-20261023-pata-horno.webp"
              alt="Pata asada canaria de AriMar dentro del horno durante su preparacion"
              fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-200">Para compartir</p>
            <h2 id="asados-home-heading" className="mb-5 text-3xl font-bold tracking-tight md:text-4xl">
              ¿Una reunión, un cumpleaños o simplemente ganas de algo especial?
            </h2>
            <p className="mb-7 text-lg leading-relaxed text-white/80">
              También preparamos asados y encargos. Nuestra pata asada canaria se puede solicitar
              por adelantado y recoger en Playa de Arinaga.
            </p>
            <Link href="/pata-asada-gran-canaria" className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">
              Conocer la pata asada por encargo <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" aria-labelledby="pedidos-home-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Así de sencillo</p>
            <h2 id="pedidos-home-heading" className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">Del antojo a tu mesa.</h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            <li className="border-t-4 border-primary-500 pt-5">
              <p className="mb-2 text-sm font-bold text-primary-700">01 · Descubre</p>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Mira la carta</h3>
              <p className="leading-relaxed text-slate-600">Conoce lo que elaboramos: guisos, ensaladas, frituras, asados y platos preparados.</p>
            </li>
            <li className="border-t-4 border-primary-500 pt-5">
              <p className="mb-2 text-sm font-bold text-primary-700">02 · Elige</p>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Consulta la vitrina del día</h3>
              <p className="leading-relaxed text-slate-600">Revisa la disponibilidad y haz tu pedido online si quieres dejarlo preparado.</p>
            </li>
            <li className="border-t-4 border-primary-500 pt-5">
              <p className="mb-2 text-sm font-bold text-primary-700">03 · Recoge</p>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Ven a Playa de Arinaga</h3>
              <p className="leading-relaxed text-slate-600">Estamos en Avenida Polizón 67. También puedes venir y elegir directamente en el local.</p>
            </li>
          </ol>
          <p className="mt-10">
            <Link href="/hoy" className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white shadow-sm hover:bg-primary-600">
              Consultar disponibilidad y pedir
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20" aria-labelledby="faq-home-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Preguntas habituales</p>
          <h2 id="faq-home-heading" className="mb-5 text-3xl font-bold text-slate-900 md:text-4xl">Antes de venir</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {homeFaqTeasers.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.question}</h3>
                <p className="leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <Link href={faqCanonicalPath} className="mt-7 inline-flex font-semibold text-primary-700 underline-offset-4 hover:underline">
            Ver todas las preguntas frecuentes <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 md:py-16" aria-label="Deja tu opinión">
        <div className="mx-auto max-w-4xl"><LeaveReviewCta /></div>
      </section>

      <section className="bg-primary-50 px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Tu disfruta, nosotros cocinamos.</h2>
          <p className="mx-auto mb-7 max-w-2xl text-lg text-slate-600">
            Conoce la cocina de AriMar en Playa de Arinaga y elige cómo prefieres llevarte la comida.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/hoy" className="inline-flex rounded-xl bg-primary-500 px-7 py-3 font-bold text-white hover:bg-primary-600">Pedir online</Link>
            <Link href="/contacto" className="inline-flex rounded-xl border border-primary-200 bg-white px-7 py-3 font-semibold text-primary-700 hover:bg-primary-100">Cómo llegar</Link>
            <Link href="/valores" className="inline-flex rounded-xl border border-primary-200 bg-white px-7 py-3 font-semibold text-primary-700 hover:bg-primary-100">Nuestros valores</Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6" aria-labelledby="redes-sociales-heading">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="redes-sociales-heading" className="mb-3 text-2xl font-bold text-slate-900">La cocina también se ve por dentro</h2>
          <p className="mb-5 text-slate-600">Novedades, vitrina del día y mucho más en nuestras redes sociales.</p>
          <SocialLinks className="items-center" listClassName="text-base" />
        </div>
      </section>

      <GoogleReviewsSection />
    </>
  )
}
