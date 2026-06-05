webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/date/now */ "./node_modules/@babel/runtime-corejs2/core-js/date/now.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/set */ "./node_modules/@babel/runtime-corejs2/core-js/set.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_10__);








var _jsxFileName = "W:\\Madhura\\Morii\\beadwork tool\\code\\pages\\index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement;

 // ── Constants ──────────────────────────────────────────────────────────────────

var RATIOS = [{
  label: '1:1',
  w: 1,
  h: 1
}, {
  label: '2:3',
  w: 2,
  h: 3
}, {
  label: '3:4',
  w: 3,
  h: 4
}];
var UNITS = ['mm', 'cm', 'inch', 'm'];
var TO_CM = {
  mm: 0.1,
  cm: 1,
  inch: 2.54,
  m: 100
};
var DENSITY_PRESETS = [{
  label: 'Extra fine (5/cm)',
  value: 5
}, {
  label: 'Fine (4/cm)',
  value: 4
}, {
  label: 'Medium (3/cm)',
  value: 3
}, {
  label: 'Coarse (2/cm)',
  value: 2
}];
var REPEAT_PATTERNS = [{
  value: 'grid',
  label: 'Grid (straight)'
}, {
  value: 'brick_h',
  label: 'Brick (horizontal)'
}, {
  value: 'halfdrop',
  label: 'Half-drop (vertical)'
}, {
  value: 'mirror_x',
  label: 'Mirror X'
}, {
  value: 'mirror_y',
  label: 'Mirror Y'
}, {
  value: 'mirror_4',
  label: '4-way Mirror'
}];
var DEFAULT_PALETTE = ['#000000', '#111111', '#333333', '#555555', '#777777', '#999999', '#aaaaaa', '#cccccc', '#e5e5e5', '#ffffff', '#ff0000', '#cc0000', '#990000', '#ff4444', '#ff9999', '#ffcccc', '#ff6600', '#ff8800', '#ffaa00', '#ffcc00', '#ffdd88', '#ffff00', '#dddd00', '#aaaa00', '#ffff99', '#00cc00', '#009900', '#006600', '#003300', '#44dd44', '#99ee99', '#ccffcc', '#00aa55', '#00cccc', '#009999', '#006666', '#aaffff', '#0000ff', '#0000cc', '#000099', '#0066ff', '#0099ff', '#44aaff', '#99ccff', '#cce5ff', '#6600cc', '#9900ff', '#cc44ff', '#eeccff', '#330066', '#ff00ff', '#ff44bb', '#ff88dd', '#ffccee', '#cc0066', '#ff0066', '#4d2600', '#7a3d00', '#a05c00', '#c98a3a', '#ddb882', '#f0d0a8', '#f5e6d0'];
var PANEL_W = 290;
var RULER_SZ = 24;
var PAD = 20;
var MINIMAP_W = 180;
var MINIMAP_H = 140; // ── Theme ──────────────────────────────────────────────────────────────────────

var T = {
  bg: '#1a1714',
  panel: '#1e1a17',
  section: '#251f1a',
  accent: '#c8956c',
  text: '#e8ddd4',
  muted: '#8a7060',
  border: '#3a3028',
  canvas: '#2a2420'
}; // ── Style helpers ──────────────────────────────────────────────────────────────

function chipBtn(active, extra) {
  return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({
    background: active ? T.accent : T.section,
    color: active ? '#1a1714' : T.text,
    border: "1px solid ".concat(active ? T.accent : T.border),
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: 3,
    fontSize: 12
  }, extra);
}

var inp = {
  background: T.section,
  color: T.text,
  border: "1px solid ".concat(T.border),
  padding: '5px 8px',
  borderRadius: 3,
  fontFamily: 'monospace',
  fontSize: 12,
  width: '100%'
}; // ── Utility functions ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  return [_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(hex.slice(1, 3), 16), _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(hex.slice(3, 5), 16), _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(hex.slice(5, 7), 16)];
}

function hsvToRgb(h, s, v) {
  var c = v * s,
      x = c * (1 - Math.abs(h / 60 % 2 - 1)),
      m = v - c;
  var r = 0,
      g = 0,
      b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(function (v) {
    return v.toString(16).padStart(2, '0');
  }).join('');
}

function hexToHsv(hex) {
  var _hexToRgb = hexToRgb(hex),
      _hexToRgb2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hexToRgb, 3),
      r = _hexToRgb2[0],
      g = _hexToRgb2[1],
      b = _hexToRgb2[2];

  var rf = r / 255,
      gf = g / 255,
      bf = b / 255;
  var max = Math.max(rf, gf, bf),
      min = Math.min(rf, gf, bf),
      d = max - min;
  var v = max,
      s = max === 0 ? 0 : d / max;
  var h = 0;

  if (d !== 0) {
    if (max === rf) h = (gf - bf) / d % 6;else if (max === gf) h = (bf - rf) / d + 2;else h = (rf - gf) / d + 4;
    h = h * 60;
    if (h < 0) h += 360;
  }

  return [h, s, v];
}

function cloneCanvas(src) {
  var c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  c.getContext('2d').drawImage(src, 0, 0);
  return c;
}

