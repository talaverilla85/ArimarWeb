import { redirect } from 'next/navigation'

const CARTA_ONLINE_URL = 'https://r.qamarero.com/arimar?mode=PICKUP'

export default function HoyPage() {
  redirect(CARTA_ONLINE_URL)
}
