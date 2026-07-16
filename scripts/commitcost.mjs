// Reproduce the real crash: draw-commit on a ~49k-bead design. Each brush stroke,
// when it ENDS, snapshots the whole design (undo) + re-syncs + full-repaints all
// beads → a ~0.5s freeze per stroke; many rapid strokes trip the iPad watchdog.
// Fill a big canvas, then do many short draw strokes, measuring per-commit freezes.
// Run: node scripts/commitcost.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push('ERROR: ' + String(e)))
page.on('crash', () => errors.push('*** PAGE CRASHED ***'))

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
// bigger canvas → ~49k beads like the real crash
const sizeCard = page.locator('.card', { hasText: 'Canvas size' })
await sizeCard.locator('input').nth(0).fill('45'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('50'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)

await page.evaluate(() => {
  window.__lt = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const placed = async () => parseInt((await page.locator('.stageInfo').innerText()).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')

// fill the whole canvas first
const sw0 = await page.locator('.sw').nth(0).boundingBox()
await page.mouse.move(sw0.x + sw0.width / 2, sw0.y + sw0.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 100, cy - 60, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(2500)
console.log(`design size: ${await placed()} beads`)

await page.getByRole('button', { name: /^draw$/i }).first().click().catch(() => {})
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 20 }) // harder, so a sub-50ms render crosses the long-task line
await page.waitForTimeout(150)
const heap = async () => page.evaluate(() => performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : -1)

// many short draw strokes, alternating shades DIFFERENT from the fill so each
// stroke actually changes beads → actually commits. Each stroke END is a commit.
const commitWorst = []
for (let i = 0; i < 12; i++) {
  await page.locator('.sw').nth(1 + i % 2).click().catch(() => {}) // sw#1/#2, never the fill colour
  await page.evaluate(() => { window.__lt = [] })
  const sx = cx + (i % 5 - 2) * 40, sy = cy + (i % 3 - 1) * 40
  await page.mouse.move(sx, sy)
  await page.mouse.down()
  await page.mouse.move(sx + 30, sy + 20, { steps: 4 }) // short stroke
  await page.mouse.up() // <- commit fires here
  await page.waitForTimeout(500)
  const lt = await page.evaluate(() => window.__lt.slice()).catch(() => [])
  const worst = lt.length ? Math.max(...lt) : 0
  commitWorst.push(worst)
  console.log(`stroke #${i + 1} commit → worst frame ${worst}ms  heap ${await heap()}MB  errors:${errors.length}`)
  if (errors.some((e) => e.includes('CRASHED'))) break
}
await page.screenshot({ path: 'scripts/commit-after.png' })
const overall = commitWorst.length ? Math.max(...commitWorst) : 0
console.log(`\nWORST commit freeze: ${overall}ms   (real iPad ≈ this, unthrottled would be ~1/6th but iPad Safari ~matches 6x Edge)`)
console.log(`errors: ${errors.length ? errors.join(' | ') : 'none'}`)
await browser.close()
