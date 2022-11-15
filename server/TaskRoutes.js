const express = require("express");
const router = express.Router();
const Task = require("./schemaModels/Task");



router.put("/updateTask", (req,res) =>{ //
	const {taskID, data} = req.body;
	Task.findByIdAndUpdate(taskID, data, {new: true, $set: data})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res
			.status(500)
			.send({ message: "Error updating task with id: " + taskID })

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
router.put("/createTask/user", (req,res) => { //creates a new task and adds the coresponding objectID to User taskIDList
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


module.exports = router