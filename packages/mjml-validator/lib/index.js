"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MJMLValidator;
Object.defineProperty(exports, "rulesCollection", {
  enumerable: true,
  get: function get() {
    return _MJMLRulesCollection.default;
  }
});
Object.defineProperty(exports, "registerRule", {
  enumerable: true,
  get: function get() {
    return _MJMLRulesCollection.registerRule;
  }
});
Object.defineProperty(exports, "dependencies", {
  enumerable: true,
  get: function get() {
    return _dependencies.default;
  }
});
Object.defineProperty(exports, "registerDependencies", {
  enumerable: true,
  get: function get() {
    return _dependencies.registerDependencies;
  }
});
Object.defineProperty(exports, "assignDependencies", {
  enumerable: true,
  get: function get() {
    return _dependencies.assignDependencies;
  }
});
exports.formatValidationError = void 0;

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));

var _ruleError = _interopRequireDefault(require("./rules/ruleError"));

var _MJMLRulesCollection = _interopRequireWildcard(require("./MJMLRulesCollection"));

var _dependencies = _interopRequireWildcard(require("./dependencies"));

const SKIP_ELEMENTS = ['mjml'];
const formatValidationError = _ruleError.default;
exports.formatValidationError = formatValidationError;

function MJMLValidator(element, options = {}) {
  const children = element.children,
        tagName = element.tagName;
  const errors = [];
  const skipElements = options.skipElements || SKIP_ELEMENTS;

  if (options.dependencies == null) {
    console.warn('"dependencies" option should be provided to mjml validator');
  }

  if (!skipElements.includes(tagName)) {
    /*rulesCollection.map((rule) => {
      const ruleError = rule(element, {
        dependencies,
        skipElements,
        ...options,
      })
      if (Array.isArray(ruleError)) {
        errors.push(...ruleError)
      } else if (ruleError) {
        errors.push(ruleError)
      }
    })*/

    /*for (const rule of Object.values(rulesCollection)) {
      const ruleError = rule(element, {
        dependencies,
        skipElements,
        ...options,
      })
      if (Array.isArray(ruleError)) {
        errors.push(...ruleError)
      } else if (ruleError) {
        errors.push(ruleError)
      }
    }*/
  }

  if (children && children.length > 0) {
    var _iterator = (0, _createForOfIteratorHelper2.default)(children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const child = _step.value;
        errors.push(...MJMLValidator(child, options));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return errors;
}