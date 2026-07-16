import { useCallback, useEffect, useRef, useState } from 'react'
import { buildGeo, sampleGrid, quantizeGrid, extractPalette } from './lib/convert'
import { beadExists, beadCountFromCm } from './lib/geometry'
import threeBead from './techniques/threeBead'

// ── DESIGN PREVIEW of the "New artwork — From photo" modal ─────────────────
// This is the conversion dialog exactly as it would appear inside the main
// Beadwork tool: same dark Morii tokens, same modal anatomy as the "Canvas &
// beads" dialog, fully working on the v4 engine. If the design is approved it
// ports into src/App.jsx of the main tool (Phase 2 of the integration plan).

// The studio's stock bead colours — on integration this strip reads the main
// tool's live IndexedDB bead library instead.
const UNIVERSAL_PALETTE = ['#A3B09A', '#A8C97F', '#7BA23F', '#4A875D', '#006E54', '#E0D7C2', '#D8C49A', '#C0BDB6']

const MIN_COLORS = 2
const MAX_COLORS = 16
const MAX_IMG_SIDE = 1400 // downscale huge phone photos before sampling
const MAX_CM = 30 // conversion cap (live-preview speed); the main tool's canvases go bigger

// Same two bead sizes the main tool offers (both 4:5).
const BEAD_SIZES = [
  { key: '1mm', label: '1 mm', w: 1.05, h: 1.3125 },
  { key: '3mm', label: '3 mm', w: 3, h: 3.75 },
]

// The main tool's DARK theme tokens, verbatim (src/App.jsx `DARK`).
const T = {
  accent: '#4a875d', artboard: '#dbdad5', darkInk: '#333332', radius: 8,
  bg: '#333332', panel: '#666664', panelSolid: '#414140',
  ink: '#f7f7f5', inkSoft: '#a8a7a2', light: '#757570', line: '#575757',
  active: '#dbdad5', activeInk: '#333332', pill: '#575757',
  hoverPill: '#757570',
}
const FONT = "'Morii Lipi', -apple-system, 'Segoe UI', sans-serif"

const clampCm = (v) => Math.max(1, Math.min(MAX_CM, v || 1))

const LABEL = {
  fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: T.inkSoft,
}

