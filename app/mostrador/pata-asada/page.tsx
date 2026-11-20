import type {Metadata} from 'next'
import PanelMostradorPata from './PanelMostradorPata'
export const metadata:Metadata={
 title:'Mostrador · Reservas pata asada | AriMar',
 robots:{index:false,follow:false,noarchive:true}
}
export const dynamic='force-dynamic'
export default function MostradorPataPage(){return <PanelMostradorPata/>}
