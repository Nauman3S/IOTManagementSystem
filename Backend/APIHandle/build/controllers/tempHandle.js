"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tempHandlePage = void 0;

var _settings = require("../settings");

var tempHandlePage = function tempHandlePage(req, res) {
  return res.status(200).json({
    message: _settings.testEnvironmentVariable + " NEW DATA"
  });
};

exports.tempHandlePage = tempHandlePage;