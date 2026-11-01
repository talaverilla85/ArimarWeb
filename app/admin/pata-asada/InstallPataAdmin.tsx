'use client'
import {useEffect,useState} from 'react'
type InstallEvent=Event&{prompt:()=>Promise<void>,userChoice:Promise<{outcome:string}>}
export default function InstallPataAdmin(){
 const [pending,setPending]=useState<InstallEvent|null>(null)
 const [standalone,setStandalone]=useState(false)
 const [tip,setTip]=useState(false)
 useEffect(()=>{
  const mq=window.matchMedia('(display-mode: standalone)')
  const detect=()=>setStandalone(mq.matches||('standalone' in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true))
  detect();mq.addEventListener('change',detect)
  if('serviceWorker' in navigator)void navigator.serviceWorker.register('/admin/pata-asada/sw.js',{scope:'/admin/pata-asada/'}).catch(()=>{})
  const onPrompt=(event:Event)=>{event.preventDefault();setPending(event as InstallEvent)}
  const onInstalled=()=>{setStandalone(true);setPending(null)}
  window.addEventListener('beforeinstallprompt',onPrompt)
  window.addEventListener('appinstalled',onInstalled)
  return ()=>{mq.removeEventListener('change',detect);window.removeEventListener('beforeinstallprompt',onPrompt);window.removeEventListener('appinstalled',onInstalled)}
 },[])
 if(standalone)return null
 return <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <div><p className="text-sm font-bold text-teal-900">Instala el panel en tu móvil</p>
    <p className="mt-1 text-xs text-teal-950">Acceso directo a pantalla completa. La instalación no sustituye al inicio de sesión.</p></div>
   <button type="button" onClick={async()=>{
    if(!pending){setTip(s=>!s);return}
    try{await pending.prompt();await pending.userChoice;setPending(null)}catch{setTip(true)}
   }} className="rounded-lg bg-[#207F85] px-4 py-2 text-sm font-bold text-white">
    Instalar webapp
   </button>
  </div>
  {tip&&<p className="mt-3 text-sm text-teal-950">En Android con Chrome, abre el menú ⋮ y pulsa «Instalar aplicación» o «Añadir a pantalla de inicio». La función biométrica requiere configurar una passkey aparte.</p>}
 </div>
}
