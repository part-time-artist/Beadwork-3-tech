// Verlet cloth — the physics behind the hanging fabric panel.
//
// The design's beads are NOT physics bodies (a big design has tens of
// thousands — per-bead physics can never stay smooth). Instead a coarse grid
// of nodes covers the panel; the cloth simulates only those nodes, and every
// bead's on-screen position is a bilinear blend of the 4 nodes around it.
// Node count is capped, so simulation cost is constant no matter how many
// beads the design holds.
//
// Verlet integration: each node stores its current and previous position;
// velocity is implicit (x − px). Distance constraints between neighbouring
// nodes are relaxed a few times per substep.
//
// What makes it read as BEAD FABRIC on cotton thread, not a rubber sheet:
// - structural constraints resist stretch fully, and a final STRAIN-LIMIT
//   pass hard-clamps every thread to ≤1% over rest length — cotton doesn't
//   stretch, so leftover solver stretch can't act like a spring (no bounce);
// - compression is resisted less than stretch — cloth buckles into folds
//   instead of pushing back like cardboard;
// - shear (diagonal) constraints are weaker than structural — drape;
// - weak BEND constraints (skip-one neighbours) smooth out jelly ripples
//   without stiffening the drape;
// - the sim runs in fixed 1/240s substeps regardless of display refresh,
//   so motion is equally smooth at 60/90/120 Hz.

export const SUB_DT = 1 / 240

