// Reproduce "coloured the whole canvas, switched between 2 shades, crashed".
// Repeatedly flood-fills the whole dense canvas alternating two palette colours,
// under iPad-class CPU throttle, watching for long freezes, JS errors, or a
// page crash. Run against a live dev server: node scripts/fillcrash.mjs
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
  try {
    new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__longtasks.push(Math.round(e.duration)) })
      .observe({ entryTypes: ['longtask'] })
  } catch {}
})

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const placed = async () => parseInt((await page.locator('.stageInfo').innerText()).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')

// drag palette swatch #idx onto the canvas centre → flood-fills the whole field
const fillWith = async (idx) => {
  const sw = page.locator('.sw').nth(idx)
  const b = await sw.boundingBox()
  if (!b) return
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2)
  await page.mouse.down()
  await page.mouse.move(cx - 120, cy - 80, { steps: 4 })
  await page.mouse.move(cx, cy, { steps: 6 })
  await page.mouse.up()
  await page.waitForTimeout(400)
}

const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })

// alternate between two palette shades ~12 times (the reported action)
let crashed = false
for (let i = 0; i < 12 && !crashed; i++) {
  await fillWith(i % 2)
  const beads = await placed().catch(() => { crashed = true; return -1 })
  const lts = await page.evaluate(() => window.__longtasks.slice()).catch(() => { crashed = true; return [] })
  const worst = lts.length ? Math.max(...lts) : 0
  console.log(`fill #${i + 1} (shade ${i % 2}) → ${beads} placed · worst long-task so far ${worst}ms · errors ${errors.length}`)
  if (errors.some((e) => e.includes('CRASHED'))) crashed = true
}

const lts = await page.evaluate(() => window.__longtasks || []).catch(() => [])
const worst = lts.length ? Math.max(...lts) : 0
console.log(`\nworst long-task overall: ${worst}ms  (${lts.length} tasks over 50ms)`)
console.log(`long-tasks: [${lts.join(', ')}]`)
console.log(`errors: ${errors.length ? errors.join(' | ') : 'none'}`)
console.log(crashed || errors.length ? '\nRESULT: reproduced a problem' : '\nRESULT: no crash/error locally')
await browser.close()
