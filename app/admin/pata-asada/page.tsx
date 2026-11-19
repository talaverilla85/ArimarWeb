import type {Metadata} from 'next'
import PanelPataAsada from './PanelPataAsada'
export const metadata:Metadata={title:'Control de pata asada | AriMar',robots:{index:false,follow:false},manifest:'/admin/pata-asada/manifest.webmanifest',appleWebApp:{capable:true,title:'Ari Pata',statusBarStyle:'default'}}
export default function Page(){return <PanelPataAsada/>}
