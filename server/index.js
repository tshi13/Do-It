const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db =  require("./tests/db");
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
let updateList = [];

cron.schedule("0 0 0 * * *", () => { //every day at midnight
  console.log("running a task every day at midnight");
  lastUpdate = new Date();
  updateList.push(lastUpdate);
  Task.find({}).then((data) => {
      data.forEach((task) => {
        let time = task.time;
        let lastTaskUpdate = new Date(task.checkedDate);
        let differenceInDays = parseInt(Math.round((lastUpdate - lastTaskUpdate) / (1000 * 60 * 60 * 24)));
        let timeLeft = differenceInDays >= time ? true : false;
        if(timeLeft && time !== -1) {
          if(task.userID === "Group Task") {
            updateGroupTasks(task);
          } else if (task.groupID === "Private Task") {
            updatePrivateTasks(task);
          } else if(task.groupID !== "Private Task" && task.userID !== "Group Task") {
            updateChallengeTask(task);
          }
        }      
    });
  });

  //Clean up broken tasks
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


function updateGroupTasks(task) {
  let coinPool = !isNaN(task.coinPool) && task.coinPool !== null  ? task.coinPool : 0;
  let lengthToSplit = task.completedList.length ? task.completedList.length : 1;
  let totalCoins = coinPool/lengthToSplit;
  let newCoins = Math.floor(totalCoins);
  task.completedList.forEach((user) => {
    User.findById(user).then((userData) => {
      let newCoinsTotal = userData.coins + newCoins;
      Group.findById(task.groupID).then((groupData) => {
        let newNotification = {
          message: "You have received " + newCoins + " coins for completing the task " + task.taskName + " in the group " + groupData.groupName + "new Balance: " + newCoinsTotal,
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
        User.findOneAndUpdate ({_id: user }, {coins: newCoinsTotal, notifications: newNotificationList});
    })
  })
}).then(() => {
  Task.findOneAndUpdate(task._id,  {$set: { coinPool: 0, joinedList: [], completedList: [], checkedDate: lastUpdate} });
})
}

function updateChallengeTask(task) {
  let coinPool = !isNaN(task.coinPool) && task.coinPool !== null  ? task.coinPool : 0;
  let groupID = task.groupID;
  let challengee = task.userID;
  let compettor = task.createdBy;
  let completedListLength = task.completedList ? task.completedList.length : 0;
  let joinedList = task.joinedList ? task.joinedList : [];
  Group.findById(groupID).then((group) => {
    let groupSize = group.idList.filter((id) => id !== null).length;
    let groupTasks = group.taskIDList;
    let winner;
    let loser;
    let winnerNotification = {
      title: "Finished Challenge Task Rewards",
      message: "You have received " + newCoins + " coins for the task " + task.taskName + " in the group " + group.groupName + " new balance: " + (user.coins + newCoins),
      date: new Date(),
      messageType: "finishedTask",
      groupID: groupID,
    }

    let loserNotification = {
      title: "Finished Challenge Task Rewards",
      message: "You have lost " + newCoins + " coins for the task " + task.taskName + " in the group " + group.groupName + " new balance: " + (user.coins - newCoins),
      date: new Date(),
      messageType: "finishedTask",
      groupID: groupID,
    }

    if(completedListLength >=  groupSize * 0.8) {
      winner = challengee;
      loser = compettor;
    }
    else {
      winner = compettor;
      loser = challengee;
    }

    let winnerCoins;
    let winnerNotifications;
    let loserNotifications;
    
    User.findById(loser).then((loserData) => {
      if(joinedList.length !== 2) {
        winnerNotification.message = "Task " + task.taskName + " in the group " + group.groupName + " has been completed. However, no one has recieved any coins as the challengee has not joined the task. + " + "new balance: " + (user.coins);
        loserNotification.message = "Task " + task.taskName + " in the group " + group.groupName + " has been completed. However, no one has recieved any coins as the challengee has not joined the task." + "new balance: " + (user.coins);
      } else {
        User.findById(winner).then((user) => {
          if(user) {
            let coins = user.coins ? user.coins : 0;
            winnerCoins = coins + coinPool;
          } else {
            userDoesNotExist = true;
          }
          winnerNotifications = user.notifications ? user.notifications : [];
        });
        loserNotifications = loserData.notifications ? loserData.notifications : [];      
    }
  }).then(() => {
    User.findOneAndUpdate ({_id: winner }, {coins: winnerCoins, notifications: winnerNotifications});
    User.findOneAndUpdate ({_id: loser }, {notifications: loserNotifications});
  }).then(() => {
    Task.findByIdAndDelete(task._id);
    groupTasks.splice(groupTasks.indexOf(task._id), 1);
    Group.findOneAndUpdate({_id: groupID}, {taskIDList: groupTasks});
  })
  })
}

function updatePrivateTasks(task) {
  let newCoins = task.coinsEntered;
  User.findById(task.userID).then((user) => {
    let newCoinsTotal;
    let newNotification;
    let taskList = user.taskIDList;
    if((task.completedList.length > 0) || task.completed) {
      newNotification = {
        title: "Finished Task Reward",
        message: "You have received " + newCoins + " coins for completing the task " + task.taskName + " in time " + "new balance: " + (user.coins + newCoins),
        date: new Date(),
        messageType: "finishedTask",
        groupID: task.groupID,
      }
      newCoinsTotal = user.coins + newCoins;
  } else {
    newNotification = {
      title: "Failed Task",
      message: "You have lost " + newCoins + " coins for not completing the task " + task.taskName + " in time " + "current balance: " + user.coins,
      date: new Date(),
      messageType: "finishedTask",
      groupID: task.groupID,
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
    User.findOneAndUpdate ({_id: task.userID }, {coins: newCoinsTotal, notifications: newNotificationList, taskIDList: taskList}).then (() => {
      Task.findByIdAndDelete(task._id);
    });
  })
}


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

handleGroupNotification = (task, type) => {
  let groupID = task.groupID;
  Group.findById (groupID).then((group) => {
    let groupName = group.groupName;
    for(let i = 0; i < group.idList.length; i++) {
      let userID = group.idList[i];
      User.findById(userID).then((user) => {
        let newNotification;
        if(type === "GroupTask") {
          newNotification = {
            title: "Group Task Reminder",
            message: "This is a reminder about the Group task" + task.taskName + " in the group " + groupName,
            date: new Date(),
            messageType: "groupTask",
            groupID: groupID,
          }
        } else if (type === "ChallengeTask") {
          newNotification = {
            title: "Challenge Task Reminder",
            message: "This is a reminder about the Challenge" + task.taskName + " in the group " + groupName,
            date: new Date(),
            messageType: "groupTask",
            groupID: groupID,
          }
        }
        let newNotificationList;
        if(user.notifications === null || user.notifications === undefined) {
          newNotificationList = [];
        } else {
          newNotificationList = user.notifications;
        }
        newNotificationList.push(newNotification);
        User.findOneAndUpdate ({_id: userID }, {notifications: newNotificationList});
      })
    }
  })
}


handlePrivateNotification = (task) => {
  let userID = task.userID;
  User.findById(userID).then((user) => {
    let newNotification = {
      title: "Private Task Reminder",
      message: "This is a reminder about the task" + task.taskName,
      date: new Date(),
      messageType: "privateTask",
    }
    let newNotificationList;
    if(user.notifications === null || user.notifications === undefined) {
      newNotificationList = [];
    } else {
      newNotificationList = user.notifications;
    }
    newNotificationList.push(newNotification);
    User.findOneAndUpdate ({_id: userID }, {notifications: newNotificationList});
  })
}



//everyday at 6pm send notifications to users about their tasks
cron.schedule('0 0 18 * * *', () => {
  Task.find({}).then((data) => {
    data.forEach((task) => {
      if(task.time !== -1) { 
        if(task.userID === "Group Task") {
          handleGroupNotification(task, "GroupTask");
        } else if (task.groupID === "Private Task") {
          handlePrivateNotification(task);
        } else if(task.groupID !== "Private Task" && task.userID !== "Group Task") {
          handleGroupNotification(task, "ChallengeTask");
        }
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
  let message = "Server Started At " + serverTime + '\n';
  message += "Server Updated At:";
  for(let i = 0; i < updateList.length; i++) {
    message += "\n" + updateList[i];
  }
  res.send(message);
});


app.use('/users', require('./UserRoutes'))
app.use('/tasks', require('./TaskRoutes'))
app.use('/group', require('./GroupRoutes'))


app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});