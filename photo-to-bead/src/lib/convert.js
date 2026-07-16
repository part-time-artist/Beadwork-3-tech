// Photo → beadwork conversion. Pure functions, no canvas/React state — given
// image pixels and a target grid, produce a Map of "col,row" → palette INDEX
// that the caller renders through the real bead lattice via its colour layers
// (geometry.js/threeBead.js).
import { makeGeometry, beadExists } from './geometry'
import threeBead from '../techniques/threeBead'

const key = (c, r) => `${c},${r}`

// Rows are derived from the image's own aspect ratio + the real bead pitch
// ratio (Px:Py), so a square photo doesn't come out stretched on the
// non-square lattice — this is what keeps the woven preview proportionate.
export function colsRowsFor(cols, imgW, imgH, Bw, Bh) {
  const geo = makeGeometry({ Bw, Bh, cols: 2, rows: 2 })
  const rows = Math.max(2, Math.round((cols * geo.Px * imgH) / (geo.Py * imgW)))
  return { cols, rows }
}

export function buildGeo(cols, rows, Bw = 20, Bh = 25) {
  return makeGeometry({ Bw, Bh, cols, rows })
}

// Sample the source image at every EXISTING lattice cell (skips apex gaps).
// One sample per bead centre — fast, and matches what a designer's eye
// actually compares the bead against.
// fit: 'stretch' maps the image edge-to-edge (used when the grid was derived
// from the image's own aspect, so there is no real distortion); 'cover' keeps
// the image's aspect and samples the largest centred crop that matches the
// canvas — used in cm-canvas mode where the grid shape is fixed by the studio.
export function sampleGrid(imgData, imgW, imgH, geo, cols, rows, fit = 'stretch') {
  const sampled = new Map()
  const W = geo.width
  const H = geo.height
  const k = fit === 'cover' ? Math.min(imgW / W, imgH / H) : null
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!beadExists(col, row)) continue
      const { cx, cy } = geo.centerFor(col, row)
      const rawX = k ? imgW / 2 + (cx - W / 2) * k : (cx / W) * imgW
      const rawY = k ? imgH / 2 + (cy - H / 2) * k : (cy / H) * imgH
      const sx = Math.min(imgW - 1, Math.max(0, Math.round(rawX)))
      const sy = Math.min(imgH - 1, Math.max(0, Math.round(rawY)))
      const i = (sy * imgW + sx) * 4
      sampled.set(key(col, row), [imgData[i], imgData[i + 1], imgData[i + 2]])
    }
  }
  return sampled
}


const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
const rgbToHex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')

// Extract the photo's own n most representative colours (median cut) — the
// Illustrator-Image-Trace-style control: n divides the image into that many
// colour regions, so raising it adds boundaries/detail and lowering it
// flattens the artwork into fewer, bolder shapes. Splits the box with the
// widest channel range at its median until n boxes exist (or nothing is left
// to split — a 3-colour logo asked for 16 colours just returns 3).
export function extractPalette(data, w, h, n) {
  const total = w * h
  const stride = Math.max(1, Math.floor(total / 24000)) // ≤ ~24k samples keeps this < 50ms
  const px = []
  for (let i = 0; i < total; i += stride) {
    const j = i * 4
    if (data[j + 3] < 128) continue // ignore transparent source pixels
    px.push([data[j], data[j + 1], data[j + 2]])
  }
  if (!px.length) return ['#000000']
  let boxes = [px]
  while (boxes.length < n) {
    // Split the box+channel with the largest sum-of-squared-error (variance ×
    // population) — NOT the largest range: one stray pixel in a flat box
    // inflates its range and steals the whole split budget, leaving big mixed
    // boxes unsplit (measured on the test image: a 12k-sample gradient+blue
    // box survived 15 splits while a flat block was halved into 1-px crumbs,
    // and the image's dominant dark green vanished from the palette).
    let bi = -1, bc = 0, best = 0
    for (let b = 0; b < boxes.length; b++) {
      const box = boxes[b]
      if (box.length < 2) continue
      for (let c = 0; c < 3; c++) {
        let sum = 0, sq = 0
        for (const p of box) { sum += p[c]; sq += p[c] * p[c] }
        const sse = sq - (sum * sum) / box.length
        if (sse > best) { best = sse; bi = b; bc = c }
      }
    }
    if (bi < 0 || best < 1) break
    const box = boxes[bi]
    box.sort((a, b) => a[bc] - b[bc])
    const mid = box.length >> 1
    boxes.splice(bi, 1, box.slice(0, mid), box.slice(mid))
  }
  // Rank clusters by importance (population, descending) so callers can take
  // a stable top-N: the slider reveals/hides the least-important colours
  // without ever reshuffling the rest.
  boxes.sort((a, b) => b.length - a.length)
  // Vivid TRUE colours, not cluster averages: averaging a cluster greys the
  // mid-tones out. Instead each cluster snaps to its most-common real colour —
  // pixels are binned at 5 bits/channel, the fullest bin wins, and the bin's
  // own pixels are averaged (sub-bin precision without banding). A flat area
  // yields its exact colour; a gradient yields its most-present shade.
  // Dedupe near-identical results (< ~8/channel): splitting a flat colour
  // yields identical winners, which would show as duplicate layers. Sorted by
  // population first, so the dedupe keeps the most important instance.
  const out = []
  for (const box of boxes) {
    const bins = new Map()
    for (const p of box) {
      const k2 = ((p[0] >> 3) << 10) | ((p[1] >> 3) << 5) | (p[2] >> 3)
      const bin = bins.get(k2)
      if (bin) { bin[0] += p[0]; bin[1] += p[1]; bin[2] += p[2]; bin[3]++ }
      else bins.set(k2, [p[0], p[1], p[2], 1])
    }
    let peak = null
    for (const v of bins.values()) if (!peak || v[3] > peak[3]) peak = v
    const mode = [peak[0] / peak[3], peak[1] / peak[3], peak[2] / peak[3]]
    const dupe = out.some(
      (o) => (o[0] - mode[0]) ** 2 + (o[1] - mode[1]) ** 2 + (o[2] - mode[2]) ** 2 < 64
    )
    if (!dupe) out.push(mode)
  }
  return out.map(rgbToHex)
}

