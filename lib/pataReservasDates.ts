export function dateISO(s:unknown):s is string {
 if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false
 const d=new Date(s+'T12:00:00Z')
 return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s
}
export function shiftDate(s:string,days:number):string {
 const d=new Date(s+'T12:00:00Z')
 d.setUTCDate(d.getUTCDate()+days)
 return d.toISOString().slice(0,10)
}
export function operationalDay():string {
 const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Atlantic/Canary',
  hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit'})
  .formatToParts(new Date())
 const get=(type:string)=>p.find(x=>x.type===type)?.value||''
 const today=[get('year'),get('month'),get('day')].join('-')
 return Number(get('hour'))>=16?shiftDate(today,1):today
}
export function firstPickupDate():string {
 const day=operationalDay(),weekday=new Date(day+'T12:00:00Z').getUTCDay()
 return shiftDate(day,weekday===5?4:weekday===6?3:2)
}
export function dateRange(from:unknown,to:unknown,limit=62):boolean {
 if(!dateISO(from)||!dateISO(to)||to<from)return false
 const days=Math.round((Date.parse(to+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/86400000)
 return days<=limit
}

/** Día civil en Canarias (sin el corte operativo de las 16:00). */
export function todayCanary():string {
 const parts=new Intl.DateTimeFormat('en-GB',{
  timeZone:'Atlantic/Canary',year:'numeric',month:'2-digit',day:'2-digit'
 }).formatToParts(new Date())
 const get=(type:string)=>parts.find(p=>p.type===type)?.value??''
 return [get('year'),get('month'),get('day')].join('-')
}
