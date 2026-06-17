// 3-bead weave technique (Kutch). Brick-offset lattice of oval beads, apex rows
// half-density, woven tilt. This module collects the behaviours that used to be
// inline in App.jsx; the shared geometry methods come from defineTechnique
// (packing/stagger default to the 3-bead values in geometry.js).
import { beadExists } from '../lib/geometry'
import { defineTechnique } from './defineTechnique'

// Reflect a set of cells about its own centre, landing on existing nodes. The
// weave is a staggered, half-density lattice, so we work in integer lattice
// units: horizontally X = 2·col + (row parity) (units of the half-column
// odd-row shift); vertically Y = row. Reflecting X about a constant H gives
// col' = H/2 − col − (row parity). When the selection includes apex (even)
// beads the axis must be a multiple of 4 so apex-row density (exists iff
// col + row/2 is odd) and the column parity both survive; with base rows only,
// a multiple of 2 keeps it exactly centred. Used to build the mirror copy.
function flip3(cells, dir) {
  const m = cells.some((c) => (c.row & 1) === 0) ? 4 : 2 // apex beads ⇒ stricter axis
  if (dir === 'h') {
    let xmin = Infinity, xmax = -Infinity
    for (const { col, row } of cells) {
      const x = 2 * col + (row & 1)
      if (x < xmin) xmin = x
      if (x > xmax) xmax = x
    }
    const H = Math.round((xmin + xmax) / m) * m
    return cells.map(({ col, row, fill }) => ({ col: H / 2 - col - (row & 1), row, fill }))
  }
  let rmin = Infinity, rmax = -Infinity
  for (const { row } of cells) {
    if (row < rmin) rmin = row
    if (row > rmax) rmax = row
  }
  const V = Math.round((rmin + rmax) / m) * m // even axis keeps offset; ×4 also keeps density
  return cells.map(({ col, row, fill }) => ({ col, row: V - row, fill }))
}

export default defineTechnique({
  id: '3bead',
  label: '3-bead weave',
  subtitle: '3-BEAD TECHNIQUE',
  exists: beadExists,
  beadShapeN: 2.4, // soft oval silhouette

  // Apex (even) rows lie horizontal; tilted (odd) rows mirror ±45° in a
  // checkerboard.
  tiltFor: (col, row) => {
    if (row % 2 === 0) return Math.PI / 2
    const A = Math.PI / 4
    return ((row + 1) / 2 + col) % 2 === 1 ? -A : A
  },

  // Flood-fill walks the staggered neighbours: left/right + 4 nestled diagonals.
  floodNeighbors: (col, row) => {
    const odd = row % 2
    const diagL = odd ? col : col - 1
    const diagR = odd ? col + 1 : col
    return [
      { col: col - 1, row },
      { col: col + 1, row },
      { col: diagL, row: row - 1 },
      { col: diagR, row: row - 1 },
      { col: diagL, row: row + 1 },
      { col: diagR, row: row + 1 },
    ]
  },

  // Straight lattice lines for stroke snapping: along a row + the two weave
  // diagonals.
  snapAxes: (geo) => {
    const dl = Math.hypot(geo.Px / 2, geo.Py)
    return [
      { ux: 1, uy: 0, pitch: geo.Px },
      { ux: geo.Px / 2 / dl, uy: geo.Py / dl, pitch: dl },
      { ux: -(geo.Px / 2) / dl, uy: geo.Py / dl, pitch: dl },
    ]
  },

  // ---- motif placement / pattern parity ----
  // The weave is not uniform, so motif origins and tile pitches snap to EVEN
  // cells to keep apex/base parity and the tilt checkerboard intact.
  snapMotifOrigin: (minC, minR) => ({ minC: minC - (minC % 2), minR: minR - (minR % 2) }),
  copyStartOffset: { dc: 1, dr: 2 }, // a fresh copy nudges to a parity-valid spot
  evenUp: (n) => n + (n % 2),
  patternHalf: (n) => {
    const s = Math.floor(n / 2)
    return Math.max(2, s - (s % 2))
  },

  // ---- mirror: a flipped DUPLICATE placed beside the original --------------
  // Keep the originals; return a flipped copy translated to sit next to them so
  // the two read as a symmetric pair. `side` = +1 (right / down) or −1 (left /
  // up). The translation is a multiple of 2 columns (keeps apex density + the
  // column parity) or a multiple of 4 rows (keeps the row offset + density), and
  // is at least the selection's span so the copy never overlaps the original.
  mirror: (cells, dir, side = 1) => {
    const flipped = flip3(cells, dir)
    let minC = Infinity, minR = Infinity, maxC = -Infinity, maxR = -Infinity
    for (const { col, row } of flipped) {
      if (col < minC) minC = col
      if (col > maxC) maxC = col
      if (row < minR) minR = row
      if (row > maxR) maxR = row
    }
    if (dir === 'h') {
      let dc = maxC - minC + 1
      dc += dc % 2 // even ⇒ apex density + column parity preserved
      return flipped.map(({ col, row, fill }) => ({ col: col + side * dc, row, fill }))
    }
    const dr = Math.ceil((maxR - minR + 1) / 4) * 4 // ×4 ⇒ row offset + density preserved
    return flipped.map(({ col, row, fill }) => ({ col, row: row + side * dr, fill }))
  },

  // Snap a dragged copy's origin so every motif bead lands on an existing node.
  snapPlace: (geo, x, y, pl) => {
    let r = Math.round((y - geo.padY) / geo.Py)
    if ((((r - pl.baseR) % 2) + 2) % 2 === 1) r += (y - geo.padY) / geo.Py > r ? 1 : -1
    const off = (r % 2) * geo.rowOffset
    let c = Math.round((x - geo.padX - off) / geo.Px)
    const dHalf = ((((r - pl.baseR) / 2) % 2) + 2) % 2
    if (((c - pl.baseC + dHalf) % 2 + 2) % 2 === 1) c += (x - geo.padX - off) / geo.Px > c ? 1 : -1
    return { c, r }
  },
})
