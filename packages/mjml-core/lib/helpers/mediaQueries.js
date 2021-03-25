"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMediaQueriesTags;

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

// eslint-disable-next-line import/prefer-default-export
function buildMediaQueriesTags(breakpoint, mediaQueries = {}) {
  if ((0, _isEmpty2.default)(mediaQueries)) {
    return '';
  }

  const baseMediaQueries = (0, _map2.default)(mediaQueries, (mediaQuery, className) => `.${className} ${mediaQuery}`);
  const thunderbirdMediaQueries = (0, _map2.default)(mediaQueries, (mediaQuery, className) => `.moz-text-html .${className} ${mediaQuery}`);
  return `
    <style type="text/css">
      @media only screen and (min-width:${breakpoint}) {
        ${baseMediaQueries.join('\n')}
      }
    </style>
    <style media="screen and (min-width:${breakpoint})">
      ${thunderbirdMediaQueries.join('\n')}
    </style>
  `;
}

module.exports = exports.default;