import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getUser(data) {
    let res = await axios.get('/user/' + data.name).then(data => data);
    return res["data"];
}

async function addUser(data) {
    let res = await axios.post('/createUser', data).then(data => data);
    return res["data"];
}

async function getGroups(userID) {
    let res = await axios.get('/groups/' + userID).then(data => data);
    return res["data"];
}

async function getTasks(userID) {
    let res = await axios.get('/tasks/' + userID).then(data => data);
    return res["data"];
}

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

    static joinGroup(userID, groupID) {
        return joinGroup(userID, groupID);
    }
}


