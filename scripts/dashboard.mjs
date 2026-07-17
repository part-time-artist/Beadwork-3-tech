// Dashboard (My artworks) redesign checks: card GRID with real bead
// thumbnails (saved on autosave), name-only cards, tap = open, long-press
// (and desktop right-click) = Rename/Duplicate/Delete menu.
// Run against the dev server: node scripts/dashboard.mjs
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
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

// first visit lands on the gallery → create a 3-bead artwork
for (const [name, wait] of [[/New artwork/i, 300], [/3.?bead/i, 300], [/Create artwork/i, 700]]) {
  const b = page.getByRole('button', { name })
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(wait) }
}

// paint a few strokes so the thumbnail has content
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
for (const [dx, dy] of [[0, 0], [30, 0], [60, 0], [0, 30], [30, 30], [90, 60], [120, 60]]) {
  await page.mouse.click(cx + dx - 60, cy + dy - 30)
  await page.waitForTimeout(80)
}
await page.waitForTimeout(1600) // autosave debounce → record gains a thumb

// back to the gallery
await page.locator('button[title="My artworks"]').click()
await page.waitForTimeout(600)

// ---- card grid ----------------------------------------------------------
ok('#1 gallery shows a card grid', (await page.locator('.galleryGrid .artCard').count()) === 1)
const thumbSrc = await page.locator('.artCard .artThumb img').getAttribute('src').catch(() => null)
ok('#2 card carries a real bead thumbnail (data URL)', !!thumbSrc && thumbSrc.startsWith('data:image/'),
  thumbSrc ? thumbSrc.slice(0, 30) : 'no img')
const cardText = await page.locator('.artCard').innerText()
ok('#3 card shows the NAME only (no beads/date meta)', !/beads|ago|·/.test(cardText), cardText.trim())

// thumbnail actually contains the painted colour (not blank paper)
const thumbInk = await page.evaluate(async (src) => {
  const img = new Image()
  await new Promise((res) => { img.onload = res; img.src = src })
  const cv = document.createElement('canvas')
  cv.width = img.width; cv.height = img.height
  const ctx = cv.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const d = ctx.getImageData(0, 0, cv.width, cv.height).data
  let dark = 0
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 200 && d[i] + d[i + 1] + d[i + 2] < 600) dark++
  }
  return dark
}, thumbSrc)
ok('#4 thumbnail shows the painted beads', thumbInk > 10, `${thumbInk} non-paper px`)

// ---- tap opens ----------------------------------------------------------
await page.locator('.artCard').click()
await page.waitForTimeout(700)
ok('#5 tapping a card opens the artwork', (await page.locator('.galleryScrim').count()) === 0)
await page.locator('button[title="My artworks"]').click()
await page.waitForTimeout(500)

// ---- long-press opens the actions menu ----------------------------------
const cardBox = await page.locator('.artCard').boundingBox()
await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
await page.mouse.down()
await page.waitForTimeout(650)
await page.mouse.up()
await page.waitForTimeout(250)
ok('#6 long-press opens the card menu', (await page.locator('.artMenu').count()) === 1)
ok('#7 menu has Rename / Duplicate / Delete', await page.locator('.artMenu').innerText().then((t) =>
  /Rename/.test(t) && /Duplicate/.test(t) && /Delete/.test(t)))
ok('#8 the release click did NOT open the artwork', (await page.locator('.galleryScrim').count()) === 1)
await page.screenshot({ path: 'scripts/dashboard-menu.png' })

// duplicate from the menu → second card, thumbnail carried over
await page.locator('.artMenu button', { hasText: 'Duplicate' }).click()
await page.waitForTimeout(600)
ok('#9 Duplicate adds a second card', (await page.locator('.artCard').count()) === 2)
ok('#10 the copy keeps the thumbnail', (await page.locator('.artCard .artThumb img').count()) === 2)

// rename via right-click menu (window.prompt)
page.once('dialog', (d) => d.accept('Renamed Tree'))
await page.locator('.artCard').nth(1).click({ button: 'right' })
await page.waitForTimeout(250)
ok('#11 right-click opens the same menu', (await page.locator('.artMenu').count()) === 1)
await page.locator('.artMenu button', { hasText: 'Rename' }).click()
await page.waitForTimeout(400)
ok('#12 rename works from the menu', (await page.locator('.artName').allTextContents()).includes('Renamed Tree'))

// delete via menu (confirm accepted)
await page.locator('.artCard', { hasText: 'Renamed Tree' }).click({ button: 'right' })
await page.waitForTimeout(250)
page.once('dialog', (d) => d.accept())
await page.locator('.artMenu button', { hasText: 'Delete' }).click()
await page.waitForTimeout(500)
ok('#13 delete removes the card', (await page.locator('.artCard').count()) === 1)

// menu closes on outside tap without opening anything
await page.locator('.artCard').click({ button: 'right' })
await page.waitForTimeout(250)
await page.mouse.click(30, 500)
await page.waitForTimeout(250)
ok('#14 outside tap closes the menu, gallery stays', (await page.locator('.artMenu').count()) === 0 &&
  (await page.locator('.galleryScrim').count()) === 1)

// gallery persists thumbs across reload (they live in the record)
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)
if ((await page.locator('.galleryScrim .artCard').count()) === 0) {
  // boot reopened the artwork — go back to the gallery
  await page.locator('button[title="My artworks"]').click()
  await page.waitForTimeout(600)
}
ok('#15 thumbnail survives reload (stored in IndexedDB)',
  (await page.locator('.artCard .artThumb img').count()) >= 1)
await page.screenshot({ path: 'scripts/dashboard-gallery.png' })

// iPad-portrait sanity shot of the same grid
await page.setViewportSize({ width: 834, height: 1112 })
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/dashboard-ipad.png' })

ok('#16 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
