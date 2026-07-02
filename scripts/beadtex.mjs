// Verify the bead-texture overlay: at mid-zoom a filled region must read as
// woven beads (colour beads + thread gaps), not a flat colour block, and must
// stay fast + error-free. Run against a live dev server: node scripts/beadtex.mjs
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

const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(200) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(400) }

await page.evaluate(() => {
  window.__longtasks = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__longtasks.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})

// 100×100 canvas
const sizeCard = page.locator('.card', { hasText: 'Canvas size' })
await sizeCard.locator('input').nth(0).fill('100'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('100'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2

// fill the whole canvas (drag a swatch onto it)
const sw = page.locator('.sw').first()
const swBox = await sw.boundingBox()
await page.mouse.move(swBox.x + swBox.width / 2, swBox.y + swBox.height / 2)
await page.mouse.down()
await page.mouse.move(cx - 100, cy - 60, { steps: 4 })
await page.mouse.move(cx, cy, { steps: 6 })
await page.mouse.up()
await page.waitForTimeout(1800)

// Zoom to a mid level: default bead is 1.5mm → Bw≈12 doc px, so onScreenBw = 12·scale.
// The texture shows for 2.5 ≤ onScreenBw < 6 → scale 0.21–0.5 (zoom 21–50%). Fit
// view is ~10%, so zoom IN a few steps to land in that band.
const zoomLabel = async () => (await page.locator('.zval').innerText().catch(() => '')).trim()
for (let i = 0; i < 12; i++) {
  await page.mouse.move(cx, cy); await page.mouse.wheel(0, -240); await page.waitForTimeout(60)
  const z = parseInt(await zoomLabel(), 10)
  if (z >= 30 && z <= 45) break
}
await page.waitForTimeout(400)
const zoom = await zoomLabel()
await page.screenshot({ path: 'scripts/beadtex-mid.png' })

// sample a central block of the board canvas: count bead-colour vs gap(white) px
const sample = await page.evaluate(() => {
  const cv = document.querySelector('canvas.board')
  const ctx = cv.getContext('2d')
  const S = 200
  const x = Math.floor(cv.width / 2 - S / 2)
  const y = Math.floor(cv.height / 2 - S / 2)
  const d = ctx.getImageData(x, y, S, S).data
  let whitish = 0, coloured = 0, total = 0
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3]
    if (a < 10) continue
    total++
    if (r > 235 && g > 235 && b > 235) whitish++          // thread/gap
    else if (r > 200 && g < 220 && b > 190) coloured++     // pinkish bead (#F3CEDE)
  }
  return { whitish, coloured, total }
})
const gapFrac = sample.total ? sample.whitish / sample.total : 0
const beadFrac = sample.total ? sample.coloured / sample.total : 0
ok('#1 landed in the texture zoom band', /^(3\d|4[0-5])/.test(zoom) || parseInt(zoom, 10) >= 25, `zoom=${zoom}`)
ok('#2 gaps are visible (woven, not a flat block)', gapFrac > 0.05, `gap ${(gapFrac * 100).toFixed(1)}%`)
ok('#3 bead colour still dominant', beadFrac > 0.3, `bead ${(beadFrac * 100).toFixed(1)}%`)

const lt = await page.evaluate(() => window.__longtasks || [])
const worst = lt.length ? Math.max(...lt) : 0
ok('#4 no multi-second freeze', worst < 1500, `worst ${worst}ms`)
ok('#5 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\nsample: ${JSON.stringify(sample)}  zoom=${zoom}`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
