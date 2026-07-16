import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel:'msedge', headless:true })
const p = await b.newPage({ viewport:{ width:1366, height:1024 } })
const errs=[]; p.on('pageerror',e=>errs.push(String(e)))
p.on('console',m=>{ if(m.type()==='error'&&!/favicon/.test(m.text())) errs.push('con: '+m.text()) })
await p.goto('http://localhost:3003/',{waitUntil:'domcontentloaded'})
await p.evaluate(async()=>{localStorage.clear();const d=(await indexedDB.databases?.())||[];await Promise.all(d.map(x=>new Promise(r=>{const q=indexedDB.deleteDatabase(x.name);q.onsuccess=q.onerror=()=>r()})))})
await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(900)
await p.getByRole('button',{name:/New artwork/i}).first().click(); await p.waitForTimeout(200)
await p.getByRole('button',{name:/3.?bead/i}).first().click(); await p.waitForTimeout(250)
await p.getByRole('button',{name:/Create artwork/i}).click(); await p.waitForTimeout(500)
const bb=await p.locator('canvas.board').boundingBox(); const cx=bb.x+bb.width/2, cy=bb.y+bb.height/2
// draw a small blob
await p.getByTitle('Draw').click()
await p.mouse.move(cx-60,cy); await p.mouse.down(); await p.mouse.move(cx+60,cy,{steps:6}); await p.mouse.move(cx+60,cy-40,{steps:4}); await p.mouse.up(); await p.waitForTimeout(400)
const placed0 = await p.evaluate(()=>new Promise(res=>{const r=indexedDB.open('beadwork3',1);r.onsuccess=()=>{const t=r.result.transaction('artworks','readonly').objectStore('artworks').getAll();t.onsuccess=()=>{const rec=(t.result||[]).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0))[0];res((rec?.layers||[]).reduce((s,l)=>s+(l.beads?l.beads.length:0),0))}}}))
// select tool + marquee around the beads
await p.getByTitle('Select').click(); await p.waitForTimeout(150)
await p.mouse.move(cx-90,cy-70); await p.mouse.down(); await p.mouse.move(cx+90,cy+30,{steps:8}); await p.mouse.up(); await p.waitForTimeout(300)
const barChips = await p.locator('.selChip').allInnerTexts()
await p.screenshot({ path:'scripts/sel-bar.png' })
// mirror
await p.locator('.selChip',{hasText:'Mirror'}).click(); await p.waitForTimeout(300)
const picks = await p.locator('.mirrorPick').count()
await p.screenshot({ path:'scripts/sel-mirror.png' })
if (picks>0){ await p.locator('.mirrorPick').first().click(); await p.waitForTimeout(400) }
const placed1 = await p.evaluate(()=>new Promise(res=>{const r=indexedDB.open('beadwork3',1);r.onsuccess=()=>{const t=r.result.transaction('artworks','readonly').objectStore('artworks').getAll();t.onsuccess=()=>{const rec=(t.result||[]).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0))[0];res((rec?.layers||[]).reduce((s,l)=>s+(l.beads?l.beads.length:0),0))}}}))
// duplicate -> placement confirm
await p.locator('.selChip',{hasText:'Duplicate'}).click(); await p.waitForTimeout(300)
const confirm = await p.locator('.placeConfirm .placeBtn.ok').count()
await p.screenshot({ path:'scripts/sel-place.png' })
if (confirm>0){ await p.locator('.placeConfirm .placeBtn.ok').click(); await p.waitForTimeout(400) }
const placed2 = await p.evaluate(()=>new Promise(res=>{const r=indexedDB.open('beadwork3',1);r.onsuccess=()=>{const t=r.result.transaction('artworks','readonly').objectStore('artworks').getAll();t.onsuccess=()=>{const rec=(t.result||[]).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0))[0];res((rec?.layers||[]).reduce((s,l)=>s+(l.beads?l.beads.length:0),0))}}}))
console.log('chips',JSON.stringify(barChips))
console.log('placed',placed0,'-> afterMirror',placed1,'-> afterPlace',placed2)
console.log('mirrorPicks',picks,'placeConfirm',confirm)
console.log('errors', errs.length?errs.slice(0,4).join(' | '):'none')
await b.close()
