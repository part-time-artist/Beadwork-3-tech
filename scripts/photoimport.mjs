// Full-flow test of "Import photo as beads" in the MAIN app: new 3-bead
// artwork → ☰ → Import photo as beads → synthetic photo → Add to artwork →
// the artwork gains a "From photo" group (one bead layer per colour) + a
// hidden reference image layer, in ONE undo step, persisted by autosave.
// Run against the main dev server: node scripts/photoimport.mjs
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

// paint one bead so the undo step below is meaningful
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
await page.mouse.click(cx, cy)
await page.waitForTimeout(300)

// ---- open the modal from the ☰ menu ----------------------------------------
await page.locator('button[title="Menu"]').click()
await page.waitForTimeout(250)
await page.getByRole('button', { name: 'Import photo as beads' }).click()
await page.waitForTimeout(300)
ok('#1 modal opens from the menu', (await page.locator('.piScrim').count()) === 1)

// synthetic test photo (gradient + flat blocks, same as the prototype suite)
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
  name: 'test.png', mimeType: 'image/png',
  buffer: Buffer.from(dataUrl.split(',')[1], 'base64'),
})
// preview appears + layer rows populate
await page.waitForFunction(() => document.querySelectorAll('.piScrim [data-layer-row]').length >= 4, { timeout: 8000 })
await page.waitForTimeout(500)
const nRows = await page.locator('.piScrim [data-layer-row]').count()
ok('#2 photo converts with extracted colour layers', nRows >= 4 && nRows <= 8, `${nRows} layers`)
await page.screenshot({ path: 'scripts/photoimport-modal.png' })

// hide one colour before committing — hidden layers must stay OUT of the artwork
await page.locator('.piScrim [data-layer-row]').nth(0).locator('[data-layer-eye]').click()
await page.waitForTimeout(400)
const expectedLayers = nRows - 1

// ---- commit -----------------------------------------------------------------
await page.getByRole('button', { name: 'Add to artwork' }).click()
await page.waitForTimeout(600)
ok('#3 modal closes and toast confirms', (await page.locator('.piScrim').count()) === 0 &&
  /Photo imported/.test(await page.locator('.toast').innerText().catch(() => '')),
  await page.locator('.toast').innerText().catch(() => 'no toast'))

// layers panel: "From photo" group with the expected member count + hidden reference photo
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(400)
const groupText = await page.locator('.lpGroupRow').innerText().catch(() => '')
ok('#4 "From photo" group with per-colour layers', new RegExp(`From photo\\s*\\(${expectedLayers}\\)`).test(groupText), groupText)
const inGroup = await page.locator('.lpRow.inGroup').count()
ok('#5 group holds one layer per visible colour', inGroup === expectedLayers, `${inGroup} rows`)
const refRow = page.locator('.lpRow', { hasText: 'Photo (reference)' })
ok('#6 hidden reference photo layer present', (await refRow.count()) === 1 &&
  (await refRow.locator('button[title="Show"]').count()) === 1)
await page.screenshot({ path: 'scripts/photoimport-layers.png' })

// canvas actually shows the conversion (many distinct colours)
const painted = await page.evaluate(() => {
  const cv = document.querySelector('canvas.board')
  const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data
  const colours = new Set()
  let saturated = 0
  for (let i = 0; i < d.length; i += 16) {
    if (d[i + 3] < 10) continue
    if (Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) > 45) saturated++
    colours.add(`${d[i] >> 4},${d[i + 1] >> 4},${d[i + 2] >> 4}`)
  }
  return { saturated, colours: colours.size }
})
ok('#7 canvas painted with the conversion', painted.saturated > 5000, JSON.stringify(painted))

// ---- one undo removes the whole import --------------------------------------
await page.mouse.click(cx - 200, cy - 200) // close layers panel (first canvas tap only closes it)
await page.waitForTimeout(200)
await page.locator('.undoRedo button').first().click()
await page.waitForTimeout(500)
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(300)
ok('#8 one undo removes group + layers + photo', (await page.locator('.lpGroupRow').count()) === 0 &&
  (await page.locator('.lpRow', { hasText: 'Photo (reference)' }).count()) === 0)
// redo brings it all back
await page.mouse.click(cx - 200, cy - 200)
await page.waitForTimeout(200)
await page.locator('.undoRedo button').nth(1).click()
await page.waitForTimeout(500)
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(300)
ok('#9 redo restores the import', (await page.locator('.lpGroupRow').count()) === 1)

// ---- persistence: autosave + reload -----------------------------------------
await page.waitForTimeout(2200) // autosave debounce
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)
if ((await page.locator('.galleryScrim .artOpen').count()) > 0) {
  await page.locator('.galleryScrim .artOpen').first().click()
  await page.waitForTimeout(900)
}
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(400)
ok('#10 import persists across reload', (await page.locator('.lpGroupRow').count()) === 1 &&
  (await page.locator('.lpRow', { hasText: 'Photo (reference)' }).count()) === 1)

ok('#11 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
