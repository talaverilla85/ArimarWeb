import type {Metadata} from 'next'
import Link from 'next/link'
export const metadata:Metadata={
 title:'Estado de pago de pata asada | AriMar',robots:{index:false,follow:false}
}
export default function PataResultado(){
 return <main className="mx-auto max-w-xl px-6 pb-28 pt-40 text-slate-800">
  <div className="rounded-3xl border bg-white p-8 shadow-sm">
   <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">AriMar · Pata asada</p>
   <h1 className="mt-3 text-3xl font-black">Estamos verificando tu pago</h1>
   <p className="mt-5 text-base leading-relaxed text-slate-600">
    La vuelta desde la pasarela no significa que tu reserva esté confirmada.
    Cuando recibamos la confirmación segura del pago, te enviaremos el número de reserva
    y los detalles de recogida por correo electrónico.
   </p>
   <p className="mt-4 text-sm text-slate-600">Si cancelaste el pago o hubo un error, no se confirmará el encargo.</p>
   <Link className="mt-7 inline-flex rounded-xl bg-[#207F85] px-5 py-3 font-bold text-white"
    href="/pata-asada-gran-canaria">Volver a pata asada</Link>
  </div>
 </main>
}
