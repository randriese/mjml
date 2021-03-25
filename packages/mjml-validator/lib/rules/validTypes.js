"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateType;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _ruleError = _interopRequireDefault(require("./ruleError"));

function validateType(element, {
  components,
  initializeType
}) {
  const attributes = element.attributes,
        tagName = element.tagName;
  const Component = components[tagName];

  if (!Component) {
    return null;
  }

  const errors = [];

  for (var _i = 0, _Object$entries = Object.entries(attributes || {}); _i < _Object$entries.length; _i++) {
    const _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
          attr = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

    const attrType = Component.allowedAttributes && Component.allowedAttributes[attr];

    if (attrType) {
      const TypeChecker = initializeType(attrType);
      const result = new TypeChecker(value);

      if (result.isValid() === false) {
        errors.push((0, _ruleError.default)(`Attribute ${attr} ${result.getErrorMessage()}`, element));
      }
    }
  }

  return errors;
}

module.exports = exports.default;