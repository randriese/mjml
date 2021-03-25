"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = skeleton;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _negate2 = _interopRequireDefault(require("lodash/negate"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _preview = _interopRequireDefault(require("./preview"));

var _fonts = require("./fonts");

var _mediaQueries = _interopRequireDefault(require("./mediaQueries"));

function skeleton(options) {
  const _options$backgroundCo = options.backgroundColor,
        backgroundColor = _options$backgroundCo === void 0 ? '' : _options$backgroundCo,
        _options$breakpoint = options.breakpoint,
        breakpoint = _options$breakpoint === void 0 ? '480px' : _options$breakpoint,
        _options$content = options.content,
        content = _options$content === void 0 ? '' : _options$content,
        _options$fonts = options.fonts,
        fonts = _options$fonts === void 0 ? {} : _options$fonts,
        _options$mediaQueries = options.mediaQueries,
        mediaQueries = _options$mediaQueries === void 0 ? {} : _options$mediaQueries,
        _options$headStyle = options.headStyle,
        headStyle = _options$headStyle === void 0 ? [] : _options$headStyle,
        _options$componentsHe = options.componentsHeadStyle,
        componentsHeadStyle = _options$componentsHe === void 0 ? {} : _options$componentsHe,
        _options$headRaw = options.headRaw,
        headRaw = _options$headRaw === void 0 ? [] : _options$headRaw,
        preview = options.preview,
        _options$title = options.title,
        title = _options$title === void 0 ? '' : _options$title,
        style = options.style,
        inlineStyle = options.inlineStyle,
        lang = options.lang;
  const langAttribute = lang ? `lang="${lang}" ` : '';
  return `
    <!doctype html>
    <html ${langAttribute}xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          ${title}
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        ${(0, _fonts.buildFontsTags)(content, inlineStyle, fonts)}
        ${(0, _mediaQueries.default)(breakpoint, mediaQueries)}
        <style type="text/css">
        ${(0, _reduce2.default)(componentsHeadStyle, (result, compHeadStyle) => `${result}\n${compHeadStyle(breakpoint)}`, '')}
        ${(0, _reduce2.default)(headStyle, (result, headStyle) => `${result}\n${headStyle(breakpoint)}`, '')}
        </style>
        ${style && style.length > 0 ? `<style type="text/css">${style.join('')}</style>` : ''}
        ${headRaw.filter((0, _negate2.default)(_isNil2.default)).join('\n')}
      </head>
      <body style="word-spacing:normal;${backgroundColor ? `background-color:${backgroundColor};` : ''}">
        ${(0, _preview.default)(preview)}
        ${content}
      </body>
    </html>
  `;
}

module.exports = exports.default;