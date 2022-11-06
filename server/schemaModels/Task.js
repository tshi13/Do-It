const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	userID: {type: String, required: true},
	taskName: {type: String, required: true},
	time: {type: Number, required: true},
	coinsEntered: {type: Number, required: true},
	groupID: {type: String, required: true},
	username: {type: String, required: false},
	completed: {type: Boolean, required: true},
	completedList: {type: Array, required: true},
	joinedList: {type: Array, required: false},
});

const Task = mongoose.model("Task",TaskSchema);
module.exports = Task;