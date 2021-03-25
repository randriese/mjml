"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _min2 = _interopRequireDefault(require("lodash/min"));

var _mjmlCore = require("mjml-core");

var _widthParser2 = _interopRequireDefault(require("mjml-core/lib/helpers/widthParser"));

let MjImage = /*#__PURE__*/function (_BodyComponent) {
  (0, _inherits2.default)(MjImage, _BodyComponent);

  var _super = (0, _createSuper2.default)(MjImage);

  function MjImage(...args) {
    var _this;

    (0, _classCallCheck2.default)(this, MjImage);
    _this = _super.call(this, ...args);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "headStyle", breakpoint => `
    @media only screen and (max-width:${breakpoint}) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }
  `);
    return _this;
  }

  (0, _createClass2.default)(MjImage, [{
    key: "getStyles",
    value: function getStyles() {
      const width = this.getContentWidth();
      const fullWidth = this.getAttribute('full-width') === 'full-width';

      const _widthParser = (0, _widthParser2.default)(width),
            parsedWidth = _widthParser.parsedWidth,
            unit = _widthParser.unit;

      return {
        img: {
          border: this.getAttribute('border'),
          'border-left': this.getAttribute('border-left'),
          'border-right': this.getAttribute('border-right'),
          'border-top': this.getAttribute('border-top'),
          'border-bottom': this.getAttribute('border-bottom'),
          'border-radius': this.getAttribute('border-radius'),
          display: 'block',
          outline: 'none',
          'text-decoration': 'none',
          height: this.getAttribute('height'),
          'max-height': this.getAttribute('max-height'),
          'min-width': fullWidth ? '100%' : null,
          width: '100%',
          'max-width': fullWidth ? '100%' : null,
          'font-size': this.getAttribute('font-size')
        },
        td: {
          width: fullWidth ? null : `${parsedWidth}${unit}`
        },
        table: {
          'min-width': fullWidth ? '100%' : null,
          'max-width': fullWidth ? '100%' : null,
          width: fullWidth ? `${parsedWidth}${unit}` : null,
          'border-collapse': 'collapse',
          'border-spacing': '0px'
        }
      };
    }
  }, {
    key: "getContentWidth",
    value: function getContentWidth() {
      const width = this.getAttribute('width') ? parseInt(this.getAttribute('width'), 10) : Infinity;

      const _this$getBoxWidths = this.getBoxWidths(),
            box = _this$getBoxWidths.box;

      return (0, _min2.default)([box, width]);
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      const height = this.getAttribute('height');
      const img = `
      <img
        ${this.htmlAttributes({
        alt: this.getAttribute('alt'),
        height: height && (height === 'auto' ? height : parseInt(height, 10)),
        src: this.getAttribute('src'),
        srcset: this.getAttribute('srcset'),
        sizes: this.getAttribute('sizes'),
        style: 'img',
        title: this.getAttribute('title'),
        width: this.getContentWidth(),
        usemap: this.getAttribute('usemap')
      })}
      />
    `;

      if (this.getAttribute('href')) {
        return `
        <a
          ${this.htmlAttributes({
          href: this.getAttribute('href'),
          target: this.getAttribute('target'),
          rel: this.getAttribute('rel'),
          name: this.getAttribute('name')
        })}
        >
          ${img}
        </a>
      `;
      }

      return img;
    }
  }, {
    key: "render",
    value: function render() {
      return `
      <table
        ${this.htmlAttributes({
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
        style: 'table',
        class: this.getAttribute('fluid-on-mobile') ? 'mj-full-width-mobile' : null
      })}
      >
        <tbody>
          <tr>
            <td ${this.htmlAttributes({
        style: 'td',
        class: this.getAttribute('fluid-on-mobile') ? 'mj-full-width-mobile' : null
      })}>
              ${this.renderImage()}
            </td>
          </tr>
        </tbody>
      </table>
    `;
    }
  }]);
  return MjImage;
}(_mjmlCore.BodyComponent);

exports.default = MjImage;
(0, _defineProperty2.default)(MjImage, "componentName", 'mj-image');
(0, _defineProperty2.default)(MjImage, "tagOmission", true);
(0, _defineProperty2.default)(MjImage, "allowedAttributes", {
  alt: 'string',
  href: 'string',
  name: 'string',
  src: 'string',
  srcset: 'string',
  sizes: 'string',
  title: 'string',
  rel: 'string',
  align: 'enum(left,center,right)',
  border: 'string',
  'border-bottom': 'string',
  'border-left': 'string',
  'border-right': 'string',
  'border-top': 'string',
  'border-radius': 'unit(px,%){1,4}',
  'container-background-color': 'color',
  'fluid-on-mobile': 'boolean',
  padding: 'unit(px,%){1,4}',
  'padding-bottom': 'unit(px,%)',
  'padding-left': 'unit(px,%)',
  'padding-right': 'unit(px,%)',
  'padding-top': 'unit(px,%)',
  target: 'string',
  width: 'unit(px)',
  height: 'unit(px,auto)',
  'max-height': 'unit(px,%)',
  'font-size': 'unit(px)',
  usemap: 'string'
});
(0, _defineProperty2.default)(MjImage, "defaultAttributes", {
  align: 'center',
  border: '0',
  height: 'auto',
  padding: '10px 25px',
  target: '_blank',
  'font-size': '13px'
});
module.exports = exports.default;