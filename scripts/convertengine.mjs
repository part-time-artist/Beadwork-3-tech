// Unit checks for the photo→bead conversion engine (src/lib/convert.js — the
// REAL module, imported directly; it is dependency-free ESM). Guards the
// regressions found while building it:
//  · SSE-based median-cut split (largest-RANGE splitting let one stray pixel
//    steal the split budget and the image's DOMINANT colour vanished)
//  · vivid mode-snap (flat blocks surface their EXACT colours)
//  · population ranking + near-dupe dedupe
//  · quantize returns palette INDICES; dithering changes assignment
// Run: node scripts/convertengine.mjs
import { extractPalette, sampleGrid, quantizeGrid } from '../src/lib/convert.js'

const results = []
const ok = (name, cond, extra = '') => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`); if (!cond) process.exitCode = 1 }

// ---- synthetic photo: radial gradient (cream→dark green) + 3 flat blocks --
const W = 400, H = 300
const data = new Uint8ClampedArray(W * H * 4)
const lerp = (a, b, t) => a + (b - a) * t
const cream = [0xff, 0xe9, 0xc4]
const dgreen = [0x27, 0x4c, 0x3b]
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4
    let rgb
    if (x < 220) {
      const t = Math.min(1, Math.max(0, (Math.hypot(x - 120, y - 150) - 10) / 130))
      rgb = [lerp(cream[0], dgreen[0], t), lerp(cream[1], dgreen[1], t), lerp(cream[2], dgreen[2], t)]
    } else if (x < 280) rgb = [0xc0, 0x39, 0x2b]
    else if (x < 340) rgb = [0x29, 0x80, 0xb9]
    else rgb = [0xf1, 0xc4, 0x0f]
    data[i] = Math.round(rgb[0]); data[i + 1] = Math.round(rgb[1]); data[i + 2] = Math.round(rgb[2]); data[i + 3] = 255
  }
}

// ---- minimal 3-bead technique (the engine only needs these two) ------------
const tech = {
  beadExists: (col, row) => (row % 2 === 1 ? true : (((col + row / 2) % 2) + 2) % 2 === 1),
  floodNeighbors: (col, row) => {
    const odd = row % 2
    const diagL = odd ? col : col - 1
    const diagR = odd ? col + 1 : col
    return [
      { col: col - 1, row }, { col: col + 1, row },
      { col: diagL, row: row - 1 }, { col: diagR, row: row - 1 },
      { col: diagL, row: row + 1 }, { col: diagR, row: row + 1 },
    ]
  },
}

// ---- extraction -------------------------------------------------------------
const pal = extractPalette(data, W, H, 16)
ok('#1 dominant flat colour ranked FIRST (SSE split fix)', pal[0] === '#274c3b', pal[0])
ok('#2 exact flat colours all surface (vivid mode-snap)',
  ['#274c3b', '#c0392b', '#2980b9', '#f1c40f'].every((c) => pal.includes(c)), pal.join(' '))
ok('#3 no near-duplicate colours (dedupe)',
  !pal.some((c, i) => pal.slice(i + 1).some((o) => {
    const d = [0, 2, 4].reduce((s, k) => s + (parseInt(c.slice(1 + k, 3 + k), 16) - parseInt(o.slice(1 + k, 3 + k), 16)) ** 2, 0)
    return d < 64
  })))
ok('#4 gradient yields intermediate shades (8–14 total)', pal.length >= 8 && pal.length <= 14, `${pal.length} colours`)
// The app's stable top-N comes from extracting ONCE at max and slicing —
// so the engine's contract is determinism, not prefix-equality across
// different n (re-clustering at a smaller n is legitimately different).
const again = extractPalette(data, W, H, 16)
ok('#5 extraction is deterministic', again.length === pal.length && again.every((c, i) => pal[i] === c))

// ---- sampling + quantize ----------------------------------------------------
// tiny stand-in geometry (same shape the app builds via tech.makeGeometry)
const Px = 1.296 * 20, Py = 0.875 * 25
const cols = 60, rows = 50
const geo = {
  width: 20 * 0.75 * 2 + (cols - 1) * Px + Px / 2,
  height: 25 * 0.75 * 2 + (rows - 1) * Py,
  centerFor: (col, row) => ({ cx: 15 + col * Px + (row % 2) * (Px / 2), cy: 18.75 + row * Py }),
}
const sampled = sampleGrid(data, W, H, geo, cols, rows, tech)
ok('#6 sampling covers only existing lattice cells',
  [...sampled.keys()].every((k) => { const [c, r] = k.split(',').map(Number); return tech.beadExists(c, r) }) && sampled.size > 1500,
  `${sampled.size} samples`)

const top8 = pal.slice(0, 8)
const flat = quantizeGrid(sampled, cols, rows, top8, false, tech)
ok('#7 quantize returns palette indices', [...flat.values()].every((v) => Number.isInteger(v) && v >= 0 && v < 8))
const dithered = quantizeGrid(sampled, cols, rows, top8, true, tech)
let diff = 0
for (const [k, v] of flat) if (dithered.get(k) !== v) diff++
ok('#8 dithering changes assignments in gradient regions', diff > 100, `${diff} beads differ`)

console.log('\n' + results.join('\n'))
console.log('\n' + (process.exitCode ? 'OVERALL: FAIL' : 'OVERALL: PASS'))
