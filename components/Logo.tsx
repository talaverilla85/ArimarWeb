import Link from 'next/link'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg md:text-xl">A</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-slate-800">AriMar</span>
    </Link>
  )
}

