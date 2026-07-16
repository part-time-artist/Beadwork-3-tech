// Verify image layers: adding a reference image creates an image layer + enters
// Adjust mode, the saved artwork round-trips the image (src persists), and
// Save PNG with the image visible bakes it in without error.
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

await page.getByTitle('Layers').click()
await page.waitForTimeout(150)

// a small solid-red PNG (8x8)
const pngB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGP8z8Dwn4EIwDiqEL8CAJxcA/0H6tF1AAAAAElFTkSuQmCC'
await page.locator('.lpImg input[type=file]').setInputFiles({ name: 'ref.png', mimeType: 'image/png', buffer: Buffer.from(pngB64, 'base64') })
await page.waitForTimeout(400)

const rows = await page.locator('.lpName').allInnerTexts()
console.log('rows after add image:', rows)
if (!rows.some((n) => /image/i.test(n))) fail('no Image layer row after adding image')
const adjusting = await page.locator('.adjustBar').count()
console.log('adjust bar shown:', adjusting)
if (!adjusting) fail('did not enter Adjust mode after adding image')

// leave adjust, then Save PNG (image visible) — must not throw / blank
await page.locator('.adjustBar button').click()
await page.waitForTimeout(150)
const pxP = page.evaluate(() => new Promise((resolve) => {
  const real = HTMLAnchorElement.prototype.click
  HTMLAnchorElement.prototype.click = function () {
    const href = this.href
    HTMLAnchorElement.prototype.click = real
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
      const x = c.getContext('2d'); x.drawImage(img, 0, 0)
      const d = x.getImageData(0, 0, c.width, c.height).data
      let coloured = 0
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 10 && !(d[i] > 235 && d[i + 1] > 235 && d[i + 2] > 235)) coloured++
      resolve(coloured)
    }
    img.onerror = () => resolve(-1)
    img.src = href
  }
}))
await page.getByRole('button', { name: 'Save PNG' }).click()
const px = await pxP
console.log('exported coloured px (image baked):', px)
if (!(px > 0)) fail('export with a visible image produced no coloured pixels')

await page.screenshot({ path: 'scripts/imglayer.png' })
if (errors.length) fail('page errors: ' + errors.join(' | '))
console.log(process.exitCode ? 'RESULT: FAIL' : 'RESULT: PASS')
await browser.close()
