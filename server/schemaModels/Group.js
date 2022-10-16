const mongoose = require("mongoose");
const User = require("./User").schema;

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
	idList: {type: [String], required: true},
	taskIDList: {type: [String], required: true}
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;