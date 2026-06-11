# Beadwork Tool — Design Decisions (living doc)

Single source of truth. Update as decisions lock so neither side re-derives
context. The `/grill-me` skill reads and appends to this file.

## Measured geometry (from the user's Figma vectors — do not guess)
- Bead intrinsic ratio **4:5 (80:100)**, w/h = 0.80. Upright bead bbox = 80×100.
- Same-row pitch 127 → `PACK_X = 1.59` (× bead width).
  **SUPERSEDED 2026-06-10:** `PACK_X = 1.296`, calibrated to the real woven
  swatch — **36 beads across 7 cm at a 1.5 mm bead** (pitch 70/36 ≈ 1.944 mm);
  beads sit denser with smaller gaps. Bead sizes offered: **1.5 mm / 3 mm**.
- Apex-to-apex row pitch 175.5 → `PACK_Y = 0.875` (× bead height).
- Base beads tilt **±45°** (from `Frame 3`, the canonical 3-bead unit).
- Tilt pattern (corrected ×3 on 2026-06-10, see `assets/rows explaination.png`):
  apex rows lie **HORIZONTAL** (rotated 90°); in tilted rows neighbouring beads
  MIRROR each other (+45/−45 alternating along the row) and the phase flips row
  to row, so alternate beads down each column mirror too — checkerboard of
  mirrored pairs (global sign flipped per user). `tiltFor` in `App.jsx`.
- Lattice occupancy: base rows (odd) fully packed; **apex rows (even) half-density**
  — node exists iff `(col + row/2)` is odd (`beadExists` in `lib/geometry.js`).

## Locked decisions (deliverable + export)
1. Deliverable: **printed coloured chart**, read bead-by-bead at the loom.
2. Every bead drawn with a **thin outline** so a run of N same-colour beads reads
   as N distinct ovals.
3. Sizing input: physical **cm** is primary; bead/row counts derive from it.
4. Chart beads: **tilted woven** (true-to-craft).
5. Print scale: **enlarged, fixed ~8 mm per bead**; large designs span sheets.
6. Place-keeping: **edge row/col numbers + bolder guide line every 10**.
7. Legend: swatch + **total bead count per colour**.
8. Export: **both** print-ready **A4 PDF** and **PNG**.
9. Screen: clean canvas + a **"Show chart guides" toggle**.
10. Export background: choice of **transparent OR on-screen** background.

## Deferred (need studio confirmation)
- **Weave order / numbering direction** — default horizontal rows top→bottom;
  isolated to `rowLabel`/`colLabel` in `lib/chart.js` for a one-spot change.

## Open issues — current problems to fix (basics-first, ordered)
1. [DONE] Canvas zoom on Ctrl/⌘+scroll, Figma-style (zoom toward cursor).
2. Sidebar redesign — clean, only the wanted features (below). Remove clutter
   (orientation toggle, redundant tabs). Keep export but tuck it away.
   Wanted feature set:
   - Canvas size + metric units
   - Bead size changeable
   - Colour palette maker
   - Draw + erase tools
   - Drag a colour from the palette onto the canvas to flood-fill a region
   - Background: solid colour / PNG image / transparent
   - Clear canvas (with a yes/no confirm dialog)
   - Save artwork
   - Selection: drag a marquee over beads to select them
3. Drag-drop colour→fill interaction.
4. Save artwork (format TBD).
5. Marquee selection of beads (+ what actions on the selection — TBD).

## Sidebar / feature decisions (LOCKED)
- Export: **keep, tucked away** in its own small Export section (not a primary).
- Save artwork: **download a .json project file** + a Load button to reopen.
- Selection actions: **recolor · copy/paste · delete** (no move for now).
- Fill: **replace the Fill tool** — flood-fill happens only by dragging a colour
  from the palette onto the canvas. Tools become Draw / Erase / Select.
- Layout: single scrollable column of clear cards (no icon-tab row), muted tokens.
- Orientation toggle removed (woven is locked); keep `orient='woven'` internally.

## Deployment (CORRECTED 2026-06-10 — the tool lives on Beadwork-3-tech)
- Live: **https://part-time-artist.github.io/Beadwork-3-tech/** (GitHub Pages,
  `gh-pages` branch). Repo: `part-time-artist/Beadwork-3-tech` = git remote
  **`newtool`**. The old `origin` (`part-time-artist/Beadworks`) hosts a
  DIFFERENT site — **never deploy the tool there** (done by mistake once,
  restored to `7095d37`).
