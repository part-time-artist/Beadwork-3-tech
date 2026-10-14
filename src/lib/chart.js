// Printed-chart rendering for the artisan deliverable. The on-screen editing
// canvas and the exported PNG/PDF share the bead-drawing helpers here so the
// screen and the print never diverge (CLAUDE.md). All chart layout is done in
// millimetres and rasterised at PX_PER_MM so a bead prints at a fixed real size.
//
// See BEADWORK_TOOL_SPEC.md and the locked design decisions in
// ~/.claude/plans/distinch-and-with-outlines-curried-eich.md.

import { getTechnique } from '../techniques'

export const PX_PER_MM = 11.81 // ~300 DPI raster
export const A4 = { w: 210, h: 297 } // mm
export const GUIDE_EVERY = 10 // bolder guide line + edge number every N beads/rows

// Browsers have a hard canvas-size ceiling and FAIL SILENTLY past it — drawing
// becomes a no-op and the exported PNG comes out blank. iPad Safari has the
// smallest ceiling (~16.7M pixels total); even a 6×6cm chart at 300 DPI sits
// right at that edge, and big canvases (up to 300cm) blow past every browser's
// limit. rasterScale(w, h) returns the factor (≤1) a canvas of that size must
// be shrunk by to stay safely inside the ceiling — full 300 DPI when it fits,
// proportionally lower resolution when it doesn't, never blank.
const MAX_CANVAS_AREA = 15e6 // pixels, safely under iPad Safari's ~16.7M
const MAX_CANVAS_DIM = 8192 // per-side ceiling, safe on all modern browsers
export function rasterScale(w, h) {
  return Math.min(1, MAX_CANVAS_DIM / w, MAX_CANVAS_DIM / h, Math.sqrt(MAX_CANVAS_AREA / (w * h)))
}

const key = (c, r) => `${c},${r}`

// Muted chart chrome (no bright accents — spec §7.5). Tuned to read on a white
// printed sheet: outlines a clear warm grey, the counting scale a strong dark ink.
const C = {
  filledOutline: 'rgba(46,43,38,0.35)', // legend swatch border only — chart beads are unoutlined
  guide: 'rgba(46,43,38,0.30)',
  number: '#33302A',
}

// --- numbering direction (DEFERRED weave-order decision lives here only) ------
// Default: horizontal rows numbered top->bottom, columns left->right. Change
// these two functions to switch direction once the studio confirms weave order.
const rowLabel = (r) => r + 1
const colLabel = (c) => c + 1

// Build a print-scale geometry: bead width fixed to printBeadMm (default 8mm),
// height following the real bead ratio. Returned dimensions are in pixels.
export function makePrintGeo({ cols, rows, printBeadMm, beadRatio, tech }) {
  const Bw = printBeadMm * PX_PER_MM
  const Bh = printBeadMm * beadRatio * PX_PER_MM
  return tech.makeGeometry({ Bw, Bh, cols, rows })
}

