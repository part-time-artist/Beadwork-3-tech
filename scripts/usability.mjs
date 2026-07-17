// Usability pass checks (2026-07-17):
//  · photo modal — drag a universal swatch ONTO a chip swaps that colour;
//    touch targets grew (36px swatches) with the modal box still fixed
//  · layers panel — a plain swipe does NOT reorder; hold ~400ms then drag
//    DOES reorder; double-tap renames inline; bead layers get mini thumbs
// Run against the dev server: node scripts/usability.mjs
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

// ================= layers panel ==========================================
// paint one bead so Layer 1 gets a thumbnail
const board = await page.locator('canvas.board').boundingBox()
await page.mouse.click(board.x + board.width / 2, board.y + board.height / 2)
await page.waitForTimeout(300)

await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(600)
const names = () => page.locator('.lpRow .lpName').allTextContents()

// add a second layer above
await page.locator('button[title="New layer"]').click()
await page.waitForTimeout(300)
ok('#1 two bead layers + background', (await names()).length === 3, (await names()).join(' | '))
const before = await names()

// a QUICK swipe on a row must NOT reorder (it used to)
const row0 = await page.locator('.lpRow').first().boundingBox()
await page.mouse.move(row0.x + row0.width / 2, row0.y + row0.height / 2)
await page.mouse.down()
for (let i = 1; i <= 8; i++) await page.mouse.move(row0.x + row0.width / 2, row0.y + row0.height / 2 + i * 12)
await page.mouse.up()
await page.waitForTimeout(300)
ok('#2 quick swipe does NOT reorder', (await names()).join() === before.join(), (await names()).join(' | '))

// HOLD ~500ms then drag one row down → reorder happens
await page.mouse.move(row0.x + row0.width / 2, row0.y + row0.height / 2)
await page.mouse.down()
await page.waitForTimeout(550) // > 400ms hold lifts the row
for (let i = 1; i <= 8; i++) { await page.mouse.move(row0.x + row0.width / 2, row0.y + row0.height / 2 + i * 9); await page.waitForTimeout(16) }
await page.mouse.up()
await page.waitForTimeout(300)
ok('#3 hold-then-drag reorders', (await names()).join() !== before.join(), (await names()).join(' | '))

// double-tap a layer name → inline input; type a name; Enter commits
await page.locator('.lpRow .lpName').first().dblclick()
await page.waitForTimeout(250)
ok('#4 double-tap opens the inline rename field', (await page.locator('.lpNameEdit').count()) === 1)
await page.locator('.lpNameEdit').fill('Petals')
await page.keyboard.press('Enter')
await page.waitForTimeout(300)
ok('#5 rename commits on Enter', (await names()).includes('Petals'), (await names()).join(' | '))

// the painted layer shows a mini thumbnail with the bead colour
await page.waitForTimeout(600) // thumb refresh debounce
const thumbCount = await page.locator('.lpRow .lpThumbArt img').count()
ok('#6 painted bead layer has a mini thumbnail', thumbCount >= 1, `${thumbCount} thumbs`)
await page.screenshot({ path: 'scripts/usability-layers.png' })

// close the panel (tap the canvas)
await page.mouse.click(board.x + 60, board.y + 60)
await page.waitForTimeout(300)

// ================= photo modal: drag-swap + touch sizes ===================
await page.locator('button[title="Menu"]').click()
await page.waitForTimeout(250)
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
  name: 'test.png', mimeType: 'image/png',
  buffer: Buffer.from(dataUrl.split(',')[1], 'base64'),
})
await page.waitForFunction(() => document.querySelectorAll('.piScrim [data-layer-row]').length >= 3, { timeout: 8000 })
await page.waitForTimeout(500)

// touch sizes: chips + universal swatches ≥ 36px, modal box still 940×680
const swBox = await page.locator('[data-universal-swatch]').first().boundingBox()
ok('#7 universal swatches are finger-sized (≥34px)', swBox.width >= 34 && swBox.height >= 34,
  `${Math.round(swBox.width)}x${Math.round(swBox.height)}`)
