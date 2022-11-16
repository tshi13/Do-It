const express = require("express");
const router = express.Router();
const User = require("./schemaModels/User");
const Task = require("./schemaModels/Task");
const { hashPassword, verifyPassword } = require("./utils/hash");

/**
 * req.body: 
 * 	name: String
 * 	coins: Int
 * 	taskIDList: [] Use empty array to initialize
 * 
 * 	res: Copy of created User object in database 
 *  */ 
router.post("/createUser", async (req,res) =>{ //creates new user
	const {name,password,coins,taskIDList = [],groupIDList = [], googleID = "", facebookID = "", email = ""} = req.body;
	if(password != undefined || password != "") {
		try {
			const hash = await hashPassword(password);
			const user = await User.create({name, password: hash, coins,taskIDList, groupIDList, profilePicture: null, googleID, facebookID, email});
			res.send(user);
		} catch (err) {
			res.status(500).send({ message: "Error creating user with name: " + name })
		}
		// User.create({name,password,coins,taskIDList, groupIDList, profilePicture: null})
		// 	.then((data) => {
		// 	const hash = await hashPassword(password);
		// 	res.send(data);
		// 	})
		// 	.catch((err) => {
		// 		res
		// 		.status(500)
		// 		.send({ message: "Error creating user with name: " + name })
		// 	})
	} else if(googleID != "" || facebookID != "") {
		try {
			const user = await User.create({name, password: null, coins,taskIDList, groupIDList, profilePicture: null, googleID, facebookID, email});
			res.send(user);
		} catch (err) {
			res.status(500).send({ message: "Error creating user with name: " + name });
		}
	} else {
		res.status(500).send({ message: "Error creating user with name: " + name });
	}
})

router.put("/updateUser", (req,res) =>{ //updates user
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
 router.put("/createTask", (req,res) => { //creates a new task and adds the coresponding objectID to User taskIDList
	const {userID,taskName,time,coinsEntered} = req.body;
	const groupID = "Private Task";
	let taskID;
	let newTaskIDList;
	let newCoinBalance;
	Task.create({userID, taskName,time,coinsEntered,groupID, completedList: []})
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

router.get("/userdata/:_id",(req,res) => { //gets the details of a user
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
router.get("/:name",(req,res) => {
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

router.get("/login/:name/:password",(req,res) => {
	
	const name = req.params.name;
	const password = req.params.password;
	
	User.find({name:name})
	.then((data) => {
		if(data.length != 0){
			console.log(data[0].password);
			if(data[0].password == password || data[0].password == null || data[0].password == ""){
				let newData = {
					_id: data[0]._id,
					profilePicture: data[0].profilePicture ? data[0].profilePicture : null,
					coins:data[0].coins
				}
				res.send(newData);
			} else {
				res.send("Incorrect password" + data[0].password + " " + password);
			}
		} else {
			res.send("User not found");
		}
	})
})

router.get('/authLogin/:loginType/:key', (req, res) => {
	const loginType = req.params.loginType;
	const key = req.params.key;
	let searchTerm = "";
	if(loginType == 'google') {
		searchTerm = "googleID";
	} else if(loginType == 'facebook') {
		searchTerm = "facebookID";
	} else {
		res.send("Invalid login type");
	}
	User.find({[searchTerm]:key})
	.then((data) => {
		if(data.length != 0){
			res.send(data[0]);
		} else {
			res.send("User not found");
		}
	})
})

/**
 * req.params: 
 * 	_id: ObjectId of user 
 * 
 * 	res: a list of task objects associated with user in database 
 *  */ 


router.get("/tasks/:userID",(req,res) => { //gets the tasks of a user
	const userID = req.params.userID;
	User.findById(userID)
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


module.exports = router
