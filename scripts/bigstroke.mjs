// Reproduce colouring the whole canvas with the DRAW BRUSH in one big continuous
// scribble (serpentine), which grows the fast-draw painted-set every frame.
// Under iPad-class CPU throttle. Run: node scripts/bigstroke.mjs
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
await sizeCard.locator('input').nth(0).fill('30'); await sizeCard.locator('input').nth(0).press('Enter')
await sizeCard.locator('input').nth(1).fill('40'); await sizeCard.locator('input').nth(1).press('Enter')
await page.waitForTimeout(500)

await page.evaluate(() => {
  window.__longtasks = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__longtasks.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})
const board = await page.locator('canvas.board').boundingBox()
const placed = async () => parseInt((await page.locator('.stageInfo').innerText()).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')

await page.getByRole('button', { name: /^draw$/i }).first().click().catch(() => {})
await page.waitForTimeout(150)

const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })

// ONE continuous serpentine stroke covering the whole board (mimics scribble-fill)
const x0 = board.x + 20, x1 = board.x + board.width - 20
const rows = 40
await page.mouse.move(x0, board.y + 20)
await page.mouse.down()
for (let r = 0; r <= rows; r++) {
  const y = board.y + 20 + (board.height - 40) * (r / rows)
  const toRight = r % 2 === 0
  await page.mouse.move(toRight ? x1 : x0, y, { steps: 10 })
}
await page.mouse.up()
await page.waitForTimeout(400)

const beads = await placed().catch(() => -1)
const lts = await page.evaluate(() => window.__longtasks || []).catch(() => [])
const worst = lts.length ? Math.max(...lts) : 0
const over400 = lts.filter((t) => t > 400).length
console.log(`beads placed by the scribble: ${beads}`)
console.log(`worst long-task: ${worst}ms · tasks>50ms: ${lts.length} · tasks>400ms: ${over400}`)
console.log(`long-tasks: [${lts.join(', ')}]`)
console.log(`errors: ${errors.length ? errors.join(' | ') : 'none'}`)
console.log(worst > 400 || errors.length ? '\nRESULT: reproduced heavy freezes / crash' : '\nRESULT: stayed smooth locally')
await browser.close()
