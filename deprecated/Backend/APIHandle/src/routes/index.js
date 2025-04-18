import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs'
import { dirname } from 'path';
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
  system_info: String,
  _DeviceId: Schema.Types.ObjectId,
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);
// Create an instance of model SomeModel
// var awesome_instance = new SomeModel({ a_name: 'awesome' });
// awesome_instance.a_macAddress="TEST:TEST2"
// awesome_instance.system_info="no info yet"
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
indexRouter.get('/temp', cors(), tempHandlePage);





indexRouter.post('/upgrade', cors(), function (req, res) {//upgrade device os
  let statusN = 0;
  let msgN = "";

  if (req.body.operation == 'upgrade') {
    if (req.body.devices == 'all') {
      client.publish('iotm-sys/device/osug/all', "start upgrade")//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
      statusN = 200;
      msgN = "Upgrade pushed to all devices."
      res.json({
        status: statusN,

        message: msgN
      })
    }
    else {
      if (req.body.devices.length > 5) {

        var q = SomeModel.find({ 'a_macAddress': req.body.devices });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, resV) {
          if (err) return handleError(err);
          console.log(resV)
          console.log("res len: ")
          console.log(res.length)
          if (resV.length >= 1) {
            console.log("macAddress found")
            console.log("Device to be updated:")
            console.log(req.body.devices);
            client.publish('iotm-sys/device/osug/' + req.body.devices, "start upgrade")
            client.publish('iotm-sys/device/logs', "Upgrade request pushed to " + req.body.devices);
            statusN = 200;
            msgN = "Upgrade pushed to " + req.body.devices + "."
            res.json({
              status: statusN,

              message: msgN
            })

          }
          else {
            console.log("macAddress not found,")
            statusN = 404;
            msgN = "MAC Address: " + req.body.devices + " not found."
            res.json({
              status: statusN,

              message: msgN
            })
          }



        })


      }
    }



  }



});



indexRouter.post('/config', cors(), function (req, res) {//upgrade device os
  let statusN = 0;
  let msgN = "";

  if (req.body.operation == 'remote-command') {
    let command = req.body.command;
    if (req.body.devices == 'all') {
      client.publish('iotm-sys/device/config/all', "command;" + command)//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
      statusN = 200;
      msgN = "Command pushed to all devices."
      res.json({
        status: statusN,

        message: msgN
      })
    }
    else {
      if (req.body.devices.length > 5) {

        var q = SomeModel.find({ 'a_macAddress': req.body.devices });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, resV) {
          if (err) return handleError(err);
          console.log(resV)
          console.log("res len: ")
          console.log(res.length)
          if (resV.length >= 1) {
            console.log("macAddress found")
            console.log("Device to be updated:")
            console.log(req.body.devices);
            client.publish('iotm-sys/device/config/' + req.body.devices, "command;" + command)
            client.publish('iotm-sys/device/logs', "Command request pushed to " + req.body.devices);
            statusN = 200;
            msgN = "Command pushed to " + req.body.devices + "."
            res.json({
              status: statusN,

              message: msgN
            })

          }
          else {
            console.log("macAddress not found,")
            statusN = 404;
            msgN = "MAC Address: " + req.body.devices + " not found."
            res.json({
              status: statusN,

              message: msgN
            })
          }



        })


      }
    }



  }



});



indexRouter.post('/update', cors(), function (req, res) {//update device fw
  let statusN = 0;
  let msgN = "";
  let programFile;
  let uploadPath;
  let FileName = req.body.fileName;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  programFile = req.files.programFile;
  //console.log(__dirname)
  let dir = __dirname.replace("/src/routes", "");
  //console.log(dir)
  uploadPath = dir + '/cdn/' + programFile.name;

  // Use the mv() method to place the file somewhere on your server
  programFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded!');
  });
  console.log(uploadPath)
  fs.readFile(uploadPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    //console.log(data)//file here

    if (req.body.operation == 'update') {
      if (req.body.devices == 'all') {
        client.publish('iotm-sys/device/firmware/file/all', "#" + FileName + "\n" + data)//as mqtt can't publish to wildcards
        client.publish('iotm-sys/device/logs', "Update pushed to all devices")
        statusN = 200;
        msgN = "Update pushed to all devices."
        res.json({
          status: statusN,

          message: msgN
        })
      }
      else {
        if (req.body.devices.length > 5) {

          var q = SomeModel.find({ 'a_macAddress': req.body.devices });
          q.select('a_name _DeviceId a_macAddress');
          q.exec(function (err, resV) {
            if (err) return handleError(err);
            //console.log(resV)
            //console.log("res len: ")
            //console.log(res.length)
            if (resV.length >= 1) {
              console.log("macAddress found")
              console.log("Device to be updated:")
              console.log(req.body.devices);
              client.publish('iotm-sys/device/firmware/file/' + req.body.devices, "#" + FileName + "\n" + data)
              client.publish('iotm-sys/device/logs', "Update pushed to " + req.body.devices);
              statusN = 200;
              msgN = "Upgrade pushed to " + req.body.devices + "."
              res.json({
                status: statusN,

                message: msgN
              })

            }
            else {
              console.log("macAddress not found,")
              statusN = 404;
              msgN = "MAC Address: " + req.body.devices + " not found."
              res.json({
                status: statusN,

                message: msgN
              })
            }



          })


        }
      }



    }
  })







});

