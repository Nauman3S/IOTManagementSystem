import express from 'express';
import { indexPage } from '../controllers';
import { tempHandlePage } from '../controllers';
//import mysql from 'mysql'
//var mongoose = require('mongoose');
import mongoose from 'mongoose'
//import helmet from 'helmet'
//import 'axios'
//import MqttHandler from './mqtt_handler'
import mqtt from 'mqtt';
import cors from 'cors';
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
const indexRouter = express.Router();
//const indexRouter = app;
const cashHandleRouter = express.Router();
//indexRouter.locals.axios=axios;
//axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
// indexRouter.use(cors());

//   indexRouter.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin",'*');
//     res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept');

// })
//const mqtt = require('mqtt')
//const client = mqtt.connect('mqtt://broker.hivemq.com')
const client = mqtt.connect('mqtt://44.195.192.158')

var garageState = ''
var connected = false

client.on('connect', () => {
  client.subscribe('iotm-sys/device/add')
  client.subscribe('iotm-sys/device/update/#')
  client.subscribe('iotm-sys/device/upgrade/#')
  client.subscribe('iotm-sys/device/info/#')
  

})



var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_name: String,
  a_macAddress: String,
  updated_at: String,
  _DeviceId: Schema.Types.ObjectId,
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);
// Create an instance of model SomeModel
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
SomeModel.find({ 'a_name': 'awesome' }, 'a_name a_macAddress updated_at _DeviceId', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
  console.log(athletes)
})

indexRouter.get('/', cors(), indexPage);
indexRouter.get('/csh', cors(), tempHandlePage);


indexRouter.post('/credReq', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.CreditsRequest,
    req.body.Email,


  ];
  let sql = `UPDATE Users SET CreditsRequest='` + values[0] + `' WHERE Email='` + values[1] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});


indexRouter.post('/getUserLedger', cors(), function (req, res) {
  let sql = `SELECT * FROM Ledger WHERE Email='` + req.body.email + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/ledgerUpdate', cors(), function (req, res) {
  let sql = `INSERT INTO Ledger( FileName, JobType, Email) VALUES (?)`;
  let values = [

    req.body.FileName,
    req.body.JobType,
    req.body.Email,


  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "added successfully"
    })
    client.publish('iotm-sys/printer', JSON.stringify(values));
  })
});
//////////////////////////ADMIN
indexRouter.post('/loginAdmin', cors(), function (req, res) {
  let sql = `SELECT * FROM Admin WHERE Email='` + req.body.email + `' AND Password='` + req.body.password + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/updateAdmin', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.FName,
    req.body.LName,
    req.body.Email,
    req.body.Password


  ];

  //change to mongodb
  let sql = `UPDATE Admin SET FName='` + values[0] + `', LName='` + values[1] + `', Email='` + values[2] + `', Password='` + values[3] + `' WHERE Email='` + values[2] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});


indexRouter.post('/updateAdminRewVal', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.RewardEqCredits


  ];
  let sql = `UPDATE Admin SET RewardEqCredits='` + values[0] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});


indexRouter.post('/ledgerLog', cors(), function (req, res) {
  let sql = `SELECT * FROM Ledger `;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/jobOperations', cors(), function (req, res) {
  if (req.body.operation == 'cancel') {
    client.publish("iotm-sys/allJobsOperation", "cancel")
    res.json({
      status: 200,

      message: "Jobs canceled successfully"
    })
  }
  else if (req.body.operation == 'restore') {
    client.publish("iotm-sys/allJobsOperation", "restore")
    res.json({
      status: 200,

      message: "Jobs restored successfully"
    })
  }


});


