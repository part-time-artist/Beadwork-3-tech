// Verify #3 (zoom/pan responsiveness): during a live gesture the app blits a
// cached render (fast), then settles to a crisp full render. Assert: a rapid
// zoom burst produces few slow frames, and after it settles the canvas shows a
// real woven render (gaps + beads), not a stuck/blank blit. Live dev server.
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const results = []
const ok = (n, c, x = '') => { results.push(`${c ? 'PASS' : 'FAIL'}  ${n}${x ? ' — ' + x : ''}`); if (!c) process.exitCode = 1 }

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => { localStorage.clear(); const dbs=(await indexedDB.databases?.())||[]; await Promise.all(dbs.map(d=>new Promise(r=>{const q=indexedDB.deleteDatabase(d.name);q.onsuccess=q.onerror=()=>r()}))) })
await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForTimeout(800)
const nb = page.getByRole('button', { name: /New artwork/i }); if (await nb.count()) { await nb.first().click(); await page.waitForTimeout(200) }
const tb = page.getByRole('button', { name: /3.?bead/i }); if (await tb.count()) { await tb.first().click(); await page.waitForTimeout(400) }

const sc = page.locator('.card', { hasText: 'Canvas size' })
await sc.locator('input').nth(0).fill('100'); await sc.locator('input').nth(0).press('Enter')
await sc.locator('input').nth(1).fill('100'); await sc.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)
const b = await page.locator('canvas.board').boundingBox()
const cx = b.x + b.width / 2, cy = b.y + b.height / 2
const sw = page.locator('.sw').first(); const s = await sw.boundingBox()
await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2); await page.mouse.down(); await page.mouse.move(cx - 100, cy - 60, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(1800)

await page.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) })

// rapid zoom burst: 18 wheel steps close together (a real user spinning to zoom)
for (let i = 0; i < 18; i++) { await page.mouse.move(cx, cy); await page.mouse.wheel(0, -140); await page.waitForTimeout(16) }
const burstLt = await page.evaluate(() => (window.__lt || []).slice())
// pan burst
await page.mouse.move(cx, cy); await page.mouse.down()
for (const [dx, dy] of [[-140, -90], [160, 120], [-120, 150], [130, -140], [-90, 90]]) await page.mouse.move(cx + dx, cy + dy, { steps: 3 })
await page.mouse.up()
await page.waitForTimeout(400)
const allLt = await page.evaluate(() => (window.__lt || []).slice())

// zoom to a MID level (~30–40%), where the woven texture (gaps) is visible, then
// let it settle: sampling gaps there proves the settle ran a real full render
// (a stuck blit of the zoomed-in view would show no gaps).
const zl = async () => parseInt((await page.locator('.zval').innerText().catch(() => '0')), 10)
for (let i = 0; i < 40; i++) { const z = await zl(); if (z >= 30 && z <= 42) break; await page.mouse.move(cx, cy); await page.mouse.wheel(0, z > 42 ? 160 : -160); await page.waitForTimeout(30) }
const zoom = await zl()
await page.waitForTimeout(350)
await page.screenshot({ path: 'scripts/zoompan-settled.png', clip: { x: cx - 150, y: cy - 150, width: 300, height: 300 } })
const sample = await page.evaluate(() => {
  const cv = document.querySelector('canvas.board'); const ctx = cv.getContext('2d')
  const S = 160, x = Math.floor(cv.width / 2 - S / 2), y = Math.floor(cv.height / 2 - S / 2)
  const d = ctx.getImageData(x, y, S, S).data
  let white = 0, colour = 0, total = 0
  for (let i = 0; i < d.length; i += 4) { const r=d[i],g=d[i+1],b=d[i+2],a=d[i+3]; if (a<10) continue; total++; if (r>235&&g>235&&b>235) white++; else if (r>200&&g<220&&b>190) colour++ }
  return { white, colour, total }
})

const slowBurst = burstLt.filter((t) => t > 60).length
const worst = allLt.length ? Math.max(...allLt) : 0
ok('#1 few slow frames during a rapid zoom burst', slowBurst <= 3, `${slowBurst} frames >60ms of ${burstLt.length} longtasks; [${burstLt.join(',')}]`)
ok('#2 no multi-second block during zoom+pan', worst < 800, `worst ${worst}ms`)
ok('#3 settled render is crisp woven beads (gaps present)', sample.total > 0 && sample.white / sample.total > 0.04, `gap ${(100*sample.white/(sample.total||1)).toFixed(1)}% at zoom ${zoom}%`)
ok('#4 settled render has bead colour', sample.total > 0 && sample.colour / sample.total > 0.3, `bead ${(100*sample.colour/(sample.total||1)).toFixed(1)}%`)
ok('#5 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\nburst longtasks=[${burstLt.join(', ')}]  all=[${allLt.join(', ')}]  zoom=${zoom}%  sample=${JSON.stringify(sample)}`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