function nearestIndex(rgb, paletteRgb) {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < paletteRgb.length; i++) {
    const p = paletteRgb[i]
    const dr = rgb[0] - p[0], dg = rgb[1] - p[1], db = rgb[2] - p[2]
    const d = dr * dr + dg * dg + db * db
    if (d < bestD) { bestD = d; best = i }
  }
  return best
}

// Quantize the sampled grid to the given palette. With dithering on, error is
// diffused Floyd–Steinberg style but walked along the REAL lattice adjacency
// (tech.floodNeighbors) instead of a raster grid — the staggered weave has no
// plain "row below", so error spreads to the forward neighbours that actually
// exist: right, and the two nestled diagonals in the row below. Missing
// neighbours (edges, apex gaps) are simply skipped and the weights renormalise.
export function quantizeGrid(sampled, geo, cols, rows, palette, dither) {
  const paletteRgb = palette.map(hexToRgb)
  const work = new Map(sampled) // mutated in place by dithering error diffusion
  const out = new Map()
  // threeBead.floodNeighbors(col,row) returns [left, right, diagL-up, diagR-up,
  // diagL-down, diagR-down]. Indices 1/4/5 are the "forward" ones in raster
  // order (rightward, next row down) — the honeycomb equivalent of classic
  // Floyd–Steinberg's right/below-left/below-right targets.
  const FORWARD_IDX = [1, 4, 5]
  const FORWARD_W = [7 / 16, 5 / 16, 4 / 16]
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const k = key(col, row)
      const rgb = work.get(k)
      if (!rgb) continue
      const idx = nearestIndex(rgb, paletteRgb)
      // store the palette INDEX, not the hex: beads keep their cluster
      // identity even when a layer's display colour is later swapped
      out.set(k, idx)
      if (!dither) continue
      const p = paletteRgb[idx]
      const err = [rgb[0] - p[0], rgb[1] - p[1], rgb[2] - p[2]]
      const neighbours = threeBead.floodNeighbors(col, row)
      let wsum = 0
      const live = []
      for (let i = 0; i < FORWARD_IDX.length; i++) {
        const t = neighbours[FORWARD_IDX[i]]
        if (t.col < 0 || t.col >= cols || t.row >= rows || !beadExists(t.col, t.row)) continue
        live.push([t, FORWARD_W[i]])
        wsum += FORWARD_W[i]
      }
      if (!wsum) continue
      for (const [t, w] of live) {
        const tk = key(t.col, t.row)
        const norm = w / wsum
        const cur = work.get(tk) || sampled.get(tk)
        if (!cur) continue
        work.set(tk, [
          cur[0] + err[0] * norm,
          cur[1] + err[1] * norm,
          cur[2] + err[2] * norm,
        ])
      }
    }
  }
  return out
}

export { hexToRgb, rgbToHex }
