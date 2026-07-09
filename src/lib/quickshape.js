// QuickShape — Procreate-style hold-to-snap shape fitting. Pure geometry:
// doc-space stroke points in → an ideal shape out, plus outline sampling (for
// painting it onto the bead lattice) and drag-to-adjust. No canvas/React here.
//
// fitShape(pts, minLen) → shape | null
//   shape.type: 'line' | 'ellipse' (circle = rx===ry) | 'rect' (square = w===h)
//               | 'poly' (triangle or n-gon through detected corners)
// shapeOutline(shape, step) → dense points along the ideal outline; step is the
//   caller's lattice pitch fraction so painting catches every bead it crosses.
// adjustShape(shape, anchor, p) → new shape following a drag from anchor to p.
// shapeLabel(shape) → user-facing name for the snap toast.

const TAU = Math.PI * 2
const hyp = (dx, dy) => Math.hypot(dx, dy)

function pathLength(pts) {
  let L = 0
  for (let i = 1; i < pts.length; i++) L += hyp(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
  return L
}

// Resample a polyline to n evenly spaced points (keeps overall geometry,
// removes speed-of-hand bias so corner/roundness tests are stable).
function resample(pts, n) {
  const L = pathLength(pts)
  if (!L) return null
  const step = L / (n - 1)
  const out = [{ ...pts[0] }]
  let need = step
  for (let i = 1; i < pts.length && out.length < n; i++) {
    let a = pts[i - 1]
    const b = pts[i]
    let seg = hyp(b.x - a.x, b.y - a.y)
    while (seg >= need && out.length < n) {
      const t = need / seg
      const q = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
      out.push(q)
      a = q
      seg -= need
      need = step
    }
    need -= seg
  }
  while (out.length < n) out.push({ ...pts[pts.length - 1] })
  return out
}

// Light 3-point smoothing (closed loop) — kills pen/pointer jitter so a wobbly
// hand circle doesn't read as a many-cornered polygon.
function smoothClosed(P) {
  const n = P.length
  return P.map((p, i) => {
    const a = P[(i - 1 + n) % n]
    const b = P[(i + 1) % n]
    return { x: (a.x + p.x * 2 + b.x) / 4, y: (a.y + p.y * 2 + b.y) / 4 }
  })
}

// Max perpendicular deviation of the loop between two corner indices from the
// straight chord joining them, relative to the chord length. Straight sides
// (hand wobble) stay ≲0.04; an arc bulges far more (90° arc ≈ 0.21).
function sideBulge(P, i0, i1) {
  const n = P.length
  const a = P[i0]
  const b = P[i1]
  const chord = hyp(b.x - a.x, b.y - a.y) || 1
  let worst = 0
  for (let i = (i0 + 1) % n; i !== i1; i = (i + 1) % n) {
    const d = Math.abs((P[i].x - a.x) * (b.y - a.y) - (P[i].y - a.y) * (b.x - a.x)) / chord
    if (d > worst) worst = d
  }
  return worst / chord
}

// Indices of corners on a CLOSED resampled loop: local maxima of the turning
// angle over a small window, above the corner threshold, spaced apart.
function detectCorners(P) {
  const n = P.length
  const k = Math.max(3, Math.round(n / 24))
  const turn = new Array(n)
  for (let i = 0; i < n; i++) {
    const a = P[(i - k + n) % n]
    const b = P[i]
    const c = P[(i + k) % n]
    const v1x = b.x - a.x, v1y = b.y - a.y
    const v2x = c.x - b.x, v2y = c.y - b.y
    const m = hyp(v1x, v1y) * hyp(v2x, v2y) || 1
    turn[i] = Math.acos(Math.max(-1, Math.min(1, (v1x * v2x + v1y * v2y) / m)))
  }
  const TH = (48 * Math.PI) / 180
  const cand = []
  for (let i = 0; i < n; i++) {
    if (turn[i] < TH) continue
    // local max over ±k (circular)
    let best = true
    for (let j = -k; j <= k && best; j++) if (turn[(i + j + n) % n] > turn[i]) best = false
    if (best) cand.push(i)
  }
  // merge candidates closer than n/10 apart (keep the sharper one)
  const minGap = n / 10
  const out = []
  for (const i of cand) {
    const prev = out[out.length - 1]
    if (prev != null && i - prev < minGap) {
      if (turn[i] > turn[prev]) out[out.length - 1] = i
    } else out.push(i)
  }
  // circular wrap: first vs last
  if (out.length > 1 && out[0] + n - out[out.length - 1] < minGap) {
    if (turn[out[0]] >= turn[out[out.length - 1]]) out.pop()
    else out.shift()
  }
  return out
}

const snapAngle = (a, tolDeg = 8) => {
  const step = Math.PI / 2
  const s = Math.round(a / step) * step
  return Math.abs(a - s) < (tolDeg * Math.PI) / 180 ? s : a
}

export function fitShape(raw, minLen) {
  if (!raw || raw.length < 6) return null
  const L = pathLength(raw)
  if (L < minLen) return null
  const first = raw[0]
  const last = raw[raw.length - 1]
  const closed = hyp(last.x - first.x, last.y - first.y) < Math.max(L * 0.2, minLen * 0.5)

  if (!closed) {
    // open stroke → straight line between the endpoints
    return { type: 'line', x1: first.x, y1: first.y, x2: last.x, y2: last.y }
  }

  let P = resample(raw, 96)
  if (!P) return null
  P = smoothClosed(P)
  let cx = 0, cy = 0
  for (const p of P) { cx += p.x; cy += p.y }
  cx /= P.length
  cy /= P.length

  let corners = detectCorners(P)
  // a polygon's sides must be STRAIGHT — if the stretches between "corners"
  // bulge like arcs, the corners are wobble on a round shape → ellipse instead
  if (corners.length >= 3 && corners.length <= 8) {
    const bulges = corners.map((i0, j) => sideBulge(P, i0, corners[(j + 1) % corners.length]))
    bulges.sort((a, b) => a - b)
    if (bulges[Math.floor(bulges.length / 2)] > 0.07) corners = []
  }
  if (corners.length >= 3 && corners.length <= 8) {
    const pts = corners.map((i) => P[i])
    if (corners.length === 4) {
      // quadrilateral → try a (rotated) rectangle: edge directions must pair up
      const dirs = pts.map((p, i) => {
        const q = pts[(i + 1) % 4]
        return Math.atan2(q.y - p.y, q.x - p.x)
      })
      const d = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)))
      const para = (a, b) => Math.min(d(a, b), Math.PI - d(a, b))
      if (para(dirs[0], dirs[2]) < 0.26 && para(dirs[1], dirs[3]) < 0.26) {
        // rectangle frame: rotation from the longer edge pair, snapped upright
        let rot = snapAngle(Math.atan2(Math.sin(dirs[0]), Math.cos(dirs[0])), 10)
        const c = Math.cos(rot), s = Math.sin(rot)
        let hw = 0, hh = 0
        for (const p of pts) {
          hw += Math.abs((p.x - cx) * c + (p.y - cy) * s)
          hh += Math.abs(-(p.x - cx) * s + (p.y - cy) * c)
        }
        hw /= 4; hh /= 4
        if (Math.abs(hw - hh) < 0.15 * Math.max(hw, hh)) hw = hh = (hw + hh) / 2 // square
        return { type: 'rect', cx, cy, hw, hh, rot }
      }
    }
    return { type: 'poly', cx, cy, pts }
  }

  // roundish → ellipse via the principal axes of the boundary points
  let sxx = 0, syy = 0, sxy = 0
  for (const p of P) {
    const dx = p.x - cx, dy = p.y - cy
    sxx += dx * dx; syy += dy * dy; sxy += dx * dy
  }
  sxx /= P.length; syy /= P.length; sxy /= P.length
  let rot = 0.5 * Math.atan2(2 * sxy, sxx - syy)
  const c = Math.cos(rot), s = Math.sin(rot)
  // variance along the axes; a uniform ellipse boundary has var = r²/2
  const vu = c * c * sxx + 2 * c * s * sxy + s * s * syy
  const vv = s * s * sxx - 2 * c * s * sxy + c * c * syy
  let rx = Math.sqrt(Math.max(vu, 0) * 2)
  let ry = Math.sqrt(Math.max(vv, 0) * 2)
  if (!rx || !ry) return null
  if (Math.abs(rx - ry) < 0.18 * Math.max(rx, ry)) { rx = ry = (rx + ry) / 2; rot = 0 } // circle
  else rot = snapAngle(rot)
  return { type: 'ellipse', cx, cy, rx, ry, rot }
}

