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
await p.getByTitle('Draw').click()
await p.mouse.move(cx-80,cy); await p.mouse.down(); await p.mouse.move(cx+80,cy,{steps:6}); await p.mouse.up(); await p.waitForTimeout(400)
await p.screenshot({ path:'scripts/theme-dark.png' })
// toggle to light via menu
await p.getByTitle(/Menu/i).click(); await p.waitForTimeout(200)
await p.locator('.menuItem',{hasText:'Light mode'}).click(); await p.waitForTimeout(250); await p.locator('.menuScrim').click({position:{x:700,y:600}}); await p.waitForTimeout(200)
await p.screenshot({ path:'scripts/theme-light.png' })
// layers in light
await p.getByTitle('Layers').click(); await p.waitForTimeout(150)
await p.getByTitle('New layer').click(); await p.waitForTimeout(120)
await p.getByTitle('Layers').click(); await p.waitForTimeout(80); await p.getByTitle('Layers').click(); await p.waitForTimeout(150)
await p.screenshot({ path:'scripts/theme-light-layers.png' })
// colour in light
await p.locator('.tbColor').click(); await p.waitForTimeout(250)
await p.screenshot({ path:'scripts/theme-light-colour.png' })
// verify body bg changed
const bg = await p.evaluate(()=>getComputedStyle(document.body).backgroundColor)
console.log('lightBodyBg', bg)
console.log('errors', errs.length?errs.slice(0,4).join(' | '):'none')
await b.close()
