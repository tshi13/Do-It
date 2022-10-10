const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");
const User = require("./schemaModels/User");
const Task = require("./schemaModels/Task");

const router = express.Router();
var bodyParser = require('body-parser');
const Group = require("./schemaModels/Group");
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');


db.connect(); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Do it project API");
});


/**
 * req.body: 
 * 	name: String
 * 	coins: Int
 * 	taskIDList: [] Use empty array to initialize
 * 
 * 	res: Copy of created User object in database 
 *  */ 
 app.post("/createUser", (req,res) =>{ //creates new user
	const {name,coins,taskIDList} = req.body;
		 User.create({name,coins,taskIDList})
			.then((data) => {
			res.send(data._id);
			})
			.catch((err) => {
				res
				.status(500)
				.send({ message: "Error creating user with name: " + name })
			})
})


/**
 * req.body: 
 * 	userID: String, ObjectId of user associated to this task
 * 	taskName: String
 * 	time: int (temporary)
 * 	coinsEntered: int
 * 
 * 	res: Copy of created Task object in database 
 *  */ 
app.post("/createTask", (req,res) => { //creates a new task and adds the coresponding objectID to User taskIDList
	const {userID, taskName,time, coinsEntered} = req.body;
	let taskID;
	let newTaskIDList;
	let newCoinBalance;
	let intTime = parseInt(time);
	let intCoinsEntered = parseInt(coinsEntered);
	const task = Task.create({userID, taskName, time: intTime, coinsEntered: intCoinsEntered})
	.then((data) => {
		taskID = data._id;
		res.send(data);
	})

	.then(() => {
		return User.findById(userID);
	})
	.then((user) => {
		newTaskIDList = user.taskIDList;
		newCoinBalance = user.coins - intCoinsEntered;
		newTaskIDList.push(taskID);
		return User.findOneAndUpdate({ _id: userID}, {taskIDList:newTaskIDList, coins:newCoinBalance}); // add taskID and update coin balance for user
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating task with name: " + taskName })
	})
})


/**
 * req.body: 
 * 	groupName: String
 * 	idList: [String], list of ObjectIds of users in this group 
 * 
 * 	res: Copy of created Group object in database 
 *  */ 

// please do not delete commented code out yet. This is for when we want to conenct the objectIDs in database
app.post("/createGroup", (req,res) =>{  // creating a new group. idList is the list of objectIDs of users
	const {groupName,idList} = req.body;
	// const objectIDArray = [];
	// for (let i = 0; i < idList.length; i++) {
	// 	objectIDArray[i] = new mongoose.Types.ObjectId(idList[i]);
	// }
	const data = Group.create({groupName,idList})
	.then((data) => {
		console.log(data); //prints created user object
		res.send(data);
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating group with name: " + groupName })
	})
})

/**
 * req.body: 
 * 	_id: ObjectId of user 
 * 
 * 	res: a list of task objects associated with user in database 
 *  */ 
app.post("/tasks" ,(req,res) => { //gets all tasks that an _id has
	const _id = req.body["userID"];
	const data = User.findById(_id)
		.then(async (data) => {
		const taskIDList = data.taskIDList; //assume we only have one instance of each name
		let taskList = [];
		for (let i = 0; i < taskIDList.length; i++) {
			taskList[i] = await Task.findById(taskIDList[i]);
		}
		return taskList;
		})
		.then((data) => {
		res.send(data);
		})
		.catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving tasks with id: " + _id });
    });	
})

/**
 * req.params: 
 * 	name: name of user 
 * 
 * res: ObjectId of user
 */
app.post("/user",(req,res) => {
	const name = req.body["name"];
	User.find({name:name})
	.then((data) => {
		if(data.length == 0){
			res.send("User not found");
		} else {
			res.send(data[0]._id);
		}
	})
})


app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});