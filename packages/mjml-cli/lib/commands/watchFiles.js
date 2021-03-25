"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _remove2 = _interopRequireDefault(require("lodash/fp/remove"));

var _difference2 = _interopRequireDefault(require("lodash/fp/difference"));

var _uniq2 = _interopRequireDefault(require("lodash/fp/uniq"));

var _flatMap3 = _interopRequireDefault(require("lodash/fp/flatMap"));

var _pickBy2 = _interopRequireDefault(require("lodash/fp/pickBy"));

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _mjmlCore = _interopRequireDefault(require("mjml-core"));

var _readFile = _interopRequireDefault(require("./readFile"));

var _outputToFile = _interopRequireDefault(require("./outputToFile"));

var _fileContext = _interopRequireDefault(require("../helpers/fileContext"));

/* eslint-disable no-console */
let dirty = [];

const _flatMap = _flatMap3.default.convert({
  cap: false
}); // eslint-disable-line no-underscore-dangle


const flatMapAndJoin = _flatMap((v, k) => v.map(p => _path.default.join(k, p)));

const flatMapKeyAndValues = (0, _flow2.default)(_flatMap((v, k) => [k, ...v]), _uniq2.default);

var _default = (input, options) => {
  console.log(`Now watching: ${input}`);
  const dependencies = {};
  const outputToFile = (0, _outputToFile.default)(options.o);

  const getRelatedFiles = file => (0, _flow2.default)((0, _pickBy2.default)((v, k) => k === file || v.indexOf(file) !== -1), Object.keys)(dependencies);

  const synchronyzeWatcher = filePath => {
    getRelatedFiles(filePath).forEach(f => {
      dependencies[f] = (0, _fileContext.default)(f, options.config.filePath);

      if (dirty.indexOf(f) === -1) {
        dirty.push(f);
      }
    });
    /* eslint-disable no-use-before-define */

    const files = {
      toWatch: flatMapKeyAndValues(dependencies),
      watched: flatMapAndJoin(watcher.getWatched())
    };
    watcher.add((0, _difference2.default)(files.toWatch, files.watched));
    watcher.unwatch((0, _difference2.default)(files.watched, files.toWatch));
    /* eslint-enable no-use-before-define */
  };

  const readAndCompile = (0, _flow2.default)(file => ({
    file,
    content: (0, _readFile.default)(file).mjml
  }), args => (0, _objectSpread2.default)((0, _objectSpread2.default)({}, args), {}, {
    compiled: (0, _mjmlCore.default)(args.content, (0, _objectSpread2.default)({
      filePath: args.file,
      actualPath: args.file
    }, options.config))
  }), args => {
    const errors = args.compiled.errors;
    errors.forEach(e => console.warn(e.formattedMessage));
    return args;
  }, args => outputToFile(args).then(() => console.log(`${args.file} - Successfully compiled`)).catch(() => console.log(`${args.file} - Error while compiling file`)));

  const watcher = _chokidar.default.watch(input.map(i => i.replace(/\\/g, '/'))).on('change', file => synchronyzeWatcher(_path.default.resolve(file))).on('add', file => {
    const filePath = _path.default.resolve(file);

    const matchInputOption = input.reduce((found, file) => found || (0, _glob.default)(_path.default.resolve(file)).minimatch.match(filePath), false);

    if (matchInputOption) {
      dependencies[filePath] = getRelatedFiles(filePath);
    }

    synchronyzeWatcher(filePath);
  }).on('unlink', file => {
    const filePath = _path.default.resolve(file);

    delete dependencies[_path.default.resolve(filePath)];
    (0, _remove2.default)(dirty, f => f === filePath);
    synchronyzeWatcher(filePath);
  });

  setInterval(() => {
    dirty.forEach(f => {
      console.log(`${f} - Change detected`);

      try {
        readAndCompile(f);
      } catch (e) {
        console.log(`${f} - Error while rendering the file : `, e);
      }
    });
    dirty = [];
  }, 500);
  return [];
};
/* eslint-enable no-console */


exports.default = _default;
module.exports = exports.default;