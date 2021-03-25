"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mjml2html;
Object.defineProperty(exports, "initComponent", {
  enumerable: true,
  get: function get() {
    return _createComponent.initComponent;
  }
});
Object.defineProperty(exports, "BodyComponent", {
  enumerable: true,
  get: function get() {
    return _createComponent.BodyComponent;
  }
});
Object.defineProperty(exports, "HeadComponent", {
  enumerable: true,
  get: function get() {
    return _createComponent.HeadComponent;
  }
});
Object.defineProperty(exports, "components", {
  enumerable: true,
  get: function get() {
    return _components.default;
  }
});
Object.defineProperty(exports, "registerComponent", {
  enumerable: true,
  get: function get() {
    return _components.registerComponent;
  }
});
Object.defineProperty(exports, "assignComponents", {
  enumerable: true,
  get: function get() {
    return _components.assignComponents;
  }
});
Object.defineProperty(exports, "suffixCssClasses", {
  enumerable: true,
  get: function get() {
    return _suffixCssClasses.default;
  }
});
Object.defineProperty(exports, "initializeType", {
  enumerable: true,
  get: function get() {
    return _type.initializeType;
  }
});
Object.defineProperty(exports, "handleMjmlConfig", {
  enumerable: true,
  get: function get() {
    return _mjmlconfig.default;
  }
});

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _identity2 = _interopRequireDefault(require("lodash/identity"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _path = _interopRequireDefault(require("path"));

var _juice = _interopRequireDefault(require("juice"));

var _jsBeautify = require("js-beautify");

var _htmlMinifier = require("html-minifier");

var _cheerio = _interopRequireDefault(require("cheerio"));

var _mjmlParserXml = _interopRequireDefault(require("mjml-parser-xml"));

var _mjmlValidator = _interopRequireWildcard(require("mjml-validator"));

var _mjmlMigrate = require("mjml-migrate");

var _createComponent = require("./createComponent");

var _components = _interopRequireWildcard(require("./components"));

var _suffixCssClasses = _interopRequireDefault(require("./helpers/suffixCssClasses"));

var _mergeOutlookConditionnals = _interopRequireDefault(require("./helpers/mergeOutlookConditionnals"));

var _minifyOutlookConditionnals = _interopRequireDefault(require("./helpers/minifyOutlookConditionnals"));

var _skeleton = _interopRequireDefault(require("./helpers/skeleton"));

var _type = require("./types/type");

var _mjmlconfig = _interopRequireWildcard(require("./helpers/mjmlconfig"));

const isNode = require('detect-node');

let ValidationError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(ValidationError, _Error);

  var _super = (0, _createSuper2.default)(ValidationError);

  function ValidationError(message, errors) {
    var _this;

    (0, _classCallCheck2.default)(this, ValidationError);
    _this = _super.call(this, message);
    _this.errors = errors;
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

function mjml2html(mjml, options = {}) {
  let content = '';
  let errors = [];

  if (isNode && typeof options.skeleton === 'string') {
    /* eslint-disable global-require */

    /* eslint-disable import/no-dynamic-require */
    options.skeleton = require(options.skeleton.charAt(0) === '.' ? _path.default.resolve(process.cwd(), options.skeleton) : options.skeleton);
    /* eslint-enable global-require */

    /* eslint-enable import/no-dynamic-require */
  }

  let packages = {};
  let confOptions = {};
  let mjmlConfigOptions = {};
  let error = null;
  let componentRootPath = null;

  if (isNode && options.useMjmlConfigOptions || options.mjmlConfigPath) {
    const mjmlConfigContent = (0, _mjmlconfig.readMjmlConfig)(options.mjmlConfigPath);
    var _mjmlConfigContent$mj = mjmlConfigContent.mjmlConfig;
    packages = _mjmlConfigContent$mj.packages;
    confOptions = _mjmlConfigContent$mj.options;
    componentRootPath = mjmlConfigContent.componentRootPath;
    error = mjmlConfigContent.error;

    if (options.useMjmlConfigOptions) {
      mjmlConfigOptions = confOptions;
    }
  } // if mjmlConfigPath is specified then we need to register components it on each call


  if (isNode && !error && options.mjmlConfigPath) {
    (0, _mjmlconfig.handleMjmlConfigComponents)(packages, componentRootPath, _components.registerComponent);
  }

  const _mjmlConfigOptions$op = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, mjmlConfigOptions), options),
        _mjmlConfigOptions$op2 = _mjmlConfigOptions$op.beautify,
        beautify = _mjmlConfigOptions$op2 === void 0 ? false : _mjmlConfigOptions$op2,
        _mjmlConfigOptions$op3 = _mjmlConfigOptions$op.fonts,
        fonts = _mjmlConfigOptions$op3 === void 0 ? {
    'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
    'Droid Sans': 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
    Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
    Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    Ubuntu: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700'
  } : _mjmlConfigOptions$op3,
        keepComments = _mjmlConfigOptions$op.keepComments,
        _mjmlConfigOptions$op4 = _mjmlConfigOptions$op.minify,
        minify = _mjmlConfigOptions$op4 === void 0 ? false : _mjmlConfigOptions$op4,
        _mjmlConfigOptions$op5 = _mjmlConfigOptions$op.minifyOptions,
        minifyOptions = _mjmlConfigOptions$op5 === void 0 ? {} : _mjmlConfigOptions$op5,
        _mjmlConfigOptions$op6 = _mjmlConfigOptions$op.ignoreIncludes,
        ignoreIncludes = _mjmlConfigOptions$op6 === void 0 ? false : _mjmlConfigOptions$op6,
        _mjmlConfigOptions$op7 = _mjmlConfigOptions$op.juiceOptions,
        juiceOptions = _mjmlConfigOptions$op7 === void 0 ? {} : _mjmlConfigOptions$op7,
        _mjmlConfigOptions$op8 = _mjmlConfigOptions$op.juicePreserveTags,
        juicePreserveTags = _mjmlConfigOptions$op8 === void 0 ? null : _mjmlConfigOptions$op8,
        _mjmlConfigOptions$op9 = _mjmlConfigOptions$op.skeleton,
        skeleton = _mjmlConfigOptions$op9 === void 0 ? _skeleton.default : _mjmlConfigOptions$op9,
        _mjmlConfigOptions$op10 = _mjmlConfigOptions$op.validationLevel,
        validationLevel = _mjmlConfigOptions$op10 === void 0 ? 'soft' : _mjmlConfigOptions$op10,
        _mjmlConfigOptions$op11 = _mjmlConfigOptions$op.filePath,
        filePath = _mjmlConfigOptions$op11 === void 0 ? '.' : _mjmlConfigOptions$op11,
        _mjmlConfigOptions$op12 = _mjmlConfigOptions$op.actualPath,
        actualPath = _mjmlConfigOptions$op12 === void 0 ? '.' : _mjmlConfigOptions$op12,
        _mjmlConfigOptions$op13 = _mjmlConfigOptions$op.noMigrateWarn,
        noMigrateWarn = _mjmlConfigOptions$op13 === void 0 ? false : _mjmlConfigOptions$op13,
        preprocessors = _mjmlConfigOptions$op.preprocessors,
        _mjmlConfigOptions$op14 = _mjmlConfigOptions$op.presets,
        presets = _mjmlConfigOptions$op14 === void 0 ? [] : _mjmlConfigOptions$op14;

  const components = (0, _objectSpread2.default)({}, _components.default);
  const dependencies = (0, _mjmlValidator.assignDependencies)({}, _mjmlValidator.dependencies);

  var _iterator = (0, _createForOfIteratorHelper2.default)(presets),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const preset = _step.value;
      (0, _components.assignComponents)(components, preset.components);
      (0, _mjmlValidator.assignDependencies)(dependencies, preset.dependencies);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (typeof mjml === 'string') {
    mjml = (0, _mjmlParserXml.default)(mjml, {
      keepComments,
      components,
      filePath,
      actualPath,
      preprocessors,
      ignoreIncludes
    });
  }

  mjml = (0, _mjmlMigrate.handleMjml3)(mjml, {
    noMigrateWarn
  });
  const globalDatas = {
    backgroundColor: '',
    breakpoint: '480px',
    classes: {},
    classesDefault: {},
    defaultAttributes: {},
    htmlAttributes: {},
    fonts,
    inlineStyle: [],
    headStyle: {},
    componentsHeadStyle: [],
    headRaw: [],
    mediaQueries: {},
    preview: '',
    style: [],
    title: '',
    lang: (0, _get2.default)(mjml, 'attributes.lang')
  };
  const validatorOptions = {
    components,
    dependencies,
    initializeType: _type.initializeType
  };

  switch (validationLevel) {
    case 'skip':
      break;

    case 'strict':
      errors = (0, _mjmlValidator.default)(mjml, validatorOptions);

      if (errors.length > 0) {
        throw new ValidationError(`ValidationError: \n ${errors.map(e => e.formattedMessage).join('\n')}`, errors);
      }

      break;

    case 'soft':
    default:
      errors = (0, _mjmlValidator.default)(mjml, validatorOptions);
      break;
  }

  const mjBody = (0, _find2.default)(mjml.children, {
    tagName: 'mj-body'
  });
  const mjHead = (0, _find2.default)(mjml.children, {
    tagName: 'mj-head'
  });

  const _processing = (node, context, parseMJML = _identity2.default) => {
    if (!node) {
      return;
    }

    const component = (0, _createComponent.initComponent)({
      name: node.tagName,
      initialDatas: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, parseMJML(node)), {}, {
        context
      })
    });

    if (component !== null) {
      if ('handler' in component) {
        return component.handler(); // eslint-disable-line consistent-return
      }

      if ('render' in component) {
        return component.render(); // eslint-disable-line consistent-return
      }
    }
  };

  const applyAttributes = mjml => {
    const parse = (mjml, parentMjClass = '') => {
      const attributes = mjml.attributes,
            tagName = mjml.tagName,
            children = mjml.children;
      const classes = (0, _get2.default)(mjml.attributes, 'mj-class', '').split(' ');
      const attributesClasses = (0, _reduce2.default)(classes, (acc, value) => {
        const mjClassValues = globalDatas.classes[value];
        let multipleClasses = {};

        if (acc['css-class'] && (0, _get2.default)(mjClassValues, 'css-class')) {
          multipleClasses = {
            'css-class': `${acc['css-class']} ${mjClassValues['css-class']}`
          };
        }

        return (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, acc), mjClassValues), multipleClasses);
      }, {});
      const defaultAttributesForClasses = (0, _reduce2.default)(parentMjClass.split(' '), (acc, value) => (0, _objectSpread2.default)((0, _objectSpread2.default)({}, acc), (0, _get2.default)(globalDatas.classesDefault, `${value}.${tagName}`)), {});
      const nextParentMjClass = (0, _get2.default)(attributes, 'mj-class', parentMjClass);
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, mjml), {}, {
        attributes: (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, globalDatas.defaultAttributes[tagName]), attributesClasses), defaultAttributesForClasses), (0, _omit2.default)(attributes, ['mj-class'])),
        globalAttributes: (0, _objectSpread2.default)({}, globalDatas.defaultAttributes['mj-all']),
        children: (0, _map2.default)(children, mjml => parse(mjml, nextParentMjClass))
      });
    };

    return parse(mjml);
  };

  const bodyHelpers = {
    components,

    addMediaQuery(className, {
      parsedWidth,
      unit
    }) {
      globalDatas.mediaQueries[className] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`;
    },

    addHeadStyle(identifier, headStyle) {
      globalDatas.headStyle[identifier] = headStyle;
    },

    addComponentHeadSyle(headStyle) {
      globalDatas.componentsHeadStyle.push(headStyle);
    },

    setBackgroundColor: color => {
      globalDatas.backgroundColor = color;
    },
    processing: (node, context) => _processing(node, context, applyAttributes)
  };
  const headHelpers = {
    components,

    add(attr, ...params) {
      if (Array.isArray(globalDatas[attr])) {
        globalDatas[attr].push(...params);
      } else if (Object.prototype.hasOwnProperty.call(globalDatas, attr)) {
        if (params.length > 1) {
          if ((0, _isObject2.default)(globalDatas[attr][params[0]])) {
            globalDatas[attr][params[0]] = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, globalDatas[attr][params[0]]), params[1]);
          } else {
            // eslint-disable-next-line prefer-destructuring
            globalDatas[attr][params[0]] = params[1];
          }
        } else {
          // eslint-disable-next-line prefer-destructuring
          globalDatas[attr] = params[0];
        }
      } else {
        throw Error(`An mj-head element add an unkown head attribute : ${attr} with params ${Array.isArray(params) ? params.join('') : params}`);
      }
    }

  };
  globalDatas.headRaw = _processing(mjHead, headHelpers);
  content = _processing(mjBody, bodyHelpers, applyAttributes);
  content = (0, _minifyOutlookConditionnals.default)(content);

  if (!(0, _isEmpty2.default)(globalDatas.htmlAttributes)) {
    const $ = _cheerio.default.load(content, {
      xmlMode: true,
      // otherwise it may move contents that aren't in any tag
      decodeEntities: false // won't escape special characters

    });

    (0, _each2.default)(globalDatas.htmlAttributes, (data, selector) => {
      (0, _each2.default)(data, (value, attrName) => {
        $(selector).each(function getAttr() {
          $(this).attr(attrName, value || '');
        });
      });
    });
    content = $.root().html();
  }

  content = skeleton((0, _objectSpread2.default)({
    content
  }, globalDatas));

  if (globalDatas.inlineStyle.length > 0) {
    if (juicePreserveTags) {
      (0, _each2.default)(juicePreserveTags, (val, key) => {
        _juice.default.codeBlocks[key] = val;
      });
    }

    content = (0, _juice.default)(content, (0, _objectSpread2.default)({
      applyStyleTags: false,
      extraCss: globalDatas.inlineStyle.join(''),
      insertPreservedExtraCss: false,
      removeStyleTags: false
    }, juiceOptions));
  }

  content = (0, _mergeOutlookConditionnals.default)(content);

  if (beautify) {
    // eslint-disable-next-line no-console
    console.warn('"beautify" option is deprecated in mjml-core and only available in mjml cli.');
    content = (0, _jsBeautify.html)(content, {
      indent_size: 2,
      wrap_attributes_indent_size: 2,
      max_preserve_newline: 0,
      preserve_newlines: false
    });
  }

  if (minify) {
    // eslint-disable-next-line no-console
    console.warn('"minify" option is deprecated in mjml-core and only available in mjml cli.');
    content = (0, _htmlMinifier.minify)(content, (0, _objectSpread2.default)({
      collapseWhitespace: true,
      minifyCSS: false,
      caseSensitive: true,
      removeEmptyAttributes: true
    }, minifyOptions));
  }

  return {
    html: content,
    json: mjml,
    errors
  };
}

if (isNode) {
  (0, _mjmlconfig.default)(process.cwd(), _components.registerComponent);
}