export function makeCloth({ x0, y0, w, h, maxNodesAcross = 36, maxNodesDown = 52 }) {
  const target = Math.max(w / maxNodesAcross, h / maxNodesDown)
  const nx = Math.max(2, Math.round(w / target) + 1)
  const ny = Math.max(2, Math.round(h / target) + 1)
  const sx = w / (nx - 1)
  const sy = h / (ny - 1)

  const n = nx * ny
  const x = new Float32Array(n)
  const y = new Float32Array(n)
  const px = new Float32Array(n)
  const py = new Float32Array(n)
  const pinned = new Uint8Array(n)

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const k = j * nx + i
      x[k] = px[k] = x0 + i * sx
      y[k] = py[k] = y0 + j * sy
      if (j === 0) pinned[k] = 1 // top row hangs on the bar
    }
  }

  // Constraints stored flat as [a, b, restLength, kind, ...].
  // kind 0 = structural (row/column neighbour), kind 1 = shear (diagonal),
  // kind 2 = bend (skip-one neighbour, weak — smooths jelly ripples).
  const cons = []
  const push = (a, b, kind) => {
    const dx = x[b] - x[a]
    const dy = y[b] - y[a]
    cons.push(a, b, Math.hypot(dx, dy), kind)
  }
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const k = j * nx + i
      if (i + 1 < nx) push(k, k + 1, 0)
      if (j + 1 < ny) push(k, k + nx, 0)
      if (i + 1 < nx && j + 1 < ny) {
        push(k, k + nx + 1, 1)
        push(k + 1, k + nx, 1)
      }
      if (i + 2 < nx) push(k, k + 2, 2)
      if (j + 2 < ny) push(k, k + 2 * nx, 2)
    }
  }

  return {
    nx, ny, sx, sy, x0, y0, w, h,
    x, y, px, py, pinned,
    cons: new Float32Array(cons),
    t: 0, // simulation clock (seconds)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FABRIC FEEL — EDIT ME. These few numbers decide how the fabric behaves.
// (The dial defaults — gravity / breeze / stiffness / settle — live in a
// similar block at the top of App.jsx.)
//
// Threads come in three kinds, and each has two strengths (0 = ignores it,
// 1 = corrects it fully every pass):
//   position 1: STRUCTURAL — the warp/weft threads between neighbours.
//   position 2: SHEAR — the diagonals. LOW = drapes/folds easily like cloth,
//               HIGH = holds its shape like a stiff woven mat.
//   position 3: BEND — weak long-range smoothing. Raise it a little to iron
//               out wrinkly ripples; too high looks starched.

// How hard each thread kind resists being STRETCHED apart:
const K_STRETCH = [1.0, 0.5, 0.18] // [structural, shear, bend]

// ...and being SQUASHED together. Lower = gathers into folds more easily;
// higher = beads refuse to bunch up (stiffer surface). Structural is kept
// high so a gathered fold falls back open under gravity instead of
// springing open — squashed threads storing push-back energy reads as bounce.
const K_COMPRESS = [0.8, 0.3, 0.18]

// Cotton rule: structural threads may NEVER end up longer than rest × this.
// 1.0 = zero stretch, zero bounce. (1.05 would feel like knit elastic.)
const STRAIN_LIMIT = 1.0

// How eagerly the grabbed spot follows your pointer each substep.
// 0.55 = firm hold; lower = the fabric lags behind your hand like heavy cloth.
const GRAB_FOLLOW = 0.55
// ═══════════════════════════════════════════════════════════════════════════

// Run `nSub` fixed substeps. params: gravity (px/s²), windAmp (px/s²),
// damping (velocity keep-factor per 60Hz frame), iterations (int),
// grab ({k, x, y} | null — node k is steered toward the pointer, keeping
// its implicit velocity so the fabric can be thrown and released mid-swing).
export function clothStep(cloth, params, nSub) {
  const { x, y, px, py, pinned, cons } = cloth
  const n = x.length
  const dt = SUB_DT
  const g = params.gravity
  const damp = Math.pow(params.damping, dt * 60)
  const windAmp = params.windAmp

  for (let s = 0; s < nSub; s++) {
    cloth.t += dt
    const t = cloth.t

    // Integrate
    for (let k = 0; k < n; k++) {
      if (pinned[k]) continue
      // Wind: a slow field that varies over the panel so it ripples, not tilts.
      const wx = windAmp * (0.6 * Math.sin(1.7 * t + y[k] * 0.011) + 0.4 * Math.sin(0.9 * t + x[k] * 0.017 + 1.7))
      const nxp = x[k] + (x[k] - px[k]) * damp + wx * dt * dt
      const nyp = y[k] + (y[k] - py[k]) * damp + g * dt * dt
      px[k] = x[k]
      py[k] = y[k]
      x[k] = nxp
      y[k] = nyp
    }

    // Pointer grab: steer (not pin) the node toward the pointer. Because px/py
    // are untouched, the node keeps a real velocity — release = natural fling.
    if (params.grab) {
      const { k, x: gx, y: gy } = params.grab
      x[k] += (gx - x[k]) * GRAB_FOLLOW
      y[k] += (gy - y[k]) * GRAB_FOLLOW
    }

    // Relax constraints
    for (let it = 0; it < params.iterations; it++) {
      for (let c = 0; c < cons.length; c += 4) {
        const a = cons[c]
        const b = cons[c + 1]
        const rest = cons[c + 2]
        const kind = cons[c + 3]
        let dx = x[b] - x[a]
        let dy = y[b] - y[a]
        const d = Math.hypot(dx, dy) || 1e-6
        const stiff = d > rest ? K_STRETCH[kind] : K_COMPRESS[kind]
        const diff = ((d - rest) / d) * stiff
        const pa = pinned[a]
        const pb = pinned[b]
        if (pa && pb) continue
        const wa = pa ? 0 : pb ? 1 : 0.5
        const wb = pb ? 0 : pa ? 1 : 0.5
        dx *= diff
        dy *= diff
        x[a] += dx * wa
        y[a] += dy * wa
        x[b] -= dx * wb
        y[b] -= dy * wb
      }
    }

    // Strain limit (cotton, not elastic): whatever the relaxation left over,
    // hard-clamp every structural thread to rest length so no spring energy
    // can build up — this is what removes the bounce entirely.
    for (let pass = 0; pass < 3; pass++) {
      for (let c = 0; c < cons.length; c += 4) {
        if (cons[c + 3] !== 0) continue
        const a = cons[c]
        const b = cons[c + 1]
        const max = cons[c + 2] * STRAIN_LIMIT
        let dx = x[b] - x[a]
        let dy = y[b] - y[a]
        const d = Math.hypot(dx, dy) || 1e-6
        if (d <= max) continue
        const pa = pinned[a]
        const pb = pinned[b]
        if (pa && pb) continue
        const wa = pa ? 0 : pb ? 1 : 0.5
        const wb = pb ? 0 : pa ? 1 : 0.5
        const diff = (d - max) / d
        dx *= diff
        dy *= diff
        x[a] += dx * wa
        y[a] += dy * wa
        x[b] -= dx * wb
        y[b] -= dy * wb
      }
    }
  }
}

// Bind a point (bx, by, in the cloth's rest space) to its surrounding cell.
export function bindPoint(cloth, bx, by) {
  const { nx, ny, sx, sy, x0, y0 } = cloth
  let fi = (bx - x0) / sx
  let fj = (by - y0) / sy
  fi = Math.min(nx - 1.0001, Math.max(0, fi))
  fj = Math.min(ny - 1.0001, Math.max(0, fj))
  const i = Math.floor(fi)
  const j = Math.floor(fj)
  const u = fi - i
  const v = fj - j
  const k = j * nx + i
  return { k00: k, k10: k + 1, k01: k + nx, k11: k + nx + 1, u, v }
}

// Deformed position + local rotation of a bound point. `out` = {x, y, ang}.
export function beadPos(cloth, b, out) {
  const { x, y } = cloth
  const { k00, k10, k01, k11, u, v } = b
  const topX = x[k00] + (x[k10] - x[k00]) * u
  const topY = y[k00] + (y[k10] - y[k00]) * u
  const botX = x[k01] + (x[k11] - x[k01]) * u
  const botY = y[k01] + (y[k11] - y[k01]) * u
  out.x = topX + (botX - topX) * v
  out.y = topY + (botY - topY) * v
  // Local rotation = angle of the deformed horizontal axis at this point.
  const axX = (x[k10] - x[k00]) * (1 - v) + (x[k11] - x[k01]) * v
  const axY = (y[k10] - y[k00]) * (1 - v) + (y[k11] - y[k01]) * v
  out.ang = Math.atan2(axY, axX)
}

// Nearest grabbable (unpinned) node to a screen point. Returns index or -1.
export function nearestNode(cloth, sx, sy, maxDist) {
  const { x, y, pinned } = cloth
  let best = -1
  let bestD = maxDist * maxDist
  for (let k = 0; k < x.length; k++) {
    if (pinned[k]) continue
    const dx = x[k] - sx
    const dy = y[k] - sy
    const d = dx * dx + dy * dy
    if (d < bestD) {
      bestD = d
      best = k
    }
  }
  return best
}
