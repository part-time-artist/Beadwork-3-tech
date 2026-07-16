// Reproduce the "jali disappears past ~119% zoom" dead-zone. Fill a dark design,
// then screenshot at rising zoom levels; look for a band where the weave goes flat.
// Run: node scripts/texzoom.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
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
await sizeCard.locator('input').nth(0).fill('11'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('11'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(600)

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const swCount = await page.locator('.sw').count()
const sw = await page.locator('.sw').nth(Math.min(4, swCount - 1)).boundingBox()
await page.mouse.move(sw.x + sw.width / 2, sw.y + sw.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 90, cy - 50, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(2500)

const zoomPct = async () => (await page.locator('.stageInfo').innerText()).match(/·\s*(\d+)%/)?.[1] || '?'
// fit first, then capture as we zoom IN through the danger band
await page.locator('.zval').click().catch(() => {}); await page.waitForTimeout(400)
await page.mouse.move(cx, cy)
for (let shot = 0; shot < 6; shot++) {
  const z = await zoomPct()
  await page.screenshot({ path: `scripts/texz-s${shot}-${z}.png` })
  console.log(`shot ${shot}: ${z}% → scripts/texz-s${shot}-${z}.png`)
  for (let k = 0; k < 3; k++) { await page.mouse.wheel(0, -220); await page.waitForTimeout(90) }
}
console.log('done')
await browser.close()
