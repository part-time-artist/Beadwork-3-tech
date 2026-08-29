import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { extractPalette, sampleGrid, quantizeGrid, fitFrame, fillFrame } from './lib/convert'

// "Import photo as beads" — the conversion modal.
// Layout contract (user-locked): the modal is a FIXED size on screen — it
// never grows off-screen and never changes size as the COLOURS slider moves.
// Colour layers live in a fixed-height CHIP strip sized for all 16; the
// universal palette is a second fixed strip (display capped at 24).
// Framing contract (user-locked): the photo opens at FIT (whole photo, empty
// beads around it — never silently cropped); tapping the photo THUMBNAIL
// opens CROP mode — drag to pan, pinch/wheel to zoom, Fit · Fill presets,
// Done. Uncovered cells stay empty; the artwork's canvas size is never
// touched. onImport receives { colorLayers, imageSrc, imageW, imageH,
// frame, frameDocW } — frame is the doc-space photo transform, so the hidden
// reference layer lands EXACTLY where the beads were sampled.

const MIN_COLORS = 2
const MAX_COLORS = 16
const MAX_IMG_SIDE = 1400
const PREVIEW_MAX_PX = 1200000
const UNIVERSAL_SHOWN = 24 // fixed strip → cap what we render

export default function PhotoImport({ T, tech, cols, rows, canvasCm, universalPalette, onImport, onClose }) {
  const [imgData, setImgData] = useState(null) // { data, w, h, url, cv } — cv = decode canvas (drawable)
  const [colorCount, setColorCount] = useState(8)
  const [dither, setDither] = useState(true)
  const [extracted, setExtracted] = useState([])
  const [layers, setLayers] = useState([])
  const [selLayer, setSelLayer] = useState(null)
  const [frame, setFrame] = useState(null) // doc-space photo transform { x, y, scale }
  const [cropping, setCropping] = useState(false)
  const [converted, setConverted] = useState(null) // { geo, assigned, counts }
  const [stats, setStats] = useState(null)
  const canvasRef = useRef(null)
  const extractTimer = useRef(null)
  const convertTimer = useRef(null)
  const frameRef = useRef(null)
  frameRef.current = frame

  // one geometry for the whole modal (sampling + preview + crop maths)
  const geo = useMemo(() => tech.makeGeometry({ Bw: 20, Bh: 25, cols, rows }), [tech, cols, rows])

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
      const jpeg = cv.toDataURL('image/jpeg', 0.85) // persisted reference-layer src
      setImgData({ data: ctx.getImageData(0, 0, w, h).data, w, h, url: jpeg, cv })
      setFrame(fitFrame(w, h, geo)) // LOCKED: open at Fit — never silently crop
      setCropping(false)
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [geo])

  // A) extract ONCE per image at max colours, ranked — slider slices top N
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

  // B) sample through the frame + assign to the top-N extracted colours
  useEffect(() => {
    if (!imgData || !activeN || !frame) return
    clearTimeout(convertTimer.current)
    convertTimer.current = setTimeout(() => {
      const t0 = performance.now()
      const sampled = sampleGrid(imgData.data, imgData.w, imgData.h, geo, cols, rows, tech, frame)
      const assigned = quantizeGrid(sampled, cols, rows, extracted.slice(0, activeN), dither, tech)
      const counts = new Array(activeN).fill(0)
      for (const idx of assigned.values()) counts[idx]++
      setConverted({ geo, assigned, counts })
      setStats({ beads: assigned.size, ms: Math.round(performance.now() - t0) })
    }, 150)
    return () => clearTimeout(convertTimer.current)
  }, [imgData, extracted, activeN, dither, tech, cols, rows, geo, frame])

  // C) paint — beads normally, the photo-framing view while cropping
  useEffect(() => {
    if (!imgData) return
    if (cropping) drawCrop(canvasRef.current, imgData, frame, geo)
    else if (converted) renderPreview(canvasRef.current, converted, layers, cols, rows, tech, sel)
  }, [imgData, converted, layers, cols, rows, tech, cropping, frame, geo, sel])

  const toggleLayer = (i) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, visible: !l.visible } : l)))
  const setLayerColor = (i, hex) =>
    setLayers((ls) => ls.map((l, j) => (j === i ? { ...l, color: hex } : l)))

  // Universal swatch: tap = recolour the SELECTED chip; DRAG one onto any
  // chip to recolour that layer directly (a floating ghost follows the
  // pointer; the hovered chip highlights). Pointer-based — HTML5 DnD is
  // dead on iOS.
  const [dragSw, setDragSw] = useState(null) // {color, x, y}
  const [dragOver, setDragOver] = useState(null) // chip index under the drag
  const chipUnder = (x, y) => {
    const el = document.elementFromPoint(x, y)
    const chip = el && el.closest('[data-layer-row]')
    return chip ? +chip.dataset.chipIndex : null
  }
  const swatchDown = (c, e) => {
    if (e.button != null && e.button !== 0) return
    const sx = e.clientX, sy = e.clientY
    let dragging = false
    const move = (ev) => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) dragging = true
      if (dragging) {
        setDragSw({ color: c, x: ev.clientX, y: ev.clientY })
        setDragOver(chipUnder(ev.clientX, ev.clientY))
      }
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      setDragSw(null)
      setDragOver(null)
      if (dragging) {
        const i = chipUnder(ev.clientX, ev.clientY)
        if (i != null) { setLayerColor(i, c); setSelLayer(i) }
      } else if (sel != null) setLayerColor(sel, c) // plain tap keeps the old flow
    }
    const cancel = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      setDragSw(null)
      setDragOver(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
  }

  // Chip-to-chip exchange: dragging one layer chip's own swatch onto another
  // chip trades their two colours (not a one-way overwrite). Reuses the same
  // ghost/drop-target state as the universal-swatch drag above. A drag ends
  // in a native "click" on the colour input, which must be swallowed —
  // otherwise it either opens the OS colour picker or re-fires the tap-to-
  // select logic on the chip the drag started from.
  const suppressChipClick = useRef(false)
  const chipSwatchDown = (i, e) => {
    if (e.button != null && e.button !== 0) return
    const sx = e.clientX, sy = e.clientY
    let dragging = false
    const move = (ev) => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) dragging = true
      if (dragging) {
        setDragSw({ color: layers[i].color, x: ev.clientX, y: ev.clientY })
        setDragOver(chipUnder(ev.clientX, ev.clientY))
      }
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      setDragSw(null)
      setDragOver(null)
      if (dragging) {
        suppressChipClick.current = true
        const j = chipUnder(ev.clientX, ev.clientY)
        if (j != null && j !== i) {
          setLayers((ls) => {
            const next = ls.slice()
            const a = next[i].color
            next[i] = { ...next[i], color: next[j].color }
            next[j] = { ...next[j], color: a }
            return next
          })
          setSelLayer(j)
        }
      }
    }
    const cancel = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      setDragSw(null)
      setDragOver(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
  }

  // ---- crop-mode gestures: drag = pan, wheel = zoom to cursor, 2-pointer pinch
  const pointers = useRef(new Map())
  const clampScale = (s) => {
    const fit = fitFrame(imgData.w, imgData.h, geo).scale
    return Math.max(fit * 0.25, Math.min(fit * 10, s))
  }
  const toDoc = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * geo.width, y: ((e.clientY - r.top) / r.height) * geo.height }
  }
  const zoomAt = (p, factor) => {
    setFrame((f) => {
      const ns = clampScale(f.scale * factor)
      const k = ns / f.scale
      return { scale: ns, x: p.x - (p.x - f.x) * k, y: p.y - (p.y - f.y) * k }
    })
  }
  const onCropDown = (e) => {
    if (!cropping) return
    e.preventDefault()
    canvasRef.current.setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, toDoc(e))
  }
  const onCropMove = (e) => {
    if (!cropping || !pointers.current.has(e.pointerId)) return
    const now = toDoc(e)
    if (pointers.current.size === 2) {
      const [idA, idB] = [...pointers.current.keys()]
      const otherId = idA === e.pointerId ? idB : idA
      const other = pointers.current.get(otherId)
      const prev = pointers.current.get(e.pointerId)
      const d0 = Math.hypot(prev.x - other.x, prev.y - other.y) || 1
      const d1 = Math.hypot(now.x - other.x, now.y - other.y) || 1
      zoomAt({ x: (now.x + other.x) / 2, y: (now.y + other.y) / 2 }, d1 / d0)
    } else {
      const prev = pointers.current.get(e.pointerId)
      setFrame((f) => ({ ...f, x: f.x + (now.x - prev.x), y: f.y + (now.y - prev.y) }))
    }
    pointers.current.set(e.pointerId, now)
  }
  const onCropUp = (e) => pointers.current.delete(e.pointerId)
  const onCropWheel = (e) => {
    if (!cropping) return
    e.preventDefault()
    zoomAt(toDoc(e), e.deltaY < 0 ? 1.1 : 1 / 1.1)
  }

  const commit = () => {
    if (!converted || !converted.assigned.size) return
    const maps = layers.slice(0, activeN).map(() => new Map())
    for (const [k, idx] of converted.assigned) {
      if (layers[idx]?.visible) maps[idx].set(k, layers[idx].color)
    }
    const colorLayers = []
    for (let i = 0; i < maps.length; i++) {
      if (layers[i].visible && maps[i].size) colorLayers.push({ color: layers[i].color, beads: maps[i] })
    }
    if (!colorLayers.length) return
    onImport({
      colorLayers, imageSrc: imgData.url, imageW: imgData.w, imageH: imgData.h,
      frame, frameDocW: geo.width,
    })
  }

  return (
    // deliberately NO click-outside-to-close (unlike the app's other modals):
    // an accidental tap on the scrim would throw away the user's framing and
    // colour work. Cancel is the only way out.
    <div className="piScrim">
      <div className="piModal">
        <main className="piPreview">
          {!imgData ? (
            <label className="piDrop">
              <span className="piDropBig">Drop a photo here</span>
              <span className="piDropSmall">or tap to browse — it becomes beads on your canvas</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
            </label>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                className={`piCanvas ${cropping ? 'cropping' : ''}`}
                onPointerDown={onCropDown}
                onPointerMove={onCropMove}
                onPointerUp={onCropUp}
                onPointerCancel={onCropUp}
                onWheel={onCropWheel}
              />
              {cropping && (
                <div className="piCropBar">
                  <span className="piCropHint">Drag to move · pinch or scroll to zoom</span>
                  <button data-crop-fit onClick={() => setFrame(fitFrame(imgData.w, imgData.h, geo))}>Fit</button>
                  <button data-crop-fill onClick={() => setFrame(fillFrame(imgData.w, imgData.h, geo))}>Fill</button>
                  <button data-crop-done className="done" onClick={() => setCropping(false)}>Done</button>
                </div>
              )}
            </>
          )}
        </main>

        <aside className="piSide">
          <div className="piTitle">IMPORT PHOTO AS BEADS</div>

          {imgData && (
            <div className="piThumbRow">
              <button
                data-crop-open
                className="piThumbBtn"
                onClick={() => setCropping((c) => !c)}
                title="Crop / reframe the photo"
              >
                <img src={imgData.url} alt="source" className="piThumb" />
                <span className="piThumbBadge" aria-hidden="true">⤢</span>
              </button>
              <label className="piReplace">
                Replace photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files[0])} />
              </label>
            </div>
          )}

          <div className="piCanvasInfo">
            Your canvas: {canvasCm.w} × {canvasCm.h} cm · {cols} × {rows} beads
            <span className="piCanvasHint">
              {imgData ? 'Tap the little photo to crop / reframe it.' : 'The photo opens whole (Fit) — nothing is cropped for you.'}
            </span>
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

          <div className="piFoot">
            {stats && <div className="piSoft">{cols} × {rows} lattice · {stats.beads.toLocaleString()} beads · {stats.ms} ms</div>}
            <button className="piPrimary" disabled={!converted || !converted.assigned.size || cropping} onClick={commit}>Add to artwork</button>
            <button className="piGhost" onClick={onClose}>Cancel</button>
          </div>
        </aside>

        {/* fixed-height strips: the modal's size never follows the slider */}
        <div className="piStrip">
          <div className="piStripLabel">Colour<br />layers — {activeN || 0}</div>
          <div className="piChips">
            {layers.slice(0, activeN).map((l, i) => (
              <div
                key={i}
                data-layer-row
                data-chip-index={i}
                className={`piChip ${sel === i ? 'on' : ''} ${l.visible ? '' : 'off'} ${dragOver === i ? 'drop' : ''}`}
                onClick={() => setSelLayer(i)}
                title={`${l.color.toUpperCase()} · ${converted?.counts[i]?.toLocaleString() ?? '…'} beads`}
              >
                <span className="piChipSwatchWrap">
                  {/* first tap SELECTS the chip (the swatch is most of its touch
                      area); tapping the already-selected chip's swatch opens
                      the native colour picker to fine-tune */}
                  <input
                    type="color"
                    className="piChipSwatch"
                    value={l.color}
                    onChange={(e) => setLayerColor(i, e.target.value)}
                    onPointerDown={(e) => { e.stopPropagation(); chipSwatchDown(i, e) }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (suppressChipClick.current) { suppressChipClick.current = false; e.preventDefault(); return }
                      if (sel !== i) { e.preventDefault(); setSelLayer(i) }
                    }}
                  />
                  <button
                    data-layer-eye
                    className="piChipEye"
                    onClick={(e) => { e.stopPropagation(); toggleLayer(i) }}
                    title={l.visible ? 'Hide this colour' : 'Show this colour'}
                  >{l.visible ? '●' : '○'}</button>
                </span>
                <span className="piChipCount">{converted?.counts[i]?.toLocaleString() ?? ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="piStrip uni">
          <div className="piStripLabel">Universal<br />palette</div>
          <div className="piUniBody">
            <div className="piSoft">
              {sel == null
                ? 'Drag a colour onto a layer chip to swap it, drag one chip onto another to exchange their colours, or tap a chip first, then a colour.'
                : `Tap a colour to recolour layer ${sel + 1}, or drag one onto any chip.`}
            </div>
            <div className="piUni">
              {universalPalette.slice(0, UNIVERSAL_SHOWN).map((c) => (
                <button
                  key={c}
                  data-universal-swatch
                  title={c}
                  className="piUniSw"
                  style={{ background: c }}
                  onPointerDown={(e) => swatchDown(c, e)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating swatch that follows the pointer while dragging a colour */}
      {dragSw && (
        <div className="piDragGhost" style={{ left: dragSw.x, top: dragSw.y, background: dragSw.color }} />
      )}

      <style jsx>{`
        .piScrim {
          position: fixed; inset: 0; z-index: 60; display: flex;
          align-items: center; justify-content: center; padding: 20px;
          background: rgba(51,51,50,0.5);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          overscroll-behavior: none;
        }
        /* FIXED size: independent of colour count, never off-screen */
        .piModal {
          width: min(100%, 940px); height: min(92vh, 680px);
          display: grid; grid-template-columns: minmax(0, 1fr) 280px;
          grid-template-rows: minmax(0, 1fr) auto auto; gap: 12px 16px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          overflow: hidden;
        }
        .piPreview {
          position: relative; min-height: 0; display: flex; align-items: center;
          justify-content: center; background: ${T.artboard}; border-radius: ${T.radius}px;
          padding: 12px;
        }
        .piDrop {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          color: ${T.darkInk}; cursor: pointer; text-align: center; padding: 30px;
          border: 2px dashed rgba(51,51,50,0.35); border-radius: ${T.radius}px;
        }
        .piDropBig { font-size: 15px; font-weight: 600; }
        .piDropSmall { font-size: 12.5px; opacity: 0.65; }
        .piCanvas { max-width: 100%; max-height: 100%; width: auto; height: auto; border-radius: 4px; touch-action: none; }
        .piCanvas.cropping { cursor: grab; }
        .piCropBar {
          position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          background: ${T.panelSolid}; border: 1px solid ${T.line};
          border-radius: ${T.radius}px; padding: 6px 10px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35); white-space: nowrap;
        }
        .piCropHint { font-size: 11px; color: ${T.inkSoft}; }
        .piCropBar button {
          border: none; cursor: pointer; border-radius: 7px; padding: 11px 16px;
          background: ${T.pill}; color: ${T.ink}; font-size: 12px; font-weight: 600; font-family: ${T.mono};
        }
        .piCropBar button.done { background: ${T.accent}; color: #fff; }
        .piSide { display: flex; flex-direction: column; gap: 13px; min-height: 0; }
        .piTitle {
          font-family: ${T.mono}; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; color: ${T.ink};
          display: flex; align-items: center; gap: 8px;
        }
        .piTitle::after { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${T.accent}; }
        .piThumbRow { display: flex; gap: 10px; align-items: center; }
        .piThumbBtn {
          position: relative; padding: 0; border: 1px solid ${T.line}; border-radius: ${T.radius}px;
          background: none; cursor: pointer; flex-shrink: 0; line-height: 0;
        }
        .piThumb { width: 52px; height: 52px; object-fit: cover; border-radius: ${T.radius - 1}px; display: block; }
        .piThumbBadge {
          position: absolute; right: -6px; bottom: -6px; width: 20px; height: 20px;
          border-radius: 7px; background: ${T.accent}; color: #fff; font-size: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
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
        .piSoft { font-size: 11px; color: ${T.inkSoft}; }
        .piRange { width: 100%; accent-color: ${T.active}; }
        .piCheck { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-top: 8px; cursor: pointer; color: ${T.ink}; }
        .piCheck input { accent-color: ${T.accent}; }
        .piFoot { margin-top: auto; display: flex; flex-direction: column; gap: 8px; }
        .piPrimary {
          padding: 13px; border: none; cursor: pointer;
          background: ${T.accent}; color: #ffffff;
          border-radius: ${T.radius}px; font-size: 12px; font-weight: 700;
          font-family: ${T.mono}; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .piPrimary:disabled { opacity: 0.5; cursor: default; }
        .piGhost {
          padding: 12px; border: none; cursor: pointer;
          background: ${T.pill}; color: ${T.ink};
          border-radius: ${T.radius}px; font-size: 13px; font-family: ${T.mono};
        }
        /* fixed-height strips under preview+side, spanning the modal.
           Heights sized for the BIGGER touch targets (~44px effective). */
        .piStrip {
          grid-column: 1 / -1; display: flex; gap: 12px; align-items: flex-start;
          height: 72px; overflow: hidden;
        }
        .piStrip.uni { height: 104px; }
        .piStripLabel {
          font-family: ${T.mono}; font-size: 10px; font-weight: 700; line-height: 1.35;
          letter-spacing: 0.1em; text-transform: uppercase; color: ${T.inkSoft};
          flex: 0 0 74px; padding-top: 4px;
        }
        .piChips { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; min-width: 0; }
        .piChip {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          cursor: pointer; padding: 4px 4px 3px; border-radius: ${T.radius}px;
          background: ${T.panel}; border: 1px solid transparent;
        }
        .piChip.on { background: ${T.active}; border-color: ${T.active}; }
        .piChip.on .piChipCount { color: ${T.activeInk}; }
        .piChip.off { opacity: 0.45; }
        .piChip.drop { border-color: ${T.accent}; background: ${T.hoverPill}; transform: scale(1.08); }
        .piChipSwatchWrap { position: relative; line-height: 0; }
        /* 34px: finger-sized AND 16 chips still fit one row in the fixed box */
        .piChipSwatch {
          width: 34px; height: 34px; padding: 0; border: 1px solid ${T.line};
          border-radius: 8px; cursor: pointer; background: none;
        }
        .piChipEye {
          position: absolute; right: -8px; top: -8px; width: 21px; height: 21px;
          border: none; border-radius: 7px; background: ${T.panelSolid}; color: ${T.ink};
          font-size: 11px; cursor: pointer; padding: 0; line-height: 21px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .piChipCount { font-size: 10px; color: ${T.inkSoft}; font-variant-numeric: tabular-nums; }
        .piUniBody { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .piUni { display: flex; flex-wrap: wrap; gap: 6px; }
        .piUniSw {
          width: 36px; height: 36px; border-radius: 8px; border: 1px solid ${T.line};
          padding: 0; cursor: pointer; touch-action: none;
        }
        .piDragGhost {
          position: fixed; z-index: 70; width: 40px; height: 40px; border-radius: 10px;
          transform: translate(-50%, -70%); pointer-events: none;
          border: 2px solid #ffffff; box-shadow: 0 6px 18px rgba(0,0,0,0.45);
        }
        /* Portrait / narrow: single column, preview shrinks, strips reserve
           two rows. MUST stay LAST — overrides equal-specificity rules above
           purely by cascade order. */
        @media (max-width: 900px) {
          .piModal {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: minmax(0, 3fr) auto auto auto;
            height: min(94vh, 900px);
          }
          .piPreview { min-height: 140px; }
          .piSide { order: 1; }
          .piStrip { order: 2; height: 128px; }
          .piStrip.uni { order: 3; height: 108px; }
        }
      `}</style>
    </div>
  )
}

// ---- crop-mode drawing: the photo itself, framed on the canvas ------------
function drawCrop(canvas, imgData, frame, geo) {
  if (!canvas || !frame) return
  const scale = Math.min(1, Math.sqrt(PREVIEW_MAX_PX / (geo.width * geo.height)))
  canvas.width = Math.ceil(geo.width * scale)
  canvas.height = Math.ceil(geo.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#dbdad5' // the artboard — empty beads will live here
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(scale, scale)
  ctx.drawImage(imgData.cv, frame.x, frame.y, imgData.w * frame.scale, imgData.h * frame.scale)
  // outline the photo's bounds so Fit framing reads clearly
  ctx.lineWidth = 2 / scale
  ctx.strokeStyle = 'rgba(51,51,50,0.55)'
  ctx.strokeRect(frame.x, frame.y, imgData.w * frame.scale, imgData.h * frame.scale)
  ctx.restore()
}

// ---- bead preview (unchanged logic: capped canvas + construction LOD) -----
const FLUSH_AT = 1500
const LOD_BEAD_PX = 10
function renderPreview(canvas, converted, layers, cols, rows, tech, sel) {
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
  // Selected-layer halo: a subtle two-tone outline over that colour's beads
  // only — never dims or recolours anything, so it can't bias colour
  // judgement, it just highlights where the selected layer lives. Chunks are
  // collected (not stroked) during the fill pass and drawn only at the very
  // end, on top of every fill — stroking mid-pass would let a later
  // neighbouring bead's fill clip the edge of an earlier halo.
  let selPath = new Path2D()
  let selCount = 0
  const selChunks = []
  const stashSel = () => {
    if (!selCount) return
    selChunks.push(selPath)
    selPath = new Path2D()
    selCount = 0
  }
  const strokeSel = () => {
    stashSel()
    if (!selChunks.length) return
    ctx.save()
    for (const chunk of selChunks) {
      ctx.lineWidth = Math.max(1.5, geo.Bw * 0.16)
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.stroke(chunk)
      ctx.lineWidth = Math.max(0.75, geo.Bw * 0.07)
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'
      ctx.stroke(chunk)
    }
    ctx.restore()
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
      if (idx === sel) {
        if (asRect) {
          selPath.rect(cx - (wide ? geo.Px : geo.Px / 2), cy - geo.Py / 2, wide ? geo.Px * 2 : geo.Px, geo.Py)
        } else {
          tech.beadOutline(selPath, cx, cy, geo.Bw, geo.Bh, tech.tiltFor(col, row))
        }
        selCount++
        if (selCount >= FLUSH_AT) stashSel()
      }
    }
  }
  for (const hex of active.keys()) flush(hex)
  strokeSel()
  ctx.restore()
}
