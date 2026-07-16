import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel:'msedge', headless:true })
const p = await b.newPage({ viewport:{ width:1366, height:1024 } })
p.on('pageerror', e=>console.log('ERR',String(e)))
await p.goto('http://localhost:3003/', { waitUntil:'domcontentloaded' })
await p.evaluate(async()=>{localStorage.clear();const d=(await indexedDB.databases?.())||[];await Promise.all(d.map(x=>new Promise(r=>{const q=indexedDB.deleteDatabase(x.name);q.onsuccess=q.onerror=()=>r()})))})
await p.reload({ waitUntil:'domcontentloaded' }); await p.waitForTimeout(900)
const nb=p.getByRole('button',{name:/New artwork/i}); if(await nb.count()){await nb.first().click();await p.waitForTimeout(200)}
const tb=p.getByRole('button',{name:/3.?bead/i}); if(await tb.count()){await tb.first().click();await p.waitForTimeout(500)}
await p.waitForTimeout(300)
await p.screenshot({ path:'scripts/diag-empty.png' })
// draw one isolated dab + a short line
const bb=await p.locator('canvas.board').boundingBox(); const cx=bb.x+bb.width/2, cy=bb.y+bb.height/2
await p.getByTitle('Draw').click()
await p.mouse.move(cx-160,cy); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(300) // single bead
await p.mouse.move(cx+40,cy-60); await p.mouse.down(); await p.mouse.move(cx+140,cy-60,{steps:6}); await p.mouse.up(); await p.waitForTimeout(400)
// zoom in a lot to inspect bleed (wheel zoom at center)
for(let i=0;i<6;i++){ await p.mouse.move(cx-160,cy); await p.mouse.wheel(0,-260); await p.waitForTimeout(120) }
await p.waitForTimeout(500)
await p.screenshot({ path:'scripts/diag-zoom.png' })
await b.close()
console.log('done')
