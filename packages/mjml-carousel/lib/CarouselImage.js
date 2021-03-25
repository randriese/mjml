"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mjmlCore = require("mjml-core");

let MjCarouselImage = /*#__PURE__*/function (_BodyComponent) {
  (0, _inherits2.default)(MjCarouselImage, _BodyComponent);

  var _super = (0, _createSuper2.default)(MjCarouselImage);

  function MjCarouselImage() {
    (0, _classCallCheck2.default)(this, MjCarouselImage);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(MjCarouselImage, [{
    key: "getStyles",
    value: function getStyles() {
      return {
        images: {
          img: {
            'border-radius': this.getAttribute('border-radius'),
            display: 'block',
            width: this.context.containerWidth,
            'max-width': '100%',
            height: 'auto'
          },
          firstImageDiv: {},
          otherImageDiv: {
            display: 'none',
            'mso-hide': 'all'
          }
        },
        radio: {
          input: {
            display: 'none',
            'mso-hide': 'all'
          }
        },
        thumbnails: {
          a: {
            border: this.getAttribute('tb-border'),
            'border-radius': this.getAttribute('tb-border-radius'),
            display: 'inline-block',
            overflow: 'hidden',
            width: this.getAttribute('tb-width')
          },
          img: {
            display: 'block',
            width: '100%',
            height: 'auto'
          }
        }
      };
    }
  }, {
    key: "renderThumbnail",
    value: function renderThumbnail() {
      const _this$attributes = this.attributes,
            carouselId = _this$attributes.carouselId,
            src = _this$attributes.src,
            alt = _this$attributes.alt,
            width = _this$attributes['tb-width'],
            target = _this$attributes.target;
      const imgIndex = this.props.index + 1;
      const cssClass = (0, _mjmlCore.suffixCssClasses)(this.getAttribute('css-class'), 'thumbnail');
      return `
      <a
        ${this.htmlAttributes({
        style: 'thumbnails.a',
        href: `#${imgIndex}`,
        target,
        class: `mj-carousel-thumbnail mj-carousel-${carouselId}-thumbnail mj-carousel-${carouselId}-thumbnail-${imgIndex} ${cssClass}`
      })}
      >
        <label ${this.htmlAttributes({
        for: `mj-carousel-${carouselId}-radio-${imgIndex}`
      })}>
          <img
            ${this.htmlAttributes({
        style: 'thumbnails.img',
        src: this.getAttribute('thumbnails-src') || src,
        alt,
        width: parseInt(width, 10)
      })}
          />
        </label>
      </a>
    `;
    }
  }, {
    key: "renderRadio",
    value: function renderRadio() {
      const index = this.props.index;
      const carouselId = this.getAttribute('carouselId');
      return `
      <input
        ${this.htmlAttributes({
        class: `mj-carousel-radio mj-carousel-${carouselId}-radio mj-carousel-${carouselId}-radio-${index + 1}`,
        checked: index === 0 ? 'checked' : null,
        type: 'radio',
        name: `mj-carousel-radio-${carouselId}`,
        id: `mj-carousel-${carouselId}-radio-${index + 1}`,
        style: 'radio.input'
      })}
      />
    `;
    }
  }, {
    key: "render",
    value: function render() {
      const _this$attributes2 = this.attributes,
            src = _this$attributes2.src,
            alt = _this$attributes2.alt,
            href = _this$attributes2.href,
            rel = _this$attributes2.rel,
            title = _this$attributes2.title;
      const index = this.props.index;
      const image = `
      <img
        ${this.htmlAttributes({
        title,
        src,
        alt,
        style: 'images.img',
        width: parseInt(this.context.containerWidth, 10),
        border: '0'
      })} />
    `;
      const cssClass = this.getAttribute('css-class') || '';
      return `
      <div
        ${this.htmlAttributes({
        class: `mj-carousel-image mj-carousel-image-${index + 1} ${cssClass}`,
        style: index === 0 ? 'images.firstImageDiv' : 'images.otherImageDiv'
      })}
      >
        ${href ? `<a href=${href} rel=${rel} target="_blank">${image}</a>` : image}
      </div>
    `;
    }
  }]);
  return MjCarouselImage;
}(_mjmlCore.BodyComponent);

exports.default = MjCarouselImage;
(0, _defineProperty2.default)(MjCarouselImage, "componentName", 'mj-carousel-image');
(0, _defineProperty2.default)(MjCarouselImage, "endingTag", true);
(0, _defineProperty2.default)(MjCarouselImage, "allowedAttributes", {
  alt: 'string',
  href: 'string',
  rel: 'string',
  title: 'string',
  src: 'string',
  'thumbnails-src': 'string',
  'border-radius': 'unit(px,%){1,4}',
  'tb-border': 'string',
  'tb-border-radius': 'unit(px,%){1,4}'
});
(0, _defineProperty2.default)(MjCarouselImage, "defaultAttributes", {
  target: '_blank'
});
module.exports = exports.default;