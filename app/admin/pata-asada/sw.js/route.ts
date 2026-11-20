export const dynamic='force-static'
export function GET(){
 const script=[
 "self.addEventListener('install',event=>{self.skipWaiting()});",
 "self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});",
 // No offline cache or personal data caching
 "self.addEventListener('fetch',event=>{if(event.request.method==='GET'){event.respondWith(fetch(event.request))}});",
 ].join('\n')
 return new Response(script,{headers:{
  'Content-Type':'text/javascript; charset=utf-8',
  'Cache-Control':'no-store, max-age=0',
  'Service-Worker-Allowed':'/admin/pata-asada/',
 }})
}
