const express = require("express");
const router = express.Router();
const User = require("./schemaModels/User");
const Task = require("./schemaModels/Task");


/**
 * req.body: 
 * 	name: name of user 
 * 
 * res: ObjectId of user, profile picture, 
 * 
 * Usage: Getting user data from user naem
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
 * req.body: 
 * 	name: String
 * 	coins: Int
 * 	taskIDList: [] Use empty array to initialize
 * 
 * 	res: Copy of created User object in database 
 * 
 *  Usage: Creates new user
 *  */ 
 router.post("/createUser", (req,res) =>{ 
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

//Get the list of groups a user has from user id
router.get("/getGroups/:_id",(req,res) => { 
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
 * 	_id: ObjectId of user 
 * 
 * 	res: a list of task objects associated with user in database 
 *  */ 
 router.get("/getTasks/:_id",(req,res) => { //gets all tasks that an _id has
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
	const {userID,taskName,time,coinsEntered} = req.body;
	const groupID = "Private Task";
	let taskID;
	let newTaskIDList;
	let newCoinBalance;
	Task.create({userID, taskName,time,coinsEntered,groupID, completed: false, completedList: []})
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
 * 	_id: ObjectId of group
 * 
 * res: a group object with the matching _id
 */

 router.get("/group/:_id",(req,res) => { //gets all groups that an _id has
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




/** 
 * Leave group
 * req.params: userID groupID 
 * 
 * res: updated user object
 */

 router.put("/leaveGroup", (req,res) => {
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
			for(let i = 0; i < newGroupTaskIDList.length; i++){
				Task.findByIdAndDelete(newGroupTaskIDList[i]);
			}
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






router.delete("/deleteTask/user/:userID/:taskID",(req,res) => { //deletes a task from a user
	const userID = req.params.userID;
	const taskID = req.params.taskID;
	User.updateOne({ _id: userID },{ $pull: { taskIDList : taskID } })
		.then(() => {
			return Task.deleteOne({ _id: taskID});
		}
		)
		.then(() => {
			res.send("Task deleted");
		}
		)
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error deleting task with id: " + taskID });
		});
})


module.exports = router
