"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child = _interopRequireDefault(require("./child.ejs"));

var _children = _interopRequireDefault(require("./children.ejs"));

var _edit = _interopRequireDefault(require("./edit.ejs"));

var _view = _interopRequireDefault(require("./view.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  child: _child.default,
  children: _children.default,
  edit: _edit.default,
  view: _view.default
};
exports.default = _default;