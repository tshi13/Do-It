const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");
const User = require("./schemaModels/User");
const Task = require("./schemaModels/Task");
const Group = require("./schemaModels/Group");
const cors = require("cors");
const cron = require("node-cron");

const router = express.Router();
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
app.use(cors());

let serverTime = new Date();
lastUpdate = new Date();

cron.schedule("0 0 0 * * *", () => { //every day at midnight
  lastUpdate = new Date();

  User.find({}).then((data) => {
    data.forEach((user) => {
      if (user.coins < 0 || isNaN(user.coins) || user.coins === null) {
        User.findByIdAndUpdate(user._id, { $set: { coins: 0 } }, { new: true }).then((data) => {
          console.log("Updated user coins" + user._id);
        });
      }
    });
  });
  Task.find({}).then((data) => {
    data.forEach((task) => {
      if (task.coinsEntered < 0 || isNaN(task.coinsEntered) || task.coinsEntered === null) {
        Task.findByIdAndUpdate(task._id, { $set: { coinsEntered: 0 } }, { new: true }).then((data) => {
          console.log("Updated task coins" + task._id);
        });
      }
      if(task.coinPool < 0 || isNaN(task.coinPool) || task.coinPool === null) {
        Task.findByIdAndUpdate(task._id, { $set: { coinPool: 0 } }, { new: true }).then((data) => {
          console.log("Updated task coin pool" + task._id);
        });
      }
    });
  }).then(() => {

      Task.find({userID: "Group Task"}).then((data) => {
        data.forEach((task) => {
          let coinPool = !isNaN(task.coinPool) && task.coinPool !== null  ? task.coinPool : 0;
          let totalCoins = task.coinPool/task.completedList.length;
          let newCoins = Math.floor(totalCoins);
          task.completedList.forEach((completed) => {
            User.findByIdAndUpdate(completed, { $inc: { coins: newCoins } }, { new: true }).then((data) => {
              console.log("Updated user coins");
            }).then(() => {
              Task.findByIdAndUpdate(task._id, { $set: { coinPool: 0, joinedList: [], completedList: []} }, { new: true }).then((data) => {
                console.log("Updated group task");
              });
            });
          });
      }
        );
      });
    });
});


cron.schedule('0 0 0 * * *"', () => { //every second fix users that have issues with their coins
  User.find({}).then((data) => {
    data.forEach((user) => {
      if (user.coins < 0 || isNaN(user.coins) || user.coins === null) {
        User.findByIdAndUpdate(user._id, { $set: { coins: 0 } }, { new: true }).then((data) => {
          console.log("Updated user coins" + user._id);
        });
      }
    });
  });
  Task.find({}).then((data) => {
    data.forEach((task) => {
      if (task.coinsEntered < 0 || isNaN(task.coinsEntered) || task.coinsEntered === null) {
        Task.findByIdAndUpdate(task._id, { $set: { coinsEntered: 0 } }, { new: true }).then((data) => {
          console.log("Updated task coins" + task._id);
        });
      }
      if(task.coinPool < 0 || isNaN(task.coinPool) || task.coinPool === null) {
        Task.findByIdAndUpdate(task._id, { $set: { coinPool: 0 } }, { new: true }).then((data) => {
          console.log("Updated task coin pool" + task._id);
        });
      }
    });
  });
});



db.connect(); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));


app.get("/", (req, res) => {
  res.send("Server Started At " + serverTime);
});

app.use('/users', require('./UserRoutes'))
app.use('/tasks', require('./TaskRoutes'))
app.use('/group', require('./GroupRoutes'))

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});