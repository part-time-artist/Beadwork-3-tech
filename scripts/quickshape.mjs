// Verify QuickShape hold-to-snap: draw a rough circle / line / square with the
// mouse, hold still ~0.8s → the stroke snaps to the ideal shape (toast names
// it), outline-only; keep dragging to adjust; lift commits; one undo removes it.
// Run against a live dev server: node scripts/quickshape.mjs
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
for (const [name, wait] of [[/New artwork/i, 300], [/3.?bead/i, 300], [/Create artwork/i, 700]]) {
  const b = page.getByRole('button', { name })
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(wait) }
}
await page.evaluate(() => {
  window.__longtasks = []
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__longtasks.push(Math.round(e.duration)) }).observe({ entryTypes: ['longtask'] }) } catch {}
})

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2

const countColoured = (x0, y0, w, h) => page.evaluate(([x0, y0, w, h]) => {
  const cv = document.querySelector('canvas.board')
  const rect = cv.getBoundingClientRect()
  const sx = cv.width / rect.width
  const d = cv.getContext('2d').getImageData(
    Math.round((x0 - rect.left) * sx), Math.round((y0 - rect.top) * sx),
    Math.round(w * sx), Math.round(h * sx)).data
  let n = 0
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2]
    if (Math.max(r, g, b) - Math.min(r, g, b) > 45) n++
  }
  return n
}, [x0, y0, w, h])
const toastText = async () => (await page.locator('.toast').innerText().catch(() => '')).trim()

// ---- 1. circle: wobbly ring → hold → Circle, outline only, adjust grows it --
const R = 130
await page.mouse.move(cx + R, cy)
await page.mouse.down()
for (let i = 1; i <= 30; i++) {
  const a = (2 * Math.PI * i) / 30
  const wob = 1 + 0.06 * Math.sin(i * 2.1) // hand wobble
  await page.mouse.move(cx + Math.cos(a) * R * wob, cy + Math.sin(a) * R * wob)
  await page.waitForTimeout(12)
}
await page.waitForTimeout(850) // hold still → snap
const t1 = await toastText()
ok('#1 circle snap toast', /Circle|Ellipse/i.test(t1), `toast="${t1}"`)
const innerBefore = await countColoured(cx - R * 0.4, cy - R * 0.4, R * 0.8, R * 0.8)
const ringBefore = await countColoured(cx - R * 1.3, cy - R * 1.3, R * 2.6, R * 2.6)
ok('#2 outline only (hollow centre)', ringBefore > 400 && innerBefore < ringBefore * 0.03, `ring=${ringBefore} inner=${innerBefore}`)
// keep dragging → circle follows the pointer (radius grows)
await page.mouse.move(cx + R + 70, cy, { steps: 5 })
await page.waitForTimeout(300)
const grown = await countColoured(cx + R + 25, cy - 40, 70, 80)
ok('#3 drag-to-adjust grows the circle', grown > 20, `px=${grown}`)
await page.mouse.up()
await page.waitForTimeout(500)
await page.screenshot({ path: 'scripts/quickshape-circle.png', clip: { x: cx - 260, y: cy - 260, width: 520, height: 520 } })

// undo removes the whole shape in one step
const before = await countColoured(cx - 300, cy - 300, 600, 600)
await page.locator('.undoRedo button').first().click()
await page.waitForTimeout(500)
const after = await countColoured(cx - 300, cy - 300, 600, 600)
ok('#4 one undo removes the placed shape', before > 400 && after < before * 0.02, `${before}→${after}`)

// ---- 2. open stroke → Line -------------------------------------------------
await page.mouse.move(cx - 200, cy + 160)
await page.mouse.down()
for (let i = 1; i <= 14; i++) {
  await page.mouse.move(cx - 200 + i * 26, cy + 160 - i * 9 + 8 * Math.sin(i)) // wavy-ish
  await page.waitForTimeout(12)
}
await page.waitForTimeout(850)
const t2 = await toastText()
ok('#5 line snap toast', /Line/i.test(t2), `toast="${t2}"`)
await page.mouse.up()
await page.waitForTimeout(300)
await page.locator('.undoRedo button').first().click()
await page.waitForTimeout(300)

// ---- 3. rough square → Rectangle/Square ------------------------------------
const S = 110
await page.mouse.move(cx - S, cy - S)
await page.mouse.down()
const cs = [[1, -1], [1, 1], [-1, 1], [-1, -1]]
let px = -S, py = -S
for (const [tx, ty] of cs) {
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(cx + px + ((tx * S - px) * i) / 8 + 3 * Math.sin(i), cy + py + ((ty * S - py) * i) / 8 + 3 * Math.cos(i))
    await page.waitForTimeout(10)
  }
  px = tx * S; py = ty * S
}
await page.waitForTimeout(850)
const t3 = await toastText()
ok('#6 square snap toast', /Square|Rectangle/i.test(t3), `toast="${t3}"`)
const sqInner = await countColoured(cx - S * 0.5, cy - S * 0.5, S, S)
ok('#7 square is outline only', sqInner < 200, `inner=${sqInner}`)
await page.mouse.up()
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/quickshape-square.png', clip: { x: cx - 200, y: cy - 200, width: 400, height: 400 } })

const lt = await page.evaluate(() => window.__longtasks || [])
const worst = lt.length ? Math.max(...lt) : 0
ok('#8 no multi-second freeze', worst < 1200, `worst ${worst}ms`)
ok('#9 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
