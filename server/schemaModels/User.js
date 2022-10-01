const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
	coins: {type: Number, required: true},
	taskIDList: {type: [String], required: true}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;