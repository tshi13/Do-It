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
        userID: "Group Task",
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

async function searchGroup(groupName) {
    let res = await axios.get('/searchGroup/' + groupName).then(data => data);
    return res["data"];
}

async function addToGroup(data) {
    let res = await axios.post('/addToGroup', data).then(data => data);
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

    static searchGroup(groupName) {
        return searchGroup(groupName);
    }

    static addToGroup(data) {
        return addToGroup(data);
    }



}


