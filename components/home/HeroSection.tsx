import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-variedad-tuppers.webp"
          alt="Variedad de tuppers con comida"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-10" />
      </div>
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          AriMar – Comida casera para llevar en Playa de Arinaga
        </h1>
        <p className="text-sm md:text-base text-white/80 mb-4 tracking-wide uppercase">
          Playa de Arinaga · Comida para llevar
        </p>
        <p className="text-lg md:text-xl text-white/85 mb-6 max-w-2xl mx-auto leading-relaxed">
          Platos de diario para disfrutar en casa, en la oficina o en la playa.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-10">
          {['Cocina diaria', 'Producción por lotes', 'Menos desperdicio'].map((item) => (
            <div
              key={item}
              className="px-4 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 text-sm md:text-base backdrop-blur-sm shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <Link
          href="/proximamente"
          className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
        >
          Pedir ahora
        </Link>
      </div>
    </section>
  )
}