// --- shared bead drawing (used by screen + export) ----------------------------
// `fillScale` enlarges FILLED beads (empty cells stay true size) so the export
// reproduces the on-screen "packed" look set by the spacing slider — 1 = true
// bead size with its natural gaps, >1 = beads pressed together. Mirrors the
// drawScale in App.jsx's drawScene so screen and PNG match.
export async function drawBeads(ctx, { geo, beads, cols, rows, tiltFor, tech, fillScale = 1 }) {
  const dw = geo.Bw * fillScale
  const dh = geo.Bh * fillScale
  // Batch beads into Path2Ds (a few fills) instead of a beginPath→fill PER
  // bead — that per-bead canvas churn was the multi-second "Save PNG" freeze.
  // But we must also FLUSH every ~1500 beads: appending tens of thousands of
  // subpaths into ONE Path2D degrades super-linearly (a full chart is 100k+
  // beads, which hung for minutes), so each path is kept small and drawn as we
  // go. (On screen this never bit us — the draw is culled to the visible range.)
  // Empty cells and per-bead outlines are intentionally NOT drawn — the chart
  // shows colour only; guides + edge numbers carry the counting job instead.
  const FLUSH = 1500
  let byColor = new Map() // colour -> Path2D (filled beads, enlarged)
  let pending = 0
  const flush = () => {
    if (!pending) return
    for (const [fill, p] of byColor) { ctx.fillStyle = fill; ctx.fill(p) }
    byColor = new Map()
    pending = 0
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!tech.beadExists(col, row)) continue
      const fill = beads.get(key(col, row))
      if (!fill) continue
      const { cx, cy } = geo.centerFor(col, row)
      const tilt = tiltFor(col, row)
      let p = byColor.get(fill)
      if (!p) { p = new Path2D(); byColor.set(fill, p) }
      tech.beadOutline(p, cx, cy, dw, dh, tilt) // filled beads enlarged (packed)
      if (++pending >= FLUSH) {
        flush()
        // yield to the event loop between chunks so a big export can't freeze the
        // tab: the browser repaints (the "Preparing…" spinner) and stays
        // responsive instead of blocking the main thread for seconds.
        await new Promise((r) => setTimeout(r))
      }
    }
  }
  flush()
}

// Bolder guide lines every `every` rows/cols to chunk the grid for counting.
export function drawGuides(ctx, { geo, cols, rows, every = GUIDE_EVERY }) {
  ctx.save()
  ctx.strokeStyle = C.guide
  ctx.lineWidth = Math.max(1, geo.Bw * 0.04)
  const x0 = geo.padX - geo.Px / 2
  const x1 = geo.padX + (cols - 1) * geo.Px + geo.rowOffset + geo.Px / 2
  const y0 = geo.padY - geo.Py / 2
  const y1 = geo.padY + (rows - 1) * geo.Py + geo.Py / 2
  for (let r = 0; r <= rows; r += every) {
    const y = geo.padY + r * geo.Py - geo.Py / 2
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke()
  }
  for (let c = 0; c <= cols; c += every) {
    const x = geo.padX + c * geo.Px - geo.Px / 2
    ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke()
  }
  ctx.restore()
}

// Edge row/column numbers. mode 'margin' draws into the negative-coordinate
// margin (export); mode 'inset' draws just inside the top/left edge (screen,
// where the canvas has no margin).
export function drawNumbers(ctx, { geo, cols, rows, every = GUIDE_EVERY, mode = 'margin' }) {
  ctx.save()
  ctx.fillStyle = C.number
  ctx.strokeStyle = C.number
  const fs = Math.max(12, geo.Bw * 0.42)
  ctx.font = `700 ${fs}px -apple-system, 'Segoe UI', sans-serif`
  ctx.textBaseline = 'middle'
  ctx.lineWidth = Math.max(1.2, geo.Bw * 0.045)
  const off = mode === 'margin' ? -fs * 0.9 : fs * 0.7
  const tick = fs * 0.55
  // A count ruler on the top + left edges: the 1st, every 10th (10, 20, 30…) and
  // the LAST bead — with a tick per mark — so the artisan reads total rows/columns
  // and never loses count.
  const marks = (n) => {
    const s = new Set([0, n - 1])
    for (let i = every - 1; i < n; i += every) s.add(i)
    return [...s].sort((a, b) => a - b)
  }
  // rows down the left edge
  ctx.textAlign = mode === 'margin' ? 'right' : 'left'
  for (const r of marks(rows)) {
    const { cy } = geo.centerFor(0, r)
    ctx.fillText(String(rowLabel(r)), off, cy)
    if (mode === 'margin') { ctx.beginPath(); ctx.moveTo(-3, cy); ctx.lineTo(-3 - tick, cy); ctx.stroke() }
  }
  // columns along the top edge
  ctx.textAlign = 'center'
  ctx.textBaseline = mode === 'margin' ? 'bottom' : 'top'
  for (const c of marks(cols)) {
    const { cx } = geo.centerFor(c, 0)
    ctx.fillText(String(colLabel(c)), cx, off)
    if (mode === 'margin') { ctx.beginPath(); ctx.moveTo(cx, -3); ctx.lineTo(cx, -3 - tick); ctx.stroke() }
  }
  ctx.restore()
}

