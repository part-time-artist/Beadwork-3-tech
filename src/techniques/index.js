// Technique registry. One artwork = one technique, chosen up front; the grid is
// the only thing that differs between techniques (DESIGN_DECISIONS
// "Multi-technique website"). Each technique supplies geometry, bead shape/tilt,
// flood-fill neighbours and pattern/placement parity; App.jsx and the chart
// renderer call through the active technique instead of importing 3-bead math.
// The shared geometry-method factory lives in ./defineTechnique.
import threeBead from './threeBead'
import oneBead from './oneBead'

export const TECHNIQUES = [threeBead, oneBead]
export const DEFAULT_TECHNIQUE = '3bead'

export function getTechnique(id) {
  return TECHNIQUES.find((t) => t.id === id) || threeBead
}
