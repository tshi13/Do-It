const User = require("../schemaModels/User");
const express = require("express");
const router = express.Router();

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

app.get("/getData/:_id",(req,res) => { //gets the details of a user
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

app.delete("/deleteTask/user/:userID/:taskID",(req,res) => { //deletes a task from a user
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


