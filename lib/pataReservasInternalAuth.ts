import 'server-only'
import {createHash,timingSafeEqual} from 'node:crypto'
function digest(value:string){return createHash('sha256').update(value).digest()}
export function validInternalOrdersToken(request:Request):boolean{
 if(process.env.PATA_INTERNAL_ORDERS_ENABLED!=='true')return false
 const secret=process.env.PATA_INTERNAL_API_TOKEN
 if(!secret || secret.length<32)return false
 const authorization=request.headers.get('authorization')||''
 if(!authorization.startsWith('Bearer '))return false
 const received=authorization.slice(7)
 if(received.length<32||received.length>512)return false
 return timingSafeEqual(digest(received),digest(secret))
}
