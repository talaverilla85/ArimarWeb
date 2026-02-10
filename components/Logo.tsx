import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden flex items-center justify-center bg-white">
        <Image
          src="/images/logo.jpg"
          alt="Logo AriMar"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <span className="text-2xl md:text-3xl font-bold text-slate-800">AriMar</span>
    </Link>
  )
}

