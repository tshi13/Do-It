const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
	coins: {type: Number, required: true},
	taskIDList: {type: [String], required: true},
	groupIDList: {type: [String], required:true},
	profilePicture: {type: Buffer, required: false}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;