// Image backgrounds carry the user's on-screen placement as fractions of the
// bead-area size (background.t = { scale, fx, fy }), so the chart reproduces
// exactly the alignment the designer set under the beads. Drawn into the bead
// area (after the margin translate), clipped so it never spills into margins.
function paintImageBackground(ctx, W, H, img, t = { scale: 1, fx: 0, fy: 0 }) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, W, H)
  ctx.clip()
  const s = Math.max(W / img.width, H / img.height) * (t.scale || 1)
  const dw = img.width * s
  const dh = img.height * s
  ctx.drawImage(img, (W - dw) / 2 + (t.fx || 0) * W, (H - dh) / 2 + (t.fy || 0) * H, dw, dh)
  ctx.restore()
}

// Render the entire chart (beads + outlines + guides + edge numbers) to a fresh
// canvas. A margin on the top/left holds the edge numbers. Returns the canvas.
export async function renderFullChart({
  beads, cols, rows, tiltFor, tech, printBeadMm = 8, beadRatio = 1.25,
  background, composite, srcDoc, guides = true, numbers = true, every = GUIDE_EVERY, fillScale = 1,
}) {
  tech = tech || getTechnique('3bead')
  const geo = makePrintGeo({ cols, rows, printBeadMm, beadRatio, tech })
  const margin = numbers ? Math.max(16, printBeadMm * PX_PER_MM * 0.95) : 0
  const W = Math.ceil(margin + geo.width)
  const H = Math.ceil(margin + geo.height)
  const canvas = document.createElement('canvas')
  // shrink to fit the browser's canvas ceiling (see rasterScale) — layout maths
  // stay in full-resolution pixels, ctx.scale maps them onto the smaller canvas
  const scale = rasterScale(W, H)
  canvas.width = Math.ceil(W * scale)
  canvas.height = Math.ceil(H * scale)
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  if (!composite && background && background.type === 'solid') {
    ctx.fillStyle = background.color
    ctx.fillRect(0, 0, W, H)
  }
  ctx.translate(margin, margin)
  if (composite) {
    // Ordered layers (bg colour / reference images / bead Maps). Image placement
    // arrives in source-doc (screen) pixels; f maps it to the print pixel scale.
    const f = srcDoc && srcDoc.w ? geo.width / srcDoc.w : 1
    for (const item of composite) {
      if (item.type === 'color') {
        ctx.fillStyle = item.color
        ctx.fillRect(0, 0, geo.width, geo.height)
      } else if (item.type === 'image' && item.img) {
        ctx.save()
        ctx.beginPath(); ctx.rect(0, 0, geo.width, geo.height); ctx.clip()
        ctx.globalAlpha = item.opacity == null ? 1 : item.opacity
        ctx.drawImage(item.img, item.t.x * f, item.t.y * f, item.img.width * item.t.scale * f, item.img.height * item.t.scale * f)
        ctx.restore()
      } else if (item.type === 'beads') {
        await drawBeads(ctx, { geo, beads: item.map, cols, rows, tiltFor, tech, fillScale })
      }
    }
  } else {
    if (background && background.type === 'image' && background.img) {
      paintImageBackground(ctx, geo.width, geo.height, background.img, background.t)
    }
    await drawBeads(ctx, { geo, beads, cols, rows, tiltFor, tech, fillScale })
  }
  if (guides) drawGuides(ctx, { geo, cols, rows, every })
  if (numbers) drawNumbers(ctx, { geo, cols, rows, every, mode: 'margin' })
  return canvas
}

