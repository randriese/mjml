"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validChildren;

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));

var _ruleError = _interopRequireDefault(require("./ruleError"));

function validChildren(element, {
  components,
  dependencies,
  skipElements
}) {
  const children = element.children,
        tagName = element.tagName;
  const Component = components[tagName];

  if (!Component || !children || !children.length) {
    return null;
  }

  const errors = [];

  var _iterator = (0, _createForOfIteratorHelper2.default)(children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const child = _step.value;
      const childTagName = child.tagName;
      const ChildComponent = components[childTagName];
      const parentDependencies = dependencies[tagName] || [];
      const childIsValid = !ChildComponent || skipElements.includes(childTagName) || parentDependencies.includes(childTagName) || parentDependencies.some(dep => dep instanceof RegExp && dep.test(childTagName));

      if (childIsValid === false) {
        const allowedDependencies = Object.keys(dependencies).filter(key => dependencies[key].includes(childTagName) || dependencies[key].some(dep => dep instanceof RegExp && dep.test(childTagName)));
        errors.push((0, _ruleError.default)(`${childTagName} cannot be used inside ${tagName}, only inside: ${allowedDependencies.join(', ')}`, child));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return errors;
}

module.exports = exports.default;