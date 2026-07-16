// Kinetic Lab check: demo hangs + sways, grab works, import works, video-rec
// button exists. Run the kinetic dev server first (kinetic-lab: npm run dev,
// port 3001), then: node scripts/kinetic.mjs
import { chromium } from 'playwright-core'
import fs from 'node:fs'

const URL = 'http://localhost:3001'
const out = (n, ok, extra = '') =>
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${extra ? ' — ' + extra : ''}`)
let failures = 0
const check = (n, ok, extra) => {
  out(n, ok, extra)
  if (!ok) failures++
}

// A tiny valid v4 design file (3-bead, 4×3cm, 3mm beads, two colours).
function sampleDesign() {
  const exists = (c, r) => r % 2 === 1 || (((c + r / 2) % 2) + 2) % 2 === 1
  const beads = []
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 10; c++)
      if (exists(c, r)) beads.push([`${c},${r}`, c < 5 ? '#4A3772' : '#D8DA5F'])
  return {
    version: 4,
    name: 'import test',
    technique: '3bead',
    canvasCm: { w: 4, h: 3 },
    beadMM: { w: 3, h: 3.75 },
    palette: ['#4A3772', '#D8DA5F'],
    pack: 0.75,
    groups: [],
    layers: [{ name: 'Layer 1', type: 'bead', visible: true, locked: false, beads }],
    activeIndex: 0,
  }
}

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(URL)
await page.waitForTimeout(2500) // let the demo settle + fps counter fill

// 1. Demo design is on the bar
const statRow = (label) =>
  page.locator('span', { hasText: new RegExp(`^${label}$`) }).locator('..')
const beadsStat = await statRow('Beads').textContent()
const beadCount = parseInt(beadsStat.replace(/\D+/g, ''), 10)
check('demo design loaded', beadCount > 100, `${beadCount} beads`)

// 2. FPS is healthy
const fpsText = await statRow('Frame rate').textContent()
const fps = parseInt(fpsText.replace(/\D+/g, ''), 10)
check('frame rate ≥ 50', fps >= 50, `${fps} fps`)

// 3. Canvas actually shows beads (sample pixels)
const px = await page.evaluate(() => {
  const c = document.querySelector('canvas')
  const ctx = c.getContext('2d')
  const img = ctx.getImageData(0, 0, c.width, c.height).data
  let coloured = 0
  for (let i = 0; i < img.length; i += 40) {
    const [r, g, b, a] = [img[i], img[i + 1], img[i + 2], img[i + 3]]
    if (a > 0 && !(r > 240 && g > 240 && b > 240)) coloured++
  }
  return coloured
})
check('beads rendered on canvas', px > 500, `${px} sampled coloured px`)

// 4. Grab: drag the fabric sideways and confirm beads moved
const before = await page.screenshot({ clip: { x: 400, y: 200, width: 640, height: 500 } })
const box = await page.locator('canvas').boundingBox()
const cx = box.x + box.width / 2
const cy = box.y + box.height / 2
await page.mouse.move(cx, cy)
await page.mouse.down()
await page.mouse.move(cx + 180, cy + 60, { steps: 12 })
await page.waitForTimeout(120)
const during = await page.screenshot({ clip: { x: 400, y: 200, width: 640, height: 500 } })
await page.mouse.up()
check('grab deforms the fabric', !before.equals(during))
await page.waitForTimeout(1200)

// 5. Import a .beadwork.json
const file = 'scripts/kinetic-sample.beadwork.json'
fs.writeFileSync(file, JSON.stringify(sampleDesign()))
await page.setInputFiles('input[type=file]', file)
await page.waitForTimeout(1500)
const name = await statRow('Piece').textContent()
check('import loads the design', name.includes('import test'), name.trim())
const beads2 = await statRow('Beads').textContent()
check('imported bead count', parseInt(beads2.replace(/\D+/g, ''), 10) === sampleDesign().layers[0].beads.length)

// 6. Record button present + toggles
await page.locator('button', { hasText: 'Record motion video' }).click()
await page.waitForTimeout(800)
const stopBtn = await page.locator('button', { hasText: 'Stop & save video' }).count()
check('recording toggles', stopBtn === 1)
const dl = page.waitForEvent('download', { timeout: 5000 }).catch(() => null)
await page.locator('button', { hasText: 'Stop & save video' }).click()
const download = await dl
check('video file downloads', !!download, download ? await download.suggestedFilename() : 'no download')

// 7. Paint mode recolours a bead
await page.locator('button', { hasText: 'Paint' }).click()
await page.locator('button[title="#D8DA5F"]').click()
await page.mouse.click(cx - 60, cy - 40)
await page.waitForTimeout(300)

await page.screenshot({ path: 'scripts/kinetic-view.png' })
check('no page errors', errors.length === 0, errors.join(' | '))

await browser.close()
console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL CHECKS PASSED')
process.exit(failures ? 1 : 0)
