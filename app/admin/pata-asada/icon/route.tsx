import {ImageResponse} from 'next/og'
export const dynamic='force-dynamic'
export const runtime='nodejs'
export async function GET(req:Request){
 const params=new URL(req.url).searchParams
 const size=params.get('size')==='192'?192:512
 return new ImageResponse(
  <div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',
   justifyContent:'center',background:'#1E293B',borderRadius:size*.15,
   color:'#fff',position:'relative',flexDirection:'column'}}>
    <div style={{display:'flex',alignItems:'baseline',gap:size*.01}}>
     <span style={{color:'#80D0D1',fontSize:size*.27,fontWeight:900,letterSpacing:-size*.02}}>Ari</span>
     <span style={{fontSize:size*.27,fontWeight:900,letterSpacing:-size*.02}}>Mar</span>
    </div>
    <div style={{display:'flex',fontSize:size*.075,fontWeight:700,letterSpacing:size*.02,
     color:'#B7E1E1',marginTop:size*.02}}>PATA</div>
  </div>,{width:size,height:size,headers:{'Cache-Control':'public, max-age=86400'}})
}
