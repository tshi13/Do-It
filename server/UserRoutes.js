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
	if(password != undefined && password != "" && password!=null) {
		try {
			const hash = await hashPassword(password);
			const user = await User.create({name, password: hash, coins,taskIDList, groupIDList, profilePicture: null, googleID, facebookID, email});
			res.send(user);
		} catch (err) {
			res.status(500).send({ message: "Error creating user with name: " + name })
		}
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


/**
 * req.body: 
 * 	user: A list that contains all fields of a user
 * 	password: user entered non-hashed password
 * 	authenticate the user based on the password provided 
 * 	res: Success -> "Authentication successful!", Failed -> "Wrong username or password!"
 *  */ 
router.post("/authenticate",async(req,res) => { 
	const body = req.body;
	const user = await User.find({name:body.name});
	const isAuthenticated = await verifyPassword(body.password, user[0] ? user[0].password : "");
	if (isAuthenticated) {
		res.status(201).send({ message: "Authentication successful!" })
	} else {
		res.status(201).send({ message: "Wrong username or password!" })
	}
})


/**
 * req.body: 
 * 	userID: the objectId from a user
 * 	data: a list that contains all fields of a user object
 * 	update the user based on the new data 
 * 	res: Success -> A copy of the user object, Failed -> Error code
 *  */ 
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

router.get("/getUserdata/:_id",(req,res) => { //gets the details of a user
	const _id = req.params._id;
	console.log(_id);
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
 * req.body: 
 * 	userID: String, ObjectId of user associated to this task
 * 	taskName: String
 * 	time: int (temporary)
 * 	coinsEntered: int
 * 
 * 	res: Copy of created Task object in database 
 *  */ 
 router.put("/createTask", (req,res) => { //creates a new task and adds the coresponding objectID to User taskIDList
	const {userID,taskName,time,coinsEntered, createdDate = new Date(), checkedDate = new Date()} = req.body;
	const groupID = "Private Task";
	let taskID;
	let newTaskIDList;
	let newCoinBalance;
	Task.create({userID, taskName,time,coinsEntered,groupID, completedList: [], createdDate, checkedDate})
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


/**
 * req.params: 
 * 	_id: the objectId from a user
 * 	return all the details of a user associated with that objectID
 * 	res: Success -> A copy of the user object, Failed -> Error code
 *  */
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

/**
 * req.params: 
 * 	name: username
 * 	password: user-entered password
 * 	authenticate the login information 
 * 	res: Success -> A copy of the user object, Failed -> Error code
 *  */
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

/**
 * req.params: 
 * 	loginType: type of login, google | facebook
 * 	key
 * 	authenticate the login information with either facebook/google credentials
 * 	res: Success -> A copy of the user object, Failed -> Error code
 *  */
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
