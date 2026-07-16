import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import {
  IconDraw, IconErase, IconSelect, IconLayers, IconEye, IconEyeOff, IconLock,
  IconUnlock, IconImage, IconEdit, IconCheck, IconHome, IconMenu, IconUndo, IconRedo,
} from './icons'
import { getTechnique, DEFAULT_TECHNIQUE, TECHNIQUES } from './techniques'
import { fitShape, shapeOutline, adjustShape, shapeLabel } from './lib/quickshape'
import PhotoImport from './PhotoImport'
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
// Morii palette (from the Figma "Beads-UI" design). Two themes share one token
// vocabulary; `T` is a Proxy that resolves each token from the active theme, so
// every `${T.x}` in the styled-jsx re-themes for free when `themeState.active`
// flips. Non-colour tokens (radius, fonts, accent, the always-light artboard) are
// identical across themes. `row*` tokens keep the layer rows legible either way.
const FONT = "'Morii Lipi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const SHARED = {
  accent: '#4a875d', // Morii Green — primary action + active outline (both themes)
  artboard: '#dbdad5', // the canvas / light bars — always a warm light grey
  darkInk: '#333332', // ink that must stay dark (on the light bars/artboard)
  radius: 8,
  mono: FONT,
  serif: FONT,
}
const DARK = {
  ...SHARED,
  bg: '#333332', panel: '#666664', panelSolid: '#414140',
  ink: '#f7f7f5', inkSoft: '#a8a7a2', light: '#757570', line: '#575757',
  active: '#dbdad5', activeInk: '#333332', pill: '#575757', thumb: '#a8a7a2', track: '#333332',
  rowBg: '#666664', rowActive: '#dbdad5', rowInk: '#dbdad5', rowActiveInk: '#333332',
  hoverPill: '#757570', overlay: 'rgba(255,255,255,0.1)',
}
const LIGHT = {
  ...SHARED,
  bg: '#e9e7e1', panel: '#f6f5f1', panelSolid: '#efeee9',
  ink: '#333332', inkSoft: '#6f6e69', light: '#9a9992', line: '#d9d7d0',
  active: '#333332', activeInk: '#f7f7f5', pill: '#e6e4dd', thumb: '#8f8e88', track: '#d4d2cb',
  rowBg: '#e2e0d9', rowActive: '#ffffff', rowInk: '#5a5852', rowActiveInk: '#333332',
  hoverPill: '#d8d6cf', overlay: 'rgba(0,0,0,0.06)',
}
const THEMES = { dark: DARK, light: LIGHT }
const themeState = { active: 'dark' } // flipped by the theme toggle (below)
const T = new Proxy({}, { get: (_t, k) => THEMES[themeState.active][k] })

// A soft, synthesised "bead click" — a warm woody tok that snaps as each bead
// lands, for a tactile feel (iPad can't vibrate from the web, so this is the
// satisfying cue). No audio files: a short lowpassed triangle pluck with a
// randomised pitch so a run of beads sounds organic, not machine-gun. Rate-capped
// so a fast drag becomes a pleasant tok-tok-tok, not a buzz.
let _actx = null
let _noise = null
let _lastTick = 0
function playBeadTick(kind = 'place') {
  const now = performance.now()
  if (now - _lastTick < 26) return
  _lastTick = now
  try {
    if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)()
    if (_actx.state === 'suspended') _actx.resume()
    const ctx = _actx
    const t = ctx.currentTime
    // Wood-block synthesis: a bandpassed noise "knock" (the woody attack) + a
    // short lowpassed sine "body" for warmth, both with a fast knock decay.
    if (!_noise) {
      const len = Math.floor(ctx.sampleRate * 0.05)
      _noise = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = _noise.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    }
    const peak = kind === 'erase' ? 0.05 : 0.07
    // knock (noise through a resonant bandpass)
    const src = ctx.createBufferSource()
    src.buffer = _noise
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = (kind === 'erase' ? 620 : 980) + Math.random() * 260
    bp.Q.value = 7
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.0001, t)
    ng.gain.exponentialRampToValueAtTime(peak, t + 0.002)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)
    src.connect(bp).connect(ng).connect(ctx.destination)
    src.start(t)
    src.stop(t + 0.07)
    // body (low sine thump)
    const bf = (kind === 'erase' ? 150 : 210) + Math.random() * 40
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(bf * 1.5, t)
    osc.frequency.exponentialRampToValueAtTime(bf, t + 0.04)
    const og = ctx.createGain()
    og.gain.setValueAtTime(0.0001, t)
    og.gain.exponentialRampToValueAtTime(peak * 0.7, t + 0.004)
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
    osc.connect(og).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.08)
  } catch (e) {}
}

const STORAGE_KEY = 'beadwork3_palettes_v1'
const DESIGN_KEY = 'beadwork3_design_v1'
const DESIGNS_KEY = 'beadwork3_designs_v1' // named design slots
const RECENT_KEY = 'beadwork3_recent_v1' // recently used colours (survives a crash/reload)
// build stamp (injected by Vite; 'dev' when running the dev server)
const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev'

// Default preset: the Morii palette from the Figma colour rail — earthy greens
// through to warm neutrals (rain, mint, parrot, green, alternate, handloom,
// harda, ecru). (Bead colours may be rich; only the UI chrome stays muted,
// spec §7.5.)
const DEFAULT_PALETTE = ['#A3B09A', '#A8C97F', '#7BA23F', '#4A875D', '#006E54', '#E0D7C2', '#D8C49A', '#C0BDB6']

const key = (c, r) => `${c},${r}`
const newPaletteId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

// The only two bead sizes. Both 4:5 (width:height); stated size = bead width.
// 1.5mm × PACK_X (1.296) = 1.944mm pitch → exactly 36 beads across 7cm,
// matching the user's real woven swatch (corrected 2026-06-10).
const BEAD_SIZES = [
  { label: '1.5 mm', w: 1.5, h: 1.875 },
  { label: '3 mm', w: 3, h: 3.75 },
]

const HISTORY_MAX = 50 // undo steps (one stroke / fill / selection op = one step)

