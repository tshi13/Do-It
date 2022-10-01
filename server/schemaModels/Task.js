const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	userID: {type: String, required: true},
	taskName: {type: String, required: true},
	time: {type: Number, required: true},
	coinsEntered: {type: Number, required: true}
});

const Task = mongoose.model("Task",TaskSchema);
module.exports = Task;