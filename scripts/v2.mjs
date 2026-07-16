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
await p.waitForTimeout(300)
// menu dropdown
await p.getByTitle(/Menu/i).click(); await p.waitForTimeout(250)
const menuItems = await p.locator('.menuItem').allInnerTexts()
await p.screenshot({ path:'scripts/v2-menu.png' })
// artwork details
await p.locator('.menuItem', { hasText:'Artwork Details' }).click(); await p.waitForTimeout(300)
const hasDetails = await p.locator('.detailsModal').count()
await p.screenshot({ path:'scripts/v2-details.png' })
await p.locator('.detailsModal .drawerClose').click(); await p.waitForTimeout(200)
// colour panel
await p.locator('.tbColor').click(); await p.waitForTimeout(250)
const hasPanel = await p.locator('.colorPanel').count()
await p.locator('.cpNew').click(); await p.waitForTimeout(200) // new palette
await p.locator('.cpPal .cpSw.add').first().click().catch(()=>{}) // add current colour
await p.waitForTimeout(200)
const palCount = await p.locator('.cpPal').count()
const swCount = await p.locator('.cpPal').first().locator('.cpSw:not(.add)').count()
await p.screenshot({ path:'scripts/v2-colour.png' })
console.log('menuItems', JSON.stringify(menuItems))
console.log('hasDetails', hasDetails, 'hasPanel', hasPanel, 'palettes', palCount, 'swatchesInFirst', swCount)
console.log('errors', errs.length? errs.slice(0,4).join(' | ') : 'none')
await b.close()
