"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ruleError;

function formatInclude(element) {
  const includedIn = element.includedIn;
  if (!(includedIn && includedIn.length)) return '';
  const formattedIncluded = includedIn.slice().reverse().map(({
    line,
    file
  }) => `line ${line} of file ${file}`).join(', itself included at ');
  return `, included at ${formattedIncluded}`;
}

function ruleError(message, element) {
  const line = element.line,
        tagName = element.tagName,
        absoluteFilePath = element.absoluteFilePath;
  return {
    line,
    message,
    tagName,
    formattedMessage: `Line ${line} of ${absoluteFilePath}${formatInclude(element)} (${tagName}) — ${message}`
  };
}

module.exports = exports.default;