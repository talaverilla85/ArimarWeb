import type {Metadata} from 'next'
import PanelPataAsada from './PanelPataAsada'
import InstallPataAdmin from './InstallPataAdmin'
export const metadata:Metadata={title:'Control de pata asada | AriMar',robots:{index:false,follow:false},manifest:'/admin/pata-asada/manifest.webmanifest',appleWebApp:{capable:true,title:'Ari Pata',statusBarStyle:'default'}}
export default function Page(){return <><div className="mx-auto max-w-6xl px-5 pt-24"><InstallPataAdmin/></div><PanelPataAsada/></>}
