"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _type = require("../types/type");

var _default = (attributes, allowedAttributes) => (0, _reduce2.default)(attributes, (acc, val, attrName) => {
  if (allowedAttributes && allowedAttributes[attrName]) {
    const TypeConstructor = (0, _type.initializeType)(allowedAttributes[attrName]);

    if (TypeConstructor) {
      const type = new TypeConstructor(val);
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, acc), {}, {
        [attrName]: type.getValue()
      });
    }
  }

  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, acc), {}, {
    [attrName]: val
  });
}, {});

exports.default = _default;
module.exports = exports.default;