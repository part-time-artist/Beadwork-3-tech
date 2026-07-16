// Reproduce the crash on the REAL WebKit (Safari) engine with iPad emulation.
// Desktop RAM won't hit the iPad memory ceiling, so a MEMORY crash won't repro
// here — but a Safari-ENGINE bug (throw / infinite loop / canvas fault that
// Chromium tolerates) will. Hammers the "colour canvas, switch shades" scenario.
// Freeze meter uses rAF-gap (Safari has no longtask API). Run: node scripts/webkit-ipad.mjs
import { webkit, devices } from 'playwright-core'

const ipad = devices['iPad Pro 11'] || devices['iPad (gen 7)']
const browser = await webkit.launch({ headless: true })
const context = await browser.newContext({ ...ipad })
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('ERROR: ' + String(e)))
page.on('crash', () => errors.push('*** PAGE CRASHED ***'))
context.on('close', () => {})

console.log(`engine: WebKit (Safari) · device: ${ipad ? 'iPad' : '?'} · viewport ${ipad?.viewport?.width}x${ipad?.viewport?.height} @${ipad?.deviceScaleFactor}x`)

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(300) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(500) }
const sizeCard = page.locator('.card', { hasText: 'Canvas size' })
await sizeCard.locator('input').nth(0).fill('45'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('50'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(600)

// Safari-compatible freeze meter: track the largest gap between animation frames.
await page.evaluate(() => {
  window.__gap = 0; let last = performance.now()
  const tick = (t) => { const g = t - last; if (g > window.__gap) window.__gap = g; last = t; requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
})

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const placed = async () => parseInt((await page.locator('.stageInfo').innerText().catch(() => '')).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')

// fill the whole canvas
const sw0 = await page.locator('.sw').nth(0).boundingBox()
await page.mouse.move(sw0.x + sw0.width / 2, sw0.y + sw0.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 80, cy - 50, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(3000)
console.log(`filled: ${await placed()} beads`)

// hammer: many draw strokes, switching shades, with occasional zoom — compresses
// a 3–4 min colouring session. Watch for crash / error the whole time.
let alive = true
for (let i = 0; i < 150 && alive; i++) {
  try {
    await page.locator('.sw').nth(1 + i % 3).click({ timeout: 2000 }).catch(() => {})
    const sx = cx + ((i * 13) % 220 - 110), sy = cy + ((i * 9) % 180 - 90)
    await page.mouse.move(sx, sy)
    await page.mouse.down()
    await page.mouse.move(sx + 35, sy + 22, { steps: 3 })
    await page.mouse.move(sx + 8, sy + 48, { steps: 3 })
    await page.mouse.up()
    await page.waitForTimeout(120)
  } catch (e) {
    errors.push('DRIVE-FAIL@' + i + ': ' + String(e).slice(0, 80)); alive = false
  }
  if (errors.some((e) => e.includes('CRASHED') || e.includes('DRIVE-FAIL'))) alive = false
  if (i % 25 === 24) {
    const beads = await placed().catch(() => -1)
    const gap = await page.evaluate(() => Math.round(window.__gap)).catch(() => -1)
    console.log(`  stroke ${i + 1}: ${beads} beads · worst frame-gap ${gap}ms · errors ${errors.length}`)
  }
}
const gap = await page.evaluate(() => Math.round(window.__gap)).catch(() => -1)
console.log(`\nWORST frame-gap (freeze) all session: ${gap}ms`)
console.log(`errors: ${errors.length ? errors.join(' | ') : 'none'}`)
console.log(errors.length ? '\n*** REPRODUCED A PROBLEM in WebKit ***' : '\nNo engine crash in WebKit (points to iPad memory ceiling, not an engine bug)')
await browser.close()
