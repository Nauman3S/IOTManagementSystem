"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mqtt = _interopRequireDefault(require("mqtt"));

var _cors = _interopRequireDefault(require("cors"));

//import mysql from 'mysql'
//var mongoose = require('mongoose');
//import helmet from 'helmet'
//import 'axios'
//import MqttHandler from './mqtt_handler'
//import axios from 'axios';
// const app=express();
// app.use(helmet())
// app.use(helmet.permittedCrossDomainPolicies({
//       permittedPolicies : "all",
// }));
// app.use(cors({credentials:true , origin:true}))
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// })
var indexRouter = _express["default"].Router(); //const indexRouter = app;


var cashHandleRouter = _express["default"].Router(); //indexRouter.locals.axios=axios;
//axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
// indexRouter.use(cors());
//   indexRouter.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin",'*');
//     res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept');
// })
//const mqtt = require('mqtt')
//const client = mqtt.connect('mqtt://broker.hivemq.com')


var client = _mqtt["default"].connect('mqtt://44.195.192.158');

var garageState = '';
var connected = false;
client.on('connect', function () {
  client.subscribe('iotm-sys/device/add');
  client.subscribe('iotm-sys/device/update/#');
  client.subscribe('iotm-sys/device/upgrade/#');
  client.subscribe('iotm-sys/device/info/#');
});
var mongoDB = 'mongodb://127.0.0.1/my_database';

_mongoose["default"].connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Define schema

var Schema = _mongoose["default"].Schema;
var SomeModelSchema = new Schema({
  a_name: String,
  a_macAddress: String,
  updated_at: String,
  _DeviceId: Schema.Types.ObjectId
}); // Compile model from schema

var SomeModel = _mongoose["default"].model('SomeModel', SomeModelSchema); // Create an instance of model SomeModel
// var awesome_instance = new SomeModel({ a_name: 'awesome' });
// awesome_instance.a_macAddress="TEST:TEST"
// // Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log("saved")
// });
//FIND
// find all athletes who play tennis, selecting the 'name' and 'age' fields


SomeModel.find({
  'a_name': 'awesome'
}, 'a_name a_macAddress updated_at _DeviceId', function (err, athletes) {
  if (err) return handleError(err); // 'athletes' contains the list of athletes that match the criteria.

  console.log(athletes);
});
indexRouter.get('/', (0, _cors["default"])(), _controllers.indexPage);
indexRouter.get('/temp', (0, _cors["default"])(), _controllers.tempHandlePage);
indexRouter.post('/credReq', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.CreditsRequest, req.body.Email];
  var sql = "UPDATE Users SET CreditsRequest='" + values[0] + "' WHERE Email='" + values[1] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    });
  });
});
indexRouter.post('/getUserLedger', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM Ledger WHERE Email='" + req.body.email + "'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.post('/ledgerUpdate', (0, _cors["default"])(), function (req, res) {
  var sql = "INSERT INTO Ledger( FileName, JobType, Email) VALUES (?)";
  var values = [req.body.FileName, req.body.JobType, req.body.Email];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "added successfully"
    });
    client.publish('iotm-sys/printer', JSON.stringify(values));
  });
}); //////////////////////////ADMIN

