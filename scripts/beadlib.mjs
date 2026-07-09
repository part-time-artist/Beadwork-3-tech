// Verify the universal bead library: seeded from defaults, curated in the
// gallery modal (add/rename/remove), pickable in the editor colour panel,
// "+ Add current" for custom colours, persists across reload (IndexedDB).
// Run against a live dev server: node scripts/beadlib.mjs
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

// ---- 1. gallery: open the library, seeded with the 8 defaults --------------
await page.getByRole('button', { name: /Bead library/i }).click()
await page.waitForTimeout(300)
const rows = () => page.locator('.libRow:not(.libAddRow)')
const seeded = await rows().count()
ok('#1 library seeded from defaults', seeded === 8, `${seeded} rows`)

// add a named colour via the draft row
await page.locator('.libAddRow .libSw').fill('#aa3355')
await page.locator('.libAddRow .libName').fill('Rose 2mm')
await page.getByRole('button', { name: /\+ Add/ }).click()
await page.waitForTimeout(200)
ok('#2 added a colour', (await rows().count()) === 9)

// rename the first, then remove the second
await rows().first().locator('.libName').fill('Sage')
await rows().nth(1).locator('.libDel').click()
await page.waitForTimeout(200)
ok('#3 removed a colour', (await rows().count()) === 8)
await page.getByRole('button', { name: 'Done' }).click()
await page.waitForTimeout(200)

// ---- 2. editor: library strip in the colour panel --------------------------
for (const [name, wait] of [[/New artwork/i, 300], [/3.?bead/i, 300], [/Create artwork/i, 700]]) {
  const b = page.getByRole('button', { name })
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(wait) }
}
await page.locator('button[title="Colour"]').click()
await page.waitForTimeout(300)
const libHead = page.locator('.cpPalHead', { hasText: 'Bead library' })
ok('#4 editor shows the library strip', (await libHead.count()) === 1)
const strip = page.locator('.cpPalHead:has-text("Bead library") + .cpBox .cpSw')
ok('#5 strip has the curated colours', (await strip.count()) === 8, `${await strip.count()} swatches`)
// tapping a library swatch picks that colour (rose was added last)
const rose = page.locator('.cpBox .cpSw[title="Rose 2mm"]')
ok('#6 named swatch present (Rose 2mm)', (await rose.count()) === 1)
await rose.click()
await page.waitForTimeout(200)
const picked = await page.locator('button[title="Colour"]').evaluate((el) => getComputedStyle(el).backgroundColor)
ok('#7 tapping picks the colour', picked === 'rgb(170, 51, 85)', picked)
// a colour already in the library shows NO "+ Add current"
const addBtnWhileLib = await page.locator('.cpPalHead:has-text("Bead library") button').count()
ok('#8 no add button for a library colour', addBtnWhileLib === 0)
// pick a CUSTOM colour by tapping the picker's SV square — almost surely a
// colour that's not in the library, so "+ Add current" must appear
const sv = await page.locator('.cpSV').boundingBox()
await page.mouse.click(sv.x + sv.width * 0.32, sv.y + sv.height * 0.55)
await page.waitForTimeout(250)
const addBtn = page.locator('.cpPalHead:has-text("Bead library") button')
ok('#9 custom colour shows “+ Add current”', (await addBtn.count()) === 1)
await addBtn.click()
await page.waitForTimeout(250)
ok('#10 add current grows the strip', (await strip.count()) === 9, `${await strip.count()}`)

// ---- 3. persistence across reload ------------------------------------------
// paint a few beads first so the artwork autosaves (a zero-edit artwork never
// persists, and boot would land on the gallery instead of the editor)
await page.mouse.click(720, 450)
const b2 = await page.locator('canvas.board').boundingBox()
for (let i = 0; i < 6; i++) await page.mouse.click(b2.x + b2.width / 2 + i * 17, b2.y + b2.height / 2, { delay: 40 })
await page.waitForTimeout(1500)
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForFunction(() => {
  const scrim = document.querySelector('.galleryScrim')
  return !scrim || !/Loading/.test(scrim.textContent)
}, { timeout: 15000 })
await page.waitForTimeout(600)
let stripAfter = 0
// the gallery overlay COVERS the editor DOM, so test for the scrim, not visibility
const onGallery = (await page.locator('.galleryScrim').count()) > 0
if (onGallery) {
  await page.getByRole('button', { name: /Bead library/i }).click()
  await page.waitForTimeout(300)
  stripAfter = await page.locator('.libRow:not(.libAddRow)').count()
} else {
  await page.locator('button[title="Colour"]').click()
  await page.waitForTimeout(300)
  stripAfter = await page.locator('.cpPalHead:has-text("Bead library") + .cpBox .cpSw').count()
}
ok('#11 library persists across reload', stripAfter >= 8, `${stripAfter} entries (${onGallery ? 'gallery' : 'editor'})`)

ok('#12 no page errors', errors.length === 0, errors.join(' | '))
console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
