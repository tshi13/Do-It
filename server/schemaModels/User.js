const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  	name: { type: String, required: true },
	password: {type: String, required: false},
	coins: {type: Number, required: true},
	taskIDList: {type: [String], required: true},
	groupIDList: {type: [String], required:true},
	profilePicture: {type: Buffer, required: false},
	notifications: {type: Object, required: false},
	googleID: {type: String, required: false},
	facebookID: {type: String, required: false},
	email: {type: String, required: false},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;