- `vite.config.js` `base: '/Beadwork-3-tech/'` in production (must match repo).
- Redeploy: `npm run build`, then publish `dist/` via worktree:
  `git fetch newtool gh-pages` → `git worktree add --detach ../bw-ghp-new
  newtool/gh-pages` → clear it → `cp -r dist/. ../bw-ghp-new/` →
  `touch .nojekyll` → commit → `git push newtool HEAD:gh-pages` →
  `git worktree remove ../bw-ghp-new --force`. No CNAME.

## Stack — MIGRATED (Vite + React 18)
- Moved off the 2019 Next 9 / React 16 fork → **Vite 5 + React 18**. App lives in
  `src/App.jsx` + `src/lib/{geometry,chart}.js`; entry `index.html` + `src/main.jsx`.
- `styled-jsx` kept via its Babel plugin (`vite.config.js`). GH Pages base in
  `vite.config.js`. Old `pages/`, root `lib/`, `next.config.js` deleted.
- Unlocks modern UI/interaction libs (dnd-kit, Radix, Framer Motion) for future
  work — the reason for the migration.

## Build order for the sidebar phase
A. Sidebar restructure + drag-from-palette fill + Save/Load .json  ← done
A2. Fixes pass (this): dark minimal Figma UI, PNG-only one-sheet export,
    bead-size perf, borderless minimal cards, solid-bg verified.       ← this pass
B. Marquee Select tool + recolor/copy-paste/delete actions         ← next pass

## UI theme — UPDATED (overrides spec §7.5 light direction)
- **"Nothing" design language** (see `.claude/skills/nothing-design`): black chrome,
  monochrome greys, **one red accent** (`#d6001c`) used sparingly (primary button +
  brand dot only), UPPERCASE monospace labels, dotted-grid panel background.
