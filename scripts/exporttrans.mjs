// Verify export backgrounds: Export PNG must be a real .png with a TRANSPARENT
// background (alpha 0 outside the beads); Export JPG must be a .jpg on a white
// sheet. Run against a live dev server: node scripts/exporttrans.mjs
import { chromium } from 'playwright-core'
import { readFileSync } from 'fs'

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
// paint a few beads so the export has content
const board = await page.locator('canvas.board').boundingBox()
const cx = board.x + board.width / 2, cy = board.y + board.height / 2
for (let i = -2; i <= 2; i++) { await page.mouse.click(cx + i * 30, cy, { delay: 30 }); await page.waitForTimeout(60) }

const doExport = async (label) => {
  await page.locator('button[title="Menu"]').click()
  await page.waitForTimeout(250)
  const dl = page.waitForEvent('download', { timeout: 30000 })
  await page.getByRole('button', { name: label, exact: true }).click()
  const download = await dl
  const path = `scripts/exporttest-${label.replace(/\s/g, '')}`
  await download.saveAs(path)
  await page.waitForTimeout(400)
  return { name: download.suggestedFilename(), path }
}

const png = await doExport('Export PNG')
const jpg = await doExport('Export JPG')
ok('#1 PNG filename', png.name.endsWith('.png'), png.name)
ok('#2 JPG filename', jpg.name.endsWith('.jpg'), jpg.name)

const pngBytes = readFileSync(png.path)
const jpgBytes = readFileSync(jpg.path)
ok('#3 PNG file signature', pngBytes[0] === 0x89 && pngBytes[1] === 0x50 && pngBytes[2] === 0x4e && pngBytes[3] === 0x47)
ok('#4 JPG file signature', jpgBytes[0] === 0xff && jpgBytes[1] === 0xd8)

// decode both in the browser and sample pixels
const sample = await page.evaluate(async ([pngB64, jpgB64]) => {
  const load = (b64, mime) => new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = `data:${mime};base64,${b64}`
  })
  const probe = async (img) => {
    const cv = document.createElement('canvas')
    cv.width = img.width; cv.height = img.height
    const ctx = cv.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const px = (x, y) => [...ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data]
    return {
      w: img.width, h: img.height,
      corner: px(2, img.height - 3),               // bottom-left, outside chart marks
      betweenBeads: px(img.width * 0.75, img.height * 0.4), // inside the grid, empty cells
    }
  }
  return {
    png: await probe(await load(pngB64, 'image/png')),
    jpg: await probe(await load(jpgB64, 'image/jpeg')),
  }
}, [pngBytes.toString('base64'), jpgBytes.toString('base64')])

ok('#5 PNG background is transparent', sample.png.corner[3] === 0, `corner alpha=${sample.png.corner[3]}`)
ok('#6 JPG sheet is white', sample.jpg.corner[0] > 248 && sample.jpg.corner[1] > 248 && sample.jpg.corner[2] > 248, `corner=${sample.jpg.corner.slice(0, 3)}`)
ok('#7 no page errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log(`png=${sample.png.w}×${sample.png.h} jpg=${sample.jpg.w}×${sample.jpg.h}`)
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
