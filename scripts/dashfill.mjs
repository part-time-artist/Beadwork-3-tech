// Showcase shot for the dashboard redesign review: three artworks with real
// strokes, then the gallery at desktop + iPad-portrait sizes.
// Run: node scripts/dashfill.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(800)

const stroke = async (x1, y1, x2, y2) => {
  await page.mouse.move(x1, y1)
  await page.mouse.down()
  const steps = 24
  for (let i = 1; i <= steps; i++) await page.mouse.move(x1 + ((x2 - x1) * i) / steps, y1 + ((y2 - y1) * i) / steps)
  await page.mouse.up()
  await page.waitForTimeout(150)
}

// pick a palette colour by index if the rail is present
const pickColour = async (i) => {
  const sw = page.locator('.paletteRail button').nth(i)
  if (await sw.count()) await sw.click().catch(() => {})
  await page.waitForTimeout(150)
}

for (let n = 0; n < 3; n++) {
  for (const [name, wait] of [[/New artwork/i, 300], [/3.?bead/i, 300], [/Create artwork/i, 700]]) {
    const b = page.getByRole('button', { name })
    if (await b.count()) { await b.first().click(); await page.waitForTimeout(wait) }
  }
  const board = await page.locator('canvas.board').boundingBox()
  const cx = board.x + board.width / 2
  const cy = board.y + board.height / 2
  await pickColour(n * 2)
  if (n === 0) {
    await stroke(cx - 120, cy - 60, cx + 120, cy + 60)
    await stroke(cx - 120, cy + 60, cx + 120, cy - 60)
    await pickColour(1)
    await stroke(cx - 120, cy, cx + 120, cy)
  } else if (n === 1) {
    for (let r = -2; r <= 2; r++) await stroke(cx - 100, cy + r * 26, cx + 100, cy + r * 26)
  } else {
    await stroke(cx, cy - 80, cx, cy + 80)
    await pickColour(3)
    await stroke(cx - 90, cy - 40, cx + 90, cy - 40)
    await stroke(cx - 90, cy + 40, cx + 90, cy + 40)
  }
  await page.waitForTimeout(1800) // autosave
  await page.locator('button[title="My artworks"]').click()
  await page.waitForTimeout(600)
}

await page.screenshot({ path: 'scripts/dashboard-showcase.png' })
await page.setViewportSize({ width: 834, height: 1112 })
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/dashboard-showcase-ipad.png' })
console.log('showcase shots written')
await browser.close()