export default function App() {
  const [imgData, setImgData] = useState(null) // { data, w, h, url }
  const [cmW, setCmW] = useState(10)
  const [cmH, setCmH] = useState(7)
  const [beadKey, setBeadKey] = useState('1mm')
  const [colorCount, setColorCount] = useState(8)
  const [dither, setDither] = useState(true)
  const [extracted, setExtracted] = useState([]) // ranked once per image (stable top-N)
  const [layers, setLayers] = useState([]) // { color, visible } per ranked colour
  const [selLayer, setSelLayer] = useState(null)
  const [converted, setConverted] = useState(null) // { geo, cols, rows, assigned, counts }
  const [stats, setStats] = useState(null)
  const [toast, setToast] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const dragDepth = useRef(0)
  const canvasRef = useRef(null)
  const extractTimer = useRef(null)
  const convertTimer = useRef(null)
  const toastTimer = useRef(null)

  const onFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const s = Math.min(1, MAX_IMG_SIDE / Math.max(img.width, img.height))
      const w = Math.max(1, Math.round(img.width * s))
      const h = Math.max(1, Math.round(img.height * s))
      const cv = document.createElement('canvas')
      cv.width = w
      cv.height = h
      const ctx = cv.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      setImgData({ data: ctx.getImageData(0, 0, w, h).data, w, h, url })
    }
    img.src = url
  }, [])

  // A) Extract ONCE per image at max colours, ranked by importance — the
  // slider slices the top N so layer swaps/hides survive slider moves.
  useEffect(() => {
    if (!imgData) return
    clearTimeout(extractTimer.current)
    extractTimer.current = setTimeout(() => {
      const pal = extractPalette(imgData.data, imgData.w, imgData.h, MAX_COLORS)
      setExtracted(pal)
      setLayers(pal.map((c) => ({ color: c, visible: true })))
      setSelLayer(null)
    }, 90)
    return () => clearTimeout(extractTimer.current)
  }, [imgData])

  const activeN = Math.min(colorCount, extracted.length)
  const sel = selLayer != null && selLayer < activeN ? selLayer : null

  // B) Sample + assign on the PHYSICAL cm grid (photo covers the canvas,
  // centred crop) — identical sizing maths to the main tool.
  useEffect(() => {
    if (!imgData || !activeN) return
    clearTimeout(convertTimer.current)
    convertTimer.current = setTimeout(() => {
      const t0 = performance.now()
      const bead = BEAD_SIZES.find((b) => b.key === beadKey) || BEAD_SIZES[0]
      const { cols, rows } = beadCountFromCm({
        canvasWcm: clampCm(cmW), canvasHcm: clampCm(cmH), beadWmm: bead.w, beadHmm: bead.h,
      })
      const geo = buildGeo(cols, rows, 20, 25)
      const sampled = sampleGrid(imgData.data, imgData.w, imgData.h, geo, cols, rows, 'cover')
      const assigned = quantizeGrid(sampled, geo, cols, rows, extracted.slice(0, activeN), dither)
      const counts = new Array(activeN).fill(0)
      for (const idx of assigned.values()) counts[idx]++
      setConverted({ geo, cols, rows, assigned, counts })
      setStats({ cols, rows, beads: assigned.size, ms: Math.round(performance.now() - t0) })
    }, 90)
    return () => clearTimeout(convertTimer.current)
  }, [imgData, extracted, activeN, dither, cmW, cmH, beadKey])

  // C) Paint — cheap, so eye toggles / swaps re-render without re-quantizing.
  useEffect(() => {
    if (converted) renderBeads(canvasRef.current, converted, layers)
  }, [converted, layers])

  const toggleLayer = (i) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, visible: !l.visible } : l)))
  const setLayerColor = (i, hex) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, color: hex } : l)))
  const matchPhotoShape = () => {
    if (!imgData) return
    setCmH(clampCm(Math.round(clampCm(cmW) * (imgData.h / imgData.w))))
  }
  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }

  const bead = BEAD_SIZES.find((b) => b.key === beadKey) || BEAD_SIZES[0]
  const derived = beadCountFromCm({
    canvasWcm: clampCm(cmW), canvasHcm: clampCm(cmH), beadWmm: bead.w, beadHmm: bead.h,
  })

  const pillBox = {
    display: 'flex', alignItems: 'center', gap: 6, background: T.pill,
    borderRadius: T.radius, padding: '9px 11px', flex: 1,
  }
  const pillInput = {
    width: '100%', minWidth: 0, border: 'none', outline: 'none', background: 'none',
    color: T.ink, fontSize: 14, fontFamily: FONT,
  }
  const pillLabel = { ...LABEL, fontSize: 10, flexShrink: 0 }
  const seg = (on) => ({
    flex: 1, padding: '9px 6px', border: 'none', cursor: 'pointer',
    background: on ? T.active : T.pill, color: on ? T.activeInk : T.ink,
    borderRadius: 9, fontSize: 13, fontWeight: 600, fontFamily: FONT,
  })

  return (
    <div
      style={{
        minHeight: '100vh', background: T.bg, fontFamily: FONT, color: T.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
      onDragEnter={(e) => { e.preventDefault(); dragDepth.current++; setDragOver(true) }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => { if (--dragDepth.current <= 0) { dragDepth.current = 0; setDragOver(false) } }}
      onDrop={(e) => { e.preventDefault(); dragDepth.current = 0; setDragOver(false); onFile(e.dataTransfer.files?.[0]) }}
    >
      {dragOver && (
        <div style={{
          position: 'fixed', inset: 12, zIndex: 90, pointerEvents: 'none',
          border: `2px dashed ${T.ink}`, borderRadius: T.radius,
          background: 'rgba(51,51,50,0.75)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 17, fontWeight: 600, letterSpacing: '0.04em',
        }}>Drop the photo to convert it</div>
      )}

      {/* ── the modal, exactly as it would sit over the gallery ── */}
      <div style={{
        width: '100%', maxWidth: 940, display: 'flex', gap: 18,
        background: T.panelSolid, border: `1px solid ${T.line}`,
        borderRadius: T.radius, padding: 22,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        flexWrap: 'wrap',
      }}>
        {/* preview — the artboard stays light so bead colours judge true */}
        <main style={{
          flex: '1 1 420px', minWidth: 300, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: T.artboard, borderRadius: T.radius,
          minHeight: 420, padding: 18, position: 'relative',
        }}>
          {!imgData ? (
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              color: T.darkInk, cursor: 'pointer', textAlign: 'center', padding: 30,
              border: `2px dashed rgba(51,51,50,0.35)`, borderRadius: T.radius,
            }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Drop a photo here</span>
              <span style={{ fontSize: 12.5, opacity: 0.65 }}>or tap to browse — it becomes beads instantly</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
            </label>
          ) : (
            <canvas
              ref={canvasRef}
              style={{ maxWidth: '100%', maxHeight: '62vh', width: 'auto', height: 'auto', borderRadius: 4 }}
            />
          )}
          {toast && (
            <div style={{
              position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
              background: T.panelSolid, border: `1px solid ${T.accent}`, color: T.ink,
              borderRadius: T.radius, padding: '8px 14px', fontSize: 12.5, whiteSpace: 'nowrap',
            }}>{toast}</div>
          )}
        </main>

        {/* controls — the dialog column */}
        <aside style={{
          flex: '0 1 300px', minWidth: 270, display: 'flex', flexDirection: 'column', gap: 16,
          maxHeight: '78vh', overflowY: 'auto', paddingRight: 2,
        }}>
          <div style={{ ...LABEL, fontSize: 12, color: T.ink, display: 'flex', alignItems: 'center', gap: 8 }}>
            NEW ARTWORK — FROM PHOTO
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
          </div>

          {imgData && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <img src={imgData.url} alt="source" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: T.radius, border: `1px solid ${T.line}` }} />
              <label style={{ ...seg(false), textAlign: 'center', padding: '10px 8px' }}>
                Replace photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
              </label>
            </div>
          )}

          <div>
            <div style={{ ...LABEL, marginBottom: 8 }}>Canvas size</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <label style={pillBox}>
                <input aria-label="Canvas W cm" type="number" min={1} max={MAX_CM} value={cmW}
                  onChange={(e) => setCmW(clampCm(+e.target.value))} style={pillInput} />
                <span style={pillLabel}>cm W</span>
              </label>
              <label style={pillBox}>
                <input aria-label="Canvas H cm" type="number" min={1} max={MAX_CM} value={cmH}
                  onChange={(e) => setCmH(clampCm(+e.target.value))} style={pillInput} />
                <span style={pillLabel}>cm H</span>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: T.inkSoft, letterSpacing: '0.06em' }}>
                {derived.cols} × {derived.rows} beads
              </span>
              <button
                onClick={matchPhotoShape}
                disabled={!imgData}
                style={{
                  border: 'none', background: 'none', color: imgData ? T.ink : T.inkSoft,
                  fontSize: 11.5, cursor: imgData ? 'pointer' : 'default', fontFamily: FONT,
                  textDecoration: 'underline', padding: 0,
                }}
              >Match photo shape</button>
            </div>
          </div>

          <div>
            <div style={{ ...LABEL, marginBottom: 8 }}>Bead size</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {BEAD_SIZES.map((b) => (
                <button key={b.key} style={seg(beadKey === b.key)} onClick={() => setBeadKey(b.key)}>{b.label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={LABEL}>Colours</span>
              <span style={{ fontSize: 11, color: T.inkSoft }}>{activeN || colorCount} in artwork</span>
            </div>
            <input
              aria-label="Colours"
              type="range" min={MIN_COLORS} max={MAX_COLORS} value={colorCount}
              onChange={(e) => setColorCount(+e.target.value)}
              style={{ width: '100%', accentColor: T.active }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={dither} onChange={(e) => setDither(e.target.checked)} style={{ accentColor: T.accent }} />
              Dithering (smoother gradients)
            </label>
          </div>

          {activeN > 0 && (
            <div>
              <div style={{ ...LABEL, marginBottom: 8 }}>Colour layers — {activeN}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {layers.slice(0, activeN).map((l, i) => (
                  <div
                    key={i}
                    data-layer-row
                    onClick={() => setSelLayer(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px',
                      borderRadius: T.radius, cursor: 'pointer',
                      background: sel === i ? T.active : T.panel,
                      color: sel === i ? T.activeInk : T.ink,
                    }}
                  >
                    <button
                      data-layer-eye
                      onClick={(e) => { e.stopPropagation(); toggleLayer(i) }}
                      title={l.visible ? 'Hide this colour' : 'Show this colour'}
                      style={{
                        width: 20, height: 20, border: 'none', background: 'none', cursor: 'pointer',
                        fontSize: 12, color: 'inherit', opacity: l.visible ? 1 : 0.35, padding: 0,
                      }}
                    >{l.visible ? '●' : '○'}</button>
                    <input
                      type="color"
                      value={l.color}
                      onChange={(e) => setLayerColor(i, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      title="Pick any colour for this layer"
                      style={{ width: 24, height: 24, padding: 0, border: `1px solid ${T.line}`, borderRadius: 6, cursor: 'pointer', flexShrink: 0, background: 'none' }}
                    />
                    <span style={{ fontSize: 12, flex: 1, opacity: l.visible ? 1 : 0.45 }}>{l.color.toUpperCase()}</span>
                    <span style={{ fontSize: 11, opacity: 0.75, fontVariantNumeric: 'tabular-nums' }}>
                      {converted?.counts[i]?.toLocaleString() ?? ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeN > 0 && (
            <div>
              <div style={{ ...LABEL, marginBottom: 6 }}>Universal palette</div>
              <div style={{ fontSize: 11, color: T.inkSoft, marginBottom: 8 }}>
                {sel == null ? 'Tap a layer above, then a colour here to swap it.' : `Tap a colour to recolour layer ${sel + 1}.`}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {UNIVERSAL_PALETTE.map((c) => (
                  <button
                    key={c}
                    data-universal-swatch
                    title={c}
                    onClick={() => { if (sel != null) setLayerColor(sel, c) }}
                    style={{
                      width: 28, height: 28, borderRadius: 7, border: `1px solid ${T.line}`,
                      background: c, padding: 0,
                      cursor: sel != null ? 'pointer' : 'default', opacity: sel != null ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
            {stats && (
              <div style={{ fontSize: 11, color: T.inkSoft }}>
                {stats.cols} × {stats.rows} lattice · {stats.beads.toLocaleString()} beads · {stats.ms} ms
              </div>
            )}
            <button
              disabled={!converted}
              onClick={() => showToast('Design preview — creating wires up on integration')}
              style={{
                padding: 14, border: 'none', cursor: converted ? 'pointer' : 'default',
                background: T.accent, color: '#ffffff', opacity: converted ? 1 : 0.5,
                borderRadius: T.radius, fontSize: 12, fontWeight: 700, fontFamily: FONT,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}
            >Create artwork</button>
            <button
              onClick={() => showToast('Back returns to the technique chooser in the real tool')}
              style={{
                padding: 11, border: 'none', cursor: 'pointer',
                background: T.pill, color: T.ink,
                borderRadius: T.radius, fontSize: 13, fontFamily: FONT,
              }}
            >Back</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

// Batched bead rendering with per-colour Path2D FLUSHED every ~1500 beads —
// one giant path fills super-linearly (same lesson as the main tool's PNG
// exporter); flushing keeps the cost O(beads).
const FLUSH_AT = 1500
function renderBeads(canvas, converted, layers) {
  if (!canvas) return
  const { geo, cols, rows, assigned } = converted
  canvas.width = Math.ceil(geo.width)
  canvas.height = Math.ceil(geo.height)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const active = new Map()
  const flush = (hex) => {
    const a = active.get(hex)
    if (!a || !a.count) return
    ctx.fillStyle = hex
    ctx.fill(a.path)
    active.set(hex, { path: new Path2D(), count: 0 })
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!beadExists(col, row)) continue
      const idx = assigned.get(`${col},${row}`)
      if (idx == null) continue
      const lay = layers[idx]
      if (!lay || !lay.visible) continue
      const hex = lay.color
      let a = active.get(hex)
      if (!a) { a = { path: new Path2D(), count: 0 }; active.set(hex, a) }
      const { cx, cy } = geo.centerFor(col, row)
      threeBead.beadOutline(a.path, cx, cy, geo.Bw, geo.Bh, threeBead.tiltFor(col, row))
      a.count++
      if (a.count >= FLUSH_AT) flush(hex)
    }
  }
  for (const hex of active.keys()) flush(hex)
}