export function shapeOutline(shape, step) {
  const out = []
  const seg = (a, b) => {
    const len = hyp(b.x - a.x, b.y - a.y)
    const n = Math.max(1, Math.ceil(len / step))
    for (let i = 0; i <= n; i++) out.push({ x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n })
  }
  if (shape.type === 'line') {
    seg({ x: shape.x1, y: shape.y1 }, { x: shape.x2, y: shape.y2 })
  } else if (shape.type === 'ellipse') {
    const c = Math.cos(shape.rot), s = Math.sin(shape.rot)
    const n = Math.max(24, Math.ceil((TAU * Math.max(shape.rx, shape.ry)) / step))
    for (let i = 0; i <= n; i++) {
      const t = (TAU * i) / n
      const ex = Math.cos(t) * shape.rx
      const ey = Math.sin(t) * shape.ry
      out.push({ x: shape.cx + ex * c - ey * s, y: shape.cy + ex * s + ey * c })
    }
  } else if (shape.type === 'rect') {
    const { cx, cy, hw, hh, rot } = shape
    const c = Math.cos(rot), s = Math.sin(rot)
    const corner = (u, v) => ({ x: cx + u * hw * c - v * hh * s, y: cy + u * hw * s + v * hh * c })
    const cs = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)]
    for (let i = 0; i < 4; i++) seg(cs[i], cs[(i + 1) % 4])
  } else if (shape.type === 'poly') {
    for (let i = 0; i < shape.pts.length; i++) seg(shape.pts[i], shape.pts[(i + 1) % shape.pts.length])
  }
  return out
}