// --- colour legend ------------------------------------------------------------
export function tallyColors(beads) {
  const m = new Map()
  for (const v of beads.values()) m.set(v, (m.get(v) || 0) + 1)
  return [...m.entries()]
    .map(([color, count]) => ({ color, count }))
    .sort((a, b) => b.count - a.count)
}

// Render the legend (swatch + hex + total count per colour) to its own canvas.
//
// `width`/`height` (px) FIX the output size: when the caller passes them (the
// PNG export does, derived from the chart — which is constant for a given canvas
// size) the legend is a fixed band and colours FLOW into columns instead of the
// canvas growing taller with each extra colour. That is what makes every export
// of the same canvas pixel-identical (needed for frame-by-frame animation).
// Omit them (PDF path) and it falls back to the old single-column auto-height.
export function renderLegend(beads, { scale = PX_PER_MM, width, height, sheet = '#FFFFFF' } = {}) {
  const tally = tallyColors(beads)
  const pad = 6 * scale
  const baseRowH = 9 * scale
  const sw = 7 * scale
  const colW = 70 * scale
  const headerH = baseRowH
  const W = Math.ceil(width || colW)
  const H = Math.ceil(height || pad * 2 + (tally.length + 1) * baseRowH)
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  // sheet = the paper behind the legend; pass null for a transparent export
  if (sheet) {
    ctx.fillStyle = sheet
    ctx.fillRect(0, 0, W, H)
  }

  // How many rows fit per column; wrap into more columns as needed, and only if
  // the colours still don't fit the fixed band do we shrink the row height — so
  // the layout always fits the band exactly (size stays constant either way).
  const availH = H - pad * 2 - headerH
  const maxCols = Math.max(1, Math.floor((W - pad) / colW))
  let rowH = baseRowH
  let rowsPerCol = Math.max(1, Math.floor(availH / rowH))
  if (rowsPerCol * maxCols < tally.length) {
    rowsPerCol = Math.ceil(tally.length / maxCols)
    rowH = availH / rowsPerCol
  }
  const swat = Math.min(sw, rowH * 0.8)

  ctx.fillStyle = '#2E2B26'
  ctx.font = `700 ${4.6 * scale}px -apple-system, 'Segoe UI', sans-serif`
  ctx.textBaseline = 'middle'
  ctx.fillText('Colour key', pad, pad + headerH / 2)
  ctx.font = `500 ${Math.min(4 * scale, rowH * 0.5)}px -apple-system, 'Segoe UI', sans-serif`
  tally.forEach((t, i) => {
    const x = pad + Math.floor(i / rowsPerCol) * colW
    const y = pad + headerH + (i % rowsPerCol) * rowH + rowH / 2
    ctx.fillStyle = t.color
    ctx.strokeStyle = C.filledOutline
    ctx.lineWidth = 1
    ctx.fillRect(x, y - swat / 2, swat, swat)
    ctx.strokeRect(x, y - swat / 2, swat, swat)
    ctx.fillStyle = '#2E2B26'
    ctx.fillText(`${t.color}   ×${t.count}`, x + swat + 4 * scale, y)
  })
  return canvas
}