function flipH(src) {
  var c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  var ctx = c.getContext('2d');
  ctx.translate(src.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(src, 0, 0);
  return c;
}

function flipV(src) {
  var c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  var ctx = c.getContext('2d');
  ctx.translate(0, src.height);
  ctx.scale(1, -1);
  ctx.drawImage(src, 0, 0);
  return c;
} // ── Sub-components ─────────────────────────────────────────────────────────────


function Section(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return __jsx("div", {
    style: {
      background: T.section,
      border: "1px solid ".concat(T.border),
      borderRadius: 4,
      padding: '10px 10px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147
    },
    __self: this
  }, __jsx("div", {
    style: {
      color: T.accent,
      fontSize: 10,
      letterSpacing: 1.5,
      marginBottom: 8,
      textTransform: 'uppercase',
      fontWeight: 600
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148
    },
    __self: this
  }, title), children);
}

function Field(_ref2) {
  var label = _ref2.label,
      children = _ref2.children,
      flex = _ref2.flex;
  return __jsx("div", {
    style: {
      flex: flex || 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158
    },
    __self: this
  }, __jsx("div", {
    style: {
      color: T.muted,
      fontSize: 9,
      marginBottom: 3,
      letterSpacing: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159
    },
    __self: this
  }, label), children);
} // ── Main component ─────────────────────────────────────────────────────────────


function Home() {
  var bgRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var drawRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var gridRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var rulerTopRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var rulerLeftRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var minimapRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var scrollAreaRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(); // Live refs (avoid stale closures)

  var isDrawing = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(false);
  var isPanning = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(false);
  var panStart = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0
  });
  var history = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])([]);
  var future = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])([]);
  var baseSizeRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(12);
  var ratioRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(RATIOS[0]);
  var colorRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])('#000000');
  var isEraserRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(false);
  var showGridRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(true);
  var exportGridRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(true);
  var beadsRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])({
    cols: 30,
    rows: 45
  });
  var densityRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(3);
  var unitRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])('cm');
  var bgTypeRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])('solid');
  var bgColorRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])('#ffffff');
  var bgImageRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(null);
  var pendingPattern = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(null); // UI state

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(RATIOS[0]),
      ratio = _useState[0],
      setRatio = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('#000000'),
      color = _useState2[0],
      setColor = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('#000000'),
      hexInput = _useState3[0],
      setHexInput = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
      isEraser = _useState4[0],
      setIsEraser = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(true),
      showGrid = _useState5[0],
      setShowGrid = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(true),
      exportWithGrid = _useState6[0],
      setExportWithGrid = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    w: 0,
    h: 0
  }),
      canvasSize = _useState7[0],
      setCanvasSize = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
      showClearConfirm = _useState8[0],
      setShowClearConfirm = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('solid'),
      bgType = _useState9[0],
      setBgType = _useState9[1];

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('#ffffff'),
      bgColor = _useState10[0],
      setBgColor = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('#ffffff'),
      bgHex = _useState11[0],
      setBgHex = _useState11[1];

  var _useState12 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(null),
      bgImage = _useState12[0],
      setBgImage = _useState12[1]; // Setup


  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('10'),
      setupW = _useState13[0],
      setSetupW = _useState13[1];

  var _useState14 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('15'),
      setupH = _useState14[0],
      setSetupH = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('cm'),
      unit = _useState15[0],
      setUnit = _useState15[1];

  var _useState16 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(3),
      density = _useState16[0],
      setDensity = _useState16[1]; // Pattern


  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('grid'),
      patternType = _useState17[0],
      setPatternType = _useState17[1];

  var _useState18 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(2),
      patternRW = _useState18[0],
      setPatternRW = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(2),
      patternRH = _useState19[0],
      setPatternRH = _useState19[1]; // Palettes


  var _useState20 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])([]),
      palettes = _useState20[0],
      setPalettes = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])('default'),
      activePaletteId = _useState21[0],
      setActivePaletteId = _useState21[1];

  var _useState22 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
      showNewPaletteInput = _useState22[0],
      setShowNewPaletteInput = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(''),
      newPaletteName = _useState23[0],
      setNewPaletteName = _useState23[1]; // ── Geometry ───────────────────────────────────────────────────────────────


  function getBead() {
    var bs = baseSizeRef.current;
    var r = ratioRef.current;
    return {
      w: bs,
      h: Math.round(bs * r.h / r.w)
    };
  }

  function beadsFromSetup(w, h, u, d) {
    return {
      cols: Math.max(2, Math.round(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_4___default()(w) * TO_CM[u] * d)),
      rows: Math.max(2, Math.round(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_4___default()(h) * TO_CM[u] * d))
    };
  } // ── Background ─────────────────────────────────────────────────────────────


  function drawBackground() {
    var c = bgRef.current;
    if (!c) return;
    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    if (bgTypeRef.current === 'transparent') return;

    if (bgTypeRef.current === 'solid') {
      ctx.fillStyle = bgColorRef.current;
      ctx.fillRect(0, 0, c.width, c.height);
    } else if (bgTypeRef.current === 'image' && bgImageRef.current) {
      var img = new Image();

      img.onload = function () {
        return ctx.drawImage(img, 0, 0, c.width, c.height);
      };

      img.src = bgImageRef.current;
    }
  } // ── Draw bead ──────────────────────────────────────────────────────────────


  function paintBead(ctx, col, row, fillColor) {
    var _getBead = getBead(),
        w = _getBead.w,
        h = _getBead.h;

    var x = col * w,
        y = row * h;
    ctx.clearRect(x, y, w, h);
    if (fillColor === null) return;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2 - w * 0.08, h / 2 - h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  } // ── Grid ───────────────────────────────────────────────────────────────────


  function drawGrid() {
    var c = gridRef.current;
    if (!c) return;
    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    if (!showGridRef.current) return;

    var _getBead2 = getBead(),
        w = _getBead2.w,
        h = _getBead2.h;

    var _beadsRef$current = beadsRef.current,
        cols = _beadsRef$current.cols,
        rows = _beadsRef$current.rows;
    ctx.strokeStyle = 'rgba(130,110,90,0.4)';
    ctx.lineWidth = 0.5;

    for (var i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * w, 0);
      ctx.lineTo(i * w, rows * h);
      ctx.stroke();
    }

    for (var _i = 0; _i <= rows; _i++) {
      ctx.beginPath();
      ctx.moveTo(0, _i * h);
      ctx.lineTo(cols * w, _i * h);
      ctx.stroke();
    }
  } // ── Rulers ─────────────────────────────────────────────────────────────────


  function drawRulers() {
    var _getBead3 = getBead(),
        bw = _getBead3.w,
        bh = _getBead3.h;

    var _beadsRef$current2 = beadsRef.current,
        cols = _beadsRef$current2.cols,
        rows = _beadsRef$current2.rows;
    var d = densityRef.current;
    var u = unitRef.current; // How many beads per 1 unit (cm, inch, etc.)

    var beadsPerUnit = d * TO_CM[u]; // beads per unit
    // We want to label every whole unit interval
    // Find tick spacing in beads: 1 unit = beadsPerUnit beads
    // If beadsPerUnit < 1, label every 1/beadsPerUnit units

    var tickEvery = Math.max(1, Math.round(beadsPerUnit)); // beads between each tick

    function unitLabel(beadIdx) {
      var val = beadIdx / beadsPerUnit;
      return val % 1 === 0 ? "".concat(Math.round(val)).concat(u) : "".concat(val.toFixed(1)).concat(u);
    } // TOP ruler


    var top = rulerTopRef.current;

    if (top) {
      top.width = cols * bw;
      top.height = RULER_SZ;
      var ctx = top.getContext('2d');
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, top.width, top.height); // bottom border line

      ctx.strokeStyle = T.border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, RULER_SZ - 1);
      ctx.lineTo(top.width, RULER_SZ - 1);
      ctx.stroke();
      ctx.font = '9px monospace';
      ctx.textAlign = 'left';

      for (var i = 0; i <= cols; i++) {
        var x = i * bw;
        var isMajor = i % tickEvery === 0;
        var isMid = i % Math.max(1, Math.round(tickEvery / 2)) === 0;
        var tH = isMajor ? 10 : isMid ? 6 : 3;
        ctx.strokeStyle = isMajor ? T.muted : T.border;
        ctx.lineWidth = isMajor ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, RULER_SZ - 1);
        ctx.lineTo(x + 0.5, RULER_SZ - 1 - tH);
        ctx.stroke();

        if (isMajor && i > 0) {
          ctx.fillStyle = T.muted;
          ctx.fillText(unitLabel(i), x + 2, RULER_SZ - 12);
        }
      }
    } // LEFT ruler


    var left = rulerLeftRef.current;

    if (left) {
      left.width = RULER_SZ;
      left.height = rows * bh;

      var _ctx = left.getContext('2d');

      _ctx.fillStyle = T.bg;

      _ctx.fillRect(0, 0, left.width, left.height); // right border line


      _ctx.strokeStyle = T.border;
      _ctx.lineWidth = 1;

      _ctx.beginPath();

      _ctx.moveTo(RULER_SZ - 1, 0);

      _ctx.lineTo(RULER_SZ - 1, left.height);

      _ctx.stroke();

      _ctx.font = '9px monospace';

      for (var _i2 = 0; _i2 <= rows; _i2++) {
        var y = _i2 * bh;

        var _isMajor = _i2 % tickEvery === 0;

        var _isMid = _i2 % Math.max(1, Math.round(tickEvery / 2)) === 0;

        var tW = _isMajor ? 10 : _isMid ? 6 : 3;
        _ctx.strokeStyle = _isMajor ? T.muted : T.border;
        _ctx.lineWidth = _isMajor ? 1 : 0.5;

        _ctx.beginPath();

        _ctx.moveTo(RULER_SZ - 1, y + 0.5);

        _ctx.lineTo(RULER_SZ - 1 - tW, y + 0.5);

        _ctx.stroke();

        if (_isMajor && _i2 > 0) {
          _ctx.save();

          _ctx.fillStyle = T.muted;
          _ctx.textAlign = 'center';

          _ctx.translate(RULER_SZ - 12, y - 2);

          _ctx.rotate(-Math.PI / 2);

          _ctx.fillText(unitLabel(_i2), 0, 0);

          _ctx.restore();
        }
      }
    }
  } // ── Mini-map ───────────────────────────────────────────────────────────────


  function updateMinimap() {
    var mm = minimapRef.current;
    if (!mm || !drawRef.current) return;
    var ctx = mm.getContext('2d');
    ctx.clearRect(0, 0, MINIMAP_W, MINIMAP_H); // dark background

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, MINIMAP_W, MINIMAP_H); // scale to fit

    var scaleX = MINIMAP_W / drawRef.current.width;
    var scaleY = MINIMAP_H / drawRef.current.height;
    var scale = Math.min(scaleX, scaleY);
    var offX = (MINIMAP_W - drawRef.current.width * scale) / 2;
    var offY = (MINIMAP_H - drawRef.current.height * scale) / 2; // draw bg + beads

    if (bgRef.current) ctx.drawImage(bgRef.current, offX, offY, drawRef.current.width * scale, drawRef.current.height * scale);
    ctx.drawImage(drawRef.current, offX, offY, drawRef.current.width * scale, drawRef.current.height * scale); // viewport rect

    if (scrollAreaRef.current) {
      var sa = scrollAreaRef.current;
      var vx = (sa.scrollLeft - PAD) * scale + offX;
      var vy = (sa.scrollTop - PAD) * scale + offY;
      var vw = sa.clientWidth * scale;
      var vh = sa.clientHeight * scale;
      ctx.strokeStyle = T.accent;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(vx, vy, vw, vh);
    }
  } // ── Canvas init ────────────────────────────────────────────────────────────


  function initCanvas() {
    var c = drawRef.current;
    if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    history.current = [];
    future.current = [];
  }

  function createCanvas() {
    var _beadsFromSetup = beadsFromSetup(setupW, setupH, unit, density),
        cols = _beadsFromSetup.cols,
        rows = _beadsFromSetup.rows;

    beadsRef.current = {
      cols: cols,
      rows: rows
    };
    densityRef.current = density;
    unitRef.current = unit;

    var _getBead4 = getBead(),
        w = _getBead4.w,
        h = _getBead4.h;

    setCanvasSize({
      w: cols * w,
      h: rows * h
    });
  } // ── History ────────────────────────────────────────────────────────────────


  function saveHistory() {
    var c = drawRef.current;
    if (!c) return;
    history.current.push(c.getContext('2d').getImageData(0, 0, c.width, c.height));
    future.current = [];
    if (history.current.length > 50) history.current.shift();
  }

  function undo() {
    if (!history.current.length) return;
    var c = drawRef.current,
        ctx = c.getContext('2d');
    future.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.putImageData(history.current.pop(), 0, 0);
  }

  function redo() {
    if (!future.current.length) return;
    var c = drawRef.current,
        ctx = c.getContext('2d');
    history.current.push(ctx.getImageData(0, 0, c.width, c.height));
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.putImageData(future.current.pop(), 0, 0);
  } // ── Save ───────────────────────────────────────────────────────────────────


  function saveCanvas() {
    var temp = document.createElement('canvas');
    temp.width = drawRef.current.width;
    temp.height = drawRef.current.height;
    var ctx = temp.getContext('2d');
    ctx.drawImage(bgRef.current, 0, 0);
    ctx.drawImage(drawRef.current, 0, 0);
    if (exportGridRef.current) ctx.drawImage(gridRef.current, 0, 0);
    var a = document.createElement('a');
    a.href = temp.toDataURL('image/png');
    a.download = 'beadwork.png';
    a.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));
  } // ── Mouse drawing ──────────────────────────────────────────────────────────


  function cellFromEvent(e) {
    var rect = drawRef.current.getBoundingClientRect();

    var _getBead5 = getBead(),
        w = _getBead5.w,
        h = _getBead5.h;

    var col = Math.floor((e.clientX - rect.left) / w);
    var row = Math.floor((e.clientY - rect.top) / h);
    var _beadsRef$current3 = beadsRef.current,
        cols = _beadsRef$current3.cols,
        rows = _beadsRef$current3.rows;
    if (col < 0 || row < 0 || col >= cols || row >= rows) return null;
    return {
      col: col,
      row: row
    };
  }

  function doPaint(e) {
    var cell = cellFromEvent(e);
    if (!cell) return;
    paintBead(drawRef.current.getContext('2d'), cell.col, cell.row, isEraserRef.current ? null : colorRef.current);
  }

  function handleMouseDown(e) {
    if (e.button !== 0) return;
    saveHistory();
    isDrawing.current = true;
    doPaint(e);
  }

  function handleMouseMove(e) {
    if (isDrawing.current) {
      doPaint(e);
      updateMinimap();
    }
  }

  function handleMouseUp() {
    isDrawing.current = false;
  } // Right-click drag to pan the scroll area


  function handleScrollAreaMouseDown(e) {
    if (e.button !== 2) return;
    e.preventDefault();
    isPanning.current = true;
    panStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollAreaRef.current.scrollLeft,
      scrollTop: scrollAreaRef.current.scrollTop
    };
  }

  function handleScrollAreaMouseMove(e) {
    if (!isPanning.current) return;
    var dx = e.clientX - panStart.current.x;
    var dy = e.clientY - panStart.current.y;
    scrollAreaRef.current.scrollLeft = panStart.current.scrollLeft - dx;
    scrollAreaRef.current.scrollTop = panStart.current.scrollTop - dy;
    updateMinimap();
  }

  function handleScrollAreaMouseUp(e) {
    if (e.button === 2) isPanning.current = false;
  } // ── Flood fill (drag & drop) ───────────────────────────────────────────────


  function cellPixel(ctx, col, row) {
    var _getBead6 = getBead(),
        w = _getBead6.w,
        h = _getBead6.h;

    var d = ctx.getImageData(Math.floor(col * w + w / 2), Math.floor(row * h + h / 2), 1, 1).data;
    return [d[0], d[1], d[2], d[3]];
  }

  function pixelMatch(a, b) {
    var thr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;
    var aT = a[3] < 30,
        bT = b[3] < 30;
    if (aT && bT) return true;
    if (aT !== bT) return false;
    return Math.abs(a[0] - b[0]) < thr && Math.abs(a[1] - b[1]) < thr && Math.abs(a[2] - b[2]) < thr;
  }

  function floodFill(startCol, startRow, fillColor) {
    var c = drawRef.current,
        ctx = c.getContext('2d');
    var _beadsRef$current4 = beadsRef.current,
        cols = _beadsRef$current4.cols,
        rows = _beadsRef$current4.rows;
    var target = cellPixel(ctx, startCol, startRow);

    var _hexToRgb3 = hexToRgb(fillColor),
        _hexToRgb4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hexToRgb3, 3),
        fr = _hexToRgb4[0],
        fg = _hexToRgb4[1],
        fb = _hexToRgb4[2];

    if (pixelMatch(target, [fr, fg, fb, 255])) return;
    saveHistory();
    var queue = [[startCol, startRow]];
    var visited = new _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_3___default.a();

    while (queue.length) {
      var _queue$shift = queue.shift(),
          _queue$shift2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_queue$shift, 2),
          col = _queue$shift2[0],
          row = _queue$shift2[1];

      var key = "".concat(col, ",").concat(row);
      if (visited.has(key) || col < 0 || row < 0 || col >= cols || row >= rows) continue;
      visited.add(key);
      if (!pixelMatch(cellPixel(ctx, col, row), target)) continue;
      paintBead(ctx, col, row, fillColor);
      queue.push([col + 1, row], [col - 1, row], [col, row + 1], [col, row - 1]);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    var fc = e.dataTransfer.getData('color');
    if (!fc) return;
    var cell = cellFromEvent(e);
    if (cell) floodFill(cell.col, cell.row, fc);
  } // ── Keyboard ───────────────────────────────────────────────────────────────


  function handleKeyDown(e) {
    var ctrl = e.ctrlKey || e.metaKey;

    if (ctrl && e.key === 'z') {
      e.preventDefault();
      undo();
    }

    if (ctrl && (e.key === 'y' || e.shiftKey && e.key === 'Z')) {
      e.preventDefault();
      redo();
    }
  } // ── Control helpers ────────────────────────────────────────────────────────


  function applyColor(c) {
    colorRef.current = c;
    setColor(c);
    setHexInput(c);
    isEraserRef.current = false;
    setIsEraser(false);
  }

  function applyRatio(r) {
    ratioRef.current = r;
    setRatio(r);
    var _beadsRef$current5 = beadsRef.current,
        cols = _beadsRef$current5.cols,
        rows = _beadsRef$current5.rows;
    var bs = baseSizeRef.current;
    setCanvasSize({
      w: cols * bs,
      h: rows * Math.round(bs * r.h / r.w)
    });
  }

  function applyBgType(type) {
    bgTypeRef.current = type;
    setBgType(type);
    drawBackground();
  }

  function applyBgColor(c) {
    bgColorRef.current = c;
    setBgColor(c);
    setBgHex(c);
    if (bgTypeRef.current === 'solid') drawBackground();
  } // ── Pattern tiling ─────────────────────────────────────────────────────────


  function applyPattern() {
    var src = drawRef.current;
    if (!src) return;
    var motif = cloneCanvas(src);
    var mW = motif.width,
        mH = motif.height;
    var rW = Math.max(1, _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(patternRW) || 2);
    var rH = Math.max(1, _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_6___default()(patternRH) || 2);
    var halfW = Math.floor(mW / 2),
        halfH = Math.floor(mH / 2);
    var unitC, newW, newH;

    if (patternType === 'grid') {
      unitC = motif;
      newW = mW * rW;
      newH = mH * rH;
    } else if (patternType === 'brick_h') {
      unitC = motif;
      newW = mW * rW + halfW;
      newH = mH * rH;
    } else if (patternType === 'halfdrop') {
      unitC = motif;
      newW = mW * rW;
      newH = mH * rH + halfH;
    } else if (patternType === 'mirror_x') {
      unitC = document.createElement('canvas');
      unitC.width = mW * 2;
      unitC.height = mH;
      var ux = unitC.getContext('2d');
      ux.drawImage(motif, 0, 0);
      ux.drawImage(flipH(motif), mW, 0);
      newW = unitC.width * rW;
      newH = mH * rH;
    } else if (patternType === 'mirror_y') {
      unitC = document.createElement('canvas');
      unitC.width = mW;
      unitC.height = mH * 2;
      var uy = unitC.getContext('2d');
      uy.drawImage(motif, 0, 0);
      uy.drawImage(flipV(motif), 0, mH);
      newW = mW * rW;
      newH = unitC.height * rH;
    } else if (patternType === 'mirror_4') {
      var fh = flipH(motif),
          fv = flipV(motif),
          fhv = flipV(fh);
      unitC = document.createElement('canvas');
      unitC.width = mW * 2;
      unitC.height = mH * 2;
      var u4 = unitC.getContext('2d');
      u4.drawImage(motif, 0, 0);
      u4.drawImage(fh, mW, 0);
      u4.drawImage(fv, 0, mH);
      u4.drawImage(fhv, mW, mH);
      newW = unitC.width * rW;
      newH = unitC.height * rH;
    }

    var _getBead7 = getBead(),
        bw = _getBead7.w,
        bh = _getBead7.h;

    beadsRef.current = {
      cols: Math.round(newW / bw),
      rows: Math.round(newH / bh)
    };
    pendingPattern.current = {
      unitC: unitC,
      mW: mW,
      mH: mH,
      halfW: halfW,
      halfH: halfH,
      rW: rW,
      rH: rH,
      type: patternType,
      newW: newW,
      newH: newH
    };
    setCanvasSize({
      w: newW,
      h: newH
    });
  }

  function renderPendingPattern() {
    var p = pendingPattern.current;
    if (!p) return;
    var ctx = drawRef.current.getContext('2d');
    ctx.clearRect(0, 0, drawRef.current.width, drawRef.current.height);
    var unitC = p.unitC,
        mW = p.mW,
        mH = p.mH,
        halfW = p.halfW,
        halfH = p.halfH,
        rW = p.rW,
        rH = p.rH,
        type = p.type;

    for (var rx = 0; rx < rW; rx++) {
      for (var ry = 0; ry < rH; ry++) {
        var ox = rx * (type === 'mirror_x' || type === 'mirror_4' ? unitC.width : mW);
        var oy = ry * (type === 'mirror_y' || type === 'mirror_4' ? unitC.height : mH);
        if (type === 'brick_h') ox += ry % 2 === 1 ? halfW : 0;
        if (type === 'halfdrop') oy += rx % 2 === 1 ? halfH : 0;
        ctx.drawImage(unitC, ox, oy);
      }
    }
  } // ── Custom palettes ────────────────────────────────────────────────────────


  var activePalette = activePaletteId === 'default' ? DEFAULT_PALETTE : (palettes.find(function (p) {
    return p.id === activePaletteId;
  }) || {}).colors || DEFAULT_PALETTE;

  function savePalettes(updated) {
    setPalettes(updated);

    try {
      localStorage.setItem('beadtool_palettes', _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_2___default()(updated));
    } catch (_unused) {}
  }

  function addPalette() {
    if (!newPaletteName.trim()) return;

    var id = _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_1___default()().toString();

    savePalettes([].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(palettes), [{
      id: id,
      name: newPaletteName.trim(),
      colors: []
    }]));
    setActivePaletteId(id);
    setNewPaletteName('');
    setShowNewPaletteInput(false);
  }

  function deletePalette(id) {
    savePalettes(palettes.filter(function (p) {
      return p.id !== id;
    }));
    setActivePaletteId('default');
  }

  function addColorToPalette(id) {
    savePalettes(palettes.map(function (p) {
      return p.id === id && !p.colors.includes(colorRef.current) ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, p, {
        colors: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(p.colors), [colorRef.current])
      }) : p;
    }));
  }

  function removeColorFromPalette(pid, col) {
    savePalettes(palettes.map(function (p) {
      return p.id === pid ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, p, {
        colors: p.colors.filter(function (c) {
          return c !== col;
        })
      }) : p;
    }));
  } // ── Effects ────────────────────────────────────────────────────────────────


  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    try {
      var saved = JSON.parse(localStorage.getItem('beadtool_palettes') || '[]');
      setPalettes(saved);
    } catch (_unused2) {}

    createCanvas();
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    if (canvasSize.w > 0) {
      setTimeout(function () {
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
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    drawGrid();
  }, [showGrid]);
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    drawBackground();
    setTimeout(updateMinimap, 50);
  }, [bgType, bgColor]); // ── Derived ────────────────────────────────────────────────────────────────

  var preview = beadsFromSetup(setupW, setupH, unit, density);
  var cW = canvasSize.w || 1;
  var cH = canvasSize.h || 1; // ── Render ─────────────────────────────────────────────────────────────────

  return __jsx("div", {
    style: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      background: T.bg
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 734
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 735
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 736
    },
    __self: this
  }, "Beadwork Studio"), __jsx("link", {
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap",
    rel: "stylesheet",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 737
    },
    __self: this
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
    id: "664782124",
    __self: this
  }, "*{box-sizing:border-box;}html,body{margin:0;padding:0;font-family:monospace;}input,select,button{font-family:monospace;}::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:".concat(T.bg, ";}::-webkit-scrollbar-thumb{background:").concat(T.border, ";border-radius:3px;}button:hover{opacity:0.85;}input[type=checkbox]{accent-color:").concat(T.accent, ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlc6XFxNYWRodXJhXFxNb3JpaVxcYmVhZHdvcmsgdG9vbFxcY29kZVxccGFnZXNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWt1QnlCLEFBRWtDLEFBQ0osQUFDd0IsQUFDZCxBQUNvQyxBQUNBLEFBQ3hDLEFBQ3FDLFNBTmhDLENBRVcsR0FHZixNQUwyQixFQUVYLENBSGxCLEFBRW9CLGtCQUVzQixBQUNrQixDQUo5QixDQU1TLGdCQUZzQiIsImZpbGUiOiJXOlxcTWFkaHVyYVxcTW9yaWlcXGJlYWR3b3JrIHRvb2xcXGNvZGVcXHBhZ2VzXFxpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuXG4vLyDilIDilIAgQ29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBSQVRJT1MgPSBbXG4gIHsgbGFiZWw6ICcxOjEnLCB3OiAxLCBoOiAxIH0sXG4gIHsgbGFiZWw6ICcyOjMnLCB3OiAyLCBoOiAzIH0sXG4gIHsgbGFiZWw6ICczOjQnLCB3OiAzLCBoOiA0IH0sXG5dO1xuXG5jb25zdCBVTklUUyA9IFsnbW0nLCAnY20nLCAnaW5jaCcsICdtJ107XG5jb25zdCBUT19DTSA9IHsgbW06IDAuMSwgY206IDEsIGluY2g6IDIuNTQsIG06IDEwMCB9O1xuXG5jb25zdCBERU5TSVRZX1BSRVNFVFMgPSBbXG4gIHsgbGFiZWw6ICdFeHRyYSBmaW5lICg1L2NtKScsIHZhbHVlOiA1IH0sXG4gIHsgbGFiZWw6ICdGaW5lICg0L2NtKScsICAgICAgIHZhbHVlOiA0IH0sXG4gIHsgbGFiZWw6ICdNZWRpdW0gKDMvY20pJywgICAgIHZhbHVlOiAzIH0sXG4gIHsgbGFiZWw6ICdDb2Fyc2UgKDIvY20pJywgICAgIHZhbHVlOiAyIH0sXG5dO1xuXG5jb25zdCBSRVBFQVRfUEFUVEVSTlMgPSBbXG4gIHsgdmFsdWU6ICdncmlkJywgICAgIGxhYmVsOiAnR3JpZCAoc3RyYWlnaHQpJyB9LFxuICB7IHZhbHVlOiAnYnJpY2tfaCcsICBsYWJlbDogJ0JyaWNrIChob3Jpem9udGFsKScgfSxcbiAgeyB2YWx1ZTogJ2hhbGZkcm9wJywgbGFiZWw6ICdIYWxmLWRyb3AgKHZlcnRpY2FsKScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl94JywgbGFiZWw6ICdNaXJyb3IgWCcgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl95JywgbGFiZWw6ICdNaXJyb3IgWScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl80JywgbGFiZWw6ICc0LXdheSBNaXJyb3InIH0sXG5dO1xuXG5jb25zdCBERUZBVUxUX1BBTEVUVEUgPSBbXG4gICcjMDAwMDAwJywnIzExMTExMScsJyMzMzMzMzMnLCcjNTU1NTU1JywnIzc3Nzc3NycsJyM5OTk5OTknLCcjYWFhYWFhJywnI2NjY2NjYycsJyNlNWU1ZTUnLCcjZmZmZmZmJyxcbiAgJyNmZjAwMDAnLCcjY2MwMDAwJywnIzk5MDAwMCcsJyNmZjQ0NDQnLCcjZmY5OTk5JywnI2ZmY2NjYycsXG4gICcjZmY2NjAwJywnI2ZmODgwMCcsJyNmZmFhMDAnLCcjZmZjYzAwJywnI2ZmZGQ4OCcsXG4gICcjZmZmZjAwJywnI2RkZGQwMCcsJyNhYWFhMDAnLCcjZmZmZjk5JyxcbiAgJyMwMGNjMDAnLCcjMDA5OTAwJywnIzAwNjYwMCcsJyMwMDMzMDAnLCcjNDRkZDQ0JywnIzk5ZWU5OScsJyNjY2ZmY2MnLCcjMDBhYTU1JyxcbiAgJyMwMGNjY2MnLCcjMDA5OTk5JywnIzAwNjY2NicsJyNhYWZmZmYnLFxuICAnIzAwMDBmZicsJyMwMDAwY2MnLCcjMDAwMDk5JywnIzAwNjZmZicsJyMwMDk5ZmYnLCcjNDRhYWZmJywnIzk5Y2NmZicsJyNjY2U1ZmYnLFxuICAnIzY2MDBjYycsJyM5OTAwZmYnLCcjY2M0NGZmJywnI2VlY2NmZicsJyMzMzAwNjYnLFxuICAnI2ZmMDBmZicsJyNmZjQ0YmInLCcjZmY4OGRkJywnI2ZmY2NlZScsJyNjYzAwNjYnLCcjZmYwMDY2JyxcbiAgJyM0ZDI2MDAnLCcjN2EzZDAwJywnI2EwNWMwMCcsJyNjOThhM2EnLCcjZGRiODgyJywnI2YwZDBhOCcsJyNmNWU2ZDAnLFxuXTtcblxuY29uc3QgUEFORUxfVyAgICA9IDI5MDtcbmNvbnN0IFJVTEVSX1NaICAgPSAyNDtcbmNvbnN0IFBBRCAgICAgICAgPSAyMDtcbmNvbnN0IE1JTklNQVBfVyAgPSAxODA7XG5jb25zdCBNSU5JTUFQX0ggID0gMTQwO1xuXG4vLyDilIDilIAgVGhlbWUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IFQgPSB7XG4gIGJnOiAgICAgICcjMWExNzE0JyxcbiAgcGFuZWw6ICAgJyMxZTFhMTcnLFxuICBzZWN0aW9uOiAnIzI1MWYxYScsXG4gIGFjY2VudDogICcjYzg5NTZjJyxcbiAgdGV4dDogICAgJyNlOGRkZDQnLFxuICBtdXRlZDogICAnIzhhNzA2MCcsXG4gIGJvcmRlcjogICcjM2EzMDI4JyxcbiAgY2FudmFzOiAgJyMyYTI0MjAnLFxufTtcblxuLy8g4pSA4pSAIFN0eWxlIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGNoaXBCdG4oYWN0aXZlLCBleHRyYSkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/IFQuYWNjZW50IDogVC5zZWN0aW9uLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnIzFhMTcxNCcgOiBULnRleHQsXG4gICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7YWN0aXZlID8gVC5hY2NlbnQgOiBULmJvcmRlcn1gLFxuICAgIHBhZGRpbmc6ICc1cHggMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlclJhZGl1czogMywgZm9udFNpemU6IDEyLFxuICAgIC4uLmV4dHJhLFxuICB9O1xufVxuXG5jb25zdCBpbnAgPSB7XG4gIGJhY2tncm91bmQ6IFQuc2VjdGlvbiwgY29sb3I6IFQudGV4dCxcbiAgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgcGFkZGluZzogJzVweCA4cHgnLCBib3JkZXJSYWRpdXM6IDMsXG4gIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogMTIsIHdpZHRoOiAnMTAwJScsXG59O1xuXG4vLyDilIDilIAgVXRpbGl0eSBmdW5jdGlvbnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICByZXR1cm4gW3BhcnNlSW50KGhleC5zbGljZSgxLDMpLDE2KSwgcGFyc2VJbnQoaGV4LnNsaWNlKDMsNSksMTYpLCBwYXJzZUludChoZXguc2xpY2UoNSw3KSwxNildO1xufVxuXG5mdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gIGNvbnN0IGMgPSB2ICogcywgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSwgbSA9IHYgLSBjO1xuICBsZXQgcj0wLGc9MCxiPTA7XG4gIGlmICAgICAgKGggPCA2MCkgIHsgcj1jO2c9eDtiPTA7IH1cbiAgZWxzZSBpZiAoaCA8IDEyMCkgeyByPXg7Zz1jO2I9MDsgfVxuICBlbHNlIGlmIChoIDwgMTgwKSB7IHI9MDtnPWM7Yj14OyB9XG4gIGVsc2UgaWYgKGggPCAyNDApIHsgcj0wO2c9eDtiPWM7IH1cbiAgZWxzZSBpZiAoaCA8IDMwMCkgeyByPXg7Zz0wO2I9YzsgfVxuICBlbHNlICAgICAgICAgICAgICB7IHI9YztnPTA7Yj14OyB9XG4gIHJldHVybiBbTWF0aC5yb3VuZCgocittKSoyNTUpLCBNYXRoLnJvdW5kKChnK20pKjI1NSksIE1hdGgucm91bmQoKGIrbSkqMjU1KV07XG59XG5cbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgcmV0dXJuICcjJyArIFtyLGcsYl0ubWFwKHYgPT4gdi50b1N0cmluZygxNikucGFkU3RhcnQoMiwnMCcpKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gaGV4VG9Ic3YoaGV4KSB7XG4gIGNvbnN0IFtyLGcsYl0gPSBoZXhUb1JnYihoZXgpO1xuICBjb25zdCByZj1yLzI1NSwgZ2Y9Zy8yNTUsIGJmPWIvMjU1O1xuICBjb25zdCBtYXg9TWF0aC5tYXgocmYsZ2YsYmYpLCBtaW49TWF0aC5taW4ocmYsZ2YsYmYpLCBkPW1heC1taW47XG4gIGNvbnN0IHY9bWF4LCBzPW1heD09PTA/MDpkL21heDtcbiAgbGV0IGg9MDtcbiAgaWYgKGQhPT0wKSB7XG4gICAgaWYgKG1heD09PXJmKSAgICAgIGg9KChnZi1iZikvZCklNjtcbiAgICBlbHNlIGlmIChtYXg9PT1nZikgaD0oYmYtcmYpL2QrMjtcbiAgICBlbHNlICAgICAgICAgICAgICAgaD0ocmYtZ2YpL2QrNDtcbiAgICBoPWgqNjA7IGlmKGg8MCkgaCs9MzYwO1xuICB9XG4gIHJldHVybiBbaCwgcywgdl07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ2FudmFzKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgYy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZShzcmMsIDAsIDApO1xuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gZmxpcEgoc3JjKSB7XG4gIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgYy53aWR0aCA9IHNyYy53aWR0aDsgYy5oZWlnaHQgPSBzcmMuaGVpZ2h0O1xuICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gIGN0eC50cmFuc2xhdGUoc3JjLndpZHRoLCAwKTsgY3R4LnNjYWxlKC0xLCAxKTsgY3R4LmRyYXdJbWFnZShzcmMsIDAsIDApO1xuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gZmxpcFYoc3JjKSB7XG4gIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgYy53aWR0aCA9IHNyYy53aWR0aDsgYy5oZWlnaHQgPSBzcmMuaGVpZ2h0O1xuICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gIGN0eC50cmFuc2xhdGUoMCwgc3JjLmhlaWdodCk7IGN0eC5zY2FsZSgxLCAtMSk7IGN0eC5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbi8vIOKUgOKUgCBTdWItY29tcG9uZW50cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gU2VjdGlvbih7IHRpdGxlLCBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBULnNlY3Rpb24sIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogNCwgcGFkZGluZzogJzEwcHggMTBweCcgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULmFjY2VudCwgZm9udFNpemU6IDEwLCBsZXR0ZXJTcGFjaW5nOiAxLjUsIG1hcmdpbkJvdHRvbTogOCwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9kaXY+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkKHsgbGFiZWwsIGNoaWxkcmVuLCBmbGV4IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IGZsZXggfHwgMSB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFQubXV0ZWQsIGZvbnRTaXplOiA5LCBtYXJnaW5Cb3R0b206IDMsIGxldHRlclNwYWNpbmc6IDEgfX0+e2xhYmVsfTwvZGl2PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyDilIDilIAgTWFpbiBjb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IGJnUmVmICAgICAgICA9IHVzZVJlZigpO1xuICBjb25zdCBkcmF3UmVmICAgICAgPSB1c2VSZWYoKTtcbiAgY29uc3QgZ3JpZFJlZiAgICAgID0gdXNlUmVmKCk7XG4gIGNvbnN0IHJ1bGVyVG9wUmVmICA9IHVzZVJlZigpO1xuICBjb25zdCBydWxlckxlZnRSZWYgPSB1c2VSZWYoKTtcbiAgY29uc3QgbWluaW1hcFJlZiAgID0gdXNlUmVmKCk7XG4gIGNvbnN0IHNjcm9sbEFyZWFSZWYgPSB1c2VSZWYoKTtcblxuICAvLyBMaXZlIHJlZnMgKGF2b2lkIHN0YWxlIGNsb3N1cmVzKVxuICBjb25zdCBpc0RyYXdpbmcgICAgICA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGlzUGFubmluZyAgICAgID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGFuU3RhcnQgICAgICAgPSB1c2VSZWYoeyB4OiAwLCB5OiAwLCBzY3JvbGxMZWZ0OiAwLCBzY3JvbGxUb3A6IDAgfSk7XG4gIGNvbnN0IGhpc3RvcnkgICAgICAgID0gdXNlUmVmKFtdKTtcbiAgY29uc3QgZnV0dXJlICAgICAgICAgPSB1c2VSZWYoW10pO1xuICBjb25zdCBiYXNlU2l6ZVJlZiAgICA9IHVzZVJlZigxMik7XG4gIGNvbnN0IHJhdGlvUmVmICAgICAgID0gdXNlUmVmKFJBVElPU1swXSk7XG4gIGNvbnN0IGNvbG9yUmVmICAgICAgID0gdXNlUmVmKCcjMDAwMDAwJyk7XG4gIGNvbnN0IGlzRXJhc2VyUmVmICAgID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3Qgc2hvd0dyaWRSZWYgICAgPSB1c2VSZWYodHJ1ZSk7XG4gIGNvbnN0IGV4cG9ydEdyaWRSZWYgID0gdXNlUmVmKHRydWUpO1xuICBjb25zdCBiZWFkc1JlZiAgICAgICA9IHVzZVJlZih7IGNvbHM6IDMwLCByb3dzOiA0NSB9KTtcbiAgY29uc3QgZGVuc2l0eVJlZiAgICAgPSB1c2VSZWYoMyk7XG4gIGNvbnN0IHVuaXRSZWYgICAgICAgID0gdXNlUmVmKCdjbScpO1xuICBjb25zdCBiZ1R5cGVSZWYgICAgICA9IHVzZVJlZignc29saWQnKTtcbiAgY29uc3QgYmdDb2xvclJlZiAgICAgPSB1c2VSZWYoJyNmZmZmZmYnKTtcbiAgY29uc3QgYmdJbWFnZVJlZiAgICAgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdQYXR0ZXJuID0gdXNlUmVmKG51bGwpO1xuXG4gIC8vIFVJIHN0YXRlXG4gIGNvbnN0IFtyYXRpbywgc2V0UmF0aW9dICAgICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoUkFUSU9TWzBdKTtcbiAgY29uc3QgW2NvbG9yLCBzZXRDb2xvcl0gICAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnIzAwMDAwMCcpO1xuICBjb25zdCBbaGV4SW5wdXQsIHNldEhleElucHV0XSAgICAgICAgICAgICA9IHVzZVN0YXRlKCcjMDAwMDAwJyk7XG4gIGNvbnN0IFtpc0VyYXNlciwgc2V0SXNFcmFzZXJdICAgICAgICAgICAgID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0dyaWQsIHNldFNob3dHcmlkXSAgICAgICAgICAgICA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXhwb3J0V2l0aEdyaWQsIHNldEV4cG9ydFdpdGhHcmlkXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbY2FudmFzU2l6ZSwgc2V0Q2FudmFzU2l6ZV0gICAgICAgICA9IHVzZVN0YXRlKHsgdzogMCwgaDogMCB9KTtcbiAgY29uc3QgW3Nob3dDbGVhckNvbmZpcm0sIHNldFNob3dDbGVhckNvbmZpcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYmdUeXBlLCBzZXRCZ1R5cGVdICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKCdzb2xpZCcpO1xuICBjb25zdCBbYmdDb2xvciwgc2V0QmdDb2xvcl0gICAgICAgICAgICAgICA9IHVzZVN0YXRlKCcjZmZmZmZmJyk7XG4gIGNvbnN0IFtiZ0hleCwgc2V0QmdIZXhdICAgICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoJyNmZmZmZmYnKTtcbiAgY29uc3QgW2JnSW1hZ2UsIHNldEJnSW1hZ2VdICAgICAgICAgICAgICAgPSB1c2VTdGF0ZShudWxsKTtcblxuICAvLyBTZXR1cFxuICBjb25zdCBbc2V0dXBXLCBzZXRTZXR1cFddICAgPSB1c2VTdGF0ZSgnMTAnKTtcbiAgY29uc3QgW3NldHVwSCwgc2V0U2V0dXBIXSAgID0gdXNlU3RhdGUoJzE1Jyk7XG4gIGNvbnN0IFt1bml0LCBzZXRVbml0XSAgICAgICA9IHVzZVN0YXRlKCdjbScpO1xuICBjb25zdCBbZGVuc2l0eSwgc2V0RGVuc2l0eV0gPSB1c2VTdGF0ZSgzKTtcblxuICAvLyBQYXR0ZXJuXG4gIGNvbnN0IFtwYXR0ZXJuVHlwZSwgc2V0UGF0dGVyblR5cGVdICAgPSB1c2VTdGF0ZSgnZ3JpZCcpO1xuICBjb25zdCBbcGF0dGVyblJXLCBzZXRQYXR0ZXJuUlddICAgICAgID0gdXNlU3RhdGUoMik7XG4gIGNvbnN0IFtwYXR0ZXJuUkgsIHNldFBhdHRlcm5SSF0gICAgICAgPSB1c2VTdGF0ZSgyKTtcblxuICAvLyBQYWxldHRlc1xuICBjb25zdCBbcGFsZXR0ZXMsIHNldFBhbGV0dGVzXSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2FjdGl2ZVBhbGV0dGVJZCwgc2V0QWN0aXZlUGFsZXR0ZUlkXSAgICAgPSB1c2VTdGF0ZSgnZGVmYXVsdCcpO1xuICBjb25zdCBbc2hvd05ld1BhbGV0dGVJbnB1dCwgc2V0U2hvd05ld1BhbGV0dGVJbnB1dF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtuZXdQYWxldHRlTmFtZSwgc2V0TmV3UGFsZXR0ZU5hbWVdICAgICAgICAgPSB1c2VTdGF0ZSgnJyk7XG5cbiAgLy8g4pSA4pSAIEdlb21ldHJ5IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGdldEJlYWQoKSB7XG4gICAgY29uc3QgYnMgPSBiYXNlU2l6ZVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHIgID0gcmF0aW9SZWYuY3VycmVudDtcbiAgICByZXR1cm4geyB3OiBicywgaDogTWF0aC5yb3VuZChicyAqIHIuaCAvIHIudykgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlYWRzRnJvbVNldHVwKHcsIGgsIHUsIGQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sczogTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChwYXJzZUZsb2F0KHcpICogVE9fQ01bdV0gKiBkKSksXG4gICAgICByb3dzOiBNYXRoLm1heCgyLCBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoaCkgKiBUT19DTVt1XSAqIGQpKSxcbiAgICB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEJhY2tncm91bmQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gZHJhd0JhY2tncm91bmQoKSB7XG4gICAgY29uc3QgYyA9IGJnUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIGlmIChiZ1R5cGVSZWYuY3VycmVudCA9PT0gJ3RyYW5zcGFyZW50JykgcmV0dXJuO1xuICAgIGlmIChiZ1R5cGVSZWYuY3VycmVudCA9PT0gJ3NvbGlkJykge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGJnQ29sb3JSZWYuY3VycmVudDtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgfSBlbHNlIGlmIChiZ1R5cGVSZWYuY3VycmVudCA9PT0gJ2ltYWdlJyAmJiBiZ0ltYWdlUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgICBpbWcuc3JjID0gYmdJbWFnZVJlZi5jdXJyZW50O1xuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBEcmF3IGJlYWQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gcGFpbnRCZWFkKGN0eCwgY29sLCByb3csIGZpbGxDb2xvcikge1xuICAgIGNvbnN0IHsgdywgaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGNvbnN0IHggPSBjb2wgKiB3LCB5ID0gcm93ICogaDtcbiAgICBjdHguY2xlYXJSZWN0KHgsIHksIHcsIGgpO1xuICAgIGlmIChmaWxsQ29sb3IgPT09IG51bGwpIHJldHVybjtcbiAgICBjdHguZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZWxsaXBzZSh4ICsgdy8yLCB5ICsgaC8yLCB3LzIgLSB3KjAuMDgsIGgvMiAtIGgqMC4wOCwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICAvLyDilIDilIAgR3JpZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBkcmF3R3JpZCgpIHtcbiAgICBjb25zdCBjID0gZ3JpZFJlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBpZiAoIXNob3dHcmlkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzUmVmLmN1cnJlbnQ7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMTMwLDExMCw5MCwwLjQpJztcbiAgICBjdHgubGluZVdpZHRoID0gMC41O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGNvbHM7IGkrKykgeyBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oaSp3LDApOyBjdHgubGluZVRvKGkqdyxyb3dzKmgpOyBjdHguc3Ryb2tlKCk7IH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSByb3dzOyBpKyspIHsgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKDAsaSpoKTsgY3R4LmxpbmVUbyhjb2xzKncsaSpoKTsgY3R4LnN0cm9rZSgpOyB9XG4gIH1cblxuICAvLyDilIDilIAgUnVsZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRyYXdSdWxlcnMoKSB7XG4gICAgY29uc3QgeyB3OiBidywgaDogYmggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgZCA9IGRlbnNpdHlSZWYuY3VycmVudDtcbiAgICBjb25zdCB1ID0gdW5pdFJlZi5jdXJyZW50O1xuXG4gICAgLy8gSG93IG1hbnkgYmVhZHMgcGVyIDEgdW5pdCAoY20sIGluY2gsIGV0Yy4pXG4gICAgY29uc3QgYmVhZHNQZXJVbml0ID0gZCAqIFRPX0NNW3VdOyAvLyBiZWFkcyBwZXIgdW5pdFxuICAgIC8vIFdlIHdhbnQgdG8gbGFiZWwgZXZlcnkgd2hvbGUgdW5pdCBpbnRlcnZhbFxuICAgIC8vIEZpbmQgdGljayBzcGFjaW5nIGluIGJlYWRzOiAxIHVuaXQgPSBiZWFkc1BlclVuaXQgYmVhZHNcbiAgICAvLyBJZiBiZWFkc1BlclVuaXQgPCAxLCBsYWJlbCBldmVyeSAxL2JlYWRzUGVyVW5pdCB1bml0c1xuICAgIGNvbnN0IHRpY2tFdmVyeSA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoYmVhZHNQZXJVbml0KSk7IC8vIGJlYWRzIGJldHdlZW4gZWFjaCB0aWNrXG5cbiAgICBmdW5jdGlvbiB1bml0TGFiZWwoYmVhZElkeCkge1xuICAgICAgY29uc3QgdmFsID0gYmVhZElkeCAvIGJlYWRzUGVyVW5pdDtcbiAgICAgIHJldHVybiB2YWwgJSAxID09PSAwID8gYCR7TWF0aC5yb3VuZCh2YWwpfSR7dX1gIDogYCR7dmFsLnRvRml4ZWQoMSl9JHt1fWA7XG4gICAgfVxuXG4gICAgLy8gVE9QIHJ1bGVyXG4gICAgY29uc3QgdG9wID0gcnVsZXJUb3BSZWYuY3VycmVudDtcbiAgICBpZiAodG9wKSB7XG4gICAgICB0b3Aud2lkdGggPSBjb2xzICogYnc7XG4gICAgICB0b3AuaGVpZ2h0ID0gUlVMRVJfU1o7XG4gICAgICBjb25zdCBjdHggPSB0b3AuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBULmJnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRvcC53aWR0aCwgdG9wLmhlaWdodCk7XG4gICAgICAvLyBib3R0b20gYm9yZGVyIGxpbmVcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFQuYm9yZGVyOyBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbygwLCBSVUxFUl9TWiAtIDEpOyBjdHgubGluZVRvKHRvcC53aWR0aCwgUlVMRVJfU1ogLSAxKTsgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHguZm9udCA9ICc5cHggbW9ub3NwYWNlJztcbiAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGNvbHM7IGkrKykge1xuICAgICAgICBjb25zdCB4ID0gaSAqIGJ3O1xuICAgICAgICBjb25zdCBpc01ham9yID0gKGkgJSB0aWNrRXZlcnkgPT09IDApO1xuICAgICAgICBjb25zdCBpc01pZCAgID0gKGkgJSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHRpY2tFdmVyeSAvIDIpKSA9PT0gMCk7XG4gICAgICAgIGNvbnN0IHRIID0gaXNNYWpvciA/IDEwIDogaXNNaWQgPyA2IDogMztcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNNYWpvciA/IFQubXV0ZWQgOiBULmJvcmRlcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGlzTWFqb3IgPyAxIDogMC41O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oeCArIDAuNSwgUlVMRVJfU1ogLSAxKTsgY3R4LmxpbmVUbyh4ICsgMC41LCBSVUxFUl9TWiAtIDEgLSB0SCk7IGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKGlzTWFqb3IgJiYgaSA+IDApIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gVC5tdXRlZDtcbiAgICAgICAgICBjdHguZmlsbFRleHQodW5pdExhYmVsKGkpLCB4ICsgMiwgUlVMRVJfU1ogLSAxMik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMRUZUIHJ1bGVyXG4gICAgY29uc3QgbGVmdCA9IHJ1bGVyTGVmdFJlZi5jdXJyZW50O1xuICAgIGlmIChsZWZ0KSB7XG4gICAgICBsZWZ0LndpZHRoID0gUlVMRVJfU1o7XG4gICAgICBsZWZ0LmhlaWdodCA9IHJvd3MgKiBiaDtcbiAgICAgIGNvbnN0IGN0eCA9IGxlZnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBULmJnO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGxlZnQud2lkdGgsIGxlZnQuaGVpZ2h0KTtcbiAgICAgIC8vIHJpZ2h0IGJvcmRlciBsaW5lXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBULmJvcmRlcjsgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oUlVMRVJfU1ogLSAxLCAwKTsgY3R4LmxpbmVUbyhSVUxFUl9TWiAtIDEsIGxlZnQuaGVpZ2h0KTsgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHguZm9udCA9ICc5cHggbW9ub3NwYWNlJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcm93czsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHkgPSBpICogYmg7XG4gICAgICAgIGNvbnN0IGlzTWFqb3IgPSAoaSAlIHRpY2tFdmVyeSA9PT0gMCk7XG4gICAgICAgIGNvbnN0IGlzTWlkICAgPSAoaSAlIE1hdGgubWF4KDEsIE1hdGgucm91bmQodGlja0V2ZXJ5IC8gMikpID09PSAwKTtcbiAgICAgICAgY29uc3QgdFcgPSBpc01ham9yID8gMTAgOiBpc01pZCA/IDYgOiAzO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc01ham9yID8gVC5tdXRlZCA6IFQuYm9yZGVyO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gaXNNYWpvciA/IDEgOiAwLjU7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyhSVUxFUl9TWiAtIDEsIHkgKyAwLjUpOyBjdHgubGluZVRvKFJVTEVSX1NaIC0gMSAtIHRXLCB5ICsgMC41KTsgY3R4LnN0cm9rZSgpO1xuICAgICAgICBpZiAoaXNNYWpvciAmJiBpID4gMCkge1xuICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFQubXV0ZWQ7XG4gICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgIGN0eC50cmFuc2xhdGUoUlVMRVJfU1ogLSAxMiwgeSAtIDIpO1xuICAgICAgICAgIGN0eC5yb3RhdGUoLU1hdGguUEkgLyAyKTtcbiAgICAgICAgICBjdHguZmlsbFRleHQodW5pdExhYmVsKGkpLCAwLCAwKTtcbiAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIE1pbmktbWFwIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1pbmltYXAoKSB7XG4gICAgY29uc3QgbW0gPSBtaW5pbWFwUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtbSB8fCAhZHJhd1JlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gbW0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIE1JTklNQVBfVywgTUlOSU1BUF9IKTtcbiAgICAvLyBkYXJrIGJhY2tncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gJyMxMTEnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBNSU5JTUFQX1csIE1JTklNQVBfSCk7XG4gICAgLy8gc2NhbGUgdG8gZml0XG4gICAgY29uc3Qgc2NhbGVYID0gTUlOSU1BUF9XIC8gZHJhd1JlZi5jdXJyZW50LndpZHRoO1xuICAgIGNvbnN0IHNjYWxlWSA9IE1JTklNQVBfSCAvIGRyYXdSZWYuY3VycmVudC5oZWlnaHQ7XG4gICAgY29uc3Qgc2NhbGUgID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpO1xuICAgIGNvbnN0IG9mZlggICA9IChNSU5JTUFQX1cgLSBkcmF3UmVmLmN1cnJlbnQud2lkdGggICogc2NhbGUpIC8gMjtcbiAgICBjb25zdCBvZmZZICAgPSAoTUlOSU1BUF9IIC0gZHJhd1JlZi5jdXJyZW50LmhlaWdodCAqIHNjYWxlKSAvIDI7XG4gICAgLy8gZHJhdyBiZyArIGJlYWRzXG4gICAgaWYgKGJnUmVmLmN1cnJlbnQpIGN0eC5kcmF3SW1hZ2UoYmdSZWYuY3VycmVudCwgICBvZmZYLCBvZmZZLCBkcmF3UmVmLmN1cnJlbnQud2lkdGggKiBzY2FsZSwgZHJhd1JlZi5jdXJyZW50LmhlaWdodCAqIHNjYWxlKTtcbiAgICBjdHguZHJhd0ltYWdlKGRyYXdSZWYuY3VycmVudCwgb2ZmWCwgb2ZmWSwgZHJhd1JlZi5jdXJyZW50LndpZHRoICogc2NhbGUsIGRyYXdSZWYuY3VycmVudC5oZWlnaHQgKiBzY2FsZSk7XG4gICAgLy8gdmlld3BvcnQgcmVjdFxuICAgIGlmIChzY3JvbGxBcmVhUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHNhID0gc2Nyb2xsQXJlYVJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgdnggPSAoc2Euc2Nyb2xsTGVmdCAtIFBBRCkgKiBzY2FsZSArIG9mZlg7XG4gICAgICBjb25zdCB2eSA9IChzYS5zY3JvbGxUb3AgIC0gUEFEKSAqIHNjYWxlICsgb2ZmWTtcbiAgICAgIGNvbnN0IHZ3ID0gc2EuY2xpZW50V2lkdGggICogc2NhbGU7XG4gICAgICBjb25zdCB2aCA9IHNhLmNsaWVudEhlaWdodCAqIHNjYWxlO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gVC5hY2NlbnQ7XG4gICAgICBjdHgubGluZVdpZHRoID0gMS41O1xuICAgICAgY3R4LnN0cm9rZVJlY3QodngsIHZ5LCB2dywgdmgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBDYW52YXMgaW5pdCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgYy5nZXRDb250ZXh0KCcyZCcpLmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgaGlzdG9yeS5jdXJyZW50ID0gW107XG4gICAgZnV0dXJlLmN1cnJlbnQgID0gW107XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDYW52YXMoKSB7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc0Zyb21TZXR1cChzZXR1cFcsIHNldHVwSCwgdW5pdCwgZGVuc2l0eSk7XG4gICAgYmVhZHNSZWYuY3VycmVudCAgPSB7IGNvbHMsIHJvd3MgfTtcbiAgICBkZW5zaXR5UmVmLmN1cnJlbnQgPSBkZW5zaXR5O1xuICAgIHVuaXRSZWYuY3VycmVudCAgICA9IHVuaXQ7XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IGNvbHMgKiB3LCBoOiByb3dzICogaCB9KTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBIaXN0b3J5IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHNhdmVIaXN0b3J5KCkge1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgaGlzdG9yeS5jdXJyZW50LnB1c2goYy5nZXRDb250ZXh0KCcyZCcpLmdldEltYWdlRGF0YSgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCkpO1xuICAgIGZ1dHVyZS5jdXJyZW50ID0gW107XG4gICAgaWYgKGhpc3RvcnkuY3VycmVudC5sZW5ndGggPiA1MCkgaGlzdG9yeS5jdXJyZW50LnNoaWZ0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmRvKCkge1xuICAgIGlmICghaGlzdG9yeS5jdXJyZW50Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQsIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBmdXR1cmUuY3VycmVudC5wdXNoKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGhpc3RvcnkuY3VycmVudC5wb3AoKSwgMCwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWRvKCkge1xuICAgIGlmICghZnV0dXJlLmN1cnJlbnQubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudCwgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGhpc3RvcnkuY3VycmVudC5wdXNoKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZ1dHVyZS5jdXJyZW50LnBvcCgpLCAwLCAwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTYXZlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHNhdmVDYW52YXMoKSB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRlbXAud2lkdGggID0gZHJhd1JlZi5jdXJyZW50LndpZHRoO1xuICAgIHRlbXAuaGVpZ2h0ID0gZHJhd1JlZi5jdXJyZW50LmhlaWdodDtcbiAgICBjb25zdCBjdHggPSB0ZW1wLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmRyYXdJbWFnZShiZ1JlZi5jdXJyZW50LCAwLCAwKTtcbiAgICBjdHguZHJhd0ltYWdlKGRyYXdSZWYuY3VycmVudCwgMCwgMCk7XG4gICAgaWYgKGV4cG9ydEdyaWRSZWYuY3VycmVudCkgY3R4LmRyYXdJbWFnZShncmlkUmVmLmN1cnJlbnQsIDAsIDApO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdGVtcC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgIGEuZG93bmxvYWQgPSAnYmVhZHdvcmsucG5nJztcbiAgICBhLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCB2aWV3OiB3aW5kb3cgfSkpO1xuICB9XG5cbiAgLy8g4pSA4pSAIE1vdXNlIGRyYXdpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gY2VsbEZyb21FdmVudChlKSB7XG4gICAgY29uc3QgcmVjdCA9IGRyYXdSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gdyk7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcigoZS5jbGllbnRZIC0gcmVjdC50b3ApICAvIGgpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBpZiAoY29sIDwgMCB8fCByb3cgPCAwIHx8IGNvbCA+PSBjb2xzIHx8IHJvdyA+PSByb3dzKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4geyBjb2wsIHJvdyB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9QYWludChlKSB7XG4gICAgY29uc3QgY2VsbCA9IGNlbGxGcm9tRXZlbnQoZSk7XG4gICAgaWYgKCFjZWxsKSByZXR1cm47XG4gICAgcGFpbnRCZWFkKGRyYXdSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpLCBjZWxsLmNvbCwgY2VsbC5yb3csIGlzRXJhc2VyUmVmLmN1cnJlbnQgPyBudWxsIDogY29sb3JSZWYuY3VycmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgIHNhdmVIaXN0b3J5KCk7IGlzRHJhd2luZy5jdXJyZW50ID0gdHJ1ZTsgZG9QYWludChlKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIGlmIChpc0RyYXdpbmcuY3VycmVudCkgeyBkb1BhaW50KGUpOyB1cGRhdGVNaW5pbWFwKCk7IH1cbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZVVwKCkgeyBpc0RyYXdpbmcuY3VycmVudCA9IGZhbHNlOyB9XG5cbiAgLy8gUmlnaHQtY2xpY2sgZHJhZyB0byBwYW4gdGhlIHNjcm9sbCBhcmVhXG4gIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFyZWFNb3VzZURvd24oZSkge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMikgcmV0dXJuO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpc1Bhbm5pbmcuY3VycmVudCA9IHRydWU7XG4gICAgcGFuU3RhcnQuY3VycmVudCA9IHtcbiAgICAgIHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZLFxuICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsQXJlYVJlZi5jdXJyZW50LnNjcm9sbExlZnQsXG4gICAgICBzY3JvbGxUb3A6ICBzY3JvbGxBcmVhUmVmLmN1cnJlbnQuc2Nyb2xsVG9wLFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQXJlYU1vdXNlTW92ZShlKSB7XG4gICAgaWYgKCFpc1Bhbm5pbmcuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGR4ID0gZS5jbGllbnRYIC0gcGFuU3RhcnQuY3VycmVudC54O1xuICAgIGNvbnN0IGR5ID0gZS5jbGllbnRZIC0gcGFuU3RhcnQuY3VycmVudC55O1xuICAgIHNjcm9sbEFyZWFSZWYuY3VycmVudC5zY3JvbGxMZWZ0ID0gcGFuU3RhcnQuY3VycmVudC5zY3JvbGxMZWZ0IC0gZHg7XG4gICAgc2Nyb2xsQXJlYVJlZi5jdXJyZW50LnNjcm9sbFRvcCAgPSBwYW5TdGFydC5jdXJyZW50LnNjcm9sbFRvcCAgLSBkeTtcbiAgICB1cGRhdGVNaW5pbWFwKCk7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQXJlYU1vdXNlVXAoZSkge1xuICAgIGlmIChlLmJ1dHRvbiA9PT0gMikgaXNQYW5uaW5nLmN1cnJlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBGbG9vZCBmaWxsIChkcmFnICYgZHJvcCkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gY2VsbFBpeGVsKGN0eCwgY29sLCByb3cpIHtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCBkID0gY3R4LmdldEltYWdlRGF0YShNYXRoLmZsb29yKGNvbCp3ICsgdy8yKSwgTWF0aC5mbG9vcihyb3cqaCArIGgvMiksIDEsIDEpLmRhdGE7XG4gICAgcmV0dXJuIFtkWzBdLCBkWzFdLCBkWzJdLCBkWzNdXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpeGVsTWF0Y2goYSwgYiwgdGhyID0gMTUpIHtcbiAgICBjb25zdCBhVCA9IGFbM10gPCAzMCwgYlQgPSBiWzNdIDwgMzA7XG4gICAgaWYgKGFUICYmIGJUKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYVQgIT09IGJUKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIE1hdGguYWJzKGFbMF0tYlswXSkgPCB0aHIgJiYgTWF0aC5hYnMoYVsxXS1iWzFdKSA8IHRociAmJiBNYXRoLmFicyhhWzJdLWJbMl0pIDwgdGhyO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxvb2RGaWxsKHN0YXJ0Q29sLCBzdGFydFJvdywgZmlsbENvbG9yKSB7XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudCwgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjb25zdCB0YXJnZXQgPSBjZWxsUGl4ZWwoY3R4LCBzdGFydENvbCwgc3RhcnRSb3cpO1xuICAgIGNvbnN0IFtmcixmZyxmYl0gPSBoZXhUb1JnYihmaWxsQ29sb3IpO1xuICAgIGlmIChwaXhlbE1hdGNoKHRhcmdldCwgW2ZyLGZnLGZiLDI1NV0pKSByZXR1cm47XG4gICAgc2F2ZUhpc3RvcnkoKTtcbiAgICBjb25zdCBxdWV1ZSAgID0gW1tzdGFydENvbCwgc3RhcnRSb3ddXTtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvd10gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgY29uc3Qga2V5ID0gYCR7Y29sfSwke3Jvd31gO1xuICAgICAgaWYgKHZpc2l0ZWQuaGFzKGtleSkgfHwgY29sPDAgfHwgcm93PDAgfHwgY29sPj1jb2xzIHx8IHJvdz49cm93cykgY29udGludWU7XG4gICAgICB2aXNpdGVkLmFkZChrZXkpO1xuICAgICAgaWYgKCFwaXhlbE1hdGNoKGNlbGxQaXhlbChjdHgsIGNvbCwgcm93KSwgdGFyZ2V0KSkgY29udGludWU7XG4gICAgICBwYWludEJlYWQoY3R4LCBjb2wsIHJvdywgZmlsbENvbG9yKTtcbiAgICAgIHF1ZXVlLnB1c2goW2NvbCsxLHJvd10sW2NvbC0xLHJvd10sW2NvbCxyb3crMV0sW2NvbCxyb3ctMV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmYyA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2NvbG9yJyk7XG4gICAgaWYgKCFmYykgcmV0dXJuO1xuICAgIGNvbnN0IGNlbGwgPSBjZWxsRnJvbUV2ZW50KGUpO1xuICAgIGlmIChjZWxsKSBmbG9vZEZpbGwoY2VsbC5jb2wsIGNlbGwucm93LCBmYyk7XG4gIH1cblxuICAvLyDilIDilIAgS2V5Ym9hcmQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihlKSB7XG4gICAgY29uc3QgY3RybCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG4gICAgaWYgKGN0cmwgJiYgZS5rZXkgPT09ICd6JykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHVuZG8oKTsgfVxuICAgIGlmIChjdHJsICYmIChlLmtleSA9PT0gJ3knIHx8IChlLnNoaWZ0S2V5ICYmIGUua2V5ID09PSAnWicpKSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IHJlZG8oKTsgfVxuICB9XG5cbiAgLy8g4pSA4pSAIENvbnRyb2wgaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBhcHBseUNvbG9yKGMpIHtcbiAgICBjb2xvclJlZi5jdXJyZW50ID0gYzsgc2V0Q29sb3IoYyk7IHNldEhleElucHV0KGMpO1xuICAgIGlzRXJhc2VyUmVmLmN1cnJlbnQgPSBmYWxzZTsgc2V0SXNFcmFzZXIoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlSYXRpbyhyKSB7XG4gICAgcmF0aW9SZWYuY3VycmVudCA9IHI7IHNldFJhdGlvKHIpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjb25zdCBicyA9IGJhc2VTaXplUmVmLmN1cnJlbnQ7XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IGNvbHMgKiBicywgaDogcm93cyAqIE1hdGgucm91bmQoYnMgKiByLmggLyByLncpIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlCZ1R5cGUodHlwZSkge1xuICAgIGJnVHlwZVJlZi5jdXJyZW50ID0gdHlwZTsgc2V0QmdUeXBlKHR5cGUpOyBkcmF3QmFja2dyb3VuZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlCZ0NvbG9yKGMpIHtcbiAgICBiZ0NvbG9yUmVmLmN1cnJlbnQgPSBjOyBzZXRCZ0NvbG9yKGMpOyBzZXRCZ0hleChjKTtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdzb2xpZCcpIGRyYXdCYWNrZ3JvdW5kKCk7XG4gIH1cblxuICAvLyDilIDilIAgUGF0dGVybiB0aWxpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gYXBwbHlQYXR0ZXJuKCkge1xuICAgIGNvbnN0IHNyYyA9IGRyYXdSZWYuY3VycmVudDtcbiAgICBpZiAoIXNyYykgcmV0dXJuO1xuICAgIGNvbnN0IG1vdGlmID0gY2xvbmVDYW52YXMoc3JjKTtcbiAgICBjb25zdCBtVyA9IG1vdGlmLndpZHRoLCBtSCA9IG1vdGlmLmhlaWdodDtcbiAgICBjb25zdCByVyA9IE1hdGgubWF4KDEsIHBhcnNlSW50KHBhdHRlcm5SVykgfHwgMik7XG4gICAgY29uc3QgckggPSBNYXRoLm1heCgxLCBwYXJzZUludChwYXR0ZXJuUkgpIHx8IDIpO1xuICAgIGNvbnN0IGhhbGZXID0gTWF0aC5mbG9vcihtVyAvIDIpLCBoYWxmSCA9IE1hdGguZmxvb3IobUggLyAyKTtcblxuICAgIGxldCB1bml0QywgbmV3VywgbmV3SDtcblxuICAgIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ2dyaWQnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVzsgbmV3SCA9IG1IICogckg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ2JyaWNrX2gnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVyArIGhhbGZXOyBuZXdIID0gbUggKiBySDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnaGFsZmRyb3AnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVzsgbmV3SCA9IG1IICogckggKyBoYWxmSDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnbWlycm9yX3gnKSB7XG4gICAgICB1bml0QyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdW5pdEMud2lkdGggPSBtVyAqIDI7IHVuaXRDLmhlaWdodCA9IG1IO1xuICAgICAgY29uc3QgdXggPSB1bml0Qy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdXguZHJhd0ltYWdlKG1vdGlmLCAwLCAwKTsgdXguZHJhd0ltYWdlKGZsaXBIKG1vdGlmKSwgbVcsIDApO1xuICAgICAgbmV3VyA9IHVuaXRDLndpZHRoICogclc7IG5ld0ggPSBtSCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdtaXJyb3JfeScpIHtcbiAgICAgIHVuaXRDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB1bml0Qy53aWR0aCA9IG1XOyB1bml0Qy5oZWlnaHQgPSBtSCAqIDI7XG4gICAgICBjb25zdCB1eSA9IHVuaXRDLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB1eS5kcmF3SW1hZ2UobW90aWYsIDAsIDApOyB1eS5kcmF3SW1hZ2UoZmxpcFYobW90aWYpLCAwLCBtSCk7XG4gICAgICBuZXdXID0gbVcgKiByVzsgbmV3SCA9IHVuaXRDLmhlaWdodCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdtaXJyb3JfNCcpIHtcbiAgICAgIGNvbnN0IGZoID0gZmxpcEgobW90aWYpLCBmdiA9IGZsaXBWKG1vdGlmKSwgZmh2ID0gZmxpcFYoZmgpO1xuICAgICAgdW5pdEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHVuaXRDLndpZHRoID0gbVcgKiAyOyB1bml0Qy5oZWlnaHQgPSBtSCAqIDI7XG4gICAgICBjb25zdCB1NCA9IHVuaXRDLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB1NC5kcmF3SW1hZ2UobW90aWYsIDAsIDApOyB1NC5kcmF3SW1hZ2UoZmgsIG1XLCAwKTtcbiAgICAgIHU0LmRyYXdJbWFnZShmdiwgMCwgbUgpOyB1NC5kcmF3SW1hZ2UoZmh2LCBtVywgbUgpO1xuICAgICAgbmV3VyA9IHVuaXRDLndpZHRoICogclc7IG5ld0ggPSB1bml0Qy5oZWlnaHQgKiBySDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHc6IGJ3LCBoOiBiaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGJlYWRzUmVmLmN1cnJlbnQgPSB7IGNvbHM6IE1hdGgucm91bmQobmV3VyAvIGJ3KSwgcm93czogTWF0aC5yb3VuZChuZXdIIC8gYmgpIH07XG4gICAgcGVuZGluZ1BhdHRlcm4uY3VycmVudCA9IHsgdW5pdEMsIG1XLCBtSCwgaGFsZlcsIGhhbGZILCByVywgckgsIHR5cGU6IHBhdHRlcm5UeXBlLCBuZXdXLCBuZXdIIH07XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IG5ld1csIGg6IG5ld0ggfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQZW5kaW5nUGF0dGVybigpIHtcbiAgICBjb25zdCBwID0gcGVuZGluZ1BhdHRlcm4uY3VycmVudDtcbiAgICBpZiAoIXApIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBkcmF3UmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGRyYXdSZWYuY3VycmVudC53aWR0aCwgZHJhd1JlZi5jdXJyZW50LmhlaWdodCk7XG4gICAgY29uc3QgeyB1bml0QywgbVcsIG1ILCBoYWxmVywgaGFsZkgsIHJXLCBySCwgdHlwZSB9ID0gcDtcbiAgICBmb3IgKGxldCByeCA9IDA7IHJ4IDwgclc7IHJ4KyspIHtcbiAgICAgIGZvciAobGV0IHJ5ID0gMDsgcnkgPCBySDsgcnkrKykge1xuICAgICAgICBsZXQgb3ggPSByeCAqICh0eXBlID09PSAnbWlycm9yX3gnIHx8IHR5cGUgPT09ICdtaXJyb3JfNCcgPyB1bml0Qy53aWR0aCAgOiBtVyk7XG4gICAgICAgIGxldCBveSA9IHJ5ICogKHR5cGUgPT09ICdtaXJyb3JfeScgfHwgdHlwZSA9PT0gJ21pcnJvcl80JyA/IHVuaXRDLmhlaWdodCA6IG1IKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdicmlja19oJykgIG94ICs9IChyeSAlIDIgPT09IDEgPyBoYWxmVyA6IDApO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2hhbGZkcm9wJykgb3kgKz0gKHJ4ICUgMiA9PT0gMSA/IGhhbGZIIDogMCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodW5pdEMsIG94LCBveSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIEN1c3RvbSBwYWxldHRlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBhY3RpdmVQYWxldHRlID0gYWN0aXZlUGFsZXR0ZUlkID09PSAnZGVmYXVsdCdcbiAgICA/IERFRkFVTFRfUEFMRVRURVxuICAgIDogKChwYWxldHRlcy5maW5kKHAgPT4gcC5pZCA9PT0gYWN0aXZlUGFsZXR0ZUlkKSB8fCB7fSkuY29sb3JzIHx8IERFRkFVTFRfUEFMRVRURSk7XG5cbiAgZnVuY3Rpb24gc2F2ZVBhbGV0dGVzKHVwZGF0ZWQpIHtcbiAgICBzZXRQYWxldHRlcyh1cGRhdGVkKTtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmVhZHRvb2xfcGFsZXR0ZXMnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkKSk7IH0gY2F0Y2gge31cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBhbGV0dGUoKSB7XG4gICAgaWYgKCFuZXdQYWxldHRlTmFtZS50cmltKCkpIHJldHVybjtcbiAgICBjb25zdCBpZCA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICBzYXZlUGFsZXR0ZXMoWy4uLnBhbGV0dGVzLCB7IGlkLCBuYW1lOiBuZXdQYWxldHRlTmFtZS50cmltKCksIGNvbG9yczogW10gfV0pO1xuICAgIHNldEFjdGl2ZVBhbGV0dGVJZChpZCk7XG4gICAgc2V0TmV3UGFsZXR0ZU5hbWUoJycpOyBzZXRTaG93TmV3UGFsZXR0ZUlucHV0KGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVBhbGV0dGUoaWQpIHtcbiAgICBzYXZlUGFsZXR0ZXMocGFsZXR0ZXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gaWQpKTtcbiAgICBzZXRBY3RpdmVQYWxldHRlSWQoJ2RlZmF1bHQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbG9yVG9QYWxldHRlKGlkKSB7XG4gICAgc2F2ZVBhbGV0dGVzKHBhbGV0dGVzLm1hcChwID0+XG4gICAgICBwLmlkID09PSBpZCAmJiAhcC5jb2xvcnMuaW5jbHVkZXMoY29sb3JSZWYuY3VycmVudClcbiAgICAgICAgPyB7IC4uLnAsIGNvbG9yczogWy4uLnAuY29sb3JzLCBjb2xvclJlZi5jdXJyZW50XSB9XG4gICAgICAgIDogcFxuICAgICkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ29sb3JGcm9tUGFsZXR0ZShwaWQsIGNvbCkge1xuICAgIHNhdmVQYWxldHRlcyhwYWxldHRlcy5tYXAocCA9PlxuICAgICAgcC5pZCA9PT0gcGlkID8geyAuLi5wLCBjb2xvcnM6IHAuY29sb3JzLmZpbHRlcihjID0+IGMgIT09IGNvbCkgfSA6IHBcbiAgICApKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBFZmZlY3RzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhdmVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmVhZHRvb2xfcGFsZXR0ZXMnKSB8fCAnW10nKTtcbiAgICAgIHNldFBhbGV0dGVzKHNhdmVkKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgY3JlYXRlQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbnZhc1NpemUudyA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAocGVuZGluZ1BhdHRlcm4uY3VycmVudCkge1xuICAgICAgICAgIHJlbmRlclBlbmRpbmdQYXR0ZXJuKCk7XG4gICAgICAgICAgcGVuZGluZ1BhdHRlcm4uY3VycmVudCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5pdENhbnZhcygpO1xuICAgICAgICB9XG4gICAgICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgICAgIGRyYXdHcmlkKCk7XG4gICAgICAgIGRyYXdSdWxlcnMoKTtcbiAgICAgICAgdXBkYXRlTWluaW1hcCgpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9LCBbY2FudmFzU2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGRyYXdHcmlkKCk7IH0sIFtzaG93R3JpZF0pO1xuICB1c2VFZmZlY3QoKCkgPT4geyBkcmF3QmFja2dyb3VuZCgpOyBzZXRUaW1lb3V0KHVwZGF0ZU1pbmltYXAsIDUwKTsgfSwgW2JnVHlwZSwgYmdDb2xvcl0pO1xuXG4gIC8vIOKUgOKUgCBEZXJpdmVkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IHByZXZpZXcgPSBiZWFkc0Zyb21TZXR1cChzZXR1cFcsIHNldHVwSCwgdW5pdCwgZGVuc2l0eSk7XG4gIGNvbnN0IGNXID0gY2FudmFzU2l6ZS53IHx8IDE7XG4gIGNvbnN0IGNIID0gY2FudmFzU2l6ZS5oIHx8IDE7XG5cbiAgLy8g4pSA4pSAIFJlbmRlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDB2dycsIGhlaWdodDogJzEwMHZoJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgYmFja2dyb3VuZDogVC5iZyB9fT5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+QmVhZHdvcmsgU3R1ZGlvPC90aXRsZT5cbiAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGxheWZhaXIrRGlzcGxheTppdGFsLHdnaHRAMCw2MDA7MSw0MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAqIHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxuICAgICAgICBodG1sLCBib2R5IHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBmb250LWZhbWlseTogbW9ub3NwYWNlOyB9XG4gICAgICAgIGlucHV0LCBzZWxlY3QsIGJ1dHRvbiB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IH1cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhciB7IHdpZHRoOiA2cHg7IGhlaWdodDogNnB4OyB9XG4gICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiAke1QuYmd9OyB9XG4gICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyBiYWNrZ3JvdW5kOiAke1QuYm9yZGVyfTsgYm9yZGVyLXJhZGl1czogM3B4OyB9XG4gICAgICAgIGJ1dHRvbjpob3ZlciB7IG9wYWNpdHk6IDAuODU7IH1cbiAgICAgICAgaW5wdXRbdHlwZT1jaGVja2JveF0geyBhY2NlbnQtY29sb3I6ICR7VC5hY2NlbnR9OyB9XG4gICAgICBgfTwvc3R5bGU+XG5cbiAgICAgIHsvKiDilIDilIAgU2Nyb2xsYWJsZSBjYW52YXMgYXJlYSDilIDilIAgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17c2Nyb2xsQXJlYVJlZn1cbiAgICAgICAgb25TY3JvbGw9e3VwZGF0ZU1pbmltYXB9XG4gICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVTY3JvbGxBcmVhTW91c2VEb3dufVxuICAgICAgICBvbk1vdXNlTW92ZT17aGFuZGxlU2Nyb2xsQXJlYU1vdXNlTW92ZX1cbiAgICAgICAgb25Nb3VzZVVwPXtoYW5kbGVTY3JvbGxBcmVhTW91c2VVcH1cbiAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCxcbiAgICAgICAgICB3aWR0aDogYGNhbGMoMTAwdncgLSAke1BBTkVMX1d9cHgpYCwgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsIGJhY2tncm91bmQ6IFQuY2FudmFzLFxuICAgICAgICB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZ3JpZCcsXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogYCR7UlVMRVJfU1p9cHggJHtjV31weGAsXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlUm93czogICAgYCR7UlVMRVJfU1p9cHggJHtjSH1weGAsXG4gICAgICAgICAgcGFkZGluZzogUEFELCBnYXA6IDAsXG4gICAgICAgICAgbWluV2lkdGg6ICcxMDAlJywgbWluSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIH19PlxuICAgICAgICAgIHsvKiBDb3JuZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBULmJnLCBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogUEFELCBsZWZ0OiBQQUQsIHpJbmRleDogNSB9fSAvPlxuXG4gICAgICAgICAgey8qIFRvcCBydWxlciAqL31cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnc3RpY2t5JywgdG9wOiBQQUQsIHpJbmRleDogNCwgYmFja2dyb3VuZDogVC5iZywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e3J1bGVyVG9wUmVmfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTGVmdCBydWxlciAqL31cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnc3RpY2t5JywgbGVmdDogUEFELCB6SW5kZXg6IDQsIGJhY2tncm91bmQ6IFQuYmcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtydWxlckxlZnRSZWZ9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0gLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDYW52YXMgc3RhY2sgKi99XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiBjVywgaGVpZ2h0OiBjSCB9fVxuICAgICAgICAgICAgb25Ecm9wPXtoYW5kbGVEcm9wfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17ZSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2JnVHlwZSA9PT0gJ3RyYW5zcGFyZW50JyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIHpJbmRleDogMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICdyZXBlYXRpbmctY29uaWMtZ3JhZGllbnQoI2FhYSAwJSAyNSUsICNmZmYgMCUgNTAlKScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICcxNnB4IDE2cHgnLFxuICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtiZ1JlZn0gICB3aWR0aD17Y1d9IGhlaWdodD17Y0h9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMSB9fSAvPlxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e2RyYXdSZWZ9IHdpZHRoPXtjV30gaGVpZ2h0PXtjSH1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCwgekluZGV4OiAyLCBjdXJzb3I6IGlzRXJhc2VyID8gJ2NlbGwnIDogJ2Nyb3NzaGFpcicsIHVzZXJTZWxlY3Q6ICdub25lJyB9fVxuICAgICAgICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlTW91c2VEb3dufVxuICAgICAgICAgICAgICBvbk1vdXNlTW92ZT17aGFuZGxlTW91c2VNb3ZlfVxuICAgICAgICAgICAgICBvbk1vdXNlVXA9e2hhbmRsZU1vdXNlVXB9XG4gICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17Z3JpZFJlZn0gd2lkdGg9e2NXfSBoZWlnaHQ9e2NIfVxuICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB6SW5kZXg6IDMsIHBvaW50ZXJFdmVudHM6ICdub25lJyB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIE1pbmktbWFwIOKUgOKUgCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDEwLCBib3R0b206IDEwLCB6SW5kZXg6IDIwLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzExMScsIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgIGJvcmRlclJhZGl1czogNCwgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnM3B4IDZweCcsIGZvbnRTaXplOiA5LCBjb2xvcjogVC5tdXRlZCwgbGV0dGVyU3BhY2luZzogMSwgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCB9fT5cbiAgICAgICAgICBPVkVSVklFV1xuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGNhbnZhcyByZWY9e21pbmltYXBSZWZ9IHdpZHRoPXtNSU5JTUFQX1d9IGhlaWdodD17TUlOSU1BUF9IfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIOKUgOKUgCBSaWdodCBwYW5lbCDilIDilIAgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCByaWdodDogMCwgdG9wOiAwLFxuICAgICAgICB3aWR0aDogUEFORUxfVywgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBiYWNrZ3JvdW5kOiBULnBhbmVsLCBjb2xvcjogVC50ZXh0LFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXJMZWZ0OiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgekluZGV4OiAxMCwgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICB9fT5cbiAgICAgICAgey8qIFNhdmUg4oCUIHByb21pbmVudCB0b3AgYmFyICovfVxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3NhdmVDYW52YXN9IHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNiODczMzMsICNkNGEwNDApJyxcbiAgICAgICAgICBjb2xvcjogJyMxYTE3MTQnLCBmb250V2VpZ2h0OiA3MDAsIGZvbnRTaXplOiAxMyxcbiAgICAgICAgICBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzEzcHggMTZweCcsXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgbGV0dGVyU3BhY2luZzogMS41LCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZlwiLFxuICAgICAgICB9fT5cbiAgICAgICAgICDihpMgIFNBVkUgQVJUV09SS1xuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxNHB4IDEycHgnLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6IDEyIH19PlxuICAgICAgICAgIHsvKiBUaXRsZSAqL31cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IFwiJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZlwiLCBmb250U2l6ZTogMTcsIGNvbG9yOiBULnRleHQsIGxldHRlclNwYWNpbmc6IDAuNSwgZm9udFN0eWxlOiAnaXRhbGljJyB9fT5cbiAgICAgICAgICAgIEJlYWR3b3JrIFN0dWRpb1xuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENhbnZhcyBzZXR1cCAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkNhbnZhcyBTaXplXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYgfX0+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIldJRFRIXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwLjFcIiBzdGVwPVwiMC4xXCIgdmFsdWU9e3NldHVwV31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNldHVwVyhlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIkhFSUdIVFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4xXCIgc3RlcD1cIjAuMVwiIHZhbHVlPXtzZXR1cEh9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZXR1cEgoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJVTklUXCIgZmxleD17MC43fT5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXt1bml0fSBvbkNoYW5nZT17ZSA9PiBzZXRVbml0KGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e3sgLi4uaW5wLCB3aWR0aDogNTIgfX0+XG4gICAgICAgICAgICAgICAgICB7VU5JVFMubWFwKHUgPT4gPG9wdGlvbiBrZXk9e3V9Pnt1fTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIkJFQUQgREVOU0lUWVwiPlxuICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtkZW5zaXR5fSBvbkNoYW5nZT17ZSA9PiBzZXREZW5zaXR5KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfSBzdHlsZT17aW5wfT5cbiAgICAgICAgICAgICAgICB7REVOU0lUWV9QUkVTRVRTLm1hcChkID0+IDxvcHRpb24ga2V5PXtkLnZhbHVlfSB2YWx1ZT17ZC52YWx1ZX0+e2QubGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5tdXRlZCwgZm9udFNpemU6IDExLCBtYXJnaW46ICc2cHggMCcgfX0+XG4gICAgICAgICAgICAgID0ge3ByZXZpZXcuY29sc30gw5cge3ByZXZpZXcucm93c30gYmVhZHNcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjcmVhdGVDYW52YXN9IHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjUzNTI1JywgY29sb3I6ICcjN2RhYTZkJywgYm9yZGVyOiAnMXB4IHNvbGlkICMzYTVhM2EnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyUmFkaXVzOiAzLCB3aWR0aDogJzEwMCUnLCBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICB9fT7inKYgQ3JlYXRlIENhbnZhczwvYnV0dG9uPlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBQYWxldHRlICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiUGFsZXR0ZVwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luQm90dG9tOiA2LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17YWN0aXZlUGFsZXR0ZUlkfSBvbkNoYW5nZT17ZSA9PiBzZXRBY3RpdmVQYWxldHRlSWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmlucCwgZmxleDogMSB9fT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGVmYXVsdFwiPkRlZmF1bHQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICB7cGFsZXR0ZXMubWFwKHAgPT4gPG9wdGlvbiBrZXk9e3AuaWR9IHZhbHVlPXtwLmlkfT57cC5uYW1lfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dOZXdQYWxldHRlSW5wdXQoIXNob3dOZXdQYWxldHRlSW5wdXQpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBwYWRkaW5nOiAnNXB4IDlweCcsIGZsZXhTaHJpbms6IDAgfX0+77yLPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtzaG93TmV3UGFsZXR0ZUlucHV0ICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luQm90dG9tOiA2IH19PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17bmV3UGFsZXR0ZU5hbWV9IG9uQ2hhbmdlPXtlID0+IHNldE5ld1BhbGV0dGVOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFsZXR0ZSBuYW1l4oCmXCIgc3R5bGU9e3sgLi4uaW5wLCBmbGV4OiAxIH19XG4gICAgICAgICAgICAgICAgICBvbktleURvd249e2UgPT4gZS5rZXkgPT09ICdFbnRlcicgJiYgYWRkUGFsZXR0ZSgpfSBhdXRvRm9jdXMgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2FkZFBhbGV0dGV9IHN0eWxlPXt7IC4uLmNoaXBCdG4odHJ1ZSksIGZsZXhTaHJpbms6IDAgfX0+T0s8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2FjdGl2ZVBhbGV0dGVJZCAhPT0gJ2RlZmF1bHQnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luQm90dG9tOiA2IH19PlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gYWRkQ29sb3JUb1BhbGV0dGUoYWN0aXZlUGFsZXR0ZUlkKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBmbGV4OiAxLCBmb250U2l6ZTogMTEgfX0+77yLIEFkZCBjdXJyZW50IGNvbG9yPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkZWxldGVQYWxldHRlKGFjdGl2ZVBhbGV0dGVJZCl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgY29sb3I6ICcjY2M3Nzc3JywgZm9udFNpemU6IDExIH19PvCfl5EgRGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJDb2xvclwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogOCB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgZmxleFNocmluazogMCwgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzRXJhc2VyID8gJyNmZmYnIDogY29sb3IsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBpc0VyYXNlciA/ICcycHggc29saWQgI2NjNzc3NycgOiBgMnB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXtoZXhJbnB1dH0gb25DaGFuZ2U9e2UgPT4geyBzZXRIZXhJbnB1dChlLnRhcmdldC52YWx1ZSk7IGlmICgvXiNbMC05YS1mQS1GXXs2fSQvLnRlc3QoZS50YXJnZXQudmFsdWUpKSBhcHBseUNvbG9yKGUudGFyZ2V0LnZhbHVlKTsgfX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiMwMDAwMDBcIiBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAzIH19PlxuICAgICAgICAgICAgICB7YWN0aXZlUGFsZXR0ZS5tYXAoYyA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2N9IHRpdGxlPXtjfSBkcmFnZ2FibGVcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXtlID0+IGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2NvbG9yJywgYyl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseUNvbG9yKGMpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBiYWNrZ3JvdW5kOiBjLCBjdXJzb3I6ICdncmFiJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLCBmbGV4U2hyaW5rOiAwLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBjb2xvciA9PT0gYyAmJiAhaXNFcmFzZXIgPyBgMnB4IHNvbGlkICR7VC5hY2NlbnR9YCA6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlUGFsZXR0ZUlkICE9PSAnZGVmYXVsdCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e2UgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyByZW1vdmVDb2xvckZyb21QYWxldHRlKGFjdGl2ZVBhbGV0dGVJZCwgYyk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC00LCByaWdodDogLTQsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjOTkzMzMzJywgYm9yZGVyUmFkaXVzOiAnNTAlJywgZm9udFNpemU6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLCBjdXJzb3I6ICdwb2ludGVyJywgekluZGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgIH19PuKclTwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFQubXV0ZWQsIGZvbnRTaXplOiAxMCwgbWFyZ2luVG9wOiA1IH19PlxuICAgICAgICAgICAgICBEcmFnIGEgY29sb3Igb250byB0aGUgY2FudmFzIHRvIGZsb29kIGZpbGxcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBUb29sICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiVG9vbFwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IGlzRXJhc2VyUmVmLmN1cnJlbnQgPSBmYWxzZTsgc2V0SXNFcmFzZXIoZmFsc2UpOyB9fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oIWlzRXJhc2VyKSwgZmxleDogMSB9fT7inI8gRHJhdzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgaXNFcmFzZXJSZWYuY3VycmVudCA9IHRydWU7IHNldElzRXJhc2VyKHRydWUpOyB9fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oaXNFcmFzZXIpLCBmbGV4OiAxIH19PuKMqyBFcmFzZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEJlYWQgcmF0aW8gKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJCZWFkIFJhdGlvIChXOkgpXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2IH19PlxuICAgICAgICAgICAgICB7UkFUSU9TLm1hcChyID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17ci5sYWJlbH0gb25DbGljaz17KCkgPT4gYXBwbHlSYXRpbyhyKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4ocmF0aW8ubGFiZWwgPT09IHIubGFiZWwpLCBmbGV4OiAxIH19PntyLmxhYmVsfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBCYWNrZ3JvdW5kICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQmFja2dyb3VuZFwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNSwgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICB7Wyd0cmFuc3BhcmVudCcsJ3NvbGlkJywnaW1hZ2UnXS5tYXAodCA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e3R9IG9uQ2xpY2s9eygpID0+IGFwcGx5QmdUeXBlKHQpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihiZ1R5cGUgPT09IHQpLCBmbGV4OiAxLCBmb250U2l6ZTogMTEsIHBhZGRpbmc6ICc1cHggNHB4JyB9fT57dH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtiZ1R5cGUgPT09ICdzb2xpZCcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAyOCwgaGVpZ2h0OiAyOCwgYmFja2dyb3VuZDogYmdDb2xvciwgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiAzLCBmbGV4U2hyaW5rOiAwIH19IC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXtiZ0hleH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHsgc2V0QmdIZXgoZS50YXJnZXQudmFsdWUpOyBpZiAoL14jWzAtOWEtZkEtRl17Nn0kLy50ZXN0KGUudGFyZ2V0LnZhbHVlKSkgYXBwbHlCZ0NvbG9yKGUudGFyZ2V0LnZhbHVlKTsgfX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtiZ1R5cGUgPT09ICdpbWFnZScgJiYgKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvcG5nXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBiZ0ltYWdlUmVmLmN1cnJlbnQgPSBldi50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgIHNldEJnSW1hZ2UoZXYudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgYmdUeXBlUmVmLmN1cnJlbnQgPSAnaW1hZ2UnOyBzZXRCZ1R5cGUoJ2ltYWdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgZHJhd0JhY2tncm91bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uaW5wLCBjdXJzb3I6ICdwb2ludGVyJyB9fSAvPlxuICAgICAgICAgICAgICAgIHtiZ0ltYWdlICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4geyBiZ0ltYWdlUmVmLmN1cnJlbnQgPSBudWxsOyBzZXRCZ0ltYWdlKG51bGwpOyBhcHBseUJnVHlwZSgnc29saWQnKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIG1hcmdpblRvcDogNiwgd2lkdGg6ICcxMDAlJywgZm9udFNpemU6IDExIH19PlJlbW92ZSBpbWFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogUmVwZWF0IHBhdHRlcm4gKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJSZXBlYXQgUGF0dGVyblwiPlxuICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUEFUVEVSTiBUWVBFXCI+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3BhdHRlcm5UeXBlfSBvbkNoYW5nZT17ZSA9PiBzZXRQYXR0ZXJuVHlwZShlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9PlxuICAgICAgICAgICAgICAgIHtSRVBFQVRfUEFUVEVSTlMubWFwKHAgPT4gPG9wdGlvbiBrZXk9e3AudmFsdWV9IHZhbHVlPXtwLnZhbHVlfT57cC5sYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Ub3A6IDYgfX0+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlJFUEVBVCBXXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiMTBcIiB2YWx1ZT17cGF0dGVyblJXfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0UGF0dGVyblJXKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUkVQRUFUIEhcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCIxMFwiIHZhbHVlPXtwYXR0ZXJuUkh9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRQYXR0ZXJuUkgoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2FwcGx5UGF0dGVybn0gc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyMjI4NDAnLCBjb2xvcjogJyM4ODk5Y2MnLCBib3JkZXI6ICcxcHggc29saWQgIzNhM2Q2MCcsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXJSYWRpdXM6IDMsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMiwgbWFyZ2luVG9wOiA4LFxuICAgICAgICAgICAgfX0+4p+zIEFwcGx5IFJlcGVhdDwvYnV0dG9uPlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBHcmlkICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiR3JpZFwiPlxuICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCwgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiA1IH19PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c2hvd0dyaWR9IG9uQ2hhbmdlPXsoKSA9PiB7IGNvbnN0IG4gPSAhc2hvd0dyaWRSZWYuY3VycmVudDsgc2hvd0dyaWRSZWYuY3VycmVudCA9IG47IHNldFNob3dHcmlkKG4pOyBkcmF3R3JpZCgpOyB9fSAvPlxuICAgICAgICAgICAgICBTaG93IGdyaWQgd2hpbGUgZHJhd2luZ1xuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogMTIgfX0+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtleHBvcnRXaXRoR3JpZH0gb25DaGFuZ2U9eygpID0+IHsgZXhwb3J0R3JpZFJlZi5jdXJyZW50ID0gIWV4cG9ydEdyaWRSZWYuY3VycmVudDsgc2V0RXhwb3J0V2l0aEdyaWQoZXhwb3J0R3JpZFJlZi5jdXJyZW50KTsgfX0gLz5cbiAgICAgICAgICAgICAgSW5jbHVkZSBncmlkIGluIGV4cG9ydFxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogQWN0aW9ucyAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd0NsZWFyQ29uZmlybSh0cnVlKX0gc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogVC5zZWN0aW9uLCBjb2xvcjogJyNjYzc3NzcnLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCB3aWR0aDogJzEwMCUnLCBmb250U2l6ZTogMTIsIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgfX0+4pyVIENsZWFyIGNhbnZhczwvYnV0dG9uPlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFQubXV0ZWQsIGZvbnRTaXplOiAxMSwgcGFkZGluZzogJzZweCAycHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHtULmJvcmRlcn1gIH19PlxuICAgICAgICAgICAgQ3RybCtaICB1bmRvICDCtyAgQ3RybCtZICByZWRvXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiDilIDilIAgQ2xlYXIgY29uZmlybWF0aW9uIOKUgOKUgCAqL31cbiAgICAgIHtzaG93Q2xlYXJDb25maXJtICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgYmFja2dyb3VuZDogJ3JnYmEoMCwwLDAsMC43MiknLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgekluZGV4OiAxMDAsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFQucGFuZWwsIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDYsIHBhZGRpbmc6IDI4LCB3aWR0aDogMzAwLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAxMHB4IDQwcHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogXCInUGxheWZhaXIgRGlzcGxheScsIHNlcmlmXCIsIGZvbnRTaXplOiAxOCwgY29sb3I6IFQudGV4dCwgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICBDbGVhciBjYW52YXM/XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogVC5tdXRlZCwgbWFyZ2luQm90dG9tOiAyMCB9fT5cbiAgICAgICAgICAgICAgQWxsIHlvdXIgd29yayB3aWxsIGJlIGVyYXNlZC4gVGhpcyBjYW5ub3QgYmUgdW5kb25lLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAxMCB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q2xlYXJDb25maXJtKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgZmxleDogMSwgcGFkZGluZzogJzhweCcgfX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNhdmVIaXN0b3J5KCk7IGluaXRDYW52YXMoKTsgZHJhd0JhY2tncm91bmQoKTsgZHJhd0dyaWQoKTtcbiAgICAgICAgICAgICAgICBzZXRTaG93Q2xlYXJDb25maXJtKGZhbHNlKTtcbiAgICAgICAgICAgICAgfX0gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBmbGV4OiAxLCBwYWRkaW5nOiAnOHB4JywgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlclJhZGl1czogMyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzVhMWExYScsIGNvbG9yOiAnI2ZmYWFhYScsIGJvcmRlcjogJzFweCBzb2xpZCAjOGEzMDMwJywgZm9udFNpemU6IDEyLFxuICAgICAgICAgICAgICB9fT5DbGVhcjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdfQ== */\n/*@ sourceURL=W:\\Madhura\\Morii\\beadwork tool\\code\\pages\\index.js */")), __jsx("div", {
    ref: scrollAreaRef,
    onScroll: updateMinimap,
    onMouseDown: handleScrollAreaMouseDown,
    onMouseMove: handleScrollAreaMouseMove,
    onMouseUp: handleScrollAreaMouseUp,
    onContextMenu: function onContextMenu(e) {
      return e.preventDefault();
    },
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: "calc(100vw - ".concat(PANEL_W, "px)"),
      height: '100vh',
      overflow: 'auto',
      background: T.canvas
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 751
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'inline-grid',
      gridTemplateColumns: "".concat(RULER_SZ, "px ").concat(cW, "px"),
      gridTemplateRows: "".concat(RULER_SZ, "px ").concat(cH, "px"),
      padding: PAD,
      gap: 0,
      minWidth: '100%',
      minHeight: '100%'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 763
    },
    __self: this
  }, __jsx("div", {
    style: {
      background: T.bg,
      position: 'sticky',
      top: PAD,
      left: PAD,
      zIndex: 5
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 771
    },
    __self: this
  }), __jsx("div", {
    style: {
      position: 'sticky',
      top: PAD,
      zIndex: 4,
      background: T.bg,
      overflow: 'hidden'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 774
    },
    __self: this
  }, __jsx("canvas", {
    ref: rulerTopRef,
    style: {
      display: 'block'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 775
    },
    __self: this
  })), __jsx("div", {
    style: {
      position: 'sticky',
      left: PAD,
      zIndex: 4,
      background: T.bg,
      overflow: 'hidden'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 779
    },
    __self: this
  }, __jsx("canvas", {
    ref: rulerLeftRef,
    style: {
      display: 'block'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 780
    },
    __self: this
  })), __jsx("div", {
    style: {
      position: 'relative',
      width: cW,
      height: cH
    },
    onDrop: handleDrop,
    onDragOver: function onDragOver(e) {
      return e.preventDefault();
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 784
    },
    __self: this
  }, bgType === 'transparent' && __jsx("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      backgroundImage: 'repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%)',
      backgroundSize: '16px 16px'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 790
    },
    __self: this
  }), __jsx("canvas", {
    ref: bgRef,
    width: cW,
    height: cH,
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 796
    },
    __self: this
  }), __jsx("canvas", {
    ref: drawRef,
    width: cW,
    height: cH,
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 2,
      cursor: isEraser ? 'cell' : 'crosshair',
      userSelect: 'none'
    },
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 797
    },
    __self: this
  }), __jsx("canvas", {
    ref: gridRef,
    width: cW,
    height: cH,
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 3,
      pointerEvents: 'none'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 804
    },
    __self: this
  })))), __jsx("div", {
    style: {
      position: 'fixed',
      left: 10,
      bottom: 10,
      zIndex: 20,
      background: '#111',
      border: "1px solid ".concat(T.border),
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 811
    },
    __self: this
  }, __jsx("div", {
    style: {
      padding: '3px 6px',
      fontSize: 9,
      color: T.muted,
      letterSpacing: 1,
      borderBottom: "1px solid ".concat(T.border)
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 817
    },
    __self: this
  }, "OVERVIEW"), __jsx("canvas", {
    ref: minimapRef,
    width: MINIMAP_W,
    height: MINIMAP_H,
    style: {
      display: 'block'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 820
    },
    __self: this
  })), __jsx("div", {
    style: {
      position: 'fixed',
      right: 0,
      top: 0,
      width: PANEL_W,
      height: '100vh',
      background: T.panel,
      color: T.text,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: "1px solid ".concat(T.border),
      zIndex: 10,
      overflowY: 'auto'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 824
    },
    __self: this
  }, __jsx("button", {
    onClick: saveCanvas,
    style: {
      background: 'linear-gradient(135deg, #b87333, #d4a040)',
      color: '#1a1714',
      fontWeight: 700,
      fontSize: 13,
      border: 'none',
      padding: '13px 16px',
      cursor: 'pointer',
      textAlign: 'center',
      letterSpacing: 1.5,
      flexShrink: 0,
      fontFamily: "'Playfair Display', serif"
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 833
    },
    __self: this
  }, "\u2193  SAVE ARTWORK"), __jsx("div", {
    style: {
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 844
    },
    __self: this
  }, __jsx("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 17,
      color: T.text,
      letterSpacing: 0.5,
      fontStyle: 'italic'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 846
    },
    __self: this
  }, "Beadwork Studio"), __jsx(Section, {
    title: "Canvas Size",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 852
    },
    __self: this
  }, __jsx(Field, {
    label: "WIDTH",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 853
    },
    __self: this
  }, __jsx("input", {
    type: "number",
    min: "0.1",
    step: "0.1",
    value: setupW,
    onChange: function onChange(e) {
      return setSetupW(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 854
    },
    __self: this
  })), __jsx(Field, {
    label: "HEIGHT",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 857
    },
    __self: this
  }, __jsx("input", {
    type: "number",
    min: "0.1",
    step: "0.1",
    value: setupH,
    onChange: function onChange(e) {
      return setSetupH(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 858
    },
    __self: this
  })), __jsx(Field, {
    label: "UNIT",
    flex: 0.7,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 861
    },
    __self: this
  }, __jsx("select", {
    value: unit,
    onChange: function onChange(e) {
      return setUnit(e.target.value);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, inp, {
      width: 52
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 862
    },
    __self: this
  }, UNITS.map(function (u) {
    return __jsx("option", {
      key: u,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 863
      },
      __self: this
    }, u);
  })))), __jsx(Field, {
    label: "BEAD DENSITY",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 867
    },
    __self: this
  }, __jsx("select", {
    value: density,
    onChange: function onChange(e) {
      return setDensity(Number(e.target.value));
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 868
    },
    __self: this
  }, DENSITY_PRESETS.map(function (d) {
    return __jsx("option", {
      key: d.value,
      value: d.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 869
      },
      __self: this
    }, d.label);
  }))), __jsx("div", {
    style: {
      color: T.muted,
      fontSize: 11,
      margin: '6px 0'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 872
    },
    __self: this
  }, "= ", preview.cols, " \xD7 ", preview.rows, " beads"), __jsx("button", {
    onClick: createCanvas,
    style: {
      background: '#253525',
      color: '#7daa6d',
      border: '1px solid #3a5a3a',
      padding: '7px 12px',
      cursor: 'pointer',
      borderRadius: 3,
      width: '100%',
      fontSize: 12
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 875
    },
    __self: this
  }, "\u2726 Create Canvas")), __jsx(Section, {
    title: "Palette",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 882
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 6,
      alignItems: 'center'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883
    },
    __self: this
  }, __jsx("select", {
    value: activePaletteId,
    onChange: function onChange(e) {
      return setActivePaletteId(e.target.value);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, inp, {
      flex: 1
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 884
    },
    __self: this
  }, __jsx("option", {
    value: "default",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 886
    },
    __self: this
  }, "Default"), palettes.map(function (p) {
    return __jsx("option", {
      key: p.id,
      value: p.id,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 887
      },
      __self: this
    }, p.name);
  })), __jsx("button", {
    onClick: function onClick() {
      return setShowNewPaletteInput(!showNewPaletteInput);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(false), {
      padding: '5px 9px',
      flexShrink: 0
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 889
    },
    __self: this
  }, "\uFF0B")), showNewPaletteInput && __jsx("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 893
    },
    __self: this
  }, __jsx("input", {
    value: newPaletteName,
    onChange: function onChange(e) {
      return setNewPaletteName(e.target.value);
    },
    placeholder: "Palette name\u2026",
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, inp, {
      flex: 1
    }),
    onKeyDown: function onKeyDown(e) {
      return e.key === 'Enter' && addPalette();
    },
    autoFocus: true,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 894
    },
    __self: this
  }), __jsx("button", {
    onClick: addPalette,
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(true), {
      flexShrink: 0
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 897
    },
    __self: this
  }, "OK")), activePaletteId !== 'default' && __jsx("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 901
    },
    __self: this
  }, __jsx("button", {
    onClick: function onClick() {
      return addColorToPalette(activePaletteId);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(false), {
      flex: 1,
      fontSize: 11
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 902
    },
    __self: this
  }, "\uFF0B Add current color"), __jsx("button", {
    onClick: function onClick() {
      return deletePalette(activePaletteId);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(false), {
      color: '#cc7777',
      fontSize: 11
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 904
    },
    __self: this
  }, "\uD83D\uDDD1 Delete"))), __jsx(Section, {
    title: "Color",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 911
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 912
    },
    __self: this
  }, __jsx("div", {
    style: {
      width: 36,
      height: 36,
      flexShrink: 0,
      borderRadius: 3,
      background: isEraser ? '#fff' : color,
      border: isEraser ? '2px solid #cc7777' : "2px solid ".concat(T.border)
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 913
    },
    __self: this
  }), __jsx("input", {
    value: hexInput,
    onChange: function onChange(e) {
      setHexInput(e.target.value);
      if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) applyColor(e.target.value);
    },
    placeholder: "#000000",
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 918
    },
    __self: this
  })), __jsx("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 921
    },
    __self: this
  }, activePalette.map(function (c) {
    return __jsx("div", {
      key: c,
      title: c,
      draggable: true,
      onDragStart: function onDragStart(e) {
        return e.dataTransfer.setData('color', c);
      },
      onClick: function onClick() {
        return applyColor(c);
      },
      style: {
        width: 20,
        height: 20,
        background: c,
        cursor: 'grab',
        borderRadius: 2,
        flexShrink: 0,
        position: 'relative',
        border: color === c && !isEraser ? "2px solid ".concat(T.accent) : "1px solid ".concat(T.border)
      },
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 923
      },
      __self: this
    }, activePaletteId !== 'default' && __jsx("div", {
      onClick: function onClick(e) {
        e.stopPropagation();
        removeColorFromPalette(activePaletteId, c);
      },
      style: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 10,
        height: 10,
        background: '#993333',
        borderRadius: '50%',
        fontSize: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        cursor: 'pointer',
        zIndex: 1
      },
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 933
      },
      __self: this
    }, "\u2715"));
  })), __jsx("div", {
    style: {
      color: T.muted,
      fontSize: 10,
      marginTop: 5
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 944
    },
    __self: this
  }, "Drag a color onto the canvas to flood fill")), __jsx(Section, {
    title: "Tool",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 950
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      gap: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 951
    },
    __self: this
  }, __jsx("button", {
    onClick: function onClick() {
      isEraserRef.current = false;
      setIsEraser(false);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(!isEraser), {
      flex: 1
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 952
    },
    __self: this
  }, "\u270F Draw"), __jsx("button", {
    onClick: function onClick() {
      isEraserRef.current = true;
      setIsEraser(true);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(isEraser), {
      flex: 1
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 954
    },
    __self: this
  }, "\u232B Erase"))), __jsx(Section, {
    title: "Bead Ratio (W:H)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 960
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      gap: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 961
    },
    __self: this
  }, RATIOS.map(function (r) {
    return __jsx("button", {
      key: r.label,
      onClick: function onClick() {
        return applyRatio(r);
      },
      style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(ratio.label === r.label), {
        flex: 1
      }),
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 963
      },
      __self: this
    }, r.label);
  }))), __jsx(Section, {
    title: "Background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 970
    },
    __self: this
  }, __jsx("div", {
    style: {
      display: 'flex',
      gap: 5,
      marginBottom: 8
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 971
    },
    __self: this
  }, ['transparent', 'solid', 'image'].map(function (t) {
    return __jsx("button", {
      key: t,
      onClick: function onClick() {
        return applyBgType(t);
      },
      style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(bgType === t), {
        flex: 1,
        fontSize: 11,
        padding: '5px 4px'
      }),
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 973
      },
      __self: this
    }, t);
  })), bgType === 'solid' && __jsx("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 978
    },
    __self: this
  }, __jsx("div", {
    style: {
      width: 28,
      height: 28,
      background: bgColor,
      border: "1px solid ".concat(T.border),
      borderRadius: 3,
      flexShrink: 0
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 979
    },
    __self: this
  }), __jsx("input", {
    value: bgHex,
    onChange: function onChange(e) {
      setBgHex(e.target.value);
      if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) applyBgColor(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 980
    },
    __self: this
  })), bgType === 'image' && __jsx("div", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 986
    },
    __self: this
  }, __jsx("input", {
    type: "file",
    accept: "image/jpeg,image/png",
    onChange: function onChange(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();

      reader.onload = function (ev) {
        bgImageRef.current = ev.target.result;
        setBgImage(ev.target.result);
        bgTypeRef.current = 'image';
        setBgType('image');
        drawBackground();
      };

      reader.readAsDataURL(file);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, inp, {
      cursor: 'pointer'
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 987
    },
    __self: this
  }), bgImage && __jsx("button", {
    onClick: function onClick() {
      bgImageRef.current = null;
      setBgImage(null);
      applyBgType('solid');
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(false), {
      marginTop: 6,
      width: '100%',
      fontSize: 11
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1002
    },
    __self: this
  }, "Remove image"))), __jsx(Section, {
    title: "Repeat Pattern",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1010
    },
    __self: this
  }, __jsx(Field, {
    label: "PATTERN TYPE",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1011
    },
    __self: this
  }, __jsx("select", {
    value: patternType,
    onChange: function onChange(e) {
      return setPatternType(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1012
    },
    __self: this
  }, REPEAT_PATTERNS.map(function (p) {
    return __jsx("option", {
      key: p.value,
      value: p.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1013
      },
      __self: this
    }, p.label);
  }))), __jsx("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 6
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1016
    },
    __self: this
  }, __jsx(Field, {
    label: "REPEAT W",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1017
    },
    __self: this
  }, __jsx("input", {
    type: "number",
    min: "1",
    max: "10",
    value: patternRW,
    onChange: function onChange(e) {
      return setPatternRW(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1018
    },
    __self: this
  })), __jsx(Field, {
    label: "REPEAT H",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1021
    },
    __self: this
  }, __jsx("input", {
    type: "number",
    min: "1",
    max: "10",
    value: patternRH,
    onChange: function onChange(e) {
      return setPatternRH(e.target.value);
    },
    style: inp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1022
    },
    __self: this
  }))), __jsx("button", {
    onClick: applyPattern,
    style: {
      background: '#222840',
      color: '#8899cc',
      border: '1px solid #3a3d60',
      padding: '7px 12px',
      cursor: 'pointer',
      borderRadius: 3,
      width: '100%',
      fontSize: 12,
      marginTop: 8
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1026
    },
    __self: this
  }, "\u27F3 Apply Repeat")), __jsx(Section, {
    title: "Grid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1033
    },
    __self: this
  }, __jsx("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      fontSize: 12,
      marginBottom: 5
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1034
    },
    __self: this
  }, __jsx("input", {
    type: "checkbox",
    checked: showGrid,
    onChange: function onChange() {
      var n = !showGridRef.current;
      showGridRef.current = n;
      setShowGrid(n);
      drawGrid();
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1035
    },
    __self: this
  }), "Show grid while drawing"), __jsx("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      fontSize: 12
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1038
    },
    __self: this
  }, __jsx("input", {
    type: "checkbox",
    checked: exportWithGrid,
    onChange: function onChange() {
      exportGridRef.current = !exportGridRef.current;
      setExportWithGrid(exportGridRef.current);
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1039
    },
    __self: this
  }), "Include grid in export")), __jsx(Section, {
    title: "Actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1045
    },
    __self: this
  }, __jsx("button", {
    onClick: function onClick() {
      return setShowClearConfirm(true);
    },
    style: {
      background: T.section,
      color: '#cc7777',
      border: "1px solid ".concat(T.border),
      borderRadius: 3,
      padding: '7px 12px',
      cursor: 'pointer',
      width: '100%',
      fontSize: 12,
      textAlign: 'left'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1046
    },
    __self: this
  }, "\u2715 Clear canvas")), __jsx("div", {
    style: {
      color: T.muted,
      fontSize: 11,
      padding: '6px 2px',
      borderTop: "1px solid ".concat(T.border)
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1052
    },
    __self: this
  }, "Ctrl+Z  undo  \xB7  Ctrl+Y  redo"))), showClearConfirm && __jsx("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.72)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1060
    },
    __self: this
  }, __jsx("div", {
    style: {
      background: T.panel,
      border: "1px solid ".concat(T.border),
      borderRadius: 6,
      padding: 28,
      width: 300,
      boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1064
    },
    __self: this
  }, __jsx("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 18,
      color: T.text,
      marginBottom: 8
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1069
    },
    __self: this
  }, "Clear canvas?"), __jsx("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginBottom: 20
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1072
    },
    __self: this
  }, "All your work will be erased. This cannot be undone."), __jsx("div", {
    style: {
      display: 'flex',
      gap: 10
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1075
    },
    __self: this
  }, __jsx("button", {
    onClick: function onClick() {
      return setShowClearConfirm(false);
    },
    style: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_7__["default"])({}, chipBtn(false), {
      flex: 1,
      padding: '8px'
    }),
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1076
    },
    __self: this
  }, "Cancel"), __jsx("button", {
    onClick: function onClick() {
      saveHistory();
      initCanvas();
      drawBackground();
      drawGrid();
      setShowClearConfirm(false);
    },
    style: {
      flex: 1,
      padding: '8px',
      cursor: 'pointer',
      borderRadius: 3,
      background: '#5a1a1a',
      color: '#ffaaaa',
      border: '1px solid #8a3030',
      fontSize: 12
    },
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1078
    },
    __self: this
  }, "Clear")))));
}

/***/ })

})
//# sourceMappingURL=index.js.9e0a6149d9bf432e1004.hot-update.js.map