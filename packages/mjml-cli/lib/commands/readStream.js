"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const stdinSync = () => new Promise(res => {
  let buffer = '';
  const stream = process.stdin;
  stream.on('data', chunck => {
    buffer += chunck;
  });
  stream.on('end', () => res(buffer));
});

var _default = /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const mjml = yield stdinSync();
  return {
    mjml
  };
});

exports.default = _default;
module.exports = exports.default;