import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel: 'msedge', headless: true })
const p = await b.newPage({ viewport: { width: 1366, height: 1024 } })
const errs = []
p.on('pageerror', e => errs.push(String(e)))
p.on('console', m => { if (m.type()==='error' && !/favicon/.test(m.text())) errs.push('con: '+m.text()) })
await p.goto('http://localhost:3002/', { waitUntil:'domcontentloaded' })
await p.evaluate(async () => { localStorage.clear(); const dbs=(await indexedDB.databases?.())||[]; await Promise.all(dbs.map(d=>new Promise(r=>{const q=indexedDB.deleteDatabase(d.name);q.onsuccess=q.onerror=()=>r()}))) })
await p.reload({ waitUntil:'domcontentloaded' }); await p.waitForTimeout(900)
const nb = p.getByRole('button', { name:/New artwork/i }); if(await nb.count()){ await nb.first().click(); await p.waitForTimeout(200) }
const tb = p.getByRole('button', { name:/3.?bead/i }); if(await tb.count()){ await tb.first().click(); await p.waitForTimeout(500) }
// draw a bit so a bead layer has content
const board = await p.locator('canvas.board').boundingBox()
const cx = board.x+board.width/2, cy=board.y+board.height/2
await p.getByTitle('Draw').click()
await p.mouse.move(cx-100,cy); await p.mouse.down(); await p.mouse.move(cx+100,cy,{steps:6}); await p.mouse.up(); await p.waitForTimeout(400)
// add a second bead layer + alpha lock to show the A badge
await p.getByTitle('Layers').click(); await p.waitForTimeout(200)
await p.locator('.lpAdd', { hasText:'+' }).click(); await p.waitForTimeout(200)
await p.locator('.layerActions button', { hasText:'α' }).click(); await p.waitForTimeout(200)
const badges = await p.locator('.lpBlend').allInnerTexts()
const visBoxes = await p.locator('.lpVis').count()
await p.screenshot({ path:'scripts/v2-layers.png' })
await p.getByTitle('Layers').click(); await p.waitForTimeout(150)
// selection tool → bottom bar
await p.getByTitle('Select').click(); await p.waitForTimeout(200)
const selBar = await p.locator('.selPop').count()
await p.screenshot({ path:'scripts/v2-select.png' })
console.log('blendBadges', JSON.stringify(badges), 'visBoxes', visBoxes, 'selBar', selBar)
console.log('errors', errs.length? errs.slice(0,4).join(' | ') : 'none')
await b.close()
