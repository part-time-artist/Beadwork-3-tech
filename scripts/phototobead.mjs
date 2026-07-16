// Verify the photo-to-bead prototype: upload a synthetic test image (radial
// gradient + solid colour blocks), confirm the lattice renders through the
// real bead silhouette (not a placeholder square grid), dithering visibly
// changes the gradient result, the resolution slider changes bead count,
// the COLOURS slider (image-trace-style) changes how many colour layers the
// photo is divided into, layers can be hidden and recoloured (free pick +
// universal swatch), and there are no runtime errors. Run against the
// prototype's dev server.
import { chromium } from 'playwright-core'

const PORT = process.env.P2B_PORT || '3004'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => { if (m.type() === 'error' && !/404|favicon/i.test(m.text())) errors.push(m.text()) })
const results = []
const ok = (name, cond, extra = '') => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`); if (!cond) process.exitCode = 1 }

await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(500)

// Build a synthetic 400x300 test photo in-page: a smooth radial gradient
// (left) to exercise dithering, and three flat colour blocks (right) to
// exercise nearest-colour matching. Then hand it to the file input as a Blob.
const dataUrl = await page.evaluate(() => {
  const cv = document.createElement('canvas')
  cv.width = 400; cv.height = 300
  const ctx = cv.getContext('2d')
  const grad = ctx.createRadialGradient(120, 150, 10, 120, 150, 140)
  grad.addColorStop(0, '#ffe9c4')
  grad.addColorStop(1, '#274c3b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 220, 300)
  ctx.fillStyle = '#c0392b'
  ctx.fillRect(220, 0, 60, 300)
  ctx.fillStyle = '#2980b9'
  ctx.fillRect(280, 0, 60, 300)
  ctx.fillStyle = '#f1c40f'
  ctx.fillRect(340, 0, 60, 300)
  return cv.toDataURL('image/png')
})

await page.setInputFiles('input[type=file]', {
  name: 'test.png',
  mimeType: 'image/png',
  buffer: Buffer.from(dataUrl.split(',')[1], 'base64'),
})
await page.waitForTimeout(500)

const readCanvas = () => page.evaluate(() => {
  const cv = document.querySelector('main canvas')
  if (!cv || !cv.width) return null
  const ctx = cv.getContext('2d')
  const d = ctx.getImageData(0, 0, cv.width, cv.height).data
  let nonWhite = 0, total = 0
  const colours = new Set()
  for (let i = 0; i < d.length; i += 4) {
    total++
    if (d[i + 3] < 10) continue
    if (!(d[i] > 250 && d[i + 1] > 250 && d[i + 2] > 250)) nonWhite++
    colours.add(`${d[i]},${d[i + 1]},${d[i + 2]}`)
  }
  return { w: cv.width, h: cv.height, nonWhite, total, uniqueColours: colours.size }
})

let snap = await readCanvas()
ok('#1 canvas rendered with content', !!snap && snap.nonWhite > 500, JSON.stringify(snap))
ok('#2 lattice is NOT a plain square grid (aspect matches bead ratio)', !!snap && Math.abs(snap.w / snap.h - 1.0) > 0.05, `${snap?.w}x${snap?.h}`)

const STATS_RE = /(\d+)\s*×\s*(\d+)\s*lattice\s*·\s*([\d,]+)\s*beads/ // the stats line specifically, not the "N beads wide" slider label
const statsText = await page.locator('aside').innerText()
const m = statsText.match(STATS_RE)
ok('#3 stats line reports the lattice size', !!m, statsText.slice(-160))
if (m) console.log(`lattice reported: ${m[1]}×${m[2]}, ${m[3]} beads`)

// widen the canvas 10 → 20 cm — bead count should roughly double
const before = m ? parseInt(m[3].replace(/,/g, ''), 10) : 0
const t0 = Date.now()
await page.locator('input[aria-label="Canvas W cm"]').fill('20')
// wait for the STATS TEXT itself to change (not a fixed delay) — the
// conversion at max resolution is real synchronous work, so a short fixed
// wait would silently read stale numbers instead of catching a real freeze
await page.waitForFunction(
  (prevBeads) => {
    const m = document.querySelector('aside')?.innerText.match(/lattice\s*·\s*([\d,]+)\s*beads/)
    return m && parseInt(m[1].replace(/,/g, ''), 10) !== prevBeads
  },
  before,
  { timeout: 8000 }
)
const maxResMs = Date.now() - t0
const statsText2 = await page.locator('aside').innerText()
const m2 = statsText2.match(STATS_RE)
const after = m2 ? parseInt(m2[3].replace(/,/g, ''), 10) : 0
ok('#4 widening the cm canvas increases bead count', after > before * 1.5, `${before} → ${after}`)
ok('#4b conversion completes quickly (no freeze)', maxResMs < 1500, `${maxResMs}ms end-to-end`)

// screenshot at high-res for visual check
await page.screenshot({ path: 'scripts/p2b-high.png', clip: { x: 0, y: 0, width: 1400, height: 900 } })

// dithering toggle changes the gradient region's pixel makeup (resolution
// doesn't matter for this comparison — just needs to be held constant)
await page.waitForTimeout(200)
const withDither = await readCanvas()
await page.locator('text=Dithering').click()
await page.waitForTimeout(500)
const withoutDither = await readCanvas()
ok('#5 dithering toggle changes the rendered result', withDither.uniqueColours !== withoutDither.uniqueColours || JSON.stringify(withDither) !== JSON.stringify(withoutDither),
  `dither colours=${withDither.uniqueColours} nodither colours=${withoutDither.uniqueColours}`)
await page.screenshot({ path: 'scripts/p2b-nodither.png' })
await page.locator('text=Dithering').click() // back on
await page.waitForTimeout(500)
await page.screenshot({ path: 'scripts/p2b-dither.png' })

// ---- v2: image-trace colours slider + colour layers + universal swap ------

// #6 the photo's own palette became the layers — asked for 8; near-identical
// extractions are deduped, so a photo with fewer real colours reports fewer
const layerRows = page.locator('[data-layer-row]')
const nLayers = await layerRows.count()
ok('#6 palette extracted from the photo as layers', nLayers >= 4 && nLayers <= 8, `${nLayers} rows`)

// #6b vivid TRUE colours: the synthetic photo's flat blocks are exactly
// #c0392b and #f1c40f — mode-snap extraction must surface them EXACTLY
// (averaging would too for flat blocks; this guards the vivid path's floor)
const rowColours = []
for (let i = 0; i < nLayers; i++) rowColours.push(await layerRows.nth(i).locator('input[type=color]').inputValue())
ok('#6b extraction surfaces the photo’s exact flat colours',
  rowColours.includes('#c0392b') && rowColours.includes('#f1c40f'), rowColours.join(' '))

// #7 COLOURS slider (image-trace style): Home → min (2) → the artwork is
// divided into just 2 colour regions; layer list follows
const colSlider = page.locator('input[aria-label="Colours"]')
await colSlider.focus()
await page.keyboard.press('Home')
await page.waitForFunction(() => document.querySelectorAll('[data-layer-row]').length === 2, { timeout: 8000 })
await page.waitForTimeout(500) // let quantize+render settle
ok('#7 colours slider re-divides the artwork', (await layerRows.count()) === 2)
await page.screenshot({ path: 'scripts/p2b-2colours.png' })

// #8 hiding a layer removes its beads from the canvas — proportional to that
// layer's own bead count (ranking decides how big layer 0 is; don't assume)
const fullSnap = await readCanvas()
const rowText = await layerRows.nth(0).innerText()
const count0 = parseInt((rowText.match(/([\d,]+)\s*$/) || [])[1]?.replace(/,/g, '') || '0', 10)
const statsAll = (await page.locator('aside').innerText()).match(STATS_RE) // the lattice stats line, NOT the "N beads wide" slider label
const totalBeads = parseInt(statsAll[3].replace(/,/g, ''), 10)
const frac0 = count0 / totalBeads
await layerRows.nth(0).locator('[data-layer-eye]').click()
await page.waitForTimeout(500)
const hiddenSnap = await readCanvas()
ok('#8 hiding a colour layer removes its beads',
  hiddenSnap.nonWhite < fullSnap.nonWhite * (1 - frac0 * 0.6),
  `layer 0 holds ${(frac0 * 100).toFixed(1)}% of beads; opaque px ${fullSnap.nonWhite} → ${hiddenSnap.nonWhite}`)
await layerRows.nth(0).locator('[data-layer-eye]').click() // show again
await page.waitForTimeout(400)

// #9 universal swap: select layer 2, tap a universal swatch → the layer's
// swatch takes that colour and the canvas repaints with it
const TEAL = '#006E54'
await layerRows.nth(1).click()
await page.locator(`[data-universal-swatch][title="${TEAL}"]`).click()
await page.waitForTimeout(500)
const swatchVal = await layerRows.nth(1).locator('input[type=color]').inputValue()
const paint = await page.evaluate(() => {
  const cv = document.querySelector('main canvas')
  const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data
  let teal = 0
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 200 && d[i] === 0 && d[i + 1] === 0x6e && d[i + 2] === 0x54) teal++
  }
  return teal
})
ok('#9 universal swatch recolours the selected layer', swatchVal.toLowerCase() === TEAL.toLowerCase() && paint > 200,
  `swatch=${swatchVal}, ${paint} teal px on canvas`)
await page.screenshot({ path: 'scripts/p2b-swapped.png' })

// #9b stable ranked top-N (the v4 headline): sliding colours UP then back
// DOWN must not reshuffle the palette — the teal swap on layer 2 survives
await colSlider.focus()
await page.keyboard.press('ArrowRight') // 2 → 3
await page.waitForFunction(() => document.querySelectorAll('[data-layer-row]').length === 3, { timeout: 8000 })
await page.keyboard.press('ArrowLeft') // 3 → 2
await page.waitForFunction(() => document.querySelectorAll('[data-layer-row]').length === 2, { timeout: 8000 })
await page.waitForTimeout(500)
const swatchAfter = await layerRows.nth(1).locator('input[type=color]').inputValue()
ok('#9b layer swaps survive colour-slider moves (stable ranking)',
  swatchAfter.toLowerCase() === TEAL.toLowerCase(), `swatch after slide up+down = ${swatchAfter}`)

// ---- v3: drag & drop, cm canvas mode, threshold (noise smoothing) ---------

// #10 drag & drop: dispatch a real drop event carrying a File — the thumbnail
// (a fresh blob URL) must change, proving the drop path loads images
const srcBefore = await page.locator('aside img').getAttribute('src')
await page.evaluate((durl) => {
  const bytes = atob(durl.split(',')[1])
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  const file = new File([arr], 'dropped.png', { type: 'image/png' })
  const dt = new DataTransfer()
  dt.items.add(file)
  const root = document.querySelector('#root > div')
  root.dispatchEvent(new DragEvent('dragenter', { bubbles: true, dataTransfer: dt }))
  root.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: dt }))
}, dataUrl)
await page.waitForFunction(
  (prev) => document.querySelector('aside img')?.src !== prev,
  srcBefore,
  { timeout: 8000 }
)
await page.waitForTimeout(600)
ok('#10 drag & drop loads a photo', (await page.locator('aside img').getAttribute('src')) !== srcBefore)

// #11 "Match photo shape": sets cm H from the photo's aspect — the 400×300
// test photo at 20 cm wide should land the canvas at 20 × 15 cm (4:3)
const asideBefore = await page.locator('aside').innerText()
await page.getByRole('button', { name: 'Match photo shape' }).click()
await page.waitForFunction(
  (prev) => {
    const t = document.querySelector('aside')?.innerText
    return t !== prev && /lattice/.test(t)
  },
  asideBefore,
  { timeout: 8000 }
)
await page.waitForTimeout(400)
const hVal = await page.locator('input[aria-label="Canvas H cm"]').inputValue()
const cmSnap = await readCanvas()
const cmAspect = cmSnap.w / cmSnap.h
ok('#11 Match photo shape sets cm from the photo aspect', hVal === '15' && cmAspect > 1.2 && cmAspect < 1.45,
  `H=${hVal}cm, canvas aspect ${cmAspect.toFixed(2)} (expect ≈4:3)`)
await page.screenshot({ path: 'scripts/p2b-cm.png' })

// #12 the threshold slider is GONE (removed in v4 — user: "useless")
ok('#12 threshold slider removed', (await page.locator('input[aria-label="Threshold"]').count()) === 0)

ok('#13 no runtime errors', errors.length === 0, errors.join(' | '))

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
await browser.close()
