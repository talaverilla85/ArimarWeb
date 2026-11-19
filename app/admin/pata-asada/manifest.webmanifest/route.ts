import {NextResponse} from 'next/server'
export const dynamic='force-static'
export function GET(){
 return NextResponse.json({
  id:'/admin/pata-asada/',
  name:'AriMar · Gestión de pata asada',
  short_name:'Ari Pata',
  description:'Calendario y encargos internos de pata asada AriMar.',
  start_url:'/admin/pata-asada/',
  scope:'/admin/pata-asada/',
  display:'standalone',
  orientation:'any',
  background_color:'#f8fafc',
  theme_color:'#207F85',
  lang:'es',
  icons:[
   {src:'/admin/pata-asada/icon?size=192',sizes:'192x192',type:'image/png',purpose:'any'},
   {src:'/admin/pata-asada/icon?size=512',sizes:'512x512',type:'image/png',purpose:'any maskable'},
  ],
 },{headers:{'Content-Type':'application/manifest+json','Cache-Control':'public, max-age=300'}})
}
