"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignComponents = assignComponents;
exports.registerComponent = registerComponent;
exports.default = void 0;

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

const components = {};

function assignComponents(target, source) {
  var _iterator = (0, _createForOfIteratorHelper2.default)(source),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const component = _step.value;
      target[component.componentName || (0, _kebabCase2.default)(component.name)] = component;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function registerComponent(Component) {
  assignComponents(components, [Component]);
}

var _default = components;
exports.default = _default;