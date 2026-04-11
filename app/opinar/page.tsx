import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Opinar | AriMar FoodLab',
  description: 'Redirección a las reseñas de AriMar FoodLab en Google.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: '/opinar',
  },
}

export default function OpinarPage() {
  redirect(siteConfig.googleReviewUrl)
}
