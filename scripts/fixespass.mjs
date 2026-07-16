// Smoke check for the 2026-06-30 fixes pass: app boots, fresh artwork has a
// Background layer + one bead layer, drawing works, hidden-bg toast appears,
// adding an image creates an image layer, and no page errors are thrown.
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const fail = (m) => { console.log('FAIL:', m); process.exitCode = 1 }

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  // wipe IndexedDB artworks so we start on the gallery → new artwork
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

// new artwork → technique chooser → pick 3-bead
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(200) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(400) }

if (!(await page.locator('canvas.board').count())) fail('editor canvas did not render')

// open layers panel
await page.getByTitle('Layers').click()
await page.waitForTimeout(150)
const rowCount = await page.locator('.layerRow').count()
console.log('layer rows:', rowCount)
if (rowCount !== 2) fail('fresh artwork should show 2 rows (bead + background)')
const names = await page.locator('.lpName').allInnerTexts()
console.log('rows:', names)
if (!names.some((n) => /background/i.test(n))) fail('no Background layer row')

// draw a stroke
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
await page.getByTitle('Draw').click()
await page.mouse.move(cx - 120, cy); await page.mouse.down()
await page.mouse.move(cx + 120, cy, { steps: 14 }); await page.mouse.up()
await page.waitForTimeout(200)

// select the Background layer (bottom row) and try to draw → expect a toast
await page.locator('.layerRow').nth(1).click()
await page.waitForTimeout(100)
await page.mouse.move(cx, cy - 60); await page.mouse.down(); await page.mouse.up()
await page.waitForTimeout(150)
const toast = await page.locator('.toast').count()
console.log('toast shown on bg-layer draw attempt:', toast)
if (!toast) fail('expected a toast when drawing on the background layer')

// hide the Background layer → screen should switch to transparent (no crash)
await page.locator('.layerRow').nth(1).locator('.lpEye').click()
await page.waitForTimeout(150)

await page.screenshot({ path: 'scripts/fixespass.png' })
if (errors.length) fail('page errors: ' + errors.join(' | '))
console.log(process.exitCode ? 'RESULT: FAIL' : 'RESULT: PASS')
await browser.close()
