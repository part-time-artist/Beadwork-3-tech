import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { getTechnique, DEFAULT_TECHNIQUE, TECHNIQUES } from './techniques'
import { renderFullChart, renderLegend, rasterScale, PX_PER_MM } from './lib/chart'
import {
  listArtworks,
  getArtwork,
  putArtwork,
  deleteArtwork as dbDeleteArtwork,
  getMeta,
  setMeta,
} from './lib/store'

// ---- design tokens: "Nothing" design language (see .claude/skills/nothing-design).
// Monochrome black/white/grey + one red accent used sparingly. Dotted-grid chrome,
// UPPERCASE monospace labels. Artboard stays light so bead colours stay honest.
const T = {
  bg: '#000000', // pure black backdrop + sidebar
  panel: '#000000', // sidebar
  panelSolid: '#0f0f0f', // section blocks
  ink: '#f2f2f2', // primary text
  inkSoft: '#7a7a7a', // muted labels
  line: '#262626', // hairlines / dotted grid
  active: '#f2f2f2', // monochrome active = white fill, black text
  activeInk: '#000000',
  accent: '#d6001c', // Nothing red — primary action + dots only
  pill: '#171717', // input / control background
  artboard: '#f3f3f4', // the canvas (light, for honest colour)
  radius: 6,
  mono: "'SFMono-Regular', ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace",
}

const STORAGE_KEY = 'beadwork3_palettes_v1'
const DESIGN_KEY = 'beadwork3_design_v1'
const DESIGNS_KEY = 'beadwork3_designs_v1' // named design slots
const RECENT_KEY = 'beadwork3_recent_v1' // recently used colours (survives a crash/reload)
// build stamp (injected by Vite; 'dev' when running the dev server)
const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev'

// Default preset: the user's own 5 colours (2026-06-11) — soft pink,
// chartreuse, sky blue, bone, deep violet. (Bead colours may be rich; only
// the UI chrome must stay muted, spec §7.5.)
const DEFAULT_PALETTE = ['#F3CEDE', '#D8DA5F', '#8BBEDD', '#F4EEDF', '#4A3772']

const key = (c, r) => `${c},${r}`

// The only two bead sizes. Both 4:5 (width:height); stated size = bead width.
// 1.5mm × PACK_X (1.296) = 1.944mm pitch → exactly 36 beads across 7cm,
// matching the user's real woven swatch (corrected 2026-06-10).
const BEAD_SIZES = [
  { label: '1.5 mm', w: 1.5, h: 1.875 },
  { label: '3 mm', w: 3, h: 3.75 },
]

const HISTORY_MAX = 50 // undo steps (one stroke / fill / selection op = one step)

// New artworks auto-name from the forest (Morii = forest). Pick the next unused
// name; once the list is exhausted, append a number ("Oak 2"…). Rename anytime.
const TREE_NAMES = [
  'Oak', 'Willow', 'Cedar', 'Birch', 'Rowan', 'Alder', 'Hazel', 'Aspen', 'Maple',
  'Elm', 'Pine', 'Holly', 'Hawthorn', 'Juniper', 'Linden', 'Spruce', 'Larch',
  'Beech', 'Ash', 'Yew', 'Fern', 'Moss', 'Ivy', 'Bramble', 'Thicket', 'Glade',
]
function nextTreeName(usedNames) {
  const used = new Set(usedNames)
  for (const t of TREE_NAMES) if (!used.has(t)) return t
  for (let n = 2; ; n++) for (const t of TREE_NAMES) if (!used.has(`${t} ${n}`)) return `${t} ${n}`
}

// The view transform is: screen = scale · R(rot) · doc + (tx,ty), where R is a
// rotation. These invert/apply it so every screen↔document conversion (drawing,
// hit-test, pinch, zoom) stays correct once the canvas can be rotated.
function screenToDoc(sx, sy, v) {
  const dx = sx - v.tx
  const dy = sy - v.ty
  const c = Math.cos(v.rot || 0)
  const s = Math.sin(v.rot || 0)
  return { x: (c * dx + s * dy) / v.scale, y: (-s * dx + c * dy) / v.scale }
}

