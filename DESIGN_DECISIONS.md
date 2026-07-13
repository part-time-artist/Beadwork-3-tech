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
- **Layout buttons SWAP, never stack** (2026-06-11, user report: "it is making
  all the patterns when I click one by one"). While the last edit was a pattern
  apply, clicking another layout (or changing gap and re-clicking) rebuilds
  from the pre-pattern design; any other edit ends swap mode. Undo from any
  layout returns straight to the bare motif.
- **iPad Safari crash fixes** (2026-06-11, "Safari shuts down after a few
  strokes"): (1) strokes repaint the canvas via requestAnimationFrame straight
  from `beadsRef` — no React re-render per pencil event (was 120–240 full
  renders/s); React state syncs once at stroke end. (2) Undo history is capped
  by TOTAL stored beads (250k) as well as 50 steps — 50 snapshots of a dense
  full-canvas pattern was hundreds of MB.
- **Brush size** slider (1–6): brush>1 paints all beads within a growing radius.
- **Recent colours** (up to 5), auto-tracked on draw/fill, shown above the palette.
- **Empty beads** drawn very-slight grey (#eaeaeb), not white.

## Packed bead view (2026-06-11)
- Problem: real beads touch with almost no ground showing, so woven motifs read
  instantly; on screen each bead was drawn at true size on the lattice pitch,
  so designs looked like scattered dots.
- Fix: **"Packed" view (default)** draws FILLED beads enlarged by
  `PACKED_DRAW` (1.15) so neighbours kiss like the real weave. Empty cells stay
  true-size (grid stays readable). Pure rendering — bead centres, hit-testing,
  bead counts and the printed chart are untouched. Persisted with Save artwork.
  Visual check: `scripts/packedview.mjs` (packed/spaced/zoom screenshots).
- 2026-06-11: the Packed/Spaced toggle became a **Bead spacing slider** (Bead
  size card): 0 = spaced (true size) … 1 = max packed; draw scale blends
  `1 + pack × (PACKED_DRAW − 1)`. Saved as numeric `pack`; old boolean
  `packed` saves still load (true→0.75, false→0).
- Same day, per user: max packing raised to **20%** (`PACKED_DRAW` 1.15→1.2)
  so beads can press/overlap for a denser fabric look. Beads *kiss* at 0.75 of
  the slider — that's the default, so the default look is unchanged.
- **2026-06-17 (per user): the PNG export now honours the spacing slider too.**
  Previously the exported chart always drew beads at true (spaced) size, so a
  packed on-screen design exported looking scattered. `renderFullChart` /
  `drawBeads` (chart.js) take a `fillScale`; `exportPNG` passes the same
  `1 + pack × (PACKED_DRAW − 1)` as the screen, so filled beads in the PNG are
  enlarged identically (empty cells stay true-size; thin outlines kept for
  countability). Bead centres, counts and the print pitch are unchanged.

## PNG export: browser canvas ceiling (fixed 2026-06-11)
- Bug: **Save PNG silently produced a blank sheet.** The chart rasterises at
  ~300 DPI (8mm/bead), and browsers FAIL SILENTLY past a max canvas size —
  iPad Safari's ceiling (~16.7M px) is hit by even a 6×6cm chart; 300cm
  canvases blow past every browser's limit.
- Fix: `rasterScale(w, h)` in `lib/chart.js` (cap: 15M px area, 8192px/side)
  shrinks the chart + the composed chart-and-legend PNG to fit — full 300 DPI
  when it fits, proportionally lower resolution when it doesn't, never blank.
- `buildPDF` (currently unused) still assumes an unscaled raster — see the
  CAUTION comment if PDF export is ever revived. Visual check:
  `scripts/exportcheck.mjs` (60×20cm export, counts coloured pixels).

## Duplicate / Move & place (2026-06-11)
- Selection card gains **Duplicate** and **Move**: both turn the selected
  coloured beads into a 55%-alpha ghost; pen/mouse drag moves it (relative
  grab — no jump), **Place** commits as one undo step, **Cancel** discards.
  The placed beads become the new selection so operations chain.
- Duplicate's ghost starts +1 col +2 rows from the original; Move's starts in
  place with the originals *hidden, not deleted* (`placing.hide`) — Cancel
  simply unhides them, Place deletes originals + writes the new spot in one
  commit.
- Ghost positions snap to **parity-valid origins** (row shift even, column
  parity = half the row shift) so every copied bead lands on an existing
  lattice node — same rule the pattern maker keeps. Fingers still pan
  (Procreate rule); only pen/mouse move the ghost.
- Default drawing colour is now the palette pink `#F3CEDE` (was dark maroon).
- Visual check: `scripts/duplicatecheck.mjs`.

## Mirror a selection (2026-06-17)
- Selection card gains **Mirror ↔** (left–right) and **Mirror ↕** (up–down).
  Mirror **keeps the original and adds a flipped DUPLICATE beside it**, so the
  two together read as a symmetric pair (butterfly). It is *not* an in-place
  flip. One undo step; the new copy becomes the selection so it can be Moved or
  mirrored again. (A first pass did in-place flip — corrected per the user: the
  feature is duplicate-and-flip.)
- Placement: the copy goes to the **right** (↔) / **below** (↕); if that side
  lacks room it falls to the left / up. Beads off-canvas are dropped.
- The mirror is a per-technique rule (`tech.mirror(cells, dir, side)`), because
  the 3-bead weave is a staggered, half-density lattice — the copy must land on
  existing nodes. Internally it reflects the cells in integer lattice units
  (horizontally `X = 2·col + rowParity`; vertically `Y = row`) via `flip3`, then
  translates by a **multiple of 2 columns** (keeps apex density `exists iff
  col+row/2 odd` + the column/tilt parity) or a **multiple of 4 rows** (keeps
  the odd-row offset + density), at least the selection's span so it never
  overlaps the original. The 1-bead grid has no parity, so its mirror is a plain
  reflection about the bounding box's far edge.

## Named designs + design files (2026-06-11)
- "My designs" card (right panel): **multiple named design slots** in this
  browser (`beadwork3_designs_v1`), name pill + Save (same name overwrites),
  click a slot to load (undoable), × deletes (with confirm).
- **Export file / Import file** moves a design between devices as
  `<name>.beadwork.json` — the same design object every save path uses
  (`designData()` / `applyDesign()` in App.jsx; quick-save "Save artwork" and
  the boot restore share them).
- Background *images* are not embedded in saves/files (blob URLs die with the
  session — pre-existing behaviour); the design loads with its solid colour.
- Default palette replaced (user: old 15-swatch muted set rejected): **the
  user's own 5 colours** — pink `#F3CEDE`, chartreuse `#D8DA5F`, sky blue
  `#8BBEDD`, bone `#F4EEDF`, violet `#4A3772`. (User wrote "8BBED", 5 hex
  digits; interpreted as `#8BBEDD` — correct here if wrong.) Bead colours may
  be rich; only UI chrome must stay muted (spec §7.5).
- Fresh-start defaults per user (2026-06-11): **canvas 10×7 cm, 1.5 mm bead,
  15% packing** (spacing slider at 0.75). A restored save still wins over
  these — a design carries its own canvas/palette/spacing.
- Visual check: `scripts/designscheck.mjs` (save/load/export/import/reload).

## Layers feature (grilling 2026-06-15)
LOCKED so far:
1. **Purpose: separate design parts** (border / motif / background on different
   layers) so editing one never disturbs the others. Not blend-driven.
2. **Stacking: top layer wins.** Each lattice node holds one solid bead; the
   topmost VISIBLE layer's bead covers lower ones (opaque). Lower bead hidden,
   not deleted. No opacity blending (a woven bead is one solid colour).
3. **Per-layer controls: show/hide, reorder, lock, rename, duplicate, merge
   down, delete** (full layer management).
4. **Export: flatten visible layers** top-down into the single artisan chart;
   hidden layers omitted. (No per-layer sheets.)
5. **Flood-fill bounds the ACTIVE layer only** — spreads through the active
   layer's beads, stops at its colour boundaries, ignores other layers' beads.
6. **UI: floating Procreate-style layers panel** (top-right, opened by a
   button), not a side-panel card — keeps the side panels uncluttered, touch-friendly.
7. **Other layers shown normally** (full colour, real composite while editing);
   hide via the eye toggle. No onion-skin dimming.

Defaults taken (no objection raised — change if wrong):
- D1. All edit tools (draw / erase / select / pattern maker / duplicate / move)
  act on the **active layer only**.
- D2. New design starts with **one layer ("Layer 1")**; old saves + .beadwork.json
  files **migrate to a single layer**. Saves now store a layers array (each =
  its own bead Map + name/visible/locked) and the active-layer index.
- D3. **Background (solid colour / reference image) stays a global element
  beneath ALL layers**, not per-layer.
- D4. Painting on a **hidden or locked active layer does nothing** (no auto-show).
- D5. Merge-down composites with the same **top-wins** rule; new layers insert
  **above** the active one. Total-bead perf cap (250k, existing) spans all layers.

IMPLEMENTED 2026-06-15 (in `src/App.jsx`):
- Model: `layers` = array bottom→top of `{id,name,visible,locked,beads:Map}` +
  `activeId`. `beads`/`beadsRef` mirror the ACTIVE layer so every existing edit
  path (strokes, fill, selection, pattern, duplicate) is unchanged and naturally
  acts on the active layer only. `applyBeads` syncs the active Map back into the
  stack (deferred during silent strokes; `endDrag` calls `syncActiveLayer`).
- Undo/redo now snapshot the whole document (`{layers,activeId}`) — bead edits
  AND layer ops (add/delete/duplicate/merge/reorder) are one undo step each;
  visibility/lock/rename/switch-active are NOT undoable. Bead budget counts all
  layers. `currentDoc`/`applyDoc` are the snapshot/restore pair.
- Render: `drawScene` composites visible layers top-wins (`fillAt`); active uses
  live `beadsRef`. Export `flattenVisible()` flattens visible layers for the chart.
- Save format v2: `layers:[…]` + `activeIndex`; old single-`beads` saves migrate
  to one layer (`applyDesign`). UI: floating panel toggled from the tool strip.
- Verified by `scripts/layercheck.mjs` (fresh=1 layer, separate Maps, add/undo,
  hidden layer excluded from export). Screenshot `scripts/view-layers.png`.

## Multi-technique website (grilling 2026-06-15)
The 1-bead and 3-bead tools become ONE app; the GRID is the only difference.
Take the existing 3-bead app and make grid geometry pluggable per "technique";
every other feature (layers, palette, save, export, background, draw/erase/
select, brush, pattern, duplicate, iPad gestures) is shared as-is. The old
1-bead codebase is NOT merged — only its grid model is recreated.
LOCKED:
1. **1-bead grid = aligned grid of bead-shaped cells.** Straight rows & columns,
   NO stagger, NO tilt, every cell exists (full density), beads keep a real
   width:height ratio + rounded bead shape (loom / square-stitch look). Flood
   fill = 4 orthogonal neighbours. (3-bead stays exactly as today.)
2. **One artwork = one technique, chosen up front.** A technique-chooser popup
   appears at start / on "New artwork"; the choice is FIXED for that artwork —
   no mid-artwork switching. (Changing technique = start a new artwork.)
3. **Saved designs tagged by technique.** One shared "My designs" list; each
   design records its technique and reopens in the matching grid. Auto-restore
   and import/export carry the technique tag.
Still to tune (visual, against a reference if available): the 1-bead bead ratio
(default = same 4:5 as 3-bead, controllable by bead size), pitch/packing, and the
rounded-rect bead silhouette.

IMPLEMENTED 2026-06-15 (`src/techniques/` registry):
- `techniques/{index,threeBead,oneBead}.js`. Each technique supplies geometry
  (makeGeometry, beadCountFromCm, beadExists, beadAt, nearestBead), bead shape
  (beadPath exponent) + tilt, flood-fill neighbours, snap axes, and pattern/
  placement parity (snapMotifOrigin, copyStartOffset, evenUp, patternHalf,
  snapPlace). `App.jsx` and `lib/chart.js` call through the active technique
  instead of importing 3-bead math directly.
- `geometry.js` generalised (backward-compatible): `makeGeometry`/`beadCountFromCm`
  take `packX`/`packY`/`stagger`; `beadAt`/`nearestBead` take a density fn;
  `beadPath` takes a silhouette exponent (cached per-n).
- 1-bead packing measured from `assets/beadwork 1 grid.png` via
  `scripts/measure1grid.mjs`: PACK_X 1.235, PACK_Y 1.273, stagger off, full
  density, bead exponent 3.4 (boxier loom bead — tunable).
- Chooser popup: forced at first start, cancellable via "New artwork" (My
  designs card). `technique` tag added to saved design data; `applyDesign` reads
  it (missing/unknown ⇒ 3-bead) so auto-restore, named slots and import/export
  reopen in the matching grid.
- Verified: `scripts/techcheck.mjs` (3-bead unchanged), `onebeadcheck.mjs`
  (chooser + aligned grid), `techpersist.mjs` (technique round-trips on reload),
  `exporttechcheck.mjs` (PNG charts for both: export-1bead.png / export-3bead.png).

## My artworks gallery (grilling 2026-06-15)
Replaces the split "Save artwork" (DESIGN_KEY) + "My designs" slots with one
multi-artwork model. Supersedes "Named designs + design files" storage.
LOCKED:
1. **Device-local only.** Artworks live in this browser; Export/Import
   `.beadwork.json` files are the backup/transfer path. No accounts, no server.
2. **Quick-switch gallery, one artwork open at a time** (not multiple open
   simultaneously).
3. **Text list** — name · technique · beads · last-edited. No thumbnails.
4. **Auto-save only.** The open artwork saves itself continuously; the manual
   "Save artwork" button is removed. (Export stays for backups.)
5. **Each artwork = one record**: id, name, technique, full design data,
   last-edited time. Per-artwork actions: Open, Rename, Duplicate, Delete.
6. **"+ New artwork"** → technique chooser → blank canvas. **"← My artworks"**
   button returns to the list.
7. **Storage moves localStorage → IndexedDB** (the ~5MB localStorage ceiling
   can't hold many dense designs). Existing localStorage designs (named slots +
   the quick-save) migrate into the gallery on first load — nothing lost.
8. **On open: reopen the last-edited artwork** (continue where you left off);
   the gallery is one tap away via "← My artworks". First-ever visit (nothing
   saved) lands on the gallery → New artwork → technique chooser.
9. **New artworks auto-name from a forest/tree list** (theme: Morii = forest —
   e.g. Oak, Willow, Cedar, Birch, Rowan, Alder, Hazel, Fern, Moss, Aspen…).
   Pick the next unused name; when the list is exhausted, append a number.
   Rename anytime from the gallery. (No name prompt up front.)
10. **Reference background images are saved with the artwork** (stored in
    IndexedDB as a data URL) so they survive reopening — fixes the old
    blob-URL-dies-with-session loss. Adds weight per artwork; acceptable.
11. **"Export all" backup**: one button writes ALL artworks to a single backup
    file; re-importing restores them. Per-artwork Export/Import stays too.
Defaults (not separately grilled): gallery is a full-screen overlay in the
existing chooser's visual language; auto-save is debounced (~after edits settle
+ on leaving); Delete keeps a confirm; Duplicate = "<name> copy"; a New artwork
KEEPS canvas size, bead size, palette + spacing and resets only the background
to plain (so a previous artwork's reference image can't carry over).

IMPLEMENTED 2026-06-15:
- `src/lib/store.js` = IndexedDB wrapper (list/get/put/delete artworks + meta
  for lastOpenedId/migrated). One record = `designData()` + `id` + `updatedAt`.
- App.jsx: `screen` ('loading'|'gallery'|'editor'), `artworks` (summaries),
  `currentArtworkId`. Debounced auto-save (600ms) writes the open artwork.
  Boot migrates the old localStorage designs once, then reopens the last-edited
  (or shows the gallery). New artworks auto-name via `nextTreeName`.
- Reference bg images now read as data URLs (`onBgImage`) and reload into
  bgImgRef on `applyDesign`, so they persist; switching artworks clears a stale
  image. Manual "Save artwork" button removed; right panel "This artwork" card
  = name + ← My artworks + Export this artwork; gallery has Import/Back-up-all.
- Bug found + fixed during build: the 1-bead grid has GAPS between beads, so the
  oval hit-test left gaps unpaintable (a stroke could thread between beads). The
  technique now sets `hitCell: true` (defineTechnique) → the whole rectangular
  cell maps to its bead. The staggered 3-bead weave keeps the oval hit-test.
- Verified: scripts/gallerycheck, onebeaddraw, migratecheck, bgcheck.

## iPad / Apple Pencil pass (locked 2026-06-10)
1. Primary device is **iPad + Apple Pencil**. Pencil (and desktop mouse) draws;
   **single-finger drag pans only** (Procreate-style — no stray marks).
2. **2-finger pinch = zoom toward gesture midpoint + pan** (replaces nothing on
   desktop: wheel-zoom and space-drag stay).
2b. **2-finger twist = ROTATE the canvas** (added 2026-06-15), combined with the
   same pinch — zoom + rotate + pan happen together around the gesture. On
   lift, the rotation gently snaps to the nearest right angle if within ~7°.
   The view transform is now `screen = scale·R(rot)·doc + t`; ALL screen↔doc
   conversions go through `screenToDoc` (App.jsx) so drawing/hit-test stay
   correct. The status bar shows the angle; **Fit (the % button) resets
   rotation to 0** — it doubles as "straighten". Verified: scripts/rotatecheck.
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

## Fixes + layers pass (grilling 2026-06-30)
Seven items. LOCKED:
1. **Undo bug (laptop).** Ctrl/⌘+Z currently bails unless `e.target ===
   document.body`; after clicking a canvas-size Pill, focus stays on the input,
   so our undo never runs and the browser's NATIVE text-undo reverts the cm
   field → canvas resizes (the reported symptom). FIX: fire undo from the canvas
   regardless of focus and `preventDefault` so native input-undo can't resize.
   Canvas size stays OUT of undo history ("locked in" — already true).
2. **Background → layers (Procreate model).** Remove the separate Background
   card. The bottom layer becomes a real **Background layer = solid colour**,
   shown in the layers panel; **hiding it = transparent background** (screen
   checker + export alpha). It is pinned to the bottom, recolourable, hideable,
   NOT deletable/reorderable. **Image layers** stack ABOVE it: you can add
   **multiple** reference images, each a layer with show/hide/lock/reorder/
   delete + place & resize (Adjust mode) + opacity (for tracing). Image layers
   are not bead layers — you can't paint beads on one (drawing while an image
   layer is active triggers the locked/blocked feedback, see #4).
   **Export: visible image layers bake into the PNG** (flatten top-down like
   beads); hide a layer to leave it out of the artisan chart.
3. **Image stays FIXED on canvas resize.** Changing canvas cm no longer
   cover-fits/rescales a placed image; it keeps its size & position. Plus:
   while resizing/moving an image in Adjust mode, **snap its edges/corners to
   the canvas edges/corners** within a small threshold.
4. **Locked/hidden-layer feedback.** Trying to paint on a locked OR hidden layer
   (or an image layer) shows a brief toast/banner ("Layer is locked" / "hidden"
   / "image layer — can't draw beads here") instead of silently doing nothing.
5. **Alpha lock** (per layer). Toggle: drawing only RECOLOURS beads already on
   that layer — can't add to empty cells or change shape. (Not clipping mask /
   layer mask.) Chosen as the simplest fit for one-solid-bead-per-node.
6. **Brush hover preview (desktop).** On hover, tint the beads the current brush
   size would paint (grey ghost) so the user sees the footprint before clicking.
   Desktop pointer only (Pencil/touch have no hover).
7. **iPad Safari crash = memory, grows with bead count** ("any size + lots of
   beads"). Investigate + reduce: undo-history footprint, per-layer Maps,
   offscreen lattice/canvases, image data-URL weight. Profile, don't guess.

Defaults taken (change if wrong): image layers default 100% opacity (dimmable);
bead layers keep no opacity (one solid colour); alpha-lock is a separate per-row
toggle distinct from position-lock; Background layer can't be alpha-locked.

IMPLEMENTED 2026-06-30 (`src/App.jsx`, `src/lib/chart.js`):
- #1 Undo: keydown guard now skips only editable inputs (not "anything but
  body"); canvas `onPointerDown` blurs any focused input so native text-undo
  can't fire. Canvas size still never enters undo.
- #4 Toast: transient `toast` state + `showToast`; `blockedReason()` returns the
  reason (locked / hidden / image / bg) and is shown on a blocked draw or fill.
- #6 Hover: `hoverRef` holds the brush footprint cells; `onPointerMove` (mouse
  only, idle) sets it via `setHoverCells`, drawScene ghosts them grey. Cleared on
  pointer-leave + tool/edit change.
- #5 Alpha lock: `alphaLock` per layer + `alphaLockRef`; paintBrush, floodFill
  AND `paintAlong` (the straight-line snap path — initially missed, found in
  verification) skip empty cells and erase when set. α toggle in layer actions.
- #2/#3 Layers model: layer `type` ∈ {'bead','image','bg'}. `makeBgLayer`/
  `makeImageLayer`; fresh stack = [bg, Layer 1]. drawScene composites visible
  layers in z-order (bg base → images/beads → empty-cell outlines once on top).
  Image placement `t={x,y,scale}` in DOC px (fixed on canvas resize) + edge/
  corner snap (`snapImageT`). Adjust routed by `adjustId` (replaces `bgAdjust`).
  Layer ops guard bg (pinned bottom, no delete/move/merge) and keep ≥1 bead
  layer. Background card removed → "Background & images" pointer card; add-image
  button + bg colour swatch + per-image Adjust/opacity live in the layers panel.
  Export builds an ordered `composite` (chart.js `renderFullChart` gained a
  `composite`/`srcDoc` path) so visible images bake into the PNG in z-order.
- Save format **v3**: layers carry `type` (+ color / src+t+opacity / beads).
  `applyDesign` migrates v1 (single beads) and v2 (bead layers + global
  bg/bgT/bgShown) into bg-layer + image-layer(s); old cover-fit placement is
  converted to absolute doc px on image load.
- Verified: `scripts/fixespass.mjs` (fresh = Background+Layer 1, bg-draw toast,
  hide-bg no crash), `scripts/imglayer.mjs` (add image → Image layer + Adjust,
  PNG bakes the image).
- #7 iPad memory (crash grows with bead count). Three mitigations:
  1. **In-place stroke painting.** `paintBrush` mutated the WHOLE bead Map on
     every pointer event (240Hz) — on a dense canvas that allocation churn is
     what killed the tab. Now it clones the active Map ONCE per stroke (lazily,
     on the first real change vs `strokeBase`) and mutates that private copy in
     place; undo is unaffected (strokeBase untouched; an all-no-op stroke never
     clones so it commits nothing). The straight-line snap path is unchanged.
  2. **Reference images downscaled** to ≤2400px longest side (`MAX_IMG_SIDE`) +
     re-encoded JPEG before storing, so a full-res phone photo can't decode to
     tens of MB per artwork in memory + IndexedDB.
  3. **Adaptive autosave debounce** — 1500ms (vs 600ms) once a design exceeds
     ~40k beads, so serialising every layer's beads doesn't run on every stroke.
  Verified `scripts/drawundo.mjs` (freehand draw→undo→redo bead counts correct).
  Still wants an on-device iPad retest to confirm the crash is gone.

IMPLEMENTED 2026-07-02 (`src/App.jsx`) — **bead-texture overlay** (the woven look
at all zooms, agreed next feature):
- Problem: the LOD fix draws the zoomed-out/mid-zoom view as flat colour rects
  (filling ~14k ovals froze the tab ~4.5s), so the weave shape was lost until you
  zoomed in. Solution = the user's own idea: draw colour fast as cells (O(beads))
  + lay ONE repeating bead-shape tile over the top (O(1), independent of bead
  count) via `createPattern`.
- `beadTexture(gapColor)` bakes a tiny tile = the lattice motif, which repeats
  every **2 cols × 4 rows** (spans apex + both base rows AND both ±45° tilts). The
  tile is filled with the thread/gap colour and every bead silhouette is punched
  OUT (`destination-out` → transparent). Cached in `texRef`; rebuilt only when
  bead size / spacing / technique / gap colour change — never per frame.
- Alignment: a padded cell range (−2..3 × −2..5) is drawn and the canvas clips to
  one exact period, so the window tiles seamlessly. `tiltFor`/`beadExists` aren't
  periodic-safe for negatives, so existence/tilt read the **canonical** cell
  (`col mod 2`, `row mod 4`) while the draw position uses the true col/row with the
  correct odd-row offset sign. Exact `sx/sy = tileDoc/tilePx` avoids rounding drift.
- Applied in `drawScene` when `texActive = simple && onScreenBw ≥ 2.5 && !imageShowing`
  (rects regime, beads big enough to read, no reference image to protect). Forces
  the colour base to rects, tracks the filled beads' bbox, and fills the pattern
  over that bbox∩canvas∩visible in ONE `fillRect` anchored at `padX/padY`. Gap
  colour = the visible bg layer's colour (else a neutral). Below 2.5 px it's a
  solid-colour overview (correct — no shape is visible that far out); above ~6 px
  the real sharp ovals return.
- Chosen texture style (asked the designer): **negative-space / gap** — thread
  gaps carve the colour block into beads (most faithful to `assets/Frame 2.png`),
  not outlines-only or 3D shading.
- Known minor artifact: apex rects are drawn double-wide, so at a shape's edge the
  colour can bleed ~1 cell into empty gaps → a faint half-bead of colour at edges
  in rects mode only (exact in oval mode). Acceptable; note if it bothers.
- Verified: `scripts/beadtex.mjs` (100×100 filled → at 32% zoom the sample is 25%
  gap + 68% bead colour = woven, not a flat block; worst long-task 295ms; no
  errors) and a texture-vs-ovals crop comparison across the 6px threshold showed
  the tile registers exactly onto the real lattice. Also re-verified the Jul-1
  render fixes: `scripts/perf100.mjs` (235,155 beads, no freeze, no errors).

IMPLEMENTED 2026-07-02 (`src/lib/chart.js`, `src/App.jsx`) — **fast PNG export**
(the slow/"felt-crashed" Save PNG, drill item #2):
- Root cause: `drawBeads` did a `beginPath → fill → stroke` PER bead over every
  cell — the same per-bead canvas churn that stalled the on-screen render. AND a
  first batching attempt (accumulate all beads into one Path2D) was WORSE: append
  degrades super-linearly, so one path holding ~37k+ subpaths hung for tens of
  seconds (measured: a full 40×40 export went from ~1.7s for the first 8k beads to
  ~12s for a later 8k block — clearly O(n²)).
- Fix: batch into Path2Ds (empty-cell outlines + one path per fill colour) but
  **FLUSH every ~1500 beads** (fill/stroke then start fresh paths), so no path
  grows large. Keeps the render O(beads). 1500 matches the on-screen oval cap.
- Responsiveness: `drawBeads`/`renderFullChart` are now **async and yield to the
  event loop after each flush**, so a big export no longer blocks the main thread
  for seconds — the tab stays responsive and repaints. `exportPNG` awaits it.
- UX: `exporting` state → the Save PNG button shows **“Preparing PNG…”** and is
  disabled; a `requestAnimationFrame`+`setTimeout` yield lets that state paint
  before the render starts, so it can never look frozen/crashed. Switched the
  download from `toDataURL` to **`toBlob` + object URL** (no giant base64 string
  on the main thread; lighter memory). Same pixels ⇒ same PNG, so the
  identical-size "animation frame" export property is preserved.
- Verified `scripts/exportperf.mjs`: a fully-filled 40×40 cm chart (37,698 beads)
  exports in ~3.6s (was >45s / effectively hung), worst main-thread task 271ms
  (was a single ~3.6s block before yielding), valid 3648×4113 PNG, legend count
  matches (#F3CEDE ×37698), no errors.

## Fixes pass 2026-07-13 (user reports)
1. **1-bead texture bleed ("half beads coloured").** `beadTexture` hardcoded
   the 3-bead odd-row shift (`Px/2`) when punching the tile's bead holes; the
   aligned 1-bead grid has NO shift, so odd-row holes sat half a bead off the
   real lattice and colour showed through the wrong holes. Fix: use
   `geo.rowOffset` (Px/2 on 3-bead, 0 on 1-bead). Verified
   `scripts/bleedtest-1bead.mjs` (20/20 taps → clean upright blobs, aspect
   0.8, zero stray px); 3-bead bleedtest unchanged (rowOffset identical there).
2. **Export backgrounds (SUPERSEDES locked decision #10 "transparent OR
   on-screen choice" and the later "always white sheet" note).** Per user
   (asked, not assumed): **Export PNG = always transparent** (design cutout;
   no sheet, no bg colour; legend band transparent too — `renderLegend` gained
   a `sheet` option). **Export JPG = paper look**: white sheet + the visible
   background layer's colour (JPEG has no alpha). Dead `exportBg` state
   removed; `chartComposite(includeBg)` takes the flag. Verified
   `scripts/exporttrans.mjs`: real downloads of both formats — .png signature
   + corner alpha 0; .jpg signature + white corner.

## iOS-look + shapes + palette libraries pass (grilling 2026-07-09)
LOCKED:
1. **Icons: Framework7 Icons** (MIT, drawn to match SF Symbols) replace current
   icons across the UI for the iOS look. The `assets/icons/SF-Symbols-8.dmg`
   is NOT usable (macOS installer; Apple license bars SF Symbols on the web).
2. **Shapes: Procreate-style hold-to-snap (QuickShape).** Draw freehand, hold
   the pointer still at stroke end → stroke snaps to the detected shape; drag
   to adjust before commit. No dedicated shape toolbar tools.
3. **Detected shapes: line, circle/ellipse, rectangle/square, triangle/polygon.**
4. **Shapes paint OUTLINE only** (1-bead-thick line of the current colour);
   interior filled afterwards via flood-fill if wanted.
5. **Universal bead library** (device-local, IndexedDB, opened from the
   gallery/dashboard): the catalog of real bead colours the studio stocks.
   **User-curated** — starts from the current 5 defaults; add (picker + name),
   rename, remove. No pre-seeded catalog.
6. **Per-artwork palette = universal picks + custom.** In the editor the
   palette card gains a "from library" picker; custom colours via the free
   picker stay allowed. (Default taken: a custom colour gets an "add to
   library" affordance so the catalog grows from real use.)
7. **Colour bleed bug confirmed = the known mid-zoom rects artifact** (apex
   cells drawn double-wide leak ~half a bead into empty neighbours at the
   edge of a shape, rects/texture regime only). Fix that render path; crisp
   ovals + export are unaffected.
8. **Layer groups = Procreate folders.** Collapsible group rows in the layers
   panel: hide/lock/rename the group, reorder as a unit, Flatten merges the
   group to one bead layer. Merge-down (exists) stays for single layers.

Defaults taken (change if wrong): layers panel gets WIDER so bottom-bar
buttons (Clear etc.) fit comfortably; groups are one level deep (no folders
inside folders); the Background layer can't join a group; a group's Flatten
uses the same top-wins composite as merge-down and is one undo step.

IMPLEMENTED 2026-07-09 — #8 layer groups (App.jsx):
- Model: the layer stack stays a FLAT array (hot paths untouched); a group is
  `{id,name,visible,locked,collapsed}` in a parallel `groups` list and member
  layers carry `groupId`. Members are always CONTIGUOUS in z-order; every op
  preserves that. Effective flags: `layerShown`/`layerHeld` = layer AND its
  group — used by drawScene, export (flattenVisible/chartComposite), canEdit,
  the blocked-draw toast, and the image Adjust button.
- UI: group header row in the panel (chevron ▸/▾, name — double-tap renames,
  member count, Flatten, lock, eye). Tap header = collapse/expand. lpBar gains
  Group/Ungroup: Group wraps the active layer + the one below (or joins the
  group directly below); Ungroup dissolves the active layer's group. New +
  duplicated layers stay in the active/source layer's group. Bg never groups.
- Drag: rows move in DISPLAY-row units. Dropping a layer between a group's
  rows JOINS it; dropping outside leaves it (Procreate drag-into-folder). A
  group header drags its whole block as one unit and can't land inside
  another group (snaps out — one level only). Collapsed groups count their
  hidden members in the index math.
- Flatten: bead members merge top-wins into ONE layer named after the group,
  at the bottom member's slot — one undo step. Image members block flatten
  (toast). Undo/redo snapshots now carry `groups`; empty groups are dropped
  after delete/merge/drag-out.
- Save format **v4**: `groups` array + per-layer `groupId` (dangling ids
  dropped on load); v1–v3 saves load with no groups. Fresh artworks reset
  groups. Metadata toggles (group hide/lock/rename/collapse) are not
  undoable, same policy as layers.
- Verified `scripts/groupcheck.mjs` (14 checks): group/ungroup, drag-into-
  group, hide→beads vanish, lock→"Group is locked" toast, collapse/expand,
  flatten+undo, v4 reload persistence, no errors. Regressions re-run green:
  bleedtest, quickshape, beadlib + `npm run build`. NOTE for scripts: with
  the layers panel open, the first canvas tap only closes the panel; boot
  after reload lands on the GALLERY (pre-existing reskin behaviour — differs
  from the older "reopen last-edited artwork" decision, flagged to the user).

IMPLEMENTED 2026-07-09 — #5/#6 universal bead library (App.jsx, IndexedDB):
- Library = `{id, color, name}` list in the existing IndexedDB `meta` store
  (key `beadLibrary`, no schema bump). Seeded once from DEFAULT_PALETTE.
- Gallery: "Bead library" button (head, next to + New artwork) → modal with
  swatch + name + × per row, live colour editing, and a draft add-row
  (duplicates ALLOWED here on purpose — same hex can be a different bead
  finish). Editor colour panel: a "Bead library" swatch strip above the
  palettes (tap = pick), and a "+ Add current" button that appears only when
  the current colour is NOT yet in the library (dupe-guarded).
- Artwork palettes remain per-artwork and free (universal + custom allowed,
  per the grill). Fixed a UI typo: "Colour palettte" → "Colour palette".
- Verified `scripts/beadlib.mjs` (12 checks): seed, add/rename/remove,
  editor strip, pick, add-current guard + growth, reload persistence.

IMPLEMENTED 2026-07-09 — #2/#3 QuickShape (`src/lib/quickshape.js`, App.jsx):
- Hold the pen still ~600ms mid-draw (≤7px wobble) → the freehand path snaps
  to the fitted shape; keep dragging to ADJUST (line: endpoint follows; circle:
  radius; ellipse/rect: axes from the pointer in the shape's frame; poly:
  uniform scale about centroid); lift places it — ONE undo step (reuses the
  straight-line-snap stroke-replay + commit path, so alpha lock/layers work).
- Fitting (pure module `lib/quickshape.js`): open stroke → line. Closed →
  resample 96 + 3-pt smooth; corner detection = local-max turning angle >48°;
  3–8 corners AND straight sides → triangle/rect/polygon (a polygon's sides
  must be straight — if the stretches between corners bulge >7% like arcs,
  it's wobble on a round shape → ellipse; this stopped hand circles reading
  as polygons). 4 corners with paired parallel edges → rectangle (rotation
  snapped upright within 10°; |w−h|<15% → square). Roundish → PCA ellipse
  (boundary variance → radii; |rx−ry|<18% → circle).
- Outlines paint brush-thick via NEAREST bead per sample (not the oval
  hit-test — an ideal curve slips between the staggered lattice's ovals,
  which left dashed outlines, verticals worst). Toast names the shape.
- Perf: path recording is the existing thinned stroke buffer; adjust repaints
  are rAF-throttled (one Map rebuild per frame, same cost class as the
  line-snap). No new state in React render path.
- Verified `scripts/quickshape.mjs`: wobbly circle→Circle (hollow ring, grows
  when dragged), wavy open stroke→Line, sloppy square→Square (outline only),
  one undo removes the shape, worst long-task 196ms, no errors. Screenshots
  quickshape-circle/square.png show continuous woven outlines.

IMPLEMENTED 2026-07-09 — #1 icons + wider layers panel (`src/icons.jsx`, App.jsx):
- New `src/icons.jsx`: the 14 UI icons are now Framework7 Icons path data
  (MIT, matches SF Symbols; filled 56×56 paths, currentColor) behind the SAME
  component names/usage as the old outline set — zero call-site changes, no
  new dependency, no icon font. Draw=paintbrush, Select=lasso (Procreate),
  Layers=square_stack_3d_up, plus eye/lock/photo/pencil/checkmark/house/
  line_horizontal_3/arrow_uturn_l+r. Eraser is hand-drawn in the same filled
  style (SF/F7 has no eraser). Old inline SVG functions deleted from App.jsx.
- Layers panel widened 340→420px so the bottom bar (Duplicate · Alpha lock ·
  Clear · Delete) fits comfortably. Verified `scripts/iconshot.mjs` screenshot;
  no page errors.

IMPLEMENTED 2026-07-09 — #7 colour-bleed fix (`src/App.jsx`, `threeBead.js`):
- Cause: in the rects regime, `rectCell` drew apex (even-row) cells DOUBLE-WIDE
  (needed for full coverage in the far-out solid overview, apex rows being
  half-density). With the texture overlay on, colour shows ONLY through the
  tile's punched bead holes — and a double-wide apex rect sat under an EMPTY
  neighbour's hole, showing a phantom half-bead at every shape edge.
- Fix: two rect kinds in `drawScene`. Coverage rects (texture OFF, beads
  sub-pixel) stay full-cell/double-wide. Carve rects (`carveCell`, texture ON)
  cover only the bead's own rotated-silhouette bounding box (per-tilt cached —
  no per-bead trig), so colour can never back an empty neighbour's hole. Also
  fixed as a bonus: single base beads were previously UNDER-covered (Px×Py rect
  < the 45°-tilted silhouette bbox → cropped bead tips in texture mode).
- **Round 2 (same day; user screenshot `assets/fixes/colour bleed beads.png`):
  still bled.** The AXIS-ALIGNED bbox of a ±45° bead is a big square whose
  edges still slid under neighbouring beads' punched holes → thin sliver
  dashes on empty neighbours. `carveCell` now paints the dw×dh rect ROTATED
  with the bead (a 4-point quad; per-tilt cached half-axis vectors, no
  per-bead trig) — it circumscribes the silhouette exactly, so nothing is
  left to show under a neighbour's hole. `bleedtest.mjs` gained check #3b:
  connected-component analysis per isolated bead — ANY colour fragment
  disconnected from the bead counts as bleed. Result: 0–3 stray px
  (anti-aliasing) vs the visible dashes before; perf unchanged (worst task
  253ms).
- `apexWide: true` is now a 3-bead technique flag: the 1-bead aligned grid
  (full density) was wrongly double-widening its even rows in rects mode and in
  the erase-floor clip; both now guard on `tech.apexWide`.
- Verified `scripts/bleedtest.mjs`: 9 isolated beads at 103% zoom on a 100×100
  canvas (texture regime) all render with blob aspect ≤ 1.33 (bug gave ~2.2 for
  apex); diagonal-stroke edge screenshot shows whole beads, no half-bead bleed;
  worst long-task 83ms; no page errors. NOTE for scripts: taps only paint when
  they land ON a bead oval (gap taps do nothing, by design), and the reskin's
  new-artwork flow is gallery → New artwork → technique → "Canvas & beads"
  dialog (canvas size lives THERE now) → Create artwork.

## Kinetic tool (grilling 2026-07-09)
A NEW tool, evolving the `kinetic-lab/` Matter.js prototype. LOCKED:
1. **Purpose: design real kinetic pieces** — strung/hanging beadwork (curtains,
   tassels, danglers); the physics sim previews how the real piece hangs/moves.
   Not a website toy; output feeds real making.
2. **Separate app** — stays its own Vite app in `kinetic-lab/`, own deploy.
   Main tool untouched.
3. **Desktop-first** — mouse-driven; iPad is a bonus, not a requirement.
4. **v1 scope: hanging strands** — strands of beads from a bar/frame (curtains,
   wall hangings, danglers). One physics model: gravity + swing.
5. **Authoring = import from the main beadwork tool** (user's own idea): bring a
   design across and visualise it hanging/moving. (Mapping + editability being
   grilled.)
6. **Output: stringing chart + motion video** — per-strand bead order/lengths/
   counts, plus an exported clip of the piece moving.
7. **Real physical units** — bead mm, strand/frame cm; same what-you-design-is-
   what-you-get philosophy as the main tool.
8. **Import maps to FABRIC** — the whole woven panel hangs as ONE connected
   cloth (soft-body), truest to a real 3-bead woven panel (chosen over
   columns→independent strands).
9. **Editing here: physics tweaks + occasional design edits** ("sometimes").
   v1 = hang/physics controls + simple tap-to-recolour; structural redesign
   stays in the main tool. (Interpretation — change if wrong.)
10. **Transfer = `.beadwork.json` file** — kinetic tool gets an Import button
    reading the main tool's existing export; zero changes to the main tool.

Defaults taken (change if wrong): panel pinned along its top row to a bar;
motion video = WebM captured off the canvas (MediaRecorder); the weave CHART
stays the main tool's export — kinetic adds the video; perf approach = coarse
physics lattice with bead positions interpolated between nodes (never one
physics body per bead — north star: no lag at any design size).

IMPLEMENTED 2026-07-09 (kinetic-lab/src: `weave.js`, `cloth.js`, `App.jsx`):
- Matter.js sandbox replaced. `weave.js` = hand-kept copy of the main tool's
  pure lattice math (3-bead + 1-bead packing/tilt/density, superellipse
  silhouette) + `parseDesign` accepting save versions v1–v4 (flattens visible
  bead layers top-wins, honours hidden v4 groups, `pack` spacing).
- `cloth.js` = custom Verlet cloth: node grid capped at ~28×40 regardless of
  design size; structural+shear constraints, 3 substeps × N iterations, top
  row pinned to the bar; beads bind ONCE to a cell (bilinear weights) and each
  frame get position + local rotation from the deformed cell.
- Rendering: one baked sprite per (colour, weave-tilt) — fill + ink rim +
  glaze highlight; per-frame work = position + drawImage per bead; per-bead
  rotation drops above 20k beads (LOD). Demo design (studio 5-colour stripes)
  loads at start; first row hangs from the bar on drawn threads.
- Dials: gravity (real 9810 mm/s² × px-per-mm, 0.05–1 g), breeze (spatial
  sine field), stiffness (iterations), damping; Grab (pointer pulls nearest
  cloth node) / Paint (tap-to-recolour, palette from the imported design;
  recolours write back into the design map so they survive re-hang/resize);
  Record motion video (canvas captureStream → WebM download); Re-hang flat.
- Verified `scripts/kinetic.mjs` (9 checks, all pass, 90fps demo): demo loads,
  beads render, grab deforms, v4 import round-trip, bead count, REC toggles +
  downloads webm, no page errors. Screenshots kinetic-view/kinetic-drag.png.
- NEXT (not built yet): stringing/hanging spec export, wider bead-size sanity
  vs huge imports (50k+ beads — LOD covers render, sim is capped already),
  optional deploy target for the kinetic app.

RETUNED 2026-07-09 (user: "too sticky… fake, should flow like fabric") —
`cloth.js` + loop in App.jsx:
- Damping default 0.985 → **0.997** (the old default ate ~60% of all motion
  per second — that WAS the stickiness; now swings persist several seconds).
- **Grab steers instead of pins**: the grabbed node moves 55%-toward-pointer
  per substep with px/py untouched, so it keeps a real velocity — the fabric
  can be thrown, and release mid-swing flows instead of stopping dead.
- **Anisotropic constraints** (the fabric-vs-rubber fix): structural stretch
  1.0 / compression 0.5 (cloth buckles into folds, doesn't push back);
  shear (diagonals) 0.35/0.25 (fabric drapes/shears easily). Was uniform 1.0.
- Sim now runs **fixed 1/240s substeps** via an accumulator (SUB_DT export),
  so 60/90/120Hz displays all get the same smooth motion; iterations are per
  substep (slider 1–6, default 3). Node grid finer: caps 28×40 → **36×52**.
- Breeze force is now independent of the gravity dial. Gravity default 0.45g.
- Measured (fling-release probe): sustained fabric motion 4s+ after release
  (was dead in ~1s); all 9 kinetic.mjs checks still pass at 90fps.

RETUNED AGAIN 2026-07-09 (user: "too elastic — beadwork is cotton thread,
it would not bounce"): the swing must be pendulum + drape, never spring.
- **Strain limit** (the key fix): after normal relaxation, 2 hard passes
  clamp every STRUCTURAL thread to ≤1.01× rest length (`STRAIN_LIMIT`,
  cloth.js) — leftover solver stretch can no longer store spring energy,
  which is exactly what the bounce was.
- **Bend constraints added** (kind 2: skip-one neighbours, stiffness 0.18)
  — kill the jelly ripples without stiffening the drape.
- Shear up 0.35→0.5, structural compression 0.5→0.6 (a woven bead net is
  firmer in-plane than loose cloth); damping default 0.997→0.995 (swings
  settle like beads on thread, not endless jello); iterations default 4.
- Measured: yanking the panel's bottom edge to the floor extends it only
  4.7% (weave give, not stretch); on release the bottom edge returns in
  <250ms and holds ±1px — zero vertical bounce. Still 90fps, 9/9 checks.
- 2026-07-09 "decrease the bounce to 0": `STRAIN_LIMIT` 1.01 → **1.0**
  (threads clamp at exactly rest length, 3 passes). Bottom edge after a
  full yank-release: flat ±1px from the first sample — bounce is zero.
  The ~4.6% give under an active pull is the weave narrowing (shear),
  i.e. drape, and stays — hardening it would make the panel a rigid board.
- 2026-07-13 "remove the bounce altogether — no bounce in the real swatch":
  defaults now REAL-SWATCH DEAD — settle 0.988→**0.96** (slider floor
  lowered 0.98→0.94; beads-rubbing/thread friction eats a swing within one
  motion), breeze default **0**, gravity **0.7g**, structural K_COMPRESS
  0.6→**0.8** (a squashed fold falls open under gravity instead of springing
  open — compressed threads storing push-back read as bounce). Measured
  (raw-pixel probe): fling 32k→9k→6k→1k changed px over 2.7s, strictly
  monotonic decay, no rebound spike = settling, not oscillation. A corner
  can legitimately come to rest folded over itself (real fabric does);
  Re-hang flat resets it.
- 2026-07-13 "very flat and fallen drape" + user wants to self-edit: all
  feel knobs consolidated into two commented EDIT-ME blocks —
  **cloth.js ~83–108** (`K_STRETCH`/`K_COMPRESS` per thread kind,
  `STRAIN_LIMIT`, `GRAB_FOLLOW`) and **App.jsx 13–17** (`DIALS` dial
  defaults). New calm defaults: gravity 0.45→**0.6g**, breeze 0.15→**0.05**,
  settle 0.995→**0.988**. Measured (raw canvas-pixel motion, breeze 0): a
  hard fling decays 25k→1.2k changed px in ~4s = one-two heavy swings then
  dead still. NOTE: screenshot-PNG byte-diff is a USELESS motion metric
  (compression scrambles all bytes on any 1px change) — probe real pixels
  via getImageData, as kinetic probes now do.

RESTYLED 2026-07-09 (per user): the "Raw Ceramic" serif/mono editorial look is
GONE. Kinetic UI = **Satoshi only** (sans, via Fontshare CDN), clean +
contemporary: floating rounded panels (16px radius) on a #F1F0EE ground, NO
hairline borders or outline strokes anywhere (buttons are soft-filled,
radius 10), sentence-case labels (no UPPERCASE_SNAKE), intro text +
instructions block removed, status = a black pill toast over the canvas,
bead sprites lose the ink rim (fill + glaze highlight only).

IMPLEMENTED 2026-07-03 (`src/App.jsx`) — **snappy zoom/pan** (drill item #3,
responsiveness):
- Problem: every zoom/pan step re-ran `drawScene`, which re-iterates every placed
  bead — ~100ms/frame on a filled 100×100 (~10fps, "doesn't feel clean/fast").
- Fix: cache the last full render (`sceneCacheRef`) + the view it was drawn at
  (`cacheViewRef`). While a gesture is active (`interactingRef`), the rAF chooser
  in `drawRef` calls `drawBlit` — ONE `drawImage` of the cached bitmap under the
  transform delta `devMat(view) · devMat(cacheView)⁻¹` (a DOMMatrix) — instead of
  `drawScene`. ~100ms → ~1ms per frame. It settles to a crisp full render (which
  refreshes the cache) ~130ms after the gesture stops (`beginInteract` debounce).
- Wiring: `beginInteract()` is called from the wheel listener (via
  `beginInteractRef`), the pan branch, and the pinch branch of `onPointerMove`.
  The scene-repaint effect now goes through `requestRedraw()` so it uses the same
  fast/blit/full chooser. Same pattern as the existing `drawStrokeFast` snapshot.
- Tradeoff: area revealed mid-gesture (zoom-out / pan past the old viewport) is
  blank until the ~130ms settle — invisible for a normal quick gesture.
- Verified `scripts/zoompan.mjs`: a rapid 18-step zoom burst + pan on a filled
  100×100 produced ZERO long-tasks (was ~37 × ~100ms), and the settled view is a
  crisp woven render (24.7% gap at 40% zoom), no errors.
