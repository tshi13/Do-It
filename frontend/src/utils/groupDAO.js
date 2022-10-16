import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getGroups(data) {
    let res = await axios.get('/group/' + data.groupID).then(data => data);
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
    let res = await axios.get('/getTasksForGroup/' + groupID).then(data => data);
    return res["data"];
}

async function addTasks(groupID, data) {
    
    data = {
        groupID: groupID,
        task: data
    }

    let res = await axios.put('/createGroupTask', data).then(data => data);
    return res["data"];
}

export default class groupDAO {
    static getGroups(data) {
        return getGroups(data);
    }

    static getUser(groupID) {
        return getUser(groupID);
    }

    static getTasks(groupID) {
        return getTasks(groupID);
    }

    static addTasks(groupID) {
        return addTasks(groupID);
    }

    static createGroup(data) {
        return createGroup(data);
    }



}