const chipSw = await page.locator('.piChipSwatch').first().boundingBox()
ok('#8 chip swatches are finger-sized (≥34px)', chipSw.width >= 34 && chipSw.height >= 34,
  `${Math.round(chipSw.width)}x${Math.round(chipSw.height)}`)
const mBox = await page.locator('.piModal').boundingBox()
ok('#9 modal box still fixed 940×680', Math.round(mBox.width) === 940 && Math.round(mBox.height) === 680,
  `${Math.round(mBox.width)}x${Math.round(mBox.height)}`)

// all chips + both action buttons still fully inside the modal (no clipping)
const inModal = async (sel) => {
  const b = await page.locator(sel).last().boundingBox()
  return b && b.y + b.height <= mBox.y + mBox.height + 1 && b.x + b.width <= mBox.x + mBox.width + 1
}
ok('#10 chips and swatches fit inside the fixed box',
  (await inModal('[data-layer-row]')) && (await inModal('[data-universal-swatch]')))

// worst case: slider at MAX (16 colours) — the 16th chip must still be visible
const colSlider = page.locator('.piScrim input[aria-label="Colours"]')
await colSlider.focus()
await page.keyboard.press('End')
await page.waitForTimeout(900)
const chipCountMax = await page.locator('[data-layer-row]').count()
ok('#10b chips at max colours all fully inside the box',
  chipCountMax >= 10 && (await inModal('[data-layer-row]')), `${chipCountMax} chips`)
await page.keyboard.press('Home')
await page.waitForTimeout(900)

// DRAG a universal swatch onto chip 0 → chip 0 takes that colour
const chip0Color = () => page.locator('.piChipSwatch').first().inputValue()
const beforeColor = await chip0Color()
// find a universal swatch whose colour differs from chip 0
const swatches = page.locator('[data-universal-swatch]')
const n = await swatches.count()
let dragIdx = -1, dragColor = null
for (let i = 0; i < n; i++) {
  const c = (await swatches.nth(i).getAttribute('title')).toLowerCase()
  if (c !== beforeColor.toLowerCase()) { dragIdx = i; dragColor = c; break }
}
const from = await swatches.nth(dragIdx).boundingBox()
const to = await page.locator('[data-layer-row]').first().boundingBox()
await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2)
await page.mouse.down()
for (let i = 1; i <= 10; i++) {
  await page.mouse.move(
    from.x + from.width / 2 + ((to.x + to.width / 2) - (from.x + from.width / 2)) * (i / 10),
    from.y + from.height / 2 + ((to.y + to.height / 2) - (from.y + from.height / 2)) * (i / 10))
  await page.waitForTimeout(16)
}
const ghostVisible = (await page.locator('.piDragGhost').count()) === 1
await page.mouse.up()
await page.waitForTimeout(400)
ok('#11 drag ghost follows the pointer', ghostVisible)
ok('#12 dropping a swatch on a chip swaps its colour', (await chip0Color()).toLowerCase() === dragColor,
  `${beforeColor} → ${await chip0Color()} (wanted ${dragColor})`)
await page.screenshot({ path: 'scripts/usability-modal.png' })

// plain TAP flow still works: select chip 1, tap a differing swatch
await page.locator('[data-layer-row]').nth(1).click()
await page.waitForTimeout(150)
const chip1 = () => page.locator('.piChipSwatch').nth(1).inputValue()
const c1Before = await chip1()
let tapIdx = -1, tapColor = null
for (let i = 0; i < n; i++) {
  const c = (await swatches.nth(i).getAttribute('title')).toLowerCase()
  if (c !== c1Before.toLowerCase() && c !== dragColor) { tapIdx = i; tapColor = c; break }
}
await swatches.nth(tapIdx).click()
await page.waitForTimeout(400)
ok('#13 tap-to-swap still works on the selected chip', (await chip1()).toLowerCase() === tapColor,
  `${c1Before} → ${await chip1()} (wanted ${tapColor})`)

ok('#14 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
