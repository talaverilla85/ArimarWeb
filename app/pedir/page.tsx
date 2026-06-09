import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'

/** /pedir → misma experiencia que /hoy (tienda online Qamarero). */
export default function PedirPage() {
  redirect(siteConfig.pedirPath)
}
