// Verify the mid-zoom colour-bleed fix: in the texture (rects) regime a filled
// bead's colour must cover only ITS OWN silhouette — the old double-wide apex
// rect leaked a phantom half-bead of colour into empty neighbour cells at shape
// edges. Run against a live dev server: node scripts/bleedtest.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const results = []
const ok = (name, cond, extra = '') => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`); if (!cond) process.exitCode = 1 }

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(800)

// new-artwork flow (Morii reskin): gallery → New artwork → technique →
// "Canvas & beads" dialog (size set HERE) → Create artwork → editor
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(300) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(300) }
// Big canvas so >2000 cells are visible at 100% zoom → rects+texture regime
// while beads are still ~12 px on screen (bleed would be plainly visible).
const dlgInputs = page.locator('.card:has-text("Canvas size") input')
await dlgInputs.nth(0).fill('100')
await dlgInputs.nth(1).fill('100')
const createBtn = page.getByRole('button', { name: /Create artwork/i })
if (await createBtn.count()) { await createBtn.first().click(); await page.waitForTimeout(700) }

await page.evaluate(() => {
  window.__longtasks = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__longtasks.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2

// zoom to ~100% (fit on 100×100 is ~10%)
const zoomLabel = async () => (await page.locator('.zval').innerText().catch(() => '')).trim()
for (let i = 0; i < 30; i++) {
  const z = parseInt(await zoomLabel(), 10)
  if (z >= 95) break
  await page.mouse.move(cx, cy); await page.mouse.wheel(0, -240); await page.waitForTimeout(50)
}
await page.waitForTimeout(400)
const zoom = await zoomLabel()

// paint isolated single beads at scattered points. NOTE: a tap only paints
// when it lands ON a bead oval (beadAt hit-test — taps in thread gaps do
// nothing, by design), so scatter many points; enough land on beads of both
// parities. Then measure each coloured blob's bbox.
const pts = []
for (let i = -2; i <= 2; i++)
  for (const [ox, oy] of [[0, -120], [40, 130], [13, -270], [27, 280]])
    pts.push([cx + i * 150 + ox, cy + oy])
for (const [x, y] of pts) { await page.mouse.click(x, y); await page.waitForTimeout(80) }
await page.waitForTimeout(600)
await page.screenshot({ path: 'scripts/bleedtest-clicks.png' })

const blobs = await page.evaluate((pts) => {
  const cv = document.querySelector('canvas.board')
  const rect = cv.getBoundingClientRect()
  const ctx = cv.getContext('2d')
  const sx = cv.width / rect.width
  // painted bead = saturated colour; empty lattice/bg/chrome are all near-grey
  const isBead = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b) > 45
  const out = []
  for (const [px, py] of pts) {
    const S = Math.round(60 * sx)
    const x0 = Math.round((px - rect.left) * sx) - S
    const y0 = Math.round((py - rect.top) * sx) - S
    const d = ctx.getImageData(x0, y0, 2 * S, 2 * S)
    let minx = Infinity, maxx = -1, miny = Infinity, maxy = -1, n = 0
    for (let y = 0; y < d.height; y++) for (let x = 0; x < d.width; x++) {
      const i = (y * d.width + x) * 4
      if (!isBead(d.data[i], d.data[i + 1], d.data[i + 2])) continue
      n++
      if (x < minx) minx = x; if (x > maxx) maxx = x
      if (y < miny) miny = y; if (y > maxy) maxy = y
    }
    if (n > 8) out.push({ w: maxx - minx + 1, h: maxy - miny + 1, n })
  }
  return out
}, pts)

const aspects = blobs.map((b) => +(b.w / b.h).toFixed(2))
const worstAspect = aspects.length ? Math.max(...aspects) : 0
ok('#1 reached the texture regime', parseInt(zoom, 10) >= 60, `zoom=${zoom}`)
ok('#2 painted beads found (≥6 of 20 taps land on ovals)', blobs.length >= 6, `${blobs.length} blobs`)
// apex silhouette bbox aspect = (Bh·1.25? no —) w/h = Bh/Bw = 1.5625 max with
// the fix; the double-wide bug gave ≈ 2.2+. Base beads ≈ 1.0 either way.
ok('#3 no half-bead bleed (blob aspect ≤ 1.8)', worstAspect > 0 && worstAspect <= 1.8, `aspects: ${aspects.join(', ')}`)

// a thick diagonal stroke for visual edge inspection
const brush = page.locator('input[type="range"]').first()
await brush.fill('6').catch(() => {})
await page.mouse.move(cx - 300, cy - 200)
await page.mouse.down()
for (let i = 1; i <= 12; i++) await page.mouse.move(cx - 300 + i * 45, cy - 200 + i * 30)
await page.mouse.up()
await page.waitForTimeout(700)
await page.screenshot({ path: 'scripts/bleedtest-edge.png', clip: { x: cx - 350, y: cy - 260, width: 700, height: 500 } })

const lt = await page.evaluate(() => window.__longtasks || [])
const worst = lt.length ? Math.max(...lt) : 0
ok('#4 no multi-second freeze', worst < 1500, `worst ${worst}ms`)
ok('#5 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\nblobs: ${JSON.stringify(blobs)}  zoom=${zoom}`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
