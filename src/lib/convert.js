// Photo → beadwork conversion engine (ported from the validated photo-to-bead
// prototype, v4). Pure functions, no canvas/React state. The weave is passed
// in as `tech` (a technique from src/techniques) so the engine works for any
// grid — the import UI currently offers it for 3-bead only.
//
// extractPalette(data, w, h, n)          → ranked hex colours from the photo
// sampleGrid(data, w, h, geo, cols, rows, tech) → Map "col,row" → [r,g,b]
// quantizeGrid(sampled, cols, rows, palette, dither, tech) → Map "col,row" → palette index

const key = (c, r) => `${c},${r}`

const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
const rgbToHex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')

// Extract the photo's n most representative colours, RANKED by importance
// (cluster population) so callers can take a stable top-N: a colours slider
// reveals/hides the least-important colours without reshuffling the rest.
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
    // boxes unsplit (measured: a 12k-sample gradient+blue box survived 15
    // splits while a flat block was halved into 1-px crumbs, and the image's
    // dominant colour vanished from the palette).
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
  boxes.sort((a, b) => b.length - a.length) // rank by population
  // Vivid TRUE colours, not cluster averages (averages grey the mid-tones
  // out): each cluster snaps to its most-common real colour — pixels binned
  // at 5 bits/channel, the fullest bin wins, the bin's own pixels averaged.
  // Near-identical winners are deduped (splitting a flat colour yields
  // identical modes); sorted by population first so the dedupe keeps the
  // most important instance.
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

// Sample the source image at every EXISTING lattice cell (skips apex gaps).
// The image keeps its aspect and covers the canvas: the largest centred crop
// matching the canvas shape is sampled, one read per bead centre.
export function sampleGrid(imgData, imgW, imgH, geo, cols, rows, tech) {
  const sampled = new Map()
  const W = geo.width
  const H = geo.height
  const k = Math.min(imgW / W, imgH / H)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!tech.beadExists(col, row)) continue
      const { cx, cy } = geo.centerFor(col, row)
      const sx = Math.min(imgW - 1, Math.max(0, Math.round(imgW / 2 + (cx - W / 2) * k)))
      const sy = Math.min(imgH - 1, Math.max(0, Math.round(imgH / 2 + (cy - H / 2) * k)))
      const i = (sy * imgW + sx) * 4
      sampled.set(key(col, row), [imgData[i], imgData[i + 1], imgData[i + 2]])
    }
  }
  return sampled
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

// Quantize the sampled grid to the palette, returning palette INDICES — the
// bead→cluster assignment is the durable thing; display colour resolves
// through the caller's layers, so swapping a layer's colour never reshuffles
// which beads belong to it. With dithering on, error diffuses Floyd–Steinberg
// style along the REAL lattice adjacency (tech.floodNeighbors) — the
// staggered weave has no plain "row below", so error spreads to the forward
// neighbours that actually exist; missing ones (edges, apex gaps) are skipped
// and the weights renormalise.
export function quantizeGrid(sampled, cols, rows, palette, dither, tech) {
  const paletteRgb = palette.map(hexToRgb)
  const work = new Map(sampled) // mutated in place by error diffusion
  const out = new Map()
  // floodNeighbors returns [left, right, diagL-up, diagR-up, diagL-down,
  // diagR-down]; indices 1/4/5 are the "forward" ones in raster order —
  // the honeycomb equivalent of classic Floyd–Steinberg's targets.
  const FORWARD_IDX = [1, 4, 5]
  const FORWARD_W = [7 / 16, 5 / 16, 4 / 16]
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const k2 = key(col, row)
      const rgb = work.get(k2)
      if (!rgb) continue
      const idx = nearestIndex(rgb, paletteRgb)
      out.set(k2, idx)
      if (!dither) continue
      const p = paletteRgb[idx]
      const err = [rgb[0] - p[0], rgb[1] - p[1], rgb[2] - p[2]]
      const neighbours = tech.floodNeighbors(col, row)
      let wsum = 0
      const live = []
      for (let i = 0; i < FORWARD_IDX.length; i++) {
        const t = neighbours[FORWARD_IDX[i]] // may be missing on techniques with <6 neighbours (1-bead has 4)
        if (!t || t.col < 0 || t.col >= cols || t.row >= rows || !tech.beadExists(t.col, t.row)) continue
        live.push([t, FORWARD_W[i]])
        wsum += FORWARD_W[i]
      }
      if (!wsum) continue
      for (const [t, w] of live) {
        const tk = key(t.col, t.row)
        const norm = w / wsum
        const cur = work.get(tk)
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
