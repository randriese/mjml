"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initComponent = initComponent;
exports.HeadComponent = exports.BodyComponent = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _identity2 = _interopRequireDefault(require("lodash/identity"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _mjmlParserXml = _interopRequireDefault(require("mjml-parser-xml"));

var _shorthandParser = _interopRequireWildcard(require("./helpers/shorthandParser"));

var _formatAttributes = _interopRequireDefault(require("./helpers/formatAttributes"));

var _jsonToXML = _interopRequireDefault(require("./helpers/jsonToXML"));

function initComponent({
  initialDatas,
  name
}) {
  const Component = initialDatas.context.components[name];

  if (Component) {
    const component = new Component(initialDatas);

    if (component.headStyle) {
      component.context.addHeadStyle(name, component.headStyle);
    }

    if (component.componentHeadStyle) {
      component.context.addComponentHeadSyle(component.componentHeadStyle);
    }

    return component;
  }

  return null;
}

let Component = /*#__PURE__*/function () {
  (0, _createClass2.default)(Component, null, [{
    key: "getTagName",
    value: function getTagName() {
      return this.componentName || (0, _kebabCase2.default)(this.name);
    }
  }, {
    key: "isRawElement",
    value: function isRawElement() {
      return !!this.rawElement;
    }
  }]);

  function Component(initialDatas = {}) {
    (0, _classCallCheck2.default)(this, Component);
    const _initialDatas$attribu = initialDatas.attributes,
          attributes = _initialDatas$attribu === void 0 ? {} : _initialDatas$attribu,
          _initialDatas$childre = initialDatas.children,
          children = _initialDatas$childre === void 0 ? [] : _initialDatas$childre,
          _initialDatas$content = initialDatas.content,
          content = _initialDatas$content === void 0 ? '' : _initialDatas$content,
          _initialDatas$context = initialDatas.context,
          context = _initialDatas$context === void 0 ? {} : _initialDatas$context,
          _initialDatas$props = initialDatas.props,
          props = _initialDatas$props === void 0 ? {} : _initialDatas$props,
          _initialDatas$globalA = initialDatas.globalAttributes,
          globalAttributes = _initialDatas$globalA === void 0 ? {} : _initialDatas$globalA;
    this.props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
      children,
      content
    });
    this.attributes = (0, _formatAttributes.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, this.constructor.defaultAttributes), globalAttributes), attributes), this.constructor.allowedAttributes);
    this.context = context;
    return this;
  }

  (0, _createClass2.default)(Component, [{
    key: "getChildContext",
    value: function getChildContext() {
      return this.context;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this.attributes[name];
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.props.content.trim();
    }
  }, {
    key: "renderMJML",
    value: function renderMJML(mjml, options = {}) {
      if (typeof mjml === 'string') {
        // supports returning siblings elements from a custom component
        const partialMjml = (0, _mjmlParserXml.default)(`<fragment>${mjml}</fragment>`, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, options), {}, {
          components: this.context.components,
          ignoreIncludes: true
        }));
        return partialMjml.children.map(child => this.context.processing(child, this.context)).join('');
      }

      return this.context.processing(mjml, this.context);
    }
  }]);
  return Component;
}();

(0, _defineProperty2.default)(Component, "defaultAttributes", {});

let BodyComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(BodyComponent, _Component);

  var _super = (0, _createSuper2.default)(BodyComponent);

  function BodyComponent() {
    (0, _classCallCheck2.default)(this, BodyComponent);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(BodyComponent, [{
    key: "getStyles",
    // eslint-disable-next-line class-methods-use-this
    value: function getStyles() {
      return {};
    }
  }, {
    key: "getShorthandAttrValue",
    value: function getShorthandAttrValue(attribute, direction) {
      const mjAttributeDirection = this.getAttribute(`${attribute}-${direction}`);
      const mjAttribute = this.getAttribute(attribute);

      if (mjAttributeDirection) {
        return parseInt(mjAttributeDirection, 10);
      }

      if (!mjAttribute) {
        return 0;
      }

      return (0, _shorthandParser.default)(mjAttribute, direction);
    }
  }, {
    key: "getShorthandBorderValue",
    value: function getShorthandBorderValue(direction) {
      const borderDirection = direction && this.getAttribute(`border-${direction}`);
      const border = this.getAttribute('border');
      return (0, _shorthandParser.borderParser)(borderDirection || border || '0');
    }
  }, {
    key: "getBoxWidths",
    value: function getBoxWidths() {
      const containerWidth = this.context.containerWidth;
      const parsedWidth = parseInt(containerWidth, 10);
      const paddings = this.getShorthandAttrValue('padding', 'right') + this.getShorthandAttrValue('padding', 'left');
      const borders = this.getShorthandBorderValue('right') + this.getShorthandBorderValue('left');
      return {
        totalWidth: parsedWidth,
        borders,
        paddings,
        box: parsedWidth - paddings - borders
      };
    }
  }, {
    key: "htmlAttributes",
    value: function htmlAttributes(attributes) {
      const specialAttributes = {
        style: v => this.styles(v),
        default: _identity2.default
      };
      return (0, _reduce2.default)(attributes, (output, v, name) => {
        const value = (specialAttributes[name] || specialAttributes.default)(v);

        if (!(0, _isNil2.default)(value)) {
          return `${output} ${name}="${value}"`;
        }

        return output;
      }, '');
    }
  }, {
    key: "styles",
    value: function styles(_styles) {
      let stylesObject;

      if (_styles) {
        if (typeof _styles === 'string') {
          stylesObject = (0, _get2.default)(this.getStyles(), _styles);
        } else {
          stylesObject = _styles;
        }
      }

      return (0, _reduce2.default)(stylesObject, (output, value, name) => {
        if (!(0, _isNil2.default)(value)) {
          return `${output}${name}:${value};`;
        }

        return output;
      }, '');
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(children, options = {}) {
      const _options$props = options.props,
            props = _options$props === void 0 ? {} : _options$props,
            _options$renderer = options.renderer,
            renderer = _options$renderer === void 0 ? component => component.render() : _options$renderer,
            _options$attributes = options.attributes,
            attributes = _options$attributes === void 0 ? {} : _options$attributes,
            _options$rawXML = options.rawXML,
            rawXML = _options$rawXML === void 0 ? false : _options$rawXML;
      children = children || this.props.children;

      if (rawXML) {
        return children.map(child => (0, _jsonToXML.default)(child)).join('\n');
      }

      const sibling = children.length;
      const rawComponents = (0, _filter2.default)(this.context.components, c => c.isRawElement());
      const nonRawSiblings = children.filter(child => !(0, _find2.default)(rawComponents, c => c.getTagName() === child.tagName)).length;
      let output = '';
      let index = 0;
      (0, _forEach2.default)(children, children => {
        const component = initComponent({
          name: children.tagName,
          initialDatas: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, children), {}, {
            attributes: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, attributes), children.attributes),
            context: this.getChildContext(),
            props: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
              first: index === 0,
              index,
              last: index + 1 === sibling,
              sibling,
              nonRawSiblings
            })
          })
        });

        if (component !== null) {
          output += renderer(component);
        }

        index++; // eslint-disable-line no-plusplus
      });
      return output;
    }
  }]);
  return BodyComponent;
}(Component);

exports.BodyComponent = BodyComponent;

let HeadComponent = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(HeadComponent, _Component2);

  var _super2 = (0, _createSuper2.default)(HeadComponent);

  function HeadComponent() {
    (0, _classCallCheck2.default)(this, HeadComponent);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2.default)(HeadComponent, [{
    key: "handlerChildren",
    value: function handlerChildren() {
      const children = this.props.children;
      return children.map(children => {
        const component = initComponent({
          name: children.tagName,
          initialDatas: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, children), {}, {
            context: this.getChildContext()
          })
        });

        if (!component) {
          // eslint-disable-next-line no-console
          console.error(`No matching component for tag : ${children.tagName}`);
          return null;
        }

        if (component.handler) {
          component.handler();
        }

        if (component.render) {
          return component.render();
        }

        return null;
      });
    }
  }], [{
    key: "getTagName",
    value: function getTagName() {
      return this.componentName || (0, _kebabCase2.default)(this.name);
    }
  }]);
  return HeadComponent;
}(Component);

exports.HeadComponent = HeadComponent;