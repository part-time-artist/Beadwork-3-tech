import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import {
  makeGeometry,
  beadCountFromCm,
  beadAt,
  nearestBead,
  beadPath,
  beadExists,
} from './lib/geometry'
import { renderFullChart, renderLegend } from './lib/chart'

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

const DEFAULT_PALETTE = [
  '#7A2E2E', '#A8443A', '#C97B5A', '#E3C9A6', '#F2ECE0',
  '#2E2B26', '#5B5346', '#8A8478', '#3C5148', '#6E8B7A',
  '#2B3A55', '#4F6D8C', '#9DB4C0', '#D8B4A0', '#FFFFFF',
]

const key = (c, r) => `${c},${r}`

// The only two bead sizes. Both 4:5 (width:height); stated size = bead width.
// "1 mm" is 1.05mm so the row pitch (PACK_X × w = 1.67mm) gives exactly
// 6 beads = 3 pairs per cm (locked iPad-pass decision #5).
const BEAD_SIZES = [
  { label: '1 mm', w: 1.05, h: 1.3125 },
  { label: '3 mm', w: 3, h: 3.75 },
]

const HISTORY_MAX = 50 // undo steps (one stroke / fill / selection op = one step)

export default function Home() {
  // ---- physical model ----
  // Two fixed bead sizes, both 4:5 ratio (width:height). Stated size = bead width.
  const [beadMM, setBeadMM] = useState({ w: 3, h: 3.75 }) // 3 mm default
  const [canvasCm, setCanvasCm] = useState({ w: 6, h: 6 }) // physical canvas (cm)

  // derived bead/row counts from the physical sizes (same packing as screen)
  const { cols, rows } = useMemo(
    () =>
      beadCountFromCm({
        canvasWcm: canvasCm.w,
        canvasHcm: canvasCm.h,
        beadWmm: beadMM.w,
        beadHmm: beadMM.h,
      }),
    [canvasCm, beadMM]
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
    () => makeGeometry({ Bw, Bh, cols, rows }),
    [Bw, Bh, cols, rows]
  )

  // view transform: screen px = doc * scale + t.  viewport = pasteboard size.
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0 })
  const [viewport, setViewport] = useState({ w: 1, h: 1 })

  // ---- design data ----
  const [beads, setBeads] = useState(() => new Map())
  const [tool, setTool] = useState('draw') // draw | erase | select
  const [color, setColor] = useState('#7A2E2E')
  const [orient, setOrient] = useState('woven') // uniform | woven (tilted 3-bead)
  const [brush, setBrush] = useState(1) // brush radius in beads
  const [recentColors, setRecentColors] = useState([]) // up to 5 recently used
  const [selection, setSelection] = useState(() => new Set()) // selected bead keys
  const [marquee, setMarquee] = useState(null) // live select rectangle (doc coords)
  const [clipboard, setClipboard] = useState(null) // copied beads (relative)

  const pushRecent = useCallback((c) => {
    setRecentColors((prev) => [c, ...prev.filter((x) => x !== c)].slice(0, 5))
  }, [])

  // ---- undo / redo ----
  // History stores whole bead Maps (they're replaced immutably, so pushing the
  // old reference is free). Strokes snapshot once at pointer-down (endDrag
  // commits it only if the stroke changed something); one-shot edits (fill,
  // selection ops, clear) go through `commit`, which snapshots only on change.
  const beadsRef = useRef(beads)
  useEffect(() => { beadsRef.current = beads }, [beads])
  const undoStack = useRef([])
  const redoStack = useRef([])
  const strokeBase = useRef(null) // beads Map at stroke start

  const pushHistory = (prev) => {
    undoStack.current.push(prev)
    if (undoStack.current.length > HISTORY_MAX) undoStack.current.shift()
    redoStack.current = []
  }

  const commit = useCallback((updater) => {
    setBeads((prev) => {
      const next = updater(prev)
      if (next === prev) return prev
      pushHistory(prev)
      return next
    })
  }, [])

  const undo = useCallback(() => {
    if (!undoStack.current.length) return
    redoStack.current.push(beadsRef.current)
    setBeads(undoStack.current.pop())
  }, [])
  const redo = useCallback(() => {
    if (!redoStack.current.length) return
    undoStack.current.push(beadsRef.current)
    setBeads(redoStack.current.pop())
  }, [])

  // desktop keyboard: Ctrl/⌘+Z undo, Ctrl/⌘+Shift+Z redo
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z') return
      if (e.target !== document.body) return // don't steal from inputs
      e.preventDefault()
      if (e.shiftKey) redo()
      else undo()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  // Per-cell tilt (radians). The weave groups beads in 3s: an upright apex with
  // two base beads leaning outward beneath it. On the half-offset lattice we
  // render even rows upright and odd-row beads leaning ± by column → the woven
  // herringbone of the real piece (assets/techniques/3 bead technique.jpg).
  const tiltFor = useCallback(
    (col, row) => {
      if (orient !== 'woven') return 0
      if (row % 2 === 0) return 0 // apex: upright
      const A = Math.PI / 4 // ±45° — measured from Frame 3 (the canonical 3-bead unit)
      return col % 2 === 0 ? A : -A // two base beads lean toward the apex above
    },
    [orient]
  )

  // ---- background ----
  const [bg, setBg] = useState({ type: 'transparent', color: '#FFFFFF', image: null })
  const bgImgRef = useRef(null)

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
  const paintBead = useCallback(
    (cell, mode) => {
      if (!cell) return
      setBeads((prev) => {
        const k = key(cell.col, cell.row)
        // bail out when nothing changes so React skips a needless full redraw
        if (mode === 'erase') {
          if (!prev.has(k)) return prev
          const next = new Map(prev)
          next.delete(k)
          return next
        }
        if (prev.get(k) === color) return prev
        const next = new Map(prev)
        next.set(k, color)
        return next
      })
    },
    [color]
  )

  const floodFill = useCallback(
    (cell, useColor = color) => {
      if (!cell) return
      commit((prev) => {
        const target = prev.get(key(cell.col, cell.row)) || null
        if (target === useColor) return prev
        const next = new Map(prev)
        const stack = [cell]
        const seen = new Set()
        while (stack.length) {
          const { col, row } = stack.pop()
          if (col < 0 || col >= cols || row < 0 || row >= rows) continue
          if (!beadExists(col, row)) continue // skip empty apex nodes
          const k = key(col, row)
          if (seen.has(k)) continue
          seen.add(k)
          const cur = prev.get(k) || null
          if (cur !== target) continue // boundary: stop at differently-colored beads
          next.set(k, useColor)
          // staggered neighbours: left/right same row + the 4 nestled diagonals
          const odd = row % 2
          const diagL = odd ? col : col - 1
          const diagR = odd ? col + 1 : col
          stack.push({ col: col - 1, row })
          stack.push({ col: col + 1, row })
          stack.push({ col: diagL, row: row - 1 })
          stack.push({ col: diagR, row: row - 1 })
          stack.push({ col: diagL, row: row + 1 })
          stack.push({ col: diagR, row: row + 1 })
        }
        return next
      })
    },
    [color, cols, rows, commit]
  )

  // beads covered by the brush at doc point (x,y): the bead under the cursor for
  // brush 1, or all existing beads within a radius that grows with brush size.
  const brushCells = useCallback(
    (x, y) => {
      if (brush <= 1) {
        const n = beadAt(geo, x, y)
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
          if (!beadExists(col, row)) continue
          const { cx, cy } = geo.centerFor(col, row)
          const dx = x - cx
          const dy = y - cy
          if (dx * dx + dy * dy <= radius * radius) out.push({ col, row })
        }
      }
      return out
    },
    [brush, geo, Bw, rows, cols]
  )

  const paintBrush = useCallback(
    (x, y, mode) => {
      const cells = brushCells(x, y)
      if (!cells.length) return
      setBeads((prev) => {
        let next = null
        for (const { col, row } of cells) {
          const k = key(col, row)
          if (mode === 'erase') {
            if ((next || prev).has(k)) { next = next || new Map(prev); next.delete(k) }
          } else if ((next || prev).get(k) !== color) {
            next = next || new Map(prev)
            next.set(k, color)
          }
        }
        return next || prev
      })
    },
    [brushCells, color]
  )

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
          if (!beadExists(col, row)) continue
          const { cx, cy } = geo.centerFor(col, row)
          if (cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1) sel.add(key(col, row))
        }
      }
      setSelection(sel)
    },
    [geo, rows, cols]
  )

  const clearSelection = () => setSelection(new Set())

  const recolorSelection = () => {
    if (!selection.size) return
    pushRecent(color)
    commit((prev) => {
      const next = new Map(prev)
      for (const k of selection) next.set(k, color)
      return next
    })
  }

  const deleteSelection = () => {
    if (!selection.size) return
    commit((prev) => {
      const next = new Map(prev)
      for (const k of selection) next.delete(k)
      return next
    })
    clearSelection()
  }

  const copySelection = () => {
    if (!selection.size) return
    let minC = Infinity
    let minR = Infinity
    const cells = []
    for (const k of selection) {
      const fill = beads.get(k)
      if (!fill) continue // copy only filled beads
      const [c, r] = k.split(',').map(Number)
      cells.push({ c, r, color: fill })
      if (c < minC) minC = c
      if (r < minR) minR = r
    }
    if (!cells.length) return
    // even offsets preserve the weave's apex/base parity on paste
    minC -= minC % 2
    minR -= minR % 2
    setClipboard(cells.map(({ c, r, color }) => ({ dc: c - minC, dr: r - minR, color })))
  }

  const pasteClipboard = () => {
    if (!clipboard) return
    const oc = 2
    const or = 2 // place shifted by 2 cells (keeps parity) so it's visible
    commit((prev) => {
      const next = new Map(prev)
      const sel = new Set()
      for (const { dc, dr, color: cc } of clipboard) {
        const c = dc + oc
        const r = dr + or
        if (c < 0 || c >= cols || r < 0 || r >= rows || !beadExists(c, r)) continue
        const k = key(c, r)
        next.set(k, cc)
        sel.add(k)
      }
      setSelection(sel)
      return next
    })
  }

  // ---- canvas drawing ----
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

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
      const { scale, tx, ty } = view
      const docW = geo.width
      const docH = geo.height

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, vw, vh)
      // everything below is in document space (pan + zoom baked into the transform)
      ctx.setTransform(DPR * scale, 0, 0, DPR * scale, tx * DPR, ty * DPR)

      // document background
      if (bg.type === 'solid') {
        ctx.fillStyle = bg.color
        ctx.fillRect(0, 0, docW, docH)
      } else if (bg.type === 'image' && bgImgRef.current) {
        const img = bgImgRef.current
        const s = Math.max(docW / img.width, docH / img.height)
        ctx.drawImage(img, (docW - img.width * s) / 2, (docH - img.height * s) / 2, img.width * s, img.height * s)
      } else if (checkerTile) {
        ctx.fillStyle = ctx.createPattern(checkerTile, 'repeat')
        ctx.fillRect(0, 0, docW, docH)
      }

      // visible cell range — cull off-screen beads so ANY document size stays fast
      const docLeft = -tx / scale
      const docTop = -ty / scale
      const docRight = (vw - tx) / scale
      const docBottom = (vh - ty) / scale
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

      for (let row = r0; row < r1; row++) {
        for (let col = c0; col < c1; col++) {
          if (!beadExists(col, row)) continue
          const { cx, cy } = geo.centerFor(col, row)
          const fill = beads.get(key(col, row))
          if (simple) {
            if (fill) {
              ctx.fillStyle = fill
              ctx.fillRect(cx - Bw / 2, cy - Bh / 2, Bw, Bh)
            }
            continue
          }
          const tilt = tiltFor(col, row)
          if (fill) {
            beadPath(ctx, cx, cy, Bw, Bh, tilt)
            ctx.fillStyle = fill
            ctx.fill()
          } else if (drawOutlines) {
            beadPath(ctx, cx, cy, Bw, Bh, tilt)
            ctx.fillStyle = '#eaeaeb' // very slight grey so empty beads aren't white
            ctx.fill()
            ctx.stroke()
          }
        }
      }

      // selection highlight (accent ring around selected beads)
      if (selection.size) {
        ctx.lineWidth = 2 / scale
        ctx.strokeStyle = T.accent
        for (let row = r0; row < r1; row++) {
          for (let col = c0; col < c1; col++) {
            if (!beadExists(col, row) || !selection.has(key(col, row))) continue
            const { cx, cy } = geo.centerFor(col, row)
            beadPath(ctx, cx, cy, Bw * 1.08, Bh * 1.08, tiltFor(col, row))
            ctx.stroke()
          }
        }
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
    },
    [viewport, view, geo, beads, bg, Bw, Bh, cols, rows, tiltFor, checkerTile, DPR, selection, marquee]
  )

  // size the canvas to the viewport (never to the document)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = Math.max(1, Math.round(viewport.w * DPR))
    canvas.height = Math.max(1, Math.round(viewport.h * DPR))
    canvas.style.width = `${viewport.w}px`
    canvas.style.height = `${viewport.h}px`
  }, [viewport, DPR])

  // redraw whenever the scene changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) drawScene(canvas.getContext('2d'))
  }, [drawScene])

  // fit the document into the viewport, centred
  const fitView = useCallback(() => {
    const { w: vw, h: vh } = viewport
    if (vw < 2 || vh < 2) return
    const margin = 48
    const scale = Math.min((vw - margin) / geo.width, (vh - margin) / geo.height, 4)
    setView({ scale, tx: (vw - geo.width * scale) / 2, ty: (vh - geo.height * scale) / 2 })
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
      const docx = (sx - v.tx) / v.scale
      const docy = (sy - v.ty) / v.scale
      return { scale: ns, tx: sx - docx * ns, ty: sy - docy * ns }
    })
  }, [])

  // wheel = zoom toward cursor (no scrollbars anywhere)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = canvas.getBoundingClientRect()
      zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - r.left, e.clientY - r.top)
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
    }
  }

  const docFromEvent = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left - view.tx) / view.scale,
      y: (e.clientY - rect.top - view.ty) / view.scale,
    }
  }

  const onPointerDown = (e) => {
    e.preventDefault()
    canvasRef.current.setPointerCapture?.(e.pointerId)
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
    if (spaceHeld.current || e.button === 1) {
      panning.current = { x: e.clientX, y: e.clientY }
      return
    }
    const p = docFromEvent(e)
    if (tool === 'select') {
      marqueeRef.current = { x0: p.x, y0: p.y, x1: p.x, y1: p.y }
      setMarquee(marqueeRef.current)
      return
    }
    dragging.current = true
    strokeBase.current = beadsRef.current // history: snapshot at stroke start
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
        // pinch: zoom by the distance ratio around the midpoint, pan by the
        // midpoint drift — the doc point between the fingers stays pinched.
        const [a, b] = [...touchPts.current.values()]
        const dist = Math.hypot(b.x - a.x, b.y - a.y) || 1
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const g = pinchRef.current
        setView((v) => {
          const ns = clampNum(v.scale * (dist / g.dist), 0.02, 8)
          const k = ns / v.scale
          return { scale: ns, tx: mx - (g.mx - v.tx) * k, ty: my - (g.my - v.ty) * k }
        })
        pinchRef.current = { dist, mx, my }
        return
      }
      // single finger falls through to the shared pan block
    }
    if (panning.current) {
      const dx = e.clientX - panning.current.x
      const dy = e.clientY - panning.current.y
      panning.current = { x: e.clientX, y: e.clientY }
      setView((v) => ({ ...v, tx: v.tx + dx, ty: v.ty + dy }))
      return
    }
    if (marqueeRef.current) {
      const p = docFromEvent(e)
      marqueeRef.current = { ...marqueeRef.current, x1: p.x, y1: p.y }
      setMarquee(marqueeRef.current)
      return
    }
    if (dragging.current) {
      const p = docFromEvent(e)
      paintBrush(p.x, p.y, tool)
    }
  }

  const endDrag = () => {
    if (marqueeRef.current) {
      finalizeSelection(marqueeRef.current)
      marqueeRef.current = null
      setMarquee(null)
    }
    // history: commit the stroke as ONE undo step, only if it changed beads
    if (strokeBase.current && strokeBase.current !== beadsRef.current) {
      pushHistory(strokeBase.current)
    }
    strokeBase.current = null
    dragging.current = false
    panning.current = null
  }

  const liftTouch = (e, { allowTap }) => {
    touchPts.current.delete(e.pointerId)
    if (touchPts.current.size === 0) {
      const t = tapRef.current
      tapRef.current = null
      pinchRef.current = null
      panning.current = null
      if (allowTap && t && t.valid && !t.moved && Date.now() - t.t0 < 350) {
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

  // drag a colour swatch from the palette onto the canvas to flood-fill a region.
  // Use nearestBead so a drop in a gap still fills the closest bead's region.
  const onCanvasDragOver = (e) => e.preventDefault()
  const onCanvasDrop = (e) => {
    e.preventDefault()
    const dropColor = e.dataTransfer.getData('text/plain')
    if (!dropColor) return
    const { x, y } = docFromEvent(e)
    floodFill(nearestBead(geo, x, y), dropColor)
  }

  // ---- background image upload ----
  const onBgImage = (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      bgImgRef.current = img
      setBg((b) => ({ ...b, type: 'image', image: url }))
    }
    img.src = url
  }

  // ---- export (print-ready chart: outlined beads + guides + numbers + legend) ----
  const chartBackground = () => {
    if (exportBg === 'transparent') return { type: 'transparent' }
    if (bg.type === 'image') return { type: 'image', img: bgImgRef.current }
    return bg
  }

  const chartArgs = () => ({
    beads,
    cols,
    rows,
    tiltFor,
    printBeadMm,
    beadRatio,
    background: chartBackground(),
  })

  const exportPNG = () => {
    const chart = renderFullChart(chartArgs())
    const legend = renderLegend(beads)
    const gap = 24
    const out = document.createElement('canvas')
    out.width = Math.max(chart.width, legend.width)
    out.height = chart.height + gap + legend.height
    const ctx = out.getContext('2d')
    if (exportBg !== 'transparent') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, out.width, out.height)
    }
    ctx.drawImage(chart, 0, 0)
    ctx.drawImage(legend, 0, chart.height + gap)
    const link = document.createElement('a')
    link.download = 'beadwork-chart.png'
    link.href = out.toDataURL('image/png')
    link.click()
  }

  const clearCanvas = () => {
    if (window.confirm('Clear the whole canvas?')) {
      commit((prev) => (prev.size ? new Map() : prev))
    }
  }

  // ---- save artwork: persist in the tool so it reopens for editing next time ----
  const [savedAt, setSavedAt] = useState(null)
  const saveArtwork = () => {
    const data = { version: 1, canvasCm, beadMM, palette, bg, beads: [...beads.entries()] }
    try {
      localStorage.setItem(DESIGN_KEY, JSON.stringify(data))
      setSavedAt(Date.now())
    } catch (e) {
      window.alert('Could not save — the design may be too large for browser storage.')
    }
  }

  // restore the last saved artwork on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DESIGN_KEY)
      if (!raw) return
      const d = JSON.parse(raw)
      if (d.canvasCm) setCanvasCm(d.canvasCm)
      // snap to the nearest offered size (older saves may hold the removed 1.5mm)
      if (d.beadMM) {
        const s = BEAD_SIZES.reduce((a, b) =>
          Math.abs(b.w - d.beadMM.w) < Math.abs(a.w - d.beadMM.w) ? b : a
        )
        setBeadMM({ w: s.w, h: s.h })
      }
      if (Array.isArray(d.palette)) setPalette(d.palette)
      if (d.bg) setBg(d.bg)
      if (Array.isArray(d.beads)) setBeads(new Map(d.beads))
    } catch (e) {}
  }, [])

  // ---- UI ----

  return (
    <div className="app">
      {/* LEFT panel — tools & document */}
      <aside className="panel left">
        <div className="brand">BEADWORK<span className="dot" /></div>
        <div className="sub">3-BEAD TECHNIQUE</div>

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

        {(tool === 'select' || selection.size > 0) && (
          <div className="card selCard">
            <div className="cardTitle">Selection · {selection.size}</div>
            <div className="pillRow">
              <button className="ghost" onClick={recolorSelection} disabled={!selection.size}>Recolour</button>
              <button className="ghost" onClick={deleteSelection} disabled={!selection.size}>Delete</button>
            </div>
            <div className="pillRow">
              <button className="ghost" onClick={copySelection} disabled={!selection.size}>Copy</button>
              <button className="ghost" onClick={pasteClipboard} disabled={!clipboard}>Paste</button>
            </div>
            {selection.size > 0 && <button className="ghost" onClick={clearSelection}>Clear selection</button>}
            <div className="hint tip">Drag a box over the beads to select them.</div>
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
          <button className="ghost" onClick={clearCanvas}>Clear canvas</button>
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
        </div>

        <div className="card">
          <div className="cardTitle">Background</div>
          <div className="segmented">
            {[
              ['transparent', 'None'],
              ['solid', 'Colour'],
              ['image', 'Image'],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`seg ${bg.type === id ? 'on' : ''}`}
                onClick={() => setBg((b) => ({ ...b, type: id }))}
              >
                {label}
              </button>
            ))}
          </div>
          {bg.type === 'solid' && (
            <div className="colorTop" style={{ marginTop: 10 }}>
              <input type="color" value={bg.color} onChange={(e) => setBg((b) => ({ ...b, color: e.target.value }))} className="bigSwatch" />
              <Pill value={bg.color} label="hex" text onChange={(v) => setBg((b) => ({ ...b, color: v }))} />
            </div>
          )}
          {bg.type === 'image' && (
            <label className="ghost fileBtn">
              Choose image…
              <input type="file" accept="image/png,image/jpeg" style={{ display: 'none' }} onChange={(e) => onBgImage(e.target.files[0])} />
            </label>
          )}
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
            onDragOver={onCanvasDragOver}
            onDrop={onCanvasDrop}
          />
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
          </div>
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
          {cols} × {rows} BEADS · {canvasCm.w}×{canvasCm.h} CM · BEAD {beadMM.w}×{beadMM.h} MM · {Math.round(view.scale * 100)}%
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
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', c)}
                    onClick={() => setColor(c)}
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
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', c)}
                onClick={() => setColor(c)}
                title={`${c} — click to pick, drag onto canvas to fill`}
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
          <button className="ghost" onClick={saveArtwork}>{savedAt ? 'Saved ✓ — save again' : 'Save artwork'}</button>
          <div className="hint tip">{savedAt ? 'Design saved — reopens here for editing.' : 'Save artwork keeps the design in this browser.'}</div>
        </div>
      </aside>

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
        .app { display: flex; height: 100vh; overflow: hidden; }
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
        .stageInfo {
          flex-shrink: 0; color: ${T.inkSoft}; font-size: 10px; font-family: ${T.mono};
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 9px 16px; border-top: 1px solid ${T.line}; background: ${T.bg};
        }

        .panel {
          width: 252px; flex-shrink: 0;
          background: ${T.panel};
          background-image: radial-gradient(${T.line} 1px, transparent 1px);
          background-size: 14px 14px;
          padding: 18px 14px; overflow: hidden;
          display: flex; flex-direction: column; gap: 11px;
        }
        .panel.left { border-right: 1px solid ${T.line}; overflow-y: auto; }
        .panel.right { border-left: 1px solid ${T.line}; }
        /* right panel: cards scroll, the save cluster below stays pinned */
        .panelScroll {
          flex: 1 1 auto; min-height: 0; overflow-y: auto;
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
        .slider { flex: 1; -webkit-appearance: none; appearance: none; height: 3px;
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

        .tabs { display: flex; gap: 6px; }
        .tab {
          flex: 1; height: 40px; border: none; cursor: pointer;
          background: #E7E2D8; color: ${T.inkSoft};
          border-radius: 12px; font-size: 17px; transition: 0.15s;
        }
        .tab.on { background: ${T.active}; color: ${T.activeInk}; }

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
        }
        .swatches { display: flex; flex-wrap: wrap; gap: 7px; }
        .sw {
          width: 28px; height: 28px; border-radius: 9px; cursor: pointer;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
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
        .primary {
          padding: 14px; border: none; cursor: pointer;
          background: ${T.accent}; color: #ffffff;
          border-radius: ${T.radius}px; font-size: 12px; font-weight: 700;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em;
          transition: opacity 0.12s;
        }
        .primary:hover { opacity: 0.88; }
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

// inline-labeled input pill (signature look, spec §7.5)
function Pill({ value, label, onChange, step = 1, text = false }) {
  return (
    <div className="pill">
      <input
        className="pillInput"
        type={text ? 'text' : 'number'}
        value={value}
        step={step}
        onChange={(e) => onChange(text ? e.target.value : parseFloat(e.target.value))}
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
          font-size: 17px; font-weight: 700; color: ${T.ink}; background: none;
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

function clampNum(v, lo, hi) {
  if (isNaN(v)) return lo
  return Math.min(hi, Math.max(lo, v))
}

function ratioLabel(w, h) {
  const g = gcd(Math.round(w * 10), Math.round(h * 10))
  return `${Math.round((w * 10) / g)}:${Math.round((h * 10) / g)}`
}
function gcd(a, b) {
  return b ? gcd(b, a % b) : a
}
