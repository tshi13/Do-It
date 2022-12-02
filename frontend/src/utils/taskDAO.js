import axios from 'axios';
import axiosSettings from './axiosSettings';


// getting tasks for a user only

async function getTask(taskID) {//
    let res = await axios.get('/tasks/getTask/' + taskID).then(data => data);
    return res["data"];
}

async function addTask(data) {
    let res = await axios.put('/tasks/createTask', data).then(data => data);
    return res["data"];
}

async function updateTask(data) {//
    let res = await axios.put('/tasks/updateTask', data).then(data => data);
    return res["data"];
}

async function deleteTask(userID, taskID) {//
    let res = await axios.delete('/tasks/deleteTask/user/' + userID + "/" + taskID).then(data => data);
    return res["data"];
}

export default class taskDAO {
    
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


