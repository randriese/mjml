"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mjmlCore = require("mjml-core");

var _widthParser5 = _interopRequireDefault(require("mjml-core/lib/helpers/widthParser"));

let MjGroup = /*#__PURE__*/function (_BodyComponent) {
  (0, _inherits2.default)(MjGroup, _BodyComponent);

  var _super = (0, _createSuper2.default)(MjGroup);

  function MjGroup() {
    (0, _classCallCheck2.default)(this, MjGroup);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(MjGroup, [{
    key: "getChildContext",
    value: function getChildContext() {
      const parentWidth = this.context.containerWidth;
      const _this$props = this.props,
            nonRawSiblings = _this$props.nonRawSiblings,
            children = _this$props.children;
      const paddingSize = this.getShorthandAttrValue('padding', 'left') + this.getShorthandAttrValue('padding', 'right');
      let containerWidth = this.getAttribute('width') || `${parseFloat(parentWidth) / nonRawSiblings}px`;

      const _widthParser = (0, _widthParser5.default)(containerWidth, {
        parseFloatToInt: false
      }),
            unit = _widthParser.unit,
            parsedWidth = _widthParser.parsedWidth;

      if (unit === '%') {
        containerWidth = `${parseFloat(parentWidth) * parsedWidth / 100 - paddingSize}px`;
      } else {
        containerWidth = `${parsedWidth - paddingSize}px`;
      }

      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, this.context), {}, {
        containerWidth,
        nonRawSiblings: children.length
      });
    }
  }, {
    key: "getStyles",
    value: function getStyles() {
      return {
        div: {
          'font-size': '0',
          'line-height': '0',
          'text-align': 'left',
          display: 'inline-block',
          width: '100%',
          direction: this.getAttribute('direction'),
          'vertical-align': this.getAttribute('vertical-align'),
          'background-color': this.getAttribute('background-color')
        },
        tdOutlook: {
          'vertical-align': this.getAttribute('vertical-align'),
          width: this.getWidthAsPixel()
        }
      };
    }
  }, {
    key: "getParsedWidth",
    value: function getParsedWidth(toString) {
      const nonRawSiblings = this.props.nonRawSiblings;
      const width = this.getAttribute('width') || `${100 / nonRawSiblings}%`;

      const _widthParser2 = (0, _widthParser5.default)(width, {
        parseFloatToInt: false
      }),
            unit = _widthParser2.unit,
            parsedWidth = _widthParser2.parsedWidth;

      if (toString) {
        return `${parsedWidth}${unit}`;
      }

      return {
        unit,
        parsedWidth
      };
    }
  }, {
    key: "getWidthAsPixel",
    value: function getWidthAsPixel() {
      const containerWidth = this.context.containerWidth;

      const _widthParser3 = (0, _widthParser5.default)(this.getParsedWidth(true), {
        parseFloatToInt: false
      }),
            unit = _widthParser3.unit,
            parsedWidth = _widthParser3.parsedWidth;

      if (unit === '%') {
        return `${parseFloat(containerWidth) * parsedWidth / 100}px`;
      }

      return `${parsedWidth}px`;
    }
  }, {
    key: "getColumnClass",
    value: function getColumnClass() {
      const addMediaQuery = this.context.addMediaQuery;
      let className = '';

      const _this$getParsedWidth = this.getParsedWidth(),
            parsedWidth = _this$getParsedWidth.parsedWidth,
            unit = _this$getParsedWidth.unit;

      switch (unit) {
        case '%':
          className = `mj-column-per-${parseInt(parsedWidth, 10)}`;
          break;

        case 'px':
        default:
          className = `mj-column-px-${parseInt(parsedWidth, 10)}`;
          break;
      } // Add className to media queries


      addMediaQuery(className, {
        parsedWidth,
        unit
      });
      return className;
    }
  }, {
    key: "render",
    value: function render() {
      const _this$props2 = this.props,
            children = _this$props2.children,
            nonRawSiblings = _this$props2.nonRawSiblings;

      const _this$getChildContext = this.getChildContext(),
            groupWidth = _this$getChildContext.containerWidth;

      const containerWidth = this.context.containerWidth;

      const getElementWidth = width => {
        if (!width) {
          return `${parseInt(containerWidth, 10) / parseInt(nonRawSiblings, 10)}px`;
        }

        const _widthParser4 = (0, _widthParser5.default)(width, {
          parseFloatToInt: false
        }),
              unit = _widthParser4.unit,
              parsedWidth = _widthParser4.parsedWidth;

        if (unit === '%') {
          return `${100 * parsedWidth / groupWidth}px`;
        }

        return `${parsedWidth}${unit}`;
      };

      let classesName = `${this.getColumnClass()} mj-outlook-group-fix`;

      if (this.getAttribute('css-class')) {
        classesName += ` ${this.getAttribute('css-class')}`;
      }

      return `
      <div
        ${this.htmlAttributes({
        class: classesName,
        style: 'div'
      })}
      >
        <!--[if mso | IE]>
        <table
          ${this.htmlAttributes({
        bgcolor: this.getAttribute('background-color') === 'none' ? undefined : this.getAttribute('background-color'),
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation'
      })}
        >
          <tr>
        <![endif]-->
          ${this.renderChildren(children, {
        attributes: {
          mobileWidth: 'mobileWidth'
        },
        renderer: component => component.constructor.isRawElement() ? component.render() : `
              <!--[if mso | IE]>
              <td
                ${component.htmlAttributes({
          style: {
            align: component.getAttribute('align'),
            'vertical-align': component.getAttribute('vertical-align'),
            width: getElementWidth(component.getWidthAsPixel ? component.getWidthAsPixel() : component.getAttribute('width'))
          }
        })}
              >
              <![endif]-->
                ${component.render()}
              <!--[if mso | IE]>
              </td>
              <![endif]-->
          `
      })}
        <!--[if mso | IE]>
          </tr>
          </table>
        <![endif]-->
      </div>
    `;
    }
  }]);
  return MjGroup;
}(_mjmlCore.BodyComponent);

exports.default = MjGroup;
(0, _defineProperty2.default)(MjGroup, "componentName", 'mj-group');
(0, _defineProperty2.default)(MjGroup, "allowedAttributes", {
  'background-color': 'color',
  direction: 'enum(ltr,rtl)',
  'vertical-align': 'enum(top,bottom,middle)',
  width: 'unit(px,%)'
});
(0, _defineProperty2.default)(MjGroup, "defaultAttributes", {
  direction: 'ltr'
});
module.exports = exports.default;