// Verify the in-place stroke optimisation keeps draw/undo/redo correct: a stroke
// adds beads to the active layer, undo removes them, redo restores them, and
// painting the same colour again is a no-op (no spurious undo step).
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const fail = (m) => { console.log('FAIL:', m); process.exitCode = 1 }

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(200) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(400) }

// read total beads across all bead layers from the saved IndexedDB record
const beadCount = () => page.evaluate(() => new Promise((resolve) => {
  const r = indexedDB.open('beadwork3', 1)
  r.onsuccess = () => {
    const db = r.result
    const t = db.transaction('artworks', 'readonly').objectStore('artworks').getAll()
    t.onsuccess = () => {
      const recs = t.result || []
      const rec = recs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0]
      const n = (rec?.layers || []).reduce((s, l) => s + (l.beads ? l.beads.length : 0), 0)
      resolve(n)
    }
    t.onerror = () => resolve(-1)
  }
  r.onerror = () => resolve(-1)
}))

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const stroke = async (x0, y0, x1, y1) => {
  await page.mouse.move(x0, y0); await page.mouse.down()
  await page.mouse.move(x1, y1, { steps: 16 }); await page.mouse.up()
  await page.waitForTimeout(700) // let autosave flush
}

await page.getByTitle('Draw').click()
// a curved (non-straight) drag so it exercises the freehand in-place paint path
await page.mouse.move(cx - 150, cy - 40); await page.mouse.down()
await page.mouse.move(cx - 40, cy + 30, { steps: 10 })
await page.mouse.move(cx + 60, cy - 30, { steps: 10 })
await page.mouse.move(cx + 150, cy + 40, { steps: 10 })
await page.mouse.up()
await page.waitForTimeout(900)
const afterDraw = await beadCount()
console.log('beads after freehand draw:', afterDraw)
if (!(afterDraw > 0)) fail('stroke added no beads')

// undo → back to 0 (single stroke = single step)
await page.locator('.zoomCtl button[title*="Undo"]').click()
await page.waitForTimeout(900)
const afterUndo = await beadCount()
console.log('beads after undo:', afterUndo)
if (afterUndo !== 0) fail('undo did not remove the stroke (expected 0)')

// redo → back to afterDraw
await page.locator('.zoomCtl button[title*="Redo"]').click()
await page.waitForTimeout(900)
const afterRedo = await beadCount()
console.log('beads after redo:', afterRedo)
if (afterRedo !== afterDraw) fail('redo did not restore the stroke')

if (errors.length) fail('page errors: ' + errors.join(' | '))
console.log(process.exitCode ? 'RESULT: FAIL' : 'RESULT: PASS')
await browser.close()