// short "last edited" label for the gallery
function timeAgo(ts) {
  if (!ts) return '—'
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} hr ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d} day${d > 1 ? 's' : ''} ago`
  return new Date(ts).toLocaleDateString()
}

// Fully "packed" view: filled beads are DRAWN this much larger than their true
// size, so neighbouring beads press together the way real woven beads do and a
// motif reads as continuous fabric instead of scattered dots. The spacing slider
// blends from true size (0) up to this (1); beads just kiss at ~1.15, i.e. 0.75
// on the slider (the default). Pure rendering — bead centres, hit-testing,
// counts and the printed chart are untouched.
const PACKED_DRAW = 1.2

// Reference images are downscaled to this longest side before storing, so a
// full-res phone photo can't decode to tens of MB and crash iPad Safari.
const MAX_IMG_SIDE = 2400

export default function Home() {
  // ---- technique ----
  // One artwork = one technique, FIXED for that artwork (no mid-artwork
  // switching — changing technique starts a new artwork). The technique supplies
  // the grid (the only thing that differs); everything else is shared. Chosen
  // up front via the chooser popup; saved designs carry the choice.
  const [techniqueId, setTechniqueId] = useState(DEFAULT_TECHNIQUE)
  const tech = useMemo(() => getTechnique(techniqueId), [techniqueId])
  // chooser popup: 'start' on first load (forces a choice), 'new' from the New
  // artwork button (cancellable), or null when closed.
  const [chooser, setChooser] = useState(null)

  // ---- physical model ----
  // Two fixed bead sizes, both 4:5 ratio (width:height). Stated size = bead width.
  const [beadMM, setBeadMM] = useState({ w: 1.5, h: 1.875 }) // 1.5 mm default
  const [canvasCm, setCanvasCm] = useState({ w: 10, h: 7 }) // physical canvas (cm)

  // derived bead/row counts from the physical sizes (same packing as screen)
  const { cols, rows } = useMemo(
    () =>
      tech.beadCountFromCm({
        canvasWcm: canvasCm.w,
        canvasHcm: canvasCm.h,
        beadWmm: beadMM.w,
        beadHmm: beadMM.h,
      }),
    [canvasCm, beadMM, tech]
  )

  // ---- rendering size ----
  // Bead px is tied to PHYSICAL mm (× SCREEN_PXMM), so the artboard size tracks the
  // cm canvas, NOT the bead count. Changing bead size then changes density (how many
  // beads fit), while the canvas stays the size set in cm. Zoom/pan is a view
  // transform, so the canvas element always matches the viewport (no 16k-px limit).
  const SCREEN_PXMM = 8 // screen px per physical mm
  const Bw = beadMM.w * SCREEN_PXMM
  const Bh = beadMM.h * SCREEN_PXMM

  const geo = useMemo(
    () => tech.makeGeometry({ Bw, Bh, cols, rows }),
    [Bw, Bh, cols, rows, tech]
  )

  // view transform: screen px = scale · R(rot) · doc + t.  rot (radians) lets the
  // canvas be rotated with a two-finger twist. viewport = pasteboard size.
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0, rot: 0 })
  const [viewport, setViewport] = useState({ w: 1, h: 1 })

  // ---- design data ----
  // The design is a STACK of layers (array order = bottom→top; index 0 is the
  // bottom). Each layer is its own bead Map. `beads`/`beadsRef` mirror the
  // ACTIVE layer, so every existing edit path (strokes, fill, selection,
  // pattern, duplicate) keeps operating on a single Map; writes are synced back
  // into the active layer entry. Where two visible layers fill the same node
  // the TOP one wins (a woven bead is one solid colour — no blending).
  const uid = () => Math.random().toString(36).slice(2, 9)
  // Three layer types share one stack: 'bg' (the solid background colour, always
  // layers[0], hide ⇒ transparent), 'image' (a placeable reference photo) and
  // 'bead' (the paintable default). bead/image carry an (often empty) beads Map
  // so bead-count budgets and merge maths stay uniform.
  const makeLayer = (name, beadMap = new Map()) => ({
    id: uid(), name, type: 'bead', visible: true, locked: false, alphaLock: false, beads: beadMap,
  })
  const makeBgLayer = (color = '#FFFFFF') => ({
    id: uid(), name: 'Background', type: 'bg', visible: true, locked: false, alphaLock: false,
    color, beads: new Map(),
  })
  // src = persisted data URL; img = the runtime HTMLImageElement (reloaded from
  // src on open). t = placement in DOC pixels (so it stays fixed when the canvas
  // cm size changes). opacity dims it for tracing.
  const makeImageLayer = (src, img = null, t = null, opacity = 1) => ({
    id: uid(), name: 'Image', type: 'image', visible: true, locked: false, alphaLock: false,
    src, img, t: t || { x: 0, y: 0, scale: 1 }, opacity, beads: new Map(),
  })
  const firstLayersRef = useRef(null)
  if (!firstLayersRef.current) {
    const beadL = makeLayer('Layer 1')
    firstLayersRef.current = { layers: [makeBgLayer('#FFFFFF'), beadL], activeId: beadL.id }
  }
  const [layers, setLayers] = useState(() => firstLayersRef.current.layers)
  const [activeId, setActiveId] = useState(() => firstLayersRef.current.activeId)
  const [beads, setBeads] = useState(() => firstLayersRef.current.layers.find((l) => l.type === 'bead').beads)
  const [showLayers, setShowLayers] = useState(false)
  const [tool, setTool] = useState('draw') // draw | erase | select
  const [color, setColor] = useState('#F3CEDE') // starts on the palette's pink
  const [pack, setPack] = useState(0.75) // 0 = spaced (true size) … 1 = max packed; 0.75 ≈ touching
  const [brush, setBrush] = useState(1) // brush radius in beads
  const [recentColors, setRecentColors] = useState(() => {
    // seed from localStorage so a crash/reload keeps your recent colours
    try { const r = localStorage.getItem(RECENT_KEY); return r ? JSON.parse(r) : [] } catch (e) { return [] }
  }) // up to 5 recently used
  const [selection, setSelection] = useState(() => new Set()) // selected bead keys
  const [marquee, setMarquee] = useState(null) // live select rectangle (doc coords)

  const pushRecent = useCallback((c) => {
    setRecentColors((prev) => {
      const next = [c, ...prev.filter((x) => x !== c)].slice(0, 5)
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
  }, [])

  // Transient toast (e.g. "layer is locked"); auto-clears after a moment.
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(0)
  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1900)
  }, [])

  // ---- undo / redo ----
  // History stores whole bead Maps (they're replaced immutably, so pushing the
  // old reference is free). Strokes snapshot once at pointer-down (endDrag
  // commits it only if the stroke changed something); one-shot edits (fill,
  // selection ops, clear) go through `commit`, which snapshots only on change.
  const beadsRef = useRef(beads)
  // Live mirrors of the layer stack + active id, updated SYNCHRONOUSLY by the
  // layer writers below (React state lags behind fast pencil events). beadsRef
  // is always the active layer's Map; layersRef is the whole stack.
  const layersRef = useRef(null)
  if (!layersRef.current) layersRef.current = layers
  const activeIdRef = useRef(activeId)
  // the active layer can be edited only when it is visible and unlocked; the
  // ref lets pointer handlers (closures) read the latest value
  const canEditRef = useRef(true)
  const undoStack = useRef([])
  const redoStack = useRef([])
  const strokeBase = useRef(null) // beads Map at stroke start
  const patternBaseRef = useRef(null) // beads before the last pattern apply (see makePattern)

  // Repaint the canvas straight from beadsRef on the next animation frame —
  // no React render. Pencil strokes go through this: re-rendering the whole
  // component tree per pointer event (120–240Hz) churned enough memory to get
  // the tab killed on iPad Safari.
  const rafRef = useRef(0)
  const drawRef = useRef(null) // latest drawScene (assigned every render below)
  const requestRedraw = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const canvas = canvasRef.current
      if (canvas && drawRef.current) drawRef.current(canvas.getContext('2d'))
    })
  }, [])

  // The brush hover ghost lives on its OWN thin canvas stacked over the board.
  // Repainting only the ghost (a handful of ovals) instead of the whole scene
  // (thousands of outlined beads on a big canvas) keeps it glued to the cursor —
  // previously it rode the full-scene rAF and lagged a few frames behind ("train").
  const overlayRafRef = useRef(0)
  const overlayDrawRef = useRef(null) // latest drawOverlay (assigned every render)
  const requestOverlay = useCallback(() => {
    if (overlayRafRef.current) return
    overlayRafRef.current = requestAnimationFrame(() => {
      overlayRafRef.current = 0
      const canvas = overlayRef.current
      if (canvas && overlayDrawRef.current) overlayDrawRef.current(canvas.getContext('2d'))
    })
  }, [])

  // SINGLE write path for the design Map. beadsRef is advanced SYNCHRONOUSLY,
  // never via an effect: React renders lag behind fast pencil events, so a new
  // stroke reading render-time state could start from a stale Map and wipe the
  // previous stroke. Everything that changes beads must go through applyBeads.
  // silent = repaint only (strokes); endDrag syncs React state once per stroke.
  // Write the active layer's new bead Map into the live stack too. Deferred for
  // silent strokes (rebuilding the array 240×/s would defeat the rAF path) —
  // endDrag calls syncActiveLayer once at stroke end to commit it to React.
  const writeActiveLayer = (map) => {
    const nl = layersRef.current.map((l) =>
      l.id === activeIdRef.current ? { ...l, beads: map } : l
    )
    layersRef.current = nl
    return nl
  }
  const syncActiveLayer = () => setLayers(writeActiveLayer(beadsRef.current))

  const applyBeads = useCallback((next, silent = false) => {
    if (typeof next === 'function') next = next(beadsRef.current)
    if (next === beadsRef.current) return
    beadsRef.current = next
    patternBaseRef.current = null // any normal edit ends pattern layout-swapping
    if (silent) requestRedraw()
    else {
      setBeads(next)
      setLayers(writeActiveLayer(next))
    }
  }, [requestRedraw])

  // A history entry is a whole-document snapshot { layers, activeId }. Layer
  // bead Maps are immutable (replaced on change), so a snapshot just shares the
  // unchanged Map references — cheap, like the single-Map snapshots before.
  // currentDoc reads the LIVE refs (never stale React state).
  const currentDoc = () => ({ layers: layersRef.current, activeId: activeIdRef.current })
  const docBeads = (doc) => {
    let t = 0
    for (const l of doc.layers) t += l.beads.size
    return t
  }

  // Restore a document snapshot into both the live refs and React state.
  const applyDoc = (doc) => {
    layersRef.current = doc.layers
    const active = doc.layers.find((l) => l.id === doc.activeId) || doc.layers[0]
    activeIdRef.current = active ? active.id : null
    beadsRef.current = active ? active.beads : new Map()
    patternBaseRef.current = null
    setLayers(doc.layers)
    setActiveId(activeIdRef.current)
    setBeads(beadsRef.current)
    setSelection(new Set())
    setPlacing(null)
  }

  // History is capped by TOTAL stored beads (across all layers) as well as
  // steps: 50 snapshots of a dense full-canvas design is hundreds of MB —
  // enough for iPad Safari to kill the tab. On a large lattice each snapshot is
  // big, so we scale BOTH caps down as the canvas grows (you rarely undo more
  // than a few steps, so shallower history on big art is a fair trade for not
  // crashing). At least one step always stays.
  const HISTORY_BEAD_BUDGET = 250000
  const historyCaps = () => {
    const cells = cols * rows
    if (cells > 10000) return { steps: 15, budget: 100000 }
    if (cells > 5000) return { steps: 25, budget: 160000 }
    return { steps: HISTORY_MAX, budget: HISTORY_BEAD_BUDGET }
  }
  const pushHistory = (prevDoc) => {
    const st = undoStack.current
    st.push(prevDoc)
    redoStack.current = []
    const { steps, budget } = historyCaps()
    let total = 0
    for (const d of st) total += docBeads(d)
    while (st.length > steps || (st.length > 1 && total > budget)) {
      total -= docBeads(st[0])
      st.shift()
    }
  }

  const commit = useCallback((updater) => {
    const prev = beadsRef.current
    const next = updater(prev)
    if (next === prev) return
    pushHistory(currentDoc())
    applyBeads(next)
  }, [applyBeads])

  const undo = useCallback(() => {
    if (!undoStack.current.length) return
    redoStack.current.push(currentDoc())
    applyDoc(undoStack.current.pop())
  }, [])
  const redo = useCallback(() => {
    if (!redoStack.current.length) return
    undoStack.current.push(currentDoc())
    applyDoc(redoStack.current.pop())
  }, [])

  // ---- layer operations ----------------------------------------------------
  // Content changes (add/delete/duplicate/merge/reorder) are one undo step
  // each; metadata toggles (visibility/lock/rename/switch-active) are not.
  const switchLayer = (id) => {
    const l = layersRef.current.find((x) => x.id === id)
    if (!l || id === activeIdRef.current) return
    activeIdRef.current = id
    beadsRef.current = l.beads
    setActiveId(id)
    setBeads(l.beads)
    setSelection(new Set()) // selection keys belong to the old active layer
    setPlacing(null)
    patternBaseRef.current = null
  }

  const makeActive = (l) => {
    activeIdRef.current = l.id
    beadsRef.current = l.beads
    setActiveId(l.id)
    setBeads(l.beads)
  }

  const addLayer = () => {
    pushHistory(currentDoc())
    const l = makeLayer(`Layer ${layersRef.current.length + 1}`)
    const idx = layersRef.current.findIndex((x) => x.id === activeIdRef.current)
    const nl = [...layersRef.current]
    nl.splice(idx + 1, 0, l) // insert just above the active layer
    layersRef.current = nl
    setLayers(nl)
    makeActive(l)
    setSelection(new Set())
    setPlacing(null)
  }

  const duplicateLayer = (id) => {
    const idx = layersRef.current.findIndex((l) => l.id === id)
    const src = layersRef.current[idx]
    if (!src || src.type === 'bg') return // the background colour isn't duplicable
    pushHistory(currentDoc())
    const copy = src.type === 'image'
      ? { ...makeImageLayer(src.src, src.img, { ...src.t }, src.opacity), name: `${src.name} copy`, visible: src.visible }
      : { ...makeLayer(`${src.name} copy`, new Map(src.beads)), visible: src.visible, locked: src.locked, alphaLock: src.alphaLock }
    const nl = [...layersRef.current]
    nl.splice(idx + 1, 0, copy)
    layersRef.current = nl
    setLayers(nl)
    makeActive(copy)
    setSelection(new Set())
    setPlacing(null)
  }

  const deleteLayer = (id) => {
    const target = layersRef.current.find((l) => l.id === id)
    if (!target || target.type === 'bg') return // never delete the background layer
    // keep at least one bead layer so there's always somewhere to draw
    if (target.type === 'bead' && layersRef.current.filter((l) => l.type === 'bead').length <= 1) {
      showToast('Keep at least one bead layer')
      return
    }
    pushHistory(currentDoc())
    const nl = layersRef.current.filter((l) => l.id !== id)
    layersRef.current = nl
    setLayers(nl)
    if (adjustIdRef.current === id) setAdjustId(null)
    if (activeIdRef.current === id) {
      const fallback = [...nl].reverse().find((l) => l.type === 'bead') || nl[nl.length - 1]
      makeActive(fallback)
    }
    setSelection(new Set())
    setPlacing(null)
  }

  // Merge a layer DOWN into the one below it; top-wins, so the upper layer's
  // beads overwrite the lower's where they share a node. Bead layers only.
  const mergeDown = (id) => {
    const idx = layersRef.current.findIndex((l) => l.id === id)
    if (idx <= 0) return // nothing below to merge into
    const upper = layersRef.current[idx]
    const lower = layersRef.current[idx - 1]
    if (upper.type !== 'bead' || lower.type !== 'bead') return // only bead↓bead merges
    pushHistory(currentDoc())
    const merged = new Map(lower.beads)
    for (const [k, v] of upper.beads) merged.set(k, v)
    const lowerMerged = { ...lower, beads: merged }
    const nl = [...layersRef.current]
    nl[idx - 1] = lowerMerged
    nl.splice(idx, 1)
    layersRef.current = nl
    setLayers(nl)
    makeActive(lowerMerged)
    setSelection(new Set())
    setPlacing(null)
  }

  // dir +1 = move up toward the top, -1 = down toward the bottom. The bg layer
  // is pinned to the bottom (index 0) and nothing may move below it.
  const moveLayer = (id, dir) => {
    const idx = layersRef.current.findIndex((l) => l.id === id)
    if (layersRef.current[idx]?.type === 'bg') return // bg never moves
    const j = idx + dir
    if (j < 1 || j >= layersRef.current.length) return // index 0 stays the bg layer
    pushHistory(currentDoc())
    const nl = [...layersRef.current]
    const [m] = nl.splice(idx, 1)
    nl.splice(j, 0, m)
    layersRef.current = nl
    setLayers(nl)
  }

  const renameLayer = (id, name) => {
    const nl = layersRef.current.map((l) => (l.id === id ? { ...l, name } : l))
    layersRef.current = nl
    setLayers(nl)
  }
  const toggleVisible = (id) => {
    const nl = layersRef.current.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    layersRef.current = nl
    setLayers(nl)
    requestRedraw()
  }
  const toggleLock = (id) => {
    const nl = layersRef.current.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l))
    layersRef.current = nl
    setLayers(nl)
  }
  const toggleAlphaLock = (id) => {
    const nl = layersRef.current.map((l) => (l.id === id ? { ...l, alphaLock: !l.alphaLock } : l))
    layersRef.current = nl
    setLayers(nl)
  }

  const activeLayer = layers.find((l) => l.id === activeId) || null
  // A bead layer can be drawn on only when it's visible, unlocked, and not an
  // image/background layer (those hold no bead Map to paint into).
  const canEdit = !!activeLayer && activeLayer.visible && !activeLayer.locked &&
    activeLayer.type !== 'image' && activeLayer.type !== 'bg'
  canEditRef.current = canEdit
  // alpha lock: when on, drawing/fill may only RECOLOUR beads already on the
  // active layer — never add to an empty cell or erase (no shape change).
  const alphaLockRef = useRef(false)
  alphaLockRef.current = !!(activeLayer && activeLayer.alphaLock)
  // Why drawing is blocked on the active layer — shown as a toast on attempt.
  const blockedReason = useCallback(() => {
    const l = activeLayer
    if (!l) return 'No layer selected'
    if (l.type === 'image') return 'Image layer — switch to a bead layer to draw'
    if (l.type === 'bg') return 'Background layer — switch to a bead layer to draw'
    if (!l.visible) return 'Layer is hidden — show it to draw'
    if (l.locked) return 'Layer is locked — unlock it to draw'
    return 'Can’t draw on this layer'
  }, [activeLayer])
  const blockedRef = useRef(blockedReason)
  blockedRef.current = blockedReason

  // Per-cell tilt (radians) — defined by the technique (3-bead woven tilt /
  // 1-bead upright). See each module's tiltFor.
  const tiltFor = useCallback(
    (col, row) => tech.tiltFor(col, row),
    [tech]
  )

  // ---- background & image layers ----
  // The bottom layer (layers[0], type 'bg') is the solid background colour; hide
  // it for a transparent canvas. Reference photos are 'image' layers above it.
  // Adjust mode routes canvas gestures to move/resize ONE image layer.
  const [adjustId, setAdjustId] = useState(null)
  const adjustIdRef = useRef(null)
  adjustIdRef.current = adjustId
  const bgLayer = layers[0] && layers[0].type === 'bg' ? layers[0] : null
  const adjustLayer = adjustId ? layers.find((l) => l.id === adjustId && l.type === 'image') : null

  // Update one layer (no undo step — used for live image move/resize, colour).
  const updateLayer = useCallback((id, patch) => {
    const nl = layersRef.current.map((l) =>
      l.id === id ? { ...l, ...(typeof patch === 'function' ? patch(l) : patch) } : l
    )
    layersRef.current = nl
    setLayers(nl)
  }, [])

  // Snap an image's edges/corners to the canvas edges (0,0 → docW,docH) when
  // within ~12 doc px, so a reference can be lined up to the canvas exactly.
  const snapImageT = useCallback((t, img) => {
    if (!img) return t
    const docW = geo.width
    const docH = geo.height
    const w = img.width * t.scale
    const h = img.height * t.scale
    const TH = 12
    let { x, y } = t
    if (Math.abs(x) < TH) x = 0                         // left → canvas left
    else if (Math.abs(x + w - docW) < TH) x = docW - w  // right → canvas right
    if (Math.abs(y) < TH) y = 0                         // top → canvas top
    else if (Math.abs(y + h - docH) < TH) y = docH - h  // bottom → canvas bottom
    return { ...t, x, y }
  }, [geo.width, geo.height])

  // resize the adjust image by `factor`, keeping the doc point under (sx,sy) fixed
  const imageZoomAt = (factor, sx, sy) => {
    const l = adjustIdRef.current
      ? layersRef.current.find((x) => x.id === adjustIdRef.current && x.type === 'image')
      : null
    if (!l || !l.img) return
    const m = screenToDoc(sx, sy, view)
    updateLayer(l.id, (lay) => {
      const ns = clampNum(lay.t.scale * factor, 0.05, 12)
      const ff = ns / lay.t.scale
      // keep the doc point under the cursor fixed as the image scales about it
      return { t: snapImageT({ scale: ns, x: m.x - (m.x - lay.t.x) * ff, y: m.y - (m.y - lay.t.y) * ff }, lay.img) }
    })
  }
  const imageZoomAtRef = useRef(imageZoomAt)
  imageZoomAtRef.current = imageZoomAt

  const setBgColor = (color) => { if (bgLayer) updateLayer(bgLayer.id, { color }) }

  // Add a reference photo as a new image layer above the active layer, then
  // jump straight into Adjust mode to place it (it starts contain-fit, centred).
  const addImageLayer = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const src = reader.result
      const img = new Image()
      img.onload = () => {
        // Downscale big photos before storing: a full-res phone shot decodes to
        // tens of MB and is saved into IndexedDB on every artwork — a prime
        // cause of iPad Safari killing the tab. Cap the longest side; keep the
        // downscaled canvas as the layer bitmap and a JPEG data URL as `src`.
        let finalImg = img
        let finalSrc = src
        const longest = Math.max(img.width, img.height)
        if (longest > MAX_IMG_SIDE) {
          const k = MAX_IMG_SIDE / longest
          const cw = Math.max(1, Math.round(img.width * k))
          const ch = Math.max(1, Math.round(img.height * k))
          const cnv = document.createElement('canvas')
          cnv.width = cw; cnv.height = ch
          cnv.getContext('2d').drawImage(img, 0, 0, cw, ch)
          finalImg = cnv // a canvas works as a drawImage source and has w/h
          finalSrc = cnv.toDataURL('image/jpeg', 0.85)
        }
        const docW = geo.width
        const docH = geo.height
        const iw = finalImg.width
        const ih = finalImg.height
        const scale = Math.min(docW / iw, docH / ih) || 1
        const t = { scale, x: (docW - iw * scale) / 2, y: (docH - ih * scale) / 2 }
        pushHistory(currentDoc())
        const layer = makeImageLayer(finalSrc, finalImg, t, 1)
        const idx = layersRef.current.findIndex((x) => x.id === activeIdRef.current)
        const nl = [...layersRef.current]
        nl.splice(Math.max(1, idx + 1), 0, layer) // above active, never below bg
        layersRef.current = nl
        setLayers(nl)
        makeActive(layer) // select it (beadsRef → its empty Map; drawing stays blocked)
        setAdjustId(layer.id)
        setShowLayers(true)
        setSelection(new Set())
        setPlacing(null)
        requestRedraw()
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }

  // ---- printed-chart settings ----
  const [printBeadMm, setPrintBeadMm] = useState(8) // fixed bead size on paper (mm)
  const [exportBg, setExportBg] = useState('transparent') // transparent | screen
  const beadRatio = beadMM.h / beadMM.w

  // ---- palettes ----
  const [palette, setPalette] = useState(DEFAULT_PALETTE)
  const [savedPalettes, setSavedPalettes] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSavedPalettes(JSON.parse(raw))
    } catch (e) {}
  }, [])

  const persistPalettes = (list) => {
    setSavedPalettes(list)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch (e) {}
  }

  // ---- mutate beads ----
  const floodFill = useCallback(
    (cell, useColor = color) => {
      if (!cell) return
      if (!canEditRef.current) { showToast(blockedRef.current()); return }
      commit((prev) => {
        const target = prev.get(key(cell.col, cell.row)) || null
        if (target === useColor) return prev
        // alpha lock: fill may only recolour existing beads, not flood empty cells
        if (alphaLockRef.current && target === null) return prev
        const next = new Map(prev)
        const stack = [cell]
        const seen = new Set()
        while (stack.length) {
          const { col, row } = stack.pop()
          if (col < 0 || col >= cols || row < 0 || row >= rows) continue
          if (!tech.beadExists(col, row)) continue // skip empty apex nodes
          const k = key(col, row)
          if (seen.has(k)) continue
          seen.add(k)
          const cur = prev.get(k) || null
          if (cur !== target) continue // boundary: stop at differently-colored beads
          next.set(k, useColor)
          // technique-defined neighbours (3-bead staggered / 1-bead orthogonal)
          for (const n of tech.floodNeighbors(col, row)) stack.push(n)
        }
        return next
      })
    },
    [color, cols, rows, commit, tech]
  )

  // beads covered by the brush at doc point (x,y): the bead under the cursor for
  // brush 1, or all existing beads within a radius that grows with brush size.
  const brushCells = useCallback(
    (x, y) => {
      if (brush <= 1) {
        const n = tech.beadAt(geo, x, y)
        return n ? [n] : []
      }
      const out = []
      const radius = (brush - 1) * Math.min(geo.Px, geo.Py) * 0.62 + Bw * 0.6
      const approxRow = Math.round((y - geo.padY) / geo.Py)
      const approxCol = Math.round((x - geo.padX) / geo.Px)
      const span = brush + 1
      for (let row = approxRow - span; row <= approxRow + span; row++) {
        if (row < 0 || row >= rows) continue
        for (let col = approxCol - span; col <= approxCol + span; col++) {
          if (col < 0 || col >= cols) continue
          if (!tech.beadExists(col, row)) continue
          const { cx, cy } = geo.centerFor(col, row)
          const dx = x - cx
          const dy = y - cy
          if (dx * dx + dy * dy <= radius * radius) out.push({ col, row })
        }
      }
      return out
    },
    [brush, geo, Bw, rows, cols, tech]
  )

  const paintBrush = useCallback(
    (x, y, mode) => {
      const cells = brushCells(x, y)
      if (!cells.length) return
      const alpha = alphaLockRef.current // recolour-only: no shape change
      // Mutate the active bead Map IN PLACE, cloning it ONCE per stroke (lazily,
      // on the first real change). `strokeBase` holds the pre-stroke Map; while
      // beadsRef still points at it we clone before the first write, then keep
      // mutating that private copy. This avoids cloning the whole Map on every
      // pointer event (240Hz) — the allocation churn that crashed iPad Safari on
      // dense designs. Undo is unaffected: strokeBase stays untouched, and an
      // all-no-op stroke never clones, so beadsRef === strokeBase → no commit.
      let map = beadsRef.current
      let changed = false
      for (const { col, row } of cells) {
        const k = key(col, row)
        if (mode === 'erase') {
          if (alpha) continue // alpha lock: erasing would change shape
          if (!map.has(k)) continue
          if (map === strokeBase.current) { map = new Map(map); beadsRef.current = map }
          map.delete(k); changed = true
        } else {
          if (map.get(k) === color) continue
          if (alpha && !map.has(k)) continue // only recolour existing beads
          if (map === strokeBase.current) { map = new Map(map); beadsRef.current = map }
          map.set(k, color); changed = true
        }
      }
      if (changed) {
        patternBaseRef.current = null // any normal edit ends pattern layout-swapping
        requestRedraw() // silent: strokes repaint via rAF, no React render per event
      }
    },
    [brushCells, color, requestRedraw]
  )

  // ---- desktop brush hover preview ----
  // The beads the current brush would paint are ghosted grey on hover so the
  // user sees the footprint before clicking. Stored in a ref + repainted via
  // rAF (no React render); drawOverlay reads hoverRef.current and paints it on
  // the overlay canvas. Desktop mouse only — pen/touch have no hover state.
  const hoverRef = useRef([])
  const setHoverCells = useCallback(
    (cells) => {
      const cur = hoverRef.current
      const same = cur.length === cells.length &&
        cur.every((c, i) => c.col === cells[i].col && c.row === cells[i].row)
      if (same) return
      hoverRef.current = cells
      requestOverlay() // repaint only the ghost overlay, not the whole scene
    },
    [requestOverlay]
  )
  // drop a stale ghost when switching away from a paint tool or losing edit
  useEffect(() => {
    if (hoverRef.current.length) setHoverCells([])
  }, [tool, canEdit, brush, setHoverCells])

  // ---- selection (marquee Select tool) ----
  const finalizeSelection = useCallback(
    (rect) => {
      if (!rect) return
      const x0 = Math.min(rect.x0, rect.x1)
      const x1 = Math.max(rect.x0, rect.x1)
      const y0 = Math.min(rect.y0, rect.y1)
      const y1 = Math.max(rect.y0, rect.y1)
      const sel = new Set()
      const r0 = Math.max(0, Math.floor((y0 - geo.padY) / geo.Py) - 1)
      const r1 = Math.min(rows, Math.ceil((y1 - geo.padY) / geo.Py) + 1)
      const c0 = Math.max(0, Math.floor((x0 - geo.padX - geo.rowOffset) / geo.Px) - 1)
      const c1 = Math.min(cols, Math.ceil((x1 - geo.padX) / geo.Px) + 1)
      for (let row = r0; row < r1; row++) {
        for (let col = c0; col < c1; col++) {
          if (!tech.beadExists(col, row)) continue
          const k = key(col, row)
          if (!beads.has(k)) continue // only coloured beads are selectable
          const { cx, cy } = geo.centerFor(col, row)
          if (cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1) sel.add(k)
        }
      }
      setSelection(sel)
    },
    [geo, rows, cols, beads, tech]
  )

  const clearSelection = () => setSelection(new Set())

  const recolorSelection = () => {
    if (!selection.size || !canEdit) return
    pushRecent(color)
    commit((prev) => {
      const next = new Map(prev)
      for (const k of selection) next.set(k, color)
      return next
    })
  }

  const deleteSelection = () => {
    if (!selection.size || !canEdit) return
    commit((prev) => {
      const next = new Map(prev)
      for (const k of selection) next.delete(k)
      return next
    })
    clearSelection()
  }

  // Mirror the selection — horizontally ('h') or vertically ('v'). Keeps the
  // originals and adds a flipped DUPLICATE beside them, so the two read as a
  // symmetric pair. The technique builds the flipped copy on valid lattice
  // nodes; we drop it to the right/down, or to the left/up if that side has more
  // room. The new copy becomes the selection so it can be Moved or mirrored again.
  const mirrorSelection = (dir) => {
    if (!selection.size || !canEdit) return
    const cells = []
    for (const k of selection) {
      const fill = beadsRef.current.get(k)
      if (!fill) continue
      const [col, row] = k.split(',').map(Number)
      cells.push({ col, row, fill })
    }
    if (!cells.length) return
    const fits = (arr) =>
      arr.every(({ col, row }) => col >= 0 && col < cols && row >= 0 && row < rows)
    let copy = tech.mirror(cells, dir, 1)
    if (!fits(copy)) {
      const alt = tech.mirror(cells, dir, -1) // not enough room on that side — go the other way
      if (fits(alt)) copy = alt
    }
    const nextSel = new Set()
    commit((prev) => {
      const next = new Map(prev)
      for (const { col, row, fill } of copy) {
        if (col < 0 || col >= cols || row < 0 || row >= rows || !tech.beadExists(col, row)) continue
        const k = key(col, row)
        next.set(k, fill)
        nextSel.add(k)
      }
      return next
    })
    setSelection(nextSel)
  }

  // ---- duplicate / move & place ----------------------------------------------
  // Duplicate copies the selected coloured beads into a ghost "stamp"; Move
  // turns the selection itself into the ghost (originals hidden until placed
  // or cancelled). The ghost follows pen/mouse drags on the canvas; Place
  // commits as one undo step. placing = { mode: 'copy'|'move', motif:
  // [{dc,dr,fill}], baseC, baseR, c, r, hide } — (c,r) is the current origin
  // cell, (baseC,baseR) the original one (needed for parity), hide = original
  // bead keys to suppress while a move is in flight.
  const [placing, setPlacing] = useState(null)
  const placeDrag = useRef(null) // grab offset between pointer and ghost origin

  // Snap a dragged copy's origin to a valid cell. The 3-bead weave constrains
  // this to parity-valid origins (half-density + tilt checkerboard); the 1-bead
  // grid accepts any cell. The rule lives in the technique.
  const snapPlace = (x, y, pl) => tech.snapPlace(geo, x, y, pl)

  const startPlacing = (mode) => {
    if (!selection.size || !canEdit) return
    let minC = Infinity
    let minR = Infinity
    const cells = []
    for (const k of selection) {
      const fill = beadsRef.current.get(k)
      if (!fill) continue
      const [c, r] = k.split(',').map(Number)
      cells.push({ c, r, fill })
      if (c < minC) minC = c
      if (r < minR) minR = r
    }
    if (!cells.length) return
    // technique origin snap (3-bead even-snaps for parity; 1-bead is identity)
    ;({ minC, minR } = tech.snapMotifOrigin(minC, minR))
    const motif = cells.map(({ c, r, fill }) => ({ dc: c - minC, dr: r - minR, fill }))
    const { dc: offC, dr: offR } = tech.copyStartOffset
    setPlacing({
      mode,
      motif,
      baseC: minC,
      baseR: minR,
      // a copy starts nudged off the original (a technique-valid offset) so the
      // user can see it's a separate copy; a move starts in place — the
      // originals fade where they are
      c: mode === 'move' ? minC : minC + offC,
      r: mode === 'move' ? minR : minR + offR,
      // a move hides the originals while in flight; nothing is deleted until
      // Place, so Cancel simply unhides them
      hide: mode === 'move' ? new Set(cells.map(({ c, r }) => key(c, r))) : null,
    })
    clearSelection() // one highlight at a time: the ghost is the focus now
  }

  const placeMotif = () => {
    if (!placing || !canEdit) return
    const sel = new Set()
    commit((prev) => {
      let next = null
      const ensure = () => (next = next || new Map(prev))
      if (placing.mode === 'move') {
        for (const k of placing.hide) if (prev.has(k)) ensure().delete(k)
      }
      for (const { dc, dr, fill } of placing.motif) {
        const c = placing.c + dc
        const r = placing.r + dr
        if (c < 0 || c >= cols || r < 0 || r >= rows || !tech.beadExists(c, r)) continue
        const k = key(c, r)
        sel.add(k)
        if ((next || prev).get(k) !== fill) ensure().set(k, fill)
      }
      return next || prev
    })
    setSelection(sel) // the placed beads become the selection — chain freely
    setPlacing(null)
  }

  // ---- pattern maker -------------------------------------------------------
  // Repeats the selected motif across the WHOLE canvas in a classic textile
  // layout: grid (straight repeat), brick (every other row of repeats shifts
  // sideways by half a tile) or half-drop (every other column of repeats drops
  // by half a tile). The repeat lattice is anchored on the motif itself, so the
  // original beads are one tile of the pattern. Every offset is kept EVEN so
  // the weave's apex/base row parity and the tilt checkerboard survive (odd
  // shifts would put horizontal apex beads on tilted rows, and vice versa).
  const [patternGap, setPatternGap] = useState(0) // empty beads between repeats

  const makePattern = (mode) => {
    if (!selection.size || !canEdit) return
    // Clicking another layout (or re-clicking after a gap change) REPLACES the
    // previous pattern instead of stacking on top of it: while the last edit
    // was a pattern apply, we rebuild from the beads as they were before it.
    // Any other edit nulls patternBaseRef (in applyBeads) and ends swapping.
    const base = patternBaseRef.current || beadsRef.current
    // motif = the selected coloured beads, relative to an even-snapped origin
    let minC = Infinity
    let minR = Infinity
    let maxC = -Infinity
    let maxR = -Infinity
    const cells = []
    for (const k of selection) {
      const fill = base.get(k)
      if (!fill) continue
      const [c, r] = k.split(',').map(Number)
      cells.push({ c, r, fill })
      if (c < minC) minC = c
      if (c > maxC) maxC = c
      if (r < minR) minR = r
      if (r > maxR) maxR = r
    }
    if (!cells.length) return
    ;({ minC, minR } = tech.snapMotifOrigin(minC, minR))
    const motif = cells.map(({ c, r, fill }) => ({ dc: c - minC, dr: r - minR, fill }))
    // tile pitch = motif size + gap, snapped by the technique (3-bead rounds UP
    // to even for weave parity; 1-bead keeps the exact size)
    const px = tech.evenUp(maxC - minC + 1 + patternGap)
    const py = tech.evenUp(maxR - minR + 1 + patternGap)
    // the brick / half-drop shift: half a tile (technique-snapped) — never 0,
    // or a small motif would degrade brick / half-drop into a plain grid
    const half = tech.patternHalf
    const next = new Map(base)
    // tile indices covering the grid (one extra column for the brick shift)
    const i0 = -Math.ceil(minC / px) - 1
    const i1 = Math.ceil((cols - minC) / px)
    const j0 = -Math.ceil(minR / py)
    const j1 = Math.ceil((rows - minR) / py)
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        if (i === 0 && j === 0) continue // the motif itself stays as-is
        let oc = minC + i * px
        let or = minR + j * py
        const oddBand = (((mode === 'brick' ? j : i) % 2) + 2) % 2 === 1
        if (mode === 'brick' && oddBand) oc += half(px)
        if (mode === 'halfdrop' && oddBand) or += half(py)
        for (const { dc, dr, fill } of motif) {
          const c = oc + dc
          const r = or + dr
          if (c < 0 || c >= cols || r < 0 || r >= rows || !tech.beadExists(c, r)) continue
          next.set(key(c, r), fill)
        }
      }
    }
    // first apply pushes ONE undo step (back to the pre-pattern design);
    // layout swaps reuse it, so undo from any layout returns to the motif. The
    // snapshot's active layer holds `base` (== beadsRef.current on first apply).
    if (!patternBaseRef.current) pushHistory(currentDoc())
    applyBeads(next)
    patternBaseRef.current = base // re-arm: applyBeads just cleared it
  }

  // desktop keyboard: Ctrl/⌘+Z undo, Ctrl/⌘+Shift+Z redo
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z') return
      // Only let an actively-edited text field keep its own native undo. For
      // everything else (the canvas, the body) Ctrl/⌘+Z is OUR bead undo.
      // (Previously this required e.target===document.body, but after clicking a
      // canvas-size pill focus stayed on the input, so our undo never ran and
      // the browser's native text-undo reverted the cm field → resized canvas.)
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      e.preventDefault()
      if (e.shiftKey) redo()
      else undo()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  // ---- canvas drawing ----
  const canvasRef = useRef(null)
  const overlayRef = useRef(null) // hover-ghost canvas, stacked over canvasRef
  const wrapRef = useRef(null)
  // Devices with a real pointer (mouse/trackpad) report `hover: hover`; touch
  // screens (iPad) report `hover: none`. The hover ghost is mouse-only, so on
  // touch we never create its overlay canvas — that spare full-screen canvas was
  // ~15-20 MB of dead retina memory on iPad, pushing Safari toward its tab-kill
  // ceiling for nothing.
  const canHover = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(hover: hover)').matches
    : false
  // Cap render resolution: a full-viewport canvas at retina DPR (2) is the
  // single biggest fixed memory user, and beads read fine a touch softer. Hold
  // full DPR up to ~2, then stop — never allocate beyond 2× the CSS pixels.
  const rawDPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const DPR = Math.min(rawDPR, 2)

  // small repeating tile for the transparent-background checker
  const checkerTile = useMemo(() => {
    if (typeof document === 'undefined') return null
    const c = document.createElement('canvas')
    c.width = 16
    c.height = 16
    const x = c.getContext('2d')
    x.fillStyle = '#f3f3f4'; x.fillRect(0, 0, 16, 16)
    x.fillStyle = '#e3e3e5'; x.fillRect(0, 0, 8, 8); x.fillRect(8, 8, 8, 8)
    return c
  }, [])

  // track the pasteboard viewport size; the canvas fills it exactly
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const drawScene = useCallback(
    (ctx) => {
      const { w: vw, h: vh } = viewport
      const { scale, tx, ty, rot } = view
      const docW = geo.width
      const docH = geo.height

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, vw, vh)
      // everything below is in document space (pan + zoom + rotation baked into
      // the transform): screen = scale · R(rot) · doc + t
      const vcos = Math.cos(rot)
      const vsin = Math.sin(rot)
      ctx.setTransform(
        DPR * scale * vcos, DPR * scale * vsin,
        -DPR * scale * vsin, DPR * scale * vcos,
        tx * DPR, ty * DPR
      )

      // base layer: the bottom 'bg' layer's solid colour, or — when it is hidden
      // — the transparency checker. Image + bead layers composite over this in
      // z-order below.
      const bgL = layers[0] && layers[0].type === 'bg' ? layers[0] : null
      if (bgL && bgL.visible) {
        ctx.fillStyle = bgL.color
        ctx.fillRect(0, 0, docW, docH)
      } else if (checkerTile) {
        ctx.fillStyle = ctx.createPattern(checkerTile, 'repeat')
        ctx.fillRect(0, 0, docW, docH)
      }

      // visible cell range — cull off-screen beads so ANY document size stays
      // fast. Under rotation the visible doc area is a rotated rectangle, so use
      // the doc-space bounding box of the four viewport corners (a bit larger,
      // never misses a bead).
      const vc = [
        screenToDoc(0, 0, view), screenToDoc(vw, 0, view),
        screenToDoc(0, vh, view), screenToDoc(vw, vh, view),
      ]
      const docLeft = Math.min(vc[0].x, vc[1].x, vc[2].x, vc[3].x)
      const docRight = Math.max(vc[0].x, vc[1].x, vc[2].x, vc[3].x)
      const docTop = Math.min(vc[0].y, vc[1].y, vc[2].y, vc[3].y)
      const docBottom = Math.max(vc[0].y, vc[1].y, vc[2].y, vc[3].y)
      const r0 = Math.max(0, Math.floor((docTop - geo.padY) / geo.Py) - 1)
      const r1 = Math.min(rows, Math.ceil((docBottom - geo.padY) / geo.Py) + 1)
      const c0 = Math.max(0, Math.floor((docLeft - geo.padX - geo.rowOffset) / geo.Px) - 1)
      const c1 = Math.min(cols, Math.ceil((docRight - geo.padX) / geo.Px) + 1)

      // level of detail: simplify / drop outlines when beads are tiny on screen
      const onScreenBw = Bw * scale
      const drawOutlines = onScreenBw > 5
      const simple = onScreenBw < 4
      ctx.lineWidth = 1.25 / scale
      ctx.strokeStyle = '#cdcac3'

      // spacing slider: filled beads draw enlarged (up to touching) by the pack
      // amount; empty cells stay true-size so the grid underneath stays readable
      const drawScale = 1 + pack * (PACKED_DRAW - 1)
      const dw = Bw * drawScale
      const dh = Bh * drawScale

      // Composite the visible layers in z-order (bottom→top), so an image layer
      // sitting between two bead layers paints in the right place and the top
      // bead wins where beads overlap. The active bead layer reads beadsRef
      // (live, so silent stroke repaints show); others read their own Maps.
      // `beads` stays in the deps so committed active-layer edits trigger redraw.
      const liveBeads = beadsRef.current
      const visLayers = layers.filter((l) => l.visible)
      const aId = activeId
      const beadMapOf = (lay) => (lay.id === aId ? liveBeads : lay.beads)
      const imageShowing = visLayers.some((l) => l.type === 'image' && l.img)
      // Which cells end up filled in ANY visible layer (so the empty-outline pass
      // can skip them). Numeric id, not a "col,row" string, to avoid allocating a
      // key per cell in the hot loop. Populated as we draw the beads below.
      const filledCells = new Set()
      const cellId = (col, row) => row * cols + col

      for (const lay of visLayers) {
        if (lay.type === 'bg') continue // already painted as the base
        if (lay.type === 'image') {
          if (!lay.img) continue
          ctx.save()
          ctx.beginPath(); ctx.rect(0, 0, docW, docH); ctx.clip() // never spill past canvas
          ctx.globalAlpha = lay.opacity == null ? 1 : lay.opacity
          ctx.drawImage(lay.img, lay.t.x, lay.t.y, lay.img.width * lay.t.scale, lay.img.height * lay.t.scale)
          ctx.restore()
          continue
        }
        // bead layer: draw only its filled beads (top-wins emerges from z-order).
        // Batch beads of the same colour into one Path2D and fill it in a single
        // call — thousands of per-bead ctx.fill()s were the on-screen lag.
        const map = beadMapOf(lay)
        if (!map.size) continue
        const isActive = lay.id === aId
        const byColor = new Map() // colour -> Path2D
        for (let row = r0; row < r1; row++) {
          for (let col = c0; col < c1; col++) {
            if (!tech.beadExists(col, row)) continue
            const k = key(col, row)
            if (isActive && placing?.hide?.has(k)) continue
            const fill = map.get(k)
            if (!fill) continue
            filledCells.add(cellId(col, row))
            let p = byColor.get(fill)
            if (!p) { p = new Path2D(); byColor.set(fill, p) }
            const { cx, cy } = geo.centerFor(col, row)
            if (simple) p.rect(cx - dw / 2, cy - dh / 2, dw, dh)
            else tech.beadOutline(p, cx, cy, dw, dh, tiltFor(col, row))
          }
        }
        for (const [fill, p] of byColor) {
          ctx.fillStyle = fill
          ctx.fill(p)
        }
      }

      // empty-cell grid outlines, for cells with no bead in any visible layer
      // (skipped when beads are tiny on screen). Over a reference image they stay
      // outline-only so the design shows through. Batched into ONE path so the
      // whole grid is a single fill + single stroke.
      if (!simple && drawOutlines) {
        const emptyPath = new Path2D()
        for (let row = r0; row < r1; row++) {
          for (let col = c0; col < c1; col++) {
            if (!tech.beadExists(col, row)) continue
            if (filledCells.has(cellId(col, row))) continue
            const { cx, cy } = geo.centerFor(col, row)
            tech.beadOutline(emptyPath, cx, cy, Bw, Bh, tiltFor(col, row))
          }
        }
        if (!imageShowing) { ctx.fillStyle = '#eaeaeb'; ctx.fill(emptyPath) }
        ctx.lineWidth = 1.25 / scale
        ctx.strokeStyle = '#cdcac3'
        ctx.stroke(emptyPath)
      }

      // (brush hover ghost is painted on the overlay canvas — see drawOverlay)

      // selection highlight (accent ring around selected beads) — one batched path
      if (selection.size) {
        const selPath = new Path2D()
        for (let row = r0; row < r1; row++) {
          for (let col = c0; col < c1; col++) {
            if (!tech.beadExists(col, row) || !selection.has(key(col, row))) continue
            const { cx, cy } = geo.centerFor(col, row)
            tech.beadOutline(selPath, cx, cy, dw * 1.08, dh * 1.08, tiltFor(col, row))
          }
        }
        ctx.lineWidth = 2 / scale
        ctx.strokeStyle = T.accent
        ctx.stroke(selPath)
      }

      // live marquee rectangle
      if (marquee) {
        const mx = Math.min(marquee.x0, marquee.x1)
        const my = Math.min(marquee.y0, marquee.y1)
        const mw = Math.abs(marquee.x1 - marquee.x0)
        const mh = Math.abs(marquee.y1 - marquee.y0)
        ctx.fillStyle = 'rgba(214,0,28,0.08)'
        ctx.fillRect(mx, my, mw, mh)
        ctx.lineWidth = 1.5 / scale
        ctx.strokeStyle = T.accent
        ctx.setLineDash([6 / scale, 4 / scale])
        ctx.strokeRect(mx, my, mw, mh)
        ctx.setLineDash([])
      }

      // ghost of the duplicated motif awaiting placement (drag moves it)
      if (placing) {
        ctx.globalAlpha = 0.55
        for (const { dc, dr, fill } of placing.motif) {
          const c = placing.c + dc
          const r = placing.r + dr
          if (c < 0 || c >= cols || r < 0 || r >= rows || !tech.beadExists(c, r)) continue
          const { cx, cy } = geo.centerFor(c, r)
          tech.beadPath(ctx, cx, cy, dw, dh, tiltFor(c, r))
          ctx.fillStyle = fill
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
    },
    [viewport, view, geo, beads, layers, activeId, Bw, Bh, cols, rows, tiltFor, checkerTile, DPR, selection, marquee, pack, placing, tech]
  )
  drawRef.current = drawScene // the rAF repaint path always uses the latest

  // Overlay repaint: just the brush hover ghost, in the SAME document transform
  // as the scene so it lands on the exact cells the brush would paint. Cheap, so
  // it can fire on every pointer move and stay under the cursor.
  const drawOverlay = useCallback(
    (ctx) => {
      const { w: vw, h: vh } = viewport
      const { scale, tx, ty, rot } = view
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, vw, vh)
      const hov = hoverRef.current
      if (!hov.length || Bw * scale < 4) return // hidden when beads are tiny
      const vcos = Math.cos(rot)
      const vsin = Math.sin(rot)
      ctx.setTransform(
        DPR * scale * vcos, DPR * scale * vsin,
        -DPR * scale * vsin, DPR * scale * vcos,
        tx * DPR, ty * DPR
      )
      const drawScale = 1 + pack * (PACKED_DRAW - 1)
      const dw = Bw * drawScale
      const dh = Bh * drawScale
      ctx.fillStyle = 'rgba(120,120,120,0.20)' // light grey, subtle
      for (const { col, row } of hov) {
        const { cx, cy } = geo.centerFor(col, row)
        tech.beadPath(ctx, cx, cy, dw, dh, tiltFor(col, row))
        ctx.fill()
      }
    },
    [viewport, view, DPR, Bw, Bh, pack, geo, tech, tiltFor]
  )
  overlayDrawRef.current = drawOverlay

  // size both canvases to the viewport (never to the document)
  useEffect(() => {
    for (const canvas of [canvasRef.current, overlayRef.current]) {
      if (!canvas) continue
      canvas.width = Math.max(1, Math.round(viewport.w * DPR))
      canvas.height = Math.max(1, Math.round(viewport.h * DPR))
      canvas.style.width = `${viewport.w}px`
      canvas.style.height = `${viewport.h}px`
    }
  }, [viewport, DPR])

  // redraw whenever the scene changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) drawScene(canvas.getContext('2d'))
  }, [drawScene])

  // keep the ghost aligned when the view (zoom/pan/rotate) or size changes
  useEffect(() => {
    const canvas = overlayRef.current
    if (canvas) drawOverlay(canvas.getContext('2d'))
  }, [drawOverlay])

  // fit the document into the viewport, centred
  const fitView = useCallback(() => {
    const { w: vw, h: vh } = viewport
    if (vw < 2 || vh < 2) return
    const margin = 48
    const scale = Math.min((vw - margin) / geo.width, (vh - margin) / geo.height, 4)
    // fit also straightens the canvas (rot 0), so it doubles as "reset rotation"
    setView({ scale, tx: (vw - geo.width * scale) / 2, ty: (vh - geo.height * scale) / 2, rot: 0 })
  }, [viewport, geo.width, geo.height])

  // auto-fit on first sizing, and whenever the canvas cm size changes
  const fittedRef = useRef(false)
  useEffect(() => {
    if (viewport.w > 2 && !fittedRef.current) {
      fittedRef.current = true
      fitView()
    }
  }, [viewport, fitView])
  useEffect(() => {
    fitView()
  }, [canvasCm.w, canvasCm.h]) // eslint-disable-line react-hooks/exhaustive-deps

  // zoom toward a screen point by a factor (keeps that point fixed)
  const zoomAt = useCallback((factor, sx, sy) => {
    setView((v) => {
      const ns = clampNum(+(v.scale * factor).toFixed(4), 0.02, 8)
      // keep the doc point under (sx,sy) fixed, accounting for rotation
      const d = screenToDoc(sx, sy, v)
      const c = Math.cos(v.rot || 0)
      const s = Math.sin(v.rot || 0)
      const rx = c * d.x - s * d.y
      const ry = s * d.x + c * d.y
      return { ...v, scale: ns, tx: sx - ns * rx, ty: sy - ns * ry }
    })
  }, [])

  // wheel = zoom toward cursor (no scrollbars anywhere)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = canvas.getBoundingClientRect()
      const sx = e.clientX - r.left
      const sy = e.clientY - r.top
      // in image-adjust mode the wheel resizes the background image instead
      if (adjustIdRef.current) {
        imageZoomAtRef.current(e.deltaY < 0 ? 1.08 : 1 / 1.08, sx, sy)
        return
      }
      zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, sx, sy)
    }
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [zoomAt])

  // ---- pointer interaction ----
  const dragging = useRef(false)
  const panning = useRef(null)
  const marqueeRef = useRef(null)
  const spaceHeld = useRef(false)
  const [grabbing, setGrabbing] = useState(false)

  // hold Space to pan (Figma-style); middle-mouse drag also pans
  useEffect(() => {
    const down = (e) => {
      if (e.code === 'Space' && !e.repeat && e.target === document.body) {
        e.preventDefault()
        spaceHeld.current = true
        setGrabbing(true)
      }
    }
    const up = (e) => {
      if (e.code === 'Space') {
        spaceHeld.current = false
        setGrabbing(false)
      }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // ---- iPad touch gestures (locked iPad-pass decisions #1–3) ----
  // Pencil (pointerType 'pen') and mouse use the active tool. Fingers NEVER
  // paint: one finger pans, two-finger pinch zooms/pans, and quick multi-finger
  // taps map to history (2 fingers = undo, 3 = redo) — Procreate conventions.
  const touchPts = useRef(new Map()) // pointerId -> {x,y,sx,sy} canvas-relative
  const pinchRef = useRef(null) // {dist, mx, my} of the live 2-finger gesture
  const tapRef = useRef(null) // {t0, maxN, moved, valid} for tap detection

  const ptFromEvent = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const startPinchIfTwo = () => {
    if (touchPts.current.size !== 2) { pinchRef.current = null; return }
    const [a, b] = [...touchPts.current.values()]
    pinchRef.current = {
      dist: Math.hypot(b.x - a.x, b.y - a.y) || 1,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2,
      ang: Math.atan2(b.y - a.y, b.x - a.x),
    }
  }

  const docFromEvent = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return screenToDoc(e.clientX - rect.left, e.clientY - rect.top, view)
  }

  // ---- straight-line snapping --------------------------------------------
  // While drawing/erasing, if the stroke stays near one of the lattice's
  // straight directions (horizontal, or the two weave diagonals) for more
  // than SNAP_BEADS beads, the painted beads snap to a perfect continuous
  // line from the stroke start. Curve away and the stroke falls back to the
  // recorded freehand path.
  const SNAP_BEADS = 3
  const strokeRef = useRef(null) // { start, pts, locked, snapped } per stroke

  // unit vectors of the technique's straight lattice lines + their bead pitch
  const snapAxes = () => tech.snapAxes(geo)

  // Does the whole stroke so far fit a lattice axis? Returns the best axis
  // (longest projection) or null. Every recorded point must stay within one
  // bead-height of the ideal line through the stroke start.
  const evalSnap = (s, p) => {
    const dx = p.x - s.start.x
    const dy = p.y - s.start.y
    const tol = Bh * 0.9
    let best = null
    for (const a of snapAxes()) {
      const proj = dx * a.ux + dy * a.uy
      if (Math.abs(proj) < SNAP_BEADS * a.pitch) continue
      const fits = s.pts.every(
        (q) => Math.abs((q.x - s.start.x) * -a.uy + (q.y - s.start.y) * a.ux) <= tol
      )
      if (!fits) continue
      if (!best || Math.abs(proj) > best.len) {
        best = {
          ux: a.ux * Math.sign(proj),
          uy: a.uy * Math.sign(proj),
          len: Math.abs(proj),
          pitch: a.pitch,
        }
      }
    }
    return best
  }

  // Sample points along the ideal line; dense enough that beadAt catches
  // every bead the line passes through (missing apex nodes stay skipped).
  const lineSamples = (start, snap) => {
    const out = []
    const step = snap.pitch / 4
    for (let t = 0; t <= snap.len; t += step) {
      out.push({ x: start.x + snap.ux * t, y: start.y + snap.uy * t })
    }
    out.push({ x: start.x + snap.ux * snap.len, y: start.y + snap.uy * snap.len })
    return out
  }

  // Rebuild the design as (stroke-start state) + brush applied at each point.
  // Used to repaint the whole stroke as a clean line, or replay it freehand.
  const paintAlong = (base, points) => {
    const alpha = alphaLockRef.current // recolour-only: no shape change (snap path)
    const next = new Map(base)
    for (const q of points) {
      for (const { col, row } of brushCells(q.x, q.y)) {
        const k = key(col, row)
        if (tool === 'erase') {
          if (alpha) continue // alpha lock: erasing would change shape
          next.delete(k)
        } else {
          if (alpha && !next.has(k)) continue // only recolour existing beads
          next.set(k, color)
        }
      }
    }
    return next
  }

  const handleStrokePoint = (p) => {
    const s = strokeRef.current
    if (s && !s.locked) {
      // thin the recorded path: pencils fire up to 240 events/s
      const last = s.pts[s.pts.length - 1]
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 1) s.pts.push(p)
      const snap = evalSnap(s, p)
      if (snap) {
        // throttle: rebuild the design only when the line gains/loses a sample,
        // not on every pointer event (Map copies at 240Hz crash mobile Safari)
        const n = Math.floor(snap.len / (snap.pitch / 4))
        if (s.snapped && n === s.lastN) return
        s.snapped = true
        s.lastN = n
        applyBeads(paintAlong(strokeBase.current, lineSamples(s.start, snap)), true)
        return
      }
      if (s.snapped) {
        // was a snapped line, now curving: give back the freehand path
        s.snapped = false
        s.locked = true
        applyBeads(paintAlong(strokeBase.current, s.pts), true)
        return
      }
      // clearly not straight by now → stop evaluating for this stroke
      const len = Math.hypot(p.x - s.start.x, p.y - s.start.y)
      if (len >= SNAP_BEADS * geo.Px * 1.5) s.locked = true
    }
    paintBrush(p.x, p.y, tool)
  }

  const onPointerDown = (e) => {
    e.preventDefault()
    // If the layers panel is open, the first tap on the canvas just collapses it
    // and gives the canvas back — no bead is painted on that tap.
    if (showLayers) { setShowLayers(false); return }
    // Drop focus from any input (e.g. a canvas-size pill) the moment a stroke
    // begins, so a following Ctrl/⌘+Z is our bead-undo and never a native
    // text-undo that would revert the cm field and resize the canvas.
    const ae = document.activeElement
    if (ae && ae !== document.body && typeof ae.blur === 'function') ae.blur()
    canvasRef.current.setPointerCapture?.(e.pointerId)
    // clear the hover ghost so it can't linger frozen on the overlay mid-drag
    if (hoverRef.current.length) setHoverCells([])
    if (e.pointerType === 'touch') {
      if (dragging.current || marqueeRef.current) return // palm while pencil draws
      const p = ptFromEvent(e)
      touchPts.current.set(e.pointerId, { ...p, sx: p.x, sy: p.y })
      const n = touchPts.current.size
      if (n === 1) tapRef.current = { t0: Date.now(), maxN: 1, moved: false, valid: true }
      else if (tapRef.current) tapRef.current.maxN = Math.max(tapRef.current.maxN, n)
      panning.current = n === 1 ? { x: e.clientX, y: e.clientY } : null
      startPinchIfTwo()
      dragging.current = false
      return
    }
    if (adjustLayer || spaceHeld.current || e.button === 1) {
      // image-adjust mode: any pen/mouse drag moves the image (see move handler)
      panning.current = { x: e.clientX, y: e.clientY }
      return
    }
    const p = docFromEvent(e)
    if (placing) {
      // drag moves the ghost copy; keep the grab offset so it doesn't jump
      const o = geo.centerFor(placing.c, placing.r)
      placeDrag.current = { dx: p.x - o.cx, dy: p.y - o.cy }
      return
    }
    if (tool === 'select') {
      marqueeRef.current = { x0: p.x, y0: p.y, x1: p.x, y1: p.y }
      setMarquee(marqueeRef.current)
      return
    }
    if (!canEditRef.current) { showToast(blockedRef.current()); return } // hidden/locked/non-bead layer
    dragging.current = true
    strokeBase.current = beadsRef.current // history: snapshot at stroke start
    strokeRef.current = { start: p, pts: [], locked: false, snapped: false, lastN: -1 }
    if (tool === 'draw') pushRecent(color)
    paintBrush(p.x, p.y, tool)
  }

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') {
      const rec = touchPts.current.get(e.pointerId)
      if (!rec) return
      const p = ptFromEvent(e)
      rec.x = p.x
      rec.y = p.y
      if (tapRef.current && Math.hypot(p.x - rec.sx, p.y - rec.sy) > 12) {
        tapRef.current.moved = true
      }
      if (pinchRef.current && touchPts.current.size === 2) {
        // pinch: zoom by the distance ratio, ROTATE by the twist of the two
        // fingers, and pan by the midpoint drift — the doc point between the
        // fingers stays pinched under all three.
        const [a, b] = [...touchPts.current.values()]
        const dist = Math.hypot(b.x - a.x, b.y - a.y) || 1
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const ang = Math.atan2(b.y - a.y, b.x - a.x)
        const g = pinchRef.current
        if (adjustLayer) {
          // image-adjust mode: the pinch resizes/moves the active image layer,
          // keeping the doc point between the fingers pinned under the gesture
          const mPrev = screenToDoc(g.mx, g.my, view)
          const mNow = screenToDoc(mx, my, view)
          updateLayer(adjustLayer.id, (lay) => {
            const ns = clampNum(lay.t.scale * (dist / g.dist), 0.05, 12)
            const ff = ns / lay.t.scale
            return { t: snapImageT({
              scale: ns,
              x: mNow.x - (mPrev.x - lay.t.x) * ff,
              y: mNow.y - (mPrev.y - lay.t.y) * ff,
            }, lay.img) }
          })
        } else {
          setView((v) => {
            const ns = clampNum(v.scale * (dist / g.dist), 0.02, 8)
            const nrot = (v.rot || 0) + (ang - g.ang) // snap happens on lift, not per-frame
            // keep the doc point under the old midpoint pinned to the new one
            const d = screenToDoc(g.mx, g.my, v)
            const c = Math.cos(nrot)
            const s = Math.sin(nrot)
            const rx = c * d.x - s * d.y
            const ry = s * d.x + c * d.y
            return { scale: ns, rot: nrot, tx: mx - ns * rx, ty: my - ns * ry }
          })
        }
        pinchRef.current = { dist, mx, my, ang }
        return
      }
      // single finger falls through to the shared pan block
    }
    if (panning.current) {
      const dx = e.clientX - panning.current.x
      const dy = e.clientY - panning.current.y
      panning.current = { x: e.clientX, y: e.clientY }
      if (adjustLayer) {
        // image-adjust mode: dragging moves the image, not the view (rotate the
        // screen delta into doc space so it follows the finger under rotation)
        const c = Math.cos(view.rot || 0)
        const s = Math.sin(view.rot || 0)
        const ddx = (c * dx + s * dy) / view.scale
        const ddy = (-s * dx + c * dy) / view.scale
        updateLayer(adjustLayer.id, (lay) => ({ t: snapImageT({ ...lay.t, x: lay.t.x + ddx, y: lay.t.y + ddy }, lay.img) }))
      } else {
        setView((v) => ({ ...v, tx: v.tx + dx, ty: v.ty + dy }))
      }
      return
    }
    if (placeDrag.current && placing) {
      const p = docFromEvent(e)
      const t = snapPlace(p.x - placeDrag.current.dx, p.y - placeDrag.current.dy, placing)
      if (t.c !== placing.c || t.r !== placing.r) setPlacing({ ...placing, ...t })
      return
    }
    if (marqueeRef.current) {
      const p = docFromEvent(e)
      marqueeRef.current = { ...marqueeRef.current, x1: p.x, y1: p.y }
      setMarquee(marqueeRef.current)
      return
    }
    if (dragging.current) {
      handleStrokePoint(docFromEvent(e))
      return
    }
    // idle hover over the canvas (mouse only): preview the brush footprint
    if (e.pointerType === 'mouse' && !panning.current && !marqueeRef.current && !placeDrag.current) {
      if ((tool === 'draw' || tool === 'erase') && canEditRef.current && !adjustIdRef.current) {
        const p = docFromEvent(e)
        setHoverCells(brushCells(p.x, p.y))
      } else if (hoverRef.current.length) {
        setHoverCells([])
      }
    }
  }

  const clearHover = () => { if (hoverRef.current.length) setHoverCells([]) }

  const endDrag = () => {
    if (marqueeRef.current) {
      finalizeSelection(marqueeRef.current)
      marqueeRef.current = null
      setMarquee(null)
    }
    // history: commit the stroke as ONE undo step, only if it changed beads.
    // Silent strokes never updated layersRef, so its active entry still holds
    // the PRE-stroke Map — currentDoc() is the correct snapshot to undo to.
    if (strokeBase.current && strokeBase.current !== beadsRef.current) {
      pushHistory(currentDoc())
      setBeads(beadsRef.current) // strokes were silent — sync React state once
      syncActiveLayer() // and fold the new beads into the layer stack
    }
    strokeBase.current = null
    strokeRef.current = null
    dragging.current = false
    panning.current = null
    placeDrag.current = null
  }

  // When a two-finger gesture ends, gently snap the rotation to the nearest
  // right angle if it's close (≈7°), so getting back to upright/sideways is
  // easy. Pivots around the viewport centre so the canvas doesn't jump.
  const snapRotation = () => setView((v) => {
    const step = Math.PI / 2
    const snapped = Math.round((v.rot || 0) / step) * step
    if (Math.abs((v.rot || 0) - snapped) >= 0.12) return v
    const px = viewport.w / 2
    const py = viewport.h / 2
    const d = screenToDoc(px, py, v)
    const c = Math.cos(snapped)
    const s = Math.sin(snapped)
    return { ...v, rot: snapped, tx: px - v.scale * (c * d.x - s * d.y), ty: py - v.scale * (s * d.x + c * d.y) }
  })

  const liftTouch = (e, { allowTap }) => {
    const wasPinch = touchPts.current.size === 2 && !!pinchRef.current
    touchPts.current.delete(e.pointerId)
    if (wasPinch) snapRotation()
    if (touchPts.current.size === 0) {
      const t = tapRef.current
      tapRef.current = null
      pinchRef.current = null
      panning.current = null
      if (allowTap && t && t.valid && !t.moved && Date.now() - t.t0 < 350 && !adjustIdRef.current) {
        if (t.maxN === 2) undo()
        else if (t.maxN === 3) redo()
      }
    } else {
      startPinchIfTwo()
      panning.current = null
    }
  }

  const onPointerUp = (e) => {
    if (e.pointerType === 'touch') return liftTouch(e, { allowTap: true })
    endDrag()
  }
  const onPointerCancel = (e) => {
    if (e.pointerType === 'touch') {
      if (tapRef.current) tapRef.current.valid = false
      return liftTouch(e, { allowTap: false })
    }
    endDrag()
  }

  // iOS Safari fires proprietary gesture events for pinches; kill them so the
  // PAGE never zooms — only our canvas transform does. touch-action:none on the
  // canvas covers pointer defaults; this covers the rest.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const prevent = (e) => e.preventDefault()
    canvas.addEventListener('gesturestart', prevent)
    canvas.addEventListener('gesturechange', prevent)
    canvas.addEventListener('gestureend', prevent)
    return () => {
      canvas.removeEventListener('gesturestart', prevent)
      canvas.removeEventListener('gesturechange', prevent)
      canvas.removeEventListener('gestureend', prevent)
    }
  }, [])

  // ---- drag a colour swatch onto the canvas to flood-fill --------------------
  // Pointer-based, NOT HTML5 drag-and-drop: iPad Safari has no touch DnD, so
  // one pointer path serves finger, pencil and mouse. A small ghost swatch
  // follows the pointer; a quick tap (no movement) just picks the colour.
  // nearestBead lets a drop in a gap still fill the closest bead's region.
  const swatchDrag = useRef(null) // { color, x0, y0, active }
  const [dragGhost, setDragGhost] = useState(null) // { color, x, y } client coords

  const onSwatchDown = (c) => (e) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    swatchDrag.current = { color: c, x0: e.clientX, y0: e.clientY, active: false }
  }
  const onSwatchMove = (e) => {
    const d = swatchDrag.current
    if (!d) return
    if (!d.active && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 8) d.active = true
    if (d.active) setDragGhost({ color: d.color, x: e.clientX, y: e.clientY })
  }
  const onSwatchUp = (e) => {
    const d = swatchDrag.current
    swatchDrag.current = null
    setDragGhost(null)
    if (!d) return
    if (!d.active) {
      setColor(d.color) // tap = pick the colour
      return
    }
    const rect = canvasRef.current.getBoundingClientRect()
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      const { x, y } = screenToDoc(e.clientX - rect.left, e.clientY - rect.top, view)
      pushRecent(d.color)
      floodFill(tech.nearestBead(geo, x, y), d.color)
    }
  }
  const onSwatchCancel = () => {
    swatchDrag.current = null
    setDragGhost(null)
  }

  // The big current-colour swatch stays a real <input type="color"> so a TAP opens
  // the native colour wheel/RGB picker (a programmatic open doesn't work on iOS —
  // that broke it). Drag-to-fill is layered on WITHOUT capturing the pointer or
  // preventing the tap: we watch the window during the press, and only if it turns
  // into a real drag do we fill and suppress the click that would open the picker.
  const bigSwatchDidDrag = useRef(false)
  const onBigSwatchDown = (e) => {
    if (e.button != null && e.button !== 0) return // left/primary only
    bigSwatchDidDrag.current = false
    const x0 = e.clientX
    const y0 = e.clientY
    const dragColor = color
    const move = (ev) => {
      if (!bigSwatchDidDrag.current && Math.hypot(ev.clientX - x0, ev.clientY - y0) > 8) {
        bigSwatchDidDrag.current = true
      }
      if (bigSwatchDidDrag.current) setDragGhost({ color: dragColor, x: ev.clientX, y: ev.clientY })
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      setDragGhost(null)
      if (!bigSwatchDidDrag.current) return // a plain tap → let the picker open
      const rect = canvasRef.current.getBoundingClientRect()
      if (
        ev.clientX >= rect.left && ev.clientX <= rect.right &&
        ev.clientY >= rect.top && ev.clientY <= rect.bottom
      ) {
        const { x, y } = screenToDoc(ev.clientX - rect.left, ev.clientY - rect.top, view)
        pushRecent(dragColor)
        floodFill(tech.nearestBead(geo, x, y), dragColor)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }
  // if the press turned into a drag, swallow the click so the picker doesn't open
  const onBigSwatchClick = (e) => { if (bigSwatchDidDrag.current) e.preventDefault() }


  // ---- export (print-ready chart: outlined beads + guides + numbers + legend) ----
  // flatten the VISIBLE bead layers top-down into one Map — used for the colour
  // legend tally. Iterating bottom→top means the top layer's bead wins.
  const flattenVisible = () => {
    const m = new Map()
    for (const l of layersRef.current) {
      if (!l.visible || l.type !== 'bead') continue
      for (const [k, v] of l.beads) m.set(k, v)
    }
    return m
  }

  // Ordered draw list for the chart: bg colour (on-screen export only), then
  // visible image + bead layers in z-order, so images bake in exactly where they
  // sit on screen and the top bead wins.
  const chartComposite = () => {
    const out = []
    for (const l of layersRef.current) {
      if (!l.visible) continue
      if (l.type === 'bg') { if (exportBg === 'screen') out.push({ type: 'color', color: l.color }) }
      else if (l.type === 'image') { if (l.img) out.push({ type: 'image', img: l.img, t: l.t, opacity: l.opacity }) }
      else out.push({ type: 'beads', map: l.beads })
    }
    return out
  }

  const exportPNG = () => {
    const flat = flattenVisible()
    const chart = renderFullChart({
      cols,
      rows,
      tiltFor,
      tech,
      printBeadMm,
      beadRatio,
      composite: chartComposite(),
      srcDoc: { w: geo.width, h: geo.height }, // maps image placement → print px
      // match the on-screen packed look (same drawScale as drawScene)
      fillScale: 1 + pack * (PACKED_DRAW - 1),
    })
    // The chart canvas is a pure function of the canvas size (cols/rows/bead mm)
    // — same canvas ⇒ same chart pixels. The colour legend USED to grow taller
    // with the number of colours, which changed the total height (and, via the
    // shared rasterScale below, even nudged the width by a pixel) so two frames
    // of the same 30×30 canvas exported at different sizes and the animation
    // staggered. Now we give the legend a FIXED band sized off the chart, so the
    // whole export is byte-identical for a given canvas, whatever is drawn.
    const gap = Math.round(6 * PX_PER_MM)
    const legendH = Math.round(chart.width * 0.11)
    const legend = renderLegend(flat, { width: chart.width, height: legendH })
    const out = document.createElement('canvas')
    // stacking chart + legend can exceed the browser canvas ceiling even when
    // the chart alone fits — past it drawing silently no-ops and the PNG saves
    // blank. Shrink the composite to stay inside (see rasterScale in chart.js).
    // outW/outH are now constant for a given canvas, so s is too.
    const outW = chart.width
    const outH = chart.height + gap + legendH
    const s = rasterScale(outW, outH)
    out.width = Math.ceil(outW * s)
    out.height = Math.ceil(outH * s)
    const ctx = out.getContext('2d')
    ctx.scale(s, s)
    if (exportBg !== 'transparent') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, outW, outH)
    }
    ctx.drawImage(chart, 0, 0)
    ctx.drawImage(legend, 0, chart.height + gap)
    const link = document.createElement('a')
    link.download = 'beadwork-chart.png'
    link.href = out.toDataURL('image/png')
    link.click()
  }

  // no confirm dialog: undo-able, and a locked/hidden layer just toasts why.
  // Clears the ACTIVE layer only (other layers are untouched, Procreate-style).
  const clearCanvas = () => {
    if (!canEdit) { showToast(blockedRef.current()); return }
    commit((prev) => (prev.size ? new Map() : prev))
  }

  // ---- artworks: each design is its own IndexedDB record; one open at a time ----
  const [designName, setDesignName] = useState('') // the open artwork's name
  const [screen, setScreen] = useState('loading') // 'loading' | 'gallery' | 'editor'
  const [artworks, setArtworks] = useState([]) // lightweight gallery summaries
  const [currentArtworkId, setCurrentArtworkId] = useState(null)

  // one design = one plain object: this is what every save path (quick-save,
  // named slot, exported file) writes and what applyDesign reads back
  const designData = () => ({
    version: 3, name: designName, technique: techniqueId, canvasCm, beadMM, palette, pack,
    layers: layersRef.current.map((l) => {
      const base = { name: l.name, type: l.type || 'bead', visible: l.visible, locked: l.locked, alphaLock: l.alphaLock }
      if (l.type === 'bg') return { ...base, color: l.color }
      if (l.type === 'image') return { ...base, src: l.src, t: l.t, opacity: l.opacity }
      return { ...base, beads: [...l.beads.entries()] }
    }),
    activeIndex: Math.max(0, layersRef.current.findIndex((l) => l.id === activeIdRef.current)),
  })

  // Load an image (data URL) into an existing image layer once it decodes.
  const loadLayerImage = (id, src) => {
    if (!src) return
    const img = new Image()
    img.onload = () => { updateLayer(id, { img }); requestRedraw() }
    img.src = src
  }

  // Apply a design object from any source (browser storage, a named slot, an
  // imported file). undoable: loading over current work goes on the undo stack;
  // the boot-time restore doesn't (there is nothing to go back to).
  const applyDesign = (d, { undoable = false } = {}) => {
    if (!d || typeof d !== 'object' || (!Array.isArray(d.beads) && !Array.isArray(d.layers)))
      return false
    // technique tag: older saves predate it and were all 3-bead (getTechnique
    // falls back to 3-bead for a missing/unknown id)
    setTechniqueId(getTechnique(d.technique).id)
    if (d.canvasCm) setCanvasCm(d.canvasCm)
    // snap to the nearest offered size (older saves may hold removed sizes)
    if (d.beadMM) {
      const s = BEAD_SIZES.reduce((a, b) =>
        Math.abs(b.w - d.beadMM.w) < Math.abs(a.w - d.beadMM.w) ? b : a
      )
      setBeadMM({ w: s.w, h: s.h })
    }
    if (Array.isArray(d.palette)) setPalette(d.palette)
    if (typeof d.pack === 'number') setPack(clampNum(d.pack, 0, 1))
    // older saves stored the Packed/Spaced toggle as a boolean; packed meant
    // the 1.15× touching look, which is 0.75 on today's wider slider
    else if (typeof d.packed === 'boolean') setPack(d.packed ? 0.75 : 0)
    if (typeof d.name === 'string') setDesignName(d.name)

    // Build the layer stack. v3 layers carry a `type`; older saves (v2 bead-only
    // layers + a global d.bg/d.bgT/d.bgShown, or a v1 single d.beads Map) migrate
    // into the new model: a bottom bg-colour layer + an image layer per old
    // reference image. Image bitmaps load async and fill in via loadLayerImage.
    let nl = []
    const pendingImages = [] // [id, src] to load after layersRef is set
    const isV3 = Array.isArray(d.layers) && d.layers.some((l) => l.type)
    if (isV3) {
      for (const l of d.layers) {
        if (l.type === 'bg') {
          const lay = makeBgLayer(l.color || '#FFFFFF')
          lay.name = l.name || 'Background'; lay.visible = l.visible !== false; lay.locked = !!l.locked
          nl.push(lay)
        } else if (l.type === 'image') {
          const lay = makeImageLayer(l.src || null, null, l.t || { x: 0, y: 0, scale: 1 }, l.opacity == null ? 1 : l.opacity)
          lay.name = l.name || 'Image'; lay.visible = l.visible !== false; lay.locked = !!l.locked
          nl.push(lay)
          if (l.src) pendingImages.push([lay.id, l.src])
        } else {
          const lay = makeLayer(l.name || 'Layer', new Map(Array.isArray(l.beads) ? l.beads : []))
          lay.visible = l.visible !== false; lay.locked = !!l.locked; lay.alphaLock = !!l.alphaLock
          nl.push(lay)
        }
      }
    } else {
      // --- migrate v1/v2 ---
      const bgColor = (d.bg && d.bg.color) || '#FFFFFF'
      nl.push(makeBgLayer(bgColor)) // background colour at the bottom
      // old reference image → an image layer; convert its cover-fit placement to
      // absolute doc px so it lands where it used to (best-effort).
      if (d.bg && d.bg.type === 'image' && d.bg.image) {
        const lay = makeImageLayer(d.bg.image, null, { x: 0, y: 0, scale: 1 }, 1)
        lay.visible = d.bgShown !== false
        const old = d.bgT || { x: 0, y: 0, scale: 1 }
        const img = new Image()
        img.onload = () => {
          const docW = geo.width, docH = geo.height
          const s = Math.max(docW / img.width, docH / img.height) * (old.scale || 1)
          const t = { scale: s, x: (docW - img.width * s) / 2 + (old.x || 0), y: (docH - img.height * s) / 2 + (old.y || 0) }
          updateLayer(lay.id, { img, t })
          requestRedraw()
        }
        img.src = d.bg.image
        nl.push(lay)
      }
      // bead layers (v2) or the single bead Map (v1)
      if (Array.isArray(d.layers) && d.layers.length) {
        for (const l of d.layers) {
          const lay = makeLayer(l.name || 'Layer', new Map(Array.isArray(l.beads) ? l.beads : []))
          lay.visible = l.visible !== false; lay.locked = !!l.locked; lay.alphaLock = !!l.alphaLock
          nl.push(lay)
        }
      } else if (Array.isArray(d.beads)) {
        nl.push(makeLayer('Layer 1', new Map(d.beads)))
      }
    }
    // guarantee a bg layer at the bottom and at least one bead layer
    if (!nl.length || nl[0].type !== 'bg') nl.unshift(makeBgLayer('#FFFFFF'))
    if (!nl.some((l) => l.type === 'bead')) nl.push(makeLayer('Layer 1'))
    if (!nl.length) return false

    // active layer: prefer the saved index, but never the bg/image layer — fall
    // back to the topmost bead layer so drawing works straight away.
    let active = nl[clampNum(d.activeIndex || 0, 0, nl.length - 1)]
    if (!active || active.type !== 'bead') active = [...nl].reverse().find((l) => l.type === 'bead')

    if (undoable) pushHistory(currentDoc())
    layersRef.current = nl
    activeIdRef.current = active.id
    beadsRef.current = active.beads
    patternBaseRef.current = null
    setLayers(nl)
    setActiveId(active.id)
    setBeads(active.beads)
    setAdjustId(null)
    setSelection(new Set())
    setPlacing(null)
    for (const [id, src] of pendingImages) loadLayerImage(id, src)
    return true
  }

  // lightweight gallery row (the full design stays in IndexedDB, not in state)
  const summarize = (rec) => {
    const t = getTechnique(rec.technique)
    return {
      id: rec.id,
      name: rec.name || 'Untitled',
      technique: t.label,
      beads: (rec.layers || []).reduce((n, l) => n + (l.beads ? l.beads.length : 0), 0),
      updatedAt: rec.updatedAt || 0,
    }
  }

  // Blank the canvas for a fresh artwork in `techId`. Layers/history/selection
  // reset; the background resets to plain so a previous artwork's reference
  // image can't linger. Canvas size, bead size, palette and spacing carry over.
  const resetDesign = (techId) => {
    setTechniqueId(techId)
    const l = makeLayer('Layer 1')
    const stack = [makeBgLayer('#FFFFFF'), l] // bg colour floor + one bead layer
    layersRef.current = stack
    activeIdRef.current = l.id
    beadsRef.current = l.beads
    patternBaseRef.current = null
    undoStack.current = []
    redoStack.current = []
    setLayers(stack)
    setActiveId(l.id)
    setBeads(l.beads)
    setSelection(new Set())
    setPlacing(null)
    setAdjustId(null)
  }

  // Create + open a new artwork (from the technique chooser). Auto-named from the
  // forest. Persisted immediately so it appears in the gallery before the first
  // edit; auto-save keeps it current after.
  const createArtwork = (techId) => {
    resetDesign(techId)
    const id = uid()
    const name = nextTreeName(artworks.map((a) => a.name))
    setDesignName(name)
    setCurrentArtworkId(id)
    setChooser(null)
    setScreen('editor')
    const rec = {
      id, updatedAt: Date.now(), version: 3, name, technique: techId,
      canvasCm, beadMM, palette, pack,
      layers: [
        { name: 'Background', type: 'bg', visible: true, locked: false, alphaLock: false, color: '#FFFFFF' },
        { name: 'Layer 1', type: 'bead', visible: true, locked: false, alphaLock: false, beads: [] },
      ],
      activeIndex: 1,
    }
    putArtwork(rec).catch(() => {})
    setArtworks((a) => [...a, summarize(rec)])
    setMeta('lastOpenedId', id).catch(() => {})
  }

  // Open an existing artwork into the editor. Undo history doesn't cross
  // artworks, so it's cleared.
  const openArtwork = async (id) => {
    const rec = await getArtwork(id)
    if (!rec || !applyDesign(rec)) return
    undoStack.current = []
    redoStack.current = []
    setCurrentArtworkId(id)
    setScreen('editor')
    setMeta('lastOpenedId', id).catch(() => {})
  }

  const renameArtwork = async (id, raw) => {
    const name = (raw || '').trim()
    if (!name) return
    const rec = await getArtwork(id)
    if (!rec) return
    rec.name = name
    rec.updatedAt = Date.now()
    await putArtwork(rec)
    setArtworks((a) => a.map((x) => (x.id === id ? { ...x, name } : x)))
    if (id === currentArtworkId) setDesignName(name)
  }

  const duplicateArtwork = async (id) => {
    const rec = await getArtwork(id)
    if (!rec) return
    const copy = { ...rec, id: uid(), name: `${rec.name || 'Untitled'} copy`, updatedAt: Date.now() }
    await putArtwork(copy)
    setArtworks((a) => [...a, summarize(copy)])
  }

  const removeArtwork = async (id) => {
    if (!window.confirm('Delete this artwork? This cannot be undone.')) return
    await dbDeleteArtwork(id)
    setArtworks((a) => a.filter((x) => x.id !== id))
    if (id === currentArtworkId) {
      setCurrentArtworkId(null)
      setScreen('gallery')
    }
  }

  // ---- design files (move/back up between devices) ----
  // Export the OPEN artwork as a single <name>.beadwork.json.
  const exportDesignFile = () => {
    const name = designName.trim() || 'beadwork-design'
    const blob = new Blob([JSON.stringify(designData())], { type: 'application/json' })
    const link = document.createElement('a')
    link.download = `${name}.beadwork.json`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // Export EVERY artwork to one backup file.
  const exportAllArtworks = async () => {
    const all = await listArtworks()
    const blob = new Blob(
      [JSON.stringify({ version: 2, kind: 'beadwork-backup', artworks: all })],
      { type: 'application/json' }
    )
    const link = document.createElement('a')
    link.download = `beadwork-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const isDesign = (d) => d && typeof d === 'object' && (Array.isArray(d.layers) || Array.isArray(d.beads))

  // Import a file: a single design becomes a new artwork (and opens); a backup
  // file ("Export all") restores all its artworks into the gallery.
  const onDesignFile = async (file) => {
    if (!file) return
    try {
      const d = JSON.parse(await file.text())
      if (d && d.kind === 'beadwork-backup' && Array.isArray(d.artworks)) {
        for (const a of d.artworks) {
          if (isDesign(a)) await putArtwork({ ...a, id: uid(), updatedAt: a.updatedAt || Date.now() })
        }
        const all = await listArtworks()
        setArtworks(all.map(summarize))
        setScreen('gallery')
        return
      }
      if (!isDesign(d)) throw new Error('not a design')
      const id = uid()
      const name =
        (typeof d.name === 'string' && d.name) ||
        file.name.replace(/(\.beadwork)?\.json$/i, '') ||
        nextTreeName(artworks.map((a) => a.name))
      const rec = { id, updatedAt: Date.now(), ...d, name }
      await putArtwork(rec)
      setArtworks((a) => [...a, summarize(rec)])
      openArtwork(id)
    } catch (e) {
      window.alert('Could not read that file — it does not look like a beadwork design or backup file.')
    }
  }

  // ---- auto-save: the open artwork persists itself (debounced) ----
  // React state (incl. `layers`) is the trigger, so silent pencil strokes are
  // caught at stroke end when setLayers runs. designData() reads the live refs.
  const saveTimer = useRef(0)
  useEffect(() => {
    if (screen !== 'editor' || !currentArtworkId) return
    clearTimeout(saveTimer.current)
    // Serialising a dense design (every layer's beads → arrays) is heavy; on a
    // big design back the debounce off so rapid edits don't churn memory and
    // hammer IndexedDB on each stroke (iPad Safari memory pressure).
    const total = layersRef.current.reduce((n, l) => n + (l.beads ? l.beads.size : 0), 0)
    const delay = total > 40000 ? 1500 : 600
    saveTimer.current = setTimeout(() => {
      const rec = { id: currentArtworkId, updatedAt: Date.now(), ...designData() }
      putArtwork(rec)
        .then(() => setArtworks((a) => a.map((x) => (x.id === rec.id ? summarize(rec) : x))))
        .catch(() => {})
    }, delay)
    return () => clearTimeout(saveTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, currentArtworkId, layers, canvasCm, beadMM, palette, pack, designName, techniqueId])

  // ---- one-time migration of the old localStorage designs into IndexedDB ----
  const migrateFromLocalStorage = async () => {
    if (await getMeta('migrated')) return
    const recs = []
    try {
      const list = JSON.parse(localStorage.getItem(DESIGNS_KEY) || 'null')
      if (Array.isArray(list)) {
        for (const slot of list) {
          if (slot && isDesign(slot.data)) {
            recs.push({ id: uid(), updatedAt: slot.savedAt || Date.now(), ...slot.data, name: slot.name || slot.data.name || 'Untitled' })
          }
        }
      }
    } catch (e) {}
    try {
      const d = JSON.parse(localStorage.getItem(DESIGN_KEY) || 'null')
      // the quick-save, unless it's already one of the named slots above
      if (isDesign(d) && !recs.some((r) => JSON.stringify(r.layers) === JSON.stringify(d.layers))) {
        recs.push({ id: uid(), updatedAt: Date.now(), ...d, name: d.name || 'Untitled' })
      }
    } catch (e) {}
    for (const r of recs) await putArtwork(r)
    await setMeta('migrated', true)
  }

  // ---- boot: migrate, then land on the gallery (never auto-open a design) ----
  // We deliberately do NOT auto-reopen the last artwork: on iPad a heavy design
  // could crash the tab, and auto-loading it on every launch turned that into a
  // crash → reopen → crash loop. Landing on the gallery (Procreate-style) lets
  // you recover — back up, or pick a different piece — instead of re-crashing.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await migrateFromLocalStorage()
        const all = await listArtworks()
        if (cancelled) return
        setArtworks(all.map(summarize))
        setScreen('gallery')
      } catch (e) {
        if (!cancelled) setScreen('gallery')
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- UI ----

  return (
    <div className="app">
      {/* LEFT panel — tools & document. Scrolls; hold-to-clear pinned at the bottom. */}
      <aside className="panel left">
        <div className="panelScroll">
        <div className="brand">BEADWORK<span className="dot" /></div>
        <div className="sub">{tech.subtitle}</div>

        {!canEdit && (
          <div className="lockNote">
            {activeLayer && !activeLayer.visible ? 'Active layer is hidden' : 'Active layer is locked'}
            {' '}— drawing is off.
          </div>
        )}

        {tool !== 'select' && (
          <div className="brushRow">
            <span className="brushLabel">Brush</span>
            <input
              className="slider"
              type="range"
              min="1"
              max="6"
              step="1"
              value={brush}
              onChange={(e) => setBrush(+e.target.value)}
            />
            <span className="brushVal">{brush}</span>
          </div>
        )}

        {(tool === 'select' || selection.size > 0 || placing) && (
          <div className="card selCard">
            <div className="cardTitle">Selection · {selection.size}</div>
            <div className="pillRow">
              <button className="ghost" onClick={recolorSelection} disabled={!selection.size || !canEdit}>Recolour</button>
              <button className="ghost" onClick={deleteSelection} disabled={!selection.size || !canEdit}>Delete</button>
            </div>
            {!placing && (
              <>
                <div className="pillRow">
                  <button className="ghost half" onClick={() => startPlacing('copy')} disabled={!selection.size || !canEdit}>Duplicate</button>
                  <button className="ghost half" onClick={() => startPlacing('move')} disabled={!selection.size || !canEdit}>Move</button>
                </div>
                <div className="pillRow">
                  <button className="ghost half" onClick={() => mirrorSelection('h')} disabled={!selection.size || !canEdit} title="Add a left–right flipped copy beside the selection">Mirror ↔</button>
                  <button className="ghost half" onClick={() => mirrorSelection('v')} disabled={!selection.size || !canEdit} title="Add an up–down flipped copy below the selection">Mirror ↕</button>
                </div>
              </>
            )}
            {placing && (
              <>
                <div className="cardTitle small">{placing.mode === 'move' ? 'Moving selection' : 'Placing copy'}</div>
                <div className="pillRow">
                  <button className="ghost half" onClick={placeMotif} disabled={!canEdit}>Place</button>
                  <button className="ghost half" onClick={() => setPlacing(null)}>Cancel</button>
                </div>
                <div className="hint tip">
                  {placing.mode === 'move'
                    ? 'Drag the faded beads to their new spot, then tap Place. Cancel puts them back.'
                    : 'Drag the faded copy on the canvas, then tap Place. The placed copy stays selected — Duplicate again to keep stamping.'}
                </div>
              </>
            )}
            {selection.size > 0 && <button className="ghost" onClick={clearSelection}>Clear selection</button>}
            <div className="cardTitle small">Pattern maker</div>
            <div className="pillRow">
              <button className="ghost" onClick={() => makePattern('grid')} disabled={!selection.size || !canEdit}>Grid</button>
              <button className="ghost" onClick={() => makePattern('brick')} disabled={!selection.size || !canEdit}>Brick</button>
              <button className="ghost" onClick={() => makePattern('halfdrop')} disabled={!selection.size || !canEdit}>½ drop</button>
            </div>
            <Pill
              value={patternGap}
              label="gap beads"
              onChange={(v) => setPatternGap(clampNum(Math.round(v), 0, 60))}
            />
            <div className="hint tip">
              Drag a box over coloured beads to select a motif, then repeat it
              across the whole canvas. Gap = empty beads between repeats.
              Undo removes the pattern.
            </div>
          </div>
        )}

        <div className="hint tip">Drag a palette colour onto the canvas to fill a region.</div>

        <div className="card">
          <div className="cardTitle">Canvas size</div>
          <div className="pillRow">
            <Pill value={canvasCm.w} label="cm W" onChange={(v) => setCanvasCm((c) => ({ ...c, w: clampNum(v, 1, 300) }))} />
            <Pill value={canvasCm.h} label="cm H" onChange={(v) => setCanvasCm((c) => ({ ...c, h: clampNum(v, 1, 300) }))} />
          </div>
          <div className="hint">≈ {cols} × {rows} beads · pinch / scroll to zoom · finger / space-drag to pan · 2-finger tap undo · 3-finger tap redo</div>
        </div>

        <div className="card">
          <div className="cardTitle">Bead size</div>
          <div className="segmented">
            {BEAD_SIZES.map((s) => (
              <button
                key={s.label}
                className={`seg ${beadMM.w === s.w ? 'on' : ''}`}
                onClick={() => setBeadMM({ w: s.w, h: s.h })}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="hint">4:5 ratio · {cols} × {rows} beads</div>
          <div className="cardTitle small">Bead spacing</div>
          <div className="brushRow">
            <span className="brushLabel">Spaced</span>
            <input
              className="slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={pack}
              onChange={(e) => setPack(+e.target.value)}
            />
            <span className="brushLabel">Packed</span>
          </div>
          <div className="hint">Packed draws beads touching, like the real weave.</div>
        </div>

        <div className="card">
          <div className="cardTitle">Background &amp; images</div>
          <div className="hint">The background colour and reference images are now layers. Open the <strong>Layers</strong> panel (right of the canvas) to set the background colour, add a photo to trace, or hide the background for transparency.</div>
        </div>
        </div>

        <div className="saveCluster">
          <HoldButton onHold={clearCanvas}>Hold to clear canvas</HoldButton>
        </div>
      </aside>

      <main className="stage">
        <div className="pasteboard" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            className={`board ${grabbing ? 'grab' : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onPointerLeave={clearHover}
          />
          {/* hover ghost lives here so it repaints without redrawing the scene.
              Mouse-only: never allocated on touch screens (iPad memory). */}
          {canHover && <canvas ref={overlayRef} className="overlay" />}
          {/* floating tool strip — right edge, under a right-handed iPad user's
              hand (locked iPad-pass decision #4). Big ≥44px touch targets. */}
          <div className="toolStrip">
            {[
              ['draw', 'Draw', <IconDraw key="d" />],
              ['erase', 'Erase', <IconErase key="e" />],
              ['select', 'Select', <IconSelect key="s" />],
            ].map(([id, label, icon]) => (
              <button
                key={id}
                className={`stripBtn ${tool === id ? 'on' : ''}`}
                onClick={() => setTool(id)}
                title={label}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
            <span className="stripSep" />
            <button
              className={`stripBtn ${showLayers ? 'on' : ''}`}
              onClick={() => setShowLayers((v) => !v)}
              title="Layers"
            >
              <IconLayers />
              <span>Layers</span>
            </button>
          </div>

          {/* floating Procreate-style layers panel (sits left of the tool strip) */}
          {showLayers && (
            <div className="layersPanel">
              <div className="layersHead">
                <span>LAYERS</span>
                <div className="lpHeadBtns">
                  <label className="lpAdd lpImg" title="Add reference image">
                    <IconImage />
                    <input type="file" accept="image/png,image/jpeg" style={{ display: 'none' }} onChange={(e) => { addImageLayer(e.target.files[0]); e.target.value = '' }} />
                  </label>
                  <button className="lpAdd" onClick={addLayer} title="New bead layer">+</button>
                </div>
              </div>
              <div className="layersList">
                {/* top of the stack shows first (array is bottom→top) */}
                {[...layers].reverse().map((l) => (
                    <div
                      key={l.id}
                      className={`layerRow ${l.id === activeId ? 'on' : ''} ${l.id === adjustId ? 'adjusting' : ''}`}
                      onClick={() => switchLayer(l.id)}
                    >
                      <button
                        className="lpEye"
                        onClick={(e) => { e.stopPropagation(); toggleVisible(l.id) }}
                        title={l.visible ? (l.type === 'bg' ? 'Hide background (transparent)' : 'Hide layer') : 'Show layer'}
                      >
                        {l.visible ? <IconEye /> : <IconEyeOff />}
                      </button>
                      {l.type === 'bg' && (
                        <input
                          type="color"
                          className="lpSwatch"
                          value={l.color}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setBgColor(e.target.value)}
                          title="Background colour"
                        />
                      )}
                      <span
                        className="lpName"
                        onDoubleClick={() => {
                          if (l.type === 'bg') return
                          const name = window.prompt('Rename layer:', l.name)
                          if (name !== null) renameLayer(l.id, name.trim() || l.name)
                        }}
                        title={l.type === 'bg' ? 'Background colour' : 'Double-click to rename'}
                      >
                        {l.name}
                        {l.locked && <em className="lpLockTag">locked</em>}
                        {l.alphaLock && <em className="lpLockTag">α</em>}
                      </span>
                      {l.type === 'image' ? (
                        <button
                          className={`lpAdjust ${l.id === adjustId ? 'on' : ''}`}
                          onClick={(e) => { e.stopPropagation(); switchLayer(l.id); setAdjustId(l.id === adjustId ? null : l.id) }}
                          disabled={l.locked || !l.visible}
                          title="Move / resize this image on the canvas"
                        >{l.id === adjustId ? 'Done' : 'Adjust'}</button>
                      ) : l.type === 'bead' ? (
                        <span className="lpCount">{l.beads.size}</span>
                      ) : null}
                      {l.type !== 'bg' && (
                        <button
                          className="lpLock"
                          onClick={(e) => { e.stopPropagation(); toggleLock(l.id) }}
                          title={l.locked ? 'Unlock layer' : 'Lock layer'}
                        >
                          {l.locked ? <IconLock /> : <IconUnlock />}
                        </button>
                      )}
                    </div>
                ))}
              </div>
              {activeLayer?.type === 'image' && (
                <div className="lpOpacity">
                  <span className="brushLabel">Opacity</span>
                  <input
                    className="slider"
                    type="range" min="0.1" max="1" step="0.05"
                    value={activeLayer.opacity == null ? 1 : activeLayer.opacity}
                    onChange={(e) => updateLayer(activeLayer.id, { opacity: +e.target.value })}
                  />
                </div>
              )}
              <div className="layerActions">
                {(() => {
                  const i = layers.findIndex((l) => l.id === activeId)
                  const t = activeLayer?.type
                  const isBead = t === 'bead' || t == null
                  return (
                    <>
                      <button onClick={() => duplicateLayer(activeId)} disabled={t === 'bg'} title="Duplicate active layer">Dup</button>
                      <button onClick={() => mergeDown(activeId)} disabled={!isBead || layers[i - 1]?.type !== 'bead'} title="Merge active layer down">Merge↓</button>
                      <button
                        className={activeLayer?.alphaLock ? 'on' : ''}
                        onClick={() => toggleAlphaLock(activeId)}
                        disabled={!isBead}
                        title="Alpha lock — recolour existing beads only"
                      >α</button>
                      <button onClick={() => moveLayer(activeId, 1)} disabled={t === 'bg' || i >= layers.length - 1} title="Move up">↑</button>
                      <button onClick={() => moveLayer(activeId, -1)} disabled={t === 'bg' || i <= 1} title="Move down">↓</button>
                      <button onClick={clearCanvas} disabled={!isBead} title="Clear this layer's beads (keeps the layer)">Clear</button>
                      <button onClick={() => deleteLayer(activeId)} disabled={t === 'bg'} title="Delete active layer">Del</button>
                    </>
                  )
                })()}
              </div>
              <div className="lpHint">Background is the bottom layer — hide it for a transparent canvas. Add images to trace; top layer wins where beads overlap.</div>
            </div>
          )}
          {/* image-adjust mode banner */}
          {adjustLayer && (
            <div className="adjustBar">
              <span>ADJUST IMAGE — DRAG TO MOVE · PINCH / SCROLL TO RESIZE · SNAPS TO EDGES</span>
              <button onClick={() => setAdjustId(null)}>DONE</button>
            </div>
          )}
          {toast && <div className="toast" key={toast}>{toast}</div>}
          <div className="zoomCtl">
            <button onClick={undo} title="Undo — 2-finger tap or Ctrl+Z">↶</button>
            <button onClick={redo} title="Redo — 3-finger tap or Ctrl+Shift+Z">↷</button>
            <span className="zsep" />
            <button onClick={() => zoomAt(1 / 1.2, viewport.w / 2, viewport.h / 2)} title="Zoom out">−</button>
            <button className="zval" onClick={fitView} title="Fit to screen">{Math.round(view.scale * 100)}%</button>
            <button onClick={() => zoomAt(1.2, viewport.w / 2, viewport.h / 2)} title="Zoom in">+</button>
          </div>
        </div>
        <div className="stageInfo">
          {cols} × {rows} GRID · {canvasCm.w}×{canvasCm.h} CM · BEAD {beadMM.w}×{beadMM.h} MM · {Math.round(view.scale * 100)}%
          {view.rot ? ` · ${(((Math.round(view.rot * 180 / Math.PI) % 360) + 360) % 360)}°` : ''}
          {' · '}{layers.reduce((n, l) => n + (l.beads ? l.beads.size : 0), 0).toLocaleString()} PLACED
          {typeof performance !== 'undefined' && performance.memory
            ? ` · ${Math.round(performance.memory.usedJSHeapSize / 1048576)} MB`
            : ''}
          {' · v'}{BUILD_ID}
        </div>
      </main>

      {/* RIGHT panel — colour & output. Content scrolls; the save cluster stays
          pinned at the bottom so a big palette can't push it away (iPad pass #6). */}
      <aside className="panel right">
        <div className="panelScroll">

        {/* Colour */}
        <div className="card">
          <div className="cardTitle">Colour</div>
          <div className="colorTop">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bigSwatch"
              onPointerDown={onBigSwatchDown}
              onClick={onBigSwatchClick}
              title="Tap to open the colour picker · drag onto the canvas to fill"
            />
            <Pill value={color} label="hex" text onChange={(v) => setColor(v)} />
          </div>
          {recentColors.length > 0 && (
            <>
              <div className="cardTitle small">Recent</div>
              <div className="swatches">
                {recentColors.map((c, i) => (
                  <button
                    key={i}
                    className={`sw ${c === color ? 'on' : ''}`}
                    style={{ background: c }}
                    onPointerDown={onSwatchDown(c)}
                    onPointerMove={onSwatchMove}
                    onPointerUp={onSwatchUp}
                    onPointerCancel={onSwatchCancel}
                    title={c}
                  />
                ))}
              </div>
            </>
          )}
          <div className="cardTitle small">Palette</div>
          <div className="swatches">
            {palette.map((c, i) => (
              <button
                key={i}
                className={`sw ${c === color ? 'on' : ''}`}
                style={{ background: c }}
                onPointerDown={onSwatchDown(c)}
                onPointerMove={onSwatchMove}
                onPointerUp={onSwatchUp}
                onPointerCancel={onSwatchCancel}
                title={`${c} — tap to pick, drag onto canvas to fill`}
              />
            ))}
            <button
              className="sw add"
              title="Add current colour"
              onClick={() => setPalette((p) => (p.includes(color) ? p : [...p, color]))}
            >+</button>
          </div>
          <button
            className="ghost"
            onClick={() => {
              const name = window.prompt('Name this palette:')
              if (name) persistPalettes([...savedPalettes, { name, colors: palette }])
            }}
          >Save current palette</button>
          {savedPalettes.length > 0 && (
            <>
              <div className="cardTitle small">Saved palettes — click to load</div>
              <div className="savedList">
                {savedPalettes.map((p, i) => (
                  <div className="savedItem" key={i}>
                    <button
                      className="savedApply"
                      onClick={() => setPalette(p.colors)}
                      title={`Load “${p.name}”`}
                    >
                      <span className="savedName">{p.name}</span>
                      <span className="savedSw">
                        {p.colors.slice(0, 12).map((c, j) => (
                          <i key={j} style={{ background: c }} />
                        ))}
                      </span>
                    </button>
                    <button
                      className="x"
                      title="Delete palette"
                      onClick={() => persistPalettes(savedPalettes.filter((_, k) => k !== i))}
                    >×</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* This artwork — name + auto-save status + a file to move it elsewhere */}
        <div className="card">
          <div className="cardTitle">This artwork</div>
          <Pill value={designName} label="name" text onChange={setDesignName} />
          <button className="ghost" onClick={() => setScreen('gallery')}>← My artworks</button>
          <button className="ghost" onClick={exportDesignFile}>Export this artwork</button>
          <div className="hint tip">
            Saves itself automatically. Open another, or manage all your artworks,
            from My artworks. Export to back up or move to another device.
          </div>
        </div>

        {/* Export — PNG chart for the artisan */}
        <div className="card">
          <div className="cardTitle">Export — chart PNG</div>
          <div className="segmented">
            {[
              ['transparent', 'Transparent'],
              ['screen', 'On-screen'],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`seg ${exportBg === id ? 'on' : ''}`}
                onClick={() => setExportBg(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="hint">One sheet · outlined beads · numbers + guides every 10 · colour key.</div>
        </div>

        </div>

        <div className="saveCluster">
          <button className="primary" onClick={exportPNG}>Save PNG</button>
          <div className="hint tip">Your work auto-saves. “Save PNG” makes the printable chart for the artisan.</div>
        </div>
      </aside>

      {/* floating swatch that follows the pointer while dragging a colour */}
      {dragGhost && (
        <div
          className="dragGhost"
          style={{ left: dragGhost.x, top: dragGhost.y, background: dragGhost.color }}
        />
      )}

      {/* My artworks gallery — covers the editor when not editing. Loading state
          while the boot read of IndexedDB resolves. */}
      {screen !== 'editor' && (
        <div className="galleryScrim">
          {screen === 'loading' ? (
            <div className="galleryLoading">Loading your artworks…</div>
          ) : (
            <div className="gallery">
              <div className="galleryHead">
                <div className="brand big">MY ARTWORKS<span className="dot" /><span className="buildTag">v{BUILD_ID}</span></div>
                <button className="primary newBtn" onClick={() => setChooser(true)}>+ New artwork</button>
              </div>
              {artworks.length === 0 ? (
                <div className="galleryEmpty">
                  No artworks yet. Tap <b>+ New artwork</b> to plant your first one.
                </div>
              ) : (
                <div className="galleryList">
                  {[...artworks]
                    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
                    .map((a) => (
                      <div className="artRow" key={a.id}>
                        <button className="artOpen" onClick={() => openArtwork(a.id)} title="Open">
                          <span className="artName">{a.name}</span>
                          <span className="artMeta">{a.technique} · {a.beads} beads · {timeAgo(a.updatedAt)}</span>
                        </button>
                        <div className="artActions">
                          <button onClick={() => { const n = window.prompt('Rename artwork:', a.name); if (n !== null) renameArtwork(a.id, n) }}>Rename</button>
                          <button onClick={() => duplicateArtwork(a.id)}>Duplicate</button>
                          <button className="del" onClick={() => removeArtwork(a.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div className="galleryFoot">
                <label className="ghost fileBtn half">
                  Import file / backup
                  <input
                    type="file"
                    accept=".json,application/json"
                    style={{ display: 'none' }}
                    onChange={(e) => { onDesignFile(e.target.files[0]); e.target.value = '' }}
                  />
                </label>
                <button className="ghost half" onClick={exportAllArtworks} disabled={!artworks.length}>Back up all</button>
              </div>
              <div className="hint tip galleryHint">
                Artworks are saved in this browser. “Back up all” keeps a safety
                copy you can re-import here or on another device.
              </div>
            </div>
          )}
        </div>
      )}

      {/* technique chooser — opens from "New artwork". The choice is fixed for
          the new artwork's life. */}
      {chooser && (
        <div className="modalScrim">
          <div className="modal">
            <div className="modalTitle">CHOOSE A TECHNIQUE</div>
            <div className="modalSub">
              Starts a fresh, blank artwork. The technique is fixed once chosen —
              switching later means starting a new artwork.
            </div>
            <div className="techGrid">
              {TECHNIQUES.map((t) => (
                <button
                  key={t.id}
                  className="techCard"
                  onClick={() => createArtwork(t.id)}
                >
                  <span className="techName">{t.label}</span>
                  <span className="techDesc">
                    {t.id === '3bead'
                      ? 'Kutch 3-bead weave — staggered, tilted beads.'
                      : 'Loom / square-stitch — straight aligned grid.'}
                  </span>
                </button>
              ))}
            </div>
            <button className="ghost" onClick={() => setChooser(null)}>Cancel</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        html, body, #root { height: 100%; margin: 0; }
        body {
          background: ${T.bg};
          color: ${T.ink};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Avenir,
            Helvetica, sans-serif;
          /* iPad: no rubber-band scroll, no double-tap zoom, no text selection
             while drawing — the canvas owns all touch gestures */
          overscroll-behavior: none;
          touch-action: manipulation;
          -webkit-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        * { box-sizing: border-box; }
      `}</style>

      <style jsx>{`
        /* 100dvh = the REAL visible height on iPad Safari (100vh hides behind
           the browser chrome and cut off the bottom buttons) */
        .app { display: flex; height: 100vh; height: 100dvh; overflow: hidden; }

        /* floating swatch following the pointer during a colour drag */
        .dragGhost {
          position: fixed; z-index: 40; width: 30px; height: 30px;
          border-radius: 10px; pointer-events: none;
          transform: translate(-50%, -130%);
          border: 2px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.45);
        }
        .stage {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; min-height: 0;
        }
        /* fixed Figma/Photoshop-style pasteboard: fills the work area, no
           scrollbars. The viewport-sized canvas fills it; pan/zoom is a transform. */
        .pasteboard {
          position: relative; flex: 1; min-height: 0; overflow: hidden;
          background: #131313;
          background-image: radial-gradient(#1c1c1c 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .board { display: block; touch-action: none; cursor: crosshair; }
        .board.grab { cursor: grab; }
        /* ghost overlay sits exactly over the board; clicks pass through to it */
        .overlay {
          position: absolute; top: 0; left: 0;
          pointer-events: none; touch-action: none;
        }
        .zoomCtl {
          position: absolute; left: 14px; bottom: 14px;
          display: flex; align-items: center; gap: 2px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 3px;
        }
        .zoomCtl button {
          border: none; background: none; color: ${T.ink}; cursor: pointer;
          font-family: ${T.mono}; font-size: 14px; width: 30px; height: 26px;
          border-radius: 4px;
        }
        .zoomCtl button:hover { background: #1d1d1d; }
        .zoomCtl .zval { width: 54px; font-size: 11px; }
        .zsep { width: 1px; height: 18px; background: ${T.line}; margin: 0 3px; }

        /* image-adjust mode banner */
        .adjustBar {
          position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 12px;
          background: ${T.panelSolid}; border: 1px solid ${T.accent};
          border-radius: ${T.radius}px; padding: 8px 12px;
          font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.08em;
          color: ${T.ink}; white-space: nowrap;
        }
        .adjustBar button {
          border: none; background: ${T.accent}; color: #fff; cursor: pointer;
          font-family: ${T.mono}; font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; padding: 6px 14px; border-radius: 4px;
        }

        /* floating Draw/Erase/Select strip — right edge, ≥44px touch targets */
        .toolStrip {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 5px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 5px;
        }
        .stripBtn {
          width: 56px; height: 56px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 4px;
          border: none; background: none; color: ${T.inkSoft};
          border-radius: 5px; cursor: pointer;
          font-family: ${T.mono}; font-size: 8px; text-transform: uppercase;
          letter-spacing: 0.08em; transition: all 0.12s;
        }
        .stripBtn:hover { color: ${T.ink}; background: #1d1d1d; }
        .stripBtn.on {
          color: ${T.ink}; background: #161616;
          box-shadow: inset 0 0 0 1px ${T.accent};
        }
        .stripBtn.on svg { color: ${T.accent}; }
        .stripSep { height: 1px; background: ${T.line}; margin: 3px 6px; }

        /* floating Procreate-style layers panel */
        .layersPanel {
          position: absolute; right: 84px; top: 50%; transform: translateY(-50%);
          width: 210px; max-height: 78%;
          display: flex; flex-direction: column;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20;
        }
        .layersHead {
          display: flex; align-items: center; justify-content: space-between;
          font-family: ${T.mono}; font-size: 10px; letter-spacing: 0.12em;
          color: ${T.inkSoft}; padding: 2px 4px 8px;
        }
        .lpHeadBtns { display: flex; gap: 6px; align-items: center; }
        .lpAdd {
          border: none; background: ${T.pill}; color: ${T.ink}; cursor: pointer;
          width: 24px; height: 24px; border-radius: 6px; font-size: 17px; line-height: 1;
          display: flex; align-items: center; justify-content: center; padding: 0;
        }
        .lpAdd:hover { background: #242424; }
        .lpImg { font-size: 0; }
        .lpSwatch {
          flex-shrink: 0; width: 20px; height: 20px; padding: 0; border: 1px solid ${T.line};
          border-radius: 5px; background: none; cursor: pointer;
        }
        .lpSwatch::-webkit-color-swatch-wrapper { padding: 0; }
        .lpSwatch::-webkit-color-swatch { border: none; border-radius: 4px; }
        .lpAdjust {
          flex-shrink: 0; border: none; background: ${T.pill}; color: ${T.inkSoft};
          cursor: pointer; border-radius: 6px; padding: 4px 7px;
          font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.04em;
        }
        .lpAdjust:hover { color: ${T.ink}; }
        .lpAdjust.on { background: ${T.ink}; color: ${T.bg}; }
        .lpAdjust:disabled { opacity: 0.3; cursor: not-allowed; }
        .layerRow.adjusting { border-color: ${T.accent}; }
        .lpOpacity {
          display: flex; align-items: center; gap: 8px; padding: 8px 4px 2px;
          margin-top: 6px; border-top: 1px solid ${T.line};
        }
        .layersList {
          display: flex; flex-direction: column; gap: 4px;
          overflow-y: auto; -webkit-overflow-scrolling: touch; min-height: 0;
        }
        .layerRow {
          display: flex; align-items: center; gap: 6px;
          background: ${T.pill}; border-radius: 7px; padding: 7px 8px;
          cursor: pointer; border: 1px solid transparent; transition: background 0.12s;
        }
        .layerRow:hover { background: #242424; }
        .layerRow.on { border-color: ${T.accent}; background: #1b1b1b; }
        .lpEye, .lpLock {
          flex-shrink: 0; border: none; background: none; cursor: pointer;
          color: ${T.inkSoft}; display: flex; align-items: center; padding: 2px;
        }
        .lpEye:hover, .lpLock:hover { color: ${T.ink}; }
        .lpName {
          flex: 1; min-width: 0; font-family: ${T.mono}; font-size: 11px;
          color: ${T.ink}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          display: flex; align-items: baseline; gap: 6px;
        }
        .lpLockTag { font-size: 8px; font-style: normal; color: ${T.inkSoft};
          text-transform: uppercase; letter-spacing: 0.08em; }
        .lpCount { flex-shrink: 0; font-family: ${T.mono}; font-size: 9px; color: ${T.inkSoft}; }
        .layerActions {
          display: flex; gap: 4px; padding-top: 8px; margin-top: 6px;
          border-top: 1px solid ${T.line};
        }
        .layerActions button {
          flex: 1; min-width: 0; border: none; background: ${T.pill}; color: ${T.ink};
          cursor: pointer; border-radius: 6px; padding: 7px 2px;
          font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.02em;
        }
        .layerActions button:hover { background: #242424; }
        .layerActions button:disabled { opacity: 0.3; cursor: not-allowed; }
        .layerActions button.on { background: ${T.ink}; color: ${T.bg}; }
        .lpHint { font-family: ${T.mono}; font-size: 8.5px; color: ${T.inkSoft};
          line-height: 1.5; padding: 8px 4px 2px; }

        /* active-layer-not-editable banner (left panel) */
        .lockNote {
          background: #1b1b1b; border: 1px solid ${T.accent};
          border-radius: ${T.radius}px; padding: 8px 10px;
          font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.04em;
          color: ${T.ink}; line-height: 1.5;
        }
        .toast {
          position: absolute; left: 50%; bottom: 64px; transform: translateX(-50%);
          background: #1b1b1b; border: 1px solid ${T.accent};
          border-radius: ${T.radius}px; padding: 9px 14px; max-width: 80%;
          font-family: ${T.mono}; font-size: 10px; letter-spacing: 0.04em;
          color: ${T.ink}; text-align: center; pointer-events: none; z-index: 40;
          box-shadow: 0 6px 24px rgba(0,0,0,0.4);
          animation: toastIn 0.18s ease-out;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 6px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .stageInfo {
          flex-shrink: 0; color: ${T.inkSoft}; font-size: 10px; font-family: ${T.mono};
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 9px 16px; border-top: 1px solid ${T.line}; background: ${T.bg};
        }
        .buildTag {
          margin-left: 10px; font-family: ${T.mono}; font-size: 10px;
          letter-spacing: 0.08em; color: ${T.inkSoft}; opacity: 0.7;
        }

        .panel {
          width: 252px; flex-shrink: 0;
          background: ${T.panel};
          background-image: radial-gradient(${T.line} 1px, transparent 1px);
          background-size: 14px 14px;
          padding: 18px 14px; overflow: hidden;
          display: flex; flex-direction: column; gap: 11px;
        }
        .panel.left { border-right: 1px solid ${T.line}; }
        .panel.right { border-left: 1px solid ${T.line}; }
        /* both panels: cards scroll, the pinned cluster below stays visible */
        .panelScroll {
          flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          display: flex; flex-direction: column; gap: 11px;
        }
        .saveCluster {
          flex-shrink: 0; display: flex; flex-direction: column; gap: 7px;
          padding-top: 11px; border-top: 1px solid ${T.line};
        }
        .brand {
          font-size: 18px; font-weight: 700; letter-spacing: 0.04em;
          font-family: ${T.mono}; display: inline-flex; align-items: center;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${T.accent}; margin-left: 7px;
        }
        .sub { color: ${T.inkSoft}; font-size: 10px; margin-top: -8px;
          font-family: ${T.mono}; letter-spacing: 0.12em; }

        .tip { color: ${T.inkSoft}; opacity: 0.8; }

        /* brush size slider */
        .brushRow { display: flex; align-items: center; gap: 10px; padding: 2px 2px; }
        .brushLabel { font-family: ${T.mono}; font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.1em; color: ${T.inkSoft}; }
        .brushVal { font-family: ${T.mono}; font-size: 12px; color: ${T.ink}; width: 12px; text-align: right; }
        /* min-width: 0 — a range input refuses to flex-shrink below its ~129px
           built-in size otherwise, which made the left panel scroll sideways */
        .slider { flex: 1; min-width: 0; -webkit-appearance: none; appearance: none; height: 3px;
          background: ${T.line}; border-radius: 3px; outline: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none;
          width: 14px; height: 14px; border-radius: 50%; background: ${T.ink}; cursor: pointer; }
        .slider::-moz-range-thumb { width: 14px; height: 14px; border: none; border-radius: 50%;
          background: ${T.ink}; cursor: pointer; }

        /* selection actions */
        .selCard .pillRow { gap: 7px; }
        .ghost:disabled { opacity: 0.35; cursor: not-allowed; }
        .ghost:disabled:hover { background: ${T.pill}; }

        /* accessibility: clear keyboard focus ring on every control */
        .panel button:focus-visible, .panel input:focus-visible,
        .panel label:focus-within { outline: 2px solid ${T.accent}; outline-offset: 1px; }

        .card {
          background: ${T.panelSolid};
          border-radius: ${T.radius}px;
          padding: 14px; display: flex; flex-direction: column; gap: 10px;
        }
        .cardTitle { font-size: 10px; font-weight: 600; color: ${T.inkSoft};
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em; }
        .cardTitle.small { margin-top: 4px; }
        .hint { font-size: 10px; color: ${T.inkSoft}; font-family: ${T.mono};
          letter-spacing: 0.02em; line-height: 1.5; }

        .segmented { display: flex; gap: 6px; }
        .seg {
          flex: 1; padding: 9px 6px; border: none;
          background: ${T.pill}; color: ${T.ink};
          border-radius: 9px; cursor: pointer; font-size: 13px; font-weight: 600;
          transition: background 0.12s;
        }
        .seg:hover { background: #1d1d1d; }
        .seg.on { background: ${T.active}; color: ${T.activeInk}; }

        .pillRow { display: flex; gap: 8px; }

        .colorTop { display: flex; gap: 10px; align-items: center; }
        .bigSwatch {
          width: 52px; height: 52px; padding: 0; border: 1px solid ${T.line};
          border-radius: 14px; background: none; cursor: pointer;
          touch-action: none; /* dragging the swatch fills, it must not scroll the panel */
        }
        .swatches { display: flex; flex-wrap: wrap; gap: 7px; }
        .sw {
          width: 28px; height: 28px; border-radius: 9px; cursor: pointer;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
          touch-action: none; /* a finger on a swatch drags colour, not the panel */
        }
        .sw.on { border-color: ${T.ink}; }
        .sw.add {
          background: ${T.pill}; color: ${T.inkSoft}; border: 1px dashed ${T.line};
          font-size: 16px; line-height: 1;
        }
        .savedList { display: flex; flex-direction: column; gap: 5px;
          max-height: 168px; overflow-y: auto; }
        .savedItem { display: flex; align-items: stretch; gap: 4px; }
        .savedApply {
          flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px;
          background: ${T.pill}; border: none; border-radius: 8px; padding: 7px 9px;
          cursor: pointer; text-align: left; transition: background 0.12s;
        }
        .savedApply:hover { background: #242424; }
        .savedName { font-family: ${T.mono}; font-size: 10px; color: ${T.ink};
          text-transform: uppercase; letter-spacing: 0.06em; }
        .savedSw { display: flex; flex-wrap: wrap; gap: 3px; }
        .savedSw i { width: 14px; height: 14px; border-radius: 3px; display: block;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
        .x { background: none; border: none; color: ${T.inkSoft}; cursor: pointer;
          font-size: 16px; padding: 0 5px; }
        .x:hover { color: ${T.accent}; }

        .ghost, .fileBtn {
          padding: 10px; border: none; background: ${T.pill};
          color: ${T.ink}; border-radius: 10px; cursor: pointer; font-size: 13px;
          font-weight: 600; text-align: center; display: block; transition: background 0.12s;
        }
        .ghost:hover, .fileBtn:hover { background: #1d1d1d; }
        .ghost.half { flex: 1; min-width: 0; }
        .primary {
          padding: 14px; border: none; cursor: pointer;
          background: ${T.accent}; color: #ffffff;
          border-radius: ${T.radius}px; font-size: 12px; font-weight: 700;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em;
          transition: opacity 0.12s;
        }
        .primary:hover { opacity: 0.88; }

        /* technique chooser modal */
        .modalScrim {
          position: fixed; inset: 0; z-index: 60; display: flex;
          align-items: center; justify-content: center; padding: 24px;
          background: rgba(0,0,0,0.72);
          background-image: radial-gradient(${T.line} 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .modal {
          width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 14px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 22px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .modalTitle { font-family: ${T.mono}; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; color: ${T.ink};
          display: flex; align-items: center; gap: 8px; }
        .modalTitle::after { content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: ${T.accent}; }
        .modalSub { font-family: ${T.mono}; font-size: 10px; line-height: 1.6;
          color: ${T.inkSoft}; }
        .techGrid { display: flex; gap: 12px; flex-wrap: wrap; }
        .techCard {
          flex: 1; min-width: 160px; text-align: left; cursor: pointer;
          display: flex; flex-direction: column; gap: 7px;
          background: ${T.pill}; border: 1px solid ${T.line};
          border-radius: 10px; padding: 16px; transition: all 0.12s;
        }
        .techCard:hover { background: #1d1d1d; border-color: ${T.inkSoft}; }
        .techCard.on { border-color: ${T.accent}; }
        .techName { font-size: 14px; font-weight: 700; color: ${T.ink}; }
        .techDesc { font-family: ${T.mono}; font-size: 10px; line-height: 1.5; color: ${T.inkSoft}; }

        /* My artworks gallery (covers the editor when not editing) */
        .galleryScrim {
          position: fixed; inset: 0; z-index: 50; display: flex;
          align-items: flex-start; justify-content: center; overflow-y: auto;
          padding: 40px 24px; background: ${T.bg};
          background-image: radial-gradient(${T.line} 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .galleryLoading {
          margin-top: 18vh; font-family: ${T.mono}; font-size: 12px;
          letter-spacing: 0.1em; color: ${T.inkSoft};
        }
        .gallery {
          width: 100%; max-width: 640px; display: flex; flex-direction: column; gap: 16px;
        }
        .galleryHead { display: flex; align-items: center; justify-content: space-between; }
        .brand.big { font-size: 22px; }
        .newBtn { width: auto; padding: 12px 18px; }
        .galleryEmpty {
          font-family: ${T.mono}; font-size: 12px; line-height: 1.7; color: ${T.inkSoft};
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 28px; text-align: center;
        }
        .galleryEmpty b { color: ${T.ink}; }
        .galleryList { display: flex; flex-direction: column; gap: 8px; }
        .artRow {
          display: flex; align-items: stretch; gap: 8px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 6px;
        }
        .artOpen {
          flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; text-align: left; padding: 8px 10px;
          border-radius: 5px; transition: background 0.12s;
        }
        .artOpen:hover { background: ${T.pill}; }
        .artName { font-size: 14px; font-weight: 700; color: ${T.ink};
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .artMeta { font-family: ${T.mono}; font-size: 10px; color: ${T.inkSoft}; }
        .artActions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .artActions button {
          border: none; background: ${T.pill}; color: ${T.ink}; cursor: pointer;
          font-family: ${T.mono}; font-size: 9px; text-transform: uppercase;
          letter-spacing: 0.04em; padding: 8px 9px; border-radius: 6px;
        }
        .artActions button:hover { background: #242424; }
        .artActions .del:hover { color: #fff; background: ${T.accent}; }
        .galleryFoot { display: flex; gap: 8px; }
        .galleryHint { text-align: center; }
      `}</style>
    </div>
  )
}

// minimal monochrome tool icons (inherit currentColor)
function IconDraw() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}
function IconErase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20H7L3 16a2 2 0 010-3l9-9a2 2 0 013 0l5 5a2 2 0 010 3l-7 8" />
      <path d="M9 11l5 5" />
    </svg>
  )
}
function IconSelect() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}
function IconLayers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconEyeOff() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.9 17.9A10.6 10.6 0 0112 19C5 19 1 12 1 12a18.5 18.5 0 014.2-5.1m3-1.6A10.6 10.6 0 0112 5c7 0 11 7 11 7a18.5 18.5 0 01-2.2 3.1" />
      <path d="M9.9 9.9a3 3 0 004.2 4.2" />
      <path d="M1 1l22 22" />
    </svg>
  )
}
function IconLock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}
function IconUnlock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 019.9-1" />
    </svg>
  )
}
function IconImage() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