- **Artboard (the canvas) stays light** (`T.artboard` ≈ #f3f3f4) so bead colours
  are judged against near-white, matching the printed paper. Black chrome, light
  canvas. Red kept minimal so it doesn't bias bead-colour perception (§7.5 intent).
- Borderless, flat sections; no number-input spinners; no zoom pill (Ctrl+scroll).

## Export — UPDATED
- **PNG only**, **whole design on one sheet** (no print-scaling / pagination).
  PDF export and the mm/bead control removed. Chart still has outlines + edge
  numbers + guides + colour-key legend, rendered to a single PNG.

## Performance
- `beadPath` uses a precomputed unit-superellipse polygon (no per-bead Math.pow).
- Empty bead lattice rendered ONCE to an offscreen canvas (`lattice` useMemo) and
  blitted each frame; painting only redraws filled beads (iterates the Map).
- Transparency checker is a static CSS background on the canvas, not redrawn per
  frame (was the biggest cost).
- `paintBead` bails out (returns prev state) when a bead is unchanged, so dragging
  over the same bead doesn't trigger redraws.

## Canvas model — viewport + transform (Figma/Photoshop-style)
- The canvas element is sized to the **viewport** (pasteboard), never to the
  document. Zoom/pan is a **view transform** (`view = {scale, tx, ty}`), so a huge
  design no longer makes an oversized canvas → fixes the "glitches above 60cm"
  bug (browser ~16k-px canvas limit).
- **No scrollbars.** Navigation: **wheel = zoom toward cursor**, **Space-drag or
  middle-mouse = pan**, on-screen zoom control (−/%/+, click % = Fit). Auto-fits
  on load and when the cm size changes.
- Rendering culls to the **visible cell range** and uses level-of-detail (drops
  outlines / draws simple rects when beads are tiny on screen), so any document
  size stays fast. Canvas size cap raised to 300cm.

## Sizing, panels, persistence (latest)
- **Bead size = density, canvas stays constant.** Bead px is tied to physical mm
  (`SCREEN_PXMM`), so the artboard tracks the cm canvas; changing bead size only
  changes how many beads fit, not the canvas size.
- **On-screen chart-guides toggle removed** (the PNG export still includes guides
  + numbers + legend).
- **Save artwork = in-tool persistence.** Saves to localStorage (`DESIGN_KEY`) and
  **auto-restores on load**, so work reopens for editing. The separate "Open
  design" file picker was removed. Export is "Save PNG".
- **Saved palettes**: click-to-load rows (name + swatch strip), internal scroll;
  fixes "can't open/use saved palettes easily".
- **Two-panel layout** (no panel scrolling): LEFT = tools + canvas + bead +
  background; RIGHT = colour/palette + export + save. Canvas in the middle.

## Editing features (latest)
- **Select tool** (marquee): drag a box → selects **coloured beads only**
  (2026-06-11; empty cells are never selectable). Actions: Recolour / Delete.
  Selected beads get an accent ring; live marquee drawn dashed.
- **Pattern maker replaces copy/paste** (2026-06-11; a centred-paste version
  existed briefly the same day). The selected motif repeats across the WHOLE
  canvas in a textile layout: **Grid** (straight repeat), **Brick** (alternate
  repeat-rows shift sideways by half a tile) or **Half-drop** (alternate
  repeat-columns drop by half a tile), plus a **gap** input (empty beads
  between repeats). The repeat lattice is anchored on the motif itself; tile
  pitch and all shifts stay EVEN so apex/base parity and `beadExists` survive
  (the half-tile shift is floored to even, min 2). One pattern = one undo step.
  Verified by `scripts/patterntest.mjs` (asserts the exact lattice of all
  three layouts).
- **Brush size** slider (1–6): brush>1 paints all beads within a growing radius.
- **Recent colours** (up to 5), auto-tracked on draw/fill, shown above the palette.
- **Empty beads** drawn very-slight grey (#eaeaeb), not white.

## iPad / Apple Pencil pass (locked 2026-06-10)
1. Primary device is **iPad + Apple Pencil**. Pencil (and desktop mouse) draws;
   **single-finger drag pans only** (Procreate-style — no stray marks).
2. **2-finger pinch = zoom toward gesture midpoint + pan** (replaces nothing on
   desktop: wheel-zoom and space-drag stay).
3. **2-finger tap = undo, 3-finger tap = redo.** Undo history = bead edits only
   (one stroke = one step), capped at 50. Small ↶/↷ buttons sit in the zoom
   control for desktop; Ctrl/⌘+Z and Ctrl/⌘+Shift+Z also work.
4. Tools (Draw/Erase/Select) move to a **floating vertical strip on the right
   edge of the canvas** — under a right-handed user's hand, ≥44px touch targets.
   (Pencil double-tap gesture is not exposed to web apps, so on-screen it is.)
5. Bead density: the 1.5 mm size is **replaced by "1 mm" (1.05 × 1.3125 mm)**,
   giving exactly **6 beads (3 pairs) per cm** of row pitch. 3 mm stays.
6. Right panel: content **scrolls**; **Save PNG (red primary) + Save artwork**
   are clubbed and **pinned at the bottom** (overrides "no panel scrolling").
   Save PNG is now the highlighted action, not Save artwork.

## Drag-to-fill
- Dropping a palette colour anywhere fills the **nearest** bead's region
  (`nearestBead` in `lib/geometry.js`) — no longer requires dropping exactly on a
  bead.
- **Pointer-based, not HTML5 drag-and-drop** (2026-06-10): iPad Safari has no
  touch DnD. A ghost swatch follows the pointer; tap = pick colour, drag past
  8px = fill on release over the canvas. One path for finger/pencil/mouse.

## Background reference image (2026-06-10)
- The uploaded image is a **placeable reference under the beads**: "Adjust
  image" mode (auto-entered on upload; banner + DONE on canvas) — drag moves,
  pinch/wheel resizes (`bgT` = offset + scale over the cover fit, clamped
  0.2–8, clipped to the canvas).
- While a bg image is set, **empty beads draw outline-only** (no grey fill) so
  the design shows through; painted beads sit on top.
- Placement is saved with the artwork and **reproduced in the PNG export**
  (passed as fractions of the bead area → chart.js `paintImageBackground`).
- In adjust mode painting/undo-taps are suspended; gestures act on the image.
- **Show/Hide toggle**: hiding the image falls back to the solid colour (the
  colour picker appears in the card while hidden); placement is kept, Adjust
  is disabled, and a hidden image exports as the solid colour too.

## UI fixes pass (2026-06-10)
- On-screen background: **solid colour / image only** — transparent is an
  EXPORT-time choice only (`exportBg`).
- Clear canvas: **press-and-hold button (700 ms, sweeping fill, no confirm)**
  pinned at the LEFT panel's bottom; undo can restore.
- Both panels: content scrolls (`.panelScroll`), action cluster pinned below.
- App height **100dvh** (100vh hid the bottom buttons behind iPad Safari chrome).
- `Pill` inputs edit a local draft while focused, so the field can be cleared
  to retype (canvas cm fields were impossible to edit); hex text fits (14px).
