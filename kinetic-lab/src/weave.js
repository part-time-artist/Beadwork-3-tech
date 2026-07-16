// Weave geometry — a small hand-kept copy of the main tool's pure math
// (source: ../src/lib/geometry.js + ../src/techniques/{threeBead,oneBead}.js).
// The kinetic lab is its own Vite app with its own deploy, so it carries its
// own copy instead of importing across the two roots. If the main tool's
// packing constants ever change, update them here too.

export const PACKED_DRAW = 1.2 // max packed-view enlargement (same as main tool)

const TECHNIQUES = {
  '3bead': {
    id: '3bead',
    label: '3-bead weave',
    packX: 1.296, // horizontal centre-to-centre / bead width
    packY: 0.875, // vertical row pitch / bead height
    stagger: true, // odd rows shift right by half the horizontal pitch
    shapeN: 2.4, // superellipse exponent — soft oval
    // Base rows (odd) fully packed; apex rows (even) half-density.
    exists: (col, row) =>
      row % 2 === 1 || (((col + row / 2) % 2) + 2) % 2 === 1,
    // Apex rows lie horizontal; tilted rows mirror ±45° in a checkerboard.
    tiltFor: (col, row) => {
      if (row % 2 === 0) return Math.PI / 2
      const A = Math.PI / 4
      return ((row + 1) / 2 + col) % 2 === 1 ? -A : A
    },
  },
  '1bead': {
    id: '1bead',
    label: '1-bead grid',
    packX: 1.235,
    packY: 1.273,
    stagger: false,
    shapeN: 3.4, // boxier loom bead
    exists: () => true,
    tiltFor: () => 0,
  },
}

export const getTechnique = (id) => TECHNIQUES[id] || TECHNIQUES['3bead']

// Physical canvas (cm) + bead (mm) → bead/row counts, same as the main tool.
export function beadCountFromCm({ canvasWcm, canvasHcm, beadWmm, beadHmm, packX, packY }) {
  const pitchXmm = packX * beadWmm
  const pitchYmm = packY * beadHmm
  const cols = Math.max(1, Math.round((canvasWcm * 10) / pitchXmm))
  const rows = Math.max(1, Math.round((canvasHcm * 10) / pitchYmm))
  return { cols, rows }
}

// Lattice metrics in an arbitrary px scale (Bw = bead width in px).
export function makeGeometry({ Bw, Bh, cols, rows, packX, packY, stagger, padScale = 0.75 }) {
  const Px = packX * Bw
  const Py = packY * Bh
  const rowOffset = stagger ? Px / 2 : 0
  const padX = Bw * padScale
  const padY = Bh * padScale
  const centerFor = (col, row) => ({
    cx: padX + col * Px + (row % 2) * rowOffset,
    cy: padY + row * Py,
  })
  const width = padX * 2 + (cols - 1) * Px + rowOffset
  const height = padY * 2 + (rows - 1) * Py
  return { Px, Py, rowOffset, padX, padY, centerFor, width, height, Bw, Bh, cols, rows }
}

// Cached unit superellipse silhouette (n = exponent; 2 = ellipse).
const UNIT_BEAD_CACHE = new Map()
export function unitBead(n) {
  let pts = UNIT_BEAD_CACHE.get(n)
  if (pts) return pts
  const steps = 36
  pts = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const ct = Math.cos(t)
    const st = Math.sin(t)
    pts.push([
      Math.sign(ct) * Math.pow(Math.abs(ct), 2 / n),
      Math.sign(st) * Math.pow(Math.abs(st), 2 / n),
    ])
  }
  UNIT_BEAD_CACHE.set(n, pts)
  return pts
}

// ---------------------------------------------------------------------------
// .beadwork.json parsing — accepts every save version the main tool produced:
// v1 { beads: [...] }, v2 { layers: bead-only }, v3 { layers typed }, v4 (+groups).
// Returns null if the object doesn't look like a design.
export function parseDesign(d) {
  if (!d || typeof d !== 'object') return null
  if (!Array.isArray(d.beads) && !Array.isArray(d.layers)) return null

  const tech = getTechnique(d.technique)
  const canvasCm = d.canvasCm && d.canvasCm.w ? d.canvasCm : { w: 10, h: 7 }
  const beadMM = d.beadMM && d.beadMM.w ? d.beadMM : { w: 1.05, h: 1.3125 }
  const pack = typeof d.pack === 'number' ? Math.min(1, Math.max(0, d.pack)) : 0.75

  // Hidden groups hide their member layers (v4).
  const hiddenGroups = new Set(
    (Array.isArray(d.groups) ? d.groups : [])
      .filter((g) => g && g.visible === false)
      .map((g) => g.id)
  )

  // Flatten visible bead layers bottom→top; later (higher) layers overwrite.
  const beads = new Map()
  if (Array.isArray(d.layers)) {
    for (const l of d.layers) {
      if (!l || (l.type && l.type !== 'bead')) continue
      if (l.visible === false || hiddenGroups.has(l.groupId)) continue
      if (!Array.isArray(l.beads)) continue
      for (const [k, color] of l.beads) beads.set(k, color)
    }
  } else {
    for (const [k, color] of d.beads) beads.set(k, color)
  }

  const { cols, rows } = beadCountFromCm({
    canvasWcm: canvasCm.w,
    canvasHcm: canvasCm.h,
    beadWmm: beadMM.w,
    beadHmm: beadMM.h,
    packX: tech.packX,
    packY: tech.packY,
  })

  return {
    name: d.name || 'untitled',
    technique: tech.id,
    canvasCm,
    beadMM,
    pack,
    palette: Array.isArray(d.palette) && d.palette.length ? d.palette : null,
    beads,
    cols,
    rows,
  }
}

// A built-in demo design (diagonal stripes in the studio's 5 colours) so the
// lab opens alive before anything is imported.
export function demoDesign() {
  const palette = ['#F3CEDE', '#D8DA5F', '#8BBEDD', '#F4EEDF', '#4A3772']
  const tech = getTechnique('3bead')
  const canvasCm = { w: 8, h: 6 }
  const beadMM = { w: 3, h: 3.75 }
  const { cols, rows } = beadCountFromCm({
    canvasWcm: canvasCm.w,
    canvasHcm: canvasCm.h,
    beadWmm: beadMM.w,
    beadHmm: beadMM.h,
    packX: tech.packX,
    packY: tech.packY,
  })
  const beads = new Map()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!tech.exists(c, r)) continue
      const stripe = Math.floor((c + r / 2) / 3) % palette.length
      beads.set(`${c},${r}`, palette[(stripe + palette.length) % palette.length])
    }
  }
  return {
    name: 'demo stripes',
    technique: '3bead',
    canvasCm,
    beadMM,
    pack: 0.75,
    palette,
    beads,
    cols,
    rows,
  }
}