// inline-labeled input pill (signature look, spec §7.5).
// While focused it edits a local draft string, so the field can be cleared
// to type a fresh number (a clamped controlled input made that impossible);
// the real value only updates on valid input and snaps back on blur.
function Pill({ value, label, onChange, step = 1, text = false }) {
  const [draft, setDraft] = useState(null)
  return (
    <div className="pill">
      <input
        className="pillInput"
        type={text ? 'text' : 'number'}
        value={draft !== null ? draft : value}
        step={step}
        onFocus={() => setDraft(String(value))}
        onChange={(e) => {
          const v = e.target.value
          setDraft(v)
          if (text) {
            onChange(v)
            return
          }
          const n = parseFloat(v)
          if (!Number.isNaN(n)) onChange(n)
        }}
        onBlur={() => setDraft(null)}
      />
      <span className="pillLabel">{label}</span>
      <style jsx>{`
        .pill {
          flex: 1; display: flex; align-items: baseline; gap: 4px;
          background: ${T.pill}; border: none;
          border-radius: ${T.radius}px; padding: 9px 12px; min-width: 0;
        }
        .pillInput {
          border: none; outline: none; width: 100%; min-width: 0;
          font-size: 14px; font-weight: 600; color: ${T.ink}; background: none;
          font-family: ${T.mono}; -moz-appearance: textfield;
        }
        /* remove the number-input spinner / scroll buttons (clean minimal) */
        .pillInput::-webkit-outer-spin-button,
        .pillInput::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .pillLabel { font-size: 9px; color: ${T.inkSoft}; font-weight: 600; flex-shrink: 0;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.08em; }
      `}</style>
    </div>
  )
}

