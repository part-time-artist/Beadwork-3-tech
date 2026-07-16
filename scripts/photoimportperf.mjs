// Perf budget for the in-app photo-import modal, at iPad-class speed:
// a 30 × 21 cm artwork (~21k beads) under 6× CPU throttle must convert in
// < 250 ms (stats line) and produce NO long-task > 250 ms while working the
// colours slider. This is the P0 acceptance gate from the integration plan.
// Run against the main dev server: node scripts/photoimportperf.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
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

// new 30 × 21 cm artwork at the 1 mm bead (the modal's heavy-but-allowed case)
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(300) }
await page.getByRole('button', { name: /3.?bead/i }).first().click()
await page.waitForTimeout(300)
const dlgInputs = page.locator('.card:has-text("Canvas size") input')
await dlgInputs.nth(0).fill('30')
await dlgInputs.nth(1).fill('21')
await page.getByRole('button', { name: /Create artwork/i }).first().click()
await page.waitForTimeout(800)

// arm long-task observer, then throttle to iPad class
await page.evaluate(() => {
  window.__lt = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })

// open the modal + load the synthetic photo
await page.locator('button[title="Menu"]').click()
await page.waitForTimeout(300)
await page.getByRole('button', { name: 'Import photo as beads' }).click()
await page.waitForTimeout(300)
const dataUrl = await page.evaluate(() => {
  const cv = document.createElement('canvas')
  cv.width = 400; cv.height = 300
  const ctx = cv.getContext('2d')
  const grad = ctx.createRadialGradient(120, 150, 10, 120, 150, 140)
  grad.addColorStop(0, '#ffe9c4')
  grad.addColorStop(1, '#274c3b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 220, 300)
  ctx.fillStyle = '#c0392b'; ctx.fillRect(220, 0, 60, 300)
  ctx.fillStyle = '#2980b9'; ctx.fillRect(280, 0, 60, 300)
  ctx.fillStyle = '#f1c40f'; ctx.fillRect(340, 0, 60, 300)
  return cv.toDataURL('image/png')
})
await page.setInputFiles('.piScrim input[type=file]', {
  name: 'perf.png', mimeType: 'image/png',
  buffer: Buffer.from(dataUrl.split(',')[1], 'base64'),
})
await page.waitForFunction(() => /lattice/.test(document.querySelector('.piScrim')?.innerText || ''), { timeout: 20000 })
await page.waitForTimeout(400)

const statsLine = (await page.locator('.piScrim').innerText()).match(/([\d,]+)\s*beads\s*·\s*(\d+)\s*ms/)
const beads = parseInt(statsLine[1].replace(/,/g, ''), 10)
const convertMs = parseInt(statsLine[2], 10)
ok('#1 heavy grid in play', beads > 12000, `${beads.toLocaleString()} beads`)
ok('#2 convert under budget at 6× throttle', convertMs < 250, `${convertMs} ms (stats line)`)

// work the colours slider hard: End → Home → End with real keys
await page.evaluate(() => { window.__lt = [] })
const slider = page.locator('.piScrim input[aria-label="Colours"]')
await slider.focus()
for (const k of ['Home', 'End', 'Home', 'End']) {
  await page.keyboard.press(k)
  await page.waitForTimeout(900)
}
const lt = await page.evaluate(() => window.__lt || [])
const worst = lt.length ? Math.max(...lt) : 0
ok('#3 no long-task > 250ms while working the slider', worst <= 250, `worst ${worst} ms of [${lt.join(', ')}]`)
ok('#4 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
