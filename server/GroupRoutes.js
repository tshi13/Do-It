const express = require("express");
const router = express.Router();
const Group = require("./schemaModels/Group");
const Task = require("./schemaModels/Task");
const User = require("./schemaModels/User");

router.put("/createTask", (req,res) => { //creates a new task for a group and adds the coresponding objectID to Group taskIDList
	const {groupID, userID, taskName, time = 0 ,coinsEntered = 0, createdDate = new Date(), checkedDate = new Date(), createdBy} = req.body;
	let taskID;
	let newTaskIDList;
	// let newCoinBalance;
	Task.create({userID, taskName, time, coinsEntered, groupID, completedList: [], createdDate, checkedDate, createdBy})
	.then((data) => {
		taskID = data._id;
		res.send(data);
	})
	.then(() => {
		return Group.findById(groupID);
	})
	.then((group) => {
		newTaskIDList = group.taskIDList;
		// newCoinBalance = user.coins - coinsEntered;
		newTaskIDList.push(taskID);
		return Group.findOneAndUpdate({ _id: groupID}, {taskIDList:newTaskIDList}); // add taskID and update coin balance for user
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating task with name: " + taskName })
	})
})


/**
 * req.body: 
 * 	groupName: String
 * 	idList: [String], list of ObjectIds of users in this group 
 * 
 * 	res: Copy of created Group object in database 
 *  */ 
router.post("/createGroup", (req,res) =>{  // creating a new group. idList is the list of objectIDs of users
	const {groupName,idList,taskIDList = [], owner, costToJoin, password, typeOfGroup, inviteID} = req.body;
	const groupPicture = req.body.groupPicture || null;
	let groupID;
	const data = Group.create({groupName,idList,taskIDList, groupPicture, typeOfGroup, owner, costToJoin, password, inviteID})
	.then((data) => {
		groupID = data._id;
		res.send(data);
	})
	.then(()=>{
		return User.findById(idList[0])
	})
	.then((user) => {
		newGroupList = user.groupIDList;
		newGroupList.push(groupID);
		return User.findOneAndUpdate({_id:idList[0]},{groupIDList:newGroupList}); //add new groupID to User groupIDList
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error creating group with name: " + groupName })
	})
})



/** 
 * Leave group
 * req.params: userID groupID 
 * 
 * res: updated user object
 */

router.put("/leaveGroup", (req,res) => {
	const {userID, groupID} = req.body;
	let newGroupList;
	let newTaskIDList;
	let newGroupTaskIDList;
	let user;
	let group;
	let newUserList;
	User.findById(userID)
	.then((data) => {
		user = data;
		newGroupList = user.groupIDList;
		newTaskIDList = user.taskIDList;
		return Group.findById(groupID);
	})
	.then((data) => {
		group = data;
		newGroupTaskIDList = group.taskIDList;
		newGroupList = newGroupList.filter((id) => id != groupID);
		newTaskIDList = newTaskIDList.filter((id) => !newGroupTaskIDList.includes(id));
		newUserList = group.idList.filter((id) => id != userID);
		return User.findOneAndUpdate({_id:userID},{groupIDList:newGroupList, taskIDList:newTaskIDList}); //remove groupID from User groupIDList
	}).then(() => {
		if(newUserList.length == 0){
			for(let i = 0; i < newGroupTaskIDList.length; i++){
				Task.findByIdAndDelete(newGroupTaskIDList[i]);
			}
			return Group.findOneAndDelete({_id:groupID});
		} else {
			return Group.findOneAndUpdate({_id:groupID},{idList:newUserList});
		}
	}) //have to delete task cards

	.then(() =>
		res.send(user)
	)
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error leaving group with id: " + groupID })
	})
})


/**
 * req.params: 
 * 	groupName: String
 * 
 * 	res: List of Group Objects with the matching groupName
 *  */ 

router.get("/searchGroup/:groupName", (req,res) =>{  
	const groupName = req.params.groupName;
	if(groupName !== ""){
	
		const data = Group.find({groupName: new RegExp('^' + groupName , "i")})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res
			.status(500)
			.send({ message: "Error finding group with name: " + groupName })
		})
	} else {
		res.send([]);
	}
})

/**
 * req.params: 
 * 	ID: String
 * 
 * 	res: List of Group Objects with the matching ID/InviteLink
 *  */ 

router.get("/searchGroupID/:ID", (req,res) =>{  
	const inviteID = req.params.ID;
	const data = Group.find({inviteID})
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		res
		.status(500)
		.send({ message: "Error finding group with ID: " + ID })
	})
})


/**
 * req.body: 
 * 	userID: String
 * 	Add the users with the relevant userID to the group
 *  groupID: String
 * 
 * 	res: Successfully added or not
 *  */ 

router.post("/addToGroup", (req,res) =>{  
	const {userID, groupID} = req.body;
	console.log(userID);
	console.log(groupID);
	Group.updateOne({ _id: groupID },{ $push: { idList : [ userID] } })
	.then(() => {
		return User.updateOne({ _id: userID}, {$push: {groupIDList: [groupID]}});
	})
	.catch(err => {
		res
			.status(500)
			.send({ message: "Error adding to group with: " + groupID });
	});	
})


/**
 * req.params: 
 * 	_id: ObjectId of group
 * 
 * 	res: a list of task objects associated with group in database 
 *  */ 
router.get("/tasks/:_id",(req,res) => { //gets all tasks that an _id has
	const _id = req.params._id;
	Group.findById(_id)
		.then(async (data) => {
		const taskIDList = data.taskIDList; //assume we only have one instance of each name
		let taskList = [];
		for (let i = 0; i < taskIDList.length; i++) {
			taskList[i] = await Task.findById(taskIDList[i]);
		}
		return taskList;
		})
		.then((data) => {
			res.send(data);
		})
		.catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving tasks with id: " + _id });
    });	
})


router.get("/groups/:_id",(req,res) => { //gets all groups that an _id has
	const _id = req.params._id;
	User.findById(_id)
		.then(async (data) => {
		const groupIDList = data.groupIDList; //assume we only have one instance of each name
		let groupList = [];
		for (let i = 0; i < groupIDList.length; i++) {
			groupList[i] = await Group.findById(groupIDList[i]);
		}
		return groupList;
		})
		.then((data) => {
		res.send(data);
		})
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error retrieving groups with id: " + _id });
		});
})

/** 
 * req.params:
 * 	_id: ObjectId of group
 * 
 * res: a group object with the matching _id
 */

router.get("/:_id",(req,res) => {
	const _id = req.params._id;
	Group.findById(_id)
		.then((data) => {
			res.send(data);
		})
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error retrieving groups with id: " + _id });
		});
})

router.delete("/deleteTask/:groupID/:taskID",(req,res) => { //deletes a task from a group
	const grouPID = req.params.groupID;
	const taskID = req.params.taskID;
	Group.updateOne({ _id: grouPID },{ $pull: { taskIDList : taskID } })
		.then(() => {
			return Task.deleteOne({ _id: taskID});
		}
		)
		.then(() => {
			res.send("Task deleted");
		}
		)
		.catch(err => {
			res
			.status(500)
			.send({ message: "Error deleting task with id: " + taskID });
		});
})
module.exports = router