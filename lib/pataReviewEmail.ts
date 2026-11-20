/** Optional booking email and explicit, unchecked consent to request a Google review. */
export type ReviewEmailInput={email:string;reviewConsent:boolean}
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function parseReviewEmail(body:Record<string,unknown>):ReviewEmailInput|null{
 const email=body.email===undefined?'':body.email
 const reviewConsent=body.reviewConsent===undefined?false:body.reviewConsent
 if(typeof email!=='string'||typeof reviewConsent!=='boolean'||email.length>254)return null
 const normalized=email.trim().toLowerCase()
 if(normalized.length>254||(normalized!==''&&!emailPattern.test(normalized))||
   (reviewConsent&&normalized===''))return null
 return {email:normalized,reviewConsent}
}
