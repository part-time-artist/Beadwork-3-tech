import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// ── Constants ──────────────────────────────────────────────────────────────────

const RATIOS = [
  { label: '1:1', w: 1, h: 1 },
  { label: '2:3', w: 2, h: 3 },
  { label: '3:4', w: 3, h: 4 },
];

const UNITS = ['mm', 'cm', 'inch', 'm'];
const TO_CM = { mm: 0.1, cm: 1, inch: 2.54, m: 100 };

const DENSITY_PRESETS = [
  { label: 'Extra fine (5/cm)', value: 5 },
  { label: 'Fine (4/cm)',       value: 4 },
  { label: 'Medium (3/cm)',     value: 3 },
  { label: 'Coarse (2/cm)',     value: 2 },
];

const REPEAT_PATTERNS = [
  { value: 'grid',     label: 'Grid (straight)' },
  { value: 'brick_h',  label: 'Brick (horizontal)' },
  { value: 'halfdrop', label: 'Half-drop (vertical)' },
  { value: 'mirror_x', label: 'Mirror X' },
  { value: 'mirror_y', label: 'Mirror Y' },
  { value: 'mirror_4', label: '4-way Mirror' },
];

const DEFAULT_PALETTE = [
  '#000000','#111111','#333333','#555555','#777777','#999999','#aaaaaa','#cccccc','#e5e5e5','#ffffff',
  '#ff0000','#cc0000','#990000','#ff4444','#ff9999','#ffcccc',
  '#ff6600','#ff8800','#ffaa00','#ffcc00','#ffdd88',
  '#ffff00','#dddd00','#aaaa00','#ffff99',
  '#00cc00','#009900','#006600','#003300','#44dd44','#99ee99','#ccffcc','#00aa55',
  '#00cccc','#009999','#006666','#aaffff',
  '#0000ff','#0000cc','#000099','#0066ff','#0099ff','#44aaff','#99ccff','#cce5ff',
  '#6600cc','#9900ff','#cc44ff','#eeccff','#330066',
  '#ff00ff','#ff44bb','#ff88dd','#ffccee','#cc0066','#ff0066',
  '#4d2600','#7a3d00','#a05c00','#c98a3a','#ddb882','#f0d0a8','#f5e6d0',
];

const PANEL_W    = 290;
const RULER_SZ   = 24;
const PAD        = 20;
const MINIMAP_W  = 180;
const MINIMAP_H  = 140;

// ── Theme ──────────────────────────────────────────────────────────────────────

const T = {
  bg:      '#1a1714',
  panel:   '#1e1a17',
  section: '#251f1a',
  accent:  '#c8956c',
  text:    '#e8ddd4',
  muted:   '#8a7060',
  border:  '#3a3028',
  canvas:  '#2a2420',
};

// ── Style helpers ──────────────────────────────────────────────────────────────

function chipBtn(active, extra) {
  return {
    background: active ? T.accent : T.section,
    color: active ? '#1a1714' : T.text,
    border: `1px solid ${active ? T.accent : T.border}`,
    padding: '5px 10px', cursor: 'pointer',
    borderRadius: 3, fontSize: 12,
    ...extra,
  };
}

const inp = {
  background: T.section, color: T.text,
  border: `1px solid ${T.border}`,
  padding: '5px 8px', borderRadius: 3,
  fontFamily: 'monospace', fontSize: 12, width: '100%',
};

// ── Utility functions ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}

function hsvToRgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
  let r=0,g=0,b=0;
  if      (h < 60)  { r=c;g=x;b=0; }
  else if (h < 120) { r=x;g=c;b=0; }
  else if (h < 180) { r=0;g=c;b=x; }
  else if (h < 240) { r=0;g=x;b=c; }
  else if (h < 300) { r=x;g=0;b=c; }
  else              { r=c;g=0;b=x; }
  return [Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)];
}

function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

function hexToHsv(hex) {
  const [r,g,b] = hexToRgb(hex);
  const rf=r/255, gf=g/255, bf=b/255;
  const max=Math.max(rf,gf,bf), min=Math.min(rf,gf,bf), d=max-min;
  const v=max, s=max===0?0:d/max;
  let h=0;
  if (d!==0) {
    if (max===rf)      h=((gf-bf)/d)%6;
    else if (max===gf) h=(bf-rf)/d+2;
    else               h=(rf-gf)/d+4;
    h=h*60; if(h<0) h+=360;
  }
  return [h, s, v];
}

function cloneCanvas(src) {
  const c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  c.getContext('2d').drawImage(src, 0, 0);
  return c;
}

function flipH(src) {
  const c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  const ctx = c.getContext('2d');
  ctx.translate(src.width, 0); ctx.scale(-1, 1); ctx.drawImage(src, 0, 0);
  return c;
}

