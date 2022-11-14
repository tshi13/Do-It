import axios from 'axios';

// Enable this for local development
axios.defaults.baseURL = 'http://localhost:5000'; 

//Enable this for heroku production app
// axios.defaults.baseURL = 'https://backend-oose-doit.herokuapp.com/';

// getting tasks for a user only
async function getTasks(data) {
    let res = await axios.get('/tasks/user/' + data.userID).then(data => data);
    return res["data"];
}

async function getTask(taskID) {
    let res = await axios.get('/getTask/' + taskID).then(data => data);
    return res["data"];
}

async function addTask(data) {
    let res = await axios.put('/createTask', data).then(data => data);
    return res["data"];
}

async function updateTask(data) {
    let res = await axios.put('/updateTask', data).then(data => data);
    return res["data"];
}

async function deleteTask(userID, taskID) {
    let res = await axios.delete('/deleteTask/user/' + userID + "/" + taskID).then(data => data);
    return res["data"];
}

export default class taskDAO {
    static getTasks(data) {
        return getTasks(data);
    }

    static addTasks(data) {
        return addTask(data);
    }

    static updateTask(data) {
        return updateTask(data);
    }

    static deleteTask(userID, taskID) {
        return deleteTask(userID, taskID);
    }

    static getTask(taskID) {
        return getTask(taskID);
    }
}