indexRouter.post('/loginAdmin', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM Admin WHERE Email='" + req.body.email + "' AND Password='" + req.body.password + "'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.post('/updateAdmin', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.FName, req.body.LName, req.body.Email, req.body.Password]; //change to mongodb

  var sql = "UPDATE Admin SET FName='" + values[0] + "', LName='" + values[1] + "', Email='" + values[2] + "', Password='" + values[3] + "' WHERE Email='" + values[2] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    });
  });
});
indexRouter.post('/updateAdminRewVal', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.RewardEqCredits];
  var sql = "UPDATE Admin SET RewardEqCredits='" + values[0] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    });
  });
});
indexRouter.post('/ledgerLog', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM Ledger ";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.post('/upgrade', (0, _cors["default"])(), function (req, res) {
  //upgrade device os
  if (req.body.operation == 'upgrade') {
    if (req.body.devices == 'all') {
      client.publish('iotm-sys/device/osug/all', "start update"); //as mqtt can't publish to wildcards

      client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices");
      res.json({
        status: 200,
        message: "Upgrade pushed to all devices."
      });
    } else {
      if (req.body.devices.length > 5) {
        var q = SomeModel.find({
          'a_macAddress': req.body.devices
        });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, res) {
          if (err) return handleError(err);
          console.log(res);
          console.log("res len: ");
          console.log(res.length);

          if (res.length >= 1) {
            console.log("macAddress found");
            console.log("Device to be updated:");
            console.log(devToBeUpdate[3]);
            client.publish('iotm-sys/device/firmware/' + req.body.devices, "fimrware file/string");
            client.publish('iotm-sys/device/logs', "Update pushed to " + req.body.devices);
          } else {
            console.log("macAddress not found,");
          }
        });
      }
    }
  }
});
indexRouter.get('/listAll', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM data";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.get('/getActive', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM data WHERE ActiveStatus='1'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.get('/getUser', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM Admin";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
client.on('message', function (topic, message) {
  console.log(topic);

  switch (topic) {
    case 'iotm-sys/device/add':
      //check if device already exists?
      var val = message.toString();
      var DataG = val.split(';'); //name;mac;updatedat;devID

      console.log(DataG[1]);
      var q = SomeModel.find({
        'a_macAddress': DataG[1]
      });
      q.select('a_name _DeviceId a_macAddress');
      q.exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res);
        console.log("res len: ");
        console.log(res.length);

        if (res.length >= 1) {
          console.log("macAddress found");
          client.publish('iotm-sys/device/logs', DataG[1] + " is Already in the DB");
        } else {
          console.log("macAddress not found, adding it to the db"); // Create an instance of model SomeModel

          var awesome_instance = new SomeModel({
            a_name: DataG[0]
          });
          awesome_instance.a_macAddress = DataG[1];
          awesome_instance.updated_at = DataG[2]; // Save the new model instance, passing a callback

          awesome_instance.save(function (err) {
            if (err) return handleError(err); // saved!

            console.log("saved");
          });
          client.publish('iotm-sys/device/logs', "Added to the DB");
        }
      });
      break;

    case 'swm-device/SmartWaterMonitor/eventPressureLimitChanged':
      var dataD = message.toString();
      console.log(dataD);
      var DataG = dataD.split(';'); //const currentDate = new Date();

      var timestamp = new Date().toLocaleString();
      handleCreateNew(timestamp, DataG[0], DataG[1]).then(function (results) {
        var strData = JSON.stringify(results[0]); //client.publish('edc-monitor/activePlayer', strData)
      })["catch"](function (err) {
        console.log("Promise rejection error: " + err);
      });
      break;
  }

  if (topic.includes("iotm-sys/device/update/")) {
    if (topic == "iotm-sys/device/update/*") {
      console.log("updating all devices");
      client.publish('iotm-sys/device/firmware/all', "fimrware file/string"); //as mqtt can't publish to wildcards

      client.publish('iotm-sys/device/logs', "Update pushed to all devices");
    } else {
      var devToBeUpdate = topic.split("/");
      var q = SomeModel.find({
        'a_macAddress': devToBeUpdate[3]
      });
      q.select('a_name _DeviceId a_macAddress');
      q.exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res);
        console.log("res len: ");
        console.log(res.length);

        if (res.length >= 1) {
          console.log("macAddress found");
          console.log("Device to be updated:");
          console.log(devToBeUpdate[3]);
          client.publish('iotm-sys/device/firmware/' + devToBeUpdate[3], "fimrware file/string");
          client.publish('iotm-sys/device/logs', "Update pushed to " + devToBeUpdate[3]);
        } else {
          console.log("macAddress not found,");
        }
      });
    }
  }

  if (topic.includes("iotm-sys/device/upgrade/")) {
    if (topic == "iotm-sys/device/upgrade/*") {
      console.log("updating os of all devices");
      client.publish('iotm-sys/device/osug/all', "start update"); //as mqtt can't publish to wildcards

      client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices");
    } else {
      var devToBeUpdate = topic.split("/");
      var q = SomeModel.find({
        'a_macAddress': devToBeUpdate[3]
      });
      q.select('a_name _DeviceId a_macAddress');
      q.exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res);
        console.log("res len: ");
        console.log(res.length);

        if (res.length >= 1) {
          console.log("macAddress found");
          console.log("Device to be updated:");
          console.log(devToBeUpdate[3]);
          client.publish('iotm-sys/device/osug/' + devToBeUpdate[3], "start upgrade");
          client.publish('iotm-sys/device/logs', "Upgrade request pushed to " + devToBeUpdate[3]);
        } else {
          console.log("macAddress not found,");
        }
      });
    }
  }

  if (topic.includes("iotm-sys/device/info/")) {
    if (topic == "iotm-sys/device/info/*") {// console.log("updating os of all devices");
      // client.publish('iotm-sys/device/osug/all', "start update")//as mqtt can't publish to wildcards
      // client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
    } else {
      var devToBeUpdate = topic.split("/");
      var q = SomeModel.find({
        'a_macAddress': devToBeUpdate[3]
      });
      q.select('a_name _DeviceId a_macAddress');
      q.exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res);
        console.log("res len: ");
        console.log(res.length);

        if (res.length >= 1) {
          console.log("macAddress found");
          console.log("Device to be updated:");
          console.log(devToBeUpdate[3]);
          client.publish('iotm-sys/device/info/response/' + devToBeUpdate[3], "info request");
          client.publish('iotm-sys/device/logs', "info requested from " + devToBeUpdate[3]);
        } else {
          console.log("macAddress not found,");
        }
      });
    }
  }
}); //import async from 'async';

function handlegetActive() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM data WHERE ActiveStatus='1'", function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
}

function doesDevExists(PID) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM data WHERE DevID='" + PID + "'", function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
}

function handleDeactivateAll() {
  return new Promise(function (resolve, reject) {
    db.query("UPDATE data SET ActiveStatus='0'", function (err, rows) {
      resolve(rows); // if(rows === undefined){
      //     reject(new Error("Error rows is undefined"));
      // }else{
      //     resolve(rows);
      // }
    });
  });
}

function handleCreateNew(EventTime, DevNAME, ID) {
  return new Promise(function (resolve, reject) {
    var sql = "INSERT INTO VLedger(EventTime, NAME, ID) VALUES (?)";
    var values = [EventTime, PressureValue, RelayState];
    db.query(sql, [values], function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
}

indexRouter.post('/liveValues', (0, _cors["default"])(), function (req, res) {
  res.json({
    status: 200,
    PressureValue: pressureVal,
    RelayState: relayState,
    message: "User lists retrieved successfully"
  }); // let sql = `SELECT * FROM Users WHERE Email='`+req.body.email+`'`;
  // db.query(sql, function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     pressureVal,
  //     message: "User lists retrieved successfully"
  //   })
  // })
});
var _default = indexRouter;
exports["default"] = _default;