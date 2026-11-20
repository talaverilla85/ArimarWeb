import type {Metadata} from 'next'
import Link from 'next/link'
import SolicitarPata from '@/app/pata-asada-gran-canaria/SolicitarPata'

export const metadata:Metadata={
 title:'Laboratorio de reservas de pata asada · AriMar',
 robots:{index:false,follow:false,noarchive:true},
}
export const dynamic='force-dynamic'
export default function LaboratorioPataAsada(){
 return <main className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36">
  <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
   <p className="font-extrabold">LABORATORIO · NO ES UNA RESERVA REAL</p>
   <p className="mt-1">Entorno independiente para desarrollar y validar MONEI, correos y el proceso automatizado. Los datos aquí no corresponden a encargos reales.</p>
  </div>
  <SolicitarPata/>
  <p className="mt-5 text-center text-sm text-slate-600">¿Quieres realizar un encargo auténtico?
   {' '}<Link className="font-bold text-[#207F85] underline" href="https://arimarfoodlab.es/pata-asada-gran-canaria">
    Ir a la página real de AriMar</Link>.
  </p>
 </main>
}
