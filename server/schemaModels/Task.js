const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	userID: {type: String, default: null},
	taskName: {type: String, required: true},
	time: {type: Number, required: true},
	coinsEntered: {type: Number, required: true},
	groupID: {type: String, default: null}
});

const Task = mongoose.model("Task",TaskSchema);
module.exports = Task;