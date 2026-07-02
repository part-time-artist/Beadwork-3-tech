// Verify the 2026-07-01 render fixes on a 100×100 canvas:
//  • no page crash / errors on a big, densely-filled canvas
//  • no multi-second main-thread freeze on fill / pan / zoom (LOD working)
//  • the cm ruler renders (visual — see scripts/perf-*.png)
// Run against a live dev server: node scripts/perf100.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const results = []
const ok = (name, cond, extra = '') => {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) process.exitCode = 1
}

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(800)

// fresh 3-bead artwork
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(200) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(400) }

// install a long-task observer: the "freeze" symptom is a main-thread block.
// Old regression = ~4500ms filling ovals; the fix must keep every task well under.
await page.evaluate(() => {
  window.__longtasks = []
  try {
    new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__longtasks.push(Math.round(e.duration)) })
      .observe({ entryTypes: ['longtask'] })
  } catch {}
})

const cmText = async () => (await page.locator('.stageInfo').innerText().catch(() => '')).match(/(\d+)×(\d+)\s*CM/i)?.slice(1, 3).join('×')

// ---- set canvas to 100×100 cm
const sizeCard = page.locator('.card', { hasText: 'Canvas size' })
const wIn = sizeCard.locator('input').nth(0)
const hIn = sizeCard.locator('input').nth(1)
await wIn.fill('100'); await wIn.press('Enter')
await hIn.fill('100'); await hIn.press('Enter')
await page.waitForTimeout(600)
const cm = await cmText()
ok('#A canvas is 100×100 cm', cm === '100×100', String(cm))

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2

// ---- FILL the whole empty canvas (flood fill = worst case, ~235k beads)
// Fill = drag a palette swatch onto the canvas (pointer-based, not a tool button).
const sw = page.locator('.sw').first()
const swBox = await sw.boundingBox()
const tFill0 = Date.now()
await page.mouse.move(swBox.x + swBox.width / 2, swBox.y + swBox.height / 2)
await page.mouse.down()
await page.mouse.move(cx - 100, cy - 60, { steps: 4 }) // >8px = real drag
await page.mouse.move(cx, cy, { steps: 6 })
await page.mouse.up()
await page.waitForTimeout(200)
// wait until beads are committed to the store (autosave) or 15s
await page.waitForTimeout(1500)
const fillMs = Date.now() - tFill0

const beadCount = () => page.evaluate(() => new Promise((resolve) => {
  const r = indexedDB.open('beadwork3', 1)
  r.onsuccess = () => {
    const t = r.result.transaction('artworks', 'readonly').objectStore('artworks').getAll()
    t.onsuccess = () => {
      const rec = (t.result || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0]
      resolve((rec?.layers || []).reduce((s, l) => s + (l.beads ? l.beads.length : 0), 0))
    }
  }
  r.onerror = () => resolve(-1)
}))
// give autosave time on a huge design
await page.waitForTimeout(2500)
const beads = await beadCount()
ok('#B fill placed a lot of beads (>50k)', beads > 50000, `${beads} beads, fill+commit ~${fillMs}ms`)
await page.screenshot({ path: 'scripts/perf-filled.png' })

// ---- ZOOM OUT fully (LOD → rects), then ZOOM IN (LOD → ovals)
for (let i = 0; i < 14; i++) { await page.mouse.move(cx, cy); await page.mouse.wheel(0, 300); await page.waitForTimeout(60) }
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/perf-zoomout.png' })
for (let i = 0; i < 22; i++) { await page.mouse.move(cx, cy); await page.mouse.wheel(0, -300); await page.waitForTimeout(60) }
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/perf-zoomin.png' })

// ---- PAN around at a mid zoom
await page.mouse.move(cx, cy); await page.mouse.down()
for (const [dx, dy] of [[-200, -120], [200, 160], [-120, 200], [160, -180]]) { await page.mouse.move(cx + dx, cy + dy, { steps: 6 }) }
await page.mouse.up()
await page.waitForTimeout(300)

const longtasks = await page.evaluate(() => window.__longtasks || [])
const worst = longtasks.length ? Math.max(...longtasks) : 0
// the old freeze was ~4500ms; anything under 1500ms means LOD is doing its job.
ok('#C no multi-second freeze during fill/zoom/pan', worst < 1500, `worst long-task ${worst}ms (of ${longtasks.length})`)
ok('#D no page errors on a full 100×100 canvas', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\nlong-tasks(ms): [${longtasks.join(', ')}]`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
