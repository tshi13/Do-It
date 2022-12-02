const express = require("express");
const router = express.Router();
const Task = require("./schemaModels/Task");
const User = require("./schemaModels/User");


/** 
 * req.body:
 * 	taskID: ObjectId of task
 *  data: list of datas containing the fields of a task
 *  updating the task with the sent data
 * res: Success -> data, Failed -> Error code
 */
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

/** 
 * req.body:
 * 	taskID: ObjectId of task
 *  get all the relevant fields of a task using taskID
 * res: Success -> data, Failed -> Error code
 */
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
 * 	taskID: ObjectId of task
 *  userID: ObjectId of a  user
 *  deletes a task from a user
 * res: Success -> "Task deleted", Failed -> Error code
 */
router.delete("/deleteTask/user/:userID/:taskID",(req,res) => { 
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