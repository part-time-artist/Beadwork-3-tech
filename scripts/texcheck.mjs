// Screenshot a filled 100×100 cm canvas at fit-zoom to verify the jali texture
// now shows when fully zoomed out. Run: node scripts/texcheck.mjs
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
await sizeCard.locator('input').nth(0).fill('100'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('100'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(700)

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
// fill the whole canvas with the DARKEST palette swatch (best jali contrast)
const swCount = await page.locator('.sw').count()
const sw0 = await page.locator('.sw').nth(Math.min(4, swCount - 1)).boundingBox()
await page.mouse.move(sw0.x + sw0.width / 2, sw0.y + sw0.height / 2)
await page.mouse.down(); await page.mouse.move(cx - 100, cy - 60, { steps: 4 }); await page.mouse.move(cx, cy, { steps: 6 }); await page.mouse.up()
await page.waitForTimeout(3000)
// fit to screen (button shows the zoom %, clicking it calls fitView)
await page.locator('.zval').click().catch(() => {})
await page.waitForTimeout(600)
const info = await page.locator('.stageInfo').innerText().catch(() => '')
console.log(info.replace(/\s+/g, ' ').slice(0, 120))
await page.screenshot({ path: 'scripts/tex-100.png' })
// also a zoomed-in crop to confirm the jali detail
await page.mouse.move(cx, cy)
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, -300); await page.waitForTimeout(80) }
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/tex-100-zoomin.png' })
console.log('saved scripts/tex-100.png and scripts/tex-100-zoomin.png')
await browser.close()
