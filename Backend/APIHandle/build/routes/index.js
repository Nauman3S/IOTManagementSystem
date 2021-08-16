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


var client = _mqtt["default"].connect('mqtt://broker.hivemq.com');

var garageState = '';
var connected = false;
client.on('connect', function () {
  client.subscribe('swm-device/SmartWaterMonitor/pressure');
  client.subscribe('swm-device/SmartWaterMonitor/eventPressureLimitChanged');
  client.subscribe('swm-device/SmartWaterMonitor/relayState'); // client.subscribe('swm-device/Smar')
  //client.subscribe('edc-monitor/createNew')
  //client.subscribe('edc-monitor/updatePlayer')
  //client.subscribe('edc-monitor/playerExists')
}); // var db = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'swpm-mysqldb',
//   database: 'smartwaterpressure',
//   multipleStatements: true
// })
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

var mongoDB = 'mongodb://44.195.192.158/my_database';

_mongoose["default"].connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
indexRouter.get('/', (0, _cors["default"])(), _controllers.indexPage);
indexRouter.get('/csh', (0, _cors["default"])(), _controllers.tempHandlePage);
indexRouter.post('/getLogs', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM VLedger";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "Logs"
    });
  });
});
indexRouter.post('/verifyFingerPrint', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM VLedger WHERE Fingerprint='" + req.body.Fingerprint + "'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "Verification"
    });
  });
});
indexRouter.post('/newFingerPrint', (0, _cors["default"])(), function (req, res) {
  var sql = "INSERT INTO VLedger(Fingerprint, LastVend, MachineNumber, TotalVends) VALUES (?)";
  var values = [req.body.Fingerprint, req.body.LastVend, req.body.MachineNumber, '0'];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New fingerprint added successfully"
    });
  });
  client.publish('vend-machine/vend', values[2]);
}); //UPDATE Users SET Credits=(CreditsRequest+Credits), CreditsRequest='0' WHERE Email='n@n.com'

indexRouter.post('/vend', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.Fingerprint, req.body.LastVend, req.body.MachineNumber];
  var sql = "UPDATE VLedger SET LastVend='" + values[1] + "' ,MachineNumber='" + values[2] + "' , TotalVends=(TotalVends+1) WHERE Fingerprint='" + values[0] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "vending initiated"
    });
  });
  client.publish('vend-machine/vend', values[2]);
});
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
indexRouter.get('/rewardEqCredits', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT RewardEqCredits FROM Admin";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
    });
  });
});
indexRouter.post('/rewardToCred', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.RewardPoints, req.body.Credits, req.body.Email];
  var sql = "UPDATE Users SET RewardPoints='" + values[0] + "' ,Credits='" + values[1] + "' WHERE Email='" + values[2] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    });
  });
}); //On new jobs//

