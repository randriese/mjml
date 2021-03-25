"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mjmlCore = require("mjml-core");

let MjTitle = /*#__PURE__*/function (_HeadComponent) {
  (0, _inherits2.default)(MjTitle, _HeadComponent);

  var _super = (0, _createSuper2.default)(MjTitle);

  function MjTitle() {
    (0, _classCallCheck2.default)(this, MjTitle);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(MjTitle, [{
    key: "handler",
    value: function handler() {
      const add = this.context.add;
      add('title', this.getContent());
    }
  }]);
  return MjTitle;
}(_mjmlCore.HeadComponent);

exports.default = MjTitle;
(0, _defineProperty2.default)(MjTitle, "componentName", 'mj-title');
(0, _defineProperty2.default)(MjTitle, "endingTag", true);
module.exports = exports.default;