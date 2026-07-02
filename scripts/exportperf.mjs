// Verify the "Save PNG" fix: on a big, fully-filled canvas the export must
// complete in reasonable time, not freeze the main thread for many seconds, and
// produce a valid (non-blank) PNG. Run against a live dev server.
import { chromium } from 'playwright-core'
import fs from 'node:fs'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true })
const page = await ctx.newPage()
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

const nb = page.getByRole('button', { name: /New artwork/i }); if (await nb.count()) { await nb.first().click(); await page.waitForTimeout(200) }
const tb = page.getByRole('button', { name: /3.?bead/i }); if (await tb.count()) { await tb.first().click(); await page.waitForTimeout(400) }

await page.evaluate(() => {
  window.__longtasks = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__longtasks.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})

// a big but realistic chart: 40×40 cm at 1.5mm ≈ 200×260 beads ≈ 40k (a full
// 100×100 exports fine too but is an extreme; 40×40 is a plausible real design)
const sc = page.locator('.card', { hasText: 'Canvas size' })
await sc.locator('input').nth(0).fill('40'); await sc.locator('input').nth(0).press('Enter')
await sc.locator('input').nth(1).fill('40'); await sc.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const sw = page.locator('.sw').first()
const swBox = await sw.boundingBox()
await page.mouse.move(swBox.x + swBox.width / 2, swBox.y + swBox.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 80, cy - 50, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(1200)

// export & time it
await page.evaluate(() => { window.__longtasks = [] }) // reset: measure export only
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
// click Save PNG (noWaitAfter: the main thread is busy building the chart, so we
// don't wait for post-click page stability) and wait for the download.
const t0 = Date.now()
const dlPromise = page.waitForEvent('download', { timeout: 45000 })
await page.locator('button.primary').click({ noWaitAfter: true })
// the button should flip to a "Preparing…" state before the render blocks
await page.waitForTimeout(200)
const btnText = await page.locator('button.primary').first().innerText().catch(() => '')
ok('#0 shows a Preparing state (not frozen silently)', /prepar/i.test(btnText), btnText)
const download = await dlPromise
const path = 'scripts/exportperf-out.png'
await download.saveAs(path)
const ms = Date.now() - t0

const lt = await page.evaluate(() => window.__longtasks || [])
const worst = lt.length ? Math.max(...lt) : 0
const bytes = fs.statSync(path).size
// PNG dimensions from the IHDR chunk
const buf = fs.readFileSync(path)
const pw = buf.readUInt32BE(16), ph = buf.readUInt32BE(20)

ok('#1 export produced a PNG file', bytes > 5000, `${bytes} bytes, ${pw}×${ph}px`)
ok('#2 export finished reasonably fast', ms < 8000, `${ms}ms end-to-end`)
ok('#3 no single multi-second main-thread block', worst < 2500, `worst long-task ${worst}ms`)
ok('#4 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\nexport ${ms}ms · worst longtask ${worst}ms · longtasks=[${lt.join(', ')}] · png ${pw}×${ph}`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