// --- PDF pagination -----------------------------------------------------------
// Slice the full-chart canvas into A4 printable tiles, one per page, with a page
// label footer for taping, then append a legend page. Needs a jsPDF instance.
// CAUTION (currently unused — PNG-only export is the locked decision): this
// assumes fullCanvas is rasterised at exactly PX_PER_MM, but renderFullChart now
// shrinks big charts to fit the browser canvas ceiling. If PDF export is ever
// revived, account for that scale or the printed bead size will be off.
export function buildPDF(JsPDF, { fullCanvas, beads, margin = 8, label = 'Beadwork chart' }) {
  const doc = new JsPDF({ unit: 'mm', format: 'a4' })
  const printW = A4.w - margin * 2
  const footer = 7 // mm reserved for the page label
  const printH = A4.h - margin * 2 - footer
  const s = PX_PER_MM
  const tileWpx = Math.floor(printW * s)
  const tileHpx = Math.floor(printH * s)
  const ncols = Math.max(1, Math.ceil(fullCanvas.width / tileWpx))
  const nrows = Math.max(1, Math.ceil(fullCanvas.height / tileHpx))
  const tile = document.createElement('canvas')
  const tctx = tile.getContext('2d')
  let first = true
  for (let ty = 0; ty < nrows; ty++) {
    for (let tx = 0; tx < ncols; tx++) {
      const sw = Math.min(tileWpx, fullCanvas.width - tx * tileWpx)
      const sh = Math.min(tileHpx, fullCanvas.height - ty * tileHpx)
      tile.width = sw
      tile.height = sh
      tctx.clearRect(0, 0, sw, sh)
      tctx.fillStyle = '#FFFFFF'
      tctx.fillRect(0, 0, sw, sh)
      tctx.drawImage(fullCanvas, tx * tileWpx, ty * tileHpx, sw, sh, 0, 0, sw, sh)
      if (!first) doc.addPage()
      first = false
      doc.addImage(tile, 'PNG', margin, margin, sw / s, sh / s)
      doc.setFontSize(8)
      doc.setTextColor(107, 100, 88)
      doc.text(
        `${label} — sheet r${ty + 1} c${tx + 1} of ${nrows}×${ncols}`,
        margin,
        A4.h - margin
      )
    }
  }
  // legend page
  const legend = renderLegend(beads)
  doc.addPage()
  const lw = Math.min(printW, legend.width / s)
  const lh = (legend.height / s) * (lw / (legend.width / s))
  doc.addImage(legend, 'PNG', margin, margin, lw, lh)
  return doc
}

// --- SVG export (vector — beads stay crisp at any print/zoom size) -----------
// Mirrors drawBeads/drawGuides/drawNumbers/renderLegend above, but emits SVG
// markup instead of rasterising to a canvas: no browser canvas-size ceiling to
// shrink for, and no re-pixelation when the artisan zooms or prints large.
// Beads are unoutlined here too (matches the PNG/JPEG chart).
function beadsSVG({ geo, beads, cols, rows, tiltFor, tech, fillScale = 1 }) {
  const dw = geo.Bw * fillScale
  const dh = geo.Bh * fillScale
  const byColor = new Map() // colour -> accumulated path "d" (one <path> per colour)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!tech.beadExists(col, row)) continue
      const fill = beads.get(key(col, row))
      if (!fill) continue
      const { cx, cy } = geo.centerFor(col, row)
      const d = tech.beadOutlineD(cx, cy, dw, dh, tiltFor(col, row))
      byColor.set(fill, (byColor.get(fill) || '') + d)
    }
  }
  let out = ''
  for (const [fill, d] of byColor) out += `<path d="${d}" fill="${fill}"/>`
  return out
}

function guidesSVG({ geo, cols, rows, every = GUIDE_EVERY }) {
  const x0 = geo.padX - geo.Px / 2
  const x1 = geo.padX + (cols - 1) * geo.Px + geo.rowOffset + geo.Px / 2
  const y0 = geo.padY - geo.Py / 2
  const y1 = geo.padY + (rows - 1) * geo.Py + geo.Py / 2
  const lw = Math.max(1, geo.Bw * 0.04)
  let out = ''
  for (let r = 0; r <= rows; r += every) {
    const y = (geo.padY + r * geo.Py - geo.Py / 2).toFixed(2)
    out += `<line x1="${x0.toFixed(2)}" y1="${y}" x2="${x1.toFixed(2)}" y2="${y}"/>`
  }
  for (let c = 0; c <= cols; c += every) {
    const x = (geo.padX + c * geo.Px - geo.Px / 2).toFixed(2)
    out += `<line x1="${x}" y1="${y0.toFixed(2)}" x2="${x}" y2="${y1.toFixed(2)}"/>`
  }
  return `<g stroke="${C.guide}" stroke-width="${lw.toFixed(2)}">${out}</g>`
}

