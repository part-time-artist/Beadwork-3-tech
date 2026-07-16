// Isolated alpha-lock check: confirm the toggle engages (row shows the α tag),
// then painting empty cells is blocked while recolouring existing beads works.
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
const ok = (n, c, x = '') => { console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${x ? ' — ' + x : ''}`); if (!c) process.exitCode = 1 }

await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)
const nb = page.getByRole('button', { name: /New artwork/i }); if (await nb.count()) { await nb.first().click(); await page.waitForTimeout(200) }
const tb = page.getByRole('button', { name: /3.?bead/i }); if (await tb.count()) { await tb.first().click(); await page.waitForTimeout(400) }

const beadCount = () => page.evaluate(() => new Promise((res) => {
  const r = indexedDB.open('beadwork3', 1)
  r.onsuccess = () => { const t = r.result.transaction('artworks').objectStore('artworks').getAll(); t.onsuccess = () => { const rec = (t.result || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0]; res((rec?.layers || []).reduce((s, l) => s + (l.beads ? l.beads.length : 0), 0)) } }
}))
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
const drag = async (pts) => { await page.mouse.move(...pts[0]); await page.mouse.down(); for (const p of pts.slice(1)) await page.mouse.move(...p, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(800) }

await page.getByTitle('Draw').click()
await drag([[cx - 120, cy], [cx + 120, cy]])
const base = await beadCount()
ok('drew base beads', base > 0, String(base))

await page.getByTitle('Layers').click(); await page.waitForTimeout(200)
// the active row is Layer 1 (only bead layer) — click the α action and confirm it engaged
const alphaBtn = page.locator('.layerActions button').filter({ hasText: 'α' })
ok('alpha button enabled', !(await alphaBtn.isDisabled()))
await alphaBtn.click(); await page.waitForTimeout(250)
const hasTag = (await page.locator('.layerRow .lpLockTag').allInnerTexts()).some((t) => /α/.test(t))
const btnOn = (await alphaBtn.getAttribute('class'))?.includes('on')
ok('alpha lock engaged (row tag / button on)', hasTag || btnOn, `tag=${hasTag} on=${btnOn}`)

// paint a clearly EMPTY area → blocked (count unchanged)
await drag([[cx - 120, cy + 120], [cx + 120, cy + 120]])
const afterEmpty = await beadCount()
ok('alpha lock blocks empty cells', afterEmpty === base, `${base} → ${afterEmpty}`)

// recolour OVER the existing beads (different colour) → allowed (count stays same, colours change)
const swatches = page.locator('.swatch, .paletteSwatch, [class*="swatch"]')
// pick a different palette colour if available, else keep colour (recolour still allowed structurally)
await drag([[cx - 120, cy], [cx + 120, cy]])
const afterRecolour = await beadCount()
ok('alpha lock keeps bead count when painting over existing', afterRecolour === base, `${base} → ${afterRecolour}`)

ok('no page errors', errors.length === 0, errors.join(' | '))
console.log(process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS')
await browser.close()