indexRouter.post('/update-script', cors(), function (req, res) {//update device fw
  let statusN = 0;
  let msgN = "";
  let programFile;
  let uploadPath;
  // let FileName = req.body.fileName;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  programFile = req.files.programFile;
  //console.log(__dirname)
  let dir = __dirname.replace("/src/routes", "");
  //console.log(dir)
  uploadPath = dir + '/cdn/' + programFile.name;

  // Use the mv() method to place the file somewhere on your server
  programFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded!');
  });
  console.log(uploadPath)
  fs.readFile(uploadPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    //console.log(data)//file here

    if (req.body.operation == 'update-script') {
      if (req.body.devices == 'all') {
        client.publish('iotm-sys/device/firmware/script/all', data)//as mqtt can't publish to wildcards
        client.publish('iotm-sys/device/logs', "Update pushed to all devices")
        statusN = 200;
        msgN = "Update pushed to all devices."
        res.json({
          status: statusN,

          message: msgN
        })
      }
      else {
        if (req.body.devices.length > 5) {

          var q = SomeModel.find({ 'a_macAddress': req.body.devices });
          q.select('a_name _DeviceId a_macAddress');
          q.exec(function (err, resV) {
            if (err) return handleError(err);
            //console.log(resV)
            //console.log("res len: ")
            //console.log(res.length)
            if (resV.length >= 1) {
              console.log("macAddress found")
              console.log("Device to be updated:")
              console.log(req.body.devices);
              client.publish('iotm-sys/device/firmware/script/' + req.body.devices, data)
              client.publish('iotm-sys/device/logs', "Update pushed to " + req.body.devices);
              statusN = 200;
              msgN = "Upgrade pushed to " + req.body.devices + "."
              res.json({
                status: statusN,

                message: msgN
              })

            }
            else {
              console.log("macAddress not found,")
              statusN = 404;
              msgN = "MAC Address: " + req.body.devices + " not found."
              res.json({
                status: statusN,

                message: msgN
              })
            }



          })


        }
      }



    }
  })







});


indexRouter.post('/update-url', cors(), function (req, res) {//update device fw
  let statusN = 0;
  let msgN = "";
  let FileName;
  let URL;

  FileName = req.body.fileName;
  URL = req.body.url;
  //console.log(__dirname)


  if (req.body.operation == 'update-url') {
    if (req.body.devices == 'all') {
      client.publish('iotm-sys/device/firmware/url/all', URL + ';' + FileName)//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Update pushed to all devices")
      statusN = 200;
      msgN = "Update pushed to all devices."
      res.json({
        status: statusN,

        message: msgN
      })
    }
    else {
      if (req.body.devices.length > 5) {

        var q = SomeModel.find({ 'a_macAddress': req.body.devices });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, resV) {
          if (err) return handleError(err);
          //console.log(resV)
          //console.log("res len: ")
          //console.log(res.length)
          if (resV.length >= 1) {
            console.log("macAddress found")
            console.log("Device to be updated:")
            console.log(req.body.devices);
            client.publish('iotm-sys/device/firmware/url/' + req.body.devices, URL + ';' + FileName)
            client.publish('iotm-sys/device/logs', "Update pushed to " + req.body.devices);
            statusN = 200;
            msgN = "Upgrade pushed to " + req.body.devices + "."
            res.json({
              status: statusN,

              message: msgN
            })

          }
          else {
            console.log("macAddress not found,")
            statusN = 404;
            msgN = "MAC Address: " + req.body.devices + " not found."
            res.json({
              status: statusN,

              message: msgN
            })
          }

        })


      }
    }

  }
});