function numbersSVG({ geo, cols, rows, every = GUIDE_EVERY }) {
  const fs = Math.max(12, geo.Bw * 0.42)
  const off = -fs * 0.9
  const tick = fs * 0.55
  const marks = (n) => {
    const s = new Set([0, n - 1])
    for (let i = every - 1; i < n; i += every) s.add(i)
    return [...s].sort((a, b) => a - b)
  }
  let out = ''
  for (const r of marks(rows)) {
    const { cy } = geo.centerFor(0, r)
    out += `<text x="${off.toFixed(2)}" y="${cy.toFixed(2)}" text-anchor="end" dominant-baseline="middle">${rowLabel(r)}</text>`
    out += `<line x1="-3" y1="${cy.toFixed(2)}" x2="${(-3 - tick).toFixed(2)}" y2="${cy.toFixed(2)}"/>`
  }
  for (const c of marks(cols)) {
    const { cx } = geo.centerFor(c, 0)
    out += `<text x="${cx.toFixed(2)}" y="${off.toFixed(2)}" text-anchor="middle" dominant-baseline="text-after-edge">${colLabel(c)}</text>`
    out += `<line x1="${cx.toFixed(2)}" y1="-3" x2="${cx.toFixed(2)}" y2="${(-3 - tick).toFixed(2)}"/>`
  }
  return `<g fill="${C.number}" stroke="${C.number}" stroke-width="${Math.max(1.2, geo.Bw * 0.045).toFixed(2)}" ` +
    `font-family="-apple-system, 'Segoe UI', sans-serif" font-weight="700" font-size="${fs.toFixed(2)}">${out}</g>`
}

// Build the chart's inner markup (background/images/beads + guides/numbers,
// already translated past the numbering margin) — NOT wrapped in its own
// <svg> tag, so the caller can assemble one top-level <svg> with the legend
// stacked below it (same layout exportChart uses for the PNG/JPEG path).
export async function renderFullChartSVG({
  beads, cols, rows, tiltFor, tech, printBeadMm = 8, beadRatio = 1.25,
  background, composite, srcDoc, guides = true, numbers = true, every = GUIDE_EVERY, fillScale = 1,
}) {
  tech = tech || getTechnique('3bead')
  const geo = makePrintGeo({ cols, rows, printBeadMm, beadRatio, tech })
  const margin = numbers ? Math.max(16, printBeadMm * PX_PER_MM * 0.95) : 0
  const width = Math.ceil(margin + geo.width)
  const height = Math.ceil(margin + geo.height)

  let bgSVG = ''
  let bodySVG = ''
  if (composite) {
    const f = srcDoc && srcDoc.w ? geo.width / srcDoc.w : 1
    for (const item of composite) {
      if (item.type === 'color') {
        bodySVG += `<rect x="0" y="0" width="${geo.width}" height="${geo.height}" fill="${item.color}"/>`
      } else if (item.type === 'image' && item.img) {
        const iw = item.img.width * item.t.scale * f
        const ih = item.img.height * item.t.scale * f
        bodySVG += `<image href="${item.img.src}" x="${(item.t.x * f).toFixed(2)}" y="${(item.t.y * f).toFixed(2)}" ` +
          `width="${iw.toFixed(2)}" height="${ih.toFixed(2)}" opacity="${item.opacity == null ? 1 : item.opacity}" preserveAspectRatio="none"/>`
      } else if (item.type === 'beads') {
        bodySVG += beadsSVG({ geo, beads: item.map, cols, rows, tiltFor, tech, fillScale })
      }
    }
  } else {
    if (background && background.type === 'solid') {
      bgSVG = `<rect x="0" y="0" width="${width}" height="${height}" fill="${background.color}"/>`
    }
    if (background && background.type === 'image' && background.img) {
      const img = background.img
      const t = background.t || { scale: 1, fx: 0, fy: 0 }
      const s = Math.max(geo.width / img.width, geo.height / img.height) * (t.scale || 1)
      const dw = img.width * s, dh = img.height * s
      bodySVG += `<image href="${img.src}" x="${((geo.width - dw) / 2 + (t.fx || 0) * geo.width).toFixed(2)}" ` +
        `y="${((geo.height - dh) / 2 + (t.fy || 0) * geo.height).toFixed(2)}" width="${dw.toFixed(2)}" height="${dh.toFixed(2)}" preserveAspectRatio="none"/>`
    }
    bodySVG += beadsSVG({ geo, beads, cols, rows, tiltFor, tech, fillScale })
  }

  let chrome = ''
  if (guides) chrome += guidesSVG({ geo, cols, rows, every })
  if (numbers) chrome += numbersSVG({ geo, cols, rows, every })

  const inner = bgSVG +
    `<g clip-path="url(#chartClip)" transform="translate(${margin},${margin})">${bodySVG}</g>` +
    `<g transform="translate(${margin},${margin})">${chrome}</g>` +
    `<defs><clipPath id="chartClip"><rect x="0" y="0" width="${geo.width}" height="${geo.height}"/></clipPath></defs>`
  return { inner, width, height }
}

