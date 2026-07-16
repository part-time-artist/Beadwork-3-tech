import React, { useEffect, useRef, useState } from 'react'
import { getTechnique, makeGeometry, unitBead, parseDesign, demoDesign, PACKED_DRAW } from './weave.js'
import { makeCloth, clothStep, bindPoint, beadPos, nearestNode, SUB_DT } from './cloth.js'

// Above this many beads, per-bead rotation is skipped while the fabric moves
// (positions still deform — only the tiny local twist is dropped).
const ROTATE_LOD = 20000

// ═══════════════════════════════════════════════════════════════════════════
// DIAL DEFAULTS — EDIT ME. Where each dial starts when the app opens.
// (The deeper fabric-feel numbers — thread strengths, the zero-stretch cotton
// rule, grab firmness — live in the "FABRIC FEEL" block in cloth.js.)
const DIALS = {
  gravity: 0.7, // how heavy the piece hangs (in g). Higher = falls flatter.
  breeze: 0, // ambient sway. 0 = dead still, like the real swatch indoors.
  stiffness: 4, // how firmly the weave holds its shape (solver passes).
  settle: 0.96, // how quickly motion dies. LOWER = calms faster.
  // 0.96 = real bead swatch: beads rubbing + thread friction eat a swing
  // within one motion. Raise toward 0.99 only for a light, floaty look.
}
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const fileRef = useRef(null)

  const [design, setDesign] = useState(() => demoDesign())
  const [mode, setMode] = useState('grab') // 'grab' | 'paint'
  const [paintColor, setPaintColor] = useState(null)
  const [gravityG, setGravityG] = useState(DIALS.gravity)
  const [wind, setWind] = useState(DIALS.breeze)
  const [stiffness, setStiffness] = useState(DIALS.stiffness)
  const [damping, setDamping] = useState(DIALS.settle)
  const [recording, setRecording] = useState(false)
  const [fps, setFps] = useState(0)
  const [status, setStatus] = useState('')

  const paramsRef = useRef({})
  paramsRef.current = { mode, paintColor, gravityG, wind, stiffness, damping }

  const sceneRef = useRef(null) // everything the render loop needs, no React
  const designRef = useRef(design)
  designRef.current = design
  const grabRef = useRef(null)
  const recRef = useRef(null)
  const statusTimer = useRef(null)

  const say = (msg) => {
    setStatus(msg)
    clearTimeout(statusTimer.current)
    statusTimer.current = setTimeout(() => setStatus(''), 3000)
  }

  // ---- scene building -----------------------------------------------------

  const buildScene = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const d = designRef.current
    if (!canvas || !container || !d) return

    const dpr = window.devicePixelRatio || 1
    const width = container.clientWidth
    const height = container.clientHeight
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const tech = getTechnique(d.technique)
    // Geometry in real mm, then one scale = px per mm to fit the viewport,
    // leaving room below and beside the panel for it to swing.
    const geo = makeGeometry({
      Bw: d.beadMM.w,
      Bh: d.beadMM.h,
      cols: d.cols,
      rows: d.rows,
      packX: tech.packX,
      packY: tech.packY,
      stagger: tech.stagger,
    })
    const scale = Math.min((width * 0.8) / geo.width, (height * 0.68) / geo.height)
    const panelW = geo.width * scale
    const panelH = geo.height * scale
    const x0 = (width - panelW) / 2
    const barY = height * 0.09

    const cloth = makeCloth({ x0, y0: barY, w: panelW, h: panelH })

    const fillScale = 1 + d.pack * (PACKED_DRAW - 1)
    const BwS = d.beadMM.w * scale * fillScale
    const BhS = d.beadMM.h * scale * fillScale

    // One flat record per bead: rest-space binding + sprite identity.
    const beads = []
    for (const [key, color] of d.beads) {
      const comma = key.indexOf(',')
      const col = +key.slice(0, comma)
      const row = +key.slice(comma + 1)
      if (!tech.exists(col, row)) continue
      const { cx, cy } = geo.centerFor(col, row)
      const bx = x0 + cx * scale
      const by = barY + cy * scale
      const tilt = tech.tiltFor(col, row)
      beads.push({ key, color, tiltDeg: Math.round((tilt * 180) / Math.PI), bind: bindPoint(cloth, bx, by), restX: bx, restY: by })
    }

    // Beads in the first row hang from the bar on visible threads.
    const firstRowY = barY + (geo.padY + geo.Py * 0.6) * scale
    const topBeads = []
    for (let i = 0; i < beads.length; i++) {
      if (beads[i].restY < firstRowY) topBeads.push({ i, ax: beads[i].restX })
    }

    sceneRef.current = {
      cloth, beads, dpr, width, height,
      pxPerMm: scale,
      BwS, BhS, shapeN: tech.shapeN,
      barX0: x0 - BwS, barX1: x0 + panelW + BwS, barY,
      topBeads,
      sprites: new Map(),
      pos: new Float32Array(beads.length * 2),
    }
    grabRef.current = null
  }

  // Bake one bead sprite: the weave tilt is baked in, so per-frame work is
  // just position (+ the cloth's local rotation).
  const getSprite = (scene, color, tiltDeg) => {
    const k = `${color}|${tiltDeg}`
    let s = scene.sprites.get(k)
    if (s) return s
    const { BwS, BhS, shapeN, dpr } = scene
    const tilt = (tiltDeg * Math.PI) / 180
    const pts = unitBead(shapeN)
    const cos = Math.cos(tilt)
    const sin = Math.sin(tilt)
    let mx = 0
    let my = 0
    for (const [ux, uy] of pts) {
      const px = (ux * BwS * cos - uy * BhS * sin) / 2
      const py = (ux * BwS * sin + uy * BhS * cos) / 2
      if (Math.abs(px) > mx) mx = Math.abs(px)
      if (Math.abs(py) > my) my = Math.abs(py)
    }
    const w = mx * 2 + 2
    const h = my * 2 + 2
    const c = document.createElement('canvas')
    c.width = Math.max(2, Math.ceil(w * dpr))
    c.height = Math.max(2, Math.ceil(h * dpr))
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.translate(w / 2, h / 2)
    ctx.rotate(tilt)
    ctx.beginPath()
    for (let i = 0; i < pts.length; i++) {
      const x = (pts[i][0] * BwS) / 2
      const y = (pts[i][1] * BhS) / 2
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    // glaze highlight
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.beginPath()
    ctx.ellipse(-BwS / 6, -BhS / 6, BwS / 6, BhS / 5.5, 0, 0, Math.PI * 2)
    ctx.fill()
    s = { c, w, h }
    scene.sprites.set(k, s)
    return s
  }

  // ---- main loop: build scene + simulate + draw ---------------------------

  useEffect(() => {
    buildScene()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let raf = null
    let last = performance.now()
    let acc = 0
    let frames = 0
    let fpsAt = last
    const out = { x: 0, y: 0, ang: 0 }

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const scene = sceneRef.current
      if (!scene) return
      const P = paramsRef.current

      frames++
      if (now - fpsAt >= 1000) {
        setFps(Math.round((frames * 1000) / (now - fpsAt)))
        frames = 0
        fpsAt = now
      }

      // Fixed 240Hz substeps regardless of display refresh rate.
      acc += Math.min(now - last, 50) / 1000
      last = now
      const nSub = Math.min(12, Math.floor(acc / SUB_DT))
      acc -= nSub * SUB_DT
      // real gravity: 1 g = 9810 mm/s², converted to screen px
      const gPx = 9810 * scene.pxPerMm
      clothStep(scene.cloth, {
        gravity: P.gravityG * gPx,
        windAmp: P.wind * gPx * 0.35, // breeze strength independent of the gravity dial
        damping: P.damping,
        iterations: P.stiffness,
        grab: grabRef.current,
      }, nSub)

      // Draw
      const { dpr, width, height, beads, cloth, pos } = scene
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // the hanging bar
      ctx.strokeStyle = '#171717'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(scene.barX0, scene.barY)
      ctx.lineTo(scene.barX1, scene.barY)
      ctx.stroke()
      ctx.fillStyle = '#171717'
      for (const bx of [scene.barX0, scene.barX1]) {
        ctx.beginPath()
        ctx.arc(bx, scene.barY, 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // hanging threads: bar → each first-row bead, drawn under the beads
      ctx.strokeStyle = 'rgba(23,23,23,0.4)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (const tb of scene.topBeads) {
        beadPos(cloth, beads[tb.i].bind, out)
        ctx.moveTo(tb.ax, scene.barY)
        ctx.lineTo(out.x, out.y)
      }
      ctx.stroke()

      const rotate = beads.length <= ROTATE_LOD
      for (let i = 0; i < beads.length; i++) {
        const b = beads[i]
        beadPos(cloth, b.bind, out)
        pos[i * 2] = out.x
        pos[i * 2 + 1] = out.y
        const s = getSprite(scene, b.color, b.tiltDeg)
        if (rotate) {
          const cos = Math.cos(out.ang)
          const sin = Math.sin(out.ang)
          ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * out.x, dpr * out.y)
          ctx.drawImage(s.c, -s.w / 2, -s.h / 2, s.w, s.h)
        } else {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.drawImage(s.c, out.x - s.w / 2, out.y - s.h / 2, s.w, s.h)
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    raf = requestAnimationFrame(tick)

    // Rebuild (re-hang) when the window resizes.
    let resizeTimer = null
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(buildScene, 150)
    })
    ro.observe(containerRef.current)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      clearTimeout(resizeTimer)
    }
  }, [design])

  // ---- pointer interaction ------------------------------------------------

  const eventPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onPointerDown = (e) => {
    const scene = sceneRef.current
    if (!scene) return
    const { x, y } = eventPos(e)
    const P = paramsRef.current
    if (P.mode === 'grab') {
      const k = nearestNode(scene.cloth, x, y, Math.max(60, scene.cloth.sx))
      if (k >= 0) grabRef.current = { k, x, y }
    } else {
      paintAt(x, y)
    }
    canvasRef.current.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!grabRef.current) return
    const { x, y } = eventPos(e)
    grabRef.current.x = x
    grabRef.current.y = y
  }

  const onPointerUp = () => {
    grabRef.current = null
  }

  const paintAt = (x, y) => {
    const scene = sceneRef.current
    const P = paramsRef.current
    const color = P.paintColor
    if (!scene || !color) {
      if (!color) say('Pick a colour first')
      return
    }
    const { beads, pos, BwS } = scene
    const maxD = BwS * BwS * 2.6
    let best = -1
    let bestD = maxD
    for (let i = 0; i < beads.length; i++) {
      const dx = pos[i * 2] - x
      const dy = pos[i * 2 + 1] - y
      const d = dx * dx + dy * dy
      if (d < bestD) {
        bestD = d
        best = i
      }
    }
    if (best < 0) return
    beads[best].color = color
    designRef.current.beads.set(beads[best].key, color) // survives re-hang/resize
  }

  // ---- import / export ----------------------------------------------------

  const onImportFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-importing the same file
    if (!file) return
    try {
      const parsed = parseDesign(JSON.parse(await file.text()))
      if (!parsed) throw new Error('not a design')
      if (parsed.beads.size === 0) {
        say('That design has no beads')
        return
      }
      setPaintColor(null)
      setDesign(parsed)
      say(`Hung: ${parsed.name}`)
    } catch {
      say('Could not read that file — export it from the beadwork tool')
    }
  }

  const toggleRecording = () => {
    if (recRef.current) {
      recRef.current.stop()
      return
    }
    const canvas = canvasRef.current
    const stream = canvas.captureStream(60)
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm'
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 })
    const chunks = []
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
    rec.onstop = () => {
      recRef.current = null
      setRecording(false)
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${designRef.current.name || 'kinetic'}-motion.webm`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
      say('Video saved')
    }
    recRef.current = rec
    rec.start()
    setRecording(true)
    say('Recording — press again to stop')
  }

  const reHang = () => {
    buildScene()
    say('Re-hung flat')
  }

  // Palette for paint mode: the design's palette, else its distinct colours.
  const palette = design.palette || [...new Set(design.beads.values())].slice(0, 12)

  return (
    <div style={styles.appContainer}>
      {/* LEFT PANEL: the piece on the bar */}
      <aside style={styles.leftCol}>
        <h1 style={styles.title}>Kinetic Lab</h1>
        <div style={styles.subtitle}>Beadwork in motion</div>

        <button onClick={() => fileRef.current?.click()} style={{ width: '100%', marginBottom: 28 }}>
          Import design
        </button>
        <input ref={fileRef} type="file" accept=".json,application/json" onChange={onImportFile} style={{ display: 'none' }} />

        <div style={styles.statsSection}>
          <div style={styles.statLabel}>On the bar</div>
          <div style={styles.statRow}><span style={styles.statKey}>Piece</span><span style={styles.statValue}>{design.name}</span></div>
          <div style={styles.statRow}><span style={styles.statKey}>Technique</span><span style={styles.statValue}>{getTechnique(design.technique).label}</span></div>
          <div style={styles.statRow}><span style={styles.statKey}>Size</span><span style={styles.statValue}>{design.canvasCm.w}×{design.canvasCm.h} cm</span></div>
          <div style={styles.statRow}><span style={styles.statKey}>Beads</span><span style={styles.statValue}>{design.beads.size}</span></div>
          <div style={styles.statRow}><span style={styles.statKey}>Frame rate</span><span style={styles.statValue}>{fps} fps</span></div>
        </div>
      </aside>

      {/* CENTER: the hanging piece */}
      <main ref={containerRef} style={styles.centerCol}>
        <canvas
          ref={canvasRef}
          style={styles.canvas}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {status && <div style={styles.toast}>{status}</div>}
      </main>

      {/* RIGHT PANEL: controls */}
      <aside style={styles.rightCol}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Mode</label>
          <div style={styles.btnGroup}>
            <button className={mode === 'grab' ? 'active' : ''} onClick={() => setMode('grab')} style={styles.btn}>Grab</button>
            <button className={mode === 'paint' ? 'active' : ''} onClick={() => setMode('paint')} style={styles.btn}>Paint</button>
          </div>
        </div>

        {mode === 'paint' && (
          <div style={styles.controlGroup}>
            <label style={styles.label}>Colour</label>
            <div style={styles.swatchRow}>
              {palette.map((c) => (
                <button
                  key={c}
                  onClick={() => setPaintColor(c)}
                  title={c}
                  style={{
                    ...styles.swatch,
                    background: c,
                    boxShadow: paintColor === c ? '0 0 0 2px #FAFAF9, 0 0 0 4px #171717' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div style={styles.controlGroup}>
          <div style={styles.sliderLabelRow}>
            <label style={styles.label}>Gravity</label>
            <span style={styles.value}>{gravityG.toFixed(2)} g</span>
          </div>
          <input type="range" min="0.05" max="1" step="0.05" value={gravityG} onChange={(e) => setGravityG(+e.target.value)} />
        </div>

        <div style={styles.controlGroup}>
          <div style={styles.sliderLabelRow}>
            <label style={styles.label}>Breeze</label>
            <span style={styles.value}>{wind.toFixed(2)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.05" value={wind} onChange={(e) => setWind(+e.target.value)} />
        </div>

        <div style={styles.controlGroup}>
          <div style={styles.sliderLabelRow}>
            <label style={styles.label}>Stiffness</label>
            <span style={styles.value}>{stiffness}</span>
          </div>
          <input type="range" min="1" max="6" step="1" value={stiffness} onChange={(e) => setStiffness(+e.target.value)} />
        </div>

        <div style={styles.controlGroup}>
          <div style={styles.sliderLabelRow}>
            <label style={styles.label}>Settle</label>
            <span style={styles.value}>{damping.toFixed(3)}</span>
          </div>
          <input type="range" min="0.94" max="1" step="0.002" value={damping} onChange={(e) => setDamping(+e.target.value)} />
        </div>

        <div style={styles.globalActions}>
          <button
            onClick={toggleRecording}
            className={recording ? 'active' : ''}
            style={{ width: '100%', marginBottom: 10 }}
          >
            {recording ? 'Stop & save video' : 'Record motion video'}
          </button>
          <button onClick={reHang} style={{ width: '100%' }}>Re-hang flat</button>
        </div>
      </aside>
    </div>
  )
}

// Clean contemporary layout: floating rounded panels, no hairlines, Satoshi.
const styles = {
  appContainer: {
    display: 'flex',
    gap: '12px',
    width: '100vw',
    height: '100vh',
    padding: '12px',
    backgroundColor: '#F1F0EE',
    color: '#171717',
    overflow: 'hidden',
  },
  leftCol: {
    width: '272px',
    backgroundColor: '#FAFAF9',
    borderRadius: '16px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    flexShrink: 0,
  },
  rightCol: {
    width: '272px',
    backgroundColor: '#FAFAF9',
    borderRadius: '16px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    flexShrink: 0,
  },
  centerCol: {
    flexGrow: 1,
    height: '100%',
    position: 'relative',
    minWidth: 0,
  },
  canvas: {
    display: 'block',
    width: '100%',
    height: '100%',
    touchAction: 'none',
  },
  title: {
    fontWeight: 700,
    fontSize: '22px',
    margin: '0 0 2px 0',
    letterSpacing: '-0.01em',
  },
  subtitle: {
    fontSize: '13px',
    fontWeight: 400,
    color: '#8A8884',
    marginBottom: '24px',
  },
  statsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#8A8884',
    marginBottom: '4px',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    fontSize: '13px',
  },
  statKey: {
    color: '#8A8884',
  },
  statValue: {
    fontWeight: 500,
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toast: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#171717',
    color: '#FAFAF9',
    padding: '10px 18px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 500,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
  controlGroup: {
    marginBottom: '22px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#8A8884',
    marginBottom: '8px',
  },
  sliderLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  value: {
    fontSize: '13px',
    fontWeight: 700,
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
  },
  btn: {
    flexGrow: 1,
    padding: '10px 4px',
    textAlign: 'center',
  },
  swatchRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    padding: '4px 2px',
  },
  swatch: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  globalActions: {
    marginTop: 'auto',
  },
}
