const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	taskName: {type: String, required: true},
	time: {type: Number, required: true},
	coinsEntered: {type: Number, required: true}
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
	coins: {type: Number, required: true},
	taskList: {type: [TaskSchema]}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;