// Drag-to-adjust while the pen stays down: the shape follows the pointer from
// the hold point (anchor). Lines move their end; rects/ellipses re-derive their
// extents from the pointer (in their own rotated frame — dragging a corner
// resizes both axes); polys scale uniformly about their centroid.
export function adjustShape(shape, anchor, p) {
  if (shape.type === 'line') return { ...shape, x2: p.x, y2: p.y }
  const cx = shape.cx, cy = shape.cy
  if (shape.type === 'ellipse') {
    const c = Math.cos(shape.rot), s = Math.sin(shape.rot)
    const circle = shape.rx === shape.ry
    if (circle) return { ...shape, rx: hyp(p.x - cx, p.y - cy), ry: hyp(p.x - cx, p.y - cy) }
    const du = Math.abs((p.x - cx) * c + (p.y - cy) * s)
    const dv = Math.abs(-(p.x - cx) * s + (p.y - cy) * c)
    return { ...shape, rx: Math.max(du, 1e-3), ry: Math.max(dv, 1e-3) }
  }
  if (shape.type === 'rect') {
    const c = Math.cos(shape.rot), s = Math.sin(shape.rot)
    const square = shape.hw === shape.hh
    let hw = Math.abs((p.x - cx) * c + (p.y - cy) * s)
    let hh = Math.abs(-(p.x - cx) * s + (p.y - cy) * c)
    if (square) hw = hh = Math.max(hw, hh)
    return { ...shape, hw: Math.max(hw, 1e-3), hh: Math.max(hh, 1e-3) }
  }
  if (shape.type === 'poly') {
    const r0 = hyp(anchor.x - cx, anchor.y - cy) || 1
    const f = hyp(p.x - cx, p.y - cy) / r0
    return { ...shape, pts: shape.pts.map((q) => ({ x: cx + (q.x - cx) * f, y: cy + (q.y - cy) * f })) }
  }
  return shape
}

export function shapeLabel(shape) {
  if (shape.type === 'line') return 'Line'
  if (shape.type === 'ellipse') return shape.rx === shape.ry ? 'Circle' : 'Ellipse'
  if (shape.type === 'rect') return shape.hw === shape.hh ? 'Square' : 'Rectangle'
  return shape.pts.length === 3 ? 'Triangle' : 'Polygon'
}
