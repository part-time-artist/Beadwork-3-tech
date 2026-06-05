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
  var scrollAreaRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var pickerRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])();
  var hueStripRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(); // HSV picker live refs

  var hueRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(0);
  var satRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(0);
  var valRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(0);
  var isPickingRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(false);
  var isPickingHueRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(false); // Live refs (avoid stale closures)

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
  } // ── Color picker ───────────────────────────────────────────────────────────


  function drawPicker() {
    var c = pickerRef.current;
    if (!c) return;
    var ctx = c.getContext('2d');
    var W = c.width,
        H = c.height;

    var _hsvToRgb = hsvToRgb(hueRef.current, 1, 1),
        _hsvToRgb2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hsvToRgb, 3),
        hr = _hsvToRgb2[0],
        hg = _hsvToRgb2[1],
        hb = _hsvToRgb2[2]; // SV gradient


    var gH = ctx.createLinearGradient(0, 0, W, 0);
    gH.addColorStop(0, '#fff');
    gH.addColorStop(1, "rgb(".concat(hr, ",").concat(hg, ",").concat(hb, ")"));
    ctx.fillStyle = gH;
    ctx.fillRect(0, 0, W, H);
    var gV = ctx.createLinearGradient(0, 0, 0, H);
    gV.addColorStop(0, 'rgba(0,0,0,0)');
    gV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gV;
    ctx.fillRect(0, 0, W, H); // cursor

    var cx = satRef.current * W;
    var cy = (1 - valRef.current) * H;
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.strokeStyle = valRef.current > 0.45 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawHueStrip() {
    var c = hueStripRef.current;
    if (!c) return;
    var ctx = c.getContext('2d');
    var W = c.width,
        H = c.height;
    var grad = ctx.createLinearGradient(0, 0, W, 0);

    for (var i = 0; i <= 12; i++) {
      var _hsvToRgb3 = hsvToRgb(i * 30, 1, 1),
          _hsvToRgb4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hsvToRgb3, 3),
          r = _hsvToRgb4[0],
          g = _hsvToRgb4[1],
          b = _hsvToRgb4[2];

      grad.addColorStop(i / 12, "rgb(".concat(r, ",").concat(g, ",").concat(b, ")"));
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H); // cursor

    var cx = Math.round(hueRef.current / 360 * W);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(cx - 2, 0, 4, H);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 3, 0.75, 6, H - 1.5);
  }

  function commitPickerColor() {
    var _hsvToRgb5 = hsvToRgb(hueRef.current, satRef.current, valRef.current),
        _hsvToRgb6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hsvToRgb5, 3),
        r = _hsvToRgb6[0],
        g = _hsvToRgb6[1],
        b = _hsvToRgb6[2];

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

  function handlePickerUp() {
    isPickingRef.current = false;
  }

  function updateSVFromEvent(e) {
    var c = pickerRef.current;
    var rect = c.getBoundingClientRect();
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

  function handleHueUp() {
    isPickingHueRef.current = false;
  }

  function updateHueFromEvent(e) {
    var c = hueStripRef.current;
    var rect = c.getBoundingClientRect();
    hueRef.current = Math.max(0, Math.min(360, (e.clientX - rect.left) / c.width * 360));
    commitPickerColor();
  } // Sync picker when applyColor is called from outside (palette click, hex input)


  function syncPickerToColor(hex) {
    var _hexToHsv = hexToHsv(hex),
        _hexToHsv2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_hexToHsv, 3),
        h = _hexToHsv2[0],
        s = _hexToHsv2[1],
        v = _hexToHsv2[2];

    hueRef.current = h;
    satRef.current = s;
    valRef.current = v;
    drawPicker();
    drawHueStrip();
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
      lineNumber: 837
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 838
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 839
    },
    __self: this
  }, "Beadwork Studio"), __jsx("link", {
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap",
    rel: "stylesheet",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 840
    },
    __self: this
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
    id: "664782124",
    __self: this
  }, "*{box-sizing:border-box;}html,body{margin:0;padding:0;font-family:monospace;}input,select,button{font-family:monospace;}::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:".concat(T.bg, ";}::-webkit-scrollbar-thumb{background:").concat(T.border, ";border-radius:3px;}button:hover{opacity:0.85;}input[type=checkbox]{accent-color:").concat(T.accent, ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlc6XFxNYWRodXJhXFxNb3JpaVxcYmVhZHdvcmsgdG9vbFxcY29kZVxccGFnZXNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXkwQnlCLEFBRWtDLEFBQ0osQUFDd0IsQUFDZCxBQUNvQyxBQUNBLEFBQ3hDLEFBQ3FDLFNBTmhDLENBRVcsR0FHZixNQUwyQixFQUVYLENBSGxCLEFBRW9CLGtCQUVzQixBQUNrQixDQUo5QixDQU1TLGdCQUZzQiIsImZpbGUiOiJXOlxcTWFkaHVyYVxcTW9yaWlcXGJlYWR3b3JrIHRvb2xcXGNvZGVcXHBhZ2VzXFxpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuXG4vLyDilIDilIAgQ29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBSQVRJT1MgPSBbXG4gIHsgbGFiZWw6ICcxOjEnLCB3OiAxLCBoOiAxIH0sXG4gIHsgbGFiZWw6ICcyOjMnLCB3OiAyLCBoOiAzIH0sXG4gIHsgbGFiZWw6ICczOjQnLCB3OiAzLCBoOiA0IH0sXG5dO1xuXG5jb25zdCBVTklUUyA9IFsnbW0nLCAnY20nLCAnaW5jaCcsICdtJ107XG5jb25zdCBUT19DTSA9IHsgbW06IDAuMSwgY206IDEsIGluY2g6IDIuNTQsIG06IDEwMCB9O1xuXG5jb25zdCBERU5TSVRZX1BSRVNFVFMgPSBbXG4gIHsgbGFiZWw6ICdFeHRyYSBmaW5lICg1L2NtKScsIHZhbHVlOiA1IH0sXG4gIHsgbGFiZWw6ICdGaW5lICg0L2NtKScsICAgICAgIHZhbHVlOiA0IH0sXG4gIHsgbGFiZWw6ICdNZWRpdW0gKDMvY20pJywgICAgIHZhbHVlOiAzIH0sXG4gIHsgbGFiZWw6ICdDb2Fyc2UgKDIvY20pJywgICAgIHZhbHVlOiAyIH0sXG5dO1xuXG5jb25zdCBSRVBFQVRfUEFUVEVSTlMgPSBbXG4gIHsgdmFsdWU6ICdncmlkJywgICAgIGxhYmVsOiAnR3JpZCAoc3RyYWlnaHQpJyB9LFxuICB7IHZhbHVlOiAnYnJpY2tfaCcsICBsYWJlbDogJ0JyaWNrIChob3Jpem9udGFsKScgfSxcbiAgeyB2YWx1ZTogJ2hhbGZkcm9wJywgbGFiZWw6ICdIYWxmLWRyb3AgKHZlcnRpY2FsKScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl94JywgbGFiZWw6ICdNaXJyb3IgWCcgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl95JywgbGFiZWw6ICdNaXJyb3IgWScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl80JywgbGFiZWw6ICc0LXdheSBNaXJyb3InIH0sXG5dO1xuXG5jb25zdCBERUZBVUxUX1BBTEVUVEUgPSBbXG4gICcjMDAwMDAwJywnIzExMTExMScsJyMzMzMzMzMnLCcjNTU1NTU1JywnIzc3Nzc3NycsJyM5OTk5OTknLCcjYWFhYWFhJywnI2NjY2NjYycsJyNlNWU1ZTUnLCcjZmZmZmZmJyxcbiAgJyNmZjAwMDAnLCcjY2MwMDAwJywnIzk5MDAwMCcsJyNmZjQ0NDQnLCcjZmY5OTk5JywnI2ZmY2NjYycsXG4gICcjZmY2NjAwJywnI2ZmODgwMCcsJyNmZmFhMDAnLCcjZmZjYzAwJywnI2ZmZGQ4OCcsXG4gICcjZmZmZjAwJywnI2RkZGQwMCcsJyNhYWFhMDAnLCcjZmZmZjk5JyxcbiAgJyMwMGNjMDAnLCcjMDA5OTAwJywnIzAwNjYwMCcsJyMwMDMzMDAnLCcjNDRkZDQ0JywnIzk5ZWU5OScsJyNjY2ZmY2MnLCcjMDBhYTU1JyxcbiAgJyMwMGNjY2MnLCcjMDA5OTk5JywnIzAwNjY2NicsJyNhYWZmZmYnLFxuICAnIzAwMDBmZicsJyMwMDAwY2MnLCcjMDAwMDk5JywnIzAwNjZmZicsJyMwMDk5ZmYnLCcjNDRhYWZmJywnIzk5Y2NmZicsJyNjY2U1ZmYnLFxuICAnIzY2MDBjYycsJyM5OTAwZmYnLCcjY2M0NGZmJywnI2VlY2NmZicsJyMzMzAwNjYnLFxuICAnI2ZmMDBmZicsJyNmZjQ0YmInLCcjZmY4OGRkJywnI2ZmY2NlZScsJyNjYzAwNjYnLCcjZmYwMDY2JyxcbiAgJyM0ZDI2MDAnLCcjN2EzZDAwJywnI2EwNWMwMCcsJyNjOThhM2EnLCcjZGRiODgyJywnI2YwZDBhOCcsJyNmNWU2ZDAnLFxuXTtcblxuY29uc3QgUEFORUxfVyAgICA9IDI5MDtcbmNvbnN0IFJVTEVSX1NaICAgPSAyNDtcbmNvbnN0IFBBRCAgICAgICAgPSAyMDtcbmNvbnN0IE1JTklNQVBfVyAgPSAxODA7XG5jb25zdCBNSU5JTUFQX0ggID0gMTQwO1xuXG4vLyDilIDilIAgVGhlbWUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IFQgPSB7XG4gIGJnOiAgICAgICcjMWExNzE0JyxcbiAgcGFuZWw6ICAgJyMxZTFhMTcnLFxuICBzZWN0aW9uOiAnIzI1MWYxYScsXG4gIGFjY2VudDogICcjYzg5NTZjJyxcbiAgdGV4dDogICAgJyNlOGRkZDQnLFxuICBtdXRlZDogICAnIzhhNzA2MCcsXG4gIGJvcmRlcjogICcjM2EzMDI4JyxcbiAgY2FudmFzOiAgJyMyYTI0MjAnLFxufTtcblxuLy8g4pSA4pSAIFN0eWxlIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGNoaXBCdG4oYWN0aXZlLCBleHRyYSkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/IFQuYWNjZW50IDogVC5zZWN0aW9uLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnIzFhMTcxNCcgOiBULnRleHQsXG4gICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7YWN0aXZlID8gVC5hY2NlbnQgOiBULmJvcmRlcn1gLFxuICAgIHBhZGRpbmc6ICc1cHggMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlclJhZGl1czogMywgZm9udFNpemU6IDEyLFxuICAgIC4uLmV4dHJhLFxuICB9O1xufVxuXG5jb25zdCBpbnAgPSB7XG4gIGJhY2tncm91bmQ6IFQuc2VjdGlvbiwgY29sb3I6IFQudGV4dCxcbiAgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgcGFkZGluZzogJzVweCA4cHgnLCBib3JkZXJSYWRpdXM6IDMsXG4gIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogMTIsIHdpZHRoOiAnMTAwJScsXG59O1xuXG4vLyDilIDilIAgVXRpbGl0eSBmdW5jdGlvbnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICByZXR1cm4gW3BhcnNlSW50KGhleC5zbGljZSgxLDMpLDE2KSwgcGFyc2VJbnQoaGV4LnNsaWNlKDMsNSksMTYpLCBwYXJzZUludChoZXguc2xpY2UoNSw3KSwxNildO1xufVxuXG5mdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gIGNvbnN0IGMgPSB2ICogcywgeCA9IGMgKiAoMSAtIE1hdGguYWJzKChoIC8gNjApICUgMiAtIDEpKSwgbSA9IHYgLSBjO1xuICBsZXQgcj0wLGc9MCxiPTA7XG4gIGlmICAgICAgKGggPCA2MCkgIHsgcj1jO2c9eDtiPTA7IH1cbiAgZWxzZSBpZiAoaCA8IDEyMCkgeyByPXg7Zz1jO2I9MDsgfVxuICBlbHNlIGlmIChoIDwgMTgwKSB7IHI9MDtnPWM7Yj14OyB9XG4gIGVsc2UgaWYgKGggPCAyNDApIHsgcj0wO2c9eDtiPWM7IH1cbiAgZWxzZSBpZiAoaCA8IDMwMCkgeyByPXg7Zz0wO2I9YzsgfVxuICBlbHNlICAgICAgICAgICAgICB7IHI9YztnPTA7Yj14OyB9XG4gIHJldHVybiBbTWF0aC5yb3VuZCgocittKSoyNTUpLCBNYXRoLnJvdW5kKChnK20pKjI1NSksIE1hdGgucm91bmQoKGIrbSkqMjU1KV07XG59XG5cbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgcmV0dXJuICcjJyArIFtyLGcsYl0ubWFwKHYgPT4gdi50b1N0cmluZygxNikucGFkU3RhcnQoMiwnMCcpKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gaGV4VG9Ic3YoaGV4KSB7XG4gIGNvbnN0IFtyLGcsYl0gPSBoZXhUb1JnYihoZXgpO1xuICBjb25zdCByZj1yLzI1NSwgZ2Y9Zy8yNTUsIGJmPWIvMjU1O1xuICBjb25zdCBtYXg9TWF0aC5tYXgocmYsZ2YsYmYpLCBtaW49TWF0aC5taW4ocmYsZ2YsYmYpLCBkPW1heC1taW47XG4gIGNvbnN0IHY9bWF4LCBzPW1heD09PTA/MDpkL21heDtcbiAgbGV0IGg9MDtcbiAgaWYgKGQhPT0wKSB7XG4gICAgaWYgKG1heD09PXJmKSAgICAgIGg9KChnZi1iZikvZCklNjtcbiAgICBlbHNlIGlmIChtYXg9PT1nZikgaD0oYmYtcmYpL2QrMjtcbiAgICBlbHNlICAgICAgICAgICAgICAgaD0ocmYtZ2YpL2QrNDtcbiAgICBoPWgqNjA7IGlmKGg8MCkgaCs9MzYwO1xuICB9XG4gIHJldHVybiBbaCwgcywgdl07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ2FudmFzKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgYy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZShzcmMsIDAsIDApO1xuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gZmxpcEgoc3JjKSB7XG4gIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgYy53aWR0aCA9IHNyYy53aWR0aDsgYy5oZWlnaHQgPSBzcmMuaGVpZ2h0O1xuICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gIGN0eC50cmFuc2xhdGUoc3JjLndpZHRoLCAwKTsgY3R4LnNjYWxlKC0xLCAxKTsgY3R4LmRyYXdJbWFnZShzcmMsIDAsIDApO1xuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gZmxpcFYoc3JjKSB7XG4gIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgYy53aWR0aCA9IHNyYy53aWR0aDsgYy5oZWlnaHQgPSBzcmMuaGVpZ2h0O1xuICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gIGN0eC50cmFuc2xhdGUoMCwgc3JjLmhlaWdodCk7IGN0eC5zY2FsZSgxLCAtMSk7IGN0eC5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbi8vIOKUgOKUgCBTdWItY29tcG9uZW50cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gU2VjdGlvbih7IHRpdGxlLCBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBULnNlY3Rpb24sIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogNCwgcGFkZGluZzogJzEwcHggMTBweCcgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULmFjY2VudCwgZm9udFNpemU6IDEwLCBsZXR0ZXJTcGFjaW5nOiAxLjUsIG1hcmdpbkJvdHRvbTogOCwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9kaXY+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkKHsgbGFiZWwsIGNoaWxkcmVuLCBmbGV4IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IGZsZXggfHwgMSB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFQubXV0ZWQsIGZvbnRTaXplOiA5LCBtYXJnaW5Cb3R0b206IDMsIGxldHRlclNwYWNpbmc6IDEgfX0+e2xhYmVsfTwvZGl2PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyDilIDilIAgTWFpbiBjb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IGJnUmVmICAgICAgICA9IHVzZVJlZigpO1xuICBjb25zdCBkcmF3UmVmICAgICAgPSB1c2VSZWYoKTtcbiAgY29uc3QgZ3JpZFJlZiAgICAgID0gdXNlUmVmKCk7XG4gIGNvbnN0IHJ1bGVyVG9wUmVmICA9IHVzZVJlZigpO1xuICBjb25zdCBydWxlckxlZnRSZWYgPSB1c2VSZWYoKTtcbiAgY29uc3QgbWluaW1hcFJlZiAgICA9IHVzZVJlZigpO1xuICBjb25zdCBzY3JvbGxBcmVhUmVmID0gdXNlUmVmKCk7XG4gIGNvbnN0IHBpY2tlclJlZiAgICAgPSB1c2VSZWYoKTtcbiAgY29uc3QgaHVlU3RyaXBSZWYgICA9IHVzZVJlZigpO1xuXG4gIC8vIEhTViBwaWNrZXIgbGl2ZSByZWZzXG4gIGNvbnN0IGh1ZVJlZiAgICAgICAgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IHNhdFJlZiAgICAgICAgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IHZhbFJlZiAgICAgICAgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IGlzUGlja2luZ1JlZiAgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBpc1BpY2tpbmdIdWVSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIC8vIExpdmUgcmVmcyAoYXZvaWQgc3RhbGUgY2xvc3VyZXMpXG4gIGNvbnN0IGlzRHJhd2luZyAgICAgID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaXNQYW5uaW5nICAgICAgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwYW5TdGFydCAgICAgICA9IHVzZVJlZih7IHg6IDAsIHk6IDAsIHNjcm9sbExlZnQ6IDAsIHNjcm9sbFRvcDogMCB9KTtcbiAgY29uc3QgaGlzdG9yeSAgICAgICAgPSB1c2VSZWYoW10pO1xuICBjb25zdCBmdXR1cmUgICAgICAgICA9IHVzZVJlZihbXSk7XG4gIGNvbnN0IGJhc2VTaXplUmVmICAgID0gdXNlUmVmKDEyKTtcbiAgY29uc3QgcmF0aW9SZWYgICAgICAgPSB1c2VSZWYoUkFUSU9TWzBdKTtcbiAgY29uc3QgY29sb3JSZWYgICAgICAgPSB1c2VSZWYoJyMwMDAwMDAnKTtcbiAgY29uc3QgaXNFcmFzZXJSZWYgICAgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBzaG93R3JpZFJlZiAgICA9IHVzZVJlZih0cnVlKTtcbiAgY29uc3QgZXhwb3J0R3JpZFJlZiAgPSB1c2VSZWYodHJ1ZSk7XG4gIGNvbnN0IGJlYWRzUmVmICAgICAgID0gdXNlUmVmKHsgY29sczogMzAsIHJvd3M6IDQ1IH0pO1xuICBjb25zdCBkZW5zaXR5UmVmICAgICA9IHVzZVJlZigzKTtcbiAgY29uc3QgdW5pdFJlZiAgICAgICAgPSB1c2VSZWYoJ2NtJyk7XG4gIGNvbnN0IGJnVHlwZVJlZiAgICAgID0gdXNlUmVmKCdzb2xpZCcpO1xuICBjb25zdCBiZ0NvbG9yUmVmICAgICA9IHVzZVJlZignI2ZmZmZmZicpO1xuICBjb25zdCBiZ0ltYWdlUmVmICAgICA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgcGVuZGluZ1BhdHRlcm4gPSB1c2VSZWYobnVsbCk7XG5cbiAgLy8gVUkgc3RhdGVcbiAgY29uc3QgW3JhdGlvLCBzZXRSYXRpb10gICAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZShSQVRJT1NbMF0pO1xuICBjb25zdCBbY29sb3IsIHNldENvbG9yXSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKCcjMDAwMDAwJyk7XG4gIGNvbnN0IFtoZXhJbnB1dCwgc2V0SGV4SW5wdXRdICAgICAgICAgICAgID0gdXNlU3RhdGUoJyMwMDAwMDAnKTtcbiAgY29uc3QgW2lzRXJhc2VyLCBzZXRJc0VyYXNlcl0gICAgICAgICAgICAgPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93R3JpZCwgc2V0U2hvd0dyaWRdICAgICAgICAgICAgID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtleHBvcnRXaXRoR3JpZCwgc2V0RXhwb3J0V2l0aEdyaWRdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtjYW52YXNTaXplLCBzZXRDYW52YXNTaXplXSAgICAgICAgID0gdXNlU3RhdGUoeyB3OiAwLCBoOiAwIH0pO1xuICBjb25zdCBbc2hvd0NsZWFyQ29uZmlybSwgc2V0U2hvd0NsZWFyQ29uZmlybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtiZ1R5cGUsIHNldEJnVHlwZV0gICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoJ3NvbGlkJyk7XG4gIGNvbnN0IFtiZ0NvbG9yLCBzZXRCZ0NvbG9yXSAgICAgICAgICAgICAgID0gdXNlU3RhdGUoJyNmZmZmZmYnKTtcbiAgY29uc3QgW2JnSGV4LCBzZXRCZ0hleF0gICAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnI2ZmZmZmZicpO1xuICBjb25zdCBbYmdJbWFnZSwgc2V0QmdJbWFnZV0gICAgICAgICAgICAgICA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIC8vIFNldHVwXG4gIGNvbnN0IFtzZXR1cFcsIHNldFNldHVwV10gICA9IHVzZVN0YXRlKCcxMCcpO1xuICBjb25zdCBbc2V0dXBILCBzZXRTZXR1cEhdICAgPSB1c2VTdGF0ZSgnMTUnKTtcbiAgY29uc3QgW3VuaXQsIHNldFVuaXRdICAgICAgID0gdXNlU3RhdGUoJ2NtJyk7XG4gIGNvbnN0IFtkZW5zaXR5LCBzZXREZW5zaXR5XSA9IHVzZVN0YXRlKDMpO1xuXG4gIC8vIFBhdHRlcm5cbiAgY29uc3QgW3BhdHRlcm5UeXBlLCBzZXRQYXR0ZXJuVHlwZV0gICA9IHVzZVN0YXRlKCdncmlkJyk7XG4gIGNvbnN0IFtwYXR0ZXJuUlcsIHNldFBhdHRlcm5SV10gICAgICAgPSB1c2VTdGF0ZSgyKTtcbiAgY29uc3QgW3BhdHRlcm5SSCwgc2V0UGF0dGVyblJIXSAgICAgICA9IHVzZVN0YXRlKDIpO1xuXG4gIC8vIFBhbGV0dGVzXG4gIGNvbnN0IFtwYWxldHRlcywgc2V0UGFsZXR0ZXNdICAgICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbYWN0aXZlUGFsZXR0ZUlkLCBzZXRBY3RpdmVQYWxldHRlSWRdICAgICA9IHVzZVN0YXRlKCdkZWZhdWx0Jyk7XG4gIGNvbnN0IFtzaG93TmV3UGFsZXR0ZUlucHV0LCBzZXRTaG93TmV3UGFsZXR0ZUlucHV0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld1BhbGV0dGVOYW1lLCBzZXROZXdQYWxldHRlTmFtZV0gICAgICAgICA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyDilIDilIAgR2VvbWV0cnkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gZ2V0QmVhZCgpIHtcbiAgICBjb25zdCBicyA9IGJhc2VTaXplUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgciAgPSByYXRpb1JlZi5jdXJyZW50O1xuICAgIHJldHVybiB7IHc6IGJzLCBoOiBNYXRoLnJvdW5kKGJzICogci5oIC8gci53KSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gYmVhZHNGcm9tU2V0dXAodywgaCwgdSwgZCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xzOiBNYXRoLm1heCgyLCBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodykgKiBUT19DTVt1XSAqIGQpKSxcbiAgICAgIHJvd3M6IE1hdGgubWF4KDIsIE1hdGgucm91bmQocGFyc2VGbG9hdChoKSAqIFRPX0NNW3VdICogZCkpLFxuICAgIH07XG4gIH1cblxuICAvLyDilIDilIAgQmFja2dyb3VuZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBkcmF3QmFja2dyb3VuZCgpIHtcbiAgICBjb25zdCBjID0gYmdSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgaWYgKGJnVHlwZVJlZi5jdXJyZW50ID09PSAndHJhbnNwYXJlbnQnKSByZXR1cm47XG4gICAgaWYgKGJnVHlwZVJlZi5jdXJyZW50ID09PSAnc29saWQnKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gYmdDb2xvclJlZi5jdXJyZW50O1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKGJnVHlwZVJlZi5jdXJyZW50ID09PSAnaW1hZ2UnICYmIGJnSW1hZ2VSZWYuY3VycmVudCkge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4gY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICAgIGltZy5zcmMgPSBiZ0ltYWdlUmVmLmN1cnJlbnQ7XG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIERyYXcgYmVhZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBwYWludEJlYWQoY3R4LCBjb2wsIHJvdywgZmlsbENvbG9yKSB7XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgeCA9IGNvbCAqIHcsIHkgPSByb3cgKiBoO1xuICAgIGN0eC5jbGVhclJlY3QoeCwgeSwgdywgaCk7XG4gICAgaWYgKGZpbGxDb2xvciA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5lbGxpcHNlKHggKyB3LzIsIHkgKyBoLzIsIHcvMiAtIHcqMC4wOCwgaC8yIC0gaCowLjA4LCAwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBHcmlkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRyYXdHcmlkKCkge1xuICAgIGNvbnN0IGMgPSBncmlkUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIGlmICghc2hvd0dyaWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgdywgaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgxMzAsMTEwLDkwLDAuNCknO1xuICAgIGN0eC5saW5lV2lkdGggPSAwLjU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gY29sczsgaSsrKSB7IGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyhpKncsMCk7IGN0eC5saW5lVG8oaSp3LHJvd3MqaCk7IGN0eC5zdHJva2UoKTsgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHJvd3M7IGkrKykgeyBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oMCxpKmgpOyBjdHgubGluZVRvKGNvbHMqdyxpKmgpOyBjdHguc3Ryb2tlKCk7IH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBSdWxlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gZHJhd1J1bGVycygpIHtcbiAgICBjb25zdCB7IHc6IGJ3LCBoOiBiaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjb25zdCBkID0gZGVuc2l0eVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHUgPSB1bml0UmVmLmN1cnJlbnQ7XG5cbiAgICAvLyBIb3cgbWFueSBiZWFkcyBwZXIgMSB1bml0IChjbSwgaW5jaCwgZXRjLilcbiAgICBjb25zdCBiZWFkc1BlclVuaXQgPSBkICogVE9fQ01bdV07IC8vIGJlYWRzIHBlciB1bml0XG4gICAgLy8gV2Ugd2FudCB0byBsYWJlbCBldmVyeSB3aG9sZSB1bml0IGludGVydmFsXG4gICAgLy8gRmluZCB0aWNrIHNwYWNpbmcgaW4gYmVhZHM6IDEgdW5pdCA9IGJlYWRzUGVyVW5pdCBiZWFkc1xuICAgIC8vIElmIGJlYWRzUGVyVW5pdCA8IDEsIGxhYmVsIGV2ZXJ5IDEvYmVhZHNQZXJVbml0IHVuaXRzXG4gICAgY29uc3QgdGlja0V2ZXJ5ID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChiZWFkc1BlclVuaXQpKTsgLy8gYmVhZHMgYmV0d2VlbiBlYWNoIHRpY2tcblxuICAgIGZ1bmN0aW9uIHVuaXRMYWJlbChiZWFkSWR4KSB7XG4gICAgICBjb25zdCB2YWwgPSBiZWFkSWR4IC8gYmVhZHNQZXJVbml0O1xuICAgICAgcmV0dXJuIHZhbCAlIDEgPT09IDAgPyBgJHtNYXRoLnJvdW5kKHZhbCl9JHt1fWAgOiBgJHt2YWwudG9GaXhlZCgxKX0ke3V9YDtcbiAgICB9XG5cbiAgICAvLyBUT1AgcnVsZXJcbiAgICBjb25zdCB0b3AgPSBydWxlclRvcFJlZi5jdXJyZW50O1xuICAgIGlmICh0b3ApIHtcbiAgICAgIHRvcC53aWR0aCA9IGNvbHMgKiBidztcbiAgICAgIHRvcC5oZWlnaHQgPSBSVUxFUl9TWjtcbiAgICAgIGNvbnN0IGN0eCA9IHRvcC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFQuYmc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdG9wLndpZHRoLCB0b3AuaGVpZ2h0KTtcbiAgICAgIC8vIGJvdHRvbSBib3JkZXIgbGluZVxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gVC5ib3JkZXI7IGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKDAsIFJVTEVSX1NaIC0gMSk7IGN0eC5saW5lVG8odG9wLndpZHRoLCBSVUxFUl9TWiAtIDEpOyBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5mb250ID0gJzlweCBtb25vc3BhY2UnO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gY29sczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHggPSBpICogYnc7XG4gICAgICAgIGNvbnN0IGlzTWFqb3IgPSAoaSAlIHRpY2tFdmVyeSA9PT0gMCk7XG4gICAgICAgIGNvbnN0IGlzTWlkICAgPSAoaSAlIE1hdGgubWF4KDEsIE1hdGgucm91bmQodGlja0V2ZXJ5IC8gMikpID09PSAwKTtcbiAgICAgICAgY29uc3QgdEggPSBpc01ham9yID8gMTAgOiBpc01pZCA/IDYgOiAzO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc01ham9yID8gVC5tdXRlZCA6IFQuYm9yZGVyO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gaXNNYWpvciA/IDEgOiAwLjU7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyh4ICsgMC41LCBSVUxFUl9TWiAtIDEpOyBjdHgubGluZVRvKHggKyAwLjUsIFJVTEVSX1NaIC0gMSAtIHRIKTsgY3R4LnN0cm9rZSgpO1xuICAgICAgICBpZiAoaXNNYWpvciAmJiBpID4gMCkge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBULm11dGVkO1xuICAgICAgICAgIGN0eC5maWxsVGV4dCh1bml0TGFiZWwoaSksIHggKyAyLCBSVUxFUl9TWiAtIDEyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExFRlQgcnVsZXJcbiAgICBjb25zdCBsZWZ0ID0gcnVsZXJMZWZ0UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGxlZnQud2lkdGggPSBSVUxFUl9TWjtcbiAgICAgIGxlZnQuaGVpZ2h0ID0gcm93cyAqIGJoO1xuICAgICAgY29uc3QgY3R4ID0gbGVmdC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFQuYmc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgbGVmdC53aWR0aCwgbGVmdC5oZWlnaHQpO1xuICAgICAgLy8gcmlnaHQgYm9yZGVyIGxpbmVcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFQuYm9yZGVyOyBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyhSVUxFUl9TWiAtIDEsIDApOyBjdHgubGluZVRvKFJVTEVSX1NaIC0gMSwgbGVmdC5oZWlnaHQpOyBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5mb250ID0gJzlweCBtb25vc3BhY2UnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSByb3dzOyBpKyspIHtcbiAgICAgICAgY29uc3QgeSA9IGkgKiBiaDtcbiAgICAgICAgY29uc3QgaXNNYWpvciA9IChpICUgdGlja0V2ZXJ5ID09PSAwKTtcbiAgICAgICAgY29uc3QgaXNNaWQgICA9IChpICUgTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCh0aWNrRXZlcnkgLyAyKSkgPT09IDApO1xuICAgICAgICBjb25zdCB0VyA9IGlzTWFqb3IgPyAxMCA6IGlzTWlkID8gNiA6IDM7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzTWFqb3IgPyBULm11dGVkIDogVC5ib3JkZXI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBpc01ham9yID8gMSA6IDAuNTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKFJVTEVSX1NaIC0gMSwgeSArIDAuNSk7IGN0eC5saW5lVG8oUlVMRVJfU1ogLSAxIC0gdFcsIHkgKyAwLjUpOyBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGlmIChpc01ham9yICYmIGkgPiAwKSB7XG4gICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gVC5tdXRlZDtcbiAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgY3R4LnRyYW5zbGF0ZShSVUxFUl9TWiAtIDEyLCB5IC0gMik7XG4gICAgICAgICAgY3R4LnJvdGF0ZSgtTWF0aC5QSSAvIDIpO1xuICAgICAgICAgIGN0eC5maWxsVGV4dCh1bml0TGFiZWwoaSksIDAsIDApO1xuICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ29sb3IgcGlja2VyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRyYXdQaWNrZXIoKSB7XG4gICAgY29uc3QgYyA9IHBpY2tlclJlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb25zdCBXID0gYy53aWR0aCwgSCA9IGMuaGVpZ2h0O1xuICAgIGNvbnN0IFtociwgaGcsIGhiXSA9IGhzdlRvUmdiKGh1ZVJlZi5jdXJyZW50LCAxLCAxKTtcbiAgICAvLyBTViBncmFkaWVudFxuICAgIGNvbnN0IGdIID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIFcsIDApO1xuICAgIGdILmFkZENvbG9yU3RvcCgwLCAnI2ZmZicpO1xuICAgIGdILmFkZENvbG9yU3RvcCgxLCBgcmdiKCR7aHJ9LCR7aGd9LCR7aGJ9KWApO1xuICAgIGN0eC5maWxsU3R5bGUgPSBnSDsgY3R4LmZpbGxSZWN0KDAsIDAsIFcsIEgpO1xuICAgIGNvbnN0IGdWID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIEgpO1xuICAgIGdWLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xuICAgIGdWLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwxKScpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBnVjsgY3R4LmZpbGxSZWN0KDAsIDAsIFcsIEgpO1xuICAgIC8vIGN1cnNvclxuICAgIGNvbnN0IGN4ID0gc2F0UmVmLmN1cnJlbnQgKiBXO1xuICAgIGNvbnN0IGN5ID0gKDEgLSB2YWxSZWYuY3VycmVudCkgKiBIO1xuICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhjeCwgY3ksIDcsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdmFsUmVmLmN1cnJlbnQgPiAwLjQ1ID8gJ3JnYmEoMCwwLDAsMC43KScgOiAncmdiYSgyNTUsMjU1LDI1NSwwLjgpJztcbiAgICBjdHgubGluZVdpZHRoID0gMjsgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYyhjeCwgY3ksIDUsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZmYnOyBjdHgubGluZVdpZHRoID0gMTsgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0h1ZVN0cmlwKCkge1xuICAgIGNvbnN0IGMgPSBodWVTdHJpcFJlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb25zdCBXID0gYy53aWR0aCwgSCA9IGMuaGVpZ2h0O1xuICAgIGNvbnN0IGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgVywgMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTI7IGkrKykge1xuICAgICAgY29uc3QgW3IsZyxiXSA9IGhzdlRvUmdiKGkqMzAsIDEsIDEpO1xuICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoaS8xMiwgYHJnYigke3J9LCR7Z30sJHtifSlgKTtcbiAgICB9XG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7IGN0eC5maWxsUmVjdCgwLCAwLCBXLCBIKTtcbiAgICAvLyBjdXJzb3JcbiAgICBjb25zdCBjeCA9IE1hdGgucm91bmQoKGh1ZVJlZi5jdXJyZW50IC8gMzYwKSAqIFcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjQpJzsgY3R4LmZpbGxSZWN0KGN4LTIsIDAsIDQsIEgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmJzsgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICBjdHguc3Ryb2tlUmVjdChjeC0zLCAwLjc1LCA2LCBILTEuNSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21taXRQaWNrZXJDb2xvcigpIHtcbiAgICBjb25zdCBbcixnLGJdID0gaHN2VG9SZ2IoaHVlUmVmLmN1cnJlbnQsIHNhdFJlZi5jdXJyZW50LCB2YWxSZWYuY3VycmVudCk7XG4gICAgYXBwbHlDb2xvcihyZ2JUb0hleChyLCBnLCBiKSk7XG4gICAgZHJhd1BpY2tlcigpO1xuICAgIGRyYXdIdWVTdHJpcCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUGlja2VyRG93bihlKSB7XG4gICAgaXNQaWNraW5nUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIHVwZGF0ZVNWRnJvbUV2ZW50KGUpO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVBpY2tlck1vdmUoZSkge1xuICAgIGlmICghaXNQaWNraW5nUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICB1cGRhdGVTVkZyb21FdmVudChlKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVQaWNrZXJVcCgpIHsgaXNQaWNraW5nUmVmLmN1cnJlbnQgPSBmYWxzZTsgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNWRnJvbUV2ZW50KGUpIHtcbiAgICBjb25zdCBjID0gcGlja2VyUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcmVjdCA9IGMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgc2F0UmVmLmN1cnJlbnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoZS5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIGMud2lkdGgpKTtcbiAgICB2YWxSZWYuY3VycmVudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIDEgLSAoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gYy5oZWlnaHQpKTtcbiAgICBjb21taXRQaWNrZXJDb2xvcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSHVlRG93bihlKSB7XG4gICAgaXNQaWNraW5nSHVlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIHVwZGF0ZUh1ZUZyb21FdmVudChlKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVIdWVNb3ZlKGUpIHtcbiAgICBpZiAoIWlzUGlja2luZ0h1ZVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgdXBkYXRlSHVlRnJvbUV2ZW50KGUpO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUh1ZVVwKCkgeyBpc1BpY2tpbmdIdWVSZWYuY3VycmVudCA9IGZhbHNlOyB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSHVlRnJvbUV2ZW50KGUpIHtcbiAgICBjb25zdCBjID0gaHVlU3RyaXBSZWYuY3VycmVudDtcbiAgICBjb25zdCByZWN0ID0gYy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBodWVSZWYuY3VycmVudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDM2MCwgKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gYy53aWR0aCkgKiAzNjApKTtcbiAgICBjb21taXRQaWNrZXJDb2xvcigpO1xuICB9XG5cbiAgLy8gU3luYyBwaWNrZXIgd2hlbiBhcHBseUNvbG9yIGlzIGNhbGxlZCBmcm9tIG91dHNpZGUgKHBhbGV0dGUgY2xpY2ssIGhleCBpbnB1dClcbiAgZnVuY3Rpb24gc3luY1BpY2tlclRvQ29sb3IoaGV4KSB7XG4gICAgY29uc3QgW2gsIHMsIHZdID0gaGV4VG9Ic3YoaGV4KTtcbiAgICBodWVSZWYuY3VycmVudCA9IGg7IHNhdFJlZi5jdXJyZW50ID0gczsgdmFsUmVmLmN1cnJlbnQgPSB2O1xuICAgIGRyYXdQaWNrZXIoKTsgZHJhd0h1ZVN0cmlwKCk7XG4gIH1cblxuICAvLyDilIDilIAgTWluaS1tYXAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gdXBkYXRlTWluaW1hcCgpIHtcbiAgICBjb25zdCBtbSA9IG1pbmltYXBSZWYuY3VycmVudDtcbiAgICBpZiAoIW1tIHx8ICFkcmF3UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBtbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgTUlOSU1BUF9XLCBNSU5JTUFQX0gpO1xuICAgIC8vIGRhcmsgYmFja2dyb3VuZFxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIE1JTklNQVBfVywgTUlOSU1BUF9IKTtcbiAgICAvLyBzY2FsZSB0byBmaXRcbiAgICBjb25zdCBzY2FsZVggPSBNSU5JTUFQX1cgLyBkcmF3UmVmLmN1cnJlbnQud2lkdGg7XG4gICAgY29uc3Qgc2NhbGVZID0gTUlOSU1BUF9IIC8gZHJhd1JlZi5jdXJyZW50LmhlaWdodDtcbiAgICBjb25zdCBzY2FsZSAgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG4gICAgY29uc3Qgb2ZmWCAgID0gKE1JTklNQVBfVyAtIGRyYXdSZWYuY3VycmVudC53aWR0aCAgKiBzY2FsZSkgLyAyO1xuICAgIGNvbnN0IG9mZlkgICA9IChNSU5JTUFQX0ggLSBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0ICogc2NhbGUpIC8gMjtcbiAgICAvLyBkcmF3IGJnICsgYmVhZHNcbiAgICBpZiAoYmdSZWYuY3VycmVudCkgY3R4LmRyYXdJbWFnZShiZ1JlZi5jdXJyZW50LCAgIG9mZlgsIG9mZlksIGRyYXdSZWYuY3VycmVudC53aWR0aCAqIHNjYWxlLCBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0ICogc2NhbGUpO1xuICAgIGN0eC5kcmF3SW1hZ2UoZHJhd1JlZi5jdXJyZW50LCBvZmZYLCBvZmZZLCBkcmF3UmVmLmN1cnJlbnQud2lkdGggKiBzY2FsZSwgZHJhd1JlZi5jdXJyZW50LmhlaWdodCAqIHNjYWxlKTtcbiAgICAvLyB2aWV3cG9ydCByZWN0XG4gICAgaWYgKHNjcm9sbEFyZWFSZWYuY3VycmVudCkge1xuICAgICAgY29uc3Qgc2EgPSBzY3JvbGxBcmVhUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCB2eCA9IChzYS5zY3JvbGxMZWZ0IC0gUEFEKSAqIHNjYWxlICsgb2ZmWDtcbiAgICAgIGNvbnN0IHZ5ID0gKHNhLnNjcm9sbFRvcCAgLSBQQUQpICogc2NhbGUgKyBvZmZZO1xuICAgICAgY29uc3QgdncgPSBzYS5jbGllbnRXaWR0aCAgKiBzY2FsZTtcbiAgICAgIGNvbnN0IHZoID0gc2EuY2xpZW50SGVpZ2h0ICogc2NhbGU7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBULmFjY2VudDtcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxLjU7XG4gICAgICBjdHguc3Ryb2tlUmVjdCh2eCwgdnksIHZ3LCB2aCk7XG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIENhbnZhcyBpbml0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBjLmdldENvbnRleHQoJzJkJykuY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBoaXN0b3J5LmN1cnJlbnQgPSBbXTtcbiAgICBmdXR1cmUuY3VycmVudCAgPSBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcygpIHtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzRnJvbVNldHVwKHNldHVwVywgc2V0dXBILCB1bml0LCBkZW5zaXR5KTtcbiAgICBiZWFkc1JlZi5jdXJyZW50ICA9IHsgY29scywgcm93cyB9O1xuICAgIGRlbnNpdHlSZWYuY3VycmVudCA9IGRlbnNpdHk7XG4gICAgdW5pdFJlZi5jdXJyZW50ICAgID0gdW5pdDtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBzZXRDYW52YXNTaXplKHsgdzogY29scyAqIHcsIGg6IHJvd3MgKiBoIH0pO1xuICB9XG5cbiAgLy8g4pSA4pSAIEhpc3Rvcnkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gc2F2ZUhpc3RvcnkoKSB7XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBoaXN0b3J5LmN1cnJlbnQucHVzaChjLmdldENvbnRleHQoJzJkJykuZ2V0SW1hZ2VEYXRhKDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KSk7XG4gICAgZnV0dXJlLmN1cnJlbnQgPSBbXTtcbiAgICBpZiAoaGlzdG9yeS5jdXJyZW50Lmxlbmd0aCA+IDUwKSBoaXN0b3J5LmN1cnJlbnQuc2hpZnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZG8oKSB7XG4gICAgaWYgKCFoaXN0b3J5LmN1cnJlbnQubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudCwgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGZ1dHVyZS5jdXJyZW50LnB1c2goY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCkpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIGN0eC5wdXRJbWFnZURhdGEoaGlzdG9yeS5jdXJyZW50LnBvcCgpLCAwLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZG8oKSB7XG4gICAgaWYgKCFmdXR1cmUuY3VycmVudC5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBjID0gZHJhd1JlZi5jdXJyZW50LCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgaGlzdG9yeS5jdXJyZW50LnB1c2goY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCkpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIGN0eC5wdXRJbWFnZURhdGEoZnV0dXJlLmN1cnJlbnQucG9wKCksIDAsIDApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFNhdmUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gc2F2ZUNhbnZhcygpIHtcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGVtcC53aWR0aCAgPSBkcmF3UmVmLmN1cnJlbnQud2lkdGg7XG4gICAgdGVtcC5oZWlnaHQgPSBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0O1xuICAgIGNvbnN0IGN0eCA9IHRlbXAuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZHJhd0ltYWdlKGJnUmVmLmN1cnJlbnQsIDAsIDApO1xuICAgIGN0eC5kcmF3SW1hZ2UoZHJhd1JlZi5jdXJyZW50LCAwLCAwKTtcbiAgICBpZiAoZXhwb3J0R3JpZFJlZi5jdXJyZW50KSBjdHguZHJhd0ltYWdlKGdyaWRSZWYuY3VycmVudCwgMCwgMCk7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB0ZW1wLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgYS5kb3dubG9hZCA9ICdiZWFkd29yay5wbmcnO1xuICAgIGEuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIHZpZXc6IHdpbmRvdyB9KSk7XG4gIH1cblxuICAvLyDilIDilIAgTW91c2UgZHJhd2luZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBjZWxsRnJvbUV2ZW50KGUpIHtcbiAgICBjb25zdCByZWN0ID0gZHJhd1JlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgdywgaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgLyB3KTtcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKChlLmNsaWVudFkgLSByZWN0LnRvcCkgIC8gaCk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGlmIChjb2wgPCAwIHx8IHJvdyA8IDAgfHwgY29sID49IGNvbHMgfHwgcm93ID49IHJvd3MpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7IGNvbCwgcm93IH07XG4gIH1cblxuICBmdW5jdGlvbiBkb1BhaW50KGUpIHtcbiAgICBjb25zdCBjZWxsID0gY2VsbEZyb21FdmVudChlKTtcbiAgICBpZiAoIWNlbGwpIHJldHVybjtcbiAgICBwYWludEJlYWQoZHJhd1JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyksIGNlbGwuY29sLCBjZWxsLnJvdywgaXNFcmFzZXJSZWYuY3VycmVudCA/IG51bGwgOiBjb2xvclJlZi5jdXJyZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihlKSB7XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgc2F2ZUhpc3RvcnkoKTsgaXNEcmF3aW5nLmN1cnJlbnQgPSB0cnVlOyBkb1BhaW50KGUpO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZShlKSB7XG4gICAgaWYgKGlzRHJhd2luZy5jdXJyZW50KSB7IGRvUGFpbnQoZSk7IHVwZGF0ZU1pbmltYXAoKTsgfVxuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlVXAoKSB7IGlzRHJhd2luZy5jdXJyZW50ID0gZmFsc2U7IH1cblxuICAvLyBSaWdodC1jbGljayBkcmFnIHRvIHBhbiB0aGUgc2Nyb2xsIGFyZWFcbiAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQXJlYU1vdXNlRG93bihlKSB7XG4gICAgaWYgKGUuYnV0dG9uICE9PSAyKSByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlzUGFubmluZy5jdXJyZW50ID0gdHJ1ZTtcbiAgICBwYW5TdGFydC5jdXJyZW50ID0ge1xuICAgICAgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFksXG4gICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxBcmVhUmVmLmN1cnJlbnQuc2Nyb2xsTGVmdCxcbiAgICAgIHNjcm9sbFRvcDogIHNjcm9sbEFyZWFSZWYuY3VycmVudC5zY3JvbGxUb3AsXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBcmVhTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIWlzUGFubmluZy5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZHggPSBlLmNsaWVudFggLSBwYW5TdGFydC5jdXJyZW50Lng7XG4gICAgY29uc3QgZHkgPSBlLmNsaWVudFkgLSBwYW5TdGFydC5jdXJyZW50Lnk7XG4gICAgc2Nyb2xsQXJlYVJlZi5jdXJyZW50LnNjcm9sbExlZnQgPSBwYW5TdGFydC5jdXJyZW50LnNjcm9sbExlZnQgLSBkeDtcbiAgICBzY3JvbGxBcmVhUmVmLmN1cnJlbnQuc2Nyb2xsVG9wICA9IHBhblN0YXJ0LmN1cnJlbnQuc2Nyb2xsVG9wICAtIGR5O1xuICAgIHVwZGF0ZU1pbmltYXAoKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBcmVhTW91c2VVcChlKSB7XG4gICAgaWYgKGUuYnV0dG9uID09PSAyKSBpc1Bhbm5pbmcuY3VycmVudCA9IGZhbHNlO1xuICB9XG5cbiAgLy8g4pSA4pSAIEZsb29kIGZpbGwgKGRyYWcgJiBkcm9wKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBjZWxsUGl4ZWwoY3R4LCBjb2wsIHJvdykge1xuICAgIGNvbnN0IHsgdywgaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGNvbnN0IGQgPSBjdHguZ2V0SW1hZ2VEYXRhKE1hdGguZmxvb3IoY29sKncgKyB3LzIpLCBNYXRoLmZsb29yKHJvdypoICsgaC8yKSwgMSwgMSkuZGF0YTtcbiAgICByZXR1cm4gW2RbMF0sIGRbMV0sIGRbMl0sIGRbM11dO1xuICB9XG5cbiAgZnVuY3Rpb24gcGl4ZWxNYXRjaChhLCBiLCB0aHIgPSAxNSkge1xuICAgIGNvbnN0IGFUID0gYVszXSA8IDMwLCBiVCA9IGJbM10gPCAzMDtcbiAgICBpZiAoYVQgJiYgYlQpIHJldHVybiB0cnVlO1xuICAgIGlmIChhVCAhPT0gYlQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gTWF0aC5hYnMoYVswXS1iWzBdKSA8IHRociAmJiBNYXRoLmFicyhhWzFdLWJbMV0pIDwgdGhyICYmIE1hdGguYWJzKGFbMl0tYlsyXSkgPCB0aHI7XG4gIH1cblxuICBmdW5jdGlvbiBmbG9vZEZpbGwoc3RhcnRDb2wsIHN0YXJ0Um93LCBmaWxsQ29sb3IpIHtcbiAgICBjb25zdCBjID0gZHJhd1JlZi5jdXJyZW50LCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHRhcmdldCA9IGNlbGxQaXhlbChjdHgsIHN0YXJ0Q29sLCBzdGFydFJvdyk7XG4gICAgY29uc3QgW2ZyLGZnLGZiXSA9IGhleFRvUmdiKGZpbGxDb2xvcik7XG4gICAgaWYgKHBpeGVsTWF0Y2godGFyZ2V0LCBbZnIsZmcsZmIsMjU1XSkpIHJldHVybjtcbiAgICBzYXZlSGlzdG9yeSgpO1xuICAgIGNvbnN0IHF1ZXVlICAgPSBbW3N0YXJ0Q29sLCBzdGFydFJvd11dO1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgW2NvbCwgcm93XSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICBjb25zdCBrZXkgPSBgJHtjb2x9LCR7cm93fWA7XG4gICAgICBpZiAodmlzaXRlZC5oYXMoa2V5KSB8fCBjb2w8MCB8fCByb3c8MCB8fCBjb2w+PWNvbHMgfHwgcm93Pj1yb3dzKSBjb250aW51ZTtcbiAgICAgIHZpc2l0ZWQuYWRkKGtleSk7XG4gICAgICBpZiAoIXBpeGVsTWF0Y2goY2VsbFBpeGVsKGN0eCwgY29sLCByb3cpLCB0YXJnZXQpKSBjb250aW51ZTtcbiAgICAgIHBhaW50QmVhZChjdHgsIGNvbCwgcm93LCBmaWxsQ29sb3IpO1xuICAgICAgcXVldWUucHVzaChbY29sKzEscm93XSxbY29sLTEscm93XSxbY29sLHJvdysxXSxbY29sLHJvdy0xXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZjID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnY29sb3InKTtcbiAgICBpZiAoIWZjKSByZXR1cm47XG4gICAgY29uc3QgY2VsbCA9IGNlbGxGcm9tRXZlbnQoZSk7XG4gICAgaWYgKGNlbGwpIGZsb29kRmlsbChjZWxsLmNvbCwgY2VsbC5yb3csIGZjKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBLZXlib2FyZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBjb25zdCBjdHJsID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgICBpZiAoY3RybCAmJiBlLmtleSA9PT0gJ3onKSB7IGUucHJldmVudERlZmF1bHQoKTsgdW5kbygpOyB9XG4gICAgaWYgKGN0cmwgJiYgKGUua2V5ID09PSAneScgfHwgKGUuc2hpZnRLZXkgJiYgZS5rZXkgPT09ICdaJykpKSB7IGUucHJldmVudERlZmF1bHQoKTsgcmVkbygpOyB9XG4gIH1cblxuICAvLyDilIDilIAgQ29udHJvbCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGFwcGx5Q29sb3IoYykge1xuICAgIGNvbG9yUmVmLmN1cnJlbnQgPSBjOyBzZXRDb2xvcihjKTsgc2V0SGV4SW5wdXQoYyk7XG4gICAgaXNFcmFzZXJSZWYuY3VycmVudCA9IGZhbHNlOyBzZXRJc0VyYXNlcihmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVJhdGlvKHIpIHtcbiAgICByYXRpb1JlZi5jdXJyZW50ID0gcjsgc2V0UmF0aW8ocik7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGJzID0gYmFzZVNpemVSZWYuY3VycmVudDtcbiAgICBzZXRDYW52YXNTaXplKHsgdzogY29scyAqIGJzLCBoOiByb3dzICogTWF0aC5yb3VuZChicyAqIHIuaCAvIHIudykgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUJnVHlwZSh0eXBlKSB7XG4gICAgYmdUeXBlUmVmLmN1cnJlbnQgPSB0eXBlOyBzZXRCZ1R5cGUodHlwZSk7IGRyYXdCYWNrZ3JvdW5kKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUJnQ29sb3IoYykge1xuICAgIGJnQ29sb3JSZWYuY3VycmVudCA9IGM7IHNldEJnQ29sb3IoYyk7IHNldEJnSGV4KGMpO1xuICAgIGlmIChiZ1R5cGVSZWYuY3VycmVudCA9PT0gJ3NvbGlkJykgZHJhd0JhY2tncm91bmQoKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBQYXR0ZXJuIHRpbGluZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBhcHBseVBhdHRlcm4oKSB7XG4gICAgY29uc3Qgc3JjID0gZHJhd1JlZi5jdXJyZW50O1xuICAgIGlmICghc3JjKSByZXR1cm47XG4gICAgY29uc3QgbW90aWYgPSBjbG9uZUNhbnZhcyhzcmMpO1xuICAgIGNvbnN0IG1XID0gbW90aWYud2lkdGgsIG1IID0gbW90aWYuaGVpZ2h0O1xuICAgIGNvbnN0IHJXID0gTWF0aC5tYXgoMSwgcGFyc2VJbnQocGF0dGVyblJXKSB8fCAyKTtcbiAgICBjb25zdCBySCA9IE1hdGgubWF4KDEsIHBhcnNlSW50KHBhdHRlcm5SSCkgfHwgMik7XG4gICAgY29uc3QgaGFsZlcgPSBNYXRoLmZsb29yKG1XIC8gMiksIGhhbGZIID0gTWF0aC5mbG9vcihtSCAvIDIpO1xuXG4gICAgbGV0IHVuaXRDLCBuZXdXLCBuZXdIO1xuXG4gICAgaWYgKHBhdHRlcm5UeXBlID09PSAnZ3JpZCcpIHtcbiAgICAgIHVuaXRDID0gbW90aWY7IG5ld1cgPSBtVyAqIHJXOyBuZXdIID0gbUggKiBySDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnYnJpY2tfaCcpIHtcbiAgICAgIHVuaXRDID0gbW90aWY7IG5ld1cgPSBtVyAqIHJXICsgaGFsZlc7IG5ld0ggPSBtSCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdoYWxmZHJvcCcpIHtcbiAgICAgIHVuaXRDID0gbW90aWY7IG5ld1cgPSBtVyAqIHJXOyBuZXdIID0gbUggKiBySCArIGhhbGZIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdtaXJyb3JfeCcpIHtcbiAgICAgIHVuaXRDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB1bml0Qy53aWR0aCA9IG1XICogMjsgdW5pdEMuaGVpZ2h0ID0gbUg7XG4gICAgICBjb25zdCB1eCA9IHVuaXRDLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB1eC5kcmF3SW1hZ2UobW90aWYsIDAsIDApOyB1eC5kcmF3SW1hZ2UoZmxpcEgobW90aWYpLCBtVywgMCk7XG4gICAgICBuZXdXID0gdW5pdEMud2lkdGggKiByVzsgbmV3SCA9IG1IICogckg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ21pcnJvcl95Jykge1xuICAgICAgdW5pdEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHVuaXRDLndpZHRoID0gbVc7IHVuaXRDLmhlaWdodCA9IG1IICogMjtcbiAgICAgIGNvbnN0IHV5ID0gdW5pdEMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHV5LmRyYXdJbWFnZShtb3RpZiwgMCwgMCk7IHV5LmRyYXdJbWFnZShmbGlwVihtb3RpZiksIDAsIG1IKTtcbiAgICAgIG5ld1cgPSBtVyAqIHJXOyBuZXdIID0gdW5pdEMuaGVpZ2h0ICogckg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ21pcnJvcl80Jykge1xuICAgICAgY29uc3QgZmggPSBmbGlwSChtb3RpZiksIGZ2ID0gZmxpcFYobW90aWYpLCBmaHYgPSBmbGlwVihmaCk7XG4gICAgICB1bml0QyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdW5pdEMud2lkdGggPSBtVyAqIDI7IHVuaXRDLmhlaWdodCA9IG1IICogMjtcbiAgICAgIGNvbnN0IHU0ID0gdW5pdEMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHU0LmRyYXdJbWFnZShtb3RpZiwgMCwgMCk7IHU0LmRyYXdJbWFnZShmaCwgbVcsIDApO1xuICAgICAgdTQuZHJhd0ltYWdlKGZ2LCAwLCBtSCk7IHU0LmRyYXdJbWFnZShmaHYsIG1XLCBtSCk7XG4gICAgICBuZXdXID0gdW5pdEMud2lkdGggKiByVzsgbmV3SCA9IHVuaXRDLmhlaWdodCAqIHJIO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdzogYncsIGg6IGJoIH0gPSBnZXRCZWFkKCk7XG4gICAgYmVhZHNSZWYuY3VycmVudCA9IHsgY29sczogTWF0aC5yb3VuZChuZXdXIC8gYncpLCByb3dzOiBNYXRoLnJvdW5kKG5ld0ggLyBiaCkgfTtcbiAgICBwZW5kaW5nUGF0dGVybi5jdXJyZW50ID0geyB1bml0QywgbVcsIG1ILCBoYWxmVywgaGFsZkgsIHJXLCBySCwgdHlwZTogcGF0dGVyblR5cGUsIG5ld1csIG5ld0ggfTtcbiAgICBzZXRDYW52YXNTaXplKHsgdzogbmV3VywgaDogbmV3SCB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBlbmRpbmdQYXR0ZXJuKCkge1xuICAgIGNvbnN0IHAgPSBwZW5kaW5nUGF0dGVybi5jdXJyZW50O1xuICAgIGlmICghcCkgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGRyYXdSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgZHJhd1JlZi5jdXJyZW50LndpZHRoLCBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0KTtcbiAgICBjb25zdCB7IHVuaXRDLCBtVywgbUgsIGhhbGZXLCBoYWxmSCwgclcsIHJILCB0eXBlIH0gPSBwO1xuICAgIGZvciAobGV0IHJ4ID0gMDsgcnggPCByVzsgcngrKykge1xuICAgICAgZm9yIChsZXQgcnkgPSAwOyByeSA8IHJIOyByeSsrKSB7XG4gICAgICAgIGxldCBveCA9IHJ4ICogKHR5cGUgPT09ICdtaXJyb3JfeCcgfHwgdHlwZSA9PT0gJ21pcnJvcl80JyA/IHVuaXRDLndpZHRoICA6IG1XKTtcbiAgICAgICAgbGV0IG95ID0gcnkgKiAodHlwZSA9PT0gJ21pcnJvcl95JyB8fCB0eXBlID09PSAnbWlycm9yXzQnID8gdW5pdEMuaGVpZ2h0IDogbUgpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2JyaWNrX2gnKSAgb3ggKz0gKHJ5ICUgMiA9PT0gMSA/IGhhbGZXIDogMCk7XG4gICAgICAgIGlmICh0eXBlID09PSAnaGFsZmRyb3AnKSBveSArPSAocnggJSAyID09PSAxID8gaGFsZkggOiAwKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh1bml0Qywgb3gsIG95KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ3VzdG9tIHBhbGV0dGVzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IGFjdGl2ZVBhbGV0dGUgPSBhY3RpdmVQYWxldHRlSWQgPT09ICdkZWZhdWx0J1xuICAgID8gREVGQVVMVF9QQUxFVFRFXG4gICAgOiAoKHBhbGV0dGVzLmZpbmQocCA9PiBwLmlkID09PSBhY3RpdmVQYWxldHRlSWQpIHx8IHt9KS5jb2xvcnMgfHwgREVGQVVMVF9QQUxFVFRFKTtcblxuICBmdW5jdGlvbiBzYXZlUGFsZXR0ZXModXBkYXRlZCkge1xuICAgIHNldFBhbGV0dGVzKHVwZGF0ZWQpO1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZWFkdG9vbF9wYWxldHRlcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQpKTsgfSBjYXRjaCB7fVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGFsZXR0ZSgpIHtcbiAgICBpZiAoIW5ld1BhbGV0dGVOYW1lLnRyaW0oKSkgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xuICAgIHNhdmVQYWxldHRlcyhbLi4ucGFsZXR0ZXMsIHsgaWQsIG5hbWU6IG5ld1BhbGV0dGVOYW1lLnRyaW0oKSwgY29sb3JzOiBbXSB9XSk7XG4gICAgc2V0QWN0aXZlUGFsZXR0ZUlkKGlkKTtcbiAgICBzZXROZXdQYWxldHRlTmFtZSgnJyk7IHNldFNob3dOZXdQYWxldHRlSW5wdXQoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUGFsZXR0ZShpZCkge1xuICAgIHNhdmVQYWxldHRlcyhwYWxldHRlcy5maWx0ZXIocCA9PiBwLmlkICE9PSBpZCkpO1xuICAgIHNldEFjdGl2ZVBhbGV0dGVJZCgnZGVmYXVsdCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29sb3JUb1BhbGV0dGUoaWQpIHtcbiAgICBzYXZlUGFsZXR0ZXMocGFsZXR0ZXMubWFwKHAgPT5cbiAgICAgIHAuaWQgPT09IGlkICYmICFwLmNvbG9ycy5pbmNsdWRlcyhjb2xvclJlZi5jdXJyZW50KVxuICAgICAgICA/IHsgLi4ucCwgY29sb3JzOiBbLi4ucC5jb2xvcnMsIGNvbG9yUmVmLmN1cnJlbnRdIH1cbiAgICAgICAgOiBwXG4gICAgKSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDb2xvckZyb21QYWxldHRlKHBpZCwgY29sKSB7XG4gICAgc2F2ZVBhbGV0dGVzKHBhbGV0dGVzLm1hcChwID0+XG4gICAgICBwLmlkID09PSBwaWQgPyB7IC4uLnAsIGNvbG9yczogcC5jb2xvcnMuZmlsdGVyKGMgPT4gYyAhPT0gY29sKSB9IDogcFxuICAgICkpO1xuICB9XG5cbiAgLy8g4pSA4pSAIEVmZmVjdHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZWFkdG9vbF9wYWxldHRlcycpIHx8ICdbXScpO1xuICAgICAgc2V0UGFsZXR0ZXMoc2F2ZWQpO1xuICAgIH0gY2F0Y2gge31cbiAgICBjcmVhdGVDYW52YXMoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY2FudmFzU2l6ZS53ID4gMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChwZW5kaW5nUGF0dGVybi5jdXJyZW50KSB7XG4gICAgICAgICAgcmVuZGVyUGVuZGluZ1BhdHRlcm4oKTtcbiAgICAgICAgICBwZW5kaW5nUGF0dGVybi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbml0Q2FudmFzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZHJhd0JhY2tncm91bmQoKTtcbiAgICAgICAgZHJhd0dyaWQoKTtcbiAgICAgICAgZHJhd1J1bGVycygpO1xuICAgICAgICB1cGRhdGVNaW5pbWFwKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH0sIFtjYW52YXNTaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHsgZHJhd0dyaWQoKTsgfSwgW3Nob3dHcmlkXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7IGRyYXdCYWNrZ3JvdW5kKCk7IHNldFRpbWVvdXQodXBkYXRlTWluaW1hcCwgNTApOyB9LCBbYmdUeXBlLCBiZ0NvbG9yXSk7XG5cbiAgLy8g4pSA4pSAIERlcml2ZWQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3QgcHJldmlldyA9IGJlYWRzRnJvbVNldHVwKHNldHVwVywgc2V0dXBILCB1bml0LCBkZW5zaXR5KTtcbiAgY29uc3QgY1cgPSBjYW52YXNTaXplLncgfHwgMTtcbiAgY29uc3QgY0ggPSBjYW52YXNTaXplLmggfHwgMTtcblxuICAvLyDilIDilIAgUmVuZGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMHZ3JywgaGVpZ2h0OiAnMTAwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBvc2l0aW9uOiAncmVsYXRpdmUnLCBiYWNrZ3JvdW5kOiBULmJnIH19PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5CZWFkd29yayBTdHVkaW88L3RpdGxlPlxuICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QbGF5ZmFpcitEaXNwbGF5Oml0YWwsd2dodEAwLDYwMDsxLDQwMCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG4gICAgICAgIGh0bWwsIGJvZHkgeyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IH1cbiAgICAgICAgaW5wdXQsIHNlbGVjdCwgYnV0dG9uIHsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgfVxuICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgd2lkdGg6IDZweDsgaGVpZ2h0OiA2cHg7IH1cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7IGJhY2tncm91bmQ6ICR7VC5iZ307IH1cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7IGJhY2tncm91bmQ6ICR7VC5ib3JkZXJ9OyBib3JkZXItcmFkaXVzOiAzcHg7IH1cbiAgICAgICAgYnV0dG9uOmhvdmVyIHsgb3BhY2l0eTogMC44NTsgfVxuICAgICAgICBpbnB1dFt0eXBlPWNoZWNrYm94XSB7IGFjY2VudC1jb2xvcjogJHtULmFjY2VudH07IH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgey8qIOKUgOKUgCBTY3JvbGxhYmxlIGNhbnZhcyBhcmVhIOKUgOKUgCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPXtzY3JvbGxBcmVhUmVmfVxuICAgICAgICBvblNjcm9sbD17dXBkYXRlTWluaW1hcH1cbiAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZVNjcm9sbEFyZWFNb3VzZURvd259XG4gICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVTY3JvbGxBcmVhTW91c2VNb3ZlfVxuICAgICAgICBvbk1vdXNlVXA9e2hhbmRsZVNjcm9sbEFyZWFNb3VzZVVwfVxuICAgICAgICBvbkNvbnRleHRNZW51PXtlID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLFxuICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDB2dyAtICR7UEFORUxfV31weClgLCBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogVC5jYW52YXMsXG4gICAgICAgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ncmlkJyxcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiBgJHtSVUxFUl9TWn1weCAke2NXfXB4YCxcbiAgICAgICAgICBncmlkVGVtcGxhdGVSb3dzOiAgICBgJHtSVUxFUl9TWn1weCAke2NIfXB4YCxcbiAgICAgICAgICBwYWRkaW5nOiBQQUQsIGdhcDogMCxcbiAgICAgICAgICBtaW5XaWR0aDogJzEwMCUnLCBtaW5IZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgfX0+XG4gICAgICAgICAgey8qIENvcm5lciAqL31cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6IFQuYmcsIHBvc2l0aW9uOiAnc3RpY2t5JywgdG9wOiBQQUQsIGxlZnQ6IFBBRCwgekluZGV4OiA1IH19IC8+XG5cbiAgICAgICAgICB7LyogVG9wIHJ1bGVyICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IFBBRCwgekluZGV4OiA0LCBiYWNrZ3JvdW5kOiBULmJnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17cnVsZXJUb3BSZWZ9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0gLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBMZWZ0IHJ1bGVyICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCBsZWZ0OiBQQUQsIHpJbmRleDogNCwgYmFja2dyb3VuZDogVC5iZywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e3J1bGVyTGVmdFJlZn0gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENhbnZhcyBzdGFjayAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgd2lkdGg6IGNXLCBoZWlnaHQ6IGNIIH19XG4gICAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXtlID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YmdUeXBlID09PSAndHJhbnNwYXJlbnQnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgekluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3JlcGVhdGluZy1jb25pYy1ncmFkaWVudCgjYWFhIDAlIDI1JSwgI2ZmZiAwJSA1MCUpJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJzE2cHggMTZweCcsXG4gICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e2JnUmVmfSAgIHdpZHRoPXtjV30gaGVpZ2h0PXtjSH0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCwgekluZGV4OiAxIH19IC8+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17ZHJhd1JlZn0gd2lkdGg9e2NXfSBoZWlnaHQ9e2NIfVxuICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB6SW5kZXg6IDIsIGN1cnNvcjogaXNFcmFzZXIgPyAnY2VsbCcgOiAnY3Jvc3NoYWlyJywgdXNlclNlbGVjdDogJ25vbmUnIH19XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgICAgICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZVVwfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtncmlkUmVmfSB3aWR0aD17Y1d9IGhlaWdodD17Y0h9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMywgcG9pbnRlckV2ZW50czogJ25vbmUnIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiDilIDilIAgTWluaS1tYXAg4pSA4pSAICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdDogMTAsIGJvdHRvbTogMTAsIHpJbmRleDogMjAsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjMTExJywgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiA0LCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICczcHggNnB4JywgZm9udFNpemU6IDksIGNvbG9yOiBULm11dGVkLCBsZXR0ZXJTcGFjaW5nOiAxLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtULmJvcmRlcn1gIH19PlxuICAgICAgICAgIE9WRVJWSUVXXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Y2FudmFzIHJlZj17bWluaW1hcFJlZn0gd2lkdGg9e01JTklNQVBfV30gaGVpZ2h0PXtNSU5JTUFQX0h9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIFJpZ2h0IHBhbmVsIOKUgOKUgCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIHJpZ2h0OiAwLCB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiBQQU5FTF9XLCBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIGJhY2tncm91bmQ6IFQucGFuZWwsIGNvbG9yOiBULnRleHQsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICB6SW5kZXg6IDEwLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIH19PlxuICAgICAgICB7LyogU2F2ZSDigJQgcHJvbWluZW50IHRvcCBiYXIgKi99XG4gICAgICAgIDxidXR0b24gb25DbGljaz17c2F2ZUNhbnZhc30gc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2I4NzMzMywgI2Q0YTA0MCknLFxuICAgICAgICAgIGNvbG9yOiAnIzFhMTcxNCcsIGZvbnRXZWlnaHQ6IDcwMCwgZm9udFNpemU6IDEzLFxuICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMTNweCAxNnB4JyxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAxLjUsIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgZm9udEZhbWlseTogXCInUGxheWZhaXIgRGlzcGxheScsIHNlcmlmXCIsXG4gICAgICAgIH19PlxuICAgICAgICAgIOKGkyAgU0FWRSBBUlRXT1JLXG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTJweCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogMTIgfX0+XG4gICAgICAgICAgey8qIFRpdGxlICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogXCInUGxheWZhaXIgRGlzcGxheScsIHNlcmlmXCIsIGZvbnRTaXplOiAxNywgY29sb3I6IFQudGV4dCwgbGV0dGVyU3BhY2luZzogMC41LCBmb250U3R5bGU6ICdpdGFsaWMnIH19PlxuICAgICAgICAgICAgQmVhZHdvcmsgU3R1ZGlvXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FudmFzIHNldHVwICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQ2FudmFzIFNpemVcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpbkJvdHRvbTogNiB9fT5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiV0lEVEhcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMVwiIHN0ZXA9XCIwLjFcIiB2YWx1ZT17c2V0dXBXfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0U2V0dXBXKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiSEVJR0hUXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwLjFcIiBzdGVwPVwiMC4xXCIgdmFsdWU9e3NldHVwSH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNldHVwSChlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlVOSVRcIiBmbGV4PXswLjd9PlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3VuaXR9IG9uQ2hhbmdlPXtlID0+IHNldFVuaXQoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17eyAuLi5pbnAsIHdpZHRoOiA1MiB9fT5cbiAgICAgICAgICAgICAgICAgIHtVTklUUy5tYXAodSA9PiA8b3B0aW9uIGtleT17dX0+e3V9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiQkVBRCBERU5TSVRZXCI+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e2RlbnNpdHl9IG9uQ2hhbmdlPXtlID0+IHNldERlbnNpdHkoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9IHN0eWxlPXtpbnB9PlxuICAgICAgICAgICAgICAgIHtERU5TSVRZX1BSRVNFVFMubWFwKGQgPT4gPG9wdGlvbiBrZXk9e2QudmFsdWV9IHZhbHVlPXtkLnZhbHVlfT57ZC5sYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogMTEsIG1hcmdpbjogJzZweCAwJyB9fT5cbiAgICAgICAgICAgICAgPSB7cHJldmlldy5jb2xzfSDDlyB7cHJldmlldy5yb3dzfSBiZWFkc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NyZWF0ZUNhbnZhc30gc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyNTM1MjUnLCBjb2xvcjogJyM3ZGFhNmQnLCBib3JkZXI6ICcxcHggc29saWQgIzNhNWEzYScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXJSYWRpdXM6IDMsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIH19PuKcpiBDcmVhdGUgQ2FudmFzPC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIFBhbGV0dGUgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJQYWxldHRlXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXthY3RpdmVQYWxldHRlSWR9IG9uQ2hhbmdlPXtlID0+IHNldEFjdGl2ZVBhbGV0dGVJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uaW5wLCBmbGV4OiAxIH19PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkZWZhdWx0XCI+RGVmYXVsdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHtwYWxldHRlcy5tYXAocCA9PiA8b3B0aW9uIGtleT17cC5pZH0gdmFsdWU9e3AuaWR9PntwLm5hbWV9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd05ld1BhbGV0dGVJbnB1dCghc2hvd05ld1BhbGV0dGVJbnB1dCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIHBhZGRpbmc6ICc1cHggOXB4JywgZmxleFNocmluazogMCB9fT7vvIs8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Nob3dOZXdQYWxldHRlSW5wdXQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYgfX0+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXtuZXdQYWxldHRlTmFtZX0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3UGFsZXR0ZU5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYWxldHRlIG5hbWXigKZcIiBzdHlsZT17eyAuLi5pbnAsIGZsZXg6IDEgfX1cbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiBlLmtleSA9PT0gJ0VudGVyJyAmJiBhZGRQYWxldHRlKCl9IGF1dG9Gb2N1cyAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YWRkUGFsZXR0ZX0gc3R5bGU9e3sgLi4uY2hpcEJ0bih0cnVlKSwgZmxleFNocmluazogMCB9fT5PSzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7YWN0aXZlUGFsZXR0ZUlkICE9PSAnZGVmYXVsdCcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBhZGRDb2xvclRvUGFsZXR0ZShhY3RpdmVQYWxldHRlSWQpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIGZsZXg6IDEsIGZvbnRTaXplOiAxMSB9fT7vvIsgQWRkIGN1cnJlbnQgY29sb3I8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRlbGV0ZVBhbGV0dGUoYWN0aXZlUGFsZXR0ZUlkKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBjb2xvcjogJyNjYzc3NzcnLCBmb250U2l6ZTogMTEgfX0+8J+XkSBEZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkNvbG9yXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCwgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBmbGV4U2hyaW5rOiAwLCBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNFcmFzZXIgPyAnI2ZmZicgOiBjb2xvcixcbiAgICAgICAgICAgICAgICBib3JkZXI6IGlzRXJhc2VyID8gJzJweCBzb2xpZCAjY2M3Nzc3JyA6IGAycHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e2hleElucHV0fSBvbkNoYW5nZT17ZSA9PiB7IHNldEhleElucHV0KGUudGFyZ2V0LnZhbHVlKTsgaWYgKC9eI1swLTlhLWZBLUZdezZ9JC8udGVzdChlLnRhcmdldC52YWx1ZSkpIGFwcGx5Q29sb3IoZS50YXJnZXQudmFsdWUpOyB9fVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiIzAwMDAwMFwiIHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6IDMgfX0+XG4gICAgICAgICAgICAgIHthY3RpdmVQYWxldHRlLm1hcChjID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y30gdGl0bGU9e2N9IGRyYWdnYWJsZVxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9e2UgPT4gZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnY29sb3InLCBjKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5Q29sb3IoYyl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAsIGhlaWdodDogMjAsIGJhY2tncm91bmQ6IGMsIGN1cnNvcjogJ2dyYWInLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDIsIGZsZXhTaHJpbms6IDAsIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGNvbG9yID09PSBjICYmICFpc0VyYXNlciA/IGAycHggc29saWQgJHtULmFjY2VudH1gIDogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVQYWxldHRlSWQgIT09ICdkZWZhdWx0JyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17ZSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHJlbW92ZUNvbG9yRnJvbVBhbGV0dGUoYWN0aXZlUGFsZXR0ZUlkLCBjKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTQsIHJpZ2h0OiAtNCwgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM5OTMzMzMnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmb250U2l6ZTogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsIGN1cnNvcjogJ3BvaW50ZXInLCB6SW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgfX0+4pyVPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5tdXRlZCwgZm9udFNpemU6IDEwLCBtYXJnaW5Ub3A6IDUgfX0+XG4gICAgICAgICAgICAgIERyYWcgYSBjb2xvciBvbnRvIHRoZSBjYW52YXMgdG8gZmxvb2QgZmlsbFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIFRvb2wgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJUb29sXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2IH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgaXNFcmFzZXJSZWYuY3VycmVudCA9IGZhbHNlOyBzZXRJc0VyYXNlcihmYWxzZSk7IH19XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bighaXNFcmFzZXIpLCBmbGV4OiAxIH19PuKcjyBEcmF3PC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4geyBpc0VyYXNlclJlZi5jdXJyZW50ID0gdHJ1ZTsgc2V0SXNFcmFzZXIodHJ1ZSk7IH19XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihpc0VyYXNlciksIGZsZXg6IDEgfX0+4oyrIEVyYXNlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogQmVhZCByYXRpbyAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkJlYWQgUmF0aW8gKFc6SClcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XG4gICAgICAgICAgICAgIHtSQVRJT1MubWFwKHIgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLmxhYmVsfSBvbkNsaWNrPXsoKSA9PiBhcHBseVJhdGlvKHIpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihyYXRpby5sYWJlbCA9PT0gci5sYWJlbCksIGZsZXg6IDEgfX0+e3IubGFiZWx9PC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEJhY2tncm91bmQgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJCYWNrZ3JvdW5kXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA1LCBtYXJnaW5Cb3R0b206IDggfX0+XG4gICAgICAgICAgICAgIHtbJ3RyYW5zcGFyZW50Jywnc29saWQnLCdpbWFnZSddLm1hcCh0ID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17dH0gb25DbGljaz17KCkgPT4gYXBwbHlCZ1R5cGUodCl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGJnVHlwZSA9PT0gdCksIGZsZXg6IDEsIGZvbnRTaXplOiAxMSwgcGFkZGluZzogJzVweCA0cHgnIH19Pnt0fTwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2JnVHlwZSA9PT0gJ3NvbGlkJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDI4LCBoZWlnaHQ6IDI4LCBiYWNrZ3JvdW5kOiBiZ0NvbG9yLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IDMsIGZsZXhTaHJpbms6IDAgfX0gLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e2JnSGV4fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4geyBzZXRCZ0hleChlLnRhcmdldC52YWx1ZSk7IGlmICgvXiNbMC05YS1mQS1GXXs2fSQvLnRlc3QoZS50YXJnZXQudmFsdWUpKSBhcHBseUJnQ29sb3IoZS50YXJnZXQudmFsdWUpOyB9fVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2JnVHlwZSA9PT0gJ2ltYWdlJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9wbmdcIlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGJnSW1hZ2VSZWYuY3VycmVudCA9IGV2LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0QmdJbWFnZShldi50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICBiZ1R5cGVSZWYuY3VycmVudCA9ICdpbWFnZSc7IHNldEJnVHlwZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICBkcmF3QmFja2dyb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbnAsIGN1cnNvcjogJ3BvaW50ZXInIH19IC8+XG4gICAgICAgICAgICAgICAge2JnSW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IGJnSW1hZ2VSZWYuY3VycmVudCA9IG51bGw7IHNldEJnSW1hZ2UobnVsbCk7IGFwcGx5QmdUeXBlKCdzb2xpZCcpOyB9fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgbWFyZ2luVG9wOiA2LCB3aWR0aDogJzEwMCUnLCBmb250U2l6ZTogMTEgfX0+UmVtb3ZlIGltYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBSZXBlYXQgcGF0dGVybiAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlJlcGVhdCBQYXR0ZXJuXCI+XG4gICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJQQVRURVJOIFRZUEVcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17cGF0dGVyblR5cGV9IG9uQ2hhbmdlPXtlID0+IHNldFBhdHRlcm5UeXBlKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0+XG4gICAgICAgICAgICAgICAge1JFUEVBVF9QQVRURVJOUy5tYXAocCA9PiA8b3B0aW9uIGtleT17cC52YWx1ZX0gdmFsdWU9e3AudmFsdWV9PntwLmxhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpblRvcDogNiB9fT5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUkVQRUFUIFdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCIxMFwiIHZhbHVlPXtwYXR0ZXJuUld9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRQYXR0ZXJuUlcoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJSRVBFQVQgSFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjEwXCIgdmFsdWU9e3BhdHRlcm5SSH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFBhdHRlcm5SSChlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YXBwbHlQYXR0ZXJufSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzIyMjg0MCcsIGNvbG9yOiAnIzg4OTljYycsIGJvcmRlcjogJzFweCBzb2xpZCAjM2EzZDYwJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlclJhZGl1czogMywgd2lkdGg6ICcxMDAlJywgZm9udFNpemU6IDEyLCBtYXJnaW5Ub3A6IDgsXG4gICAgICAgICAgICB9fT7in7MgQXBwbHkgUmVwZWF0PC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEdyaWQgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJHcmlkXCI+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6IDEyLCBtYXJnaW5Cb3R0b206IDUgfX0+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzaG93R3JpZH0gb25DaGFuZ2U9eygpID0+IHsgY29uc3QgbiA9ICFzaG93R3JpZFJlZi5jdXJyZW50OyBzaG93R3JpZFJlZi5jdXJyZW50ID0gbjsgc2V0U2hvd0dyaWQobik7IGRyYXdHcmlkKCk7IH19IC8+XG4gICAgICAgICAgICAgIFNob3cgZ3JpZCB3aGlsZSBkcmF3aW5nXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCwgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAxMiB9fT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e2V4cG9ydFdpdGhHcmlkfSBvbkNoYW5nZT17KCkgPT4geyBleHBvcnRHcmlkUmVmLmN1cnJlbnQgPSAhZXhwb3J0R3JpZFJlZi5jdXJyZW50OyBzZXRFeHBvcnRXaXRoR3JpZChleHBvcnRHcmlkUmVmLmN1cnJlbnQpOyB9fSAvPlxuICAgICAgICAgICAgICBJbmNsdWRlIGdyaWQgaW4gZXhwb3J0XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBBY3Rpb25zICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q2xlYXJDb25maXJtKHRydWUpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBULnNlY3Rpb24sIGNvbG9yOiAnI2NjNzc3NycsIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMywgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMiwgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICB9fT7inJUgQ2xlYXIgY2FudmFzPC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5tdXRlZCwgZm9udFNpemU6IDExLCBwYWRkaW5nOiAnNnB4IDJweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAgfX0+XG4gICAgICAgICAgICBDdHJsK1ogIHVuZG8gIMK3ICBDdHJsK1kgIHJlZG9cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIOKUgOKUgCBDbGVhciBjb25maXJtYXRpb24g4pSA4pSAICovfVxuICAgICAge3Nob3dDbGVhckNvbmZpcm0gJiYgKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjcyKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCB6SW5kZXg6IDEwMCxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogVC5wYW5lbCwgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogNiwgcGFkZGluZzogMjgsIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDEwcHggNDBweCByZ2JhKDAsMCwwLDAuNiknLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiBcIidQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWZcIiwgZm9udFNpemU6IDE4LCBjb2xvcjogVC50ZXh0LCBtYXJnaW5Cb3R0b206IDggfX0+XG4gICAgICAgICAgICAgIENsZWFyIGNhbnZhcz9cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiBULm11dGVkLCBtYXJnaW5Cb3R0b206IDIwIH19PlxuICAgICAgICAgICAgICBBbGwgeW91ciB3b3JrIHdpbGwgYmUgZXJhc2VkLiBUaGlzIGNhbm5vdCBiZSB1bmRvbmUuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDEwIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dDbGVhckNvbmZpcm0oZmFsc2UpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBmbGV4OiAxLCBwYWRkaW5nOiAnOHB4JyB9fT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2F2ZUhpc3RvcnkoKTsgaW5pdENhbnZhcygpOyBkcmF3QmFja2dyb3VuZCgpOyBkcmF3R3JpZCgpO1xuICAgICAgICAgICAgICAgIHNldFNob3dDbGVhckNvbmZpcm0oZmFsc2UpO1xuICAgICAgICAgICAgICB9fSBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc4cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjNWExYTFhJywgY29sb3I6ICcjZmZhYWFhJywgYm9yZGVyOiAnMXB4IHNvbGlkICM4YTMwMzAnLCBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICAgIH19PkNsZWFyPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl19 */\n/*@ sourceURL=W:\\Madhura\\Morii\\beadwork tool\\code\\pages\\index.js */")), __jsx("div", {
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
      lineNumber: 854
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
      lineNumber: 866
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
      lineNumber: 874
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
      lineNumber: 877
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
      lineNumber: 878
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
      lineNumber: 882
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
      lineNumber: 883
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
      lineNumber: 887
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
      lineNumber: 893
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
      lineNumber: 899
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
      lineNumber: 900
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
      lineNumber: 907
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
      lineNumber: 914
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
      lineNumber: 920
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
      lineNumber: 923
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
      lineNumber: 927
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
      lineNumber: 936
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
      lineNumber: 947
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
      lineNumber: 949
    },
    __self: this
  }, "Beadwork Studio"), __jsx(Section, {
    title: "Canvas Size",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 954
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
      lineNumber: 955
    },
    __self: this
  }, __jsx(Field, {
    label: "WIDTH",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 956
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
      lineNumber: 957
    },
    __self: this
  })), __jsx(Field, {
    label: "HEIGHT",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 960
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
      lineNumber: 961
    },
    __self: this
  })), __jsx(Field, {
    label: "UNIT",
    flex: 0.7,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 964
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
      lineNumber: 965
    },
    __self: this
  }, UNITS.map(function (u) {
    return __jsx("option", {
      key: u,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 966
      },
      __self: this
    }, u);
  })))), __jsx(Field, {
    label: "BEAD DENSITY",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 970
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
      lineNumber: 971
    },
    __self: this
  }, DENSITY_PRESETS.map(function (d) {
    return __jsx("option", {
      key: d.value,
      value: d.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 972
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
      lineNumber: 975
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
      lineNumber: 978
    },
    __self: this
  }, "\u2726 Create Canvas")), __jsx(Section, {
    title: "Palette",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 985
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
      lineNumber: 986
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
      lineNumber: 987
    },
    __self: this
  }, __jsx("option", {
    value: "default",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 989
    },
    __self: this
  }, "Default"), palettes.map(function (p) {
    return __jsx("option", {
      key: p.id,
      value: p.id,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 990
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
      lineNumber: 992
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
      lineNumber: 996
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
      lineNumber: 997
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
      lineNumber: 1000
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
      lineNumber: 1004
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
      lineNumber: 1005
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
      lineNumber: 1007
    },
    __self: this
  }, "\uD83D\uDDD1 Delete"))), __jsx(Section, {
    title: "Color",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1014
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
      lineNumber: 1015
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
      lineNumber: 1016
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
      lineNumber: 1021
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
      lineNumber: 1024
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
        lineNumber: 1026
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
        lineNumber: 1036
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
      lineNumber: 1047
    },
    __self: this
  }, "Drag a color onto the canvas to flood fill")), __jsx(Section, {
    title: "Tool",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1053
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
      lineNumber: 1054
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
      lineNumber: 1055
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
      lineNumber: 1057
    },
    __self: this
  }, "\u232B Erase"))), __jsx(Section, {
    title: "Bead Ratio (W:H)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1063
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
      lineNumber: 1064
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
        lineNumber: 1066
      },
      __self: this
    }, r.label);
  }))), __jsx(Section, {
    title: "Background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1073
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
      lineNumber: 1074
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
        lineNumber: 1076
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
      lineNumber: 1081
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
      lineNumber: 1082
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
      lineNumber: 1083
    },
    __self: this
  })), bgType === 'image' && __jsx("div", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1089
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
      lineNumber: 1090
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
      lineNumber: 1105
    },
    __self: this
  }, "Remove image"))), __jsx(Section, {
    title: "Repeat Pattern",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1113
    },
    __self: this
  }, __jsx(Field, {
    label: "PATTERN TYPE",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1114
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
      lineNumber: 1115
    },
    __self: this
  }, REPEAT_PATTERNS.map(function (p) {
    return __jsx("option", {
      key: p.value,
      value: p.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 1116
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
      lineNumber: 1119
    },
    __self: this
  }, __jsx(Field, {
    label: "REPEAT W",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1120
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
      lineNumber: 1121
    },
    __self: this
  })), __jsx(Field, {
    label: "REPEAT H",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1124
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
      lineNumber: 1125
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
      lineNumber: 1129
    },
    __self: this
  }, "\u27F3 Apply Repeat")), __jsx(Section, {
    title: "Grid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1136
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
      lineNumber: 1137
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
      lineNumber: 1138
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
      lineNumber: 1141
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
      lineNumber: 1142
    },
    __self: this
  }), "Include grid in export")), __jsx(Section, {
    title: "Actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1148
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
      lineNumber: 1149
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
      lineNumber: 1155
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
      lineNumber: 1163
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
      lineNumber: 1167
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
      lineNumber: 1172
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
      lineNumber: 1175
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
      lineNumber: 1178
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
      lineNumber: 1179
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
      lineNumber: 1181
    },
    __self: this
  }, "Clear")))));
}

/***/ })

})
//# sourceMappingURL=index.js.ae2386a618ecd7c94401.hot-update.js.map