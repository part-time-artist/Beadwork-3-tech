// Reproduce the iPad "crash while drawing/erasing" on a DENSE design.
// Hypothesis: ERASE (and straight-line draw) skip the fast-stroke path, so each
// move repaints the whole design + copies the whole bead Map — multi-second
// main-thread freezes on a big design = the iPad Safari watchdog tab-kill.
// Compares freeze time during an ERASE drag vs a freehand DRAW drag.
// Run against a live dev server: node scripts/erasehang.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('crash', () => errors.push('PAGE CRASHED'))
const results = []
const ok = (name, cond, extra = '') => {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`)
  if (!cond) process.exitCode = 1
}

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

// dense design like "Parvat": 30×40 cm, fully filled
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
  window.__lt = () => { const a = window.__longtasks; window.__longtasks = []; return a }
})

// Throttle the CPU to iPad-class speed (desktop is too fast to show the freeze).
const cdp = await page.context().newCDPSession(page)

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const placed = async () => parseInt((await page.locator('.stageInfo').innerText()).match(/([\d,]+)\s*PLACED/i)?.[1].replace(/,/g, '') || '0')

// FILL the whole canvas (drag a swatch on) → dense field
const sw = page.locator('.sw').first()
const swBox = await sw.boundingBox()
await page.mouse.move(swBox.x + swBox.width / 2, swBox.y + swBox.height / 2)
await page.mouse.down()
await page.mouse.move(cx - 100, cy - 60, { steps: 4 })
await page.mouse.move(cx, cy, { steps: 6 })
await page.mouse.up()
await page.waitForTimeout(2500)
const beads = await page.locator('.stageInfo').innerText().then((t) => t.match(/([\d,]+)\s*PLACED/i)?.[1] || '?')
ok('#A dense design filled', beads !== '?' && parseInt(beads.replace(/,/g, '')) > 20000, `${beads} placed`)
await page.evaluate(() => window.__lt()) // clear fill's long-tasks

// a long multi-step drag across the dense field (simulates a real stroke)
const dragAcross = async () => {
  await page.mouse.move(cx - board.width * 0.35, cy - board.height * 0.3)
  await page.mouse.down()
  const pts = [[-0.1, -0.1], [0.15, 0.05], [-0.05, 0.25], [0.2, 0.3], [0.35, 0.15], [0.1, -0.2], [-0.2, 0.1]]
  for (const [fx, fy] of pts) {
    await page.mouse.move(cx + board.width * fx, cy + board.height * fy, { steps: 12 })
    await page.waitForTimeout(50)
  }
  await page.mouse.up()
  await page.waitForTimeout(300)
}
const worstOf = async () => { const a = await page.evaluate(() => window.__lt()); return { worst: a.length ? Math.max(...a) : 0, n: a.length, tasks: a } }

// slow the CPU to ~iPad class for the interaction measurements
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })
await page.waitForTimeout(200)

// ---- ERASE drag first (carves holes in the full field → count drops)
await page.getByRole('button', { name: /^erase$/i }).first().click().catch(() => {})
await page.waitForTimeout(150)
const eraseBefore = await placed()
await page.evaluate(() => window.__lt())
await dragAcross()
const erase = await worstOf()
const eraseAfter = await placed()
await page.screenshot({ path: 'scripts/erase-after.png' })

// ---- DRAW drag over the just-erased holes (fast path SHOULD engage → count rises)
await page.getByRole('button', { name: /^draw$/i }).first().click().catch(() => {})
await page.locator('.sw').nth(1).click().catch(() => {}) // a different colour
await page.waitForTimeout(150)
const drawBefore = await placed()
await page.evaluate(() => window.__lt())
await dragAcross()
const draw = await worstOf()
const drawAfter = await placed()

ok('#B erase drag actually erased', eraseAfter < eraseBefore, `${eraseBefore} → ${eraseAfter}`)
ok('#C draw drag actually painted (refilled holes)', drawAfter > drawBefore, `${drawBefore} → ${drawAfter}`)
ok('#D draw drag stays smooth (worst frame < 400ms)', draw.worst < 400, `worst ${draw.worst}ms of ${draw.n}`)
ok('#E erase drag stays smooth (worst frame < 400ms)', erase.worst < 400, `worst ${erase.worst}ms of ${erase.n}`)
ok('#F no page errors/crash', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`\n(CPU throttled 6× ≈ iPad class)`)
console.log(`DRAW  worst long-task: ${draw.worst}ms (${draw.n} tasks)  [${draw.tasks.join(', ')}]`)
console.log(`ERASE worst long-task: ${erase.worst}ms (${erase.n} tasks)  [${erase.tasks.join(', ')}]`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
