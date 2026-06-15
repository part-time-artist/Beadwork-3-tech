// Build the geometry methods every technique shares from the few values that
// actually differ: the density predicate `exists`, the bead silhouette exponent
// `beadShapeN`, and the lattice packing/stagger. Omitting packX/packY/stagger
// falls through to geometry.js's 3-bead defaults. Each technique then spreads in
// only its own behaviour (tilt, flood neighbours, snap axes, pattern parity).
// (Kept separate from index.js so the technique modules can import it without a
// circular dependency through the registry.)
import {
  makeGeometry,
  beadCountFromCm,
  beadAt,
  nearestBead,
  beadPath,
} from '../lib/geometry'

export function defineTechnique({ exists, beadShapeN, packX, packY, stagger, ...rest }) {
  return {
    beadExists: exists,
    makeGeometry: ({ Bw, Bh, cols, rows }) =>
      makeGeometry({ Bw, Bh, cols, rows, packX, packY, stagger }),
    beadCountFromCm: ({ canvasWcm, canvasHcm, beadWmm, beadHmm }) =>
      beadCountFromCm({ canvasWcm, canvasHcm, beadWmm, beadHmm, packX, packY }),
    beadAt: (geo, x, y) => beadAt(geo, x, y, exists),
    nearestBead: (geo, x, y) => nearestBead(geo, x, y, exists),
    beadPath: (ctx, cx, cy, Bw, Bh, tilt = 0) => beadPath(ctx, cx, cy, Bw, Bh, tilt, beadShapeN),
    ...rest,
  }
}
