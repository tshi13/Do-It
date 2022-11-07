import axios from 'axios';
import chatDAO from './chatDAO';


axios.defaults.baseURL = 'http://localhost:5000';

async function getUser(data) {
    let res = await axios.get('/users/' + data.name).then(data => data);
    return res["data"];
}

async function addUser(data) {
    let res = await axios.post('/users/createUser', data).then(data => data);
		await chatDAO.createUser(res["data"]._id, res["data"].name);
    return res["data"];
}

async function getGroups(userID) {
    let res = await axios.get('/users/getGroups/' + userID).then(data => data);
    return res["data"];
}

async function getTasks(userID) {
    let res = await axios.get('/users/getTasks/' + userID).then(data => data);
    return res["data"];
}

async function updateUser(userID, data) {
    let res = await axios.put('/users/updateUser', {userID: userID, data: data}).then(data => data);
    return res["data"];
}

//This is replicate
async function getUserData(userID) {
    let res = await axios.get('/users/getUserdata/' + userID).then(data => data);
    return res["data"];
}

async function addTasks(userID, data) {
    
    let updatedData = {
        userID: userID,
        groupID: "None",
        taskName: data.taskName,
        time: data.time,
        coinsEntered: data.coinsEntered
    }

    let res = await axios.put('/users/createTask', updatedData).then(data => data);
    return res["data"];
}

//No definition in the backend
async function joinGroup(userID, groupID) {
    let res = await axios.post('/joingroup', {userID: userID, groupID: groupID}).then(data => data);
    return res["data"];
}

export default class userDAO {
    static getUser(data) {
        return getUser(data);
    }

    static addUser(data) {
        return addUser(data);
    }

    static getGroups(userID) {
        return getGroups(userID);
    }

    static getTasks(userID) {
        return getTasks(userID);
    }

    static addTasks(groupID, data) {
        return addTasks(groupID, data);
    }

    static joinGroup(userID, groupID) {
        return joinGroup(userID, groupID);
    }

    static updateUser(userID, data) {
        return updateUser(userID, data);
    }

    static getUserData(userID) {
        return getUserData(userID);
    }
}