indexRouter.get('/listAll', cors(), function (req, res) {

  let sql = `SELECT * FROM data`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.get('/getActive', cors(), function (req, res) {
  let sql = `SELECT * FROM data WHERE ActiveStatus='1'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.get('/getUser', cors(), function (req, res) {
  let sql = `SELECT * FROM Admin`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


client.on('message', (topic, message) => {
  console.log(topic);
 
  switch (topic) {
    case 'iotm-sys/device/add':
      //check if device already exists?
      var val = message.toString();
      var DataG = val.split(';')//name;mac;updatedat;devID
      console.log(DataG[1])
      var q = SomeModel.find({ 'a_macAddress': DataG[1] });
      q.select('a_name _DeviceId a_macAddress');
      q.exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res)
        console.log("res len: ")
        console.log(res.length)
        if (res.length >= 1) {
          console.log("macAddress found")
          client.publish('iotm-sys/device/logs', DataG[1] + " is Already in the DB")
        }
        else {
          console.log("macAddress not found, adding it to the db")
          // Create an instance of model SomeModel
          var awesome_instance = new SomeModel({ a_name: DataG[0] });
          awesome_instance.a_macAddress = DataG[1];
          awesome_instance.updated_at = DataG[2];
          // Save the new model instance, passing a callback
          awesome_instance.save(function (err) {
            if (err) return handleError(err);
            // saved!
            console.log("saved")
          });



          client.publish('iotm-sys/device/logs', "Added to the DB")
        }

      })



      break;
    
    case 'swm-device/SmartWaterMonitor/eventPressureLimitChanged':

      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      //const currentDate = new Date();

      const timestamp = new Date().toLocaleString();
      handleCreateNew(timestamp, DataG[0], DataG[1])
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })

      break;

  }
  
  if(topic.includes("iotm-sys/device/update/")){
    if(topic=="iotm-sys/device/update/*"){
      console.log("updating all devices");
      client.publish('iotm-sys/device/firmware/all', "fimrware file/string")//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Update pushed to all devices")
    }
    else{
      var devToBeUpdate=topic.split("/");
      var q = SomeModel.find({ 'a_macAddress': devToBeUpdate[3] });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, res) {
          if (err) return handleError(err);
          console.log(res)
          console.log("res len: ")
          console.log(res.length)
          if (res.length >= 1) {
            console.log("macAddress found")
            console.log("Device to be updated:")
            console.log(devToBeUpdate[3]);
            client.publish('iotm-sys/device/firmware/'+devToBeUpdate[3], "fimrware file/string")
            client.publish('iotm-sys/device/logs', "Update pushed to "+devToBeUpdate[3]);
            
          }
          else {
            console.log("macAddress not found,")
          }
  
  
      
    })
    }
    }





    if(topic.includes("iotm-sys/device/upgrade/")){
      if(topic=="iotm-sys/device/upgrade/*"){
        console.log("updating os of all devices");
        client.publish('iotm-sys/device/osug/all', "start update")//as mqtt can't publish to wildcards
        client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
      }
      else{
        var devToBeUpdate=topic.split("/");
        var q = SomeModel.find({ 'a_macAddress': devToBeUpdate[3] });
          q.select('a_name _DeviceId a_macAddress');
          q.exec(function (err, res) {
            if (err) return handleError(err);
            console.log(res)
            console.log("res len: ")
            console.log(res.length)
            if (res.length >= 1) {
              console.log("macAddress found")
              console.log("Device to be updated:")
              console.log(devToBeUpdate[3]);
              client.publish('iotm-sys/device/osug/'+devToBeUpdate[3], "start upgrade")
              client.publish('iotm-sys/device/logs', "Upgrade request pushed to "+devToBeUpdate[3]);
              
            }
            else {
              console.log("macAddress not found,")
            }
    
    
        
      })
      }
      }




      if(topic.includes("iotm-sys/device/info/")){
        if(topic=="iotm-sys/device/info/*"){
          // console.log("updating os of all devices");
          // client.publish('iotm-sys/device/osug/all', "start update")//as mqtt can't publish to wildcards
          // client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
        }
        else{
          var devToBeUpdate=topic.split("/");
          var q = SomeModel.find({ 'a_macAddress': devToBeUpdate[3] });
            q.select('a_name _DeviceId a_macAddress');
            q.exec(function (err, res) {
              if (err) return handleError(err);
              console.log(res)
              console.log("res len: ")
              console.log(res.length)
              if (res.length >= 1) {
                console.log("macAddress found")
                console.log("Device to be updated:")
                console.log(devToBeUpdate[3]);
                client.publish('iotm-sys/device/info/response/'+devToBeUpdate[3], "info request")
                client.publish('iotm-sys/device/logs', "info requested from "+devToBeUpdate[3]);
                
              }
              else {
                console.log("macAddress not found,")
              }
      
      
          
        })
        }
        }
  
  
})
//import async from 'async';
function handlegetActive() {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM data WHERE ActiveStatus='1'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}


function doesDevExists(PID) {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM data WHERE DevID='` + PID + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleDeactivateAll() {
  return new Promise(function (resolve, reject) {
    db.query(
      `UPDATE data SET ActiveStatus='0'`,
      function (err, rows) {
        resolve(rows);
        // if(rows === undefined){
        //     reject(new Error("Error rows is undefined"));
        // }else{
        //     resolve(rows);
        // }
      }
    )
  }
  )
}


function handleCreateNew(EventTime, DevNAME, ID) {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO VLedger(EventTime, NAME, ID) VALUES (?)`;
    let values = [
      EventTime,
      PressureValue,
      RelayState


    ];
    db.query(sql, [values],
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}


indexRouter.post('/liveValues', cors(), function (req, res) {
  res.json({
    status: 200,
    PressureValue: pressureVal,
    RelayState: relayState,

    message: "User lists retrieved successfully"
  })


  // let sql = `SELECT * FROM Users WHERE Email='`+req.body.email+`'`;
  // db.query(sql, function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     pressureVal,
  //     message: "User lists retrieved successfully"
  //   })
  // })
});

export default indexRouter;
