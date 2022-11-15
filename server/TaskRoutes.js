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