indexRouter.post('/rewardCredsUpdate', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.RewardPoints, req.body.Credits, req.body.Email];
  var sql = "UPDATE Users SET RewardPoints='" + values[0] + "' ,Credits='" + values[1] + "' WHERE Email='" + values[2] + "'";
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
  var sql = "INSERT INTO Ledger( FileName, JobType, CreditsUsed, RewardPointsEarned, Email) VALUES (?)";
  var values = [req.body.FileName, req.body.JobType, req.body.CreditsUsed, req.body.RewardPointsEarned, req.body.Email];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    });
    client.publish('bkc-device/printer', JSON.stringify(values));
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
  var values = [req.body.FName, req.body.LName, req.body.Email, req.body.Password];
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
indexRouter.post('/allCredReqs', (0, _cors["default"])(), function (req, res) {
  var sql = "SELECT * FROM Users WHERE CreditsRequest>0";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data: data,
      message: "User lists retrieved successfully"
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
indexRouter.post('/jobOperations', (0, _cors["default"])(), function (req, res) {
  if (req.body.operation == 'cancel') {
    client.publish("bkc-device/allJobsOperation", "cancel");
    res.json({
      status: 200,
      message: "Jobs canceled successfully"
    });
  } else if (req.body.operation == 'restore') {
    client.publish("bkc-device/allJobsOperation", "restore");
    res.json({
      status: 200,
      message: "Jobs restored successfully"
    });
  }
}); //UPDATE Users SET Credits=(CreditsRequest+Credits), CreditsRequest='0' WHERE Email='n@n.com'

indexRouter.post('/approveCredReq', (0, _cors["default"])(), function (req, res) {
  //console.log(req);
  var values = [req.body.Email];
  var sql = "UPDATE Users SET Credits=(CreditsRequest+Credits), CreditsRequest='0' WHERE Email='" + values[0] + "'";
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    });
  });
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
indexRouter.post('/addPlayer', (0, _cors["default"])(), function (req, res) {
  var sql = "INSERT INTO data(Timestamp, PlayerID, TMIN30, TMOUT30, TMIND, TMOUTD, ActiveStatus) VALUES (?)";
  var values = [req.body.Timestamp, req.body.PlayerID, req.body.TMIN30, req.body.TMOUT30, req.body.TMIND, req.body.TMOUTD, req.body.ActiveStatus];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    });
  });
});
var pressureVal = "NA";
var relayState = "NA";
client.on('message', function (topic, message) {
  switch (topic) {
    case 'swm-device/SmartWaterMonitor/pressure':
      pressureVal = message.toString();
      console.log(pressureVal);
      break;

    case 'swm-device/SmartWaterMonitor/relayState':
      relayState = message.toString();
      console.log(relayState);
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
    // case 'edc-monitor/setActive':
    // handleDeactivateAll()
    //   .then(function(results){
    //     handlesetActive(message.toString()).then(function(results1){var m=""}).catch(function(err){console.log(err)});  
    //   })
    //   .catch(function(err){
    //     console.log("Promise rejection error: "+err);
    //   })
    //   break;
    //   // client.publish('garage/close', 'Closing;'+message)
    //   // return handleGarageState(message)
    // case 'edc-monitor/playerExists':
    //   doesPlayerExists(message.toString())
    //   .then(function(results){
    //     var strData=JSON.stringify(results[0])
    //     /// var strData=JSON.stringify(results[0])
    //     if(typeof strData == 'undefined'){
    //       client.publish('edc-monitor/playerExistance', 'null')  
    //     }
    //     else{
    //     client.publish('edc-monitor/playerExistance', strData)
    //     }
    //      // client.publish('edc-monitor/activePlayer', strData)
    //      // handlesetActive(message).then(function(results){var m=""}).catch(function(err){console.log(err)});
    //      //handlesetActive(message.toString()).then(function(results1){var m=""}).catch(function(err){console.log(err)});  
    //    })
    //    .catch(function(err){
    //      console.log("Promise rejection error: "+err);
    //    })
    //    break;
    // case 'edc-monitor/createNew':
    //   var dataD=message.toString()
    //   console.log(dataD)
    //   var DataG=dataD.split(';')
    //   handleCreateNew(DataG[0],DataG[1],DataG[2],DataG[3],DataG[4],DataG[5],DataG[6])
    //   .then(function(results){
    //     var strData=JSON.stringify(results[0])
    //     //client.publish('edc-monitor/activePlayer', strData)
    //   })
    //   .catch(function(err){
    //     console.log("Promise rejection error: "+err);
    //   })
    //   break;
    // case 'edc-monitor/updatePlayer':
    //   var dataD=message.toString()
    //   console.log(dataD)
    //   var DataG=dataD.split(';')
    //   handleUpdatePlayer(DataG[0],DataG[1],DataG[2],DataG[3],DataG[4],DataG[5],DataG[6])
    //   .then(function(results){
    //     var strData=JSON.stringify(results[0])
    //     //client.publish('edc-monitor/activePlayer', strData)
    //   })
    //   .catch(function(err){
    //     console.log("Promise rejection error: "+err);
    //   })
    //   break;
  } //console.log('No handler for topic %s', topic)

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

function doesPlayerExists(PID) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM data WHERE PlayerID='" + PID + "'", function (err, rows) {
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

function handlesetActive(playerID) {
  return new Promise(function (resolve, reject) {
    db.query("UPDATE data SET ActiveStatus='0' ; UPDATE data SET ActiveStatus='1' WHERE PlayerID='" + playerID + "'", function (err, rows) {
      resolve(rows); // if(rows === undefined){
      //     reject(new Error("Error rows is undefined"));
      // }else{
      //     resolve(rows);
      // }
    });
  });
}

function handleCreateNew(EventTime, PressureValue, RelayState) {
  return new Promise(function (resolve, reject) {
    var sql = "INSERT INTO VLedger(EventTime, PressureValue, RelayState) VALUES (?)";
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

function handleUpdatePlayer(playerID, Timestamp, TMIN30, TMOUT30, TMIND, TMOUTD, ActiveStatus) {
  return new Promise(function (resolve, reject) {
    db.query("UPDATE data SET Timestamp='" + Timestamp + "', TMIN30='" + TMIN30 + "', TMOUT30='" + TMOUT30 + "', TMIND='" + TMIND + "', TMOUTD='" + TMOUTD + "', ActiveStatus='" + ActiveStatus + "' WHERE PlayerID='" + playerID + "'", function (err, rows) {
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
var _default = indexRouter; //export default cashHandleRouter;

exports["default"] = _default;