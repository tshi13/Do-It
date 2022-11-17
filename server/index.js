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
  Task.find({}).then((data) => {
      data.forEach((task) => {
        let time = task.time;
        let lastTaskUpdate = new Date(task.checkedDate);
        let differenceInDays = parseInt(Math.round((lastUpdate - lastTaskUpdate) / (1000 * 60 * 60 * 24)));
        let timeLeft = differenceInDays >= time ? true : false;
        if(timeLeft && time !== -1) {
          if(task.userID === "Group Task") {
            let coinPool = !isNaN(task.coinPool) && task.coinPool !== null  ? task.coinPool : 0;
            let lengthToSplit = task.completedList.length ? task.completedList.length : 1;
            let totalCoins = coinPool/lengthToSplit;
            let newCoins = Math.floor(totalCoins);
            task.completedList.forEach((user) => {
              User.findById(user).then((data) => {
                let newCoinsTotal = data.coins + newCoins;
                Group.findById(task.groupID).then((data) => {
                  let newNotification = {
                    message: "You have received " + newCoins + " coins for completing the task " + task.taskName + " in the group " + data.groupName,
                    date: new Date(),
                    messageType: "finishedTask",
                  }
                  let newNotificationList;
                  if(data.notifications === null || data.notifications === undefined) {
                    newNotificationList = [];
                  } else {
                    newNotificationList = data.notifications;
                  }
                  newNotificationList.push(newNotification);
                  User.findOneAndUpdate ({_id: user }, {coins: newCoinsTotal, notificationList: newNotificationList});
              })
            })
          })
          Task.findOneAndUpdate(task._id,  {$set: { coinPool: 0, joinedList: [], completedList: [], checkedDate: lastUpdate} });
          } else if (task.groupID === "Private Task") {
            let newCoins = task.coinsEntered;
            User.findById(task.userID).then((user) => {
              let newCoinsTotal;
              let newNotification;
              let taskList = user.taskIDList;
              if((task.completedList.length > 0 && task.completedList[0] === task.userID) || task.completed) {
                newNotification = {
                  message: "You have received " + newCoins + " coins for completing the task " + task.taskName,
                  date: new Date(),
                  messageType: "finishedTask",
                }
                newCoinsTotal = user.coins + newCoins;
            } else {
              newNotification = {
                message: "You have lost " + newCoins + " coins for not completing the task " + task.taskName,
                date: new Date(),
                messageType: "finishedTask",
              }
              newCoinsTotal = user.coins;
            }
              let newNotificationList;
              if(user.notifications === null || user.notifications === undefined) {
                newNotificationList = [];
              } else {
                newNotificationList = user.notifications;
              }
              newNotificationList.push(newNotification);
              taskList.splice(taskList.indexOf(task._id), 1);
              console.log(taskList);
              User.findOneAndUpdate ({_id: task.userID }, {coins: newCoinsTotal, notificationList: newNotificationList, taskIDList: taskList}).then (() => {
                Task.findByIdAndDelete(task._id);
              });
            })

          } else if(task.groupID !== "Private Task" && task.userID !== "Group Task") {
            let newCoins = task.coinsEntered;
            let groupID = task.groupID;
            let userID = task.userID;
            let compettor = task.createdBy;
            let completedListLength = task.completedList ? task.completedList.length : 0;
            Group.findById(groupID).then((group) => {
              let groupSize = group.idList.filter((id) => id !== null).length;
              let groupTasks = group.taskIDList;
              let winner;
              let loser;
              let winnerNotification = {
                message: "You have received " + newCoins + " coins for the task " + task.taskName + " in the group " + group.groupName,
                date: new Date(),
                messageType: "finishedTask",
              }

              let loserNotification = {
                message: "You have lost " + newCoins + " coins for the task " + task.taskName + " in the group " + group.groupName,
                date: new Date(),
                messageType: "finishedTask",
              }

              if(completedListLength >=  groupSize * 0.8) {
                winner = userID;
                loser = compettor;
              }
              else {
                winner = compettor;
                loser = userID;
              }

              let winnerCoins;
              let loserCoins;
              let userDoesNotExist = false;
              

              User.findById(winner).then((user) => {
                if(user) {
                  let coins = user.coins ? user.coins : 0;
                  winnerCoins = coins + newCoins;
                  let newNotificationList;
                  if(user.notifications === null || user.notifications === undefined) {
                    newNotificationList = [];
                  } else {
                    newNotificationList = user.notifications;
                  }
                  newNotificationList.push(winnerNotification);
                  User.findOneAndUpdate ({_id: winner }, {coins: winnerCoins, notificationList: newNotificationList});
                } else {
                  userDoesNotExist = true;
                }
              });

              User.findById(loser).then((user) => {
                if(user) {
                  let coins = user.coins ? user.coins : 0;
                  let newNotificationList;
                  if(user.notifications === null || user.notifications === undefined) {
                    newNotificationList = [];
                  } else {
                    newNotificationList = user.notifications;
                  }
                  newNotificationList.push(loserNotification);
                  User.findOneAndUpdate ({_id: loser}, {
                    notificationList: newNotificationList
                  });
              } else {
                userDoesNotExist = true;
              }
            });


            Task.findByIdAndDelete(task._id);
            groupTasks.splice(groupTasks.indexOf(task._id), 1);
            Group.findOneAndUpdate({_id: groupID}, {taskIDList: groupTasks});
          })
        }
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

cron.schedule('0 0 1 * * *"', () => { //every day at 1am fix issues with database
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
      if( (task.time < 0  && task.time != -1)|| isNaN(task.time) || task.time === null) {
        Task.findByIdAndUpdate(task._id, { $set: { time: 0 } }, { new: true }).then((data) => {
          console.log("Updated task time" + task._id);
        }
        );
      }
      if(task.createdDate === null || task.createdDate === undefined) {
        Task.findByIdAndUpdate(task._id, { $set: { createdDate: new Date() } }, { new: true }).then((data) => {
          console.log("Updated task created date" + task._id);
        });
      } 
      if(task.checkedDate === null || task.checkedDate === undefined) {
        Task.findByIdAndUpdate(task._id, { $set: { checkedDate: new Date() } }, { new: true }).then((data) => {
          console.log("Updated task checked date" + task._id);
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