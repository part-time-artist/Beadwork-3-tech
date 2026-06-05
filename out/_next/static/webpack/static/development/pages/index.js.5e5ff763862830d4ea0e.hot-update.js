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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_5__);
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
      lineNumber: 116
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
      lineNumber: 117
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
      lineNumber: 127
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
      lineNumber: 128
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
      cols: Math.max(2, Math.round(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_5___default()(w) * TO_CM[u] * d)),
      rows: Math.max(2, Math.round(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_5___default()(h) * TO_CM[u] * d))
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

    var _hexToRgb = hexToRgb(fillColor),
        _hexToRgb2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_hexToRgb, 3),
        fr = _hexToRgb2[0],
        fg = _hexToRgb2[1],
        fb = _hexToRgb2[2];

    if (pixelMatch(target, [fr, fg, fb, 255])) return;
    saveHistory();
    var queue = [[startCol, startRow]];
    var visited = new _babel_runtime_corejs2_core_js_set__WEBPACK_IMPORTED_MODULE_3___default.a();

    while (queue.length) {
      var _queue$shift = queue.shift(),
          _queue$shift2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_queue$shift, 2),
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
      lineNumber: 703
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 704
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705
    },
    __self: this
  }, "Beadwork Studio"), __jsx("link", {
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap",
    rel: "stylesheet",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 706
    },
    __self: this
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
    id: "664782124",
    __self: this
  }, "*{box-sizing:border-box;}html,body{margin:0;padding:0;font-family:monospace;}input,select,button{font-family:monospace;}::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:".concat(T.bg, ";}::-webkit-scrollbar-thumb{background:").concat(T.border, ";border-radius:3px;}button:hover{opacity:0.85;}input[type=checkbox]{accent-color:").concat(T.accent, ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlc6XFxNYWRodXJhXFxNb3JpaVxcYmVhZHdvcmsgdG9vbFxcY29kZVxccGFnZXNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1zQnlCLEFBRWtDLEFBQ0osQUFDd0IsQUFDZCxBQUNvQyxBQUNBLEFBQ3hDLEFBQ3FDLFNBTmhDLENBRVcsR0FHZixNQUwyQixFQUVYLENBSGxCLEFBRW9CLGtCQUVzQixBQUNrQixDQUo5QixDQU1TLGdCQUZzQiIsImZpbGUiOiJXOlxcTWFkaHVyYVxcTW9yaWlcXGJlYWR3b3JrIHRvb2xcXGNvZGVcXHBhZ2VzXFxpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuXG4vLyDilIDilIAgQ29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBSQVRJT1MgPSBbXG4gIHsgbGFiZWw6ICcxOjEnLCB3OiAxLCBoOiAxIH0sXG4gIHsgbGFiZWw6ICcyOjMnLCB3OiAyLCBoOiAzIH0sXG4gIHsgbGFiZWw6ICczOjQnLCB3OiAzLCBoOiA0IH0sXG5dO1xuXG5jb25zdCBVTklUUyA9IFsnbW0nLCAnY20nLCAnaW5jaCcsICdtJ107XG5jb25zdCBUT19DTSA9IHsgbW06IDAuMSwgY206IDEsIGluY2g6IDIuNTQsIG06IDEwMCB9O1xuXG5jb25zdCBERU5TSVRZX1BSRVNFVFMgPSBbXG4gIHsgbGFiZWw6ICdFeHRyYSBmaW5lICg1L2NtKScsIHZhbHVlOiA1IH0sXG4gIHsgbGFiZWw6ICdGaW5lICg0L2NtKScsICAgICAgIHZhbHVlOiA0IH0sXG4gIHsgbGFiZWw6ICdNZWRpdW0gKDMvY20pJywgICAgIHZhbHVlOiAzIH0sXG4gIHsgbGFiZWw6ICdDb2Fyc2UgKDIvY20pJywgICAgIHZhbHVlOiAyIH0sXG5dO1xuXG5jb25zdCBSRVBFQVRfUEFUVEVSTlMgPSBbXG4gIHsgdmFsdWU6ICdncmlkJywgICAgIGxhYmVsOiAnR3JpZCAoc3RyYWlnaHQpJyB9LFxuICB7IHZhbHVlOiAnYnJpY2tfaCcsICBsYWJlbDogJ0JyaWNrIChob3Jpem9udGFsKScgfSxcbiAgeyB2YWx1ZTogJ2hhbGZkcm9wJywgbGFiZWw6ICdIYWxmLWRyb3AgKHZlcnRpY2FsKScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl94JywgbGFiZWw6ICdNaXJyb3IgWCcgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl95JywgbGFiZWw6ICdNaXJyb3IgWScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl80JywgbGFiZWw6ICc0LXdheSBNaXJyb3InIH0sXG5dO1xuXG5jb25zdCBERUZBVUxUX1BBTEVUVEUgPSBbXG4gICcjMDAwMDAwJywnIzExMTExMScsJyMzMzMzMzMnLCcjNTU1NTU1JywnIzc3Nzc3NycsJyM5OTk5OTknLCcjYWFhYWFhJywnI2NjY2NjYycsJyNlNWU1ZTUnLCcjZmZmZmZmJyxcbiAgJyNmZjAwMDAnLCcjY2MwMDAwJywnIzk5MDAwMCcsJyNmZjQ0NDQnLCcjZmY5OTk5JywnI2ZmY2NjYycsXG4gICcjZmY2NjAwJywnI2ZmODgwMCcsJyNmZmFhMDAnLCcjZmZjYzAwJywnI2ZmZGQ4OCcsXG4gICcjZmZmZjAwJywnI2RkZGQwMCcsJyNhYWFhMDAnLCcjZmZmZjk5JyxcbiAgJyMwMGNjMDAnLCcjMDA5OTAwJywnIzAwNjYwMCcsJyMwMDMzMDAnLCcjNDRkZDQ0JywnIzk5ZWU5OScsJyNjY2ZmY2MnLCcjMDBhYTU1JyxcbiAgJyMwMGNjY2MnLCcjMDA5OTk5JywnIzAwNjY2NicsJyNhYWZmZmYnLFxuICAnIzAwMDBmZicsJyMwMDAwY2MnLCcjMDAwMDk5JywnIzAwNjZmZicsJyMwMDk5ZmYnLCcjNDRhYWZmJywnIzk5Y2NmZicsJyNjY2U1ZmYnLFxuICAnIzY2MDBjYycsJyM5OTAwZmYnLCcjY2M0NGZmJywnI2VlY2NmZicsJyMzMzAwNjYnLFxuICAnI2ZmMDBmZicsJyNmZjQ0YmInLCcjZmY4OGRkJywnI2ZmY2NlZScsJyNjYzAwNjYnLCcjZmYwMDY2JyxcbiAgJyM0ZDI2MDAnLCcjN2EzZDAwJywnI2EwNWMwMCcsJyNjOThhM2EnLCcjZGRiODgyJywnI2YwZDBhOCcsJyNmNWU2ZDAnLFxuXTtcblxuY29uc3QgUEFORUxfVyAgICA9IDI5MDtcbmNvbnN0IFJVTEVSX1NaICAgPSAyNDtcbmNvbnN0IFBBRCAgICAgICAgPSAyMDtcbmNvbnN0IE1JTklNQVBfVyAgPSAxODA7XG5jb25zdCBNSU5JTUFQX0ggID0gMTQwO1xuXG4vLyDilIDilIAgVGhlbWUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IFQgPSB7XG4gIGJnOiAgICAgICcjMWExNzE0JyxcbiAgcGFuZWw6ICAgJyMxZTFhMTcnLFxuICBzZWN0aW9uOiAnIzI1MWYxYScsXG4gIGFjY2VudDogICcjYzg5NTZjJyxcbiAgdGV4dDogICAgJyNlOGRkZDQnLFxuICBtdXRlZDogICAnIzhhNzA2MCcsXG4gIGJvcmRlcjogICcjM2EzMDI4JyxcbiAgY2FudmFzOiAgJyMyYTI0MjAnLFxufTtcblxuLy8g4pSA4pSAIFN0eWxlIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGNoaXBCdG4oYWN0aXZlLCBleHRyYSkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/IFQuYWNjZW50IDogVC5zZWN0aW9uLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnIzFhMTcxNCcgOiBULnRleHQsXG4gICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7YWN0aXZlID8gVC5hY2NlbnQgOiBULmJvcmRlcn1gLFxuICAgIHBhZGRpbmc6ICc1cHggMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlclJhZGl1czogMywgZm9udFNpemU6IDEyLFxuICAgIC4uLmV4dHJhLFxuICB9O1xufVxuXG5jb25zdCBpbnAgPSB7XG4gIGJhY2tncm91bmQ6IFQuc2VjdGlvbiwgY29sb3I6IFQudGV4dCxcbiAgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgcGFkZGluZzogJzVweCA4cHgnLCBib3JkZXJSYWRpdXM6IDMsXG4gIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogMTIsIHdpZHRoOiAnMTAwJScsXG59O1xuXG4vLyDilIDilIAgVXRpbGl0eSBmdW5jdGlvbnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICByZXR1cm4gW3BhcnNlSW50KGhleC5zbGljZSgxLDMpLDE2KSwgcGFyc2VJbnQoaGV4LnNsaWNlKDMsNSksMTYpLCBwYXJzZUludChoZXguc2xpY2UoNSw3KSwxNildO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNhbnZhcyhzcmMpIHtcbiAgY29uc3QgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjLndpZHRoID0gc3JjLndpZHRoOyBjLmhlaWdodCA9IHNyYy5oZWlnaHQ7XG4gIGMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGZsaXBIKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICBjdHgudHJhbnNsYXRlKHNyYy53aWR0aCwgMCk7IGN0eC5zY2FsZSgtMSwgMSk7IGN0eC5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGZsaXBWKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICBjdHgudHJhbnNsYXRlKDAsIHNyYy5oZWlnaHQpOyBjdHguc2NhbGUoMSwgLTEpOyBjdHguZHJhd0ltYWdlKHNyYywgMCwgMCk7XG4gIHJldHVybiBjO1xufVxuXG4vLyDilIDilIAgU3ViLWNvbXBvbmVudHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFNlY3Rpb24oeyB0aXRsZSwgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogVC5zZWN0aW9uLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IDQsIHBhZGRpbmc6ICcxMHB4IDEwcHgnIH19PlxuICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5hY2NlbnQsIGZvbnRTaXplOiAxMCwgbGV0dGVyU3BhY2luZzogMS41LCBtYXJnaW5Cb3R0b206IDgsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvZGl2PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWVsZCh7IGxhYmVsLCBjaGlsZHJlbiwgZmxleCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBmbGV4OiBmbGV4IHx8IDEgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogOSwgbWFyZ2luQm90dG9tOiAzLCBsZXR0ZXJTcGFjaW5nOiAxIH19PntsYWJlbH08L2Rpdj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLy8g4pSA4pSAIE1haW4gY29tcG9uZW50IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBiZ1JlZiAgICAgICAgPSB1c2VSZWYoKTtcbiAgY29uc3QgZHJhd1JlZiAgICAgID0gdXNlUmVmKCk7XG4gIGNvbnN0IGdyaWRSZWYgICAgICA9IHVzZVJlZigpO1xuICBjb25zdCBydWxlclRvcFJlZiAgPSB1c2VSZWYoKTtcbiAgY29uc3QgcnVsZXJMZWZ0UmVmID0gdXNlUmVmKCk7XG4gIGNvbnN0IG1pbmltYXBSZWYgICA9IHVzZVJlZigpO1xuICBjb25zdCBzY3JvbGxBcmVhUmVmID0gdXNlUmVmKCk7XG5cbiAgLy8gTGl2ZSByZWZzIChhdm9pZCBzdGFsZSBjbG9zdXJlcylcbiAgY29uc3QgaXNEcmF3aW5nICAgICAgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBpc1Bhbm5pbmcgICAgICA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBhblN0YXJ0ICAgICAgID0gdXNlUmVmKHsgeDogMCwgeTogMCwgc2Nyb2xsTGVmdDogMCwgc2Nyb2xsVG9wOiAwIH0pO1xuICBjb25zdCBoaXN0b3J5ICAgICAgICA9IHVzZVJlZihbXSk7XG4gIGNvbnN0IGZ1dHVyZSAgICAgICAgID0gdXNlUmVmKFtdKTtcbiAgY29uc3QgYmFzZVNpemVSZWYgICAgPSB1c2VSZWYoMTIpO1xuICBjb25zdCByYXRpb1JlZiAgICAgICA9IHVzZVJlZihSQVRJT1NbMF0pO1xuICBjb25zdCBjb2xvclJlZiAgICAgICA9IHVzZVJlZignIzAwMDAwMCcpO1xuICBjb25zdCBpc0VyYXNlclJlZiAgICA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHNob3dHcmlkUmVmICAgID0gdXNlUmVmKHRydWUpO1xuICBjb25zdCBleHBvcnRHcmlkUmVmICA9IHVzZVJlZih0cnVlKTtcbiAgY29uc3QgYmVhZHNSZWYgICAgICAgPSB1c2VSZWYoeyBjb2xzOiAzMCwgcm93czogNDUgfSk7XG4gIGNvbnN0IGRlbnNpdHlSZWYgICAgID0gdXNlUmVmKDMpO1xuICBjb25zdCB1bml0UmVmICAgICAgICA9IHVzZVJlZignY20nKTtcbiAgY29uc3QgYmdUeXBlUmVmICAgICAgPSB1c2VSZWYoJ3NvbGlkJyk7XG4gIGNvbnN0IGJnQ29sb3JSZWYgICAgID0gdXNlUmVmKCcjZmZmZmZmJyk7XG4gIGNvbnN0IGJnSW1hZ2VSZWYgICAgID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBwZW5kaW5nUGF0dGVybiA9IHVzZVJlZihudWxsKTtcblxuICAvLyBVSSBzdGF0ZVxuICBjb25zdCBbcmF0aW8sIHNldFJhdGlvXSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKFJBVElPU1swXSk7XG4gIGNvbnN0IFtjb2xvciwgc2V0Q29sb3JdICAgICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoJyMwMDAwMDAnKTtcbiAgY29uc3QgW2hleElucHV0LCBzZXRIZXhJbnB1dF0gICAgICAgICAgICAgPSB1c2VTdGF0ZSgnIzAwMDAwMCcpO1xuICBjb25zdCBbaXNFcmFzZXIsIHNldElzRXJhc2VyXSAgICAgICAgICAgICA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dHcmlkLCBzZXRTaG93R3JpZF0gICAgICAgICAgICAgPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2V4cG9ydFdpdGhHcmlkLCBzZXRFeHBvcnRXaXRoR3JpZF0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2NhbnZhc1NpemUsIHNldENhbnZhc1NpemVdICAgICAgICAgPSB1c2VTdGF0ZSh7IHc6IDAsIGg6IDAgfSk7XG4gIGNvbnN0IFtzaG93Q2xlYXJDb25maXJtLCBzZXRTaG93Q2xlYXJDb25maXJtXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2JnVHlwZSwgc2V0QmdUeXBlXSAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnc29saWQnKTtcbiAgY29uc3QgW2JnQ29sb3IsIHNldEJnQ29sb3JdICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnI2ZmZmZmZicpO1xuICBjb25zdCBbYmdIZXgsIHNldEJnSGV4XSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKCcjZmZmZmZmJyk7XG4gIGNvbnN0IFtiZ0ltYWdlLCBzZXRCZ0ltYWdlXSAgICAgICAgICAgICAgID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgLy8gU2V0dXBcbiAgY29uc3QgW3NldHVwVywgc2V0U2V0dXBXXSAgID0gdXNlU3RhdGUoJzEwJyk7XG4gIGNvbnN0IFtzZXR1cEgsIHNldFNldHVwSF0gICA9IHVzZVN0YXRlKCcxNScpO1xuICBjb25zdCBbdW5pdCwgc2V0VW5pdF0gICAgICAgPSB1c2VTdGF0ZSgnY20nKTtcbiAgY29uc3QgW2RlbnNpdHksIHNldERlbnNpdHldID0gdXNlU3RhdGUoMyk7XG5cbiAgLy8gUGF0dGVyblxuICBjb25zdCBbcGF0dGVyblR5cGUsIHNldFBhdHRlcm5UeXBlXSAgID0gdXNlU3RhdGUoJ2dyaWQnKTtcbiAgY29uc3QgW3BhdHRlcm5SVywgc2V0UGF0dGVyblJXXSAgICAgICA9IHVzZVN0YXRlKDIpO1xuICBjb25zdCBbcGF0dGVyblJILCBzZXRQYXR0ZXJuUkhdICAgICAgID0gdXNlU3RhdGUoMik7XG5cbiAgLy8gUGFsZXR0ZXNcbiAgY29uc3QgW3BhbGV0dGVzLCBzZXRQYWxldHRlc10gICAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFthY3RpdmVQYWxldHRlSWQsIHNldEFjdGl2ZVBhbGV0dGVJZF0gICAgID0gdXNlU3RhdGUoJ2RlZmF1bHQnKTtcbiAgY29uc3QgW3Nob3dOZXdQYWxldHRlSW5wdXQsIHNldFNob3dOZXdQYWxldHRlSW5wdXRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbmV3UGFsZXR0ZU5hbWUsIHNldE5ld1BhbGV0dGVOYW1lXSAgICAgICAgID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIOKUgOKUgCBHZW9tZXRyeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBnZXRCZWFkKCkge1xuICAgIGNvbnN0IGJzID0gYmFzZVNpemVSZWYuY3VycmVudDtcbiAgICBjb25zdCByICA9IHJhdGlvUmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgdzogYnMsIGg6IE1hdGgucm91bmQoYnMgKiByLmggLyByLncpIH07XG4gIH1cblxuICBmdW5jdGlvbiBiZWFkc0Zyb21TZXR1cCh3LCBoLCB1LCBkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHM6IE1hdGgubWF4KDIsIE1hdGgucm91bmQocGFyc2VGbG9hdCh3KSAqIFRPX0NNW3VdICogZCkpLFxuICAgICAgcm93czogTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGgpICogVE9fQ01bdV0gKiBkKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBCYWNrZ3JvdW5kIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgIGNvbnN0IGMgPSBiZ1JlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICd0cmFuc3BhcmVudCcpIHJldHVybjtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdzb2xpZCcpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBiZ0NvbG9yUmVmLmN1cnJlbnQ7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIH0gZWxzZSBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdpbWFnZScgJiYgYmdJbWFnZVJlZi5jdXJyZW50KSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgICAgaW1nLnNyYyA9IGJnSW1hZ2VSZWYuY3VycmVudDtcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgRHJhdyBiZWFkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHBhaW50QmVhZChjdHgsIGNvbCwgcm93LCBmaWxsQ29sb3IpIHtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCB4ID0gY29sICogdywgeSA9IHJvdyAqIGg7XG4gICAgY3R4LmNsZWFyUmVjdCh4LCB5LCB3LCBoKTtcbiAgICBpZiAoZmlsbENvbG9yID09PSBudWxsKSByZXR1cm47XG4gICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmVsbGlwc2UoeCArIHcvMiwgeSArIGgvMiwgdy8yIC0gdyowLjA4LCBoLzIgLSBoKjAuMDgsIDAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgLy8g4pSA4pSAIEdyaWQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gZHJhd0dyaWQoKSB7XG4gICAgY29uc3QgYyA9IGdyaWRSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgaWYgKCFzaG93R3JpZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDEzMCwxMTAsOTAsMC40KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDAuNTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBjb2xzOyBpKyspIHsgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKGkqdywwKTsgY3R4LmxpbmVUbyhpKncscm93cypoKTsgY3R4LnN0cm9rZSgpOyB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcm93czsgaSsrKSB7IGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbygwLGkqaCk7IGN0eC5saW5lVG8oY29scyp3LGkqaCk7IGN0eC5zdHJva2UoKTsgfVxuICB9XG5cbiAgLy8g4pSA4pSAIFJ1bGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBkcmF3UnVsZXJzKCkge1xuICAgIGNvbnN0IHsgdzogYncsIGg6IGJoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGQgPSBkZW5zaXR5UmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdSA9IHVuaXRSZWYuY3VycmVudDtcblxuICAgIC8vIEhvdyBtYW55IGJlYWRzIHBlciAxIHVuaXQgKGNtLCBpbmNoLCBldGMuKVxuICAgIGNvbnN0IGJlYWRzUGVyVW5pdCA9IGQgKiBUT19DTVt1XTsgLy8gYmVhZHMgcGVyIHVuaXRcbiAgICAvLyBXZSB3YW50IHRvIGxhYmVsIGV2ZXJ5IHdob2xlIHVuaXQgaW50ZXJ2YWxcbiAgICAvLyBGaW5kIHRpY2sgc3BhY2luZyBpbiBiZWFkczogMSB1bml0ID0gYmVhZHNQZXJVbml0IGJlYWRzXG4gICAgLy8gSWYgYmVhZHNQZXJVbml0IDwgMSwgbGFiZWwgZXZlcnkgMS9iZWFkc1BlclVuaXQgdW5pdHNcbiAgICBjb25zdCB0aWNrRXZlcnkgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGJlYWRzUGVyVW5pdCkpOyAvLyBiZWFkcyBiZXR3ZWVuIGVhY2ggdGlja1xuXG4gICAgZnVuY3Rpb24gdW5pdExhYmVsKGJlYWRJZHgpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGJlYWRJZHggLyBiZWFkc1BlclVuaXQ7XG4gICAgICByZXR1cm4gdmFsICUgMSA9PT0gMCA/IGAke01hdGgucm91bmQodmFsKX0ke3V9YCA6IGAke3ZhbC50b0ZpeGVkKDEpfSR7dX1gO1xuICAgIH1cblxuICAgIC8vIFRPUCBydWxlclxuICAgIGNvbnN0IHRvcCA9IHJ1bGVyVG9wUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHRvcCkge1xuICAgICAgdG9wLndpZHRoID0gY29scyAqIGJ3O1xuICAgICAgdG9wLmhlaWdodCA9IFJVTEVSX1NaO1xuICAgICAgY29uc3QgY3R4ID0gdG9wLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gVC5iZztcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0b3Aud2lkdGgsIHRvcC5oZWlnaHQpO1xuICAgICAgLy8gYm90dG9tIGJvcmRlciBsaW5lXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBULmJvcmRlcjsgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oMCwgUlVMRVJfU1ogLSAxKTsgY3R4LmxpbmVUbyh0b3Aud2lkdGgsIFJVTEVSX1NaIC0gMSk7IGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LmZvbnQgPSAnOXB4IG1vbm9zcGFjZSc7XG4gICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBjb2xzOyBpKyspIHtcbiAgICAgICAgY29uc3QgeCA9IGkgKiBidztcbiAgICAgICAgY29uc3QgaXNNYWpvciA9IChpICUgdGlja0V2ZXJ5ID09PSAwKTtcbiAgICAgICAgY29uc3QgaXNNaWQgICA9IChpICUgTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCh0aWNrRXZlcnkgLyAyKSkgPT09IDApO1xuICAgICAgICBjb25zdCB0SCA9IGlzTWFqb3IgPyAxMCA6IGlzTWlkID8gNiA6IDM7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzTWFqb3IgPyBULm11dGVkIDogVC5ib3JkZXI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBpc01ham9yID8gMSA6IDAuNTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKHggKyAwLjUsIFJVTEVSX1NaIC0gMSk7IGN0eC5saW5lVG8oeCArIDAuNSwgUlVMRVJfU1ogLSAxIC0gdEgpOyBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGlmIChpc01ham9yICYmIGkgPiAwKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFQubXV0ZWQ7XG4gICAgICAgICAgY3R4LmZpbGxUZXh0KHVuaXRMYWJlbChpKSwgeCArIDIsIFJVTEVSX1NaIC0gMTIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTEVGVCBydWxlclxuICAgIGNvbnN0IGxlZnQgPSBydWxlckxlZnRSZWYuY3VycmVudDtcbiAgICBpZiAobGVmdCkge1xuICAgICAgbGVmdC53aWR0aCA9IFJVTEVSX1NaO1xuICAgICAgbGVmdC5oZWlnaHQgPSByb3dzICogYmg7XG4gICAgICBjb25zdCBjdHggPSBsZWZ0LmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gVC5iZztcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBsZWZ0LndpZHRoLCBsZWZ0LmhlaWdodCk7XG4gICAgICAvLyByaWdodCBib3JkZXIgbGluZVxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gVC5ib3JkZXI7IGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKFJVTEVSX1NaIC0gMSwgMCk7IGN0eC5saW5lVG8oUlVMRVJfU1ogLSAxLCBsZWZ0LmhlaWdodCk7IGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LmZvbnQgPSAnOXB4IG1vbm9zcGFjZSc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHJvd3M7IGkrKykge1xuICAgICAgICBjb25zdCB5ID0gaSAqIGJoO1xuICAgICAgICBjb25zdCBpc01ham9yID0gKGkgJSB0aWNrRXZlcnkgPT09IDApO1xuICAgICAgICBjb25zdCBpc01pZCAgID0gKGkgJSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHRpY2tFdmVyeSAvIDIpKSA9PT0gMCk7XG4gICAgICAgIGNvbnN0IHRXID0gaXNNYWpvciA/IDEwIDogaXNNaWQgPyA2IDogMztcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNNYWpvciA/IFQubXV0ZWQgOiBULmJvcmRlcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGlzTWFqb3IgPyAxIDogMC41O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oUlVMRVJfU1ogLSAxLCB5ICsgMC41KTsgY3R4LmxpbmVUbyhSVUxFUl9TWiAtIDEgLSB0VywgeSArIDAuNSk7IGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKGlzTWFqb3IgJiYgaSA+IDApIHtcbiAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBULm11dGVkO1xuICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICBjdHgudHJhbnNsYXRlKFJVTEVSX1NaIC0gMTIsIHkgLSAyKTtcbiAgICAgICAgICBjdHgucm90YXRlKC1NYXRoLlBJIC8gMik7XG4gICAgICAgICAgY3R4LmZpbGxUZXh0KHVuaXRMYWJlbChpKSwgMCwgMCk7XG4gICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBNaW5pLW1hcCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiB1cGRhdGVNaW5pbWFwKCkge1xuICAgIGNvbnN0IG1tID0gbWluaW1hcFJlZi5jdXJyZW50O1xuICAgIGlmICghbW0gfHwgIWRyYXdSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IG1tLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBNSU5JTUFQX1csIE1JTklNQVBfSCk7XG4gICAgLy8gZGFyayBiYWNrZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJztcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgTUlOSU1BUF9XLCBNSU5JTUFQX0gpO1xuICAgIC8vIHNjYWxlIHRvIGZpdFxuICAgIGNvbnN0IHNjYWxlWCA9IE1JTklNQVBfVyAvIGRyYXdSZWYuY3VycmVudC53aWR0aDtcbiAgICBjb25zdCBzY2FsZVkgPSBNSU5JTUFQX0ggLyBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0O1xuICAgIGNvbnN0IHNjYWxlICA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKTtcbiAgICBjb25zdCBvZmZYICAgPSAoTUlOSU1BUF9XIC0gZHJhd1JlZi5jdXJyZW50LndpZHRoICAqIHNjYWxlKSAvIDI7XG4gICAgY29uc3Qgb2ZmWSAgID0gKE1JTklNQVBfSCAtIGRyYXdSZWYuY3VycmVudC5oZWlnaHQgKiBzY2FsZSkgLyAyO1xuICAgIC8vIGRyYXcgYmcgKyBiZWFkc1xuICAgIGlmIChiZ1JlZi5jdXJyZW50KSBjdHguZHJhd0ltYWdlKGJnUmVmLmN1cnJlbnQsICAgb2ZmWCwgb2ZmWSwgZHJhd1JlZi5jdXJyZW50LndpZHRoICogc2NhbGUsIGRyYXdSZWYuY3VycmVudC5oZWlnaHQgKiBzY2FsZSk7XG4gICAgY3R4LmRyYXdJbWFnZShkcmF3UmVmLmN1cnJlbnQsIG9mZlgsIG9mZlksIGRyYXdSZWYuY3VycmVudC53aWR0aCAqIHNjYWxlLCBkcmF3UmVmLmN1cnJlbnQuaGVpZ2h0ICogc2NhbGUpO1xuICAgIC8vIHZpZXdwb3J0IHJlY3RcbiAgICBpZiAoc2Nyb2xsQXJlYVJlZi5jdXJyZW50KSB7XG4gICAgICBjb25zdCBzYSA9IHNjcm9sbEFyZWFSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IHZ4ID0gKHNhLnNjcm9sbExlZnQgLSBQQUQpICogc2NhbGUgKyBvZmZYO1xuICAgICAgY29uc3QgdnkgPSAoc2Euc2Nyb2xsVG9wICAtIFBBRCkgKiBzY2FsZSArIG9mZlk7XG4gICAgICBjb25zdCB2dyA9IHNhLmNsaWVudFdpZHRoICAqIHNjYWxlO1xuICAgICAgY29uc3QgdmggPSBzYS5jbGllbnRIZWlnaHQgKiBzY2FsZTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFQuYWNjZW50O1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHZ4LCB2eSwgdncsIHZoKTtcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ2FudmFzIGluaXQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcbiAgICBjb25zdCBjID0gZHJhd1JlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGMuZ2V0Q29udGV4dCgnMmQnKS5jbGVhclJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIGhpc3RvcnkuY3VycmVudCA9IFtdO1xuICAgIGZ1dHVyZS5jdXJyZW50ICA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKCkge1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNGcm9tU2V0dXAoc2V0dXBXLCBzZXR1cEgsIHVuaXQsIGRlbnNpdHkpO1xuICAgIGJlYWRzUmVmLmN1cnJlbnQgID0geyBjb2xzLCByb3dzIH07XG4gICAgZGVuc2l0eVJlZi5jdXJyZW50ID0gZGVuc2l0eTtcbiAgICB1bml0UmVmLmN1cnJlbnQgICAgPSB1bml0O1xuICAgIGNvbnN0IHsgdywgaCB9ID0gZ2V0QmVhZCgpO1xuICAgIHNldENhbnZhc1NpemUoeyB3OiBjb2xzICogdywgaDogcm93cyAqIGggfSk7XG4gIH1cblxuICAvLyDilIDilIAgSGlzdG9yeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzYXZlSGlzdG9yeSgpIHtcbiAgICBjb25zdCBjID0gZHJhd1JlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGhpc3RvcnkuY3VycmVudC5wdXNoKGMuZ2V0Q29udGV4dCgnMmQnKS5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpKTtcbiAgICBmdXR1cmUuY3VycmVudCA9IFtdO1xuICAgIGlmIChoaXN0b3J5LmN1cnJlbnQubGVuZ3RoID4gNTApIGhpc3RvcnkuY3VycmVudC5zaGlmdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5kbygpIHtcbiAgICBpZiAoIWhpc3RvcnkuY3VycmVudC5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBjID0gZHJhd1JlZi5jdXJyZW50LCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZnV0dXJlLmN1cnJlbnQucHVzaChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KSk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgY3R4LnB1dEltYWdlRGF0YShoaXN0b3J5LmN1cnJlbnQucG9wKCksIDAsIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVkbygpIHtcbiAgICBpZiAoIWZ1dHVyZS5jdXJyZW50Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQsIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBoaXN0b3J5LmN1cnJlbnQucHVzaChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KSk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgY3R4LnB1dEltYWdlRGF0YShmdXR1cmUuY3VycmVudC5wb3AoKSwgMCwgMCk7XG4gIH1cblxuICAvLyDilIDilIAgU2F2ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzYXZlQ2FudmFzKCkge1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0ZW1wLndpZHRoICA9IGRyYXdSZWYuY3VycmVudC53aWR0aDtcbiAgICB0ZW1wLmhlaWdodCA9IGRyYXdSZWYuY3VycmVudC5oZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gdGVtcC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoYmdSZWYuY3VycmVudCwgMCwgMCk7XG4gICAgY3R4LmRyYXdJbWFnZShkcmF3UmVmLmN1cnJlbnQsIDAsIDApO1xuICAgIGlmIChleHBvcnRHcmlkUmVmLmN1cnJlbnQpIGN0eC5kcmF3SW1hZ2UoZ3JpZFJlZi5jdXJyZW50LCAwLCAwKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHRlbXAudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICBhLmRvd25sb2FkID0gJ2JlYWR3b3JrLnBuZyc7XG4gICAgYS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgdmlldzogd2luZG93IH0pKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBNb3VzZSBkcmF3aW5nIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGNlbGxGcm9tRXZlbnQoZSkge1xuICAgIGNvbnN0IHJlY3QgPSBkcmF3UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgY29sID0gTWF0aC5mbG9vcigoZS5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHcpO1xuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoKGUuY2xpZW50WSAtIHJlY3QudG9wKSAgLyBoKTtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKGNvbCA8IDAgfHwgcm93IDwgMCB8fCBjb2wgPj0gY29scyB8fCByb3cgPj0gcm93cykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHsgY29sLCByb3cgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvUGFpbnQoZSkge1xuICAgIGNvbnN0IGNlbGwgPSBjZWxsRnJvbUV2ZW50KGUpO1xuICAgIGlmICghY2VsbCkgcmV0dXJuO1xuICAgIHBhaW50QmVhZChkcmF3UmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKSwgY2VsbC5jb2wsIGNlbGwucm93LCBpc0VyYXNlclJlZi5jdXJyZW50ID8gbnVsbCA6IGNvbG9yUmVmLmN1cnJlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICBpZiAoZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICBzYXZlSGlzdG9yeSgpOyBpc0RyYXdpbmcuY3VycmVudCA9IHRydWU7IGRvUGFpbnQoZSk7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoaXNEcmF3aW5nLmN1cnJlbnQpIHsgZG9QYWludChlKTsgdXBkYXRlTWluaW1hcCgpOyB9XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VVcCgpIHsgaXNEcmF3aW5nLmN1cnJlbnQgPSBmYWxzZTsgfVxuXG4gIC8vIFJpZ2h0LWNsaWNrIGRyYWcgdG8gcGFuIHRoZSBzY3JvbGwgYXJlYVxuICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBcmVhTW91c2VEb3duKGUpIHtcbiAgICBpZiAoZS5idXR0b24gIT09IDIpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaXNQYW5uaW5nLmN1cnJlbnQgPSB0cnVlO1xuICAgIHBhblN0YXJ0LmN1cnJlbnQgPSB7XG4gICAgICB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSxcbiAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbEFyZWFSZWYuY3VycmVudC5zY3JvbGxMZWZ0LFxuICAgICAgc2Nyb2xsVG9wOiAgc2Nyb2xsQXJlYVJlZi5jdXJyZW50LnNjcm9sbFRvcCxcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFyZWFNb3VzZU1vdmUoZSkge1xuICAgIGlmICghaXNQYW5uaW5nLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHBhblN0YXJ0LmN1cnJlbnQueDtcbiAgICBjb25zdCBkeSA9IGUuY2xpZW50WSAtIHBhblN0YXJ0LmN1cnJlbnQueTtcbiAgICBzY3JvbGxBcmVhUmVmLmN1cnJlbnQuc2Nyb2xsTGVmdCA9IHBhblN0YXJ0LmN1cnJlbnQuc2Nyb2xsTGVmdCAtIGR4O1xuICAgIHNjcm9sbEFyZWFSZWYuY3VycmVudC5zY3JvbGxUb3AgID0gcGFuU3RhcnQuY3VycmVudC5zY3JvbGxUb3AgIC0gZHk7XG4gICAgdXBkYXRlTWluaW1hcCgpO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFyZWFNb3VzZVVwKGUpIHtcbiAgICBpZiAoZS5idXR0b24gPT09IDIpIGlzUGFubmluZy5jdXJyZW50ID0gZmFsc2U7XG4gIH1cblxuICAvLyDilIDilIAgRmxvb2QgZmlsbCAoZHJhZyAmIGRyb3ApIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGNlbGxQaXhlbChjdHgsIGNvbCwgcm93KSB7XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgZCA9IGN0eC5nZXRJbWFnZURhdGEoTWF0aC5mbG9vcihjb2wqdyArIHcvMiksIE1hdGguZmxvb3Iocm93KmggKyBoLzIpLCAxLCAxKS5kYXRhO1xuICAgIHJldHVybiBbZFswXSwgZFsxXSwgZFsyXSwgZFszXV07XG4gIH1cblxuICBmdW5jdGlvbiBwaXhlbE1hdGNoKGEsIGIsIHRociA9IDE1KSB7XG4gICAgY29uc3QgYVQgPSBhWzNdIDwgMzAsIGJUID0gYlszXSA8IDMwO1xuICAgIGlmIChhVCAmJiBiVCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGFUICE9PSBiVCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBNYXRoLmFicyhhWzBdLWJbMF0pIDwgdGhyICYmIE1hdGguYWJzKGFbMV0tYlsxXSkgPCB0aHIgJiYgTWF0aC5hYnMoYVsyXS1iWzJdKSA8IHRocjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsb29kRmlsbChzdGFydENvbCwgc3RhcnRSb3csIGZpbGxDb2xvcikge1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQsIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdGFyZ2V0ID0gY2VsbFBpeGVsKGN0eCwgc3RhcnRDb2wsIHN0YXJ0Um93KTtcbiAgICBjb25zdCBbZnIsZmcsZmJdID0gaGV4VG9SZ2IoZmlsbENvbG9yKTtcbiAgICBpZiAocGl4ZWxNYXRjaCh0YXJnZXQsIFtmcixmZyxmYiwyNTVdKSkgcmV0dXJuO1xuICAgIHNhdmVIaXN0b3J5KCk7XG4gICAgY29uc3QgcXVldWUgICA9IFtbc3RhcnRDb2wsIHN0YXJ0Um93XV07XG4gICAgY29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBbY29sLCByb3ddID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGNvbnN0IGtleSA9IGAke2NvbH0sJHtyb3d9YDtcbiAgICAgIGlmICh2aXNpdGVkLmhhcyhrZXkpIHx8IGNvbDwwIHx8IHJvdzwwIHx8IGNvbD49Y29scyB8fCByb3c+PXJvd3MpIGNvbnRpbnVlO1xuICAgICAgdmlzaXRlZC5hZGQoa2V5KTtcbiAgICAgIGlmICghcGl4ZWxNYXRjaChjZWxsUGl4ZWwoY3R4LCBjb2wsIHJvdyksIHRhcmdldCkpIGNvbnRpbnVlO1xuICAgICAgcGFpbnRCZWFkKGN0eCwgY29sLCByb3csIGZpbGxDb2xvcik7XG4gICAgICBxdWV1ZS5wdXNoKFtjb2wrMSxyb3ddLFtjb2wtMSxyb3ddLFtjb2wscm93KzFdLFtjb2wscm93LTFdKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEcm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmMgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCdjb2xvcicpO1xuICAgIGlmICghZmMpIHJldHVybjtcbiAgICBjb25zdCBjZWxsID0gY2VsbEZyb21FdmVudChlKTtcbiAgICBpZiAoY2VsbCkgZmxvb2RGaWxsKGNlbGwuY29sLCBjZWxsLnJvdywgZmMpO1xuICB9XG5cbiAgLy8g4pSA4pSAIEtleWJvYXJkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgIGNvbnN0IGN0cmwgPSBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5O1xuICAgIGlmIChjdHJsICYmIGUua2V5ID09PSAneicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB1bmRvKCk7IH1cbiAgICBpZiAoY3RybCAmJiAoZS5rZXkgPT09ICd5JyB8fCAoZS5zaGlmdEtleSAmJiBlLmtleSA9PT0gJ1onKSkpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyByZWRvKCk7IH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBDb250cm9sIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gYXBwbHlDb2xvcihjKSB7XG4gICAgY29sb3JSZWYuY3VycmVudCA9IGM7IHNldENvbG9yKGMpOyBzZXRIZXhJbnB1dChjKTtcbiAgICBpc0VyYXNlclJlZi5jdXJyZW50ID0gZmFsc2U7IHNldElzRXJhc2VyKGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5UmF0aW8ocikge1xuICAgIHJhdGlvUmVmLmN1cnJlbnQgPSByOyBzZXRSYXRpbyhyKTtcbiAgICBjb25zdCB7IGNvbHMsIHJvd3MgfSA9IGJlYWRzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgYnMgPSBiYXNlU2l6ZVJlZi5jdXJyZW50O1xuICAgIHNldENhbnZhc1NpemUoeyB3OiBjb2xzICogYnMsIGg6IHJvd3MgKiBNYXRoLnJvdW5kKGJzICogci5oIC8gci53KSB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5QmdUeXBlKHR5cGUpIHtcbiAgICBiZ1R5cGVSZWYuY3VycmVudCA9IHR5cGU7IHNldEJnVHlwZSh0eXBlKTsgZHJhd0JhY2tncm91bmQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5QmdDb2xvcihjKSB7XG4gICAgYmdDb2xvclJlZi5jdXJyZW50ID0gYzsgc2V0QmdDb2xvcihjKTsgc2V0QmdIZXgoYyk7XG4gICAgaWYgKGJnVHlwZVJlZi5jdXJyZW50ID09PSAnc29saWQnKSBkcmF3QmFja2dyb3VuZCgpO1xuICB9XG5cbiAgLy8g4pSA4pSAIFBhdHRlcm4gdGlsaW5nIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGFwcGx5UGF0dGVybigpIHtcbiAgICBjb25zdCBzcmMgPSBkcmF3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFzcmMpIHJldHVybjtcbiAgICBjb25zdCBtb3RpZiA9IGNsb25lQ2FudmFzKHNyYyk7XG4gICAgY29uc3QgbVcgPSBtb3RpZi53aWR0aCwgbUggPSBtb3RpZi5oZWlnaHQ7XG4gICAgY29uc3QgclcgPSBNYXRoLm1heCgxLCBwYXJzZUludChwYXR0ZXJuUlcpIHx8IDIpO1xuICAgIGNvbnN0IHJIID0gTWF0aC5tYXgoMSwgcGFyc2VJbnQocGF0dGVyblJIKSB8fCAyKTtcbiAgICBjb25zdCBoYWxmVyA9IE1hdGguZmxvb3IobVcgLyAyKSwgaGFsZkggPSBNYXRoLmZsb29yKG1IIC8gMik7XG5cbiAgICBsZXQgdW5pdEMsIG5ld1csIG5ld0g7XG5cbiAgICBpZiAocGF0dGVyblR5cGUgPT09ICdncmlkJykge1xuICAgICAgdW5pdEMgPSBtb3RpZjsgbmV3VyA9IG1XICogclc7IG5ld0ggPSBtSCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdicmlja19oJykge1xuICAgICAgdW5pdEMgPSBtb3RpZjsgbmV3VyA9IG1XICogclcgKyBoYWxmVzsgbmV3SCA9IG1IICogckg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ2hhbGZkcm9wJykge1xuICAgICAgdW5pdEMgPSBtb3RpZjsgbmV3VyA9IG1XICogclc7IG5ld0ggPSBtSCAqIHJIICsgaGFsZkg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ21pcnJvcl94Jykge1xuICAgICAgdW5pdEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHVuaXRDLndpZHRoID0gbVcgKiAyOyB1bml0Qy5oZWlnaHQgPSBtSDtcbiAgICAgIGNvbnN0IHV4ID0gdW5pdEMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHV4LmRyYXdJbWFnZShtb3RpZiwgMCwgMCk7IHV4LmRyYXdJbWFnZShmbGlwSChtb3RpZiksIG1XLCAwKTtcbiAgICAgIG5ld1cgPSB1bml0Qy53aWR0aCAqIHJXOyBuZXdIID0gbUggKiBySDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnbWlycm9yX3knKSB7XG4gICAgICB1bml0QyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdW5pdEMud2lkdGggPSBtVzsgdW5pdEMuaGVpZ2h0ID0gbUggKiAyO1xuICAgICAgY29uc3QgdXkgPSB1bml0Qy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdXkuZHJhd0ltYWdlKG1vdGlmLCAwLCAwKTsgdXkuZHJhd0ltYWdlKGZsaXBWKG1vdGlmKSwgMCwgbUgpO1xuICAgICAgbmV3VyA9IG1XICogclc7IG5ld0ggPSB1bml0Qy5oZWlnaHQgKiBySDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnbWlycm9yXzQnKSB7XG4gICAgICBjb25zdCBmaCA9IGZsaXBIKG1vdGlmKSwgZnYgPSBmbGlwVihtb3RpZiksIGZodiA9IGZsaXBWKGZoKTtcbiAgICAgIHVuaXRDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB1bml0Qy53aWR0aCA9IG1XICogMjsgdW5pdEMuaGVpZ2h0ID0gbUggKiAyO1xuICAgICAgY29uc3QgdTQgPSB1bml0Qy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdTQuZHJhd0ltYWdlKG1vdGlmLCAwLCAwKTsgdTQuZHJhd0ltYWdlKGZoLCBtVywgMCk7XG4gICAgICB1NC5kcmF3SW1hZ2UoZnYsIDAsIG1IKTsgdTQuZHJhd0ltYWdlKGZodiwgbVcsIG1IKTtcbiAgICAgIG5ld1cgPSB1bml0Qy53aWR0aCAqIHJXOyBuZXdIID0gdW5pdEMuaGVpZ2h0ICogckg7XG4gICAgfVxuXG4gICAgY29uc3QgeyB3OiBidywgaDogYmggfSA9IGdldEJlYWQoKTtcbiAgICBiZWFkc1JlZi5jdXJyZW50ID0geyBjb2xzOiBNYXRoLnJvdW5kKG5ld1cgLyBidyksIHJvd3M6IE1hdGgucm91bmQobmV3SCAvIGJoKSB9O1xuICAgIHBlbmRpbmdQYXR0ZXJuLmN1cnJlbnQgPSB7IHVuaXRDLCBtVywgbUgsIGhhbGZXLCBoYWxmSCwgclcsIHJILCB0eXBlOiBwYXR0ZXJuVHlwZSwgbmV3VywgbmV3SCB9O1xuICAgIHNldENhbnZhc1NpemUoeyB3OiBuZXdXLCBoOiBuZXdIIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUGVuZGluZ1BhdHRlcm4oKSB7XG4gICAgY29uc3QgcCA9IHBlbmRpbmdQYXR0ZXJuLmN1cnJlbnQ7XG4gICAgaWYgKCFwKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gZHJhd1JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBkcmF3UmVmLmN1cnJlbnQud2lkdGgsIGRyYXdSZWYuY3VycmVudC5oZWlnaHQpO1xuICAgIGNvbnN0IHsgdW5pdEMsIG1XLCBtSCwgaGFsZlcsIGhhbGZILCByVywgckgsIHR5cGUgfSA9IHA7XG4gICAgZm9yIChsZXQgcnggPSAwOyByeCA8IHJXOyByeCsrKSB7XG4gICAgICBmb3IgKGxldCByeSA9IDA7IHJ5IDwgckg7IHJ5KyspIHtcbiAgICAgICAgbGV0IG94ID0gcnggKiAodHlwZSA9PT0gJ21pcnJvcl94JyB8fCB0eXBlID09PSAnbWlycm9yXzQnID8gdW5pdEMud2lkdGggIDogbVcpO1xuICAgICAgICBsZXQgb3kgPSByeSAqICh0eXBlID09PSAnbWlycm9yX3knIHx8IHR5cGUgPT09ICdtaXJyb3JfNCcgPyB1bml0Qy5oZWlnaHQgOiBtSCk7XG4gICAgICAgIGlmICh0eXBlID09PSAnYnJpY2tfaCcpICBveCArPSAocnkgJSAyID09PSAxID8gaGFsZlcgOiAwKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdoYWxmZHJvcCcpIG95ICs9IChyeCAlIDIgPT09IDEgPyBoYWxmSCA6IDApO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHVuaXRDLCBveCwgb3kpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBDdXN0b20gcGFsZXR0ZXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3QgYWN0aXZlUGFsZXR0ZSA9IGFjdGl2ZVBhbGV0dGVJZCA9PT0gJ2RlZmF1bHQnXG4gICAgPyBERUZBVUxUX1BBTEVUVEVcbiAgICA6ICgocGFsZXR0ZXMuZmluZChwID0+IHAuaWQgPT09IGFjdGl2ZVBhbGV0dGVJZCkgfHwge30pLmNvbG9ycyB8fCBERUZBVUxUX1BBTEVUVEUpO1xuXG4gIGZ1bmN0aW9uIHNhdmVQYWxldHRlcyh1cGRhdGVkKSB7XG4gICAgc2V0UGFsZXR0ZXModXBkYXRlZCk7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2JlYWR0b29sX3BhbGV0dGVzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpOyB9IGNhdGNoIHt9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQYWxldHRlKCkge1xuICAgIGlmICghbmV3UGFsZXR0ZU5hbWUudHJpbSgpKSByZXR1cm47XG4gICAgY29uc3QgaWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XG4gICAgc2F2ZVBhbGV0dGVzKFsuLi5wYWxldHRlcywgeyBpZCwgbmFtZTogbmV3UGFsZXR0ZU5hbWUudHJpbSgpLCBjb2xvcnM6IFtdIH1dKTtcbiAgICBzZXRBY3RpdmVQYWxldHRlSWQoaWQpO1xuICAgIHNldE5ld1BhbGV0dGVOYW1lKCcnKTsgc2V0U2hvd05ld1BhbGV0dGVJbnB1dChmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQYWxldHRlKGlkKSB7XG4gICAgc2F2ZVBhbGV0dGVzKHBhbGV0dGVzLmZpbHRlcihwID0+IHAuaWQgIT09IGlkKSk7XG4gICAgc2V0QWN0aXZlUGFsZXR0ZUlkKCdkZWZhdWx0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDb2xvclRvUGFsZXR0ZShpZCkge1xuICAgIHNhdmVQYWxldHRlcyhwYWxldHRlcy5tYXAocCA9PlxuICAgICAgcC5pZCA9PT0gaWQgJiYgIXAuY29sb3JzLmluY2x1ZGVzKGNvbG9yUmVmLmN1cnJlbnQpXG4gICAgICAgID8geyAuLi5wLCBjb2xvcnM6IFsuLi5wLmNvbG9ycywgY29sb3JSZWYuY3VycmVudF0gfVxuICAgICAgICA6IHBcbiAgICApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNvbG9yRnJvbVBhbGV0dGUocGlkLCBjb2wpIHtcbiAgICBzYXZlUGFsZXR0ZXMocGFsZXR0ZXMubWFwKHAgPT5cbiAgICAgIHAuaWQgPT09IHBpZCA/IHsgLi4ucCwgY29sb3JzOiBwLmNvbG9ycy5maWx0ZXIoYyA9PiBjICE9PSBjb2wpIH0gOiBwXG4gICAgKSk7XG4gIH1cblxuICAvLyDilIDilIAgRWZmZWN0cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JlYWR0b29sX3BhbGV0dGVzJykgfHwgJ1tdJyk7XG4gICAgICBzZXRQYWxldHRlcyhzYXZlZCk7XG4gICAgfSBjYXRjaCB7fVxuICAgIGNyZWF0ZUNhbnZhcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjYW52YXNTaXplLncgPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHBlbmRpbmdQYXR0ZXJuLmN1cnJlbnQpIHtcbiAgICAgICAgICByZW5kZXJQZW5kaW5nUGF0dGVybigpO1xuICAgICAgICAgIHBlbmRpbmdQYXR0ZXJuLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluaXRDYW52YXMoKTtcbiAgICAgICAgfVxuICAgICAgICBkcmF3QmFja2dyb3VuZCgpO1xuICAgICAgICBkcmF3R3JpZCgpO1xuICAgICAgICBkcmF3UnVsZXJzKCk7XG4gICAgICAgIHVwZGF0ZU1pbmltYXAoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfSwgW2NhbnZhc1NpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4geyBkcmF3R3JpZCgpOyB9LCBbc2hvd0dyaWRdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHsgZHJhd0JhY2tncm91bmQoKTsgc2V0VGltZW91dCh1cGRhdGVNaW5pbWFwLCA1MCk7IH0sIFtiZ1R5cGUsIGJnQ29sb3JdKTtcblxuICAvLyDilIDilIAgRGVyaXZlZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBwcmV2aWV3ID0gYmVhZHNGcm9tU2V0dXAoc2V0dXBXLCBzZXR1cEgsIHVuaXQsIGRlbnNpdHkpO1xuICBjb25zdCBjVyA9IGNhbnZhc1NpemUudyB8fCAxO1xuICBjb25zdCBjSCA9IGNhbnZhc1NpemUuaCB8fCAxO1xuXG4gIC8vIOKUgOKUgCBSZW5kZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwdncnLCBoZWlnaHQ6ICcxMDB2aCcsIG92ZXJmbG93OiAnaGlkZGVuJywgcG9zaXRpb246ICdyZWxhdGl2ZScsIGJhY2tncm91bmQ6IFQuYmcgfX0+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPkJlYWR3b3JrIFN0dWRpbzwvdGl0bGU+XG4gICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBsYXlmYWlyK0Rpc3BsYXk6aXRhbCx3Z2h0QDAsNjAwOzEsNDAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgKiB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cbiAgICAgICAgaHRtbCwgYm9keSB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgfVxuICAgICAgICBpbnB1dCwgc2VsZWN0LCBidXR0b24geyBmb250LWZhbWlseTogbW9ub3NwYWNlOyB9XG4gICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXIgeyB3aWR0aDogNnB4OyBoZWlnaHQ6IDZweDsgfVxuICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHsgYmFja2dyb3VuZDogJHtULmJnfTsgfVxuICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgYmFja2dyb3VuZDogJHtULmJvcmRlcn07IGJvcmRlci1yYWRpdXM6IDNweDsgfVxuICAgICAgICBidXR0b246aG92ZXIgeyBvcGFjaXR5OiAwLjg1OyB9XG4gICAgICAgIGlucHV0W3R5cGU9Y2hlY2tib3hdIHsgYWNjZW50LWNvbG9yOiAke1QuYWNjZW50fTsgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICB7Lyog4pSA4pSAIFNjcm9sbGFibGUgY2FudmFzIGFyZWEg4pSA4pSAICovfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3Njcm9sbEFyZWFSZWZ9XG4gICAgICAgIG9uU2Nyb2xsPXt1cGRhdGVNaW5pbWFwfVxuICAgICAgICBvbk1vdXNlRG93bj17aGFuZGxlU2Nyb2xsQXJlYU1vdXNlRG93bn1cbiAgICAgICAgb25Nb3VzZU1vdmU9e2hhbmRsZVNjcm9sbEFyZWFNb3VzZU1vdmV9XG4gICAgICAgIG9uTW91c2VVcD17aGFuZGxlU2Nyb2xsQXJlYU1vdXNlVXB9XG4gICAgICAgIG9uQ29udGV4dE1lbnU9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsXG4gICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMHZ3IC0gJHtQQU5FTF9XfXB4KWAsIGhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgICBvdmVyZmxvdzogJ2F1dG8nLCBiYWNrZ3JvdW5kOiBULmNhbnZhcyxcbiAgICAgICAgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWdyaWQnLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IGAke1JVTEVSX1NafXB4ICR7Y1d9cHhgLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZVJvd3M6ICAgIGAke1JVTEVSX1NafXB4ICR7Y0h9cHhgLFxuICAgICAgICAgIHBhZGRpbmc6IFBBRCwgZ2FwOiAwLFxuICAgICAgICAgIG1pbldpZHRoOiAnMTAwJScsIG1pbkhlaWdodDogJzEwMCUnLFxuICAgICAgICB9fT5cbiAgICAgICAgICB7LyogQ29ybmVyICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogVC5iZywgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IFBBRCwgbGVmdDogUEFELCB6SW5kZXg6IDUgfX0gLz5cblxuICAgICAgICAgIHsvKiBUb3AgcnVsZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogUEFELCB6SW5kZXg6IDQsIGJhY2tncm91bmQ6IFQuYmcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtydWxlclRvcFJlZn0gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIExlZnQgcnVsZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIGxlZnQ6IFBBRCwgekluZGV4OiA0LCBiYWNrZ3JvdW5kOiBULmJnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17cnVsZXJMZWZ0UmVmfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FudmFzIHN0YWNrICovfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogY1csIGhlaWdodDogY0ggfX1cbiAgICAgICAgICAgIG9uRHJvcD17aGFuZGxlRHJvcH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtiZ1R5cGUgPT09ICd0cmFuc3BhcmVudCcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLCB6SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAncmVwZWF0aW5nLWNvbmljLWdyYWRpZW50KCNhYWEgMCUgMjUlLCAjZmZmIDAlIDUwJSknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnMTZweCAxNnB4JyxcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17YmdSZWZ9ICAgd2lkdGg9e2NXfSBoZWlnaHQ9e2NIfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB6SW5kZXg6IDEgfX0gLz5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtkcmF3UmVmfSB3aWR0aD17Y1d9IGhlaWdodD17Y0h9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMiwgY3Vyc29yOiBpc0VyYXNlciA/ICdjZWxsJyA6ICdjcm9zc2hhaXInIH19XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgICAgICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZVVwfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtncmlkUmVmfSB3aWR0aD17Y1d9IGhlaWdodD17Y0h9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMywgcG9pbnRlckV2ZW50czogJ25vbmUnIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiDilIDilIAgTWluaS1tYXAg4pSA4pSAICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdDogMTAsIGJvdHRvbTogMTAsIHpJbmRleDogMjAsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjMTExJywgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiA0LCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICczcHggNnB4JywgZm9udFNpemU6IDksIGNvbG9yOiBULm11dGVkLCBsZXR0ZXJTcGFjaW5nOiAxLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtULmJvcmRlcn1gIH19PlxuICAgICAgICAgIE9WRVJWSUVXXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Y2FudmFzIHJlZj17bWluaW1hcFJlZn0gd2lkdGg9e01JTklNQVBfV30gaGVpZ2h0PXtNSU5JTUFQX0h9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIFJpZ2h0IHBhbmVsIOKUgOKUgCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIHJpZ2h0OiAwLCB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiBQQU5FTF9XLCBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIGJhY2tncm91bmQ6IFQucGFuZWwsIGNvbG9yOiBULnRleHQsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICB6SW5kZXg6IDEwLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIH19PlxuICAgICAgICB7LyogU2F2ZSDigJQgcHJvbWluZW50IHRvcCBiYXIgKi99XG4gICAgICAgIDxidXR0b24gb25DbGljaz17c2F2ZUNhbnZhc30gc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2I4NzMzMywgI2Q0YTA0MCknLFxuICAgICAgICAgIGNvbG9yOiAnIzFhMTcxNCcsIGZvbnRXZWlnaHQ6IDcwMCwgZm9udFNpemU6IDEzLFxuICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMTNweCAxNnB4JyxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAxLjUsIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgZm9udEZhbWlseTogXCInUGxheWZhaXIgRGlzcGxheScsIHNlcmlmXCIsXG4gICAgICAgIH19PlxuICAgICAgICAgIOKGkyAgU0FWRSBBUlRXT1JLXG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzE0cHggMTJweCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogMTIgfX0+XG4gICAgICAgICAgey8qIFRpdGxlICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogXCInUGxheWZhaXIgRGlzcGxheScsIHNlcmlmXCIsIGZvbnRTaXplOiAxNywgY29sb3I6IFQudGV4dCwgbGV0dGVyU3BhY2luZzogMC41LCBmb250U3R5bGU6ICdpdGFsaWMnIH19PlxuICAgICAgICAgICAgQmVhZHdvcmsgU3R1ZGlvXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FudmFzIHNldHVwICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQ2FudmFzIFNpemVcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpbkJvdHRvbTogNiB9fT5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiV0lEVEhcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMVwiIHN0ZXA9XCIwLjFcIiB2YWx1ZT17c2V0dXBXfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0U2V0dXBXKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiSEVJR0hUXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwLjFcIiBzdGVwPVwiMC4xXCIgdmFsdWU9e3NldHVwSH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNldHVwSChlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlVOSVRcIiBmbGV4PXswLjd9PlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e3VuaXR9IG9uQ2hhbmdlPXtlID0+IHNldFVuaXQoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17eyAuLi5pbnAsIHdpZHRoOiA1MiB9fT5cbiAgICAgICAgICAgICAgICAgIHtVTklUUy5tYXAodSA9PiA8b3B0aW9uIGtleT17dX0+e3V9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiQkVBRCBERU5TSVRZXCI+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e2RlbnNpdHl9IG9uQ2hhbmdlPXtlID0+IHNldERlbnNpdHkoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9IHN0eWxlPXtpbnB9PlxuICAgICAgICAgICAgICAgIHtERU5TSVRZX1BSRVNFVFMubWFwKGQgPT4gPG9wdGlvbiBrZXk9e2QudmFsdWV9IHZhbHVlPXtkLnZhbHVlfT57ZC5sYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogMTEsIG1hcmdpbjogJzZweCAwJyB9fT5cbiAgICAgICAgICAgICAgPSB7cHJldmlldy5jb2xzfSDDlyB7cHJldmlldy5yb3dzfSBiZWFkc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NyZWF0ZUNhbnZhc30gc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyNTM1MjUnLCBjb2xvcjogJyM3ZGFhNmQnLCBib3JkZXI6ICcxcHggc29saWQgIzNhNWEzYScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXJSYWRpdXM6IDMsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIH19PuKcpiBDcmVhdGUgQ2FudmFzPC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIFBhbGV0dGUgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJQYWxldHRlXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXthY3RpdmVQYWxldHRlSWR9IG9uQ2hhbmdlPXtlID0+IHNldEFjdGl2ZVBhbGV0dGVJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uaW5wLCBmbGV4OiAxIH19PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkZWZhdWx0XCI+RGVmYXVsdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHtwYWxldHRlcy5tYXAocCA9PiA8b3B0aW9uIGtleT17cC5pZH0gdmFsdWU9e3AuaWR9PntwLm5hbWV9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd05ld1BhbGV0dGVJbnB1dCghc2hvd05ld1BhbGV0dGVJbnB1dCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIHBhZGRpbmc6ICc1cHggOXB4JywgZmxleFNocmluazogMCB9fT7vvIs8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Nob3dOZXdQYWxldHRlSW5wdXQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYgfX0+XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXtuZXdQYWxldHRlTmFtZX0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3UGFsZXR0ZU5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYWxldHRlIG5hbWXigKZcIiBzdHlsZT17eyAuLi5pbnAsIGZsZXg6IDEgfX1cbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiBlLmtleSA9PT0gJ0VudGVyJyAmJiBhZGRQYWxldHRlKCl9IGF1dG9Gb2N1cyAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YWRkUGFsZXR0ZX0gc3R5bGU9e3sgLi4uY2hpcEJ0bih0cnVlKSwgZmxleFNocmluazogMCB9fT5PSzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7YWN0aXZlUGFsZXR0ZUlkICE9PSAnZGVmYXVsdCcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBtYXJnaW5Cb3R0b206IDYgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBhZGRDb2xvclRvUGFsZXR0ZShhY3RpdmVQYWxldHRlSWQpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIGZsZXg6IDEsIGZvbnRTaXplOiAxMSB9fT7vvIsgQWRkIGN1cnJlbnQgY29sb3I8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRlbGV0ZVBhbGV0dGUoYWN0aXZlUGFsZXR0ZUlkKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBjb2xvcjogJyNjYzc3NzcnLCBmb250U2l6ZTogMTEgfX0+8J+XkSBEZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkNvbG9yXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCwgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBmbGV4U2hyaW5rOiAwLCBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNFcmFzZXIgPyAnI2ZmZicgOiBjb2xvcixcbiAgICAgICAgICAgICAgICBib3JkZXI6IGlzRXJhc2VyID8gJzJweCBzb2xpZCAjY2M3Nzc3JyA6IGAycHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e2hleElucHV0fSBvbkNoYW5nZT17ZSA9PiB7IHNldEhleElucHV0KGUudGFyZ2V0LnZhbHVlKTsgaWYgKC9eI1swLTlhLWZBLUZdezZ9JC8udGVzdChlLnRhcmdldC52YWx1ZSkpIGFwcGx5Q29sb3IoZS50YXJnZXQudmFsdWUpOyB9fVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiIzAwMDAwMFwiIHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6IDMgfX0+XG4gICAgICAgICAgICAgIHthY3RpdmVQYWxldHRlLm1hcChjID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y30gdGl0bGU9e2N9IGRyYWdnYWJsZVxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9e2UgPT4gZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnY29sb3InLCBjKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5Q29sb3IoYyl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAsIGhlaWdodDogMjAsIGJhY2tncm91bmQ6IGMsIGN1cnNvcjogJ2dyYWInLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDIsIGZsZXhTaHJpbms6IDAsIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGNvbG9yID09PSBjICYmICFpc0VyYXNlciA/IGAycHggc29saWQgJHtULmFjY2VudH1gIDogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVQYWxldHRlSWQgIT09ICdkZWZhdWx0JyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17ZSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHJlbW92ZUNvbG9yRnJvbVBhbGV0dGUoYWN0aXZlUGFsZXR0ZUlkLCBjKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTQsIHJpZ2h0OiAtNCwgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM5OTMzMzMnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmb250U2l6ZTogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsIGN1cnNvcjogJ3BvaW50ZXInLCB6SW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgfX0+4pyVPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5tdXRlZCwgZm9udFNpemU6IDEwLCBtYXJnaW5Ub3A6IDUgfX0+XG4gICAgICAgICAgICAgIERyYWcgYSBjb2xvciBvbnRvIHRoZSBjYW52YXMgdG8gZmxvb2QgZmlsbFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIFRvb2wgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJUb29sXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2IH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgaXNFcmFzZXJSZWYuY3VycmVudCA9IGZhbHNlOyBzZXRJc0VyYXNlcihmYWxzZSk7IH19XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bighaXNFcmFzZXIpLCBmbGV4OiAxIH19PuKcjyBEcmF3PC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4geyBpc0VyYXNlclJlZi5jdXJyZW50ID0gdHJ1ZTsgc2V0SXNFcmFzZXIodHJ1ZSk7IH19XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihpc0VyYXNlciksIGZsZXg6IDEgfX0+4oyrIEVyYXNlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogQmVhZCByYXRpbyAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkJlYWQgUmF0aW8gKFc6SClcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XG4gICAgICAgICAgICAgIHtSQVRJT1MubWFwKHIgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLmxhYmVsfSBvbkNsaWNrPXsoKSA9PiBhcHBseVJhdGlvKHIpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihyYXRpby5sYWJlbCA9PT0gci5sYWJlbCksIGZsZXg6IDEgfX0+e3IubGFiZWx9PC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEJhY2tncm91bmQgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJCYWNrZ3JvdW5kXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA1LCBtYXJnaW5Cb3R0b206IDggfX0+XG4gICAgICAgICAgICAgIHtbJ3RyYW5zcGFyZW50Jywnc29saWQnLCdpbWFnZSddLm1hcCh0ID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17dH0gb25DbGljaz17KCkgPT4gYXBwbHlCZ1R5cGUodCl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGJnVHlwZSA9PT0gdCksIGZsZXg6IDEsIGZvbnRTaXplOiAxMSwgcGFkZGluZzogJzVweCA0cHgnIH19Pnt0fTwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2JnVHlwZSA9PT0gJ3NvbGlkJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDI4LCBoZWlnaHQ6IDI4LCBiYWNrZ3JvdW5kOiBiZ0NvbG9yLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IDMsIGZsZXhTaHJpbms6IDAgfX0gLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e2JnSGV4fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4geyBzZXRCZ0hleChlLnRhcmdldC52YWx1ZSk7IGlmICgvXiNbMC05YS1mQS1GXXs2fSQvLnRlc3QoZS50YXJnZXQudmFsdWUpKSBhcHBseUJnQ29sb3IoZS50YXJnZXQudmFsdWUpOyB9fVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2JnVHlwZSA9PT0gJ2ltYWdlJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9wbmdcIlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGJnSW1hZ2VSZWYuY3VycmVudCA9IGV2LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0QmdJbWFnZShldi50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICBiZ1R5cGVSZWYuY3VycmVudCA9ICdpbWFnZSc7IHNldEJnVHlwZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICBkcmF3QmFja2dyb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbnAsIGN1cnNvcjogJ3BvaW50ZXInIH19IC8+XG4gICAgICAgICAgICAgICAge2JnSW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IGJnSW1hZ2VSZWYuY3VycmVudCA9IG51bGw7IHNldEJnSW1hZ2UobnVsbCk7IGFwcGx5QmdUeXBlKCdzb2xpZCcpOyB9fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgbWFyZ2luVG9wOiA2LCB3aWR0aDogJzEwMCUnLCBmb250U2l6ZTogMTEgfX0+UmVtb3ZlIGltYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBSZXBlYXQgcGF0dGVybiAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlJlcGVhdCBQYXR0ZXJuXCI+XG4gICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJQQVRURVJOIFRZUEVcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17cGF0dGVyblR5cGV9IG9uQ2hhbmdlPXtlID0+IHNldFBhdHRlcm5UeXBlKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0+XG4gICAgICAgICAgICAgICAge1JFUEVBVF9QQVRURVJOUy5tYXAocCA9PiA8b3B0aW9uIGtleT17cC52YWx1ZX0gdmFsdWU9e3AudmFsdWV9PntwLmxhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpblRvcDogNiB9fT5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUkVQRUFUIFdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCIxMFwiIHZhbHVlPXtwYXR0ZXJuUld9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRQYXR0ZXJuUlcoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJSRVBFQVQgSFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjEwXCIgdmFsdWU9e3BhdHRlcm5SSH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFBhdHRlcm5SSChlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YXBwbHlQYXR0ZXJufSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzIyMjg0MCcsIGNvbG9yOiAnIzg4OTljYycsIGJvcmRlcjogJzFweCBzb2xpZCAjM2EzZDYwJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlclJhZGl1czogMywgd2lkdGg6ICcxMDAlJywgZm9udFNpemU6IDEyLCBtYXJnaW5Ub3A6IDgsXG4gICAgICAgICAgICB9fT7in7MgQXBwbHkgUmVwZWF0PC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEdyaWQgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJHcmlkXCI+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6IDEyLCBtYXJnaW5Cb3R0b206IDUgfX0+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzaG93R3JpZH0gb25DaGFuZ2U9eygpID0+IHsgY29uc3QgbiA9ICFzaG93R3JpZFJlZi5jdXJyZW50OyBzaG93R3JpZFJlZi5jdXJyZW50ID0gbjsgc2V0U2hvd0dyaWQobik7IGRyYXdHcmlkKCk7IH19IC8+XG4gICAgICAgICAgICAgIFNob3cgZ3JpZCB3aGlsZSBkcmF3aW5nXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCwgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAxMiB9fT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e2V4cG9ydFdpdGhHcmlkfSBvbkNoYW5nZT17KCkgPT4geyBleHBvcnRHcmlkUmVmLmN1cnJlbnQgPSAhZXhwb3J0R3JpZFJlZi5jdXJyZW50OyBzZXRFeHBvcnRXaXRoR3JpZChleHBvcnRHcmlkUmVmLmN1cnJlbnQpOyB9fSAvPlxuICAgICAgICAgICAgICBJbmNsdWRlIGdyaWQgaW4gZXhwb3J0XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBBY3Rpb25zICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q2xlYXJDb25maXJtKHRydWUpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBULnNlY3Rpb24sIGNvbG9yOiAnI2NjNzc3NycsIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMywgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMiwgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICB9fT7inJUgQ2xlYXIgY2FudmFzPC9idXR0b24+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5tdXRlZCwgZm9udFNpemU6IDExLCBwYWRkaW5nOiAnNnB4IDJweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAgfX0+XG4gICAgICAgICAgICBDdHJsK1ogIHVuZG8gIMK3ICBDdHJsK1kgIHJlZG9cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIOKUgOKUgCBDbGVhciBjb25maXJtYXRpb24g4pSA4pSAICovfVxuICAgICAge3Nob3dDbGVhckNvbmZpcm0gJiYgKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjcyKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCB6SW5kZXg6IDEwMCxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogVC5wYW5lbCwgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogNiwgcGFkZGluZzogMjgsIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDEwcHggNDBweCByZ2JhKDAsMCwwLDAuNiknLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiBcIidQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWZcIiwgZm9udFNpemU6IDE4LCBjb2xvcjogVC50ZXh0LCBtYXJnaW5Cb3R0b206IDggfX0+XG4gICAgICAgICAgICAgIENsZWFyIGNhbnZhcz9cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiBULm11dGVkLCBtYXJnaW5Cb3R0b206IDIwIH19PlxuICAgICAgICAgICAgICBBbGwgeW91ciB3b3JrIHdpbGwgYmUgZXJhc2VkLiBUaGlzIGNhbm5vdCBiZSB1bmRvbmUuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDEwIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dDbGVhckNvbmZpcm0oZmFsc2UpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBmbGV4OiAxLCBwYWRkaW5nOiAnOHB4JyB9fT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2F2ZUhpc3RvcnkoKTsgaW5pdENhbnZhcygpOyBkcmF3QmFja2dyb3VuZCgpOyBkcmF3R3JpZCgpO1xuICAgICAgICAgICAgICAgIHNldFNob3dDbGVhckNvbmZpcm0oZmFsc2UpO1xuICAgICAgICAgICAgICB9fSBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc4cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjNWExYTFhJywgY29sb3I6ICcjZmZhYWFhJywgYm9yZGVyOiAnMXB4IHNvbGlkICM4YTMwMzAnLCBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICAgIH19PkNsZWFyPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl19 */\n/*@ sourceURL=W:\\Madhura\\Morii\\beadwork tool\\code\\pages\\index.js */")), __jsx("div", {
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
      lineNumber: 720
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
      lineNumber: 732
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
      lineNumber: 740
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
      lineNumber: 743
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
      lineNumber: 744
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
      lineNumber: 748
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
      lineNumber: 749
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
      lineNumber: 753
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
      lineNumber: 759
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
      lineNumber: 765
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
      cursor: isEraser ? 'cell' : 'crosshair'
    },
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 766
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
      lineNumber: 773
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
      lineNumber: 780
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
      lineNumber: 786
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
      lineNumber: 789
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
      lineNumber: 793
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
      lineNumber: 802
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
      lineNumber: 813
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
      lineNumber: 815
    },
    __self: this
  }, "Beadwork Studio"), __jsx(Section, {
    title: "Canvas Size",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 820
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
      lineNumber: 821
    },
    __self: this
  }, __jsx(Field, {
    label: "WIDTH",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 822
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
      lineNumber: 823
    },
    __self: this
  })), __jsx(Field, {
    label: "HEIGHT",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 826
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
      lineNumber: 827
    },
    __self: this
  })), __jsx(Field, {
    label: "UNIT",
    flex: 0.7,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 830
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
      lineNumber: 831
    },
    __self: this
  }, UNITS.map(function (u) {
    return __jsx("option", {
      key: u,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 832
      },
      __self: this
    }, u);
  })))), __jsx(Field, {
    label: "BEAD DENSITY",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 836
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
      lineNumber: 837
    },
    __self: this
  }, DENSITY_PRESETS.map(function (d) {
    return __jsx("option", {
      key: d.value,
      value: d.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 838
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
      lineNumber: 841
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
      lineNumber: 844
    },
    __self: this
  }, "\u2726 Create Canvas")), __jsx(Section, {
    title: "Palette",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851
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
      lineNumber: 852
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
      lineNumber: 853
    },
    __self: this
  }, __jsx("option", {
    value: "default",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 855
    },
    __self: this
  }, "Default"), palettes.map(function (p) {
    return __jsx("option", {
      key: p.id,
      value: p.id,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 856
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
      lineNumber: 858
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
      lineNumber: 862
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
      lineNumber: 863
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
      lineNumber: 866
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
      lineNumber: 870
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
      lineNumber: 871
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
      lineNumber: 873
    },
    __self: this
  }, "\uD83D\uDDD1 Delete"))), __jsx(Section, {
    title: "Color",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 880
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
      lineNumber: 881
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
      lineNumber: 882
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
      lineNumber: 887
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
      lineNumber: 890
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
        lineNumber: 892
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
        lineNumber: 902
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
      lineNumber: 913
    },
    __self: this
  }, "Drag a color onto the canvas to flood fill")), __jsx(Section, {
    title: "Tool",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 919
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
      lineNumber: 920
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
      lineNumber: 921
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
      lineNumber: 923
    },
    __self: this
  }, "\u232B Erase"))), __jsx(Section, {
    title: "Bead Ratio (W:H)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 929
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
      lineNumber: 930
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
        lineNumber: 932
      },
      __self: this
    }, r.label);
  }))), __jsx(Section, {
    title: "Background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 939
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
      lineNumber: 940
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
        lineNumber: 942
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
      lineNumber: 947
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
      lineNumber: 948
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
      lineNumber: 949
    },
    __self: this
  })), bgType === 'image' && __jsx("div", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 955
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
      lineNumber: 956
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
      lineNumber: 971
    },
    __self: this
  }, "Remove image"))), __jsx(Section, {
    title: "Repeat Pattern",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 979
    },
    __self: this
  }, __jsx(Field, {
    label: "PATTERN TYPE",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 980
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
      lineNumber: 981
    },
    __self: this
  }, REPEAT_PATTERNS.map(function (p) {
    return __jsx("option", {
      key: p.value,
      value: p.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 982
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
      lineNumber: 985
    },
    __self: this
  }, __jsx(Field, {
    label: "REPEAT W",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 986
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
      lineNumber: 987
    },
    __self: this
  })), __jsx(Field, {
    label: "REPEAT H",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 990
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
      lineNumber: 991
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
      lineNumber: 995
    },
    __self: this
  }, "\u27F3 Apply Repeat")), __jsx(Section, {
    title: "Grid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1002
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
      lineNumber: 1003
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
      lineNumber: 1004
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
      lineNumber: 1007
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
      lineNumber: 1008
    },
    __self: this
  }), "Include grid in export")), __jsx(Section, {
    title: "Actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1014
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
      lineNumber: 1015
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
      lineNumber: 1021
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
      lineNumber: 1029
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
      lineNumber: 1033
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
      lineNumber: 1038
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
      lineNumber: 1041
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
      lineNumber: 1044
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
      lineNumber: 1045
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
      lineNumber: 1047
    },
    __self: this
  }, "Clear")))));
}

/***/ })

})
//# sourceMappingURL=index.js.5e5ff763862830d4ea0e.hot-update.js.map