indexRouter.post('/update-ota', cors(), function (req, res) {//update device fw
  let statusN = 0;
  let msgN = "";
  let FileName;
  let URL;

  // FileName = req.body.fileName;
  URL = req.body.url;
  //console.log(__dirname)


  if (req.body.operation == 'update-ota') {
    if (req.body.devices == 'all') {
      client.publish('iotm-sys/device/client/url/all', URL)//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Update pushed to all devices")
      statusN = 200;
      msgN = "Update pushed to all devices."
      res.json({
        status: statusN,

        message: msgN
      })
    }
    else {
      if (req.body.devices.length > 5) {

        var q = SomeModel.find({ 'a_macAddress': req.body.devices });
        q.select('a_name _DeviceId a_macAddress');
        q.exec(function (err, resV) {
          if (err) return handleError(err);
          //console.log(resV)
          //console.log("res len: ")
          //console.log(res.length)
          if (resV.length >= 1) {
            console.log("macAddress found")
            console.log("Device to be updated:")
            console.log(req.body.devices);
            client.publish('iotm-sys/device/client/url/' + req.body.devices, URL)
            client.publish('iotm-sys/device/logs', "Update pushed to " + req.body.devices);
            statusN = 200;
            msgN = "Upgrade pushed to " + req.body.devices + "."
            res.json({
              status: statusN,

              message: msgN
            })

          }
          else {
            console.log("macAddress not found,")
            statusN = 404;
            msgN = "MAC Address: " + req.body.devices + " not found."
            res.json({
              status: statusN,

              message: msgN
            })
          }

        })


      }
    }

  }
});

indexRouter.post('/addDevice', cors(), function (req, res) {//upgrade device os
  let statusN = 0;
  let msgN = "";
  let name = req.body.name;
  let macAddress = req.body.macAddress;
  let updatedAt = req.body.updatedAt;
  if (req.body.operation == 'add') {

    //var DataG = val.split(';')//name;mac;updatedat;devID
    //console.log(DataG[1])
    var q = SomeModel.find({ 'a_macAddress': macAddress });
    q.select('a_name _DeviceId a_macAddress');
    q.exec(function (err, resV) {
      if (err) return handleError(err);
      console.log(resV)
      console.log("res len: ")
      console.log(resV.length)
      if (resV.length >= 1) {
        console.log("macAddress found")
        client.publish('iotm-sys/device/logs', macAddress + " is Already in the DB")
        statusN = 404;
        msgN = macAddress + " is already in the DB";
        res.json({
          status: statusN,

          message: msgN
        })
      }
      else {
        console.log("macAddress not found, adding it to the db")
        // Create an instance of model SomeModel
        var awesome_instance = new SomeModel({ a_name: name });
        awesome_instance.a_macAddress = macAddress;
        awesome_instance.updated_at = updatedAt;
        // Save the new model instance, passing a callback
        awesome_instance.save(function (err) {
          if (err) return handleError(err);
          // saved!
          console.log("saved")
          statusN = 201;
          msgN = macAddress + " added to the DB";
          res.json({
            status: statusN,

            message: msgN
          })
        });



        client.publish('iotm-sys/device/logs', "Added to the DB")
      }

    })


  }




});


indexRouter.get('/listAll', cors(), function (req, res) {

  const collections = Object.keys(mongoose.connection.collections);
  console.log(collections)
  const collection = db.collection('somemodels');
  collection.find({}).toArray((err, vals) => {
    if (err) throw err;
    //console.log("Found the following records");
    //console.log(vals)
    //callback(vals);
    res.json({
      status: 200,

      message: vals
    })
  });


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

  if (topic.includes("iotm-sys/device/update/")) {
    if (topic == "iotm-sys/device/update/*") {
      console.log("updating all devices");
      client.publish('iotm-sys/device/firmware/all', "fimrware file/string")//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Update pushed to all devices")
    }
    else {
      var devToBeUpdate = topic.split("/");
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
          client.publish('iotm-sys/device/firmware/' + devToBeUpdate[3], "fimrware file/string")
          client.publish('iotm-sys/device/logs', "Update pushed to " + devToBeUpdate[3]);

        }
        else {
          console.log("macAddress not found,")
        }



      })
    }
  }





  if (topic.includes("iotm-sys/device/upgrade/")) {
    if (topic == "iotm-sys/device/upgrade/*") {
      console.log("updating os of all devices");
      client.publish('iotm-sys/device/osug/all', "start update")//as mqtt can't publish to wildcards
      client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
    }
    else {
      var devToBeUpdate = topic.split("/");
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
          client.publish('iotm-sys/device/osug/' + devToBeUpdate[3], "start upgrade")
          client.publish('iotm-sys/device/logs', "Upgrade request pushed to " + devToBeUpdate[3]);

        }
        else {
          console.log("macAddress not found,")
        }



      })
    }
  }




  if (topic.includes("iotm-sys/device/info/")) {//change to api
    var val = message.toString();
    if (topic == "iotm-sys/device/info/*") {
      // console.log("updating os of all devices");
      // client.publish('iotm-sys/device/osug/all', "start update")//as mqtt can't publish to wildcards
      // client.publish('iotm-sys/device/logs', "Upgrade request pushed to all devices")
    }
    else {
      var devToBeUpdate = topic.split("/");
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
          var myquery = { a_macAddress: devToBeUpdate[3] };
          var newvalues = { $set: { system_info: val } };
          const collection = db.collection('somemodels').updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            // db.close();
          });
          client.publish('iotm-sys/device/info/response/' + devToBeUpdate[3], "info request")
          client.publish('iotm-sys/device/logs', "info requested from " + devToBeUpdate[3]);

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
