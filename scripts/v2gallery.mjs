import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel: 'msedge', headless: true })
const p = await b.newPage({ viewport: { width: 1366, height: 1024 } })
const errs = []
p.on('pageerror', e => errs.push(String(e)))
p.on('console', m => { if (m.type()==='error' && !/favicon/.test(m.text())) errs.push('con: '+m.text()) })
await p.goto('http://localhost:3002/', { waitUntil:'domcontentloaded' })
await p.evaluate(async () => { localStorage.clear(); const dbs=(await indexedDB.databases?.())||[]; await Promise.all(dbs.map(d=>new Promise(r=>{const q=indexedDB.deleteDatabase(d.name);q.onsuccess=q.onerror=()=>r()}))) })
await p.reload({ waitUntil:'domcontentloaded' }); await p.waitForTimeout(900)
await p.screenshot({ path:'scripts/v2-gallery.png' })
// open technique chooser
await p.getByRole('button', { name:/New artwork/i }).first().click(); await p.waitForTimeout(300)
await p.screenshot({ path:'scripts/v2-chooser.png' })
console.log('errors', errs.length? errs.slice(0,4).join(' | ') : 'none')
await b.close()