function flipV(src) {
  const c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  const ctx = c.getContext('2d');
  ctx.translate(0, src.height); ctx.scale(1, -1); ctx.drawImage(src, 0, 0);
  return c;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ background: T.section, border: `1px solid ${T.border}`, borderRadius: 4, padding: '10px 10px' }}>
      <div style={{ color: T.accent, fontSize: 10, letterSpacing: 1.5, marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children, flex }) {
  return (
    <div style={{ flex: flex || 1 }}>
      <div style={{ color: T.muted, fontSize: 9, marginBottom: 3, letterSpacing: 1 }}>{label}</div>
      {children}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Home() {
  const bgRef        = useRef();
  const drawRef      = useRef();
  const gridRef      = useRef();
  const rulerTopRef  = useRef();
  const rulerLeftRef = useRef();
  const minimapRef    = useRef();
  const scrollAreaRef = useRef();
  const pickerRef     = useRef();
  const hueStripRef   = useRef();

  // HSV picker live refs
  const hueRef        = useRef(0);
  const satRef        = useRef(0);
  const valRef        = useRef(0);
  const isPickingRef  = useRef(false);
  const isPickingHueRef = useRef(false);

  // Live refs (avoid stale closures)
  const isDrawing      = useRef(false);
  const isPanning      = useRef(false);
  const panStart       = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const history        = useRef([]);
  const future         = useRef([]);
  const baseSizeRef    = useRef(12);
  const ratioRef       = useRef(RATIOS[0]);
  const colorRef       = useRef('#000000');
  const isEraserRef    = useRef(false);
  const showGridRef    = useRef(true);
  const exportGridRef  = useRef(true);
  const beadsRef       = useRef({ cols: 30, rows: 45 });
  const densityRef     = useRef(3);
  const unitRef        = useRef('cm');
  const bgTypeRef      = useRef('solid');
  const bgColorRef     = useRef('#ffffff');
  const bgImageRef     = useRef(null);
  const pendingPattern = useRef(null);

  // UI state
  const [ratio, setRatio]                   = useState(RATIOS[0]);
  const [color, setColor]                   = useState('#000000');
  const [hexInput, setHexInput]             = useState('#000000');
  const [isEraser, setIsEraser]             = useState(false);
  const [showGrid, setShowGrid]             = useState(true);
  const [exportWithGrid, setExportWithGrid] = useState(true);
  const [canvasSize, setCanvasSize]         = useState({ w: 0, h: 0 });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [bgType, setBgType]                 = useState('solid');
  const [bgColor, setBgColor]               = useState('#ffffff');
  const [bgHex, setBgHex]                   = useState('#ffffff');
  const [bgImage, setBgImage]               = useState(null);

  // Setup
  const [setupW, setSetupW]   = useState('10');
  const [setupH, setSetupH]   = useState('15');
  const [unit, setUnit]       = useState('cm');
  const [density, setDensity] = useState(3);

  // Pattern
  const [patternType, setPatternType]   = useState('grid');
  const [patternRW, setPatternRW]       = useState(2);
  const [patternRH, setPatternRH]       = useState(2);

  // Palettes
  const [palettes, setPalettes]                   = useState([]);
  const [activePaletteId, setActivePaletteId]     = useState('default');
  const [showNewPaletteInput, setShowNewPaletteInput] = useState(false);
  const [newPaletteName, setNewPaletteName]         = useState('');

  // ── Geometry ───────────────────────────────────────────────────────────────

  function getBead() {
    const bs = baseSizeRef.current;
    const r  = ratioRef.current;
    return { w: bs, h: Math.round(bs * r.h / r.w) };
  }

  function beadsFromSetup(w, h, u, d) {
    return {
      cols: Math.max(2, Math.round(parseFloat(w) * TO_CM[u] * d)),
      rows: Math.max(2, Math.round(parseFloat(h) * TO_CM[u] * d)),
    };
  }

  // ── Background ─────────────────────────────────────────────────────────────

  function drawBackground() {
    const c = bgRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    if (bgTypeRef.current === 'transparent') return;
    if (bgTypeRef.current === 'solid') {
      ctx.fillStyle = bgColorRef.current;
      ctx.fillRect(0, 0, c.width, c.height);
    } else if (bgTypeRef.current === 'image' && bgImageRef.current) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, c.width, c.height);
      img.src = bgImageRef.current;
    }
  }

  // ── Draw bead ──────────────────────────────────────────────────────────────

  function paintBead(ctx, col, row, fillColor) {
    const { w, h } = getBead();
    const x = col * w, y = row * h;
    ctx.clearRect(x, y, w, h);
    if (fillColor === null) return;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/2, w/2 - w*0.08, h/2 - h*0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── Grid ───────────────────────────────────────────────────────────────────

  function drawGrid() {
    const c = gridRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    if (!showGridRef.current) return;
    const { w, h } = getBead();
    const { cols, rows } = beadsRef.current;
    ctx.strokeStyle = 'rgba(130,110,90,0.4)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i*w,0); ctx.lineTo(i*w,rows*h); ctx.stroke(); }
    for (let i = 0; i <= rows; i++) { ctx.beginPath(); ctx.moveTo(0,i*h); ctx.lineTo(cols*w,i*h); ctx.stroke(); }
  }

  // ── Rulers ─────────────────────────────────────────────────────────────────

  function drawRulers() {
    const { w: bw, h: bh } = getBead();
    const { cols, rows } = beadsRef.current;
    const d = densityRef.current;
    const u = unitRef.current;

    // How many beads per 1 unit (cm, inch, etc.)
    const beadsPerUnit = d * TO_CM[u]; // beads per unit
    // We want to label every whole unit interval
    // Find tick spacing in beads: 1 unit = beadsPerUnit beads
    // If beadsPerUnit < 1, label every 1/beadsPerUnit units
    const tickEvery = Math.max(1, Math.round(beadsPerUnit)); // beads between each tick

    function unitLabel(beadIdx) {
      const val = beadIdx / beadsPerUnit;
      return val % 1 === 0 ? `${Math.round(val)}${u}` : `${val.toFixed(1)}${u}`;
    }

    // TOP ruler
    const top = rulerTopRef.current;
    if (top) {
      top.width = cols * bw;
      top.height = RULER_SZ;
      const ctx = top.getContext('2d');
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, top.width, top.height);
      // bottom border line
      ctx.strokeStyle = T.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, RULER_SZ - 1); ctx.lineTo(top.width, RULER_SZ - 1); ctx.stroke();

      ctx.font = '9px monospace';
      ctx.textAlign = 'left';

      for (let i = 0; i <= cols; i++) {
        const x = i * bw;
        const isMajor = (i % tickEvery === 0);
        const isMid   = (i % Math.max(1, Math.round(tickEvery / 2)) === 0);
        const tH = isMajor ? 10 : isMid ? 6 : 3;
        ctx.strokeStyle = isMajor ? T.muted : T.border;
        ctx.lineWidth = isMajor ? 1 : 0.5;
        ctx.beginPath(); ctx.moveTo(x + 0.5, RULER_SZ - 1); ctx.lineTo(x + 0.5, RULER_SZ - 1 - tH); ctx.stroke();
        if (isMajor && i > 0) {
          ctx.fillStyle = T.muted;
          ctx.fillText(unitLabel(i), x + 2, RULER_SZ - 12);
        }
      }
    }

    // LEFT ruler
    const left = rulerLeftRef.current;
    if (left) {
      left.width = RULER_SZ;
      left.height = rows * bh;
      const ctx = left.getContext('2d');
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, left.width, left.height);
      // right border line
      ctx.strokeStyle = T.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(RULER_SZ - 1, 0); ctx.lineTo(RULER_SZ - 1, left.height); ctx.stroke();

      ctx.font = '9px monospace';

      for (let i = 0; i <= rows; i++) {
        const y = i * bh;
        const isMajor = (i % tickEvery === 0);
        const isMid   = (i % Math.max(1, Math.round(tickEvery / 2)) === 0);
        const tW = isMajor ? 10 : isMid ? 6 : 3;
        ctx.strokeStyle = isMajor ? T.muted : T.border;
        ctx.lineWidth = isMajor ? 1 : 0.5;
        ctx.beginPath(); ctx.moveTo(RULER_SZ - 1, y + 0.5); ctx.lineTo(RULER_SZ - 1 - tW, y + 0.5); ctx.stroke();
        if (isMajor && i > 0) {
          ctx.save();
          ctx.fillStyle = T.muted;
          ctx.textAlign = 'center';
          ctx.translate(RULER_SZ - 12, y - 2);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(unitLabel(i), 0, 0);
          ctx.restore();
        }
      }
    }
  }

  // ── Color picker ───────────────────────────────────────────────────────────

  function drawPicker() {
    const c = pickerRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    const [hr, hg, hb] = hsvToRgb(hueRef.current, 1, 1);
    // SV gradient
    const gH = ctx.createLinearGradient(0, 0, W, 0);
    gH.addColorStop(0, '#fff');
    gH.addColorStop(1, `rgb(${hr},${hg},${hb})`);
    ctx.fillStyle = gH; ctx.fillRect(0, 0, W, H);
    const gV = ctx.createLinearGradient(0, 0, 0, H);
    gV.addColorStop(0, 'rgba(0,0,0,0)');
    gV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gV; ctx.fillRect(0, 0, W, H);
    // cursor
    const cx = satRef.current * W;
    const cy = (1 - valRef.current) * H;
    ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI*2);
    ctx.strokeStyle = valRef.current > 0.45 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
  }

  function drawHueStrip() {
    const c = hueStripRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    for (let i = 0; i <= 12; i++) {
      const [r,g,b] = hsvToRgb(i*30, 1, 1);
      grad.addColorStop(i/12, `rgb(${r},${g},${b})`);
    }
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    // cursor
    const cx = Math.round((hueRef.current / 360) * W);
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(cx-2, 0, 4, H);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx-3, 0.75, 6, H-1.5);
  }

  function commitPickerColor() {
    const [r,g,b] = hsvToRgb(hueRef.current, satRef.current, valRef.current);
    applyColor(rgbToHex(r, g, b));
    drawPicker();
    drawHueStrip();
  }

  function handlePickerDown(e) {
    isPickingRef.current = true;
    updateSVFromEvent(e);
  }
  function handlePickerMove(e) {
    if (!isPickingRef.current) return;
    updateSVFromEvent(e);
  }
  function handlePickerUp() { isPickingRef.current = false; }

  function updateSVFromEvent(e) {
    const c = pickerRef.current;
    const rect = c.getBoundingClientRect();
    satRef.current = Math.max(0, Math.min(1, (e.clientX - rect.left) / c.width));
    valRef.current = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / c.height));
    commitPickerColor();
  }

  function handleHueDown(e) {
    isPickingHueRef.current = true;
    updateHueFromEvent(e);
  }
  function handleHueMove(e) {
    if (!isPickingHueRef.current) return;
    updateHueFromEvent(e);
  }
  function handleHueUp() { isPickingHueRef.current = false; }

  function updateHueFromEvent(e) {
    const c = hueStripRef.current;
    const rect = c.getBoundingClientRect();
    hueRef.current = Math.max(0, Math.min(360, ((e.clientX - rect.left) / c.width) * 360));
    commitPickerColor();
  }

  // Sync picker when applyColor is called from outside (palette click, hex input)
  function syncPickerToColor(hex) {
    const [h, s, v] = hexToHsv(hex);
    hueRef.current = h; satRef.current = s; valRef.current = v;
    drawPicker(); drawHueStrip();
  }

  // ── Mini-map ───────────────────────────────────────────────────────────────

  function updateMinimap() {
    const mm = minimapRef.current;
    if (!mm || !drawRef.current) return;
    const ctx = mm.getContext('2d');
    ctx.clearRect(0, 0, MINIMAP_W, MINIMAP_H);
    // dark background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, MINIMAP_W, MINIMAP_H);
    // scale to fit
    const scaleX = MINIMAP_W / drawRef.current.width;
    const scaleY = MINIMAP_H / drawRef.current.height;
    const scale  = Math.min(scaleX, scaleY);
    const offX   = (MINIMAP_W - drawRef.current.width  * scale) / 2;
    const offY   = (MINIMAP_H - drawRef.current.height * scale) / 2;
    // draw bg + beads
    if (bgRef.current) ctx.drawImage(bgRef.current,   offX, offY, drawRef.current.width * scale, drawRef.current.height * scale);
    ctx.drawImage(drawRef.current, offX, offY, drawRef.current.width * scale, drawRef.current.height * scale);
    // viewport rect
    if (scrollAreaRef.current) {
      const sa = scrollAreaRef.current;
      const vx = (sa.scrollLeft - PAD) * scale + offX;
      const vy = (sa.scrollTop  - PAD) * scale + offY;
      const vw = sa.clientWidth  * scale;
      const vh = sa.clientHeight * scale;
      ctx.strokeStyle = T.accent;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(vx, vy, vw, vh);
    }
  }

  // ── Canvas init ────────────────────────────────────────────────────────────

  function initCanvas() {
    const c = drawRef.current;
    if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    history.current = [];
    future.current  = [];
  }

  function createCanvas() {
    const { cols, rows } = beadsFromSetup(setupW, setupH, unit, density);
    beadsRef.current  = { cols, rows };
    densityRef.current = density;
    unitRef.current    = unit;
    const { w, h } = getBead();
    setCanvasSize({ w: cols * w, h: rows * h });
  }

  // ── History ────────────────────────────────────────────────────────────────

  function saveHistory() {
    const c = drawRef.current;
    if (!c) return;
    history.current.push(c.getContext('2d').getImageData(0, 0, c.width, c.height));
    future.current = [];
    if (history.current.length > 50) history.current.shift();
  }

  function undo() {
    if (!history.current.length) return;
    const c = drawRef.current, ctx = c.getContext('2d');
    future.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.putImageData(history.current.pop(), 0, 0);
  }

  function redo() {
    if (!future.current.length) return;
    const c = drawRef.current, ctx = c.getContext('2d');
    history.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.putImageData(future.current.pop(), 0, 0);
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  function saveCanvas() {
    const temp = document.createElement('canvas');
    temp.width  = drawRef.current.width;
    temp.height = drawRef.current.height;
    const ctx = temp.getContext('2d');
    ctx.drawImage(bgRef.current, 0, 0);
    ctx.drawImage(drawRef.current, 0, 0);
    if (exportGridRef.current) ctx.drawImage(gridRef.current, 0, 0);
    const a = document.createElement('a');
    a.href = temp.toDataURL('image/png');
    a.download = 'beadwork.png';
    a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

  // ── Mouse drawing ──────────────────────────────────────────────────────────

  function cellFromEvent(e) {
    const rect = drawRef.current.getBoundingClientRect();
    const { w, h } = getBead();
    const col = Math.floor((e.clientX - rect.left) / w);
    const row = Math.floor((e.clientY - rect.top)  / h);
    const { cols, rows } = beadsRef.current;
    if (col < 0 || row < 0 || col >= cols || row >= rows) return null;
    return { col, row };
  }

  function doPaint(e) {
    const cell = cellFromEvent(e);
    if (!cell) return;
    paintBead(drawRef.current.getContext('2d'), cell.col, cell.row, isEraserRef.current ? null : colorRef.current);
  }

  function handleMouseDown(e) {
    if (e.button !== 0) return;
    saveHistory(); isDrawing.current = true; doPaint(e);
  }
  function handleMouseMove(e) {
    if (isDrawing.current) { doPaint(e); updateMinimap(); }
  }
  function handleMouseUp() { isDrawing.current = false; }

  // Right-click drag to pan the scroll area
  function handleScrollAreaMouseDown(e) {
    if (e.button !== 2) return;
    e.preventDefault();
    isPanning.current = true;
    panStart.current = {
      x: e.clientX, y: e.clientY,
      scrollLeft: scrollAreaRef.current.scrollLeft,
      scrollTop:  scrollAreaRef.current.scrollTop,
    };
  }
  function handleScrollAreaMouseMove(e) {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    scrollAreaRef.current.scrollLeft = panStart.current.scrollLeft - dx;
    scrollAreaRef.current.scrollTop  = panStart.current.scrollTop  - dy;
    updateMinimap();
  }
  function handleScrollAreaMouseUp(e) {
    if (e.button === 2) isPanning.current = false;
  }

  // ── Flood fill (drag & drop) ───────────────────────────────────────────────

  function cellPixel(ctx, col, row) {
    const { w, h } = getBead();
    const d = ctx.getImageData(Math.floor(col*w + w/2), Math.floor(row*h + h/2), 1, 1).data;
    return [d[0], d[1], d[2], d[3]];
  }

  function pixelMatch(a, b, thr = 15) {
    const aT = a[3] < 30, bT = b[3] < 30;
    if (aT && bT) return true;
    if (aT !== bT) return false;
    return Math.abs(a[0]-b[0]) < thr && Math.abs(a[1]-b[1]) < thr && Math.abs(a[2]-b[2]) < thr;
  }

  function floodFill(startCol, startRow, fillColor) {
    const c = drawRef.current, ctx = c.getContext('2d');
    const { cols, rows } = beadsRef.current;
    const target = cellPixel(ctx, startCol, startRow);
    const [fr,fg,fb] = hexToRgb(fillColor);
    if (pixelMatch(target, [fr,fg,fb,255])) return;
    saveHistory();
    const queue   = [[startCol, startRow]];
    const visited = new Set();
    while (queue.length) {
      const [col, row] = queue.shift();
      const key = `${col},${row}`;
      if (visited.has(key) || col<0 || row<0 || col>=cols || row>=rows) continue;
      visited.add(key);
      if (!pixelMatch(cellPixel(ctx, col, row), target)) continue;
      paintBead(ctx, col, row, fillColor);
      queue.push([col+1,row],[col-1,row],[col,row+1],[col,row-1]);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const fc = e.dataTransfer.getData('color');
    if (!fc) return;
    const cell = cellFromEvent(e);
    if (cell) floodFill(cell.col, cell.row, fc);
  }

  // ── Keyboard ───────────────────────────────────────────────────────────────

  function handleKeyDown(e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && e.key === 'z') { e.preventDefault(); undo(); }
    if (ctrl && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) { e.preventDefault(); redo(); }
  }

  // ── Control helpers ────────────────────────────────────────────────────────

  function applyColor(c) {
    colorRef.current = c; setColor(c); setHexInput(c);
    isEraserRef.current = false; setIsEraser(false);
  }

  function applyColorFromPicker(c) {
    colorRef.current = c; setColor(c); setHexInput(c);
    isEraserRef.current = false; setIsEraser(false);
    // Don't sync picker back — it's already driving
  }

  function applyColorExternal(c) {
    applyColor(c);
    syncPickerToColor(c);
  }

  function applyRatio(r) {
    ratioRef.current = r; setRatio(r);
    const { cols, rows } = beadsRef.current;
    const bs = baseSizeRef.current;
    setCanvasSize({ w: cols * bs, h: rows * Math.round(bs * r.h / r.w) });
  }

  function applyBgType(type) {
    bgTypeRef.current = type; setBgType(type); drawBackground();
  }

  function applyBgColor(c) {
    bgColorRef.current = c; setBgColor(c); setBgHex(c);
    if (bgTypeRef.current === 'solid') drawBackground();
  }

  // ── Pattern tiling ─────────────────────────────────────────────────────────

  function applyPattern() {
    const src = drawRef.current;
    if (!src) return;
    const motif = cloneCanvas(src);
    const mW = motif.width, mH = motif.height;
    const rW = Math.max(1, parseInt(patternRW) || 2);
    const rH = Math.max(1, parseInt(patternRH) || 2);
    const halfW = Math.floor(mW / 2), halfH = Math.floor(mH / 2);

    let unitC, newW, newH;

    if (patternType === 'grid') {
      unitC = motif; newW = mW * rW; newH = mH * rH;
    } else if (patternType === 'brick_h') {
      unitC = motif; newW = mW * rW + halfW; newH = mH * rH;
    } else if (patternType === 'halfdrop') {
      unitC = motif; newW = mW * rW; newH = mH * rH + halfH;
    } else if (patternType === 'mirror_x') {
      unitC = document.createElement('canvas');
      unitC.width = mW * 2; unitC.height = mH;
      const ux = unitC.getContext('2d');
      ux.drawImage(motif, 0, 0); ux.drawImage(flipH(motif), mW, 0);
      newW = unitC.width * rW; newH = mH * rH;
    } else if (patternType === 'mirror_y') {
      unitC = document.createElement('canvas');
      unitC.width = mW; unitC.height = mH * 2;
      const uy = unitC.getContext('2d');
      uy.drawImage(motif, 0, 0); uy.drawImage(flipV(motif), 0, mH);
      newW = mW * rW; newH = unitC.height * rH;
    } else if (patternType === 'mirror_4') {
      const fh = flipH(motif), fv = flipV(motif), fhv = flipV(fh);
      unitC = document.createElement('canvas');
      unitC.width = mW * 2; unitC.height = mH * 2;
      const u4 = unitC.getContext('2d');
      u4.drawImage(motif, 0, 0); u4.drawImage(fh, mW, 0);
      u4.drawImage(fv, 0, mH); u4.drawImage(fhv, mW, mH);
      newW = unitC.width * rW; newH = unitC.height * rH;
    }

    const { w: bw, h: bh } = getBead();
    beadsRef.current = { cols: Math.round(newW / bw), rows: Math.round(newH / bh) };
    pendingPattern.current = { unitC, mW, mH, halfW, halfH, rW, rH, type: patternType, newW, newH };
    setCanvasSize({ w: newW, h: newH });
  }

  function renderPendingPattern() {
    const p = pendingPattern.current;
    if (!p) return;
    const ctx = drawRef.current.getContext('2d');
    ctx.clearRect(0, 0, drawRef.current.width, drawRef.current.height);
    const { unitC, mW, mH, halfW, halfH, rW, rH, type } = p;
    for (let rx = 0; rx < rW; rx++) {
      for (let ry = 0; ry < rH; ry++) {
        let ox = rx * (type === 'mirror_x' || type === 'mirror_4' ? unitC.width  : mW);
        let oy = ry * (type === 'mirror_y' || type === 'mirror_4' ? unitC.height : mH);
        if (type === 'brick_h')  ox += (ry % 2 === 1 ? halfW : 0);
        if (type === 'halfdrop') oy += (rx % 2 === 1 ? halfH : 0);
        ctx.drawImage(unitC, ox, oy);
      }
    }
  }

  // ── Custom palettes ────────────────────────────────────────────────────────

  const activePalette = activePaletteId === 'default'
    ? DEFAULT_PALETTE
    : ((palettes.find(p => p.id === activePaletteId) || {}).colors || DEFAULT_PALETTE);

  function savePalettes(updated) {
    setPalettes(updated);
    try { localStorage.setItem('beadtool_palettes', JSON.stringify(updated)); } catch {}
  }

  function addPalette() {
    if (!newPaletteName.trim()) return;
    const id = Date.now().toString();
    savePalettes([...palettes, { id, name: newPaletteName.trim(), colors: [] }]);
    setActivePaletteId(id);
    setNewPaletteName(''); setShowNewPaletteInput(false);
  }

  function deletePalette(id) {
    savePalettes(palettes.filter(p => p.id !== id));
    setActivePaletteId('default');
  }

  function addColorToPalette(id) {
    savePalettes(palettes.map(p =>
      p.id === id && !p.colors.includes(colorRef.current)
        ? { ...p, colors: [...p.colors, colorRef.current] }
        : p
    ));
  }

  function removeColorFromPalette(pid, col) {
    savePalettes(palettes.map(p =>
      p.id === pid ? { ...p, colors: p.colors.filter(c => c !== col) } : p
    ));
  }

  // ── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('beadtool_palettes') || '[]');
      setPalettes(saved);
    } catch {}
    createCanvas();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mouseup', () => {
      isPickingRef.current = false;
      isPickingHueRef.current = false;
    });
    setTimeout(() => { drawPicker(); drawHueStrip(); }, 100);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (canvasSize.w > 0) {
      setTimeout(() => {
        if (pendingPattern.current) {
          renderPendingPattern();
          pendingPattern.current = null;
        } else {
          initCanvas();
        }
        drawBackground();
        drawGrid();
        drawRulers();
        updateMinimap();
      }, 0);
    }
  }, [canvasSize]);

  useEffect(() => { drawGrid(); }, [showGrid]);
  useEffect(() => { drawBackground(); setTimeout(updateMinimap, 50); }, [bgType, bgColor]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const preview = beadsFromSetup(setupW, setupH, unit, density);
  const cW = canvasSize.w || 1;
  const cH = canvasSize.h || 1;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: T.bg }}>
      <Head>
        <title>Beadwork Studio</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet" />
      </Head>
      <style global jsx>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; font-family: monospace; }
        input, select, button { font-family: monospace; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        button:hover { opacity: 0.85; }
        input[type=checkbox] { accent-color: ${T.accent}; }
      `}</style>

      {/* ── Scrollable canvas area ── */}
      <div
        ref={scrollAreaRef}
        onScroll={updateMinimap}
        onMouseDown={handleScrollAreaMouseDown}
        onMouseMove={handleScrollAreaMouseMove}
        onMouseUp={handleScrollAreaMouseUp}
        onContextMenu={e => e.preventDefault()}
        style={{
          position: 'absolute', left: 0, top: 0,
          width: `calc(100vw - ${PANEL_W}px)`, height: '100vh',
          overflow: 'auto', background: T.canvas,
        }}>
        <div style={{
          display: 'inline-grid',
          gridTemplateColumns: `${RULER_SZ}px ${cW}px`,
          gridTemplateRows:    `${RULER_SZ}px ${cH}px`,
          padding: PAD, gap: 0,
          minWidth: '100%', minHeight: '100%',
        }}>
          {/* Corner */}
          <div style={{ background: T.bg, position: 'sticky', top: PAD, left: PAD, zIndex: 5 }} />

          {/* Top ruler */}
          <div style={{ position: 'sticky', top: PAD, zIndex: 4, background: T.bg, overflow: 'hidden' }}>
            <canvas ref={rulerTopRef} style={{ display: 'block' }} />
          </div>

          {/* Left ruler */}
          <div style={{ position: 'sticky', left: PAD, zIndex: 4, background: T.bg, overflow: 'hidden' }}>
            <canvas ref={rulerLeftRef} style={{ display: 'block' }} />
          </div>

          {/* Canvas stack */}
          <div
            style={{ position: 'relative', width: cW, height: cH }}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {bgType === 'transparent' && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: 'repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%)',
                backgroundSize: '16px 16px',
              }} />
            )}
            <canvas ref={bgRef}   width={cW} height={cH} style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }} />
            <canvas ref={drawRef} width={cW} height={cH}
              style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, cursor: isEraser ? 'cell' : 'crosshair', userSelect: 'none' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <canvas ref={gridRef} width={cW} height={cH}
              style={{ position: 'absolute', left: 0, top: 0, zIndex: 3, pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* ── Mini-map ── */}
      <div style={{
        position: 'fixed', left: 10, bottom: 10, zIndex: 20,
        background: '#111', border: `1px solid ${T.border}`,
        borderRadius: 4, overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
      }}>
        <div style={{ padding: '3px 6px', fontSize: 9, color: T.muted, letterSpacing: 1, borderBottom: `1px solid ${T.border}` }}>
          OVERVIEW
        </div>
        <canvas ref={minimapRef} width={MINIMAP_W} height={MINIMAP_H} style={{ display: 'block' }} />
      </div>

      {/* ── Right panel ── */}
      <div style={{
        position: 'fixed', right: 0, top: 0,
        width: PANEL_W, height: '100vh',
        background: T.panel, color: T.text,
        display: 'flex', flexDirection: 'column',
        borderLeft: `1px solid ${T.border}`,
        zIndex: 10, overflowY: 'auto',
      }}>
        {/* Save — prominent top bar */}
        <button onClick={saveCanvas} style={{
          background: 'linear-gradient(135deg, #b87333, #d4a040)',
          color: '#1a1714', fontWeight: 700, fontSize: 13,
          border: 'none', padding: '13px 16px',
          cursor: 'pointer', textAlign: 'center',
          letterSpacing: 1.5, flexShrink: 0,
          fontFamily: "'Playfair Display', serif",
        }}>
          ↓  SAVE ARTWORK
        </button>

        <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Title */}
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: T.text, letterSpacing: 0.5, fontStyle: 'italic' }}>
            Beadwork Studio
          </div>

          {/* Canvas setup */}
          <Section title="Canvas Size">
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <Field label="WIDTH">
                <input type="number" min="0.1" step="0.1" value={setupW}
                  onChange={e => setSetupW(e.target.value)} style={inp} />
              </Field>
              <Field label="HEIGHT">
                <input type="number" min="0.1" step="0.1" value={setupH}
                  onChange={e => setSetupH(e.target.value)} style={inp} />
              </Field>
              <Field label="UNIT" flex={0.7}>
                <select value={unit} onChange={e => setUnit(e.target.value)} style={{ ...inp, width: 52 }}>
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
              </Field>
            </div>
            <Field label="BEAD DENSITY">
              <select value={density} onChange={e => setDensity(Number(e.target.value))} style={inp}>
                {DENSITY_PRESETS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </Field>
            <div style={{ color: T.muted, fontSize: 11, margin: '6px 0' }}>
              = {preview.cols} × {preview.rows} beads
            </div>
            <button onClick={createCanvas} style={{
              background: '#253525', color: '#7daa6d', border: '1px solid #3a5a3a',
              padding: '7px 12px', cursor: 'pointer', borderRadius: 3, width: '100%', fontSize: 12,
            }}>✦ Create Canvas</button>
          </Section>

          {/* Palette */}
          <Section title="Palette">
            <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
              <select value={activePaletteId} onChange={e => setActivePaletteId(e.target.value)}
                style={{ ...inp, flex: 1 }}>
                <option value="default">Default</option>
                {palettes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button onClick={() => setShowNewPaletteInput(!showNewPaletteInput)}
                style={{ ...chipBtn(false), padding: '5px 9px', flexShrink: 0 }}>＋</button>
            </div>
            {showNewPaletteInput && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input value={newPaletteName} onChange={e => setNewPaletteName(e.target.value)}
                  placeholder="Palette name…" style={{ ...inp, flex: 1 }}
                  onKeyDown={e => e.key === 'Enter' && addPalette()} autoFocus />
                <button onClick={addPalette} style={{ ...chipBtn(true), flexShrink: 0 }}>OK</button>
              </div>
            )}
            {activePaletteId !== 'default' && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <button onClick={() => addColorToPalette(activePaletteId)}
                  style={{ ...chipBtn(false), flex: 1, fontSize: 11 }}>＋ Add current color</button>
                <button onClick={() => deletePalette(activePaletteId)}
                  style={{ ...chipBtn(false), color: '#cc7777', fontSize: 11 }}>🗑 Delete</button>
              </div>
            )}
          </Section>

          {/* Color picker */}
          <Section title="Color">
            {/* SV gradient picker */}
            <canvas
              ref={pickerRef}
              width={242} height={148}
              style={{ display: 'block', width: '100%', borderRadius: 3, cursor: 'crosshair', marginBottom: 6, border: `1px solid ${T.border}` }}
              onMouseDown={handlePickerDown}
              onMouseMove={handlePickerMove}
              onMouseUp={handlePickerUp}
            />
            {/* Hue rainbow strip */}
            <canvas
              ref={hueStripRef}
              width={242} height={14}
              style={{ display: 'block', width: '100%', borderRadius: 3, cursor: 'ew-resize', marginBottom: 8, border: `1px solid ${T.border}` }}
              onMouseDown={handleHueDown}
              onMouseMove={handleHueMove}
              onMouseUp={handleHueUp}
            />
            {/* Active color swatch + hex */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div
                draggable
                onDragStart={e => e.dataTransfer.setData('color', color)}
                title="Drag onto canvas to flood fill"
                style={{
                  width: 38, height: 38, flexShrink: 0, borderRadius: 3,
                  background: isEraser ? '#fff' : color,
                  border: isEraser ? '2px solid #cc7777' : `2px solid ${T.border}`,
                  cursor: 'grab',
                }}
              />
              <input
                value={hexInput}
                onChange={e => {
                  setHexInput(e.target.value);
                  if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) applyColorExternal(e.target.value);
                }}
                placeholder="#000000"
                style={inp}
              />
            </div>
            {/* Palette swatches */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {activePalette.map(c => (
                <div key={c} title={c} draggable
                  onDragStart={e => e.dataTransfer.setData('color', c)}
                  onClick={() => applyColorExternal(c)}
                  style={{
                    width: 20, height: 20, background: c, cursor: 'grab',
                    borderRadius: 2, flexShrink: 0, position: 'relative',
                    border: color === c && !isEraser ? `2px solid ${T.accent}` : `1px solid ${T.border}`,
                  }}
                >
                  {activePaletteId !== 'default' && (
                    <div onClick={e => { e.stopPropagation(); removeColorFromPalette(activePaletteId, c); }}
                      style={{
                        position: 'absolute', top: -4, right: -4, width: 10, height: 10,
                        background: '#993333', borderRadius: '50%', fontSize: 7,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', cursor: 'pointer', zIndex: 1,
                      }}>✕</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ color: T.muted, fontSize: 10, marginTop: 5 }}>
              Drag swatch or active color onto canvas to flood fill
            </div>
          </Section>

          {/* Tool */}
          <Section title="Tool">
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { isEraserRef.current = false; setIsEraser(false); }}
                style={{ ...chipBtn(!isEraser), flex: 1 }}>✏ Draw</button>
              <button onClick={() => { isEraserRef.current = true; setIsEraser(true); }}
                style={{ ...chipBtn(isEraser), flex: 1 }}>⌫ Erase</button>
            </div>
          </Section>

          {/* Bead ratio */}
          <Section title="Bead Ratio (W:H)">
            <div style={{ display: 'flex', gap: 6 }}>
              {RATIOS.map(r => (
                <button key={r.label} onClick={() => applyRatio(r)}
                  style={{ ...chipBtn(ratio.label === r.label), flex: 1 }}>{r.label}</button>
              ))}
            </div>
          </Section>

          {/* Background */}
          <Section title="Background">
            <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
              {['transparent','solid','image'].map(t => (
                <button key={t} onClick={() => applyBgType(t)}
                  style={{ ...chipBtn(bgType === t), flex: 1, fontSize: 11, padding: '5px 4px' }}>{t}</button>
              ))}
            </div>
            {bgType === 'solid' && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, background: bgColor, border: `1px solid ${T.border}`, borderRadius: 3, flexShrink: 0 }} />
                <input value={bgHex}
                  onChange={e => { setBgHex(e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) applyBgColor(e.target.value); }}
                  style={inp} />
              </div>
            )}
            {bgType === 'image' && (
              <div>
                <input type="file" accept="image/jpeg,image/png"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => {
                      bgImageRef.current = ev.target.result;
                      setBgImage(ev.target.result);
                      bgTypeRef.current = 'image'; setBgType('image');
                      drawBackground();
                    };
                    reader.readAsDataURL(file);
                  }}
                  style={{ ...inp, cursor: 'pointer' }} />
                {bgImage && (
                  <button onClick={() => { bgImageRef.current = null; setBgImage(null); applyBgType('solid'); }}
                    style={{ ...chipBtn(false), marginTop: 6, width: '100%', fontSize: 11 }}>Remove image</button>
                )}
              </div>
            )}
          </Section>

          {/* Repeat pattern */}
          <Section title="Repeat Pattern">
            <Field label="PATTERN TYPE">
              <select value={patternType} onChange={e => setPatternType(e.target.value)} style={inp}>
                {REPEAT_PATTERNS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </Field>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Field label="REPEAT W">
                <input type="number" min="1" max="10" value={patternRW}
                  onChange={e => setPatternRW(e.target.value)} style={inp} />
              </Field>
              <Field label="REPEAT H">
                <input type="number" min="1" max="10" value={patternRH}
                  onChange={e => setPatternRH(e.target.value)} style={inp} />
              </Field>
            </div>
            <button onClick={applyPattern} style={{
              background: '#222840', color: '#8899cc', border: '1px solid #3a3d60',
              padding: '7px 12px', cursor: 'pointer', borderRadius: 3, width: '100%', fontSize: 12, marginTop: 8,
            }}>⟳ Apply Repeat</button>
          </Section>

          {/* Grid */}
          <Section title="Grid">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, marginBottom: 5 }}>
              <input type="checkbox" checked={showGrid} onChange={() => { const n = !showGridRef.current; showGridRef.current = n; setShowGrid(n); drawGrid(); }} />
              Show grid while drawing
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12 }}>
              <input type="checkbox" checked={exportWithGrid} onChange={() => { exportGridRef.current = !exportGridRef.current; setExportWithGrid(exportGridRef.current); }} />
              Include grid in export
            </label>
          </Section>

          {/* Actions */}
          <Section title="Actions">
            <button onClick={() => setShowClearConfirm(true)} style={{
              background: T.section, color: '#cc7777', border: `1px solid ${T.border}`,
              borderRadius: 3, padding: '7px 12px', cursor: 'pointer', width: '100%', fontSize: 12, textAlign: 'left',
            }}>✕ Clear canvas</button>
          </Section>

          <div style={{ color: T.muted, fontSize: 11, padding: '6px 2px', borderTop: `1px solid ${T.border}` }}>
            Ctrl+Z  undo  ·  Ctrl+Y  redo
          </div>
        </div>
      </div>

      {/* ── Clear confirmation ── */}
      {showClearConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: T.panel, border: `1px solid ${T.border}`,
            borderRadius: 6, padding: 28, width: 300,
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: T.text, marginBottom: 8 }}>
              Clear canvas?
            </div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 20 }}>
              All your work will be erased. This cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowClearConfirm(false)}
                style={{ ...chipBtn(false), flex: 1, padding: '8px' }}>Cancel</button>
              <button onClick={() => {
                saveHistory(); initCanvas(); drawBackground(); drawGrid();
                setShowClearConfirm(false);
              }} style={{
                flex: 1, padding: '8px', cursor: 'pointer', borderRadius: 3,
                background: '#5a1a1a', color: '#ffaaaa', border: '1px solid #8a3030', fontSize: 12,
              }}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
