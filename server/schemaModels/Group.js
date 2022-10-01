const mongoose = require("mongoose");
const User = require("./User").schema;

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
	idList: {type: [String], required: true}
	// idList: [{  // if we want to connect the ids in the future
	// 	user: { 
	// 		type: mongoose.SchemaTypes.ObjectId,
	// 		ref: 'User',
	// 		required: true
	// 	}
	// }],
	// userList: {type : [User], required: true}
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;