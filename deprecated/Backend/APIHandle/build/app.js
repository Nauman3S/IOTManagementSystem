"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

//const cors = require('cors');
//var mysql = require('mysql') // import mysql module
//import cashHandleRouter from './routes/index';
var app = (0, _express["default"])(); //app.use(logger('dev'));//uncomment to enable GET POST LOGS
//app.use(cors());

app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// })

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use('/v1', _index["default"]); //app.use('/v1', indexRouter);

var _default = app;
exports["default"] = _default;