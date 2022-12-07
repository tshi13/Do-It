const mongoose = require("mongoose");
const User = require("./User").schema;

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
	idList: {type: [String], required: true},
	taskIDList: {type: [String], required: true},
	groupPicture: {type: Buffer, required: false}, 
	typeOfGroup: {type: String, required: true},
	owner: {type: String, required: true},
	costToJoin: {type: Number, required: false},
	password: {type: String, required: false},
	inviteID: {type: String, required: false},
	onlineUsers: {type: [String], required: false},
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;