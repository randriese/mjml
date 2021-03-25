"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.registerDependencies = exports.assignDependencies = void 0;

const assignDependencies = (target, ...sources) => {
  if (sources.length === 0) {
    return target;
  }

  for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
    const source = _sources[_i];

    if (typeof source === 'object' && source !== null) {
      for (var _i2 = 0, _Object$keys = Object.keys(source); _i2 < _Object$keys.length; _i2++) {
        const tag = _Object$keys[_i2];

        if (typeof tag === 'string') {
          const list = [];

          if (target[tag]) {
            list.push(...target[tag]);
          }

          if (source[tag]) {
            list.push(...source[tag]);
          }

          target[tag] = Array.from(new Set(list));
        } else {
          console.warn('dependency "tag" must be of type string');
        }
      }
    } else {
      console.warn('"dependencies" must be an object.');
    }
  }

  return target;
};

exports.assignDependencies = assignDependencies;
const dependencies = {};

const registerDependencies = dep => {
  assignDependencies(dependencies, dep);
};

exports.registerDependencies = registerDependencies;
var _default = dependencies;
exports.default = _default;