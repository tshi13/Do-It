import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getGroups(userID) {
    let res = await axios.get('/groups/' + userID).then(data => data);
    return res["data"];
}

async function createGroup(data) {
    let res = await axios.post('/creategroup', data).then(data => data);
    return res["data"];
}

async function getUser(groupID) {
    let res = await axios.get('/getUsersForGroup/' + groupID).then(data => data);
    return res["data"];
}

async function getTasks(groupID) {
    let res = await axios.get('/tasks/group/' + groupID).then(data => data);
    return res["data"];
}

async function addTasks(groupID, data) {
    
    let updatedData = {
        groupID: groupID,
        userID: data.userID,
        taskName: data.taskName,
        time: data.time,
        coinsEntered: data.coinsEntered
    }

    let res = await axios.put('/createTask/group', updatedData).then(data => data);
    return res["data"];
}

async function getGroup(groupID) {
    let res = await axios.get('/group/' + groupID).then(data => data);
    return res["data"];
}

async function searchGroup(query, type) {
    if(type === "name") {
        let res = await axios.get('/searchGroup/' + query).then(data => data);
        return res["data"];
    } else if(type === "ID") {
        let res = await axios.get('/searchGroupID/' + query).then(data => data);
        return res["data"];
    }
}

async function addToGroup(data) {
    let res = await axios.post('/addToGroup', data).then(data => data);
    return res["data"];
}

async function leaveGroup(groupID, userID) {

    let data = {
        groupID: groupID,
        userID: userID
    }

    let res = await axios.put('/leaveGroup', data).then(data => data);

    return res["data"];
}

async function deleteTask(groupID, taskID) {
    let res = await axios.delete('/deleteTask/group/' + groupID + "/" + taskID).then(data => data);
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


