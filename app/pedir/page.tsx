import dynamic from 'next/dynamic'

const PedirClient = dynamic(() => import('./PedirClient'), { ssr: true })

export default function PedirPage() {
  return <PedirClient />
}
