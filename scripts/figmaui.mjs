// Verify the Figma "Beads-UI" Procreate reskin: layout, controls, no errors.
import { chromium } from 'playwright-core'

const BASE = process.env.BASE || 'http://localhost:3002/'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1366, height: 1024 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
const results = []
const ok = (name, cond, extra = '') => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`); if (!cond) process.exitCode = 1 }

await page.goto(BASE, { waitUntil: 'domcontentloaded' })
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
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(500) }

// editor chrome present
ok('top toolbar present', (await page.locator('.topbar').count()) === 1)
ok('brush rail present', (await page.locator('.brushRail').count()) === 1)
ok('palette rail present', (await page.locator('.paletteRail').count()) === 1)
ok('palette rail has 8 swatches', (await page.locator('.paletteRail .railSw').count()) === 8, String(await page.locator('.paletteRail .railSw').count()))
ok('undo/redo present', (await page.locator('.undoRedo button').count()) === 2)
await page.screenshot({ path: 'scripts/fui-editor.png' })

// draw a stroke
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2
const cy = board.y + board.height / 2
const drag = async (pts) => {
  await page.mouse.move(pts[0][0], pts[0][1]); await page.mouse.down()
  for (const [x, y] of pts.slice(1)) await page.mouse.move(x, y, { steps: 8 })
  await page.mouse.up(); await page.waitForTimeout(600)
}
await page.getByTitle('Draw').click()
// pick the parrot-green swatch (3rd) from the rail
await page.locator('.paletteRail .railSw').nth(2).click()
await drag([[cx - 140, cy - 20], [cx - 20, cy + 20], [cx + 120, cy - 10]])
const placed = await page.evaluate(() => new Promise((resolve) => {
  const r = indexedDB.open('beadwork3', 1)
  r.onsuccess = () => {
    const t = r.result.transaction('artworks', 'readonly').objectStore('artworks').getAll()
    t.onsuccess = () => {
      const rec = (t.result || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0]
      resolve((rec?.layers || []).reduce((s, l) => s + (l.beads ? l.beads.length : 0), 0))
    }
  }
}))
ok('drawing places beads', placed > 0, String(placed))
await page.screenshot({ path: 'scripts/fui-drawn.png' })

// undo / redo
await page.locator('.undoRedo button').first().click()
await page.waitForTimeout(500)
await page.locator('.undoRedo button').nth(1).click()
await page.waitForTimeout(500)

// open ☰ drawer, change bead size, confirm drawer opens
await page.getByTitle(/Menu/i).click()
await page.waitForTimeout(300)
ok('drawer opens', (await page.locator('.menuDrawer').count()) === 1)
ok('drawer has canvas-size card', (await page.locator('.menuDrawer .card', { hasText: 'Canvas size' }).count()) === 1)
await page.screenshot({ path: 'scripts/fui-drawer.png' })
await page.locator('.menuDrawer .seg', { hasText: '3 mm' }).click()
await page.waitForTimeout(400)
// close drawer via scrim
await page.locator('.drawerScrim').click({ position: { x: 700, y: 400 } })
await page.waitForTimeout(200)
ok('drawer closes', (await page.locator('.menuDrawer').count()) === 0)

// layers panel
await page.getByTitle('Layers').click()
await page.waitForTimeout(200)
ok('layers panel opens', (await page.locator('.layersPanel').count()) === 1)
await page.screenshot({ path: 'scripts/fui-layers.png' })
await page.getByTitle('Layers').click()

// select tool → popover
await page.getByTitle('Select').click()
await page.waitForTimeout(200)
ok('selection popover shows for select tool', (await page.locator('.selPop').count()) === 1)
ok('brush rail hidden for select', (await page.locator('.brushRail').count()) === 0)

ok('no page errors', errors.length === 0, errors.slice(0, 4).join(' | '))
console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