// New artworks auto-name from Indian trees (Morii = forest). Pick the next unused
// name; once the list is exhausted, append a number ("Neem 2"…). Rename anytime.
const TREE_NAMES = [
  'Neem', 'Peepal', 'Banyan', 'Ashoka', 'Gulmohar', 'Amaltas', 'Sheesham', 'Sal',
  'Teak', 'Mahua', 'Kadamba', 'Palash', 'Semal', 'Arjun', 'Bel', 'Jamun', 'Imli',
  'Champa', 'Chinar', 'Deodar', 'Sandalwood', 'Mango', 'Banana', 'Tamarind', 'Khejri', 'Kachnar',
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
// inverse of screenToDoc: document point → on-screen (canvas-relative) pixel
function docToScreen(dx, dy, v) {
  const c = Math.cos(v.rot || 0)
  const s = Math.sin(v.rot || 0)
  return { x: v.scale * (c * dx - s * dy) + v.tx, y: v.scale * (s * dx + c * dy) + v.ty }
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

// Bead-texture overlay (the woven look at mid-zoom, when there are too many beads
// to fill as ovals without stalling). We bake ONE tiny tile of the lattice motif
// and lay it over the fast colour rects, so the bead shape reads at O(1) instead
// of O(beads). TILE_BEAD_PX = source detail per bead in the tile; must cover the
// biggest on-screen bead the rect path ever shows (≈6px) at DPR 2 → 12px. Below
// TEX_MIN_PX a bead is too small on screen to show any shape, so we skip the
// overlay and just show solid colour (correct for a far-zoom overview).
const TILE_BEAD_PX = 12
// Show the woven-bead (jali) texture even when zoomed right out — including a full
// 100×100 cm canvas where each bead is only ~1.5-2px on screen. The overlay is one
// O(1) pattern fill, so keeping it on at far zoom costs nothing; below this a bead
// is truly sub-pixel and the tile would just alias to noise.
const TEX_MIN_PX = 1

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
  const [unit, setUnit] = useState('cm') // canvas-size display unit: mm | cm | in

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
  const [layerDrag, setLayerDrag] = useState(null) // { id, dy } while dragging a layer/group row
  // Layer GROUPS (Procreate folders, one level deep). The stack stays a FLAT
  // array — a group is `{id, name, visible, locked, collapsed}` in `groups`,
  // and member layers carry its id as `layer.groupId`. Members are always
  // CONTIGUOUS in z-order (every op below preserves that), so a group renders,
  // hides, locks, reorders and flattens as one block. The bg layer never joins.
  const [groups, setGroups] = useState([])
  const groupsRef = useRef(groups)
  const setGroupsBoth = (gs) => { groupsRef.current = gs; setGroups(gs) }
  const groupById = (id, gs) => (id ? (gs || groupsRef.current).find((g) => g.id === id) || null : null)
  // effective flags: a layer counts as shown/locked through its group too
  const layerShown = (l, gs) => l.visible && groupById(l.groupId, gs)?.visible !== false
  const layerHeld = (l, gs) => l.locked || groupById(l.groupId, gs)?.locked === true
  const [showMenu, setShowMenu] = useState(false) // ☰ dropdown menu
  const [showDetails, setShowDetails] = useState(false) // Artwork Details modal
  const [showPhotoImport, setShowPhotoImport] = useState(false) // Import photo as beads modal
  const [showColor, setShowColor] = useState(false) // colour picker panel
  // light / dark theme (persisted). Mutating themeState.active re-themes every
  // ${T.x} in the styled-jsx; the state is only here to trigger the re-render.
  const [theme, setThemeName] = useState(() => {
    let t = 'dark'
    try { t = localStorage.getItem('beadwork3_theme') || 'dark' } catch (e) {}
    themeState.active = t
    return t
  })
  const setTheme = (t) => {
    themeState.active = t
    setThemeName(t)
    try { localStorage.setItem('beadwork3_theme', t) } catch (e) {}
  }
  // bead-click sound (persisted). A ref mirrors it so the paint hot-path can read
  // the current value without re-creating the paint callback.
  const [soundOn, setSoundOnState] = useState(() => {
    try { return localStorage.getItem('beadwork3_sound') !== 'off' } catch (e) { return true }
  })
  const soundOnRef = useRef(soundOn)
  soundOnRef.current = soundOn
  const setSoundOn = (on) => {
    setSoundOnState(on)
    try { localStorage.setItem('beadwork3_sound', on ? 'on' : 'off') } catch (e) {}
  }
  const [editName, setEditName] = useState(false) // artwork name in edit mode
  const [exportPick, setExportPick] = useState(null) // Set of artwork ids to export, or null (picker closed)
  const [editPaletteId, setEditPaletteId] = useState(null) // palette being edited (swatch removal)
  const [tool, setTool] = useState('draw') // draw | erase | select
  const [exporting, setExporting] = useState(false) // "Save PNG" in progress → spinner
  const [color, setColor] = useState('#7BA23F') // starts on the palette's parrot green
  const [pack, setPack] = useState(0) // 0 = true size (one bead = one grid cell, no spill) … 1 = max packed
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
  // crash-hunt timers: how long the last frame took, and the worst ever seen.
  // A frame that takes multiple SECONDS is a watchdog HANG (iPad Safari kills a
  // page whose main thread is stuck too long) — looks like an OOM crash but is
  // really a freeze, and a memory counter can't see it. So we time every frame.
  const lastRenderMsRef = useRef(0)
  const peakRenderMsRef = useRef(0)
  const recordCrumbRef = useRef(null) // stable accessor to the latest recordCrumb
  // worst main-thread task of the whole session (via PerformanceObserver) — catches
  // EVERY freeze, not just canvas rendering: React re-renders, undo snapshots, and
  // the auto-save serialisation all show up here where the render timer is blind.
  const worstTaskRef = useRef(0)
  const taskCountRef = useRef(0)
  const commitCountRef = useRef(0) // committed strokes this session (session-length gauge)
  // Safari has NO longtask API, so worstTaskRef reads 0 on iPad. This rAF-gap
  // meter works on EVERY engine: the browser calls the frame callback ~every
  // 16ms, so a big gap between calls = the main thread was frozen that long.
  // This is the freeze number that will actually mean something on the iPad.
  const worstGapRef = useRef(0)
  const requestRedraw = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const canvas = canvasRef.current
      if (canvas && drawRef.current) {
        const t0 = performance.now()
        drawRef.current(canvas.getContext('2d'))
        const ms = performance.now() - t0
        lastRenderMsRef.current = ms
        if (ms > peakRenderMsRef.current) peakRenderMsRef.current = ms
      }
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
  const currentDoc = () => ({ layers: layersRef.current, activeId: activeIdRef.current, groups: groupsRef.current })
  const docBeads = (doc) => {
    let t = 0
    for (const l of doc.layers) t += l.beads.size
    return t
  }

  // Restore a document snapshot into both the live refs and React state.
  const applyDoc = (doc) => {
    layersRef.current = doc.layers
    setGroupsBoth(doc.groups || [])
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
    if (cells > 10000) return { steps: 8, budget: 70000 }
    if (cells > 5000) return { steps: 20, budget: 150000 }
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

  // Next "Layer N" name: one past the highest existing number (ignores the
  // Background/image layers so counting them never skips or duplicates).
  const nextLayerName = () => {
    const nums = layersRef.current
      .map((l) => /^Layer (\d+)$/.exec(l.name)?.[1])
      .filter(Boolean)
      .map(Number)
    return `Layer ${(nums.length ? Math.max(...nums) : 0) + 1}`
  }
  const addLayer = () => {
    pushHistory(currentDoc())
    const l = makeLayer(nextLayerName())
    const idx = layersRef.current.findIndex((x) => x.id === activeIdRef.current)
    l.groupId = layersRef.current[idx]?.groupId // inside the active layer's group (contiguous: goes right above it)
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
    copy.groupId = src.groupId // a copy stays in its source's group (adjacent → contiguous)
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
    dropEmptyGroups(nl)
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
    dropEmptyGroups(nl) // the upper layer may have been its group's last member
    makeActive(lowerMerged)
    setSelection(new Set())
    setPlacing(null)
  }

  // ---- panel display rows + drag-reorder -----------------------------------
  // The panel shows the stack top-first as ROWS: a group contributes a header
  // row above its topmost member; a collapsed group hides its member rows (the
  // header carries `count` so drag index math still accounts for them).
  const displayRows = () => {
    const arr = layersRef.current // bottom→top
    const rows = []
    for (let i = arr.length - 1; i >= 0; i--) {
      const l = arr[i]
      if (l.groupId) {
        const g = groupById(l.groupId)
        if (arr[i + 1]?.groupId !== l.groupId) {
          let n = 0
          for (let j = i; j >= 0 && arr[j].groupId === l.groupId; j--) n++
          rows.push({ kind: 'group', g, count: n })
        }
        if (!g?.collapsed) rows.push({ kind: 'layer', l })
      } else rows.push({ kind: 'layer', l })
    }
    return rows
  }
  // Layers represented visually BELOW slot s of `rows` = the array index to
  // splice at (the stack array runs bottom→top). Collapsed headers stand in
  // for their hidden member rows.
  const layersBelowSlot = (rows, s) => {
    let n = 0
    for (let i = s; i < rows.length; i++) {
      const r = rows[i]
      n += r.kind === 'layer' ? 1 : r.g?.collapsed ? r.count : 0
    }
    return n
  }
  // Is slot s inside a group's span (between its header/members)? → that group's id.
  const slotGroup = (rows, s) => {
    const above = rows[s - 1]
    const below = rows[s]
    if (above?.kind === 'group' && !above.g?.collapsed && below?.kind === 'layer' && below.l.groupId === above.g?.id)
      return above.g.id
    if (above?.kind === 'layer' && above.l.groupId && below?.kind === 'layer' && below.l.groupId === above.l.groupId)
      return above.l.groupId
    return null
  }
  const clampAboveBg = (rows, s) => {
    const bgRow = rows.findIndex((r) => r.kind === 'layer' && r.l.type === 'bg')
    return bgRow >= 0 ? Math.min(s, bgRow) : s
  }

  // Drop a dragged LAYER row `steps` display-rows down (negative = up): the
  // landing slot sets both z-order AND group membership — dropping between a
  // group's rows joins that group, dropping outside leaves it (Procreate's
  // drag-into-folder).
  const dropLayerAt = (id, steps) => {
    const arr = layersRef.current
    const idx = arr.findIndex((l) => l.id === id)
    const me = arr[idx]
    if (!me || me.type === 'bg') return
    const all = displayRows()
    const from = all.findIndex((r) => r.kind === 'layer' && r.l.id === id)
    if (from < 0) return // hidden inside a collapsed group — no row to drag
    const rows = all.filter((r) => !(r.kind === 'layer' && r.l.id === id))
    const s = clampAboveBg(rows, Math.max(0, Math.min(rows.length, from + steps)))
    const gid = slotGroup(rows, s) || undefined
    const at = layersBelowSlot(rows, s)
    if (at === idx && gid === me.groupId) return
    pushHistory(currentDoc())
    const nl = arr.filter((l) => l.id !== id)
    nl.splice(at, 0, gid === me.groupId ? me : { ...me, groupId: gid })
    layersRef.current = nl
    setLayers(nl)
    dropEmptyGroups(nl)
    requestRedraw()
  }

  // Drop a dragged GROUP header: the whole member block moves as ONE unit.
  // Groups don't nest, so a slot inside another group snaps upward out of it.
  const dropGroupAt = (gid, steps) => {
    const arr = layersRef.current
    const all = displayRows()
    const from = all.findIndex((r) => r.kind === 'group' && r.g?.id === gid)
    if (from < 0) return
    const rows = all.filter((r) => !(r.kind === 'group' && r.g?.id === gid) && !(r.kind === 'layer' && r.l.groupId === gid))
    let s = Math.max(0, Math.min(rows.length, from + steps))
    while (s > 0 && slotGroup(rows, s)) s--
    s = clampAboveBg(rows, s)
    const at = layersBelowSlot(rows, s)
    const block = arr.filter((l) => l.groupId === gid)
    const firstIdx = arr.findIndex((l) => l.groupId === gid)
    if (!block.length || at === firstIdx) return
    pushHistory(currentDoc())
    const nl = arr.filter((l) => l.groupId !== gid)
    nl.splice(at, 0, ...block)
    layersRef.current = nl
    setLayers(nl)
    requestRedraw()
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

  // ---- group operations ------------------------------------------------------
  // Same undo policy as layers: structural changes (group/ungroup/flatten) are
  // one undo step; metadata (hide/lock/rename/collapse) is not undoable.
  const dropEmptyGroups = (nl) => {
    const used = new Set(nl.map((l) => l.groupId).filter(Boolean))
    if (groupsRef.current.some((g) => !used.has(g.id)))
      setGroupsBoth(groupsRef.current.filter((g) => used.has(g.id)))
  }
  const nextGroupName = () => {
    const nums = groupsRef.current.map((g) => /^Group (\d+)$/.exec(g.name)?.[1]).filter(Boolean).map(Number)
    return `Group ${(nums.length ? Math.max(...nums) : 0) + 1}`
  }
  // "Group" on an ungrouped active layer wraps it + the layer directly below
  // into a new group (or joins the group directly below — stays contiguous
  // because the active layer sits right above that group's top member).
  // On a grouped active layer the same button UNGROUPS (dissolves the wrapper;
  // the member layers stay where they are).
  const groupActiveLayer = () => {
    const arr = layersRef.current
    const idx = arr.findIndex((l) => l.id === activeIdRef.current)
    const me = arr[idx]
    if (!me || me.type === 'bg') return
    if (me.groupId) {
      pushHistory(currentDoc())
      const gid = me.groupId
      const nl = arr.map((l) => (l.groupId === gid ? { ...l, groupId: undefined } : l))
      layersRef.current = nl
      setLayers(nl)
      setGroupsBoth(groupsRef.current.filter((g) => g.id !== gid))
      return
    }
    const below = arr[idx - 1]
    if (!below || below.type === 'bg') { showToast('No layer below to group with'); return }
    pushHistory(currentDoc())
    let gid = below.groupId
    if (!gid) {
      const g = { id: uid(), name: nextGroupName(), visible: true, locked: false, collapsed: false }
      setGroupsBoth([...groupsRef.current, g])
      gid = g.id
    }
    const nl = arr.map((l) => (l.id === me.id || (l.id === below.id && !below.groupId) ? { ...l, groupId: gid } : l))
    layersRef.current = nl
    setLayers(nl)
  }
  const renameGroup = (id, name) =>
    setGroupsBoth(groupsRef.current.map((g) => (g.id === id ? { ...g, name } : g)))
  const toggleGroupCollapsed = (id) =>
    setGroupsBoth(groupsRef.current.map((g) => (g.id === id ? { ...g, collapsed: !g.collapsed } : g)))
  const toggleGroupVisible = (id) => {
    setGroupsBoth(groupsRef.current.map((g) => (g.id === id ? { ...g, visible: !g.visible } : g)))
    requestRedraw()
  }
  const toggleGroupLock = (id) =>
    setGroupsBoth(groupsRef.current.map((g) => (g.id === id ? { ...g, locked: !g.locked } : g)))
  // Flatten: merge the group's bead members (top-wins) into ONE layer named
  // after the group, sitting where the group's bottom member was. Image
  // members can't merge into beads, so they block the flatten.
  const flattenGroup = (id) => {
    const arr = layersRef.current
    const members = arr.filter((l) => l.groupId === id)
    if (!members.length) return
    if (members.some((l) => l.type !== 'bead')) { showToast('Move image layers out to flatten this group'); return }
    pushHistory(currentDoc())
    const merged = new Map()
    for (const l of members) for (const [k, v] of l.beads) merged.set(k, v) // bottom→top: upper writes win
    const g = groupById(id)
    const flat = makeLayer(g?.name || 'Group', merged)
    const at = arr.findIndex((l) => l.groupId === id) // bottom member's slot
    const nl = arr.filter((l) => l.groupId !== id)
    nl.splice(at, 0, flat)
    layersRef.current = nl
    setLayers(nl)
    setGroupsBoth(groupsRef.current.filter((x) => x.id !== id))
    makeActive(flat)
    setSelection(new Set())
    setPlacing(null)
    requestRedraw()
  }

  const activeLayer = layers.find((l) => l.id === activeId) || null
  // A bead layer can be drawn on only when it's visible, unlocked (itself AND
  // through its group), and not an image/background layer.
  const canEdit = !!activeLayer && layerShown(activeLayer, groups) && !layerHeld(activeLayer, groups) &&
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
    if (groupById(l.groupId, groups)?.visible === false) return 'Group is hidden — show it to draw'
    if (groupById(l.groupId, groups)?.locked) return 'Group is locked — unlock it to draw'
    return 'Can’t draw on this layer'
  }, [activeLayer, groups])
  const blockedRef = useRef(blockedReason)
  blockedRef.current = blockedReason

  // Per-cell tilt (radians) — defined by the technique (3-bead woven tilt /
  // 1-bead upright). See each module's tiltFor.
  const tiltFor = useCallback(
    (col, row) => tech.tiltFor(col, row),
    [tech]
  )

  // ---- bead-texture tile (woven look at mid-zoom) ----------------------------
  // Build ONE small canvas holding the full lattice motif — the pattern repeats
  // every 2 columns × 4 rows (that spans both apex/base rows AND both tilt
  // angles), so a 2·Px × 4·Py tile captures everything. The tile is filled with
  // the thread/gap colour and every bead silhouette is punched OUT of it
  // (destination-out → transparent). Laid over the fast colour rects with a
  // single fill, it carves the solid colour into bead shapes for O(1) cost.
  // Cached in texRef; rebuilt only when bead size / spacing / technique / gap
  // colour change — never per frame. We draw a padded range of cells (−2..3 cols,
  // −2..5 rows) and let the canvas clip to one period; because the lattice is
  // exactly periodic over the tile, the clipped window tiles seamlessly. tiltFor
  // and beadExists aren't periodic-safe for negative indices, so existence/tilt
  // come from the canonical cell (col mod 2, row mod 4) while the DRAW position
  // uses the true col/row (with the correct odd-row offset sign).
  const texRef = useRef({ key: '', canvas: null, sx: 1, sy: 1 })
  const beadTexture = useCallback((gapColor) => {
    const tileWdoc = 2 * geo.Px
    const tileHdoc = 4 * geo.Py
    const res = TILE_BEAD_PX / Bw // offscreen px per doc unit
    const pw = Math.max(1, Math.round(tileWdoc * res))
    const ph = Math.max(1, Math.round(tileHdoc * res))
    const drawScale = 1 + pack * (PACKED_DRAW - 1)
    const dw = Bw * drawScale
    const dh = Bh * drawScale
    const key = [tech.id, pw, ph, dw.toFixed(2), dh.toFixed(2), gapColor].join('|')
    if (texRef.current.key === key) return texRef.current
    const cv = document.createElement('canvas')
    cv.width = pw
    cv.height = ph
    const octx = cv.getContext('2d')
    // draw in doc-local units (pw px maps to tileWdoc doc units, exactly, so
    // rounding pw/ph can't drift the pattern across many repeats)
    octx.setTransform(pw / tileWdoc, 0, 0, ph / tileHdoc, 0, 0)
    octx.fillStyle = gapColor
    octx.fillRect(0, 0, tileWdoc, tileHdoc)
    const holes = new Path2D()
    for (let row = -2; row <= 5; row++) {
      const canonRow = ((row % 4) + 4) % 4
      const odd = ((row % 2) + 2) % 2 // true odd-row parity (offset sign)
      for (let col = -2; col <= 3; col++) {
        const canonCol = ((col % 2) + 2) % 2
        if (!tech.beadExists(canonCol, canonRow)) continue
        // rowOffset is the technique's own odd-row shift: Px/2 on the staggered
        // 3-bead weave, 0 on the aligned 1-bead grid. Hardcoding Px/2 here put
        // the 1-bead tile's holes half a bead off its real lattice → colour
        // showed through the WRONG holes as half-painted beads.
        const cx = col * geo.Px + odd * geo.rowOffset
        const cy = row * geo.Py
        tech.beadOutline(holes, cx, cy, dw, dh, tech.tiltFor(canonCol, canonRow))
      }
    }
    octx.globalCompositeOperation = 'destination-out'
    octx.fillStyle = '#000'
    octx.fill(holes)
    octx.globalCompositeOperation = 'source-over'
    texRef.current = { key, canvas: cv, sx: tileWdoc / pw, sy: tileHdoc / ph }
    return texRef.current
  }, [geo, Bw, Bh, pack, tech])

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
  const imgInputRef = useRef(null)
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

  // Layer-row gesture: quick tap = select; hold-and-drag = reorder the stack;
  // long-press (still) = add a reference image onto that layer. Row height (px)
  // maps a drag distance to how many stack positions to move.
  const LAYER_ROW_H = 72
  // Layer-row gesture: quick tap = select; hold-and-drag = reorder the stack.
  // (Adding an image is the photo button in the Layers header — easier than a hold.)
  // Shared hold-drag for panel rows: tap = onTap, drag = onDrop(steps) where
  // steps counts DISPLAY rows moved (down positive).
  const rowDrag = (e, dragId, onTap, onDrop) => {
    if (e.button != null && e.button !== 0) return
    const startY = e.clientY
    let moved = false
    const move = (ev) => {
      const dy = ev.clientY - startY
      if (!moved && Math.abs(dy) > 6) moved = true
      if (moved) setLayerDrag({ id: dragId, dy })
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      if (moved) {
        const steps = Math.round((ev.clientY - startY) / LAYER_ROW_H)
        if (steps) onDrop(steps)
        setLayerDrag(null)
      } else onTap()
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }
  const onLayerRowDown = (e, l) =>
    rowDrag(e, l.id, () => switchLayer(l.id), (steps) => dropLayerAt(l.id, steps))
  const onGroupRowDown = (e, g) =>
    rowDrag(e, `g:${g.id}`, () => toggleGroupCollapsed(g.id), (steps) => dropGroupAt(g.id, steps))

  // ---- printed-chart settings ----
  const [printBeadMm, setPrintBeadMm] = useState(8) // fixed bead size on paper (mm)
  const beadRatio = beadMM.h / beadMM.w

  // ---- palettes ----
  const [palette, setPalette] = useState(DEFAULT_PALETTE) // legacy; kept for save/load compat
  const [savedPalettes, setSavedPalettes] = useState([])
  const [activePaletteId, setActivePaletteId] = useState(null)

  // Load palettes (assigning ids to any legacy entries). Seed one default palette
  // from the Morii colours on first run so the rail is never empty.
  useEffect(() => {
    let list = []
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) list = JSON.parse(raw) || [] } catch (e) {}
    list = list.map((p) => (p.id ? p : { ...p, id: newPaletteId() }))
    if (list.length === 0) list = [{ id: newPaletteId(), name: 'Morii', colors: DEFAULT_PALETTE }]
    setSavedPalettes(list)
    setActivePaletteId(list[0].id)
  }, [])

  const persistPalettes = (list, active) => {
    setSavedPalettes(list)
    if (active !== undefined) setActivePaletteId(active)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch (e) {}
  }
  // Named colour palettes: newest on top, max 8 swatches each. The right rail
  // shows the ACTIVE palette; picking one in the colour picker makes it active,
  // and the rail's + adds the current colour to it.
  const addPalette = () => {
    const p = { id: newPaletteId(), name: `Palette ${savedPalettes.length + 1}`, colors: color ? [color] : [] }
    persistPalettes([p, ...savedPalettes], p.id) // new palette on top + active
  }
  const renamePalette = (id, name) =>
    persistPalettes(savedPalettes.map((p) => (p.id === id ? { ...p, name } : p)))
  const deletePalette = (id) => {
    const next = savedPalettes.filter((p) => p.id !== id)
    persistPalettes(next, id === activePaletteId ? (next[0]?.id ?? null) : undefined)
  }
  const addToPalette = (id) =>
    persistPalettes(savedPalettes.map((p) =>
      (p.id === id && p.colors.length < 8 && !p.colors.includes(color)) ? { ...p, colors: [...p.colors, color] } : p))
  const removeFromPalette = (id, j) =>
    persistPalettes(savedPalettes.map((p) => (p.id === id ? { ...p, colors: p.colors.filter((_, x) => x !== j) } : p)))
  const activePalette =
    savedPalettes.find((p) => p.id === activePaletteId) || savedPalettes[0] || { id: null, name: '', colors: [] }

  // ---- universal bead library (device-local, IndexedDB `meta`) -------------
  // The catalog of real bead colours the studio stocks — shared by ALL
  // artworks, unlike palettes which are made per artwork. Curated from the
  // gallery ("Bead library"); the editor's colour panel offers it as a picker
  // strip, and any custom colour can be added to it so the catalog grows from
  // real use. Entries: { id, color, name } (name optional — hex shown if empty).
  const [beadLib, setBeadLib] = useState([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [libDraft, setLibDraft] = useState({ color: '#7BA23F', name: '' })
  useEffect(() => {
    getMeta('beadLibrary')
      .then((v) => {
        if (v && v.length) setBeadLib(v)
        else {
          const seed = DEFAULT_PALETTE.map((c) => ({ id: newPaletteId(), color: c, name: '' }))
          setBeadLib(seed)
          return setMeta('beadLibrary', seed)
        }
      })
      .catch(() => {}) // no IndexedDB (private mode): library just stays empty
  }, [])
  const persistLibrary = (list) => {
    setBeadLib(list)
    setMeta('beadLibrary', list).catch(() => {})
  }
  const inLibrary = (c) => beadLib.some((b) => b.color.toLowerCase() === c.toLowerCase())
  // editor affordance: current colour → library (guarded so double-taps can't dupe)
  const addCurrentToLibrary = () => { if (!inLibrary(color)) persistLibrary([...beadLib, { id: newPaletteId(), color, name: '' }]) }
  // library screen add: duplicates allowed on purpose (same hex, different bead finish)
  const addLibDraft = () => {
    persistLibrary([...beadLib, { id: newPaletteId(), color: libDraft.color, name: libDraft.name.trim() }])
    setLibDraft((d) => ({ ...d, name: '' }))
  }
  const updateLibColor = (id, patch) => persistLibrary(beadLib.map((b) => (b.id === id ? { ...b, ...patch } : b)))
  const removeLibColor = (id) => persistLibrary(beadLib.filter((b) => b.id !== id))

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
      if (soundOnRef.current) playBeadTick('place')
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
          if (fastEraseRef.current) strokeErasedRef.current.add(k)
        } else {
          if (map.get(k) === color) continue
          if (alpha && !map.has(k)) continue // only recolour existing beads
          if (map === strokeBase.current) { map = new Map(map); beadsRef.current = map }
          const existed = map.has(k)
          map.set(k, color); changed = true
          if (fastStrokeRef.current) strokePaintedRef.current.add(k)
          if (!existed && spawnPopRef.current) spawnPopRef.current(col, row, color) // pop only truly new beads
        }
      }
      if (changed) {
        patternBaseRef.current = null // any normal edit ends pattern layout-swapping
        requestRedraw() // silent: strokes repaint via rAF, no React render per event
        if (soundOnRef.current) playBeadTick(mode === 'erase' ? 'erase' : 'place')
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

  // ---- mirror preview: show a flipped copy on each of the 4 sides; tap one to
  // place it. Each ghost is the selection mirrored on that side (clamped to the
  // in-bounds, existing cells). `mirrorGhosts` = [{ dir, side, cells, cx, cy }].
  const [mirrorGhosts, setMirrorGhosts] = useState(null)
  const openMirror = () => {
    if (!selection.size || !canEdit) return
    const cells = []
    for (const k of selection) {
      const fill = beadsRef.current.get(k)
      if (!fill) continue
      const [col, row] = k.split(',').map(Number)
      cells.push({ col, row, fill })
    }
    if (!cells.length) return
    const variants = []
    for (const [dir, side] of [['h', -1], ['h', 1], ['v', -1], ['v', 1]]) {
      const mc = tech.mirror(cells, dir, side).filter(
        ({ col, row }) => col >= 0 && col < cols && row >= 0 && row < rows && tech.beadExists(col, row)
      )
      if (!mc.length) continue
      // centre (doc px) of this ghost, for positioning its tap button
      let sx = 0, sy = 0
      for (const { col, row } of mc) { const c = geo.centerFor(col, row); sx += c.cx; sy += c.cy }
      variants.push({ dir, side, cells: mc, cx: sx / mc.length, cy: sy / mc.length })
    }
    if (variants.length) setMirrorGhosts(variants)
  }
  const applyMirror = (variant) => {
    const nextSel = new Set()
    commit((prev) => {
      const next = new Map(prev)
      for (const { col, row, fill } of variant.cells) { const k = key(col, row); next.set(k, fill); nextSel.add(k) }
      return next
    })
    setSelection(nextSel)
    setMirrorGhosts(null)
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
  const popRef = useRef(null) // transient bead-pop FX canvas (always present, DPR 1)
  const poppingRef = useRef([]) // [{ col, row, color, t0 }] beads currently popping in
  const popRafRef = useRef(0)
  const popDrawRef = useRef(null) // latest drawPops (assigned every render)
  const spawnPopRef = useRef(null) // latest spawnPop (so the paint hot-path can call it)
  const wrapRef = useRef(null)
  // Fast draw-stroke rendering: instead of re-rendering the whole (up to 10k-bead)
  // grid on every frame of a stroke — the allocation churn that crashed iPad
  // Safari — we snapshot the scene into strokeCacheRef when a draw stroke starts
  // and, each frame, blit that + stamp only the beads painted so far on top.
  const strokeCacheRef = useRef(null)   // offscreen canvas: scene at stroke start
  const strokePaintedRef = useRef(null) // Set of "col,row" keys painted this stroke
  const fastStrokeRef = useRef(false)   // true while a freehand DRAW stroke is active
  // ERASE fast path (mirror of the draw one): erasing can't just stamp on top —
  // it must REVEAL what's under the erased bead. So at stroke start we also render
  // an "erase floor" = the scene with the active layer hidden (bg + other layers +
  // empty outlines). Each frame we blit the full snapshot, then reveal the floor
  // ONLY through the erased cells. Without this, erasing on a dense design
  // full-repaints every bead every frame → the sustained freeze that kills iPad.
  const eraseFloorRef = useRef(null)        // offscreen canvas: scene with active layer hidden
  const strokeErasedRef = useRef(null)      // Set of "col,row" keys erased this stroke
  const fastEraseRef = useRef(false)        // true while a fast ERASE stroke is active
  const hideActiveForFloorRef = useRef(false) // drawScene skips the active layer when true
  // Stroke COMMIT optimisation: after a fast stroke the canvas already shows the
  // final result, so the full repaint that setBeads triggers is redundant — and on
  // a big design that repaint is a 0.5–1.7s freeze (per stroke!) that stacks up and
  // trips the iPad watchdog. When the on-screen pixels already match a true render
  // (fast path, texture overlay off), we skip that repaint and just refresh the
  // zoom cache. lastTexActiveRef records whether the last full render used the
  // texture overlay (depends only on zoom, unchanged during a stroke).
  const skipCommitRenderRef = useRef(false)
  const lastTexActiveRef = useRef(false)
  // Fast zoom/pan: cache the last full render + the view it was drawn at, then
  // during an active gesture just re-blit that bitmap under the new view instead
  // of re-running drawScene (see below).
  const sceneCacheRef = useRef(null)    // offscreen canvas: last full render (device px)
  const cacheViewRef = useRef(null)     // the view that cache was rendered at
  const interactingRef = useRef(false)  // true during a live zoom/pan/pinch gesture
  const interactEndRef = useRef(0)      // settle timer id
  const beginInteractRef = useRef(null) // latest beginInteract (for the wheel listener)
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
  // On a big lattice, drop to 1.5× so the (viewport-sized) canvas backing store
  // is ~45% smaller — real relief on iPad, where beads that size look the same.
  const DPR = Math.min(rawDPR, cols * rows > 8000 ? 1.5 : 2)

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

  // ── Canvas-memory probe (iPad crash hunt, 2026-07-06) ────────────────────
  // iOS Safari kills the tab when the TOTAL backing store of ALL canvases put
  // together crosses ~256–384 MB. That memory is NOT the JS heap — so
  // performance.memory (which only sees the heap) stays tiny even as the
  // canvases fill up. That's the reading that fooled us into thinking past
  // crashes weren't memory. Here we sum every canvas we hold (width×height×4
  // bytes each) and show it live, so we can watch the number climb toward the
  // ceiling right before a crash and finally SEE the cause.
  const [canvasMB, setCanvasMB] = useState(0)
  const [recovered, setRecovered] = useState(null) // last-state crumb after a crash
  const lastActionRef = useRef('boot')             // most recent meaningful action
  const lastErrRef = useRef(null)                  // last thrown error/rejection

  // Sum every canvas backing store we hold (width×height×4 bytes each).
  const measureCanvasBytes = () => {
    const b = (cv) => (cv && cv.width && cv.height ? cv.width * cv.height * 4 : 0)
    let bytes = b(canvasRef.current) + b(overlayRef.current) + b(strokeCacheRef.current)
      + b(sceneCacheRef.current) + b(texRef.current && texRef.current.canvas) + b(checkerTile)
    for (const l of (layersRef.current || [])) {   // uploaded reference photos
      const img = l && l.img
      if (img && img.width && img.height) bytes += img.width * img.height * 4
    }
    return bytes
  }

  // ── Crash breadcrumb ─────────────────────────────────────────────────────
  // A hang or an OOM tab-kill leaves NO console trace — the tab just vanishes.
  // So we stash a tiny snapshot of what the app is doing into localStorage,
  // which survives the reload. After a crash we read the LAST state before
  // death (canvas MB, bead count, worst frame time = hang detector, any error)
  // and finally SEE the cause instead of guessing a fourth time.
  const recordCrumb = (action) => {
    if (action) lastActionRef.current = action
    if (action === 'draw-commit') commitCountRef.current++
    try {
      const beads = (layersRef.current || []).reduce((n, l) => n + (l.beads ? l.beads.size : 0), 0)
      const cv = canvasRef.current
      localStorage.setItem('bw_crumb', JSON.stringify({
        t: Date.now(),
        action: lastActionRef.current,
        mb: Math.round(measureCanvasBytes() / 1048576),
        beads,
        peakFrameMs: Math.round(peakRenderMsRef.current),
        worstGapMs: Math.round(worstGapRef.current),   // worst freeze (works on Safari!)
        worstTaskMs: Math.round(worstTaskRef.current), // worst freeze of ANY kind (Chromium only)
        taskCount: taskCountRef.current,               // how many freezes >50ms
        commits: commitCountRef.current,               // committed strokes this session
        undoDepth: undoStack.current ? undoStack.current.length : 0,
        canvasPx: cv ? `${cv.width}×${cv.height}` : '?',
        dpr: DPR,
        err: lastErrRef.current,
        build: BUILD_ID,
      }))
    } catch (e) {}
  }
  recordCrumbRef.current = recordCrumb // so handlers defined elsewhere can call it

  useEffect(() => {
    // capture any thrown error / rejected promise into the next crumb
    const onErr = (e) => {
      lastErrRef.current = String((e && (e.message || e.reason)) || 'error').slice(0, 160)
      recordCrumb('error')
    }
    window.addEventListener('error', onErr)
    window.addEventListener('unhandledrejection', onErr)
    // Observe EVERY long main-thread task (>50ms) — render, React, undo, autosave.
    // This is the meter the render timer lacks: if the tab dies with a huge
    // worstTaskMs, a non-render freeze is the cause; if worstTaskMs stays small
    // yet it still crashed, it's memory (OOM), which leaves no freeze at all.
    let taskObs = null
    try {
      taskObs = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          taskCountRef.current++
          if (e.duration > worstTaskRef.current) worstTaskRef.current = e.duration
        }
      })
      taskObs.observe({ entryTypes: ['longtask'] })
    } catch (e) {}
    // cross-engine freeze meter (works on Safari): largest gap between frames
    let rafId = 0, lastFrame = performance.now()
    const frameTick = (t) => {
      const gap = t - lastFrame
      if (gap > worstGapRef.current) worstGapRef.current = gap
      lastFrame = t
      rafId = requestAnimationFrame(frameTick)
    }
    rafId = requestAnimationFrame(frameTick)
    // 'bw_alive' stays '1' while running; a clean exit sets it '0'. If it's still
    // '1' on the NEXT boot, the previous session died without a clean exit.
    const markClean = () => { try { localStorage.setItem('bw_alive', '0') } catch (e) {} }
    try {
      if (localStorage.getItem('bw_alive') === '1') {
        const c = JSON.parse(localStorage.getItem('bw_crumb') || 'null')
        if (c) setRecovered(c)
      }
      localStorage.setItem('bw_alive', '1')
    } catch (e) {}
    window.addEventListener('pagehide', markClean)
    window.addEventListener('beforeunload', markClean)

    const sample = () => {
      setCanvasMB(Math.round(measureCanvasBytes() / 1048576))
      recordCrumb()
      // Reclaim the big stroke-snapshot canvases when NOT mid-stroke: strokeCache
      // and the erase floor are only needed during a stroke, but at retina DPR
      // they're ~8MB each just sitting there between strokes — dead weight that
      // pushes iPad Safari toward its memory-kill ceiling. Freeing them (0×0)
      // when idle gives that memory back; the next stroke reallocates cheaply.
      if (!dragging.current) {
        for (const ref of [strokeCacheRef, eraseFloorRef]) {
          const cv = ref.current
          if (cv && (cv.width || cv.height)) { cv.width = 0; cv.height = 0 }
        }
      }
    }
    sample()
    const id = setInterval(sample, 400)
    return () => {
      clearInterval(id)
      window.removeEventListener('error', onErr)
      window.removeEventListener('unhandledrejection', onErr)
      window.removeEventListener('pagehide', markClean)
      window.removeEventListener('beforeunload', markClean)
      if (taskObs) taskObs.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // level of detail. Filling a detailed superellipse oval is ~45× slower than
      // a plain rect, so drawing thousands at once froze the tab for SECONDS per
      // frame (measured). Two gates keep every redraw fast:
      //   • tiny beads (< 4 px) → rects, no outlines (you can't see the shape);
      //   • too much lattice on screen (zoomed out / big canvas) → rects too, so
      //     we never fill more than a couple thousand ovals in one frame.
      // Detailed ovals are kept when zoomed in, where only a few are visible and
      // filling them is cheap — that's where the weave shape actually reads.
      const onScreenBw = Bw * scale
      const visibleCells = Math.max(0, r1 - r0) * Math.max(0, c1 - c0)
      // rects (fast) when beads are small on screen — you can't see the oval shape
      // below ~6 px anyway — or when so much lattice is visible that filling all
      // the ovals would stall a frame. Detailed ovals return when zoomed in close.
      // NOTE: this cell threshold MUST match the per-layer rect cutoff below
      // (vis > 2000). If it's higher, there's a dead zone — zoomed in enough that
      // the texture is off (≤ this many cells) but too many beads for ovals
      // (> 2000) — where beads render as flat rects with NO jali. Keep them equal.
      const heavy = onScreenBw < 6 || visibleCells > 2000
      const drawOutlines = onScreenBw > 6 && !heavy
      const simple = heavy
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
      const visLayers = layers.filter((l) => layerShown(l, groups)) // layer AND its group visible
      const aId = activeId
      const beadMapOf = (lay) => (lay.id === aId ? liveBeads : lay.beads)
      const imageShowing = visLayers.some((l) => l.type === 'image' && l.img)
      // Bead-texture overlay: on in the rects (fast) regime, when beads are big
      // enough to read a shape, and not over a reference image (which must stay
      // visible for tracing). It reinstates the woven look the ovals give when
      // zoomed in. When on, we force the colour base to rects so the tile carves
      // clean shapes, and we track the filled beads' bounding box so the overlay
      // paints only where beads are (not over empty/transparent canvas).
      const texActive = simple && onScreenBw >= TEX_MIN_PX && !imageShowing
      lastTexActiveRef.current = texActive // so stroke-commit knows if it can skip the repaint
      let bxMin = Infinity, bxMax = -Infinity, byMin = Infinity, byMax = -Infinity
      const growBounds = (col, row) => {
        if (col < bxMin) bxMin = col
        if (col > bxMax) bxMax = col
        if (row < byMin) byMin = row
        if (row > byMax) byMax = row
      }
      // Which cells end up filled in ANY visible layer (so the empty-outline pass
      // can skip them). Numeric id, not a "col,row" string, to avoid allocating a
      // key per cell in the hot loop. Populated as we draw the beads below.
      const filledCells = new Set()
      const cellId = (col, row) => row * cols + col

      // Coverage rects: fill the whole cell so a zoomed-out design reads as a
      // clean solid image, not dots. Apex/even rows are half-density on the
      // staggered weave (tech.apexWide) → double-wide; aligned grids never are.
      const apexWide = !!tech.apexWide
      const rectCell = (p, cx, cy, col, row) => {
        const wide = apexWide && row % 2 === 0
        p.rect(cx - (wide ? geo.Px : geo.Px / 2), cy - geo.Py / 2, wide ? geo.Px * 2 : geo.Px, geo.Py)
      }
      // Carve quads (texture overlay on): colour shows ONLY through the tile's
      // punched bead holes, so each bead's colour need cover just its OWN
      // silhouette. That cover must be the dw×dh rect ROTATED with the bead —
      // a 4-point quad. An axis-aligned bounding box of a ±45° bead is a much
      // bigger square whose edges still slid under NEIGHBOURING beads' punched
      // holes, leaving sliver dashes on empty beads (the reported "colour
      // bleeding"; before that, double-wide apex cell rects leaked half-beads).
      // The quad circumscribes the silhouette exactly, so its own hole is fully
      // backed and there's nothing left to show under a neighbour's hole.
      const quadAxes = new Map() // tilt → rotated half-axis vectors (few distinct tilts)
      const carveCell = (p, cx, cy, col, row) => {
        const t = tiltFor(col, row)
        let v = quadAxes.get(t)
        if (!v) {
          const c = Math.cos(t), s = Math.sin(t)
          // half-extent vectors of the bead rect in screen space
          quadAxes.set(t, (v = [(dw / 2) * c, (dw / 2) * s, -(dh / 2) * s, (dh / 2) * c]))
        }
        const [hx, hy, vx, vy] = v
        p.moveTo(cx + hx + vx, cy + hy + vy)
        p.lineTo(cx - hx + vx, cy - hy + vy)
        p.lineTo(cx - hx - vx, cy - hy - vy)
        p.lineTo(cx + hx - vx, cy + hy - vy)
        p.closePath()
      }
      const paintCell = texActive ? carveCell : rectCell

      for (const lay of visLayers) {
        if (lay.type === 'bg') continue // already painted as the base
        // erase-floor render: skip the active bead layer so its cells read as
        // empty — the image we reveal through erased cells (see drawStrokeErase).
        if (hideActiveForFloorRef.current && lay.type === 'bead' && lay.id === aId) continue
        if (lay.type === 'image') {
          if (!lay.img) continue
          ctx.save()
          ctx.beginPath(); ctx.rect(0, 0, docW, docH); ctx.clip() // never spill past canvas
          ctx.globalAlpha = lay.opacity == null ? 1 : lay.opacity
          ctx.drawImage(lay.img, lay.t.x, lay.t.y, lay.img.width * lay.t.scale, lay.img.height * lay.t.scale)
          ctx.restore()
          continue
        }
        // bead layer: draw its beads by ITERATING THE MAP (placed beads only),
        // never every grid cell. A big EMPTY canvas has ~313k cells but maybe a
        // few beads — looping all cells (building a key string each) on every
        // frame is what vanished iPad Safari on a 100×100 canvas. Batch by colour
        // into one Path2D/fill.
        const map = beadMapOf(lay)
        if (!map.size) continue
        const isActive = lay.id === aId
        const byColor = new Map() // colour -> Path2D
        const pathFor = (fill) => {
          let p = byColor.get(fill)
          if (!p) { p = new Path2D(); byColor.set(fill, p) }
          return p
        }
        if (onScreenBw < 6) {
          // beads tiny on screen → fast rects, straight from the Map (no per-bead
          // array), so even a fully-packed huge canvas stays cheap
          for (const [k, fill] of map) {
            const ci = k.indexOf(',')
            const col = +k.slice(0, ci)
            const row = +k.slice(ci + 1)
            if (col < c0 || col >= c1 || row < r0 || row >= r1) continue
            if (isActive && placing?.hide?.has(k)) continue
            filledCells.add(cellId(col, row))
            if (texActive) growBounds(col, row)
            const { cx, cy } = geo.centerFor(col, row)
            paintCell(pathFor(fill), cx, cy, col, row)
          }
        } else {
          // beads big enough to show the woven shape: collect the visible ones
          // (few, because they're big), draw detailed ovals — unless there are so
          // many that filling ovals would stall, then fall back to rects.
          const vis = []
          for (const [k, fill] of map) {
            const ci = k.indexOf(',')
            const col = +k.slice(0, ci)
            const row = +k.slice(ci + 1)
            if (col < c0 || col >= c1 || row < r0 || row >= r1) continue
            if (isActive && placing?.hide?.has(k)) continue
            filledCells.add(cellId(col, row))
            if (texActive) growBounds(col, row)
            vis.push(col, row, fill)
          }
          // force rects when the texture is on, so the tile carves clean shapes
          const asRect = texActive || vis.length / 3 > 2000
          for (let i = 0; i < vis.length; i += 3) {
            const col = vis[i], row = vis[i + 1], fill = vis[i + 2]
            const { cx, cy } = geo.centerFor(col, row)
            const p = pathFor(fill)
            if (asRect) paintCell(p, cx, cy, col, row)
            else tech.beadOutline(p, cx, cy, dw, dh, tiltFor(col, row))
          }
        }
        for (const [fill, p] of byColor) {
          ctx.fillStyle = fill
          ctx.fill(p)
        }
      }

      // bead-texture overlay: carve the flat colour rects into bead shapes with a
      // single pattern fill. The pattern is anchored to the lattice origin
      // (padX/padY) and scaled from tile-px back to doc units, so its beads land
      // exactly on the colour cells. Painted only over the filled beads' bounding
      // box (in doc space) so empty/transparent canvas keeps showing through.
      if (texActive && bxMax >= bxMin) {
        const gapColor = bgL && bgL.visible ? bgL.color : '#efece6'
        const tex = beadTexture(gapColor)
        const pat = ctx.createPattern(tex.canvas, 'repeat')
        pat.setTransform(new DOMMatrix([tex.sx, 0, 0, tex.sy, geo.padX, geo.padY]))
        // filled-cell bbox → doc rectangle (pad by a bead so tilted edge beads
        // aren't clipped), clamped to the canvas and the visible region
        const c0d = geo.centerFor(bxMin, 0).cx - geo.Px
        const c1d = geo.centerFor(bxMax, 1).cx + geo.Px
        const r0d = geo.centerFor(0, byMin).cy - geo.Py
        const r1d = geo.centerFor(0, byMax).cy + geo.Py
        const rx0 = Math.max(0, docLeft, c0d)
        const ry0 = Math.max(0, docTop, r0d)
        const rx1 = Math.min(docW, docRight, c1d)
        const ry1 = Math.min(docH, docBottom, r1d)
        if (rx1 > rx0 && ry1 > ry0) {
          ctx.fillStyle = pat
          ctx.fillRect(rx0, ry0, rx1 - rx0, ry1 - ry0)
        }
      }

      // empty-cell grid outlines, for cells with no bead in any visible layer
      // (skipped when beads are tiny on screen). Over a reference image they stay
      // outline-only so the design shows through. Batched into ONE path so the
      // whole grid is a single fill + single stroke.
      // Draw the empty-bead grid whenever the beads are big enough to read a shape
      // (> 6 px) and there aren't too many on screen to batch cheaply. This is ONE
      // Path2D (single fill + single stroke) built only on settle (gestures blit a
      // cached frame), so it stays fast even for the default ~2k-cell canvas that
      // used to fall past the old > 2000 gate and render as blank white.
      const showEmptyGrid = onScreenBw > 6 && visibleCells < 6000
      if (showEmptyGrid) {
        const emptyPath = new Path2D()
        for (let row = r0; row < r1; row++) {
          for (let col = c0; col < c1; col++) {
            if (!tech.beadExists(col, row)) continue
            if (filledCells.has(cellId(col, row))) continue
            const { cx, cy } = geo.centerFor(col, row)
            tech.beadOutline(emptyPath, cx, cy, Bw, Bh, tiltFor(col, row))
          }
        }
        // slight grey bead grid on the canvas (outline carries it; subtle fill)
        if (!imageShowing) { ctx.fillStyle = '#e6e4dd'; ctx.fill(emptyPath) }
        ctx.lineWidth = 1.25 / scale
        ctx.strokeStyle = '#b6b1a6'
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

      // mirror preview: a faint flipped copy on each of the 4 sides
      if (mirrorGhosts) {
        ctx.globalAlpha = 0.45
        for (const v of mirrorGhosts) {
          for (const { col, row, fill } of v.cells) {
            const { cx, cy } = geo.centerFor(col, row)
            tech.beadPath(ctx, cx, cy, dw, dh, tiltFor(col, row))
            ctx.fillStyle = fill
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
      }

      // cm ruler along the top + left edges, so a design can be measured in real
      // centimetres. Drawn in document space (moves + rotates with the canvas) but
      // sized in screen px (÷scale) so ticks/numbers stay a constant readable size.
      {
        const pxPerCmX = geo.width / canvasCm.w
        const pxPerCmY = geo.height / canvasCm.h
        const u = 1 / scale
        ctx.save()
        ctx.strokeStyle = 'rgba(150,144,130,0.85)'
        ctx.fillStyle = 'rgba(120,114,101,0.95)'
        ctx.lineWidth = 1 * u
        ctx.font = `${9 * u}px ${T.mono}`
        // top edge (numbers above the canvas)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        for (let cm = 0; cm <= canvasCm.w; cm++) {
          const x = cm * pxPerCmX
          const major = cm % 5 === 0
          const len = (major ? 9 : 5) * u
          ctx.beginPath(); ctx.moveTo(x, -2 * u); ctx.lineTo(x, -2 * u - len); ctx.stroke()
          if (major) ctx.fillText(String(cm), x, -2 * u - len - 3 * u)
        }
        // left edge (numbers left of the canvas)
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        for (let cm = 0; cm <= canvasCm.h; cm++) {
          const y = cm * pxPerCmY
          const major = cm % 5 === 0
          const len = (major ? 9 : 5) * u
          ctx.beginPath(); ctx.moveTo(-2 * u, y); ctx.lineTo(-2 * u - len, y); ctx.stroke()
          if (major) ctx.fillText(String(cm), -2 * u - len - 3 * u, y)
        }
        ctx.restore()
      }
    },
    [viewport, view, geo, beads, layers, groups, activeId, Bw, Bh, cols, rows, tiltFor, checkerTile, DPR, selection, marquee, pack, placing, mirrorGhosts, tech, canvasCm, beadTexture]
  )

  // Fast stroke repaint: blit the scene snapshot taken at stroke start, then draw
  // ONLY the beads painted so far this stroke on top. No 10k-bead rebuild → no
  // per-frame allocation storm. Used only for freehand DRAW on the top layer; the
  // full drawScene reconciles everything at stroke end.
  const drawStrokeFast = useCallback(
    (ctx) => {
      const { w: vw, h: vh } = viewport
      const cache = strokeCacheRef.current
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      if (cache) ctx.drawImage(cache, 0, 0)
      const painted = strokePaintedRef.current
      if (!painted || !painted.size) return
      const { scale, tx, ty, rot } = view
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
      const path = new Path2D()
      for (const k of painted) {
        const ci = k.indexOf(',')
        const c = +k.slice(0, ci)
        const r = +k.slice(ci + 1)
        const { cx, cy } = geo.centerFor(c, r)
        tech.beadOutline(path, cx, cy, dw, dh, tiltFor(c, r))
      }
      ctx.fillStyle = color
      ctx.fill(path)
    },
    [viewport, view, DPR, pack, Bw, Bh, geo, tech, tiltFor, color]
  )

  // Fast ERASE repaint: blit the pre-stroke snapshot, then reveal the "floor"
  // (the scene with the active layer hidden — captured at stroke start) through
  // ONLY the erased cells. O(erased cells) per frame, so erasing on a dense design
  // no longer repaints every bead every frame (the sustained freeze that killed
  // iPad Safari). Mirror of drawStrokeFast for the additive case.
  const drawStrokeErase = useCallback(
    (ctx) => {
      const cache = strokeCacheRef.current
      const floor = eraseFloorRef.current
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      if (cache) ctx.drawImage(cache, 0, 0)
      const erased = strokeErasedRef.current
      if (!floor || !erased || !erased.size) return
      const { scale, tx, ty, rot } = view
      const vcos = Math.cos(rot)
      const vsin = Math.sin(rot)
      ctx.setTransform(
        DPR * scale * vcos, DPR * scale * vsin,
        -DPR * scale * vsin, DPR * scale * vcos,
        tx * DPR, ty * DPR
      )
      // clip to the erased cells (same footprint drawScene fills per cell), then
      // blit the floor bitmap through it. The clip is stored in device space, so
      // we reset to identity for the 1:1 drawImage.
      const clip = new Path2D()
      for (const k of erased) {
        const ci = k.indexOf(',')
        const c = +k.slice(0, ci)
        const r = +k.slice(ci + 1)
        const { cx, cy } = geo.centerFor(c, r)
        const wide = !!tech.apexWide && r % 2 === 0 // half-density apex rows only
        clip.rect(cx - (wide ? geo.Px : geo.Px / 2), cy - geo.Py / 2, wide ? geo.Px * 2 : geo.Px, geo.Py)
      }
      ctx.save()
      ctx.clip(clip)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(floor, 0, 0)
      ctx.restore()
    },
    [view, DPR, geo, tech]
  )
  // ---- fast zoom/pan: blit the last full render, transformed, during a gesture -
  // A full drawScene on a big canvas re-iterates every placed bead (~100ms on a
  // filled 100×100), so live zoom/pan crawled at ~10fps. Instead we keep the last
  // crisp render in sceneCacheRef and, while a gesture is active, re-blit that one
  // bitmap under the new view (a single drawImage with the view delta as the
  // transform) — then settle to a real full render ~130ms after the gesture stops.
  const devMat = (v) => {
    const c = Math.cos(v.rot || 0)
    const s = Math.sin(v.rot || 0)
    const k = DPR * v.scale
    return new DOMMatrix([k * c, k * s, -k * s, k * c, v.tx * DPR, v.ty * DPR])
  }
  const captureCache = (canvas) => {
    let cv = sceneCacheRef.current
    if (!cv) { cv = document.createElement('canvas'); sceneCacheRef.current = cv }
    if (cv.width !== canvas.width || cv.height !== canvas.height) { cv.width = canvas.width; cv.height = canvas.height }
    const cx = cv.getContext('2d')
    cx.setTransform(1, 0, 0, 1, 0, 0)
    cx.clearRect(0, 0, cv.width, cv.height)
    cx.drawImage(canvas, 0, 0)
    cacheViewRef.current = view
  }
  const drawSceneFull = (ctx) => { drawScene(ctx); captureCache(ctx.canvas) }
  const drawBlit = (ctx) => {
    const cache = sceneCacheRef.current
    const cv = cacheViewRef.current
    if (!cache || !cv) { drawSceneFull(ctx); return }
    // map cached device pixels → their new on-screen place: newView ∘ cacheView⁻¹.
    // Revealed area (zoom-out / pan past the old viewport) stays blank until the
    // settle render — invisible for a quick gesture.
    const A = devMat(view).multiply(devMat(cv).inverse())
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.setTransform(A.a, A.b, A.c, A.d, A.e, A.f)
    ctx.drawImage(cache, 0, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
  const beginInteract = () => {
    interactingRef.current = true
    clearTimeout(interactEndRef.current)
    interactEndRef.current = setTimeout(() => {
      interactingRef.current = false
      requestRedraw() // settle: a crisp full render that also refreshes the cache
    }, 130)
  }
  beginInteractRef.current = beginInteract

  // rAF repaint: fast stroke path mid-draw, blit mid-gesture, else full + cache
  // skip a redundant commit repaint: the canvas already shows the final stroke,
  // so just refresh the zoom cache from it (no O(all-beads) render → no freeze).
  const skipCommitRender = (ctx) => { captureCache(ctx.canvas); skipCommitRenderRef.current = false }
  drawRef.current = (ctx) =>
    skipCommitRenderRef.current ? skipCommitRender(ctx)
      : fastStrokeRef.current ? drawStrokeFast(ctx)
        : fastEraseRef.current ? drawStrokeErase(ctx)
          : interactingRef.current ? drawBlit(ctx)
            : drawSceneFull(ctx)

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

  // Bead-pop FX: a quick overshoot (scale 1 → ~1.22 → 1) faded over each newly
  // placed bead, on a cheap always-present DPR-1 canvas. It never touches the heavy
  // main render or the fast-stroke path. The underlying bead is already full size,
  // so the sub-1× part of the curve hides inside it (no visible shrink) — only the
  // overshoot bloom reads, giving a satisfying "snap into place".
  const POP_MS = 150
  const drawPops = useCallback(
    (ctx, now) => {
      const { w: vw, h: vh } = viewport
      const { scale, tx, ty, rot } = view
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, vw, vh)
      const list = poppingRef.current
      if (!list.length) return
      const vcos = Math.cos(rot)
      const vsin = Math.sin(rot)
      ctx.setTransform(scale * vcos, scale * vsin, -scale * vsin, scale * vcos, tx, ty)
      const baseScale = 1 + pack * (PACKED_DRAW - 1)
      let alive = 0
      for (const p of list) {
        const a = (now - p.t0) / POP_MS
        if (a >= 1 || a < 0) continue
        list[alive++] = p // compact survivors in place
        const s = baseScale * (1 + 0.22 * Math.sin(Math.PI * a))
        const { cx, cy } = geo.centerFor(p.col, p.row)
        ctx.globalAlpha = 0.8 * (1 - a)
        ctx.fillStyle = p.color
        tech.beadPath(ctx, cx, cy, Bw * s, Bh * s, tiltFor(p.col, p.row))
        ctx.fill()
      }
      list.length = alive
      ctx.globalAlpha = 1
    },
    [viewport, view, pack, geo, tech, Bw, Bh, tiltFor]
  )
  popDrawRef.current = drawPops

  const popTick = useCallback(() => {
    const canvas = popRef.current
    if (canvas && popDrawRef.current) popDrawRef.current(canvas.getContext('2d'), performance.now())
    if (poppingRef.current.length) {
      popRafRef.current = requestAnimationFrame(popTick)
    } else {
      popRafRef.current = 0
      if (canvas) {
        const c = canvas.getContext('2d')
        c.setTransform(1, 0, 0, 1, 0, 0)
        c.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const spawnPop = useCallback(
    (col, row, color) => {
      const list = poppingRef.current
      if (list.length > 80) list.shift() // bound work on dense fast strokes
      list.push({ col, row, color, t0: performance.now() })
      if (!popRafRef.current) popRafRef.current = requestAnimationFrame(popTick)
    },
    [popTick]
  )
  spawnPopRef.current = spawnPop
  useEffect(() => () => { if (popRafRef.current) cancelAnimationFrame(popRafRef.current) }, [])

  // size all canvases to the viewport (never to the document). The board + hover
  // ghost run at DPR for crispness; the pop FX runs at DPR 1 to stay light.
  useEffect(() => {
    for (const canvas of [canvasRef.current, overlayRef.current]) {
      if (!canvas) continue
      canvas.width = Math.max(1, Math.round(viewport.w * DPR))
      canvas.height = Math.max(1, Math.round(viewport.h * DPR))
      canvas.style.width = `${viewport.w}px`
      canvas.style.height = `${viewport.h}px`
    }
    const pop = popRef.current
    if (pop) {
      pop.width = Math.max(1, Math.round(viewport.w))
      pop.height = Math.max(1, Math.round(viewport.h))
      pop.style.width = `${viewport.w}px`
      pop.style.height = `${viewport.h}px`
    }
  }, [viewport, DPR])

  // redraw whenever the scene OR view changes — via the rAF chooser so a live
  // zoom/pan uses the fast blit path and a settled view gets the full render.
  useEffect(() => {
    requestRedraw()
  }, [drawScene, requestRedraw])

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
      beginInteractRef.current?.() // fast-blit while wheeling; settle when it stops
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

  // ---- QuickShape (hold-to-snap, Procreate) --------------------------------
  // Hold the pen still ~HOLD_MS mid-draw → the freehand path snaps to the
  // fitted ideal shape (line / circle / ellipse / rect / triangle / polygon),
  // repainted as a brush-thick OUTLINE through the same stroke-replay the
  // straight-line snap uses (so undo/commit/alpha-lock all behave the same).
  // Keep dragging to adjust the shape; lift to place — one undo step.
  const HOLD_MS = 600
  const HOLD_JITTER = 7 // screen px of pen wobble that still counts as "still"
  const shapeHoldRef = useRef(null) // {sx, sy, timer} pending hold detection
  const shapeModeRef = useRef(null) // {shape, cur, anchor} adjust phase after snap
  const shapeRafRef = useRef(0) // one shape repaint per frame while adjusting
  const tryQuickShapeRef = useRef(null) // latest closure for the hold timer

  const cancelShapeHold = () => {
    if (shapeHoldRef.current) {
      clearTimeout(shapeHoldRef.current.timer)
      shapeHoldRef.current = null
    }
  }
  const armShapeHold = (sx, sy) => {
    cancelShapeHold()
    shapeHoldRef.current = { sx, sy, timer: setTimeout(() => tryQuickShapeRef.current?.(), HOLD_MS) }
  }
  const shapeStep = () => Math.min(geo.Px, geo.Py) / 4 // dense enough to hit every bead
  // Rebuild the design as (stroke-start state) + the shape outline. Unlike
  // paintAlong, samples snap to the NEAREST bead (no oval hit-test): an ideal
  // curve slips between the staggered lattice's ovals (vertical runs
  // especially), which left dashed outlines. QuickShape is draw-only.
  const paintShapeOutline = (base, points) => {
    const alpha = alphaLockRef.current
    const next = new Map(base)
    const put = (col, row) => {
      const k = key(col, row)
      if (alpha && !next.has(k)) return // alpha lock: only recolour existing beads
      next.set(k, color)
    }
    for (const q of points) {
      if (brush > 1) for (const c of brushCells(q.x, q.y)) put(c.col, c.row)
      else {
        const n = tech.nearestBead(geo, q.x, q.y)
        if (n) put(n.col, n.row)
      }
    }
    return next
  }
  const tryQuickShape = () => {
    const s = strokeRef.current
    if (!s || !dragging.current || tool !== 'draw' || shapeModeRef.current) return
    const shape = fitShape(s.pts, geo.Px * 2.5)
    if (!shape) return
    shapeModeRef.current = { shape, cur: shape, anchor: s.pts[s.pts.length - 1] }
    s.locked = true // stop the straight-line snap evaluating this stroke
    s.snapped = false
    fastStrokeRef.current = false // outline replay replaces the map → full redraws
    applyBeads(paintShapeOutline(strokeBase.current, shapeOutline(shape, shapeStep())), true)
    showToast(`${shapeLabel(shape)} — drag to adjust, lift to place`)
  }
  tryQuickShapeRef.current = tryQuickShape

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
    // Record the draw path even after the line-snap gives up (`locked`) — the
    // QuickShape hold needs the WHOLE freehand path to fit a shape against.
    // Thinned: pencils fire up to 240 events/s.
    if (s && tool !== 'erase') {
      const last = s.pts[s.pts.length - 1]
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 1) s.pts.push(p)
    }
    // straight-line snap is a DRAW assist; skip it for erase (it copies the whole
    // bead Map per sample — churn — and bypasses the fast-erase path).
    if (s && !s.locked && tool !== 'erase') {
      const snap = evalSnap(s, p)
      if (snap) {
        // throttle: rebuild the design only when the line gains/loses a sample,
        // not on every pointer event (Map copies at 240Hz crash mobile Safari)
        const n = Math.floor(snap.len / (snap.pitch / 4))
        if (s.snapped && n === s.lastN) return
        s.snapped = true
        s.lastN = n
        fastStrokeRef.current = false // snapped line replaces the map → full redraw
        applyBeads(paintAlong(strokeBase.current, lineSamples(s.start, snap)), true)
        return
      }
      if (s.snapped) {
        // was a snapped line, now curving: give back the freehand path
        s.snapped = false
        s.locked = true
        fastStrokeRef.current = false // rebuilt from base → full redraw
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
    // mirror preview open: the on-canvas tap buttons handle the choice; ignore
    // canvas draws/pans so nothing gets painted underneath it.
    if (mirrorGhosts) return
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
    recordCrumbRef.current?.(`draw-start(${tool})`) // crash-hunt breadcrumb
    dragging.current = true
    strokeBase.current = beadsRef.current // history: snapshot at stroke start
    strokeRef.current = { start: p, pts: [], locked: false, snapped: false, lastN: -1 }
    if (tool === 'draw') armShapeHold(e.clientX, e.clientY) // QuickShape hold timer
    // arm the fast-stroke path for a freehand DRAW on the top-most visible layer
    // (so stamping new beads over the snapshot can't paint over an upper layer).
    fastStrokeRef.current = false
    fastEraseRef.current = false
    if (tool === 'draw') {
      pushRecent(color)
      const li = layersRef.current
      const aIdx = li.findIndex((l) => l.id === activeIdRef.current)
      const coveredAbove = li.some((l, i) => i > aIdx && layerShown(l))
      if (!coveredAbove && canvasRef.current) {
        const src = canvasRef.current
        let cache = strokeCacheRef.current
        if (!cache) { cache = document.createElement('canvas'); strokeCacheRef.current = cache }
        cache.width = src.width
        cache.height = src.height
        cache.getContext('2d').drawImage(src, 0, 0)
        strokePaintedRef.current = new Set()
        fastStrokeRef.current = true
      }
    } else if (tool === 'erase' && canvasRef.current) {
      // arm the fast ERASE path: snapshot the current scene AND render the floor
      // (active layer hidden) once, so each move reveals only the erased cells.
      const src = canvasRef.current
      let cache = strokeCacheRef.current
      if (!cache) { cache = document.createElement('canvas'); strokeCacheRef.current = cache }
      cache.width = src.width; cache.height = src.height
      cache.getContext('2d').drawImage(src, 0, 0)
      let floor = eraseFloorRef.current
      if (!floor) { floor = document.createElement('canvas'); eraseFloorRef.current = floor }
      floor.width = src.width; floor.height = src.height
      hideActiveForFloorRef.current = true
      try { drawScene(floor.getContext('2d')) } finally { hideActiveForFloorRef.current = false }
      strokeErasedRef.current = new Set()
      fastEraseRef.current = true
    }
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
          beginInteract() // fast-blit while pinching
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
        beginInteract() // fast-blit while panning
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
      // QuickShape: after a snap the drag ADJUSTS the shape instead of painting.
      // Rebuilt at most once per frame (paintAlong copies the bead Map).
      if (shapeModeRef.current) {
        const m = shapeModeRef.current
        m.cur = adjustShape(m.shape, m.anchor, docFromEvent(e))
        if (!shapeRafRef.current) {
          shapeRafRef.current = requestAnimationFrame(() => {
            shapeRafRef.current = 0
            const mm = shapeModeRef.current
            if (!mm || !strokeBase.current) return
            applyBeads(paintShapeOutline(strokeBase.current, shapeOutline(mm.cur, shapeStep())), true)
          })
        }
        return
      }
      // real pen movement re-arms the hold timer; sub-jitter wobble lets it ripen
      const h = shapeHoldRef.current
      if (h && Math.hypot(e.clientX - h.sx, e.clientY - h.sy) > HOLD_JITTER) {
        armShapeHold(e.clientX, e.clientY)
      }
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
      // If a fast stroke drew the final pixels already, skip the redundant full
      // repaint that setBeads triggers (the per-stroke freeze that crashed iPad).
      // Erase's fast path is pixel-exact (reveals a real render); draw's fast path
      // matches too UNLESS the texture overlay is on (then its beads lack texture).
      if (fastEraseRef.current || (fastStrokeRef.current && !lastTexActiveRef.current)) {
        skipCommitRenderRef.current = true
      }
      pushHistory(currentDoc())
      setBeads(beadsRef.current) // strokes were silent — sync React state once
      syncActiveLayer() // and fold the new beads into the layer stack
      recordCrumbRef.current?.('draw-commit') // crash-hunt: mark the heavy commit
    }
    strokeBase.current = null
    strokeRef.current = null
    dragging.current = false
    panning.current = null
    placeDrag.current = null
    // QuickShape: lifting places the shape (committed above); drop the hold/adjust state
    cancelShapeHold()
    shapeModeRef.current = null
    if (shapeRafRef.current) { cancelAnimationFrame(shapeRafRef.current); shapeRafRef.current = 0 }
    // end the fast-stroke path; the committed setBeads/setLayers above trigger a
    // full drawScene that reconciles the snapshot with the real scene
    fastStrokeRef.current = false
    strokePaintedRef.current = null
    fastEraseRef.current = false
    strokeErasedRef.current = null
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
      if (!layerShown(l) || l.type !== 'bead') continue // group-hidden layers stay out of the chart
      for (const [k, v] of l.beads) m.set(k, v)
    }
    return m
  }

  // Ordered draw list for the chart: bg colour (on-screen export only), then
  // visible image + bead layers in z-order, so images bake in exactly where they
  // sit on screen and the top bead wins.
  // includeBg: JPG exports paint the visible background colour (paper look);
  // PNG exports leave it out — a PNG is always a transparent cutout.
  const chartComposite = (includeBg) => {
    const out = []
    for (const l of layersRef.current) {
      if (!layerShown(l)) continue
      if (l.type === 'bg') { if (includeBg) out.push({ type: 'color', color: l.color }) }
      else if (l.type === 'image') { if (l.img) out.push({ type: 'image', img: l.img, t: l.t, opacity: l.opacity }) }
      else out.push({ type: 'beads', map: l.beads })
    }
    return out
  }

  const exportChart = async (fmt = 'png') => {
    if (exporting) return
    recordCrumbRef.current?.('export-start') // crash-hunt breadcrumb
    setExporting(true)
    // let the button's "Preparing…" state actually paint before we hog the main
    // thread building the chart (a big chart is a heavy synchronous render).
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)))
    try {
    const jpeg = fmt === 'jpeg'
    const flat = flattenVisible()
    const chart = await renderFullChart({
      cols,
      rows,
      tiltFor,
      tech,
      printBeadMm,
      beadRatio,
      composite: chartComposite(jpeg),
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
    const legend = renderLegend(flat, { width: chart.width, height: legendH, sheet: jpeg ? '#FFFFFF' : null })
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
    recordCrumbRef.current?.(`export ${out.width}×${out.height}`) // crash-hunt: size of the giant off-counter export canvas
    const ctx = out.getContext('2d')
    ctx.scale(s, s)
    // JPG = the printable paper look: white sheet + the artwork's background
    // colour. PNG = a transparent cutout (JPEG has no alpha, PNG always does).
    if (jpeg) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, outW, outH)
    }
    ctx.drawImage(chart, 0, 0)
    ctx.drawImage(legend, 0, chart.height + gap)
    // toBlob (async) instead of toDataURL: it doesn't build a giant base64
    // string on the main thread and downloads via an object URL, so a big export
    // stays lighter on memory. Same pixels ⇒ same PNG, so identical-size exports
    // (the animation use case) still match.
    const mime = fmt === 'jpeg' ? 'image/jpeg' : 'image/png'
    const ext = fmt === 'jpeg' ? 'jpg' : 'png'
    await new Promise((resolve) => {
      out.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `beadwork-chart.${ext}`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        }
        resolve()
      }, mime, fmt === 'jpeg' ? 0.92 : undefined)
    })
    } finally {
      setExporting(false)
    }
  }
  const exportPNG = () => exportChart('png')
  const exportJPG = () => exportChart('jpeg')

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
    version: 4, name: designName, technique: techniqueId, canvasCm, beadMM, palette, pack,
    // v4: layer groups — saved with their ids so layers' groupId keeps pointing at them
    groups: groupsRef.current.map(({ id, name, visible, locked, collapsed }) => ({ id, name, visible, locked, collapsed })),
    layers: layersRef.current.map((l) => {
      const base = { name: l.name, type: l.type || 'bead', visible: l.visible, locked: l.locked, alphaLock: l.alphaLock, groupId: l.groupId }
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

  // "Import photo as beads": one bead layer per colour inside a "From photo"
  // group, the source photo as a HIDDEN reference image layer directly
  // beneath the group, all inserted above the active layer — ONE undo step.
  // The artwork's palette is deliberately untouched (it owns its palette;
  // the imported colours are visible on the layers themselves).
  const handlePhotoImport = ({ colorLayers, imageSrc, imageW, imageH }) => {
    if (!colorLayers.length) return
    pushHistory(currentDoc())
    const gid = uid()
    // cover-place the reference photo on the canvas (doc px, like bg-image migration)
    const s = Math.max(geo.width / imageW, geo.height / imageH)
    const imgLayer = makeImageLayer(imageSrc, null, {
      scale: s, x: (geo.width - imageW * s) / 2, y: (geo.height - imageH * s) / 2,
    }, 1)
    imgLayer.name = 'Photo (reference)'
    imgLayer.visible = false
    const beadLayers = colorLayers.map(({ color, beads }) => {
      const l = makeLayer(color.toUpperCase(), beads)
      l.groupId = gid // spliced together below → group members stay contiguous
      return l
    })
    const idx = layersRef.current.findIndex((l) => l.id === activeIdRef.current)
    const nl = [...layersRef.current]
    nl.splice(idx + 1, 0, imgLayer, ...beadLayers)
    layersRef.current = nl
    setLayers(nl)
    setGroupsBoth([...groupsRef.current, { id: gid, name: 'From photo', visible: true, locked: false, collapsed: false }])
    loadLayerImage(imgLayer.id, imageSrc)
    makeActive(beadLayers[beadLayers.length - 1])
    setSelection(new Set())
    setPlacing(null)
    setShowPhotoImport(false)
    requestRedraw()
    showToast(`Photo imported — ${beadLayers.length} colour layer${beadLayers.length > 1 ? 's' : ''}`)
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
    // v4 groups: keep only well-formed entries; a layer's groupId must point at
    // one of them (dangling ids are dropped below). Older saves have none.
    const savedGroups = (Array.isArray(d.groups) ? d.groups : [])
      .filter((g) => g && g.id)
      .map((g) => ({ id: g.id, name: g.name || 'Group', visible: g.visible !== false, locked: !!g.locked, collapsed: !!g.collapsed }))
    const groupIds = new Set(savedGroups.map((g) => g.id))
    if (isV3) {
      for (const l of d.layers) {
        if (l.type === 'bg') {
          const lay = makeBgLayer(l.color || '#FFFFFF')
          lay.name = l.name || 'Background'; lay.visible = l.visible !== false; lay.locked = !!l.locked
          nl.push(lay)
        } else if (l.type === 'image') {
          const lay = makeImageLayer(l.src || null, null, l.t || { x: 0, y: 0, scale: 1 }, l.opacity == null ? 1 : l.opacity)
          lay.name = l.name || 'Image'; lay.visible = l.visible !== false; lay.locked = !!l.locked
          if (groupIds.has(l.groupId)) lay.groupId = l.groupId
          nl.push(lay)
          if (l.src) pendingImages.push([lay.id, l.src])
        } else {
          const lay = makeLayer(l.name || 'Layer', new Map(Array.isArray(l.beads) ? l.beads : []))
          lay.visible = l.visible !== false; lay.locked = !!l.locked; lay.alphaLock = !!l.alphaLock
          if (groupIds.has(l.groupId)) lay.groupId = l.groupId
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
    // only groups that still have members (older saves load with none)
    const usedGroupIds = new Set(nl.map((l) => l.groupId).filter(Boolean))
    setGroupsBoth(savedGroups.filter((g) => usedGroupIds.has(g.id)))
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
    setGroupsBoth([]) // fresh artwork starts with no layer groups
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

  // Export a chosen set of artworks to one file (re-importable via Import file).
  const exportSelected = async (ids) => {
    const all = await listArtworks()
    const chosen = all.filter((a) => ids.has(a.id))
    if (!chosen.length) return
    const blob = new Blob(
      [JSON.stringify({ version: 2, kind: 'beadwork-backup', artworks: chosen })],
      { type: 'application/json' }
    )
    const link = document.createElement('a')
    link.download = `beadwork-export-${new Date().toISOString().slice(0, 10)}.json`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }
  const togglePick = (id) =>
    setExportPick((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

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
    // Serialising a big design ([...beads.entries()] → IndexedDB) allocates several
    // MB each save. During active colouring that repeated churn is the biggest
    // avoidable memory pressure on iPad, so on big designs we hold off until the
    // user actually pauses (longer idle) instead of saving on every quick break.
    const total = layersRef.current.reduce((n, l) => n + (l.beads ? l.beads.size : 0), 0)
    const delay = total > 40000 ? 4000 : total > 15000 ? 1800 : 600
    saveTimer.current = setTimeout(() => {
      const rec = { id: currentArtworkId, updatedAt: Date.now(), ...designData() }
      putArtwork(rec)
        .then(() => setArtworks((a) => a.map((x) => (x.id === rec.id ? summarize(rec) : x))))
        .catch(() => {})
    }, delay)
    return () => clearTimeout(saveTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, currentArtworkId, layers, canvasCm, beadMM, palette, pack, designName, techniqueId])

  // Manual save — the design already auto-saves, but an explicit "Saved"
  // confirmation reassures the user their work is safe.
  const saveNow = () => {
    if (!currentArtworkId) { showToast('Saved'); return }
    const rec = { id: currentArtworkId, updatedAt: Date.now(), ...designData() }
    putArtwork(rec)
      .then(() => { setArtworks((a) => a.map((x) => (x.id === rec.id ? summarize(rec) : x))); showToast('Saved') })
      .catch(() => showToast('Save failed — try again'))
  }

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
          {/* bead-pop FX: a light always-present canvas for the "snap into place"
              overshoot; independent of the main render so it can't slow drawing. */}
          <canvas ref={popRef} className="overlay popfx" />
          {/* ── two floating toolbar pills (Figma canvas screen) ── */}
          <div className="tbPill tbLeft">
            <button className="tbIcon" onClick={() => setScreen('gallery')} title="My artworks">
              <IconHome />
            </button>
            <button
              className={`tbIcon ${showMenu ? 'on' : ''}`}
              onClick={() => { setShowMenu((v) => !v); setShowLayers(false); setShowColor(false) }}
              title="Menu"
            >
              <IconMenu />
            </button>
          </div>
          <div className="tbPill tbRight">
            {[
              ['draw', 'Draw', <IconDraw key="d" />],
              ['erase', 'Erase', <IconErase key="e" />],
              ['select', 'Select', <IconSelect key="s" />],
            ].map(([id, label, icon]) => (
              <button
                key={id}
                className={`tbIcon ${tool === id ? 'on' : ''}`}
                onClick={() => { setTool(id); setShowLayers(false); setShowColor(false); setShowMenu(false) }}
                title={label}
              >
                {icon}
              </button>
            ))}
            <button
              className={`tbIcon ${showLayers ? 'on' : ''}`}
              onClick={() => { setShowLayers((v) => !v); setShowColor(false); setShowMenu(false) }}
              title="Layers"
            >
              <IconLayers />
            </button>
            <button
              type="button"
              className={`tbColor ${showColor ? 'on' : ''}`}
              style={{ background: color }}
              onPointerDown={onBigSwatchDown}
              onClick={() => { if (!bigSwatchDidDrag.current) { setShowColor((v) => !v); setShowLayers(false); setShowMenu(false) } }}
              title="Colour"
            />
          </div>

          {/* artwork name above the canvas — double-tap to rename (Figma "Parvat") */}
          {editName ? (
            <input
              className="canvasName editing"
              value={designName}
              placeholder="Untitled"
              autoFocus
              onChange={(e) => setDesignName(e.target.value)}
              onBlur={() => setEditName(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
            />
          ) : (
            <span className="canvasName" onDoubleClick={() => setEditName(true)} title="Double-tap to rename">
              {designName || 'Untitled'}
            </span>
          )}

          {/* left brush-size rail (Procreate). Hidden for the select tool. */}
          {tool !== 'select' && (
            <div className="brushRail">
              <input
                className="vSlider"
                type="range" min="1" max="6" step="1"
                value={brush}
                onChange={(e) => setBrush(+e.target.value)}
                title={`Brush size — ${brush}`}
              />
              <span className="brushRailVal">{brush}</span>
            </div>
          )}

          {/* right colour rail = the active palette. Drag a swatch onto the canvas to fill. */}
          <div className="paletteRail">
            {activePalette.colors.map((c, i) => (
              <button
                key={i}
                className={`railSw ${c === color ? 'on' : ''}`}
                style={{ background: c }}
                onPointerDown={onSwatchDown(c)}
                onPointerMove={onSwatchMove}
                onPointerUp={onSwatchUp}
                onPointerCancel={onSwatchCancel}
                title={c}
              />
            ))}
          </div>

          {/* undo / redo — bottom-left */}
          <div className="undoRedo">
            <button onClick={undo} title="Undo — 2-finger tap or Ctrl+Z"><IconUndo /></button>
            <button onClick={redo} title="Redo — 3-finger tap or Ctrl+Shift+Z"><IconRedo /></button>
          </div>

          {/* drawing-off banner when the active layer is locked or hidden */}
          {!canEdit && (
            <div className="lockNote">{blockedReason()} </div>
          )}

          {/* selection tools — compact bottom bar (Figma 52:792) */}
          {(tool === 'select' || selection.size > 0) && !placing && !mirrorGhosts && (
            <div className="selPanel">
              <div className="selRow">
                <button className="selChip" onClick={() => startPlacing('move')} disabled={!selection.size || !canEdit}>Move</button>
                <button className="selChip" onClick={() => startPlacing('copy')} disabled={!selection.size || !canEdit}>Duplicate</button>
                <button className="selChip" onClick={openMirror} disabled={!selection.size || !canEdit}>Mirror</button>
                <button className="selChip" onClick={deleteSelection} disabled={!selection.size || !canEdit}>Clear</button>
              </div>
              <div className="selRow">
                <span className="selPatternLbl">Pattern</span>
                <button className="selChip" onClick={() => makePattern('grid')} disabled={!selection.size || !canEdit}>Grid</button>
                <button className="selChip" onClick={() => makePattern('brick')} disabled={!selection.size || !canEdit}>Brick</button>
                <button className="selChip" onClick={() => makePattern('halfdrop')} disabled={!selection.size || !canEdit}>Half drop</button>
              </div>
            </div>
          )}

          {/* mirror preview — a ✓ centred on each of the 4 mirrored ghosts */}
          {mirrorGhosts && (
            <>
              {mirrorGhosts.map((v, i) => {
                const s = docToScreen(v.cx, v.cy, view)
                return (
                  <button
                    key={i}
                    className="mirrorPick"
                    style={{ left: `${s.x}px`, top: `${s.y}px` }}
                    onClick={() => applyMirror(v)}
                    title="Place this mirror"
                  ><IconCheck /></button>
                )
              })}
              <button className="floatCancel" onClick={() => setMirrorGhosts(null)}>Cancel</button>
            </>
          )}

          {/* placement confirm — ✓ above the dragged design, ✗ to cancel */}
          {placing && (() => {
            let minDc = Infinity, maxDc = -Infinity, minDr = Infinity
            for (const { dc, dr } of placing.motif) {
              if (dc < minDc) minDc = dc; if (dc > maxDc) maxDc = dc; if (dr < minDr) minDr = dr
            }
            const d = geo.centerFor(placing.c + (minDc + maxDc) / 2, placing.r + minDr)
            const s = docToScreen(d.cx, d.cy, view)
            return (
              <div className="placeConfirm" style={{ left: `${s.x}px`, top: `${s.y}px` }}>
                <button className="placeBtn ok" onClick={placeMotif} title="Place"><IconCheck /></button>
                <button className="placeBtn no" onClick={() => setPlacing(null)} title="Cancel">×</button>
              </div>
            )
          })()}

          {/* layers panel (Figma 52:685) */}
          {showLayers && (
            <div className="layersPanel">
              <div className="lpHead">
                <span className="lpTitle">Layers</span>
                <div className="lpHeadBtns">
                  <button className="lpAddBtn lpImgBtn" onClick={() => imgInputRef.current?.click()} title="Add image to trace">
                    <IconImage />
                  </button>
                  <button className="lpAddBtn" onClick={addLayer} title="New layer">+</button>
                </div>
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  style={{ display: 'none' }}
                  onChange={(e) => { addImageLayer(e.target.files[0]); e.target.value = '' }}
                />
              </div>
              <div className="lpList">
                {/* top of the stack shows first. Tap = select (layers) / collapse
                    (groups), hold-drag = reorder — a layer dropped between a
                    group's rows JOINS it; a group header drags its whole block. */}
                {displayRows().map((row) => {
                  if (row.kind === 'group') {
                    const g = row.g
                    if (!g) return null
                    const gDragging = layerDrag?.id === `g:${g.id}`
                    return (
                      <div
                        key={`g:${g.id}`}
                        className={`lpRow lpGroupRow ${gDragging ? 'dragging' : ''}`}
                        style={gDragging ? { transform: `translateY(${layerDrag.dy}px)` } : undefined}
                        onPointerDown={(e) => onGroupRowDown(e, g)}
                      >
                        <span className={`lpChevron ${g.collapsed ? '' : 'open'}`}>▸</span>
                        <span
                          className="lpName"
                          onDoubleClick={(e) => {
                            e.stopPropagation()
                            const n = window.prompt('Rename group:', g.name)
                            if (n !== null && n.trim()) renameGroup(g.id, n.trim())
                          }}
                          title="Tap to open/close · double-tap to rename"
                        >{g.name} <span className="lpGroupCount">({row.count})</span></span>
                        <button
                          className="lpEditBtn"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); flattenGroup(g.id) }}
                          title="Flatten the group into one layer"
                        >Flatten</button>
                        <button
                          className="lpRowIcon"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); toggleGroupLock(g.id) }}
                          title={g.locked ? 'Unlock group' : 'Lock group'}
                        >{g.locked ? <IconLock /> : <IconUnlock />}</button>
                        <button
                          className="lpRowIcon"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); toggleGroupVisible(g.id) }}
                          title={g.visible ? 'Hide group' : 'Show group'}
                        >{g.visible ? <IconEye /> : <IconEyeOff />}</button>
                      </div>
                    )
                  }
                  const l = row.l
                  const dragging = layerDrag?.id === l.id
                  return (
                    <div
                      key={l.id}
                      className={`lpRow ${l.id === activeId ? 'active' : ''} ${dragging ? 'dragging' : ''} ${l.groupId ? 'inGroup' : ''}`}
                      style={dragging ? { transform: `translateY(${layerDrag.dy}px)` } : undefined}
                      onPointerDown={(e) => onLayerRowDown(e, l)}
                    >
                      {l.type === 'bg' ? (
                        <input
                          type="color"
                          className="lpThumb lpThumbColor"
                          value={l.color}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setBgColor(e.target.value)}
                          title="Background colour"
                        />
                      ) : l.type === 'image' && l.src ? (
                        <span className="lpThumb"><img src={l.src} alt="" /></span>
                      ) : (
                        <span className="lpThumb" />
                      )}
                      <span className="lpName">{l.name}</span>
                      {l.type === 'image' && (
                        <button
                          className={`lpEditBtn ${l.id === adjustId ? 'on' : ''}`}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); switchLayer(l.id); setAdjustId(l.id === adjustId ? null : l.id) }}
                          disabled={layerHeld(l, groups) || !layerShown(l, groups)}
                          title={l.id === adjustId ? 'Done adjusting' : 'Adjust image'}
                        ><IconEdit /></button>
                      )}
                      {l.type !== 'bg' && (
                        <button
                          className="lpRowIcon"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); toggleLock(l.id) }}
                          title={l.locked ? 'Unlock' : 'Lock'}
                        >{l.locked ? <IconLock /> : <IconUnlock />}</button>
                      )}
                      <button
                        className="lpRowIcon"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); toggleVisible(l.id) }}
                        title={l.visible ? 'Hide' : 'Show'}
                      >{l.visible ? <IconEye /> : <IconEyeOff />}</button>
                    </div>
                  )
                })}
              </div>
              {activeLayer?.type === 'image' && (
                <div className="lpOpacity">
                  <span className="lpOpLabel">Opacity</span>
                  <input
                    className="slider"
                    type="range" min="0.1" max="1" step="0.05"
                    value={activeLayer.opacity == null ? 1 : activeLayer.opacity}
                    onChange={(e) => updateLayer(activeLayer.id, { opacity: +e.target.value })}
                  />
                </div>
              )}
              <div className="lpBar">
                {(() => {
                  const t = activeLayer?.type
                  const isBead = t === 'bead' || t == null
                  return (
                    <>
                      <button onClick={() => duplicateLayer(activeId)} disabled={t === 'bg'}>Duplicate</button>
                      <span className="lpBarDiv" />
                      <button onClick={groupActiveLayer} disabled={t === 'bg'} title={activeLayer?.groupId ? 'Dissolve this layer’s group' : 'Group with the layer below'}>
                        {activeLayer?.groupId ? 'Ungroup' : 'Group'}
                      </button>
                      <span className="lpBarDiv" />
                      <button className={activeLayer?.alphaLock ? 'on' : ''} onClick={() => toggleAlphaLock(activeId)} disabled={!isBead}>Alpha lock</button>
                      <span className="lpBarDiv" />
                      <button onClick={clearCanvas} disabled={!isBead}>Clear</button>
                      <span className="lpBarDiv" />
                      <button onClick={() => deleteLayer(activeId)} disabled={t === 'bg'}>Delete</button>
                    </>
                  )
                })()}
              </div>
            </div>
          )}
          {/* image-adjust mode banner */}
          {adjustLayer && (
            <div className="adjustBar">
              <span>ADJUST IMAGE</span>
              <button onClick={() => setAdjustId(null)}>DONE</button>
            </div>
          )}
          {toast && <div className="toast" key={toast}>{toast}</div>}
          <div className="zoomCtl">
            <button onClick={() => zoomAt(1 / 1.2, viewport.w / 2, viewport.h / 2)} title="Zoom out">−</button>
            <button className="zval" onClick={fitView} title="Fit to screen">{Math.round(view.scale * 100)}%</button>
            <button onClick={() => zoomAt(1.2, viewport.w / 2, viewport.h / 2)} title="Zoom in">+</button>
          </div>

          {/* ☰ dropdown — opens under the menu button (Figma "Details") */}
          {showMenu && (
            <>
              <div className="menuScrim" onClick={() => setShowMenu(false)} />
              <div className="menuPop">
                <button className="menuItem" onClick={() => { setShowMenu(false); saveNow() }}>Save Artwork</button>
                <div className="menuDiv" />
                <button className="menuItem" onClick={() => { setShowMenu(false); exportPNG() }} disabled={exporting}>Export PNG</button>
                <div className="menuDiv" />
                <button className="menuItem" onClick={() => { setShowMenu(false); exportJPG() }} disabled={exporting}>Export JPG</button>
                <div className="menuDiv" />
                {tech.id === '3bead' && (
                  <>
                    <button
                      className="menuItem"
                      onClick={() => {
                        setShowMenu(false)
                        // history/perf budgets: photo import on an enormous grid
                        // would blow the 250k-bead history cap in one step
                        if (cols * rows > 120000) { showToast('Canvas too large to import a photo — try a smaller artwork'); return }
                        setShowPhotoImport(true)
                      }}
                    >Import photo as beads</button>
                    <div className="menuDiv" />
                  </>
                )}
                <button className="menuItem" onClick={() => { setShowMenu(false); setShowDetails(true) }}>Artwork Details</button>
                <div className="menuDiv" />
                <button className="menuItem" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <button className="menuItem" onClick={() => setSoundOn(!soundOn)}>
                  {soundOn ? 'Bead sound: on' : 'Bead sound: off'}
                </button>
              </div>
            </>
          )}

          {/* Import photo as beads modal */}
          {showPhotoImport && (
            <PhotoImport
              T={T}
              tech={tech}
              cols={cols}
              rows={rows}
              canvasCm={canvasCm}
              universalPalette={beadLib.length ? beadLib.map((b) => b.color) : DEFAULT_PALETTE}
              onImport={handlePhotoImport}
              onClose={() => setShowPhotoImport(false)}
            />
          )}

          {/* Artwork Details modal */}
          {showDetails && (
            <div className="modalScrim" onClick={() => setShowDetails(false)}>
              <div className="detailsModal" onClick={(e) => e.stopPropagation()}>
                <div className="detailsHead">
                  <span className="detailsTitle">Artwork Details</span>
                  <button className="drawerClose" onClick={() => setShowDetails(false)} title="Close">×</button>
                </div>
                <div className="detailsScroll">
                  <div className="card">
                    <div className="cardTitle">Name</div>
                    <Pill value={designName} label="name" text onChange={setDesignName} />
                  </div>
                  <div className="card">
                    <div className="cardTitle">Canvas size</div>
                    <SizeFields canvasCm={canvasCm} setCanvasCm={setCanvasCm} unit={unit} setUnit={setUnit} />
                    <div className="cardTitle small">{cols} × {rows} beads</div>
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
                    <div className="cardTitle small">Bead spacing</div>
                    <div className="brushRow">
                      <span className="brushLabel">Spaced</span>
                      <input className="slider" type="range" min="0" max="1" step="0.05" value={pack} onChange={(e) => setPack(+e.target.value)} />
                      <span className="brushLabel">Packed</span>
                    </div>
                  </div>
                  <div className="drawerInfo">
                    {cols} × {rows} grid · {canvasCm.w}×{canvasCm.h} cm · bead {beadMM.w}×{beadMM.h} mm
                    {' · '}{layers.reduce((n, l) => n + (l.beads ? l.beads.size : 0), 0).toLocaleString()} placed · v{BUILD_ID}
                    {recovered && (
                      <span style={{ color: '#c98a2c', fontWeight: 700 }}>
                        {` · last crash: ${recovered.action} · ${recovered.beads} beads`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* colour picker panel — opens from the toolbar colour dot */}
          {showColor && (
            <>
              <div className="menuScrim" onClick={() => setShowColor(false)} />
              <div className="colorPanel">
                <div className="cpHead">
                  <span className="cpTitle">Colours</span>
                  <button className="drawerClose" onClick={() => setShowColor(false)} title="Close">×</button>
                </div>
                <ColorPicker color={color} onChange={setColor} />
                {recentColors.length > 0 && (
                  <>
                    <div className="cpLabel">History</div>
                    <div className="cpBox">
                      {recentColors.slice(0, 8).map((c, i) => (
                        <button key={i} className={`cpSw ${c === color ? 'on' : ''}`} style={{ background: c }} onClick={() => setColor(c)} title={c} />
                      ))}
                    </div>
                  </>
                )}
                <div className="cpPalHead">
                  <span className="cpLabel">Bead library</span>
                  {!inLibrary(color) && (
                    <button className="cpNew" onClick={addCurrentToLibrary} title="Add the current colour to the bead library">+ Add current</button>
                  )}
                </div>
                {beadLib.length > 0 && (
                  <div className="cpBox">
                    {beadLib.map((b) => (
                      <button
                        key={b.id}
                        className={`cpSw ${b.color === color ? 'on' : ''}`}
                        style={{ background: b.color }}
                        onClick={() => setColor(b.color)}
                        title={b.name || b.color}
                      />
                    ))}
                  </div>
                )}
                <div className="cpPalHead">
                  <span className="cpLabel">Colour palette</span>
                  <button className="cpNew" onClick={addPalette} title="New palette from the current colour">+ New</button>
                </div>
                <div className="cpPalList">
                  {savedPalettes.map((p) => {
                    const editing = editPaletteId === p.id
                    return (
                      <div
                        className={`cpPal ${p.id === activePaletteId ? 'active' : ''}`}
                        key={p.id}
                        onClick={() => setActivePaletteId(p.id)}
                      >
                        <div className="cpPalTop">
                          {editing ? (
                            <input
                              className="cpPalName editing"
                              value={p.name}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => renamePalette(p.id, e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
                              title="Tap to rename"
                            />
                          ) : (
                            <span className="cpPalName">{p.name}</span>
                          )}
                          <button
                            className={`cpPalEdit ${editing ? 'on' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setEditPaletteId(editing ? null : p.id) }}
                          >{editing ? 'Done' : 'Edit'}</button>
                          <button className="cpPalDel" onClick={(e) => { e.stopPropagation(); deletePalette(p.id) }} title="Delete palette">×</button>
                        </div>
                        <div className="cpPalRow">
                          {p.colors.map((c, j) => (
                            <button
                              key={j}
                              className={`cpSw ${editing ? 'rm' : c === color ? 'on' : ''}`}
                              style={{ background: c }}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (editing) removeFromPalette(p.id, j)
                                else { setColor(c); setActivePaletteId(p.id) }
                              }}
                              title={c}
                            >{editing ? '×' : ''}</button>
                          ))}
                          {!editing && p.colors.length < 8 && (
                            <button className="cpSw add" onClick={(e) => { e.stopPropagation(); addToPalette(p.id) }} title="Add the current colour">+</button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

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
                <div className="galleryHeadBtns">
                  <button className="ghost" onClick={() => setShowLibrary(true)}>Bead library</button>
                  <button className="primary newBtn" onClick={() => setChooser(true)}>+ New artwork</button>
                </div>
              </div>
              {artworks.length === 0 ? (
                <div className="galleryEmpty">No artworks yet.</div>
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
                <button className="ghost half" onClick={() => setExportPick(new Set())} disabled={!artworks.length}>Export file</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Universal bead library — the studio's real bead colours, curated here
          (gallery), pickable from the editor's colour panel in every artwork. */}
      {showLibrary && (
        <div className="modalScrim" onClick={() => setShowLibrary(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalTitle">BEAD LIBRARY</div>
            <div className="libHint">
              All the bead colours you stock. Every artwork's palettes can pick from these.
            </div>
            <div className="pickList">
              {beadLib.length === 0 && <div className="libEmpty">No colours yet — add your bead stock below.</div>}
              {beadLib.map((b) => (
                <div className="libRow" key={b.id}>
                  <input
                    type="color"
                    className="libSw"
                    value={b.color}
                    onChange={(e) => updateLibColor(b.id, { color: e.target.value })}
                    title="Edit colour"
                  />
                  <input
                    className="libName"
                    value={b.name}
                    placeholder={b.color}
                    onChange={(e) => updateLibColor(b.id, { name: e.target.value })}
                    title="Name this bead colour"
                  />
                  <button className="libDel" onClick={() => removeLibColor(b.id)} title="Remove from library">×</button>
                </div>
              ))}
            </div>
            <div className="libRow libAddRow">
              <input
                type="color"
                className="libSw"
                value={libDraft.color}
                onChange={(e) => setLibDraft((d) => ({ ...d, color: e.target.value }))}
                title="New bead colour"
              />
              <input
                className="libName"
                value={libDraft.name}
                placeholder="Name (optional)"
                onChange={(e) => setLibDraft((d) => ({ ...d, name: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') addLibDraft() }}
              />
              <button className="cpNew" onClick={addLibDraft}>+ Add</button>
            </div>
            <button className="primary" onClick={() => setShowLibrary(false)}>Done</button>
          </div>
        </div>
      )}

      {/* technique chooser — opens from "New artwork". The choice is fixed for
          the new artwork's life. */}
      {/* Export file — pick as many artworks as you like, export them to one file */}
      {exportPick && (
        <div className="modalScrim" onClick={() => setExportPick(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalTitle">EXPORT FILE</div>
            <div className="pickList">
              {[...artworks].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).map((a) => (
                <label className={`pickRow ${exportPick.has(a.id) ? 'on' : ''}`} key={a.id}>
                  <input type="checkbox" checked={exportPick.has(a.id)} onChange={() => togglePick(a.id)} />
                  <span className="pickName">{a.name}</span>
                  <span className="pickMeta">{a.technique} · {a.beads} beads</span>
                </label>
              ))}
            </div>
            <div className="pillRow">
              <button
                className="ghost half"
                onClick={() => setExportPick(exportPick.size === artworks.length ? new Set() : new Set(artworks.map((a) => a.id)))}
              >{exportPick.size === artworks.length ? 'Select none' : 'Select all'}</button>
              <button
                className="primary half"
                disabled={!exportPick.size}
                onClick={() => { exportSelected(exportPick); setExportPick(null) }}
              >Export{exportPick.size ? ` (${exportPick.size})` : ''}</button>
            </div>
            <button className="ghost" onClick={() => setExportPick(null)}>Cancel</button>
          </div>
        </div>
      )}

      {chooser && (
        <div className="modalScrim">
          <div className="modal">
            {!chooser.techId ? (
              <>
                <div className="modalTitle">NEW ARTWORK</div>
                <div className="techGrid">
                  {TECHNIQUES.map((t) => (
                    <button
                      key={t.id}
                      className="techCard"
                      onClick={() => setChooser({ techId: t.id })}
                    >
                      <span className="techName">{t.label}</span>
                      <span className="techDesc">
                        {t.id === '3bead' ? 'Kutch 3-bead weave' : 'Loom / square-stitch'}
                      </span>
                    </button>
                  ))}
                </div>
                <button className="ghost" onClick={() => setChooser(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="modalTitle">CANVAS &amp; BEADS</div>
                <div className="card">
                  <div className="cardTitle">Canvas size</div>
                  <SizeFields canvasCm={canvasCm} setCanvasCm={setCanvasCm} unit={unit} setUnit={setUnit} />
                  <div className="cardTitle small">{cols} × {rows} beads</div>
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
                </div>
                <button className="primary" onClick={() => createArtwork(chooser.techId)}>Create artwork</button>
                <button className="ghost" onClick={() => setChooser(true)}>Back</button>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Lock the whole app to the viewport — position:fixed on the root elements
           stops iOS Safari from ever scrolling the page (address-bar drag, rubber
           band). All scrolling happens inside panels, never on the page. */
        html, body, #root {
          margin: 0; width: 100%; height: 100%;
          position: fixed; inset: 0; overflow: hidden;
          overscroll-behavior: none;
        }
        body {
          background: ${T.bg};
          color: ${T.ink};
          font-family: ${T.mono};
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
        .app { display: flex; width: 100vw; height: 100vh; height: 100dvh; overflow: hidden; }

        /* floating swatch following the pointer during a colour drag */
        .dragGhost {
          position: fixed; z-index: 40; width: 30px; height: 30px;
          border-radius: 50%; pointer-events: none;
          transform: translate(-50%, -130%);
          border: 2px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.45);
        }
        .stage {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; min-height: 0;
        }
        /* fixed Figma/Photoshop-style pasteboard: fills the work area, no
           scrollbars. The viewport-sized canvas fills it; pan/zoom is a transform.
           Flat charcoal surround (Figma "Beads-UI") — a neutral dark ground so it
           never biases the bead colours the designer is judging. */
        .pasteboard {
          position: relative; flex: 1; min-height: 0; overflow: hidden;
          background: ${T.bg};
        }
        .board { display: block; touch-action: none; cursor: crosshair; }
        .board.grab { cursor: grab; }
        /* ghost overlay sits exactly over the board; clicks pass through to it */
        .overlay {
          position: absolute; top: 0; left: 0;
          pointer-events: none; touch-action: none;
        }
        .popfx { z-index: 1; } /* over the board, under all the floating chrome */

        /* ── two floating toolbar pills (Figma canvas screen) ── */
        .tbPill {
          position: absolute; top: 14px; height: 48px;
          display: flex; align-items: center; gap: 4px; padding: 0 8px;
          background: ${T.panel}; border-radius: ${T.radius}px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.28); z-index: 15;
        }
        .tbLeft { left: 14px; }
        .tbRight { right: 14px; }
        /* editable artwork title, sitting above the canvas top-left */
        .canvasName {
          position: absolute; top: 72px; left: 22px; z-index: 11;
          width: auto; max-width: 40vw; background: none; border: none; outline: none;
          color: ${T.light}; font-family: ${T.mono}; font-size: 20px;
          letter-spacing: 0.01em; padding: 2px 6px; border-radius: 6px;
          white-space: nowrap; display: inline-block; cursor: default;
        }
        .canvasName::placeholder { color: ${T.light}; }
        .canvasName.editing {
          width: 200px; cursor: text; color: ${T.ink};
          background: ${T.pill}; box-shadow: inset 0 0 0 1px ${T.accent};
        }
        /* bigger touch targets: the icon stays the same, the tappable box grows */
        .tbIcon {
          width: 42px; height: 42px; display: flex; align-items: center;
          justify-content: center; border: none; background: none;
          color: ${T.inkSoft}; border-radius: 10px; cursor: pointer; transition: all 0.12s;
        }
        @media (hover: hover) { .tbIcon:hover { color: ${T.ink}; background: rgba(128,128,128,0.16); } }
        .tbIcon.on { color: ${T.ink}; background: rgba(128,128,128,0.30); }
        .tbColor {
          position: relative; width: 30px; height: 30px; margin-left: 6px; padding: 0;
          border: 2px solid rgba(255,255,255,0.55); border-radius: 50%;
          cursor: pointer; touch-action: none;
        }
        /* invisible ring extends the tap area beyond the 30px dot */
        .tbColor::after { content: ''; position: absolute; inset: -7px; border-radius: 50%; }
        .tbColor.on { box-shadow: 0 0 0 2px ${T.accent}; }

        /* ── left brush-size rail ── */
        .brushRail {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 18px 10px; background: ${T.panel}; border-radius: ${T.radius}px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.22); z-index: 12;
        }
        /* the input is a wide (40px) touch target; the visible track is a thin
           strip painted down its centre, so it's easy to grab yet still slim. */
        .vSlider {
          -webkit-appearance: none; appearance: none;
          writing-mode: vertical-lr; direction: rtl;
          width: 40px; height: 320px; max-height: 48vh;
          background: transparent;
          background-image: linear-gradient(${T.track}, ${T.track});
          background-size: 10px 100%; background-position: center; background-repeat: no-repeat;
          outline: none; cursor: pointer; touch-action: none;
        }
        .vSlider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 34px; height: 26px; border-radius: 20px; background: ${T.thumb};
          border: none; cursor: pointer;
        }
        .vSlider::-moz-range-track { background: transparent; }
        .vSlider::-moz-range-thumb {
          width: 34px; height: 26px; border: none; border-radius: 20px;
          background: ${T.thumb}; cursor: pointer;
        }
        .brushRailVal { font-family: ${T.mono}; font-size: 12px; color: ${T.ink}; }

        /* ── right colour rail (the palette) ── */
        .paletteRail {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 14px 12px; background: ${T.panel}; border-radius: ${T.radius}px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.22); z-index: 12;
          max-height: 86%; overflow-y: auto; -webkit-overflow-scrolling: touch;
        }
        .railSw {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%; cursor: pointer;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.18);
          touch-action: none;
        }
        .railSw.on { border-color: ${T.ink}; }
        .railAdd {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.32);
          color: ${T.inkSoft}; font-size: 20px; line-height: 1; cursor: pointer;
        }
        .railAdd:hover { color: ${T.ink}; background: rgba(255,255,255,0.12); }

        /* ── undo / redo (bottom-left) ── */
        .undoRedo { position: absolute; left: 14px; bottom: 14px; display: flex; gap: 8px; z-index: 12; }
        .undoRedo button {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          border: none; background: ${T.panel}; color: ${T.inkSoft};
          border-radius: 10px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        @media (hover: hover) { .undoRedo button:hover { color: ${T.ink}; background: ${T.hoverPill}; } }

        .zoomCtl {
          position: absolute; right: 14px; bottom: 14px;
          display: flex; align-items: center; gap: 2px;
          background: ${T.panel}; border-radius: ${T.radius}px; padding: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2); z-index: 12;
        }
        .zoomCtl button {
          border: none; background: none; color: ${T.ink}; cursor: pointer;
          font-family: ${T.mono}; font-size: 15px; width: 40px; height: 40px;
          border-radius: 8px;
        }
        @media (hover: hover) { .zoomCtl button:hover { background: ${T.hoverPill}; } }
        .zoomCtl .zval { width: 56px; font-size: 12px; }

        /* image-adjust mode banner */
        .adjustBar {
          position: absolute; top: 74px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 12px;
          background: ${T.panelSolid}; border: 1px solid ${T.accent};
          border-radius: ${T.radius}px; padding: 8px 12px;
          font-family: ${T.mono}; font-size: 9px; letter-spacing: 0.08em;
          color: ${T.ink}; white-space: nowrap; z-index: 16;
        }
        .adjustBar button {
          border: none; background: ${T.accent}; color: #fff; cursor: pointer;
          font-family: ${T.mono}; font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; padding: 6px 14px; border-radius: 4px;
        }

        /* ── selection tools — compact 2-row bar (Figma 52:792) ── */
        .selPanel {
          position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%);
          display: flex; flex-direction: column; gap: 8px; z-index: 16;
          background: ${T.bg}; border-radius: ${T.radius}px; padding: 14px 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.45);
        }
        .selRow { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .selPatternLbl {
          font-family: ${T.mono}; font-size: 15px; color: ${T.light};
          width: 64px; flex-shrink: 0;
        }
        .selChip {
          border: none; background: ${T.panel}; color: ${T.ink}; cursor: pointer;
          border-radius: ${T.radius}px; padding: 6px 16px; font-family: ${T.mono};
          font-size: 15px; white-space: nowrap;
        }
        .selChip:hover:not(:disabled) { background: ${T.hoverPill}; }
        .selChip:disabled { opacity: 0.4; cursor: not-allowed; }

        /* mirror preview: a ✓ centred on each of the 4 ghost copies */
        .mirrorPick {
          position: absolute; z-index: 17; transform: translate(-50%, -50%);
          width: 40px; height: 40px; border-radius: 50%; border: 2px solid #fff;
          background: ${T.accent}; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
        }
        .mirrorPick:hover { transform: translate(-50%, -50%) scale(1.08); }
        .floatCancel {
          position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%);
          z-index: 17; border: none; background: ${T.bg}; color: ${T.ink};
          cursor: pointer; border-radius: ${T.radius}px; padding: 10px 22px;
          font-family: ${T.mono}; font-size: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.45);
        }
        /* placement confirm: ✓ / ✗ floating above the dragged design */
        .placeConfirm {
          position: absolute; z-index: 17; transform: translate(-50%, -150%);
          display: flex; gap: 8px;
        }
        .placeBtn {
          width: 42px; height: 42px; border-radius: 50%; border: 2px solid #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45); font-size: 22px; line-height: 1;
        }
        .placeBtn.ok { background: ${T.accent}; color: #fff; }
        .placeBtn.no { background: ${T.panelSolid}; color: ${T.ink}; }

        /* ── layers panel (Figma 52:685) ── */
        .layersPanel {
          position: absolute; right: 92px; top: 74px; bottom: 14px;
          width: 420px; max-width: 76vw;
          display: flex; flex-direction: column; gap: 12px;
          background: ${T.bg}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 16px;
          box-shadow: 0 14px 36px rgba(0,0,0,0.5); z-index: 20;
          animation: popIn 0.16s ease-out;
        }
        .lpHead { display: flex; align-items: center; justify-content: space-between; }
        .lpTitle { font-family: ${T.mono}; font-size: 28px; color: ${T.ink}; }
        .lpHeadBtns { display: flex; align-items: center; gap: 4px; }
        .lpAddBtn {
          border: none; background: none; color: ${T.ink}; cursor: pointer;
          width: 40px; height: 40px; border-radius: 8px; font-size: 26px; line-height: 1;
          display: flex; align-items: center; justify-content: center; padding: 0;
        }
        .lpAddBtn:hover { background: rgba(255,255,255,0.1); }
        .lpImgBtn { color: ${T.inkSoft}; }
        .lpImgBtn:hover { color: ${T.ink}; }
        .lpList {
          flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8px;
          overflow-y: auto; -webkit-overflow-scrolling: touch;
        }
        /* deselected rows are a dull dark grey; the SELECTED row is bright/light */
        .lpRow {
          flex-shrink: 0; display: flex; align-items: center; gap: 12px;
          height: 64px; padding: 0 14px 0 8px; border-radius: 8px; cursor: pointer;
          background: ${T.rowBg}; touch-action: none; -webkit-touch-callout: none;
          -webkit-user-select: none; user-select: none;
        }
        .lpRow.active { background: ${T.rowActive}; }
        .lpRow.dragging {
          position: relative; z-index: 3; box-shadow: 0 8px 22px rgba(0,0,0,0.45);
          cursor: grabbing;
        }
        .lpThumb {
          flex-shrink: 0; width: 56px; height: 44px; border-radius: 6px;
          background: #4a4a48; overflow: hidden; padding: 0; border: none;
          display: flex; align-items: center; justify-content: center;
        }
        .lpThumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lpThumbColor { cursor: pointer; }
        .lpThumbColor::-webkit-color-swatch-wrapper { padding: 0; }
        .lpThumbColor::-webkit-color-swatch { border: none; border-radius: 6px; }
        /* text + icons: light on the dull deselected rows, dark on the bright active row */
        .lpName {
          flex: 1; min-width: 0; font-family: ${T.mono}; font-size: 17px;
          color: ${T.rowInk}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lpRow.active .lpName { color: ${T.rowActiveInk}; }
        .lpRowIcon {
          flex-shrink: 0; border: none; background: none; cursor: pointer;
          color: ${T.rowInk}; display: flex; align-items: center; justify-content: center;
          padding: 0; width: 40px; height: 40px; border-radius: 8px;
        }
        .lpRow.active .lpRowIcon { color: ${T.rowActiveInk}; }
        @media (hover: hover) { .lpRowIcon:hover { background: rgba(128,128,128,0.18); } }
        .lpEditBtn {
          flex-shrink: 0; border: none; background: none; color: ${T.rowInk}; cursor: pointer;
          width: 40px; height: 40px; border-radius: 8px; padding: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lpRow.active .lpEditBtn:not(.on) { color: ${T.rowActiveInk}; }
        @media (hover: hover) { .lpEditBtn:hover { background: rgba(128,128,128,0.18); } }
        .lpEditBtn.on { background: ${T.accent}; color: #fff; }
        .lpEditBtn:disabled { opacity: 0.4; cursor: not-allowed; }
        /* group header row + indented member rows (Procreate folders) */
        .lpGroupRow { background: ${T.pill}; }
        .lpChevron {
          width: 18px; text-align: center; color: ${T.inkSoft}; font-size: 12px;
          transition: transform 0.12s ease; flex-shrink: 0;
        }
        .lpChevron.open { transform: rotate(90deg); }
        .lpGroupCount { color: ${T.inkSoft}; font-size: 12px; }
        .lpRow.inGroup { margin-left: 18px; }
        .lpOpacity {
          display: flex; align-items: center; gap: 10px; padding-top: 4px;
        }
        .lpOpLabel { font-family: ${T.mono}; font-size: 14px; color: ${T.inkSoft}; }
        /* bottom action bar: light strip, dark text, dividers */
        .lpBar {
          flex-shrink: 0; display: flex; align-items: center;
          background: ${T.artboard}; border-radius: 8px; height: 48px; overflow: hidden;
        }
        .lpBar button {
          flex: 1; min-width: 0; border: none; background: none; color: ${T.darkInk};
          cursor: pointer; height: 100%; padding: 0 4px;
          font-family: ${T.mono}; font-size: 14px;
        }
        @media (hover: hover) { .lpBar button:hover:not(:disabled) { background: rgba(0,0,0,0.06); } }
        /* .on must beat :hover (incl. iOS sticky hover) so Alpha lock turns green at once */
        .lpBar button.on { background: ${T.accent} !important; color: #fff !important; }
        .lpBar button:disabled { opacity: 0.35; cursor: not-allowed; }
        .lpBarDiv { width: 1px; height: 22px; background: rgba(51,51,50,0.25); flex-shrink: 0; }

        /* active-layer-not-editable banner — floats under the toolbar */
        .lockNote {
          position: absolute; top: 74px; left: 50%; transform: translateX(-50%);
          background: ${T.panelSolid}; border: 1px solid ${T.accent};
          border-radius: ${T.radius}px; padding: 8px 12px;
          font-family: ${T.mono}; font-size: 10px; letter-spacing: 0.04em;
          color: ${T.ink}; line-height: 1.5; z-index: 16; white-space: nowrap;
        }
        .toast {
          position: absolute; left: 50%; bottom: 64px; transform: translateX(-50%);
          background: ${T.panelSolid}; border: 1px solid ${T.accent};
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
        .buildTag {
          margin-left: 10px; font-family: ${T.mono}; font-size: 10px;
          letter-spacing: 0.08em; color: ${T.inkSoft}; opacity: 0.7;
        }

        /* ── ☰ dropdown menu ── */
        .menuScrim { position: absolute; inset: 0; z-index: 30; }
        .menuPop {
          position: absolute; top: 62px; left: 20px; width: 208px; z-index: 31;
          display: flex; flex-direction: column; padding: 6px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; box-shadow: 0 12px 30px rgba(0,0,0,0.45);
          animation: popIn 0.14s ease-out;
        }
        @keyframes popIn {
          from { transform: translateY(-6px); opacity: 0.4; }
          to { transform: none; opacity: 1; }
        }
        .menuItem {
          border: none; background: none; color: ${T.ink}; cursor: pointer;
          text-align: left; padding: 11px 12px; border-radius: 6px;
          font-family: ${T.mono}; font-size: 15px; letter-spacing: 0.01em;
        }
        .menuItem:hover { background: ${T.hoverPill}; }
        .menuItem:disabled { opacity: 0.4; cursor: not-allowed; }
        .menuDiv { height: 1px; background: ${T.line}; margin: 2px 8px; }

        /* ── Artwork Details modal ── */
        .detailsModal {
          width: 100%; max-width: 544px; max-height: 84vh;
          display: flex; flex-direction: column;
          background: ${T.panel}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; box-shadow: 0 20px 60px rgba(0,0,0,0.55);
          animation: popIn 0.16s ease-out; overflow: hidden;
        }
        .detailsHead {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px; border-bottom: 1px solid ${T.line};
        }
        .detailsTitle {
          font-family: ${T.serif}; font-size: 26px; font-weight: 500;
          color: ${T.ink}; letter-spacing: 0.01em;
        }
        .detailsScroll {
          flex: 1 1 auto; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch;
          display: flex; flex-direction: column; gap: 12px; padding: 16px 18px 20px;
        }
        .drawerClose {
          border: none; background: none; color: ${T.inkSoft};
          font-size: 26px; line-height: 1; cursor: pointer; padding: 0 4px;
        }
        .drawerClose:hover { color: ${T.ink}; }
        .drawerInfo {
          font-family: ${T.mono}; font-size: 11px; color: ${T.inkSoft};
          line-height: 1.6; letter-spacing: 0.02em; padding: 4px 2px;
        }

        /* ── colour picker panel (Figma 52:607) ── */
        .colorPanel {
          position: absolute; top: 74px; right: 14px; bottom: 14px; width: 340px; max-width: 88vw;
          z-index: 31;
          display: flex; flex-direction: column; gap: 14px; padding: 16px;
          background: ${T.bg}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; box-shadow: 0 14px 36px rgba(0,0,0,0.5);
          overflow-y: auto; -webkit-overflow-scrolling: touch;
          animation: popIn 0.16s ease-out;
        }
        .cpHead { display: flex; align-items: center; justify-content: space-between; }
        .cpTitle { font-family: ${T.mono}; font-size: 28px; color: ${T.ink}; }
        .cpLabel {
          font-family: ${T.mono}; font-size: 18px; color: ${T.inkSoft};
        }
        /* History / palette swatch container (Morii Darker box) */
        .cpBox {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
          background: ${T.pill}; border-radius: 8px; padding: 8px 10px;
        }
        .cpSw {
          width: 30px; height: 30px; border-radius: 50%; cursor: pointer;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.18);
          flex-shrink: 0;
        }
        .cpSw.on { border-color: ${T.ink}; }
        .cpSw.add {
          background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.32);
          color: ${T.inkSoft}; font-size: 16px; line-height: 1;
        }
        .cpSw.add:hover { color: ${T.ink}; background: rgba(255,255,255,0.12); }
        .cpPalHead { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
        .cpNew {
          border: none; background: ${T.pill}; color: ${T.inkSoft}; cursor: pointer;
          border-radius: 6px; padding: 5px 11px; font-family: ${T.mono}; font-size: 14px;
        }
        .cpNew:hover { background: ${T.hoverPill}; color: ${T.ink}; }
        .cpPalList { display: flex; flex-direction: column; gap: 10px; }
        .cpEmpty { font-family: ${T.mono}; font-size: 12px; line-height: 1.5; color: ${T.inkSoft}; }
        .cpPal {
          background: ${T.pill}; border: 1px solid transparent; cursor: pointer;
          border-radius: 8px; padding: 10px 11px; display: flex; flex-direction: column; gap: 9px;
        }
        .cpPal.active { border-color: ${T.accent}; }
        .cpPalTop { display: flex; align-items: center; gap: 6px; }
        .cpPalName {
          flex: 1; min-width: 0; background: none; border: none; outline: none; cursor: default;
          color: ${T.ink}; font-family: ${T.mono}; font-size: 16px; letter-spacing: 0.01em;
          padding: 3px 4px; border-radius: 6px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cpPalName.editing {
          cursor: text; background: ${T.bg}; box-shadow: inset 0 0 0 1px ${T.accent};
        }
        .cpPalEdit {
          flex-shrink: 0; border: none; background: ${T.pill}; color: ${T.inkSoft};
          cursor: pointer; border-radius: 6px; padding: 4px 9px;
          font-family: ${T.mono}; font-size: 12px;
        }
        .cpPalEdit:hover { color: ${T.ink}; }
        .cpPalEdit.on { background: ${T.accent}; color: #fff; }
        .cpPalDel {
          border: none; background: none; color: ${T.inkSoft}; cursor: pointer;
          font-size: 18px; line-height: 1; padding: 0 4px; flex-shrink: 0;
        }
        .cpPalDel:hover { color: ${T.accent}; }
        .cpPalRow { display: flex; flex-wrap: wrap; gap: 6px; }
        .cpSw.rm {
          color: #fff; font-size: 15px; line-height: 1; display: flex;
          align-items: center; justify-content: center;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 0 0 2px rgba(255,255,255,0.5);
        }

        .brand {
          font-size: 26px; font-weight: 500; letter-spacing: 0.01em;
          font-family: ${T.serif}; color: ${T.ink}; display: inline-flex; align-items: center;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${T.accent}; margin-left: 7px;
        }
        .sub { color: ${T.inkSoft}; font-size: 10px; margin-top: 2px;
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
        button:focus-visible, input:focus-visible,
        label:focus-within { outline: 2px solid ${T.accent}; outline-offset: 1px; }

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
        .seg:hover { background: ${T.hoverPill}; }
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
        .savedApply:hover { background: ${T.hoverPill}; }
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
        .ghost:hover, .fileBtn:hover { background: ${T.hoverPill}; }
        .ghost.half { flex: 1; min-width: 0; }
        .primary {
          padding: 14px; border: none; cursor: pointer;
          background: ${T.accent}; color: #ffffff;
          border-radius: ${T.radius}px; font-size: 12px; font-weight: 700;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em;
          transition: opacity 0.12s;
        }
        .primary:hover { opacity: 0.88; }
        .primary.half { flex: 1; min-width: 0; }

        /* export-file picker list */
        .pickList { display: flex; flex-direction: column; gap: 6px; max-height: 46vh; overflow-y: auto; }
        .pickRow {
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          background: ${T.pill}; border: 1px solid transparent; border-radius: 8px; padding: 10px 12px;
        }
        .pickRow.on { border-color: ${T.accent}; }
        .pickRow input { width: 18px; height: 18px; accent-color: ${T.accent}; flex-shrink: 0; cursor: pointer; }
        .pickName {
          flex: 1; min-width: 0; font-family: ${T.mono}; font-size: 15px; color: ${T.ink};
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pickMeta { font-family: ${T.mono}; font-size: 12px; color: ${T.inkSoft}; flex-shrink: 0; }

        /* technique chooser modal */
        .modalScrim {
          position: fixed; inset: 0; z-index: 60; display: flex;
          align-items: center; justify-content: center; padding: 24px;
          background: rgba(51,51,50,0.5);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
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
        .techCard:hover { background: ${T.hoverPill}; border-color: ${T.inkSoft}; }
        .techCard.on { border-color: ${T.accent}; }
        .techName { font-size: 14px; font-weight: 700; color: ${T.ink}; }
        .techDesc { font-family: ${T.mono}; font-size: 10px; line-height: 1.5; color: ${T.inkSoft}; }

        /* My artworks gallery (covers the editor when not editing) */
        .galleryScrim {
          position: fixed; inset: 0; z-index: 50; display: flex;
          align-items: flex-start; justify-content: center; overflow-y: auto;
          padding: 40px 24px; background: ${T.bg};
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
        .artActions button:hover { background: ${T.hoverPill}; }
        .artActions .del:hover { color: #fff; background: ${T.accent}; }
        .galleryFoot { display: flex; gap: 8px; }
        .galleryHint { text-align: center; }

        /* ── universal bead library (gallery modal) ── */
        .galleryHeadBtns { display: flex; gap: 8px; }
        .galleryHeadBtns .ghost { width: auto; padding: 12px 18px; }
        .libHint { font-family: ${T.mono}; font-size: 12px; line-height: 1.5; color: ${T.inkSoft}; }
        .libRow { display: flex; align-items: center; gap: 10px; }
        .libSw {
          width: 40px; height: 34px; padding: 0; border: 1px solid ${T.line};
          border-radius: 8px; background: none; cursor: pointer; flex-shrink: 0;
        }
        .libName {
          flex: 1; min-width: 0; border: none; background: ${T.pill}; color: ${T.ink};
          border-radius: 8px; padding: 8px 10px; font-family: ${T.mono}; font-size: 13px;
        }
        .libName::placeholder { color: ${T.inkSoft}; }
        .libDel {
          border: none; background: none; color: ${T.inkSoft}; cursor: pointer;
          font-size: 18px; line-height: 1; padding: 6px 8px; border-radius: 6px; flex-shrink: 0;
        }
        .libDel:hover { color: #fff; background: ${T.accent}; }
        .libAddRow { padding-top: 4px; border-top: 1px solid ${T.line}; }
        .libAddRow .cpNew { flex-shrink: 0; }
        .libEmpty { font-family: ${T.mono}; font-size: 12px; color: ${T.inkSoft}; text-align: center; padding: 10px 0; }
      `}</style>
    </div>
  )
}

// Canvas-size fields with an mm / cm / in unit toggle. canvasCm stays the source
// of truth (centimetres, clamped 1–300); this converts to/from the chosen unit
// just for display + entry.
function SizeFields({ canvasCm, setCanvasCm, unit, setUnit }) {
  const toU = (cm) => (unit === 'mm' ? cm * 10 : unit === 'in' ? cm / 2.54 : cm)
  const fromU = (v) => (unit === 'mm' ? v / 10 : unit === 'in' ? v * 2.54 : v)
  const dec = unit === 'in' ? 2 : unit === 'mm' ? 0 : 1
  const disp = (cm) => { const f = 10 ** dec; return Math.round(toU(cm) * f) / f }
  const setDim = (dim, v) => setCanvasCm((c) => ({ ...c, [dim]: clampNum(fromU(v), 1, 300) }))
  const label = unit === 'in' ? 'in' : unit
  return (
    <>
      <div className="unitRow">
        {['mm', 'cm', 'in'].map((u) => (
          <button key={u} className={`unitBtn ${unit === u ? 'on' : ''}`} onClick={() => setUnit(u)}>{u}</button>
        ))}
      </div>
      <div className="sizeRow">
        <Pill value={disp(canvasCm.w)} label={`${label} W`} step={dec ? 0.1 : 1} onChange={(v) => setDim('w', v)} />
        <Pill value={disp(canvasCm.h)} label={`${label} H`} step={dec ? 0.1 : 1} onChange={(v) => setDim('h', v)} />
      </div>
      <style jsx>{`
        .unitRow { display: flex; gap: 6px; }
        .unitBtn {
          flex: 1; padding: 7px 6px; border: none; background: ${T.pill}; color: ${T.ink};
          border-radius: 7px; cursor: pointer; font-family: ${T.mono}; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .unitBtn:hover { background: ${T.hoverPill}; }
        .unitBtn.on { background: ${T.active}; color: ${T.activeInk}; }
        .sizeRow { display: flex; gap: 8px; }
      `}</style>
    </>
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

// ---- colour maths for the picker (hex ↔ HSV) ----
function hexToRgb(hex) {
  let h = (hex || '').replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h || '000000', 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
function rgbToHsv(hex) {
  const { r, g, b } = hexToRgb(hex)
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn), d = max - min
  let h = 0
  if (d) {
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max ? d / max : 0, v: max }
}
function hsvToHex(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x } else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x } else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c } else { r = c; b = x }
  const to = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

// Simple Procreate-style colour picker: a saturation/value square + a hue bar.
// `color` is the source of truth (hex); hue is held locally so it doesn't jump
// when the colour goes grey (s/v near 0).
function ColorPicker({ color, onChange }) {
  const cur = rgbToHsv(color)
  const [hue, setHue] = useState(cur.h)
  useEffect(() => {
    const h = rgbToHsv(color)
    if (h.s > 0.03 && h.v > 0.03) setHue(h.h)
  }, [color])
  const svRef = useRef(null)
  const hueRef = useRef(null)
  const downSV = useRef(false)
  const downHue = useRef(false)
  const pickSV = (e) => {
    const r = svRef.current.getBoundingClientRect()
    const x = clampNum((e.clientX - r.left) / r.width, 0, 1)
    const y = clampNum((e.clientY - r.top) / r.height, 0, 1)
    onChange(hsvToHex(hue, x, 1 - y))
  }
  const pickHue = (e) => {
    const r = hueRef.current.getBoundingClientRect()
    const x = clampNum((e.clientX - r.left) / r.width, 0, 1)
    const h = x * 360
    setHue(h)
    onChange(hsvToHex(h, cur.s || 1, cur.v || 1))
  }
  const hueColor = hsvToHex(hue, 1, 1)
  return (
    <div className="cpWrap">
      <div
        className="cpSV"
        ref={svRef}
        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), ${hueColor}` }}
        onPointerDown={(e) => { downSV.current = true; e.currentTarget.setPointerCapture(e.pointerId); pickSV(e) }}
        onPointerMove={(e) => { if (downSV.current) pickSV(e) }}
        onPointerUp={() => { downSV.current = false }}
        onPointerCancel={() => { downSV.current = false }}
      >
        <span className="cpSVThumb" style={{ left: `${cur.s * 100}%`, top: `${(1 - cur.v) * 100}%`, background: color }} />
      </div>
      <div
        className="cpHue"
        ref={hueRef}
        onPointerDown={(e) => { downHue.current = true; e.currentTarget.setPointerCapture(e.pointerId); pickHue(e) }}
        onPointerMove={(e) => { if (downHue.current) pickHue(e) }}
        onPointerUp={() => { downHue.current = false }}
        onPointerCancel={() => { downHue.current = false }}
      >
        <span className="cpHueThumb" style={{ left: `${(hue / 360) * 100}%`, background: hueColor }} />
      </div>
      <style jsx>{`
        .cpWrap { display: flex; flex-direction: column; gap: 12px; }
        .cpSV {
          position: relative; width: 100%; height: 230px; border-radius: 8px;
          touch-action: none; cursor: crosshair;
        }
        .cpSVThumb {
          position: absolute; width: 16px; height: 16px; border-radius: 50%;
          transform: translate(-50%, -50%); border: 2px solid #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4); pointer-events: none;
        }
        .cpHue {
          position: relative; width: 100%; height: 16px; border-radius: 8px;
          touch-action: none; cursor: pointer;
          background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
        }
        .cpHueThumb {
          position: absolute; top: 50%; width: 18px; height: 18px; border-radius: 50%;
          transform: translate(-50%, -50%); border: 2px solid #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4); pointer-events: none;
        }
      `}</style>
    </div>
  )
}
