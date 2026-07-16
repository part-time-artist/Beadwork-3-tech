// Full verification of the 2026-06-30 fixes pass, with screenshots + assertions.
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
await page.waitForTimeout(1000)

// new artwork → 3-bead
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(200) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(400) }

const beadCount = () => page.evaluate(() => new Promise((resolve) => {
  const r = indexedDB.open('beadwork3', 1)
  r.onsuccess = () => {
    const t = r.result.transaction('artworks', 'readonly').objectStore('artworks').getAll()
    t.onsuccess = () => {
      const rec = (t.result || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0]
      resolve((rec?.layers || []).reduce((s, l) => s + (l.beads ? l.beads.length : 0), 0))
    }
  }
}))
const cmText = async () => (await page.locator('.stageInfo').innerText()).match(/(\d+)×(\d+)\s*CM/i)?.slice(1, 3).join('×')

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const drag = async (pts) => {
  await page.mouse.move(pts[0][0], pts[0][1]); await page.mouse.down()
  for (const [x, y] of pts.slice(1)) await page.mouse.move(x, y, { steps: 8 })
  await page.mouse.up(); await page.waitForTimeout(800)
}

// ---- #1 UNDO: focus a cm field, draw, Ctrl+Z → canvas size unchanged, beads undone
await page.getByTitle('Draw').click()
await drag([[cx - 150, cy - 30], [cx - 40, cy + 20], [cx + 120, cy - 20]])
const beadsBefore = await beadCount()
const cmBefore = await cmText()
// focus a canvas-size input, then draw on the canvas (must blur it)
const cmInput = page.locator('.card', { hasText: 'Canvas size' }).locator('input').first()
await cmInput.click()
await page.waitForTimeout(150)
await drag([[cx - 150, cy + 60], [cx + 150, cy + 60]])
const beadsAfter2 = await beadCount()
await page.keyboard.press('Control+z')
await page.waitForTimeout(900)
const cmAfter = await cmText()
const beadsAfterUndo = await beadCount()
ok('#1 canvas size unchanged after Ctrl+Z', cmBefore === cmAfter, `${cmBefore} → ${cmAfter}`)
ok('#1 Ctrl+Z undid a stroke (not the canvas)', beadsAfterUndo < beadsAfter2 && beadsAfterUndo >= beadsBefore, `${beadsAfter2} → ${beadsAfterUndo}`)

// ---- #2/#3 LAYERS + IMAGE
await page.getByTitle('Layers').click()
await page.waitForTimeout(150)
const names = await page.locator('.lpName').allInnerTexts()
ok('#2 Background is a layer', names.some((n) => /background/i.test(n)), names.join(', '))
await page.screenshot({ path: 'scripts/v-layers.png' })

const pngB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGP8z8Dwn4EIwDiqEL8CAJxcA/0H6tF1AAAAAElFTkSuQmCC'
await page.locator('.lpImg input[type=file]').setInputFiles({ name: 'ref.png', mimeType: 'image/png', buffer: Buffer.from(pngB64, 'base64') })
await page.waitForTimeout(500)
ok('#3 image added as a layer', (await page.locator('.lpName').allInnerTexts()).some((n) => /image/i.test(n)))
ok('#3 entered Adjust mode', (await page.locator('.adjustBar').count()) > 0)
await page.screenshot({ path: 'scripts/v-image-adjust.png' })
// fix the canvas size and confirm the image stays put (no resize tie)
await page.locator('.adjustBar button').click()
await page.waitForTimeout(200)

// hide background → transparent
const rows = page.locator('.layerRow')
const n = await rows.count()
await rows.nth(n - 1).locator('.lpEye').click() // bottom row = Background
await page.waitForTimeout(200)
await page.screenshot({ path: 'scripts/v-transparent.png' })
await rows.nth(n - 1).locator('.lpEye').click() // show it again
await page.waitForTimeout(150)

// ---- #4 LOCKED FEEDBACK: select Background, try to draw → toast
await rows.nth(n - 1).click()
await page.waitForTimeout(150)
await page.mouse.move(cx, cy - 80); await page.mouse.down(); await page.mouse.up()
await page.waitForTimeout(150)
ok('#4 toast on drawing a non-bead layer', (await page.locator('.toast').count()) > 0, await page.locator('.toast').innerText().catch(() => ''))
await page.screenshot({ path: 'scripts/v-toast.png' })

// switch back to a bead layer
const beadRow = rows.filter({ hasText: 'Layer 1' }).first()
await beadRow.click()
await page.waitForTimeout(150)

// ---- #5 ALPHA LOCK: turn it on, paint empty area → no new beads
const beadsPreAlpha = await beadCount()
await page.locator('.layerActions button', { hasText: 'α' }).click()
await page.waitForTimeout(150)
await drag([[cx + 200, cy + 150], [cx + 260, cy + 150]]) // empty region
const beadsPostAlpha = await beadCount()
ok('#5 alpha lock blocks painting empty cells', beadsPostAlpha === beadsPreAlpha, `${beadsPreAlpha} → ${beadsPostAlpha}`)

// ---- #6 HOVER PREVIEW: bump brush, hover (no click) → ghost cells render
// (assert indirectly: no errors + screenshot; ghost is on the canvas bitmap)
await page.locator('.layerActions button', { hasText: 'α' }).click() // turn alpha off
await page.getByTitle('Layers').click() // close panel for a clean shot
await page.getByTitle('Draw').click()
await page.mouse.move(cx + 30, cy + 30)
await page.mouse.move(cx + 33, cy + 28) // a real move so hover fires
await page.waitForTimeout(200)
await page.screenshot({ path: 'scripts/v-hover.png' })

ok('no page errors', errors.length === 0, errors.join(' | '))
console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
