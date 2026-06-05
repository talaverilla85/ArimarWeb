import Image from 'next/image'

export const SIN_GLUTEN_IMAGE = '/images/sin-gluten-ari.png'
export const SIN_GLUTEN_ALT =
  'Ari presenta el símbolo sin gluten: AriMar es un establecimiento 100 % sin gluten'

type Variant = 'hero' | 'card' | 'inline'

interface SinGlutenBlockProps {
  variant?: Variant
  className?: string
}

export default function SinGlutenBlock({ variant = 'card', className = '' }: SinGlutenBlockProps) {
  if (variant === 'hero') {
    return (
      <div
        className={`mx-auto max-w-lg rounded-2xl border border-white/30 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm ${className}`}
      >
        <div className="flex items-center gap-4">
          <Image
            src={SIN_GLUTEN_IMAGE}
            alt={SIN_GLUTEN_ALT}
            width={120}
            height={90}
            className="h-auto w-24 flex-shrink-0 object-contain md:w-28"
            priority
          />
          <div className="text-left">
            <p className="text-base font-bold text-primary-700 md:text-lg">Establecimiento 100 % sin gluten</p>
            <p className="mt-1 text-sm text-slate-600 leading-snug">
              Toda nuestra carta está elaborada sin gluten: comida para todos, también para quien necesita evitar el gluten.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col items-center gap-4 sm:flex-row sm:items-center ${className}`}>
        <Image
          src={SIN_GLUTEN_IMAGE}
          alt={SIN_GLUTEN_ALT}
          width={160}
          height={120}
          className="h-auto w-36 object-contain sm:w-40"
        />
        <div className="text-center sm:text-left">
          <p className="text-lg font-bold text-primary-800">Establecimiento 100 % sin gluten</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed max-w-md">
            Toda nuestra carta está elaborada sin gluten. El mismo logo que verás en nuestra puerta.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl border border-primary-100 bg-primary-50/50 px-6 py-6 md:px-8 ${className}`}
    >
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-8">
        <Image
          src={SIN_GLUTEN_IMAGE}
          alt={SIN_GLUTEN_ALT}
          width={200}
          height={150}
          className="h-auto w-44 object-contain md:w-48"
        />
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-primary-800 md:text-2xl tracking-tight">
            Establecimiento 100 % sin gluten
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Toda nuestra carta está elaborada sin gluten: comida casera para todos, con información clara para elegir
            con tranquilidad. En la puerta del local verás este mismo distintivo.
          </p>
        </div>
      </div>
    </div>
  )
}
