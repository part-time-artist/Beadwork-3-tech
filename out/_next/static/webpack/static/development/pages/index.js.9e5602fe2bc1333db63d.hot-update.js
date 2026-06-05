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
    var u = unitRef.current;

    function label(i) {
      var val = i / d / TO_CM[u];
      return val % 1 === 0 ? "".concat(val) : val.toFixed(1);
    }

    var top = rulerTopRef.current;

    if (top) {
      top.width = cols * bw;
      top.height = RULER_SZ;
      var ctx = top.getContext('2d');
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, top.width, top.height);

      for (var i = 0; i <= cols; i++) {
        var x = i * bw;
        var major = i % 10 === 0,
            mid = i % 5 === 0;
        var tH = major ? 10 : mid ? 7 : 4;
        ctx.strokeStyle = major ? T.muted : T.border;
        ctx.lineWidth = major ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(x, RULER_SZ);
        ctx.lineTo(x, RULER_SZ - tH);
        ctx.stroke();

        if (major && i > 0) {
          ctx.fillStyle = T.muted;
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText("".concat(i, "(").concat(label(i)).concat(u, ")"), x, RULER_SZ - 12);
        }
      }
    }

    var left = rulerLeftRef.current;

    if (left) {
      left.width = RULER_SZ;
      left.height = rows * bh;

      var _ctx = left.getContext('2d');

      _ctx.fillStyle = T.bg;

      _ctx.fillRect(0, 0, left.width, left.height);

      for (var _i2 = 0; _i2 <= rows; _i2++) {
        var y = _i2 * bh;

        var _major = _i2 % 10 === 0,
            _mid = _i2 % 5 === 0;

        var tW = _major ? 10 : _mid ? 7 : 4;
        _ctx.strokeStyle = _major ? T.muted : T.border;
        _ctx.lineWidth = _major ? 1 : 0.5;

        _ctx.beginPath();

        _ctx.moveTo(RULER_SZ, y);

        _ctx.lineTo(RULER_SZ - tW, y);

        _ctx.stroke();

        if (_major && _i2 > 0) {
          _ctx.save();

          _ctx.fillStyle = T.muted;
          _ctx.font = '8px monospace';
          _ctx.textAlign = 'center';

          _ctx.translate(RULER_SZ - 12, y);

          _ctx.rotate(-Math.PI / 2);

          _ctx.fillText("".concat(_i2), 0, 0);

          _ctx.restore();
        }
      }
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
    if (isDrawing.current) doPaint(e);
  }

  function handleMouseUp() {
    isDrawing.current = false;
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
      }, 0);
    }
  }, [canvasSize]);
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    drawGrid();
  }, [showGrid]);
  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    drawBackground();
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
      lineNumber: 616
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 617
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 618
    },
    __self: this
  }, "Beadwork Studio"), __jsx("link", {
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&display=swap",
    rel: "stylesheet",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 619
    },
    __self: this
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
    id: "664782124",
    __self: this
  }, "*{box-sizing:border-box;}html,body{margin:0;padding:0;font-family:monospace;}input,select,button{font-family:monospace;}::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track{background:".concat(T.bg, ";}::-webkit-scrollbar-thumb{background:").concat(T.border, ";border-radius:3px;}button:hover{opacity:0.85;}input[type=checkbox]{accent-color:").concat(T.accent, ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlc6XFxNYWRodXJhXFxNb3JpaVxcYmVhZHdvcmsgdG9vbFxcY29kZVxccGFnZXNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRtQnlCLEFBRWtDLEFBQ0osQUFDd0IsQUFDZCxBQUNvQyxBQUNBLEFBQ3hDLEFBQ3FDLFNBTmhDLENBRVcsR0FHZixNQUwyQixFQUVYLENBSGxCLEFBRW9CLGtCQUVzQixBQUNrQixDQUo5QixDQU1TLGdCQUZzQiIsImZpbGUiOiJXOlxcTWFkaHVyYVxcTW9yaWlcXGJlYWR3b3JrIHRvb2xcXGNvZGVcXHBhZ2VzXFxpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuXG4vLyDilIDilIAgQ29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBSQVRJT1MgPSBbXG4gIHsgbGFiZWw6ICcxOjEnLCB3OiAxLCBoOiAxIH0sXG4gIHsgbGFiZWw6ICcyOjMnLCB3OiAyLCBoOiAzIH0sXG4gIHsgbGFiZWw6ICczOjQnLCB3OiAzLCBoOiA0IH0sXG5dO1xuXG5jb25zdCBVTklUUyA9IFsnbW0nLCAnY20nLCAnaW5jaCcsICdtJ107XG5jb25zdCBUT19DTSA9IHsgbW06IDAuMSwgY206IDEsIGluY2g6IDIuNTQsIG06IDEwMCB9O1xuXG5jb25zdCBERU5TSVRZX1BSRVNFVFMgPSBbXG4gIHsgbGFiZWw6ICdFeHRyYSBmaW5lICg1L2NtKScsIHZhbHVlOiA1IH0sXG4gIHsgbGFiZWw6ICdGaW5lICg0L2NtKScsICAgICAgIHZhbHVlOiA0IH0sXG4gIHsgbGFiZWw6ICdNZWRpdW0gKDMvY20pJywgICAgIHZhbHVlOiAzIH0sXG4gIHsgbGFiZWw6ICdDb2Fyc2UgKDIvY20pJywgICAgIHZhbHVlOiAyIH0sXG5dO1xuXG5jb25zdCBSRVBFQVRfUEFUVEVSTlMgPSBbXG4gIHsgdmFsdWU6ICdncmlkJywgICAgIGxhYmVsOiAnR3JpZCAoc3RyYWlnaHQpJyB9LFxuICB7IHZhbHVlOiAnYnJpY2tfaCcsICBsYWJlbDogJ0JyaWNrIChob3Jpem9udGFsKScgfSxcbiAgeyB2YWx1ZTogJ2hhbGZkcm9wJywgbGFiZWw6ICdIYWxmLWRyb3AgKHZlcnRpY2FsKScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl94JywgbGFiZWw6ICdNaXJyb3IgWCcgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl95JywgbGFiZWw6ICdNaXJyb3IgWScgfSxcbiAgeyB2YWx1ZTogJ21pcnJvcl80JywgbGFiZWw6ICc0LXdheSBNaXJyb3InIH0sXG5dO1xuXG5jb25zdCBERUZBVUxUX1BBTEVUVEUgPSBbXG4gICcjMDAwMDAwJywnIzExMTExMScsJyMzMzMzMzMnLCcjNTU1NTU1JywnIzc3Nzc3NycsJyM5OTk5OTknLCcjYWFhYWFhJywnI2NjY2NjYycsJyNlNWU1ZTUnLCcjZmZmZmZmJyxcbiAgJyNmZjAwMDAnLCcjY2MwMDAwJywnIzk5MDAwMCcsJyNmZjQ0NDQnLCcjZmY5OTk5JywnI2ZmY2NjYycsXG4gICcjZmY2NjAwJywnI2ZmODgwMCcsJyNmZmFhMDAnLCcjZmZjYzAwJywnI2ZmZGQ4OCcsXG4gICcjZmZmZjAwJywnI2RkZGQwMCcsJyNhYWFhMDAnLCcjZmZmZjk5JyxcbiAgJyMwMGNjMDAnLCcjMDA5OTAwJywnIzAwNjYwMCcsJyMwMDMzMDAnLCcjNDRkZDQ0JywnIzk5ZWU5OScsJyNjY2ZmY2MnLCcjMDBhYTU1JyxcbiAgJyMwMGNjY2MnLCcjMDA5OTk5JywnIzAwNjY2NicsJyNhYWZmZmYnLFxuICAnIzAwMDBmZicsJyMwMDAwY2MnLCcjMDAwMDk5JywnIzAwNjZmZicsJyMwMDk5ZmYnLCcjNDRhYWZmJywnIzk5Y2NmZicsJyNjY2U1ZmYnLFxuICAnIzY2MDBjYycsJyM5OTAwZmYnLCcjY2M0NGZmJywnI2VlY2NmZicsJyMzMzAwNjYnLFxuICAnI2ZmMDBmZicsJyNmZjQ0YmInLCcjZmY4OGRkJywnI2ZmY2NlZScsJyNjYzAwNjYnLCcjZmYwMDY2JyxcbiAgJyM0ZDI2MDAnLCcjN2EzZDAwJywnI2EwNWMwMCcsJyNjOThhM2EnLCcjZGRiODgyJywnI2YwZDBhOCcsJyNmNWU2ZDAnLFxuXTtcblxuY29uc3QgUEFORUxfVyAgICA9IDI5MDtcbmNvbnN0IFJVTEVSX1NaICAgPSAyNDtcbmNvbnN0IFBBRCAgICAgICAgPSAyMDtcbmNvbnN0IE1JTklNQVBfVyAgPSAxODA7XG5jb25zdCBNSU5JTUFQX0ggID0gMTQwO1xuXG4vLyDilIDilIAgVGhlbWUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IFQgPSB7XG4gIGJnOiAgICAgICcjMWExNzE0JyxcbiAgcGFuZWw6ICAgJyMxZTFhMTcnLFxuICBzZWN0aW9uOiAnIzI1MWYxYScsXG4gIGFjY2VudDogICcjYzg5NTZjJyxcbiAgdGV4dDogICAgJyNlOGRkZDQnLFxuICBtdXRlZDogICAnIzhhNzA2MCcsXG4gIGJvcmRlcjogICcjM2EzMDI4JyxcbiAgY2FudmFzOiAgJyMyYTI0MjAnLFxufTtcblxuLy8g4pSA4pSAIFN0eWxlIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGNoaXBCdG4oYWN0aXZlLCBleHRyYSkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/IFQuYWNjZW50IDogVC5zZWN0aW9uLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnIzFhMTcxNCcgOiBULnRleHQsXG4gICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7YWN0aXZlID8gVC5hY2NlbnQgOiBULmJvcmRlcn1gLFxuICAgIHBhZGRpbmc6ICc1cHggMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlclJhZGl1czogMywgZm9udFNpemU6IDEyLFxuICAgIC4uLmV4dHJhLFxuICB9O1xufVxuXG5jb25zdCBpbnAgPSB7XG4gIGJhY2tncm91bmQ6IFQuc2VjdGlvbiwgY29sb3I6IFQudGV4dCxcbiAgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgcGFkZGluZzogJzVweCA4cHgnLCBib3JkZXJSYWRpdXM6IDMsXG4gIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogMTIsIHdpZHRoOiAnMTAwJScsXG59O1xuXG4vLyDilIDilIAgVXRpbGl0eSBmdW5jdGlvbnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICByZXR1cm4gW3BhcnNlSW50KGhleC5zbGljZSgxLDMpLDE2KSwgcGFyc2VJbnQoaGV4LnNsaWNlKDMsNSksMTYpLCBwYXJzZUludChoZXguc2xpY2UoNSw3KSwxNildO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNhbnZhcyhzcmMpIHtcbiAgY29uc3QgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjLndpZHRoID0gc3JjLndpZHRoOyBjLmhlaWdodCA9IHNyYy5oZWlnaHQ7XG4gIGMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGZsaXBIKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICBjdHgudHJhbnNsYXRlKHNyYy53aWR0aCwgMCk7IGN0eC5zY2FsZSgtMSwgMSk7IGN0eC5kcmF3SW1hZ2Uoc3JjLCAwLCAwKTtcbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGZsaXBWKHNyYykge1xuICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGMud2lkdGggPSBzcmMud2lkdGg7IGMuaGVpZ2h0ID0gc3JjLmhlaWdodDtcbiAgY29uc3QgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICBjdHgudHJhbnNsYXRlKDAsIHNyYy5oZWlnaHQpOyBjdHguc2NhbGUoMSwgLTEpOyBjdHguZHJhd0ltYWdlKHNyYywgMCwgMCk7XG4gIHJldHVybiBjO1xufVxuXG4vLyDilIDilIAgU3ViLWNvbXBvbmVudHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFNlY3Rpb24oeyB0aXRsZSwgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogVC5zZWN0aW9uLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IDQsIHBhZGRpbmc6ICcxMHB4IDEwcHgnIH19PlxuICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogVC5hY2NlbnQsIGZvbnRTaXplOiAxMCwgbGV0dGVyU3BhY2luZzogMS41LCBtYXJnaW5Cb3R0b206IDgsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvZGl2PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWVsZCh7IGxhYmVsLCBjaGlsZHJlbiwgZmxleCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBmbGV4OiBmbGV4IHx8IDEgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogOSwgbWFyZ2luQm90dG9tOiAzLCBsZXR0ZXJTcGFjaW5nOiAxIH19PntsYWJlbH08L2Rpdj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLy8g4pSA4pSAIE1haW4gY29tcG9uZW50IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBiZ1JlZiAgICAgICAgPSB1c2VSZWYoKTtcbiAgY29uc3QgZHJhd1JlZiAgICAgID0gdXNlUmVmKCk7XG4gIGNvbnN0IGdyaWRSZWYgICAgICA9IHVzZVJlZigpO1xuICBjb25zdCBydWxlclRvcFJlZiAgPSB1c2VSZWYoKTtcbiAgY29uc3QgcnVsZXJMZWZ0UmVmID0gdXNlUmVmKCk7XG4gIGNvbnN0IG1pbmltYXBSZWYgICA9IHVzZVJlZigpO1xuICBjb25zdCBzY3JvbGxBcmVhUmVmID0gdXNlUmVmKCk7XG5cbiAgLy8gTGl2ZSByZWZzIChhdm9pZCBzdGFsZSBjbG9zdXJlcylcbiAgY29uc3QgaXNEcmF3aW5nICAgICAgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBpc1Bhbm5pbmcgICAgICA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBhblN0YXJ0ICAgICAgID0gdXNlUmVmKHsgeDogMCwgeTogMCwgc2Nyb2xsTGVmdDogMCwgc2Nyb2xsVG9wOiAwIH0pO1xuICBjb25zdCBoaXN0b3J5ICAgICAgICA9IHVzZVJlZihbXSk7XG4gIGNvbnN0IGZ1dHVyZSAgICAgICAgID0gdXNlUmVmKFtdKTtcbiAgY29uc3QgYmFzZVNpemVSZWYgICAgPSB1c2VSZWYoMTIpO1xuICBjb25zdCByYXRpb1JlZiAgICAgICA9IHVzZVJlZihSQVRJT1NbMF0pO1xuICBjb25zdCBjb2xvclJlZiAgICAgICA9IHVzZVJlZignIzAwMDAwMCcpO1xuICBjb25zdCBpc0VyYXNlclJlZiAgICA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHNob3dHcmlkUmVmICAgID0gdXNlUmVmKHRydWUpO1xuICBjb25zdCBleHBvcnRHcmlkUmVmICA9IHVzZVJlZih0cnVlKTtcbiAgY29uc3QgYmVhZHNSZWYgICAgICAgPSB1c2VSZWYoeyBjb2xzOiAzMCwgcm93czogNDUgfSk7XG4gIGNvbnN0IGRlbnNpdHlSZWYgICAgID0gdXNlUmVmKDMpO1xuICBjb25zdCB1bml0UmVmICAgICAgICA9IHVzZVJlZignY20nKTtcbiAgY29uc3QgYmdUeXBlUmVmICAgICAgPSB1c2VSZWYoJ3NvbGlkJyk7XG4gIGNvbnN0IGJnQ29sb3JSZWYgICAgID0gdXNlUmVmKCcjZmZmZmZmJyk7XG4gIGNvbnN0IGJnSW1hZ2VSZWYgICAgID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBwZW5kaW5nUGF0dGVybiA9IHVzZVJlZihudWxsKTtcblxuICAvLyBVSSBzdGF0ZVxuICBjb25zdCBbcmF0aW8sIHNldFJhdGlvXSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKFJBVElPU1swXSk7XG4gIGNvbnN0IFtjb2xvciwgc2V0Q29sb3JdICAgICAgICAgICAgICAgICAgID0gdXNlU3RhdGUoJyMwMDAwMDAnKTtcbiAgY29uc3QgW2hleElucHV0LCBzZXRIZXhJbnB1dF0gICAgICAgICAgICAgPSB1c2VTdGF0ZSgnIzAwMDAwMCcpO1xuICBjb25zdCBbaXNFcmFzZXIsIHNldElzRXJhc2VyXSAgICAgICAgICAgICA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dHcmlkLCBzZXRTaG93R3JpZF0gICAgICAgICAgICAgPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2V4cG9ydFdpdGhHcmlkLCBzZXRFeHBvcnRXaXRoR3JpZF0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2NhbnZhc1NpemUsIHNldENhbnZhc1NpemVdICAgICAgICAgPSB1c2VTdGF0ZSh7IHc6IDAsIGg6IDAgfSk7XG4gIGNvbnN0IFtzaG93Q2xlYXJDb25maXJtLCBzZXRTaG93Q2xlYXJDb25maXJtXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2JnVHlwZSwgc2V0QmdUeXBlXSAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnc29saWQnKTtcbiAgY29uc3QgW2JnQ29sb3IsIHNldEJnQ29sb3JdICAgICAgICAgICAgICAgPSB1c2VTdGF0ZSgnI2ZmZmZmZicpO1xuICBjb25zdCBbYmdIZXgsIHNldEJnSGV4XSAgICAgICAgICAgICAgICAgICA9IHVzZVN0YXRlKCcjZmZmZmZmJyk7XG4gIGNvbnN0IFtiZ0ltYWdlLCBzZXRCZ0ltYWdlXSAgICAgICAgICAgICAgID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgLy8gU2V0dXBcbiAgY29uc3QgW3NldHVwVywgc2V0U2V0dXBXXSAgID0gdXNlU3RhdGUoJzEwJyk7XG4gIGNvbnN0IFtzZXR1cEgsIHNldFNldHVwSF0gICA9IHVzZVN0YXRlKCcxNScpO1xuICBjb25zdCBbdW5pdCwgc2V0VW5pdF0gICAgICAgPSB1c2VTdGF0ZSgnY20nKTtcbiAgY29uc3QgW2RlbnNpdHksIHNldERlbnNpdHldID0gdXNlU3RhdGUoMyk7XG5cbiAgLy8gUGF0dGVyblxuICBjb25zdCBbcGF0dGVyblR5cGUsIHNldFBhdHRlcm5UeXBlXSAgID0gdXNlU3RhdGUoJ2dyaWQnKTtcbiAgY29uc3QgW3BhdHRlcm5SVywgc2V0UGF0dGVyblJXXSAgICAgICA9IHVzZVN0YXRlKDIpO1xuICBjb25zdCBbcGF0dGVyblJILCBzZXRQYXR0ZXJuUkhdICAgICAgID0gdXNlU3RhdGUoMik7XG5cbiAgLy8gUGFsZXR0ZXNcbiAgY29uc3QgW3BhbGV0dGVzLCBzZXRQYWxldHRlc10gICAgICAgICAgICAgICAgICAgPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFthY3RpdmVQYWxldHRlSWQsIHNldEFjdGl2ZVBhbGV0dGVJZF0gICAgID0gdXNlU3RhdGUoJ2RlZmF1bHQnKTtcbiAgY29uc3QgW3Nob3dOZXdQYWxldHRlSW5wdXQsIHNldFNob3dOZXdQYWxldHRlSW5wdXRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbmV3UGFsZXR0ZU5hbWUsIHNldE5ld1BhbGV0dGVOYW1lXSAgICAgICAgID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIOKUgOKUgCBHZW9tZXRyeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBnZXRCZWFkKCkge1xuICAgIGNvbnN0IGJzID0gYmFzZVNpemVSZWYuY3VycmVudDtcbiAgICBjb25zdCByICA9IHJhdGlvUmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgdzogYnMsIGg6IE1hdGgucm91bmQoYnMgKiByLmggLyByLncpIH07XG4gIH1cblxuICBmdW5jdGlvbiBiZWFkc0Zyb21TZXR1cCh3LCBoLCB1LCBkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHM6IE1hdGgubWF4KDIsIE1hdGgucm91bmQocGFyc2VGbG9hdCh3KSAqIFRPX0NNW3VdICogZCkpLFxuICAgICAgcm93czogTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGgpICogVE9fQ01bdV0gKiBkKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBCYWNrZ3JvdW5kIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgIGNvbnN0IGMgPSBiZ1JlZi5jdXJyZW50O1xuICAgIGlmICghYykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICd0cmFuc3BhcmVudCcpIHJldHVybjtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdzb2xpZCcpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBiZ0NvbG9yUmVmLmN1cnJlbnQ7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgIH0gZWxzZSBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdpbWFnZScgJiYgYmdJbWFnZVJlZi5jdXJyZW50KSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgICAgaW1nLnNyYyA9IGJnSW1hZ2VSZWYuY3VycmVudDtcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgRHJhdyBiZWFkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHBhaW50QmVhZChjdHgsIGNvbCwgcm93LCBmaWxsQ29sb3IpIHtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCB4ID0gY29sICogdywgeSA9IHJvdyAqIGg7XG4gICAgY3R4LmNsZWFyUmVjdCh4LCB5LCB3LCBoKTtcbiAgICBpZiAoZmlsbENvbG9yID09PSBudWxsKSByZXR1cm47XG4gICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmVsbGlwc2UoeCArIHcvMiwgeSArIGgvMiwgdy8yIC0gdyowLjA4LCBoLzIgLSBoKjAuMDgsIDAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgLy8g4pSA4pSAIEdyaWQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gZHJhd0dyaWQoKSB7XG4gICAgY29uc3QgYyA9IGdyaWRSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgaWYgKCFzaG93R3JpZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDEzMCwxMTAsOTAsMC40KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDAuNTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBjb2xzOyBpKyspIHsgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKGkqdywwKTsgY3R4LmxpbmVUbyhpKncscm93cypoKTsgY3R4LnN0cm9rZSgpOyB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcm93czsgaSsrKSB7IGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbygwLGkqaCk7IGN0eC5saW5lVG8oY29scyp3LGkqaCk7IGN0eC5zdHJva2UoKTsgfVxuICB9XG5cbiAgLy8g4pSA4pSAIFJ1bGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBkcmF3UnVsZXJzKCkge1xuICAgIGNvbnN0IHsgdzogYncsIGg6IGJoIH0gPSBnZXRCZWFkKCk7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGQgPSBkZW5zaXR5UmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdSA9IHVuaXRSZWYuY3VycmVudDtcblxuICAgIGZ1bmN0aW9uIGxhYmVsKGkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IChpIC8gZCkgLyBUT19DTVt1XTtcbiAgICAgIHJldHVybiB2YWwgJSAxID09PSAwID8gYCR7dmFsfWAgOiB2YWwudG9GaXhlZCgxKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b3AgPSBydWxlclRvcFJlZi5jdXJyZW50O1xuICAgIGlmICh0b3ApIHtcbiAgICAgIHRvcC53aWR0aCA9IGNvbHMgKiBidzsgdG9wLmhlaWdodCA9IFJVTEVSX1NaO1xuICAgICAgY29uc3QgY3R4ID0gdG9wLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gVC5iZzsgY3R4LmZpbGxSZWN0KDAsIDAsIHRvcC53aWR0aCwgdG9wLmhlaWdodCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBjb2xzOyBpKyspIHtcbiAgICAgICAgY29uc3QgeCA9IGkgKiBidztcbiAgICAgICAgY29uc3QgbWFqb3IgPSBpICUgMTAgPT09IDAsIG1pZCA9IGkgJSA1ID09PSAwO1xuICAgICAgICBjb25zdCB0SCA9IG1ham9yID8gMTAgOiBtaWQgPyA3IDogNDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbWFqb3IgPyBULm11dGVkIDogVC5ib3JkZXI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBtYWpvciA/IDEgOiAwLjU7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4Lm1vdmVUbyh4LCBSVUxFUl9TWik7IGN0eC5saW5lVG8oeCwgUlVMRVJfU1ogLSB0SCk7IGN0eC5zdHJva2UoKTtcbiAgICAgICAgaWYgKG1ham9yICYmIGkgPiAwKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFQubXV0ZWQ7IGN0eC5mb250ID0gJzhweCBtb25vc3BhY2UnOyBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgY3R4LmZpbGxUZXh0KGAke2l9KCR7bGFiZWwoaSl9JHt1fSlgLCB4LCBSVUxFUl9TWiAtIDEyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxlZnQgPSBydWxlckxlZnRSZWYuY3VycmVudDtcbiAgICBpZiAobGVmdCkge1xuICAgICAgbGVmdC53aWR0aCA9IFJVTEVSX1NaOyBsZWZ0LmhlaWdodCA9IHJvd3MgKiBiaDtcbiAgICAgIGNvbnN0IGN0eCA9IGxlZnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBULmJnOyBjdHguZmlsbFJlY3QoMCwgMCwgbGVmdC53aWR0aCwgbGVmdC5oZWlnaHQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcm93czsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHkgPSBpICogYmg7XG4gICAgICAgIGNvbnN0IG1ham9yID0gaSAlIDEwID09PSAwLCBtaWQgPSBpICUgNSA9PT0gMDtcbiAgICAgICAgY29uc3QgdFcgPSBtYWpvciA/IDEwIDogbWlkID8gNyA6IDQ7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IG1ham9yID8gVC5tdXRlZCA6IFQuYm9yZGVyO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbWFqb3IgPyAxIDogMC41O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oUlVMRVJfU1osIHkpOyBjdHgubGluZVRvKFJVTEVSX1NaIC0gdFcsIHkpOyBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGlmIChtYWpvciAmJiBpID4gMCkge1xuICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFQubXV0ZWQ7IGN0eC5mb250ID0gJzhweCBtb25vc3BhY2UnOyBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgY3R4LnRyYW5zbGF0ZShSVUxFUl9TWiAtIDEyLCB5KTtcbiAgICAgICAgICBjdHgucm90YXRlKC1NYXRoLlBJIC8gMik7XG4gICAgICAgICAgY3R4LmZpbGxUZXh0KGAke2l9YCwgMCwgMCk7XG4gICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBDYW52YXMgaW5pdCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgYy5nZXRDb250ZXh0KCcyZCcpLmNsZWFyUmVjdCgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gICAgaGlzdG9yeS5jdXJyZW50ID0gW107XG4gICAgZnV0dXJlLmN1cnJlbnQgID0gW107XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDYW52YXMoKSB7XG4gICAgY29uc3QgeyBjb2xzLCByb3dzIH0gPSBiZWFkc0Zyb21TZXR1cChzZXR1cFcsIHNldHVwSCwgdW5pdCwgZGVuc2l0eSk7XG4gICAgYmVhZHNSZWYuY3VycmVudCAgPSB7IGNvbHMsIHJvd3MgfTtcbiAgICBkZW5zaXR5UmVmLmN1cnJlbnQgPSBkZW5zaXR5O1xuICAgIHVuaXRSZWYuY3VycmVudCAgICA9IHVuaXQ7XG4gICAgY29uc3QgeyB3LCBoIH0gPSBnZXRCZWFkKCk7XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IGNvbHMgKiB3LCBoOiByb3dzICogaCB9KTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBIaXN0b3J5IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHNhdmVIaXN0b3J5KCkge1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgaGlzdG9yeS5jdXJyZW50LnB1c2goYy5nZXRDb250ZXh0KCcyZCcpLmdldEltYWdlRGF0YSgwLCAwLCBjLndpZHRoLCBjLmhlaWdodCkpO1xuICAgIGZ1dHVyZS5jdXJyZW50ID0gW107XG4gICAgaWYgKGhpc3RvcnkuY3VycmVudC5sZW5ndGggPiA1MCkgaGlzdG9yeS5jdXJyZW50LnNoaWZ0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmRvKCkge1xuICAgIGlmICghaGlzdG9yeS5jdXJyZW50Lmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBkcmF3UmVmLmN1cnJlbnQsIGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBmdXR1cmUuY3VycmVudC5wdXNoKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGhpc3RvcnkuY3VycmVudC5wb3AoKSwgMCwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWRvKCkge1xuICAgIGlmICghZnV0dXJlLmN1cnJlbnQubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudCwgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGhpc3RvcnkuY3VycmVudC5wdXNoKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGMud2lkdGgsIGMuaGVpZ2h0KTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGZ1dHVyZS5jdXJyZW50LnBvcCgpLCAwLCAwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTYXZlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHNhdmVDYW52YXMoKSB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRlbXAud2lkdGggID0gZHJhd1JlZi5jdXJyZW50LndpZHRoO1xuICAgIHRlbXAuaGVpZ2h0ID0gZHJhd1JlZi5jdXJyZW50LmhlaWdodDtcbiAgICBjb25zdCBjdHggPSB0ZW1wLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmRyYXdJbWFnZShiZ1JlZi5jdXJyZW50LCAwLCAwKTtcbiAgICBjdHguZHJhd0ltYWdlKGRyYXdSZWYuY3VycmVudCwgMCwgMCk7XG4gICAgaWYgKGV4cG9ydEdyaWRSZWYuY3VycmVudCkgY3R4LmRyYXdJbWFnZShncmlkUmVmLmN1cnJlbnQsIDAsIDApO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdGVtcC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgIGEuZG93bmxvYWQgPSAnYmVhZHdvcmsucG5nJztcbiAgICBhLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCB2aWV3OiB3aW5kb3cgfSkpO1xuICB9XG5cbiAgLy8g4pSA4pSAIE1vdXNlIGRyYXdpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gY2VsbEZyb21FdmVudChlKSB7XG4gICAgY29uc3QgcmVjdCA9IGRyYXdSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gdyk7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcigoZS5jbGllbnRZIC0gcmVjdC50b3ApICAvIGgpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBpZiAoY29sIDwgMCB8fCByb3cgPCAwIHx8IGNvbCA+PSBjb2xzIHx8IHJvdyA+PSByb3dzKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4geyBjb2wsIHJvdyB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9QYWludChlKSB7XG4gICAgY29uc3QgY2VsbCA9IGNlbGxGcm9tRXZlbnQoZSk7XG4gICAgaWYgKCFjZWxsKSByZXR1cm47XG4gICAgcGFpbnRCZWFkKGRyYXdSZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpLCBjZWxsLmNvbCwgY2VsbC5yb3csIGlzRXJhc2VyUmVmLmN1cnJlbnQgPyBudWxsIDogY29sb3JSZWYuY3VycmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgIHNhdmVIaXN0b3J5KCk7IGlzRHJhd2luZy5jdXJyZW50ID0gdHJ1ZTsgZG9QYWludChlKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSkgeyBpZiAoaXNEcmF3aW5nLmN1cnJlbnQpIGRvUGFpbnQoZSk7IH1cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VVcCgpICAgIHsgaXNEcmF3aW5nLmN1cnJlbnQgPSBmYWxzZTsgfVxuXG4gIC8vIOKUgOKUgCBGbG9vZCBmaWxsIChkcmFnICYgZHJvcCkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gY2VsbFBpeGVsKGN0eCwgY29sLCByb3cpIHtcbiAgICBjb25zdCB7IHcsIGggfSA9IGdldEJlYWQoKTtcbiAgICBjb25zdCBkID0gY3R4LmdldEltYWdlRGF0YShNYXRoLmZsb29yKGNvbCp3ICsgdy8yKSwgTWF0aC5mbG9vcihyb3cqaCArIGgvMiksIDEsIDEpLmRhdGE7XG4gICAgcmV0dXJuIFtkWzBdLCBkWzFdLCBkWzJdLCBkWzNdXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpeGVsTWF0Y2goYSwgYiwgdGhyID0gMTUpIHtcbiAgICBjb25zdCBhVCA9IGFbM10gPCAzMCwgYlQgPSBiWzNdIDwgMzA7XG4gICAgaWYgKGFUICYmIGJUKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoYVQgIT09IGJUKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIE1hdGguYWJzKGFbMF0tYlswXSkgPCB0aHIgJiYgTWF0aC5hYnMoYVsxXS1iWzFdKSA8IHRociAmJiBNYXRoLmFicyhhWzJdLWJbMl0pIDwgdGhyO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxvb2RGaWxsKHN0YXJ0Q29sLCBzdGFydFJvdywgZmlsbENvbG9yKSB7XG4gICAgY29uc3QgYyA9IGRyYXdSZWYuY3VycmVudCwgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjb25zdCB0YXJnZXQgPSBjZWxsUGl4ZWwoY3R4LCBzdGFydENvbCwgc3RhcnRSb3cpO1xuICAgIGNvbnN0IFtmcixmZyxmYl0gPSBoZXhUb1JnYihmaWxsQ29sb3IpO1xuICAgIGlmIChwaXhlbE1hdGNoKHRhcmdldCwgW2ZyLGZnLGZiLDI1NV0pKSByZXR1cm47XG4gICAgc2F2ZUhpc3RvcnkoKTtcbiAgICBjb25zdCBxdWV1ZSAgID0gW1tzdGFydENvbCwgc3RhcnRSb3ddXTtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvd10gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgY29uc3Qga2V5ID0gYCR7Y29sfSwke3Jvd31gO1xuICAgICAgaWYgKHZpc2l0ZWQuaGFzKGtleSkgfHwgY29sPDAgfHwgcm93PDAgfHwgY29sPj1jb2xzIHx8IHJvdz49cm93cykgY29udGludWU7XG4gICAgICB2aXNpdGVkLmFkZChrZXkpO1xuICAgICAgaWYgKCFwaXhlbE1hdGNoKGNlbGxQaXhlbChjdHgsIGNvbCwgcm93KSwgdGFyZ2V0KSkgY29udGludWU7XG4gICAgICBwYWludEJlYWQoY3R4LCBjb2wsIHJvdywgZmlsbENvbG9yKTtcbiAgICAgIHF1ZXVlLnB1c2goW2NvbCsxLHJvd10sW2NvbC0xLHJvd10sW2NvbCxyb3crMV0sW2NvbCxyb3ctMV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmYyA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2NvbG9yJyk7XG4gICAgaWYgKCFmYykgcmV0dXJuO1xuICAgIGNvbnN0IGNlbGwgPSBjZWxsRnJvbUV2ZW50KGUpO1xuICAgIGlmIChjZWxsKSBmbG9vZEZpbGwoY2VsbC5jb2wsIGNlbGwucm93LCBmYyk7XG4gIH1cblxuICAvLyDilIDilIAgS2V5Ym9hcmQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihlKSB7XG4gICAgY29uc3QgY3RybCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG4gICAgaWYgKGN0cmwgJiYgZS5rZXkgPT09ICd6JykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHVuZG8oKTsgfVxuICAgIGlmIChjdHJsICYmIChlLmtleSA9PT0gJ3knIHx8IChlLnNoaWZ0S2V5ICYmIGUua2V5ID09PSAnWicpKSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IHJlZG8oKTsgfVxuICB9XG5cbiAgLy8g4pSA4pSAIENvbnRyb2wgaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBhcHBseUNvbG9yKGMpIHtcbiAgICBjb2xvclJlZi5jdXJyZW50ID0gYzsgc2V0Q29sb3IoYyk7IHNldEhleElucHV0KGMpO1xuICAgIGlzRXJhc2VyUmVmLmN1cnJlbnQgPSBmYWxzZTsgc2V0SXNFcmFzZXIoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlSYXRpbyhyKSB7XG4gICAgcmF0aW9SZWYuY3VycmVudCA9IHI7IHNldFJhdGlvKHIpO1xuICAgIGNvbnN0IHsgY29scywgcm93cyB9ID0gYmVhZHNSZWYuY3VycmVudDtcbiAgICBjb25zdCBicyA9IGJhc2VTaXplUmVmLmN1cnJlbnQ7XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IGNvbHMgKiBicywgaDogcm93cyAqIE1hdGgucm91bmQoYnMgKiByLmggLyByLncpIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlCZ1R5cGUodHlwZSkge1xuICAgIGJnVHlwZVJlZi5jdXJyZW50ID0gdHlwZTsgc2V0QmdUeXBlKHR5cGUpOyBkcmF3QmFja2dyb3VuZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlCZ0NvbG9yKGMpIHtcbiAgICBiZ0NvbG9yUmVmLmN1cnJlbnQgPSBjOyBzZXRCZ0NvbG9yKGMpOyBzZXRCZ0hleChjKTtcbiAgICBpZiAoYmdUeXBlUmVmLmN1cnJlbnQgPT09ICdzb2xpZCcpIGRyYXdCYWNrZ3JvdW5kKCk7XG4gIH1cblxuICAvLyDilIDilIAgUGF0dGVybiB0aWxpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gYXBwbHlQYXR0ZXJuKCkge1xuICAgIGNvbnN0IHNyYyA9IGRyYXdSZWYuY3VycmVudDtcbiAgICBpZiAoIXNyYykgcmV0dXJuO1xuICAgIGNvbnN0IG1vdGlmID0gY2xvbmVDYW52YXMoc3JjKTtcbiAgICBjb25zdCBtVyA9IG1vdGlmLndpZHRoLCBtSCA9IG1vdGlmLmhlaWdodDtcbiAgICBjb25zdCByVyA9IE1hdGgubWF4KDEsIHBhcnNlSW50KHBhdHRlcm5SVykgfHwgMik7XG4gICAgY29uc3QgckggPSBNYXRoLm1heCgxLCBwYXJzZUludChwYXR0ZXJuUkgpIHx8IDIpO1xuICAgIGNvbnN0IGhhbGZXID0gTWF0aC5mbG9vcihtVyAvIDIpLCBoYWxmSCA9IE1hdGguZmxvb3IobUggLyAyKTtcblxuICAgIGxldCB1bml0QywgbmV3VywgbmV3SDtcblxuICAgIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ2dyaWQnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVzsgbmV3SCA9IG1IICogckg7XG4gICAgfSBlbHNlIGlmIChwYXR0ZXJuVHlwZSA9PT0gJ2JyaWNrX2gnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVyArIGhhbGZXOyBuZXdIID0gbUggKiBySDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnaGFsZmRyb3AnKSB7XG4gICAgICB1bml0QyA9IG1vdGlmOyBuZXdXID0gbVcgKiByVzsgbmV3SCA9IG1IICogckggKyBoYWxmSDtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm5UeXBlID09PSAnbWlycm9yX3gnKSB7XG4gICAgICB1bml0QyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdW5pdEMud2lkdGggPSBtVyAqIDI7IHVuaXRDLmhlaWdodCA9IG1IO1xuICAgICAgY29uc3QgdXggPSB1bml0Qy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdXguZHJhd0ltYWdlKG1vdGlmLCAwLCAwKTsgdXguZHJhd0ltYWdlKGZsaXBIKG1vdGlmKSwgbVcsIDApO1xuICAgICAgbmV3VyA9IHVuaXRDLndpZHRoICogclc7IG5ld0ggPSBtSCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdtaXJyb3JfeScpIHtcbiAgICAgIHVuaXRDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB1bml0Qy53aWR0aCA9IG1XOyB1bml0Qy5oZWlnaHQgPSBtSCAqIDI7XG4gICAgICBjb25zdCB1eSA9IHVuaXRDLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB1eS5kcmF3SW1hZ2UobW90aWYsIDAsIDApOyB1eS5kcmF3SW1hZ2UoZmxpcFYobW90aWYpLCAwLCBtSCk7XG4gICAgICBuZXdXID0gbVcgKiByVzsgbmV3SCA9IHVuaXRDLmhlaWdodCAqIHJIO1xuICAgIH0gZWxzZSBpZiAocGF0dGVyblR5cGUgPT09ICdtaXJyb3JfNCcpIHtcbiAgICAgIGNvbnN0IGZoID0gZmxpcEgobW90aWYpLCBmdiA9IGZsaXBWKG1vdGlmKSwgZmh2ID0gZmxpcFYoZmgpO1xuICAgICAgdW5pdEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHVuaXRDLndpZHRoID0gbVcgKiAyOyB1bml0Qy5oZWlnaHQgPSBtSCAqIDI7XG4gICAgICBjb25zdCB1NCA9IHVuaXRDLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB1NC5kcmF3SW1hZ2UobW90aWYsIDAsIDApOyB1NC5kcmF3SW1hZ2UoZmgsIG1XLCAwKTtcbiAgICAgIHU0LmRyYXdJbWFnZShmdiwgMCwgbUgpOyB1NC5kcmF3SW1hZ2UoZmh2LCBtVywgbUgpO1xuICAgICAgbmV3VyA9IHVuaXRDLndpZHRoICogclc7IG5ld0ggPSB1bml0Qy5oZWlnaHQgKiBySDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHc6IGJ3LCBoOiBiaCB9ID0gZ2V0QmVhZCgpO1xuICAgIGJlYWRzUmVmLmN1cnJlbnQgPSB7IGNvbHM6IE1hdGgucm91bmQobmV3VyAvIGJ3KSwgcm93czogTWF0aC5yb3VuZChuZXdIIC8gYmgpIH07XG4gICAgcGVuZGluZ1BhdHRlcm4uY3VycmVudCA9IHsgdW5pdEMsIG1XLCBtSCwgaGFsZlcsIGhhbGZILCByVywgckgsIHR5cGU6IHBhdHRlcm5UeXBlLCBuZXdXLCBuZXdIIH07XG4gICAgc2V0Q2FudmFzU2l6ZSh7IHc6IG5ld1csIGg6IG5ld0ggfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJQZW5kaW5nUGF0dGVybigpIHtcbiAgICBjb25zdCBwID0gcGVuZGluZ1BhdHRlcm4uY3VycmVudDtcbiAgICBpZiAoIXApIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBkcmF3UmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGRyYXdSZWYuY3VycmVudC53aWR0aCwgZHJhd1JlZi5jdXJyZW50LmhlaWdodCk7XG4gICAgY29uc3QgeyB1bml0QywgbVcsIG1ILCBoYWxmVywgaGFsZkgsIHJXLCBySCwgdHlwZSB9ID0gcDtcbiAgICBmb3IgKGxldCByeCA9IDA7IHJ4IDwgclc7IHJ4KyspIHtcbiAgICAgIGZvciAobGV0IHJ5ID0gMDsgcnkgPCBySDsgcnkrKykge1xuICAgICAgICBsZXQgb3ggPSByeCAqICh0eXBlID09PSAnbWlycm9yX3gnIHx8IHR5cGUgPT09ICdtaXJyb3JfNCcgPyB1bml0Qy53aWR0aCAgOiBtVyk7XG4gICAgICAgIGxldCBveSA9IHJ5ICogKHR5cGUgPT09ICdtaXJyb3JfeScgfHwgdHlwZSA9PT0gJ21pcnJvcl80JyA/IHVuaXRDLmhlaWdodCA6IG1IKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdicmlja19oJykgIG94ICs9IChyeSAlIDIgPT09IDEgPyBoYWxmVyA6IDApO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2hhbGZkcm9wJykgb3kgKz0gKHJ4ICUgMiA9PT0gMSA/IGhhbGZIIDogMCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodW5pdEMsIG94LCBveSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIEN1c3RvbSBwYWxldHRlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBhY3RpdmVQYWxldHRlID0gYWN0aXZlUGFsZXR0ZUlkID09PSAnZGVmYXVsdCdcbiAgICA/IERFRkFVTFRfUEFMRVRURVxuICAgIDogKChwYWxldHRlcy5maW5kKHAgPT4gcC5pZCA9PT0gYWN0aXZlUGFsZXR0ZUlkKSB8fCB7fSkuY29sb3JzIHx8IERFRkFVTFRfUEFMRVRURSk7XG5cbiAgZnVuY3Rpb24gc2F2ZVBhbGV0dGVzKHVwZGF0ZWQpIHtcbiAgICBzZXRQYWxldHRlcyh1cGRhdGVkKTtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmVhZHRvb2xfcGFsZXR0ZXMnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkKSk7IH0gY2F0Y2gge31cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBhbGV0dGUoKSB7XG4gICAgaWYgKCFuZXdQYWxldHRlTmFtZS50cmltKCkpIHJldHVybjtcbiAgICBjb25zdCBpZCA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICBzYXZlUGFsZXR0ZXMoWy4uLnBhbGV0dGVzLCB7IGlkLCBuYW1lOiBuZXdQYWxldHRlTmFtZS50cmltKCksIGNvbG9yczogW10gfV0pO1xuICAgIHNldEFjdGl2ZVBhbGV0dGVJZChpZCk7XG4gICAgc2V0TmV3UGFsZXR0ZU5hbWUoJycpOyBzZXRTaG93TmV3UGFsZXR0ZUlucHV0KGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVBhbGV0dGUoaWQpIHtcbiAgICBzYXZlUGFsZXR0ZXMocGFsZXR0ZXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gaWQpKTtcbiAgICBzZXRBY3RpdmVQYWxldHRlSWQoJ2RlZmF1bHQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbG9yVG9QYWxldHRlKGlkKSB7XG4gICAgc2F2ZVBhbGV0dGVzKHBhbGV0dGVzLm1hcChwID0+XG4gICAgICBwLmlkID09PSBpZCAmJiAhcC5jb2xvcnMuaW5jbHVkZXMoY29sb3JSZWYuY3VycmVudClcbiAgICAgICAgPyB7IC4uLnAsIGNvbG9yczogWy4uLnAuY29sb3JzLCBjb2xvclJlZi5jdXJyZW50XSB9XG4gICAgICAgIDogcFxuICAgICkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ29sb3JGcm9tUGFsZXR0ZShwaWQsIGNvbCkge1xuICAgIHNhdmVQYWxldHRlcyhwYWxldHRlcy5tYXAocCA9PlxuICAgICAgcC5pZCA9PT0gcGlkID8geyAuLi5wLCBjb2xvcnM6IHAuY29sb3JzLmZpbHRlcihjID0+IGMgIT09IGNvbCkgfSA6IHBcbiAgICApKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBFZmZlY3RzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhdmVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmVhZHRvb2xfcGFsZXR0ZXMnKSB8fCAnW10nKTtcbiAgICAgIHNldFBhbGV0dGVzKHNhdmVkKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgY3JlYXRlQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbnZhc1NpemUudyA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAocGVuZGluZ1BhdHRlcm4uY3VycmVudCkge1xuICAgICAgICAgIHJlbmRlclBlbmRpbmdQYXR0ZXJuKCk7XG4gICAgICAgICAgcGVuZGluZ1BhdHRlcm4uY3VycmVudCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5pdENhbnZhcygpO1xuICAgICAgICB9XG4gICAgICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgICAgIGRyYXdHcmlkKCk7XG4gICAgICAgIGRyYXdSdWxlcnMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfSwgW2NhbnZhc1NpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4geyBkcmF3R3JpZCgpOyB9LCBbc2hvd0dyaWRdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHsgZHJhd0JhY2tncm91bmQoKTsgfSwgW2JnVHlwZSwgYmdDb2xvcl0pO1xuXG4gIC8vIOKUgOKUgCBEZXJpdmVkIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IHByZXZpZXcgPSBiZWFkc0Zyb21TZXR1cChzZXR1cFcsIHNldHVwSCwgdW5pdCwgZGVuc2l0eSk7XG4gIGNvbnN0IGNXID0gY2FudmFzU2l6ZS53IHx8IDE7XG4gIGNvbnN0IGNIID0gY2FudmFzU2l6ZS5oIHx8IDE7XG5cbiAgLy8g4pSA4pSAIFJlbmRlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDB2dycsIGhlaWdodDogJzEwMHZoJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgYmFja2dyb3VuZDogVC5iZyB9fT5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+QmVhZHdvcmsgU3R1ZGlvPC90aXRsZT5cbiAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGxheWZhaXIrRGlzcGxheTppdGFsLHdnaHRAMCw2MDA7MSw0MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAqIHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxuICAgICAgICBodG1sLCBib2R5IHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBmb250LWZhbWlseTogbW9ub3NwYWNlOyB9XG4gICAgICAgIGlucHV0LCBzZWxlY3QsIGJ1dHRvbiB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IH1cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhciB7IHdpZHRoOiA2cHg7IGhlaWdodDogNnB4OyB9XG4gICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiAke1QuYmd9OyB9XG4gICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyBiYWNrZ3JvdW5kOiAke1QuYm9yZGVyfTsgYm9yZGVyLXJhZGl1czogM3B4OyB9XG4gICAgICAgIGJ1dHRvbjpob3ZlciB7IG9wYWNpdHk6IDAuODU7IH1cbiAgICAgICAgaW5wdXRbdHlwZT1jaGVja2JveF0geyBhY2NlbnQtY29sb3I6ICR7VC5hY2NlbnR9OyB9XG4gICAgICBgfTwvc3R5bGU+XG5cbiAgICAgIHsvKiDilIDilIAgU2Nyb2xsYWJsZSBjYW52YXMgYXJlYSDilIDilIAgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiBgY2FsYygxMDB2dyAtICR7UEFORUxfV31weClgLCBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIG92ZXJmbG93OiAnYXV0bycsIGJhY2tncm91bmQ6IFQuY2FudmFzLFxuICAgICAgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWdyaWQnLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IGAke1JVTEVSX1NafXB4ICR7Y1d9cHhgLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZVJvd3M6ICAgIGAke1JVTEVSX1NafXB4ICR7Y0h9cHhgLFxuICAgICAgICAgIHBhZGRpbmc6IFBBRCwgZ2FwOiAwLFxuICAgICAgICAgIG1pbldpZHRoOiAnMTAwJScsIG1pbkhlaWdodDogJzEwMCUnLFxuICAgICAgICB9fT5cbiAgICAgICAgICB7LyogQ29ybmVyICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogVC5iZywgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IFBBRCwgbGVmdDogUEFELCB6SW5kZXg6IDUgfX0gLz5cblxuICAgICAgICAgIHsvKiBUb3AgcnVsZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogUEFELCB6SW5kZXg6IDQsIGJhY2tncm91bmQ6IFQuYmcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtydWxlclRvcFJlZn0gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIExlZnQgcnVsZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIGxlZnQ6IFBBRCwgekluZGV4OiA0LCBiYWNrZ3JvdW5kOiBULmJnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17cnVsZXJMZWZ0UmVmfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FudmFzIHN0YWNrICovfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogY1csIGhlaWdodDogY0ggfX1cbiAgICAgICAgICAgIG9uRHJvcD17aGFuZGxlRHJvcH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtiZ1R5cGUgPT09ICd0cmFuc3BhcmVudCcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLCB6SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAncmVwZWF0aW5nLWNvbmljLWdyYWRpZW50KCNhYWEgMCUgMjUlLCAjZmZmIDAlIDUwJSknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnMTZweCAxNnB4JyxcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17YmdSZWZ9ICAgd2lkdGg9e2NXfSBoZWlnaHQ9e2NIfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB6SW5kZXg6IDEgfX0gLz5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtkcmF3UmVmfSB3aWR0aD17Y1d9IGhlaWdodD17Y0h9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMiwgY3Vyc29yOiBpc0VyYXNlciA/ICdjZWxsJyA6ICdjcm9zc2hhaXInIH19XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgICAgICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZVVwfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxjYW52YXMgcmVmPXtncmlkUmVmfSB3aWR0aD17Y1d9IGhlaWdodD17Y0h9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHpJbmRleDogMywgcG9pbnRlckV2ZW50czogJ25vbmUnIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiDilIDilIAgUmlnaHQgcGFuZWwg4pSA4pSAICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgcmlnaHQ6IDAsIHRvcDogMCxcbiAgICAgICAgd2lkdGg6IFBBTkVMX1csIGhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgYmFja2dyb3VuZDogVC5wYW5lbCwgY29sb3I6IFQudGV4dCxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyTGVmdDogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgIHpJbmRleDogMTAsIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgfX0+XG4gICAgICAgIHsvKiBTYXZlIOKAlCBwcm9taW5lbnQgdG9wIGJhciAqL31cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtzYXZlQ2FudmFzfSBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjYjg3MzMzLCAjZDRhMDQwKScsXG4gICAgICAgICAgY29sb3I6ICcjMWExNzE0JywgZm9udFdlaWdodDogNzAwLCBmb250U2l6ZTogMTMsXG4gICAgICAgICAgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcxM3B4IDE2cHgnLFxuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIGxldHRlclNwYWNpbmc6IDEuNSwgZmxleFNocmluazogMCxcbiAgICAgICAgICBmb250RmFtaWx5OiBcIidQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWZcIixcbiAgICAgICAgfX0+XG4gICAgICAgICAg4oaTICBTQVZFIEFSVFdPUktcbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTRweCAxMnB4JywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAxMiB9fT5cbiAgICAgICAgICB7LyogVGl0bGUgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiBcIidQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWZcIiwgZm9udFNpemU6IDE3LCBjb2xvcjogVC50ZXh0LCBsZXR0ZXJTcGFjaW5nOiAwLjUsIGZvbnRTdHlsZTogJ2l0YWxpYycgfX0+XG4gICAgICAgICAgICBCZWFkd29yayBTdHVkaW9cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDYW52YXMgc2V0dXAgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJDYW52YXMgU2l6ZVwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luQm90dG9tOiA2IH19PlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJXSURUSFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4xXCIgc3RlcD1cIjAuMVwiIHZhbHVlPXtzZXR1cFd9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZXR1cFcoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJIRUlHSFRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMVwiIHN0ZXA9XCIwLjFcIiB2YWx1ZT17c2V0dXBIfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0U2V0dXBIKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiVU5JVFwiIGZsZXg9ezAuN30+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17dW5pdH0gb25DaGFuZ2U9e2UgPT4gc2V0VW5pdChlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXt7IC4uLmlucCwgd2lkdGg6IDUyIH19PlxuICAgICAgICAgICAgICAgICAge1VOSVRTLm1hcCh1ID0+IDxvcHRpb24ga2V5PXt1fT57dX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJCRUFEIERFTlNJVFlcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17ZGVuc2l0eX0gb25DaGFuZ2U9e2UgPT4gc2V0RGVuc2l0eShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0gc3R5bGU9e2lucH0+XG4gICAgICAgICAgICAgICAge0RFTlNJVFlfUFJFU0VUUy5tYXAoZCA9PiA8b3B0aW9uIGtleT17ZC52YWx1ZX0gdmFsdWU9e2QudmFsdWV9PntkLmxhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFQubXV0ZWQsIGZvbnRTaXplOiAxMSwgbWFyZ2luOiAnNnB4IDAnIH19PlxuICAgICAgICAgICAgICA9IHtwcmV2aWV3LmNvbHN9IMOXIHtwcmV2aWV3LnJvd3N9IGJlYWRzXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17Y3JlYXRlQ2FudmFzfSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI1MzUyNScsIGNvbG9yOiAnIzdkYWE2ZCcsIGJvcmRlcjogJzFweCBzb2xpZCAjM2E1YTNhJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlclJhZGl1czogMywgd2lkdGg6ICcxMDAlJywgZm9udFNpemU6IDEyLFxuICAgICAgICAgICAgfX0+4pymIENyZWF0ZSBDYW52YXM8L2J1dHRvbj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogUGFsZXR0ZSAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlBhbGV0dGVcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpbkJvdHRvbTogNiwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdmFsdWU9e2FjdGl2ZVBhbGV0dGVJZH0gb25DaGFuZ2U9e2UgPT4gc2V0QWN0aXZlUGFsZXR0ZUlkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbnAsIGZsZXg6IDEgfX0+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRlZmF1bHRcIj5EZWZhdWx0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAge3BhbGV0dGVzLm1hcChwID0+IDxvcHRpb24ga2V5PXtwLmlkfSB2YWx1ZT17cC5pZH0+e3AubmFtZX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TmV3UGFsZXR0ZUlucHV0KCFzaG93TmV3UGFsZXR0ZUlucHV0KX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgcGFkZGluZzogJzVweCA5cHgnLCBmbGV4U2hyaW5rOiAwIH19Pu+8izwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7c2hvd05ld1BhbGV0dGVJbnB1dCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpbkJvdHRvbTogNiB9fT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e25ld1BhbGV0dGVOYW1lfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdQYWxldHRlTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhbGV0dGUgbmFtZeKAplwiIHN0eWxlPXt7IC4uLmlucCwgZmxleDogMSB9fVxuICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlID0+IGUua2V5ID09PSAnRW50ZXInICYmIGFkZFBhbGV0dGUoKX0gYXV0b0ZvY3VzIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthZGRQYWxldHRlfSBzdHlsZT17eyAuLi5jaGlwQnRuKHRydWUpLCBmbGV4U2hyaW5rOiAwIH19Pk9LPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHthY3RpdmVQYWxldHRlSWQgIT09ICdkZWZhdWx0JyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIG1hcmdpbkJvdHRvbTogNiB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGFkZENvbG9yVG9QYWxldHRlKGFjdGl2ZVBhbGV0dGVJZCl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGZhbHNlKSwgZmxleDogMSwgZm9udFNpemU6IDExIH19Pu+8iyBBZGQgY3VycmVudCBjb2xvcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGVsZXRlUGFsZXR0ZShhY3RpdmVQYWxldHRlSWQpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIGNvbG9yOiAnI2NjNzc3NycsIGZvbnRTaXplOiAxMSB9fT7wn5eRIERlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQ29sb3JcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBtYXJnaW5Cb3R0b206IDggfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aWR0aDogMzYsIGhlaWdodDogMzYsIGZsZXhTaHJpbms6IDAsIGJvcmRlclJhZGl1czogMyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc0VyYXNlciA/ICcjZmZmJyA6IGNvbG9yLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogaXNFcmFzZXIgPyAnMnB4IHNvbGlkICNjYzc3NzcnIDogYDJweCBzb2xpZCAke1QuYm9yZGVyfWAsXG4gICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17aGV4SW5wdXR9IG9uQ2hhbmdlPXtlID0+IHsgc2V0SGV4SW5wdXQoZS50YXJnZXQudmFsdWUpOyBpZiAoL14jWzAtOWEtZkEtRl17Nn0kLy50ZXN0KGUudGFyZ2V0LnZhbHVlKSkgYXBwbHlDb2xvcihlLnRhcmdldC52YWx1ZSk7IH19XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIjMDAwMDAwXCIgc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogMyB9fT5cbiAgICAgICAgICAgICAge2FjdGl2ZVBhbGV0dGUubWFwKGMgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjfSB0aXRsZT17Y30gZHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17ZSA9PiBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCdjb2xvcicsIGMpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlDb2xvcihjKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYmFja2dyb3VuZDogYywgY3Vyc29yOiAnZ3JhYicsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMiwgZmxleFNocmluazogMCwgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogY29sb3IgPT09IGMgJiYgIWlzRXJhc2VyID8gYDJweCBzb2xpZCAke1QuYWNjZW50fWAgOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVBhbGV0dGVJZCAhPT0gJ2RlZmF1bHQnICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXtlID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgcmVtb3ZlQ29sb3JGcm9tUGFsZXR0ZShhY3RpdmVQYWxldHRlSWQsIGMpOyB9fVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAtNCwgcmlnaHQ6IC00LCB3aWR0aDogMTAsIGhlaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzk5MzMzMycsIGJvcmRlclJhZGl1czogJzUwJScsIGZvbnRTaXplOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJywgY3Vyc29yOiAncG9pbnRlcicsIHpJbmRleDogMSxcbiAgICAgICAgICAgICAgICAgICAgICB9fT7inJU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogMTAsIG1hcmdpblRvcDogNSB9fT5cbiAgICAgICAgICAgICAgRHJhZyBhIGNvbG9yIG9udG8gdGhlIGNhbnZhcyB0byBmbG9vZCBmaWxsXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogVG9vbCAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIlRvb2xcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4geyBpc0VyYXNlclJlZi5jdXJyZW50ID0gZmFsc2U7IHNldElzRXJhc2VyKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKCFpc0VyYXNlciksIGZsZXg6IDEgfX0+4pyPIERyYXc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IGlzRXJhc2VyUmVmLmN1cnJlbnQgPSB0cnVlOyBzZXRJc0VyYXNlcih0cnVlKTsgfX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKGlzRXJhc2VyKSwgZmxleDogMSB9fT7ijKsgRXJhc2U8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICAgIHsvKiBCZWFkIHJhdGlvICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiQmVhZCBSYXRpbyAoVzpIKVwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiB9fT5cbiAgICAgICAgICAgICAge1JBVElPUy5tYXAociA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e3IubGFiZWx9IG9uQ2xpY2s9eygpID0+IGFwcGx5UmF0aW8ocil9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5jaGlwQnRuKHJhdGlvLmxhYmVsID09PSByLmxhYmVsKSwgZmxleDogMSB9fT57ci5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogQmFja2dyb3VuZCAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkJhY2tncm91bmRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDUsIG1hcmdpbkJvdHRvbTogOCB9fT5cbiAgICAgICAgICAgICAge1sndHJhbnNwYXJlbnQnLCdzb2xpZCcsJ2ltYWdlJ10ubWFwKHQgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXt0fSBvbkNsaWNrPXsoKSA9PiBhcHBseUJnVHlwZSh0KX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oYmdUeXBlID09PSB0KSwgZmxleDogMSwgZm9udFNpemU6IDExLCBwYWRkaW5nOiAnNXB4IDRweCcgfX0+e3R9PC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7YmdUeXBlID09PSAnc29saWQnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMjgsIGhlaWdodDogMjgsIGJhY2tncm91bmQ6IGJnQ29sb3IsIGJvcmRlcjogYDFweCBzb2xpZCAke1QuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogMywgZmxleFNocmluazogMCB9fSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17YmdIZXh9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7IHNldEJnSGV4KGUudGFyZ2V0LnZhbHVlKTsgaWYgKC9eI1swLTlhLWZBLUZdezZ9JC8udGVzdChlLnRhcmdldC52YWx1ZSkpIGFwcGx5QmdDb2xvcihlLnRhcmdldC52YWx1ZSk7IH19XG4gICAgICAgICAgICAgICAgICBzdHlsZT17aW5wfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7YmdUeXBlID09PSAnaW1hZ2UnICYmIChcbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL3BuZ1wiXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgYmdJbWFnZVJlZi5jdXJyZW50ID0gZXYudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRCZ0ltYWdlKGV2LnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgIGJnVHlwZVJlZi5jdXJyZW50ID0gJ2ltYWdlJzsgc2V0QmdUeXBlKCdpbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmlucCwgY3Vyc29yOiAncG9pbnRlcicgfX0gLz5cbiAgICAgICAgICAgICAgICB7YmdJbWFnZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgYmdJbWFnZVJlZi5jdXJyZW50ID0gbnVsbDsgc2V0QmdJbWFnZShudWxsKTsgYXBwbHlCZ1R5cGUoJ3NvbGlkJyk7IH19XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmNoaXBCdG4oZmFsc2UpLCBtYXJnaW5Ub3A6IDYsIHdpZHRoOiAnMTAwJScsIGZvbnRTaXplOiAxMSB9fT5SZW1vdmUgaW1hZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIFJlcGVhdCBwYXR0ZXJuICovfVxuICAgICAgICAgIDxTZWN0aW9uIHRpdGxlPVwiUmVwZWF0IFBhdHRlcm5cIj5cbiAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlBBVFRFUk4gVFlQRVwiPlxuICAgICAgICAgICAgICA8c2VsZWN0IHZhbHVlPXtwYXR0ZXJuVHlwZX0gb25DaGFuZ2U9e2UgPT4gc2V0UGF0dGVyblR5cGUoZS50YXJnZXQudmFsdWUpfSBzdHlsZT17aW5wfT5cbiAgICAgICAgICAgICAgICB7UkVQRUFUX1BBVFRFUk5TLm1hcChwID0+IDxvcHRpb24ga2V5PXtwLnZhbHVlfSB2YWx1ZT17cC52YWx1ZX0+e3AubGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luVG9wOiA2IH19PlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJSRVBFQVQgV1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIjEwXCIgdmFsdWU9e3BhdHRlcm5SV31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFBhdHRlcm5SVyhlLnRhcmdldC52YWx1ZSl9IHN0eWxlPXtpbnB9IC8+XG4gICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlJFUEVBVCBIXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiMTBcIiB2YWx1ZT17cGF0dGVyblJIfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0UGF0dGVyblJIKGUudGFyZ2V0LnZhbHVlKX0gc3R5bGU9e2lucH0gLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthcHBseVBhdHRlcm59IHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjIyODQwJywgY29sb3I6ICcjODg5OWNjJywgYm9yZGVyOiAnMXB4IHNvbGlkICMzYTNkNjAnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyUmFkaXVzOiAzLCB3aWR0aDogJzEwMCUnLCBmb250U2l6ZTogMTIsIG1hcmdpblRvcDogOCxcbiAgICAgICAgICAgIH19PuKfsyBBcHBseSBSZXBlYXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICB7LyogR3JpZCAqL31cbiAgICAgICAgICA8U2VjdGlvbiB0aXRsZT1cIkdyaWRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogNSB9fT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3Nob3dHcmlkfSBvbkNoYW5nZT17KCkgPT4geyBjb25zdCBuID0gIXNob3dHcmlkUmVmLmN1cnJlbnQ7IHNob3dHcmlkUmVmLmN1cnJlbnQgPSBuOyBzZXRTaG93R3JpZChuKTsgZHJhd0dyaWQoKTsgfX0gLz5cbiAgICAgICAgICAgICAgU2hvdyBncmlkIHdoaWxlIGRyYXdpbmdcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6IDEyIH19PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17ZXhwb3J0V2l0aEdyaWR9IG9uQ2hhbmdlPXsoKSA9PiB7IGV4cG9ydEdyaWRSZWYuY3VycmVudCA9ICFleHBvcnRHcmlkUmVmLmN1cnJlbnQ7IHNldEV4cG9ydFdpdGhHcmlkKGV4cG9ydEdyaWRSZWYuY3VycmVudCk7IH19IC8+XG4gICAgICAgICAgICAgIEluY2x1ZGUgZ3JpZCBpbiBleHBvcnRcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgPFNlY3Rpb24gdGl0bGU9XCJBY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNob3dDbGVhckNvbmZpcm0odHJ1ZSl9IHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFQuc2VjdGlvbiwgY29sb3I6ICcjY2M3Nzc3JywgYm9yZGVyOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLCBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgd2lkdGg6ICcxMDAlJywgZm9udFNpemU6IDEyLCB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIH19PuKclSBDbGVhciBjYW52YXM8L2J1dHRvbj5cbiAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBULm11dGVkLCBmb250U2l6ZTogMTEsIHBhZGRpbmc6ICc2cHggMnB4JywgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7VC5ib3JkZXJ9YCB9fT5cbiAgICAgICAgICAgIEN0cmwrWiAgdW5kbyAgwrcgIEN0cmwrWSAgcmVkb1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyog4pSA4pSAIENsZWFyIGNvbmZpcm1hdGlvbiDilIDilIAgKi99XG4gICAgICB7c2hvd0NsZWFyQ29uZmlybSAmJiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDAsMCwwLDAuNzIpJyxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIHpJbmRleDogMTAwLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBULnBhbmVsLCBib3JkZXI6IGAxcHggc29saWQgJHtULmJvcmRlcn1gLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA2LCBwYWRkaW5nOiAyOCwgd2lkdGg6IDMwMCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMTBweCA0MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IFwiJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZlwiLCBmb250U2l6ZTogMTgsIGNvbG9yOiBULnRleHQsIG1hcmdpbkJvdHRvbTogOCB9fT5cbiAgICAgICAgICAgICAgQ2xlYXIgY2FudmFzP1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IFQubXV0ZWQsIG1hcmdpbkJvdHRvbTogMjAgfX0+XG4gICAgICAgICAgICAgIEFsbCB5b3VyIHdvcmsgd2lsbCBiZSBlcmFzZWQuIFRoaXMgY2Fubm90IGJlIHVuZG9uZS5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMTAgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd0NsZWFyQ29uZmlybShmYWxzZSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uY2hpcEJ0bihmYWxzZSksIGZsZXg6IDEsIHBhZGRpbmc6ICc4cHgnIH19PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzYXZlSGlzdG9yeSgpOyBpbml0Q2FudmFzKCk7IGRyYXdCYWNrZ3JvdW5kKCk7IGRyYXdHcmlkKCk7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0NsZWFyQ29uZmlybShmYWxzZSk7XG4gICAgICAgICAgICAgIH19IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzhweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM1YTFhMWEnLCBjb2xvcjogJyNmZmFhYWEnLCBib3JkZXI6ICcxcHggc29saWQgIzhhMzAzMCcsIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgICAgfX0+Q2xlYXI8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXX0= */\n/*@ sourceURL=W:\\Madhura\\Morii\\beadwork tool\\code\\pages\\index.js */")), __jsx("div", {
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
      lineNumber: 633
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
      lineNumber: 638
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
      lineNumber: 646
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
      lineNumber: 649
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
      lineNumber: 650
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
      lineNumber: 654
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
      lineNumber: 655
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
      lineNumber: 659
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
      lineNumber: 665
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
      lineNumber: 671
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
      lineNumber: 672
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
      lineNumber: 679
    },
    __self: this
  })))), __jsx("div", {
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
      lineNumber: 686
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
      lineNumber: 695
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
      lineNumber: 706
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
      lineNumber: 708
    },
    __self: this
  }, "Beadwork Studio"), __jsx(Section, {
    title: "Canvas Size",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 713
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
      lineNumber: 714
    },
    __self: this
  }, __jsx(Field, {
    label: "WIDTH",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 715
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
      lineNumber: 716
    },
    __self: this
  })), __jsx(Field, {
    label: "HEIGHT",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 719
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
      lineNumber: 720
    },
    __self: this
  })), __jsx(Field, {
    label: "UNIT",
    flex: 0.7,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 723
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
      lineNumber: 724
    },
    __self: this
  }, UNITS.map(function (u) {
    return __jsx("option", {
      key: u,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 725
      },
      __self: this
    }, u);
  })))), __jsx(Field, {
    label: "BEAD DENSITY",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 729
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
      lineNumber: 730
    },
    __self: this
  }, DENSITY_PRESETS.map(function (d) {
    return __jsx("option", {
      key: d.value,
      value: d.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 731
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
      lineNumber: 734
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
      lineNumber: 737
    },
    __self: this
  }, "\u2726 Create Canvas")), __jsx(Section, {
    title: "Palette",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 744
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
      lineNumber: 745
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
      lineNumber: 746
    },
    __self: this
  }, __jsx("option", {
    value: "default",
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 748
    },
    __self: this
  }, "Default"), palettes.map(function (p) {
    return __jsx("option", {
      key: p.id,
      value: p.id,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 749
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
      lineNumber: 751
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
      lineNumber: 755
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
      lineNumber: 756
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
      lineNumber: 759
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
      lineNumber: 763
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
      lineNumber: 764
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
      lineNumber: 766
    },
    __self: this
  }, "\uD83D\uDDD1 Delete"))), __jsx(Section, {
    title: "Color",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 773
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
      lineNumber: 774
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
      lineNumber: 775
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
      lineNumber: 780
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
      lineNumber: 783
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
        lineNumber: 785
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
        lineNumber: 795
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
      lineNumber: 806
    },
    __self: this
  }, "Drag a color onto the canvas to flood fill")), __jsx(Section, {
    title: "Tool",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 812
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
      lineNumber: 813
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
      lineNumber: 814
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
      lineNumber: 816
    },
    __self: this
  }, "\u232B Erase"))), __jsx(Section, {
    title: "Bead Ratio (W:H)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 822
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
      lineNumber: 823
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
        lineNumber: 825
      },
      __self: this
    }, r.label);
  }))), __jsx(Section, {
    title: "Background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 832
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
      lineNumber: 833
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
        lineNumber: 835
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
      lineNumber: 840
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
      lineNumber: 841
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
      lineNumber: 842
    },
    __self: this
  })), bgType === 'image' && __jsx("div", {
    className: "jsx-664782124",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 848
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
      lineNumber: 849
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
      lineNumber: 864
    },
    __self: this
  }, "Remove image"))), __jsx(Section, {
    title: "Repeat Pattern",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 872
    },
    __self: this
  }, __jsx(Field, {
    label: "PATTERN TYPE",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 873
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
      lineNumber: 874
    },
    __self: this
  }, REPEAT_PATTERNS.map(function (p) {
    return __jsx("option", {
      key: p.value,
      value: p.value,
      className: "jsx-664782124",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 875
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
      lineNumber: 878
    },
    __self: this
  }, __jsx(Field, {
    label: "REPEAT W",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 879
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
      lineNumber: 880
    },
    __self: this
  })), __jsx(Field, {
    label: "REPEAT H",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883
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
      lineNumber: 884
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
      lineNumber: 888
    },
    __self: this
  }, "\u27F3 Apply Repeat")), __jsx(Section, {
    title: "Grid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 895
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
      lineNumber: 896
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
      lineNumber: 897
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
      lineNumber: 900
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
      lineNumber: 901
    },
    __self: this
  }), "Include grid in export")), __jsx(Section, {
    title: "Actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 907
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
      lineNumber: 908
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
      lineNumber: 914
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
      lineNumber: 922
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
      lineNumber: 926
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
      lineNumber: 931
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
      lineNumber: 934
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
      lineNumber: 937
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
      lineNumber: 938
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
      lineNumber: 940
    },
    __self: this
  }, "Clear")))));
}

/***/ })

})
//# sourceMappingURL=index.js.9e5602fe2bc1333db63d.hot-update.js.map