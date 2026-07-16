// Simulate a REAL long colouring session on a ~49k design: many draw strokes with
// a pause between each (so AUTO-SAVE fires every stroke). Tracks the worst
// main-thread task of ANY kind (render, React, undo, autosave-serialise) AND the
// JS heap trend — to tell a hidden freeze apart from a slow memory leak (OOM).
// Run: node scripts/longsession.mjs
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
const sizeCard = page.locator('.card', { hasText: 'Canvas size' })
await sizeCard.locator('input').nth(0).fill('45'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('50'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)

await page.evaluate(() => {
  window.__worst = 0; window.__count = 0
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__count++; if (e.duration > window.__worst) window.__worst = e.duration } }).observe({ entryTypes: ['longtask'] }) } catch {}
})
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const placed = async () => parseInt((await page.locator('.stageInfo').innerText()).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')
const heap = async () => page.evaluate(() => performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : -1)

// fill the whole canvas
const sw0 = await page.locator('.sw').nth(0).boundingBox()
await page.mouse.move(sw0.x + sw0.width / 2, sw0.y + sw0.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 100, cy - 60, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(2500)
console.log(`design: ${await placed()} beads · heap ${await heap()}MB`)

await page.getByRole('button', { name: /^draw$/i }).first().click().catch(() => {})
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })

const heaps = []
for (let i = 0; i < 30; i++) {
  await page.locator('.sw').nth(1 + i % 3).click().catch(() => {}) // rotate shades, all != fill
  const sx = cx + ((i * 7) % 200 - 100), sy = cy + ((i * 5) % 160 - 80)
  await page.mouse.move(sx, sy)
  await page.mouse.down()
  await page.mouse.move(sx + 40, sy + 25, { steps: 5 })
  await page.mouse.move(sx + 10, sy + 55, { steps: 5 })
  await page.mouse.up() // commit
  await page.waitForTimeout(1800) // > autosave debounce (1500ms @ >40k) so save fires
  const h = await heap().catch(() => -1)
  heaps.push(h)
  const { worst, count } = await page.evaluate(() => ({ worst: Math.round(window.__worst), count: window.__count })).catch(() => ({ worst: -1, count: -1 }))
  if (i % 5 === 4 || errors.length) console.log(`stroke ${i + 1}: heap ${h}MB · worstTask ${worst}ms · tasks ${count} · errors ${errors.length}`)
  if (errors.some((e) => e.includes('CRASHED'))) break
}
const { worst, count } = await page.evaluate(() => ({ worst: Math.round(window.__worst), count: window.__count }))
console.log(`\nWORST main-thread task all session: ${worst}ms  (${count} tasks >50ms)`)
console.log(`heap trend (MB): ${heaps.join(' → ')}`)
console.log(`errors: ${errors.length ? errors.join(' | ') : 'none'}`)
const grew = heaps.length > 5 && heaps[heaps.length - 1] > heaps[4] + 40
console.log(grew ? '\n⚠ heap grew a lot → possible leak/OOM path' : '\nheap stable → not an obvious leak')
await browser.close()