// press-and-hold button: the action fires only after `duration` ms of
// continuous press (release/leave cancels). A sweeping fill shows progress —
// no confirm dialog needed, and the action is undo-able anyway.
function HoldButton({ duration = 700, onHold, children }) {
  const timer = useRef(null)
  const [holding, setHolding] = useState(false)
  const start = (e) => {
    e.preventDefault()
    setHolding(true)
    timer.current = setTimeout(() => {
      setHolding(false)
      onHold()
    }, duration)
  }
  const cancel = () => {
    setHolding(false)
    clearTimeout(timer.current)
  }
  return (
    <button
      className={`holdBtn ${holding ? 'holding' : ''}`}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
    >
      <span className="holdFill" style={{ transitionDuration: `${duration}ms` }} />
      <span className="holdLabel">{children}</span>
      <style jsx>{`
        .holdBtn {
          position: relative; overflow: hidden; touch-action: none;
          padding: 12px; border: none; background: ${T.pill}; color: ${T.inkSoft};
          border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 600;
          text-align: center; width: 100%; -webkit-user-select: none; user-select: none;
        }
        .holdBtn:hover { color: ${T.ink}; }
        .holdFill {
          position: absolute; inset: 0; background: ${T.accent}; opacity: 0.85;
          transform: scaleX(0); transform-origin: left;
          transition-property: transform; transition-timing-function: linear;
        }
        .holdBtn.holding .holdFill { transform: scaleX(1); }
        .holdBtn.holding .holdLabel { color: #ffffff; }
        .holdLabel { position: relative; }
      `}</style>
    </button>
  )
}

function clampNum(v, lo, hi) {
  if (isNaN(v)) return lo
  return Math.min(hi, Math.max(lo, v))
}
