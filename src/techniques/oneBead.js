// 1-bead technique (loom / square-stitch look). An ALIGNED grid of bead-shaped
// cells: straight rows & columns, no stagger, no tilt, every cell filled (full
// density). The only structural difference from the 3-bead weave is the grid —
// every other feature is shared (see DESIGN_DECISIONS "Multi-technique website").
import { defineTechnique } from './defineTechnique'

// Packing measured from assets/beadwork 1 grid.png (scripts/measure1grid.mjs):
// aligned grid with small even gaps both axes. Tunable against the reference.
const PACK_X = 1.235 // horizontal centre-to-centre / bead width
const PACK_Y = 1.273 // vertical centre-to-centre / bead height
const existsAll = () => true // full density: every cell holds a bead

export default defineTechnique({
  id: '1bead',
  label: '1-bead (loom)',
  subtitle: '1-BEAD TECHNIQUE',
  exists: existsAll,
  beadShapeN: 3.4, // boxier silhouette — loom / square-stitch look (tunable)
  packX: PACK_X,
  packY: PACK_Y,
  stagger: false,
  hitCell: true, // gaps between beads → the whole cell is paintable, not just the oval

  // no tilt — beads sit upright in a straight grid
  tiltFor: () => 0,

  // flood fill = the 4 orthogonal neighbours
  floodNeighbors: (col, row) => [
    { col: col - 1, row },
    { col: col + 1, row },
    { col, row: row - 1 },
    { col, row: row + 1 },
  ],

  // straight grid: only the horizontal + vertical axes are lattice lines
  snapAxes: (geo) => [
    { ux: 1, uy: 0, pitch: geo.Px },
    { ux: 0, uy: 1, pitch: geo.Py },
  ],

  // ---- motif placement / pattern parity ----
  // Every cell exists, so there is no parity constraint: origins and pitches
  // pass through unchanged and a copy can land on any cell.
  snapMotifOrigin: (minC, minR) => ({ minC, minR }),
  copyStartOffset: { dc: 1, dr: 1 },
  evenUp: (n) => n,
  patternHalf: (n) => Math.max(1, Math.floor(n / 2)),

  snapPlace: (geo, x, y) => ({
    c: Math.round((x - geo.padX) / geo.Px),
    r: Math.round((y - geo.padY) / geo.Py),
  }),

  // Mirror = a flipped DUPLICATE placed beside the original. Every cell exists
  // and rows are aligned, so it's a plain reflection about the far edge of the
  // bounding box: reflect within [mn,mx], then shift one span over so the copy
  // sits next to the original. `side` = +1 (right / down) or −1 (left / up).
  mirror: (cells, dir, side = 1) => {
    const axis = dir === 'h' ? 'col' : 'row'
    let mn = Infinity, mx = -Infinity
    for (const c of cells) {
      if (c[axis] < mn) mn = c[axis]
      if (c[axis] > mx) mx = c[axis]
    }
    const span = mx - mn + 1
    // reflect about mn (→ mx−(v−mn)), then translate one span to the chosen side
    const map = (v) => mx - (v - mn) + side * span
    return dir === 'h'
      ? cells.map(({ col, row, fill }) => ({ col: map(col), row, fill }))
      : cells.map(({ col, row, fill }) => ({ col, row: map(row), fill }))
  },
})
