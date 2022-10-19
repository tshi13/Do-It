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
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));


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
	const {name,coins,taskIDList = [],groupIDList = []} = req.body;
		User.create({name,coins,taskIDList, groupIDList, profilePicture: null})
			.then((data) => {
			res.send(data);
			})
			.catch((err) => {
				res
				.status(500)
				.send({ message: "Error creating user with name: " + name })
			})
})

app.put("/updateUser", (req,res) =>{ //updates user
	const {userID, data} = req.body;
	User.findByIdAndUpdate(userID, data, {new: true, $set: data})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res
			.status(500)
			.send({ message: "Error updating user with id: " + userID })

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
app.put("/createTask/user", (req,res) => { //creates a new task and adds the coresponding objectID to User taskIDList
	const {userID,taskName,time,coinsEntered} = req.body;
	const groupID = "Private Task";
	let taskID;
	let newTaskIDList;
	let newCoinBalance;
	Task.create({userID, taskName,time,coinsEntered,groupID})
	.then((data) => {
		taskID = data._id;
		res.send(data);
	})
	.then(() => {
		return User.findById(userID);
	})
	.then((user) => {
		newTaskIDList = user.taskIDList;
		newCoinBalance = user.coins - coinsEntered;
		newTaskIDList.push(taskID);
		return User.findOneAndUpdate({ _id: userID}, {taskIDList:newTaskIDList, coins:newCoinBalance}); // add taskID and update coin balance for user
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating task with name: " + taskName })
	})
})

app.put("/createTask/group", (req,res) => { //creates a new task for a group and adds the coresponding objectID to Group taskIDList
	const {groupID, userID, taskName, time,coinsEntered = 0} = req.body;
	let taskID;
	let newTaskIDList;
	// let newCoinBalance;
	Task.create({userID, taskName, time, coinsEntered, groupID})
	.then((data) => {
		console.log(data);
		taskID = data._id;
		res.send(data);
	})
	.then(() => {
		return Group.findById(groupID);
	})
	.then((group) => {
		newTaskIDList = group.taskIDList;
		// newCoinBalance = user.coins - coinsEntered;
		newTaskIDList.push(taskID);
		return Group.findOneAndUpdate({ _id: groupID}, {taskIDList:newTaskIDList}); // add taskID and update coin balance for user
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
app.post("/createGroup", (req,res) =>{  // creating a new group. idList is the list of objectIDs of users
	const {groupName,idList,taskIDList = []} = req.body;
	const groupPicture = req.body.groupPicture || null;
	let groupID;
	const data = Group.create({groupName,idList,taskIDList, groupPicture})
	.then((data) => {
		groupID = data._id;
		res.send(data);
	})
	.then(()=>{
		return User.findById(idList[0])
	})
	.then((user) => {
		newGroupList = user.groupIDList;
		newGroupList.push(groupID);
		return User.findOneAndUpdate({_id:idList[0]},{groupIDList:newGroupList}); //add new groupID to User groupIDList
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating group with name: " + groupName })
	})
})

/** 
 * Leave group
 * req.params: userID groupID 
 * 
 * res: updated user object
 */

app.put("/leaveGroup", (req,res) => {
	const {userID, groupID} = req.body;
	let newGroupList;
	let newTaskIDList;
	let newGroupTaskIDList;
	let user;
	let group;
	let newUserList;
	User.findById(userID)
	.then((data) => {
		user = data;
		newGroupList = user.groupIDList;
		newTaskIDList = user.taskIDList;
		return Group.findById(groupID);
	})
	.then((data) => {
		group = data;
		newGroupTaskIDList = group.taskIDList;
		newGroupList = newGroupList.filter((id) => id != groupID);
		newTaskIDList = newTaskIDList.filter((id) => !newGroupTaskIDList.includes(id));
		newUserList = group.idList.filter((id) => id != userID);
		return User.findOneAndUpdate({_id:userID},{groupIDList:newGroupList, taskIDList:newTaskIDList}); //remove groupID from User groupIDList


	}).then(() => {
		if(newUserList.length == 0){
			return Group.findOneAndDelete({_id:groupID});
		} else {
			return Group.findOneAndUpdate({_id:groupID},{idList:newUserList});
		}
	}) //have to delete task cards

	.then(() =>
		res.send(user)
	)
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error leaving group with id: " + groupID })
	})
})





/**
 * req.params: 
 * 	groupName: String
 * 
 * 	res: List of Group Objects with the matching groupName
 *  */ 

 app.get("/searchGroup/:groupName", (req,res) =>{  
	const groupName = req.params.groupName;
	const data = Group.find({groupName})
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error finding group with name: " + groupName })
	})
})

/**
 * req.body: 
 * 	userID: String
 * 	Add the users with the relevant userID to the group
 *  groupID: String
 * 
 * 	res: Successfully added or not
 *  */ 

 app.post("/addToGroup", (req,res) =>{  
	const {userID, groupID} = req.body;
	console.log(userID);
	console.log(groupID);
	Group.updateOne({ _id: groupID },{ $push: { idList : [ userID] } })
	.then(() => {
		return User.updateOne({ _id: userID}, {$push: {groupIDList: [groupID]}});
	})
	.catch(err => {
		res
			.status(500)
			.send({ message: "Error adding to group with: " + groupID });
	});	
	
	
})


/**
 * req.params: 
 * 	_id: ObjectId of user 
 * 
 * 	res: a list of task objects associated with user in database 
 *  */ 
app.get("/tasks/user/:_id",(req,res) => { //gets all tasks that an _id has
	const _id = req.params._id;
	User.findById(_id)
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
 * 	_id: ObjectId of group
 * 
 * 	res: a list of task objects associated with group in database 
 *  */ 
app.get("/tasks/group/:_id",(req,res) => { //gets all tasks that an _id has
	const _id = req.params._id;
	Group.findById(_id)
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

app.get("/groups/:_id",(req,res) => { //gets all groups that an _id has
	const _id = req.params._id;
	User.findById(_id)
		.then(async (data) => {
		const groupIDList = data.groupIDList; //assume we only have one instance of each name
		let groupList = [];
		for (let i = 0; i < groupIDList.length; i++) {
			groupList[i] = await Group.findById(groupIDList[i]);
		}
		return groupList;
		})
		.then((data) => {
		res.send(data);
		})
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error retrieving groups with id: " + _id });
		});
})

/** 
 * req.params:
 * 	_id: ObjectId of group
 * 
 * res: a group object with the matching _id
 */

app.get("/group/:_id",(req,res) => { //gets all groups that an _id has
	const _id = req.params._id;
	Group.findById(_id)
		.then((data) => {
			res.send(data);
		})
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error retrieving groups with id: " + _id });
		});
})

app.get("/userdata/:_id",(req,res) => { //gets the details of a user
	const _id = req.params._id;
	User.findById(_id)
		.then((data) => {
			res.send(data);
		})
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error retrieving user with id: " + _id });
		});
})

/**
 * req.params: 
 * 	name: name of user 
 * 
 * res: ObjectId of user, profile picture, 
 */
app.get("/user/:name",(req,res) => {
	const name = req.params.name;
	User.find({name:name})
	.then((data) => {
		if(data.length != 0){
			let newData = {
				_id: data[0]._id,
				profilePicture: data[0].profilePicture ? data[0].profilePicture : null
			}
			res.send(newData);
		} else {
			res.send("User not found");
		}
	})
})


app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});