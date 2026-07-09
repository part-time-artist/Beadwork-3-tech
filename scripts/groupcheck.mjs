// Verify layer groups (Procreate folders): group/ungroup, drag-into-group,
// group hide/lock gate rendering + drawing, collapse, flatten (one undo step),
// and v4 save persistence. Run against a live dev server: node scripts/groupcheck.mjs
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

const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const colouredPx = () => page.evaluate(() => {
  const cv = document.querySelector('canvas.board')
  const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data
  let n = 0
  for (let i = 0; i < d.length; i += 4) {
    if (Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) > 45) n++
  }
  return n
})

// paint a few beads on Layer 1 (fresh artwork's active layer)
for (let i = -2; i <= 2; i++) { await page.mouse.click(cx + i * 40, cy + (i % 2) * 22, { delay: 30 }); await page.waitForTimeout(80) }
const painted = await colouredPx()
ok('#1 painted beads on Layer 1', painted > 200, `${painted}px`)

// open layers panel; add two more layers (stack: BG, L1, L2, L3)
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(300)
await page.locator('button[title="New layer"]').click()
await page.waitForTimeout(200)
await page.locator('button[title="New layer"]').click()
await page.waitForTimeout(200)
const rowNames = () => page.locator('.lpList .lpRow .lpName').allInnerTexts()
ok('#2 three bead layers', (await rowNames()).join('|') === 'Layer 3|Layer 2|Layer 1|Background', (await rowNames()).join('|'))

// make Layer 2 active, group it with Layer 1 below
await page.locator('.lpRow', { hasText: 'Layer 2' }).click()
await page.waitForTimeout(200)
await page.getByRole('button', { name: 'Group', exact: true }).click()
await page.waitForTimeout(300)
let names = await rowNames()
ok('#3 group header appears above members', /^Layer 3\|Group 1 \(2\)/.test(names.join('|')), names.join('|'))
ok('#4 members indent', (await page.locator('.lpRow.inGroup').count()) === 2)

// drag Layer 3 INTO the group (down 2 display rows → between Layer 2 and Layer 1)
const l3 = await page.locator('.lpRow', { hasText: 'Layer 3' }).boundingBox()
await page.mouse.move(l3.x + 150, l3.y + l3.height / 2)
await page.mouse.down()
for (let i = 1; i <= 8; i++) await page.mouse.move(l3.x + 150, l3.y + l3.height / 2 + (i * 2 * 72) / 8)
await page.mouse.up()
await page.waitForTimeout(300)
names = await rowNames()
ok('#5 dragging into the group joins it', /Group 1 \(3\)/.test(names.join('|')) && (await page.locator('.lpRow.inGroup').count()) === 3, names.join('|'))

// hide the whole group → the painted beads vanish from the canvas
await page.locator('.lpGroupRow button[title="Hide group"]').click()
await page.waitForTimeout(400)
const hidden = await colouredPx()
ok('#6 hiding the group hides its layers', hidden < painted * 0.05, `${painted}→${hidden}px`)
await page.locator('.lpGroupRow button[title="Show group"]').click()
await page.waitForTimeout(400)

// lock the group → drawing on a member layer is blocked with a toast
await page.locator('.lpGroupRow button[title="Lock group"]').click()
await page.waitForTimeout(200)
await page.locator('.lpRow', { hasText: 'Layer 1' }).click() // member active
await page.waitForTimeout(200)
await page.mouse.click(cx - 200, cy - 150) // first canvas tap only closes the panel
await page.waitForTimeout(150)
await page.mouse.click(cx - 200, cy - 150) // second tap = a real draw attempt
await page.waitForTimeout(250)
const toast = (await page.locator('.toast').innerText().catch(() => '')).trim()
ok('#7 locked group blocks drawing', /Group is locked/i.test(toast), `toast="${toast}"`)
await page.locator('button[title="Layers"]').click() // reopen the panel
await page.waitForTimeout(300)
await page.locator('.lpGroupRow button[title="Unlock group"]').click()
await page.waitForTimeout(200)

// tap the header → collapse (members hidden); tap again → expand
await page.locator('.lpGroupRow').click()
await page.waitForTimeout(250)
ok('#8 collapse hides member rows', (await page.locator('.lpRow.inGroup').count()) === 0, (await rowNames()).join('|'))
await page.locator('.lpGroupRow').click()
await page.waitForTimeout(250)
ok('#9 expand shows them again', (await page.locator('.lpRow.inGroup').count()) === 3)

// flatten → one layer named after the group, same pixels; one undo restores
const beforeFlat = await colouredPx()
await page.locator('.lpGroupRow button[title="Flatten the group into one layer"]').click()
await page.waitForTimeout(400)
names = await rowNames()
ok('#10 flatten → one layer, same beads', names.join('|') === 'Group 1|Background' && Math.abs((await colouredPx()) - beforeFlat) < beforeFlat * 0.02, names.join('|'))
await page.locator('.undoRedo button').first().click()
await page.waitForTimeout(400)
names = await rowNames()
ok('#11 one undo restores the group', /Group 1 \(3\)/.test(names.join('|')), names.join('|'))

// ungroup from the bottom bar (active layer is inside the group)
await page.locator('.lpRow', { hasText: 'Layer 2' }).click()
await page.waitForTimeout(200)
await page.getByRole('button', { name: 'Ungroup' }).click()
await page.waitForTimeout(300)
names = await rowNames()
// Layer 3 was dragged into the group's middle in #5, so the member order is
// L2|L3|L1 — ungroup keeps that order, only the wrapper goes
ok('#12 ungroup dissolves the wrapper, layers stay',
  names.join('|') === 'Layer 2|Layer 3|Layer 1|Background' &&
  (await page.locator('.lpGroupRow').count()) === 0 &&
  (await page.locator('.lpRow.inGroup').count()) === 0,
  names.join('|'))

// regroup + reload → the group survives (save format v4)
await page.getByRole('button', { name: 'Group', exact: true }).click()
await page.waitForTimeout(1800) // autosave debounce
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)
// boot may land on the gallery — reopen the artwork first
if (await page.locator('.galleryScrim .artOpen').first().isVisible().catch(() => false)) {
  await page.locator('.galleryScrim .artOpen').first().click()
  await page.waitForTimeout(800)
}
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(400)
names = await rowNames()
ok('#13 group persists across reload (v4)', /Group \d+ \(2\)/.test(names.join('|')), names.join('|'))

ok('#14 no page errors', errors.length === 0, errors.join(' | '))
console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
