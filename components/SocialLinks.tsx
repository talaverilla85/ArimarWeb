import { siteConfig } from '@/lib/siteConfig'

const linkClassName =
  'text-primary-600 underline underline-offset-2 hover:decoration-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded'

type SocialLinksProps = {
  className?: string
  listClassName?: string
}

export default function SocialLinks({ className = '', listClassName = '' }: SocialLinksProps) {
  return (
    <ul className={`flex flex-col gap-2 list-none pl-0 ${listClassName} ${className}`}>
      <li>
        <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Instagram de AriMar FoodLab
        </a>
      </li>
      <li>
        <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          Facebook de AriMar FoodLab
        </a>
      </li>
    </ul>
  )
}
