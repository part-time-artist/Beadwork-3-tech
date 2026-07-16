import { useCallback, useEffect, useRef, useState } from 'react'
import { extractPalette, sampleGrid, quantizeGrid } from './lib/convert'

// "Import photo as beads" — the conversion modal (design approved in the
// photo-to-bead prototype, adapted for EDITOR import: the artwork's canvas
// already exists, so there are no size controls; the photo covers the
// current grid). Owns all conversion state; hands the result to onImport as
// { colorLayers: [{ color, beads: Map }], imageSrc, imageW, imageH }.

const MIN_COLORS = 2
const MAX_COLORS = 16
const MAX_IMG_SIDE = 1400 // sampling resolution; also re-encoded for the hidden reference layer
const PREVIEW_MAX_PX = 1200000 // cap the preview canvas (~4–16× overdraw was the prototype's lag)

export default function PhotoImport({ T, tech, cols, rows, canvasCm, universalPalette, onImport, onClose }) {
  const [imgData, setImgData] = useState(null) // { data, w, h, url }
  const [colorCount, setColorCount] = useState(8)
  const [dither, setDither] = useState(true)
  const [extracted, setExtracted] = useState([]) // ranked once per image — stable top-N
  const [layers, setLayers] = useState([]) // { color, visible } per ranked colour
  const [selLayer, setSelLayer] = useState(null)
  const [converted, setConverted] = useState(null) // { geo, assigned, counts }
  const [stats, setStats] = useState(null)
  const canvasRef = useRef(null)
  const extractTimer = useRef(null)
  const convertTimer = useRef(null)

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
      // JPEG data URL: doubles as the hidden reference layer's stored src
      // (blob URLs die with the session; the main app persists data URLs)
      const jpeg = cv.toDataURL('image/jpeg', 0.85)
      setImgData({ data: ctx.getImageData(0, 0, w, h).data, w, h, url: jpeg })
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [])

  // A) Extract ONCE per image at max colours, ranked by importance — the
  // slider slices the top N, so layer swaps/hides survive slider moves.
  useEffect(() => {
    if (!imgData) return
    clearTimeout(extractTimer.current)
    extractTimer.current = setTimeout(() => {
      const pal = extractPalette(imgData.data, imgData.w, imgData.h, MAX_COLORS)
      setExtracted(pal)
      setLayers(pal.map((c) => ({ color: c, visible: true })))
      setSelLayer(null)
    }, 120)
    return () => clearTimeout(extractTimer.current)
  }, [imgData])

  const activeN = Math.min(colorCount, extracted.length)
  const sel = selLayer != null && selLayer < activeN ? selLayer : null

  // B) Sample + assign on the ARTWORK's real grid. Assignment matches the
  // ORIGINAL extracted colours, so recolouring a layer never reshuffles it.
  useEffect(() => {
    if (!imgData || !activeN) return
    clearTimeout(convertTimer.current)
    convertTimer.current = setTimeout(() => {
      const t0 = performance.now()
      const geo = tech.makeGeometry({ Bw: 20, Bh: 25, cols, rows })
      const sampled = sampleGrid(imgData.data, imgData.w, imgData.h, geo, cols, rows, tech)
      const assigned = quantizeGrid(sampled, cols, rows, extracted.slice(0, activeN), dither, tech)
      const counts = new Array(activeN).fill(0)
      for (const idx of assigned.values()) counts[idx]++
      setConverted({ geo, assigned, counts })
      setStats({ beads: assigned.size, ms: Math.round(performance.now() - t0) })
    }, 150)
    return () => clearTimeout(convertTimer.current)
  }, [imgData, extracted, activeN, dither, tech, cols, rows])

  // C) Paint — re-runs on eye toggles / colour swaps without re-quantizing.
  useEffect(() => {
    if (converted) renderPreview(canvasRef.current, converted, layers, cols, rows, tech)
  }, [converted, layers, cols, rows, tech])

  const toggleLayer = (i) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, visible: !l.visible } : l)))
  const setLayerColor = (i, hex) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, color: hex } : l)))

  const commit = () => {
    if (!converted) return
    // one bead Map per VISIBLE colour layer (hidden layers are left out —
    // what you see in the preview is what lands in the artwork)
    const maps = layers.slice(0, activeN).map(() => new Map())
    for (const [k, idx] of converted.assigned) {
      if (layers[idx]?.visible) maps[idx].set(k, layers[idx].color)
    }
    const colorLayers = []
    for (let i = 0; i < maps.length; i++) {
      if (layers[i].visible && maps[i].size) colorLayers.push({ color: layers[i].color, beads: maps[i] })
    }
    if (!colorLayers.length) return
    onImport({ colorLayers, imageSrc: imgData.url, imageW: imgData.w, imageH: imgData.h })
  }

  return (
    <div className="piScrim" onClick={onClose}>
      <div className="piModal" onClick={(e) => e.stopPropagation()}>
        <main className="piPreview">
          {!imgData ? (
            <label className="piDrop">
              <span className="piDropBig">Drop a photo here</span>
              <span className="piDropSmall">or tap to browse — it becomes beads on your canvas</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
            </label>
          ) : (
            <canvas ref={canvasRef} className="piCanvas" />
          )}
        </main>

        <aside className="piSide">
          <div className="piTitle">IMPORT PHOTO AS BEADS</div>

          {imgData && (
            <div className="piThumbRow">
              <img src={imgData.url} alt="source" className="piThumb" />
              <label className="piReplace">
                Replace photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
              </label>
            </div>
          )}

          <div className="piCanvasInfo">
            Your canvas: {canvasCm.w} × {canvasCm.h} cm · {cols} × {rows} beads
            <span className="piCanvasHint">The photo fills it (centred, cropped to fit).</span>
          </div>

          <div>
            <div className="piLabelRow">
              <span className="piLabel">Colours</span>
              <span className="piSoft">{activeN || colorCount} in artwork</span>
            </div>
            <input
              aria-label="Colours"
              className="piRange"
              type="range" min={MIN_COLORS} max={MAX_COLORS} value={colorCount}
              onChange={(e) => setColorCount(+e.target.value)}
            />
            <label className="piCheck">
              <input type="checkbox" checked={dither} onChange={(e) => setDither(e.target.checked)} />
              Dithering (smoother gradients)
            </label>
          </div>

          {activeN > 0 && (
            <div>
              <div className="piLabel piMb">Colour layers — {activeN}</div>
              <div className="piLayers">
                {layers.slice(0, activeN).map((l, i) => (
                  <div
                    key={i}
                    data-layer-row
                    className={`piRow ${sel === i ? 'on' : ''}`}
                    onClick={() => setSelLayer(i)}
                  >
                    <button
                      data-layer-eye
                      className="piEye"
                      style={{ opacity: l.visible ? 1 : 0.35 }}
                      onClick={(e) => { e.stopPropagation(); toggleLayer(i) }}
                      title={l.visible ? 'Hide this colour' : 'Show this colour'}
                    >{l.visible ? '●' : '○'}</button>
                    <input
                      type="color"
                      className="piSwatch"
                      value={l.color}
                      onChange={(e) => setLayerColor(i, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      title="Pick any colour for this layer"
                    />
                    <span className="piHex" style={{ opacity: l.visible ? 1 : 0.45 }}>{l.color.toUpperCase()}</span>
                    <span className="piCount">{converted?.counts[i]?.toLocaleString() ?? ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeN > 0 && universalPalette.length > 0 && (
            <div>
              <div className="piLabel piMb">Universal palette</div>
              <div className="piSoft piMb">
                {sel == null ? 'Tap a layer above, then a colour here to swap it.' : `Tap a colour to recolour layer ${sel + 1}.`}
              </div>
              <div className="piUni">
                {universalPalette.map((c) => (
                  <button
                    key={c}
                    data-universal-swatch
                    title={c}
                    className="piUniSw"
                    style={{ background: c, cursor: sel != null ? 'pointer' : 'default', opacity: sel != null ? 1 : 0.55 }}
                    onClick={() => { if (sel != null) setLayerColor(sel, c) }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="piFoot">
            {stats && <div className="piSoft">{cols} × {rows} lattice · {stats.beads.toLocaleString()} beads · {stats.ms} ms</div>}
            <button className="piPrimary" disabled={!converted} onClick={commit}>Add to artwork</button>
            <button className="piGhost" onClick={onClose}>Cancel</button>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .piScrim {
          position: fixed; inset: 0; z-index: 60; display: flex;
          align-items: center; justify-content: center; padding: 24px;
          background: rgba(51,51,50,0.5);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .piModal {
          width: 100%; max-width: 940px; display: flex; gap: 18px; flex-wrap: wrap;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 22px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          max-height: 92vh;
        }
        .piPreview {
          flex: 1 1 420px; min-width: 280px; display: flex; align-items: center;
          justify-content: center; background: ${T.artboard}; border-radius: ${T.radius}px;
          min-height: 380px; padding: 18px;
        }
        .piDrop {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          color: ${T.darkInk}; cursor: pointer; text-align: center; padding: 30px;
          border: 2px dashed rgba(51,51,50,0.35); border-radius: ${T.radius}px;
        }
        .piDropBig { font-size: 15px; font-weight: 600; }
        .piDropSmall { font-size: 12.5px; opacity: 0.65; }
        .piCanvas { max-width: 100%; max-height: 58vh; width: auto; height: auto; border-radius: 4px; }
        .piSide {
          flex: 0 1 300px; min-width: 260px; display: flex; flex-direction: column; gap: 15px;
          max-height: 84vh; overflow-y: auto; padding-right: 2px;
        }
        .piTitle {
          font-family: ${T.mono}; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; color: ${T.ink};
          display: flex; align-items: center; gap: 8px;
        }
        .piTitle::after { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${T.accent}; }
        .piThumbRow { display: flex; gap: 10px; align-items: center; }
        .piThumb { width: 52px; height: 52px; object-fit: cover; border-radius: ${T.radius}px; border: 1px solid ${T.line}; }
        .piReplace {
          flex: 1; text-align: center; padding: 10px 8px; cursor: pointer;
          background: ${T.pill}; color: ${T.ink}; border-radius: 9px; font-size: 13px; font-weight: 600;
        }
        .piReplace:hover { background: ${T.hoverPill}; }
        .piCanvasInfo {
          font-family: ${T.mono}; font-size: 12px; color: ${T.ink};
          background: ${T.pill}; border-radius: ${T.radius}px; padding: 10px 12px;
          display: flex; flex-direction: column; gap: 3px;
        }
        .piCanvasHint { font-size: 10.5px; color: ${T.inkSoft}; }
        .piLabelRow { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .piLabel {
          font-family: ${T.mono}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: ${T.inkSoft};
        }
        .piMb { display: block; margin-bottom: 6px; }
        .piSoft { font-size: 11px; color: ${T.inkSoft}; }
        .piRange { width: 100%; accent-color: ${T.active}; }
        .piCheck { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-top: 8px; cursor: pointer; color: ${T.ink}; }
        .piCheck input { accent-color: ${T.accent}; }
        .piLayers { display: flex; flex-direction: column; gap: 4px; }
        .piRow {
          display: flex; align-items: center; gap: 8px; padding: 6px 9px;
          border-radius: ${T.radius}px; cursor: pointer;
          background: ${T.panel}; color: ${T.ink};
        }
        .piRow.on { background: ${T.active}; color: ${T.activeInk}; }
        .piEye {
          width: 20px; height: 20px; border: none; background: none; cursor: pointer;
          font-size: 12px; color: inherit; padding: 0;
        }
        .piSwatch {
          width: 24px; height: 24px; padding: 0; border: 1px solid ${T.line};
          border-radius: 6px; cursor: pointer; flex-shrink: 0; background: none;
        }
        .piHex { font-size: 12px; flex: 1; }
        .piCount { font-size: 11px; opacity: 0.75; font-variant-numeric: tabular-nums; }
        .piUni { display: flex; flex-wrap: wrap; gap: 6px; }
        .piUniSw { width: 28px; height: 28px; border-radius: 7px; border: 1px solid ${T.line}; padding: 0; }
        .piFoot { margin-top: auto; display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }
        .piPrimary {
          padding: 14px; border: none; cursor: pointer;
          background: ${T.accent}; color: #ffffff;
          border-radius: ${T.radius}px; font-size: 12px; font-weight: 700;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .piPrimary:disabled { opacity: 0.5; cursor: default; }
        .piGhost {
          padding: 11px; border: none; cursor: pointer;
          background: ${T.pill}; color: ${T.ink};
          border-radius: ${T.radius}px; font-size: 13px; font-family: ${T.mono};
        }
      `}</style>
    </div>
  )
}

// Preview renderer: capped to PREVIEW_MAX_PX (the prototype rendered at full
// doc resolution — 4–16× more pixels than displayed, its main lag source),
// batched per colour with Path2Ds FLUSHED every ~1500 beads (one giant path
// fills super-linearly — same lesson as the PNG exporter). LEVEL OF DETAIL:
// path CONSTRUCTION is the real cost, not pixels — bisected: at 15k beads the
// 37-point silhouettes took 831ms to BUILD while all the fills together took
// 4ms. Under 10 preview px a bead's silhouette barely reads anyway, so it
// draws as a coverage rect (apex rows double-wide, same as the editor's fast
// path): one path op per bead instead of 37.
const FLUSH_AT = 1500
const LOD_BEAD_PX = 10
function renderPreview(canvas, converted, layers, cols, rows, tech) {
  if (!canvas) return
  const { geo, assigned } = converted
  const scale = Math.min(1, Math.sqrt(PREVIEW_MAX_PX / (geo.width * geo.height)))
  canvas.width = Math.ceil(geo.width * scale)
  canvas.height = Math.ceil(geo.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(scale, scale)
  const asRect = geo.Bw * scale < LOD_BEAD_PX
  const apexWide = !!tech.apexWide
  const active = new Map()
  const flush = (hex) => {
    const a = active.get(hex)
    if (!a || !a.count) return
    ctx.fillStyle = hex
    ctx.fill(a.path)
    active.set(hex, { path: new Path2D(), count: 0 })
  }
  for (let row = 0; row < rows; row++) {
    const wide = apexWide && row % 2 === 0
    for (let col = 0; col < cols; col++) {
      if (!tech.beadExists(col, row)) continue
      const idx = assigned.get(`${col},${row}`)
      if (idx == null) continue
      const lay = layers[idx]
      if (!lay || !lay.visible) continue
      const hex = lay.color
      let a = active.get(hex)
      if (!a) { a = { path: new Path2D(), count: 0 }; active.set(hex, a) }
      const { cx, cy } = geo.centerFor(col, row)
      if (asRect) {
        a.path.rect(cx - (wide ? geo.Px : geo.Px / 2), cy - geo.Py / 2, wide ? geo.Px * 2 : geo.Px, geo.Py)
      } else {
        tech.beadOutline(a.path, cx, cy, geo.Bw, geo.Bh, tech.tiltFor(col, row))
      }
      a.count++
      if (a.count >= FLUSH_AT) flush(hex)
    }
  }
  for (const hex of active.keys()) flush(hex)
  ctx.restore()
}