// Legend as SVG markup (mirrors renderLegend's layout maths exactly) + the
// pixel size it was laid out for, so the caller can position it under the
// chart. `sheet` null = transparent (matches the PNG export's alpha choice).
export function renderLegendSVG(beads, { scale = PX_PER_MM, width, height, sheet = '#FFFFFF' } = {}) {
  const tally = tallyColors(beads)
  const pad = 6 * scale
  const baseRowH = 9 * scale
  const sw = 7 * scale
  const colW = 70 * scale
  const headerH = baseRowH
  const W = Math.ceil(width || colW)
  const H = Math.ceil(height || pad * 2 + (tally.length + 1) * baseRowH)
  const availH = H - pad * 2 - headerH
  const maxCols = Math.max(1, Math.floor((W - pad) / colW))
  let rowH = baseRowH
  let rowsPerCol = Math.max(1, Math.floor(availH / rowH))
  if (rowsPerCol * maxCols < tally.length) {
    rowsPerCol = Math.ceil(tally.length / maxCols)
    rowH = availH / rowsPerCol
  }
  const swat = Math.min(sw, rowH * 0.8)
  const font = `-apple-system, 'Segoe UI', sans-serif`
  let out = sheet ? `<rect x="0" y="0" width="${W}" height="${H}" fill="${sheet}"/>` : ''
  out += `<text x="${pad.toFixed(2)}" y="${(pad + headerH / 2).toFixed(2)}" dominant-baseline="middle" ` +
    `font-weight="700" font-size="${(4.6 * scale).toFixed(2)}" fill="#2E2B26" font-family="${font}">Colour key</text>`
  const fs2 = Math.min(4 * scale, rowH * 0.5)
  tally.forEach((t, i) => {
    const x = pad + Math.floor(i / rowsPerCol) * colW
    const y = pad + headerH + (i % rowsPerCol) * rowH + rowH / 2
    out += `<rect x="${x.toFixed(2)}" y="${(y - swat / 2).toFixed(2)}" width="${swat.toFixed(2)}" height="${swat.toFixed(2)}" ` +
      `fill="${t.color}" stroke="${C.filledOutline}" stroke-width="1"/>`
    out += `<text x="${(x + swat + 4 * scale).toFixed(2)}" y="${y.toFixed(2)}" dominant-baseline="middle" ` +
      `font-size="${fs2.toFixed(2)}" font-weight="500" fill="#2E2B26" font-family="${font}">${t.color}   ×${t.count}</text>`
  })
  return { svg: out, width: W, height: H }
}
