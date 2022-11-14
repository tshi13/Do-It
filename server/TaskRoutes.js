const express = require("express");
const router = express.Router();
const Task = require("./schemaModels/Task");

router.put("/updateTask", (req,res) =>{ //updates task"
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

router.get("/getTask/:taskID", (req,res) => { //gets task
	const {taskID} = req.params;
	Task.findById(taskID)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res
			.status(500)
			.send({ message: "Error getting task with id: " + taskID })

		})
})

/**
 * req.params: 
 * 	_id: ObjectId of user 
 * 
 * 	res: a list of task objects associated with user in database 
 *  */ 
router.get("/user/:_id",(req,res) => { //gets all tasks that an _id has
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