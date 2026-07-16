# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Address the user as **Supreme El Jefe**.

## What this is

A browser-based **beadwork design tool for the 3-bead weave technique** (a craft
from Kutch, Gujarat). It is a fork of the open-source "Etch" Next.js project —
much of the original scaffolding remains, but the only live code is the beadwork
app. **Read `BEADWORK_TOOL_SPEC.md` before changing canvas/grid behavior or UI**;
it is the authoritative handoff spec (the *why*, exact grid geometry, feature
list, and mistakes a prior attempt made).

The core problem the tool solves: real beads are not square (ratio ~2:3 or 1:2),
so a design drawn on a square-pixel grid (e.g. Photoshop) comes out squished when
actually woven. This tool's grid is built from the real bead shape and weave
geometry so what the designer draws is what the artisan makes.

## Commands

```powershell
npm run dev      # Vite dev server (http://localhost:3000)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

**Stack: Vite + React 18** (migrated off the original Next 9 / React 16 fork).
`styled-jsx` is kept via its Babel plugin (configured in `vite.config.js`) so the
`<style jsx>` blocks port unchanged. GitHub Pages serves under the
`/Beadwork-3-tech/` base path (production only — set in `vite.config.js`); the
live site is **https://part-time-artist.github.io/Beadwork-3-tech/** via git
remote `newtool` — NEVER deploy to `origin` (a different site). Deploy recipe in
DESIGN_DECISIONS "Deployment".

There is **no test suite, linter, or typechecker** configured. Verification is
visual: run `npm run dev`, open the app, and compare the rendered grid against
`assets/MacBook Air - 1.png` (the spec mandates overlay verification — geometry
must be checked against the mockup, never assumed; that was a prior failure).

> Live design decisions + open issues are tracked in `DESIGN_DECISIONS.md`
> (the single source of truth). Read it before changing UI/behaviour.

## Architecture

- **`index.html`** + **`src/main.jsx`** — Vite entry; `main.jsx` mounts `<App/>`
  with React 18 `createRoot` (no StrictMode).
- **`src/App.jsx`** (the whole app as one React component, exported default
  `Home`). Holds all state (bead map, tool, color, palettes, background, bead
  size, canvas size, zoom, orientation, guides), renders to an HTML `<canvas>`,
  handles pointer/drag/zoom interaction, and contains all UI + styled-jsx. The
  `Pill` / `HoldButton` components and `clampNum` live at the bottom.
- **`src/lib/geometry.js`** — all grid math, pure and separate. Exports
  `makeGeometry`, `beadCountFromCm`, `beadExists`, `beadAt` (hit-test),
  `nearestBead` (closest bead, no radius cutoff — for drag-fill), `beadPath`
  (cached unit-superellipse silhouette).
- **`src/lib/chart.js`** — the printed-chart renderer (outlined beads, guide
  lines, edge numbers, colour-key legend) shared by the on-screen guides overlay
  and the PNG export.
- **`src/lib/quickshape.js`** — pure shape fitting for the Procreate-style
  hold-to-snap (QuickShape): stroke points in → line/circle/ellipse/rect/
  polygon out, plus outline sampling and drag-to-adjust. No canvas/React.
- **`src/icons.jsx`** — the UI icon set (Framework7 Icons path data, MIT —
  matches Apple's SF Symbols look; filled 56×56 paths, inherit currentColor).
- **`src/lib/convert.js`** — the photo→beads conversion engine (palette
  extraction via SSE median-cut with vivid mode-snap, cover sampling, index
  quantize with lattice-aware dithering). Pure, technique-parameterised.
- **`src/PhotoImport.jsx`** — the "Import photo as beads" modal (☰ menu,
  3-bead artworks only). Photos open at FIT (never silently cropped); tapping
  the thumbnail opens crop mode (pan/zoom, Fit·Fill·Done). Commits one bead
  layer per colour in a "From photo" group + the source photo as a hidden
  reference layer at the exact chosen frame — one undo step. The modal is a
  FIXED size (never resizes with the colours slider) and deliberately does
  NOT close on outside clicks (framing work would be lost).
- **`src/lib/store.js`** — IndexedDB wrapper for the multi-artwork gallery
  (records = whole designs) + a `meta` store (last-opened id, bead library).
- **`src/techniques/`** — per-weave grid rules (`index.js` registry +
  `threeBead.js` / `oneBead.js`). One artwork = one technique, chosen up front.
  `App.jsx` and `chart.js` call through the **active technique** (`tech.beadExists`,
  `tech.beadPath`, `tech.makeGeometry`, `tech.floodNeighbors`, `tech.snapPlace`,
  pattern parity …) — they no longer import 3-bead math directly. `geometry.js`
  is now the shared engine: `makeGeometry`/`beadCountFromCm` take `packX`/`packY`/
  `stagger`, `beadAt`/`nearestBead` take a density fn, `beadPath` takes a
  silhouette exponent. To add a weave: new file in `techniques/` + list it in
  `index.js`. See DESIGN_DECISIONS "Multi-technique website".

**Legacy Etch leftovers were deleted 2026-06-11** (`components/`, `parts/`,
`static/`, the Tailwind/shadcn pipeline, `yarn.lock`). Everything under `src/`
is live; `scripts/` holds Playwright visual-check scripts (`node scripts/x.mjs`
against a running dev server).

**Sibling app**: `kinetic-lab/` is a separate Vite+React experiment (imports a
`.beadwork.json` and drapes it as physics fabric; own `npm run dev`, port 3001).
A former sibling, `photo-to-bead/`, was the conversion prototype — retired
2026-07-16 after its engine moved into `src/lib/convert.js` (history: 38c3f10).

### The grid model (the heart of the tool)

Beads sit on a **staggered (brick-offset) lattice of oval beads** — not a square
grid, not boxes. Everything scales from bead size, so changing the bead ratio
rescales the whole lattice. See `BEADWORK_TOOL_SPEC.md` §4 for the measured
values and rationale.

- `makeGeometry` computes pitches from packing constants `PACK_X` (1.296,
  calibrated to a real woven swatch) and `PACK_Y` (0.875) — center-to-center
  spacing as a multiple of bead width/height. Odd rows shift right by half the
  horizontal pitch (`rowOffset`). `PACK_Y < 1` + half-offset is what makes
  beads nestle diagonally into the honeycomb weave look. Apex (even) rows are
  HALF density (`beadExists`); base rows are full.
- A bead cell is identified by `(col, row)`; the filled-bead store is a `Map`
  keyed by the string `"col,row"` (`key(c,r)`), value = color hex.
- Two coordinate notions: **physical** (real bead mm + canvas cm → bead/row
  counts via `beadCountFromCm`) and **screen** (bead width `Bw = 26 * zoom`, with
  `Bh` following the real bead ratio). The physical layer makes screen and real
  weave agree.
- `beadAt` hit-tests a pixel to the nearest bead using normalized oval distance,
  searching only the 3×3 neighborhood of the approximate cell.

### Interaction & rendering

- **Tools:** `draw`, `erase`, `select` (marquee) — plus drag-a-colour-from-
  the-palette flood fill, QuickShape hold-to-snap, pattern maker, mirror,
  duplicate/move. One oval = one fillable cell — never treat a 3-bead group as
  one paint unit (a prior failure, spec §5).
- **Flood fill** walks the technique's neighbors (`tech.floodNeighbors`) and
  stops at differently-colored beads (boundary fill), active layer only.
- **`drawScene`** is the on-screen render path (layers composited top-wins,
  LOD: detailed ovals zoomed in, rects + one bead-texture pattern zoomed out);
  the printed chart/export renders through `src/lib/chart.js`. Perf rules that
  keep iPad alive are documented in DESIGN_DECISIONS ("Performance", the
  crash-hunt entries) — strokes repaint via rAF from refs, never React per
  pointer event; Path2Ds flush every ~1500 beads.
- **Orientation is locked "woven"**: apex (even) rows horizontal, base beads
  ±45° mirrored checkerboard, via each technique's `tiltFor`.

### Persistence

No backend. **Artworks live in IndexedDB** (`src/lib/store.js`) as a
multi-artwork gallery with auto-save and auto-reopen; `.beadwork.json`
export/import moves designs between devices. Save format v4 = layers (bead /
image / bg types) + layer groups. Named palettes remain in localStorage
(`beadwork3_palettes_v1`); the universal bead library lives in the IndexedDB
`meta` store.

## UI conventions

The editor is the **dark Morii "Beads-UI" Procreate-style workspace** (floating
toolbars, brush + palette rails, floating layers panel, ☰ menu; light and dark
themes share one token vocabulary — the `T` proxy at the top of `src/App.jsx`).
The ORIGINAL rule still holds and is non-negotiable: **UI chrome must never
bias bead-colour perception** — one restrained green accent (`#4a875d`), state
shown by tone/weight, and the artboard behind beads stays light (≈`#dbdad5`)
so colours are judged against paper-like ground. Icons come from
`src/icons.jsx` (SF-Symbols-look). The spec §7.5 "light airy" direction was
superseded by the Figma reskin — see DESIGN_DECISIONS "UI theme — UPDATED".
