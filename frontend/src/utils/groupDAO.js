import axios from 'axios';

async function getGroups(userID) {//This should not be here
    let res = await axios.get('/group/groups/' + userID).then(data => data);
    return res["data"];
}

async function createGroup(data) {//
    let res = await axios.post('/group/creategroup', data).then(data => data);
    return res["data"];
}

async function getUser(groupID) {
    let res = await axios.get('/group/getUsersForGroup/' + groupID).then(data => data);
    return res["data"];
}

async function getTasks(groupID) {//
    let res = await axios.get('/group/tasks/' + groupID).then(data => data);
    return res["data"];
}

async function addTasks(groupID, data) {//

    let updatedData = data;
    updatedData["groupID"] = groupID;
    let res = await axios.put('/group/createTask', updatedData).then(data => data);
    return res["data"];
}

async function getGroup(groupID) {//
    let res = await axios.get('/group/' + groupID).then(data => data);
    return res["data"];
}

async function searchGroup(query, type) {//
    if(type === "name") {
        let res = await axios.get('/group/searchGroup/' + query).then(data => data);
        return res["data"];
    } else if(type === "ID") {
        let res = await axios.get('/group/searchGroupID/' + query).then(data => data);
        return res["data"];
    }
}

async function addToGroup(data) {//
    let res = await axios.post('/group/addToGroup', data).then(data => data);
    return res["data"];
}

async function leaveGroup(groupID, userID) {//

    let data = {
        groupID: groupID,
        userID: userID
    }

    let res = await axios.put('/group/leaveGroup', data).then(data => data);

    return res["data"];
}

async function deleteTask(groupID, taskID) {//
    let res = await axios.delete('/group/deleteTask/' + groupID + "/" + taskID).then(data => data);
    return res["data"];
}


export default class groupDAO {
    static getGroups(userID) {
        return getGroups(userID);
    }

    static getUser(groupID) {
        return getUser(groupID);
    }

    static getTasks(groupID) {
        return getTasks(groupID);
    }

    static addTasks(groupID, data) {
        return addTasks(groupID, data);
    }

    static createGroup(data) {
        return createGroup(data);
    }

    static getGroup(groupID) {
        return getGroup(groupID);
    }

    static searchGroup(query, type) {
        return searchGroup(query, type);
    }

    static addToGroup(data) {
        return addToGroup(data);
    }

    static leaveGroup(groupID, userID) {
        return leaveGroup(groupID, userID);
    }

    static deleteTask(groupID, taskID) {
        return deleteTask(groupID, taskID);
    }
}


