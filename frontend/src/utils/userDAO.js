import axios from 'axios';
import axiosSettings from './axiosSettings';
import chatDAO from './chatDAO';


async function getUser(data) {//
    let res = await axios.get('/users/' + data.name).then(data => data);
    return res["data"];
}


async function addUser(data) {//
    let res = await axios.post('/users/createUser', data).then(data => data);
	await chatDAO.createUser(res["data"]._id, res["data"].name);    
    return res["data"];
}

// async function getGroups(userID) {
//     let res = await axios.get('/users/getGroups/' + userID).then(data => data);
//     return res["data"];
// }

async function getTasks(userID) {
    let res = await axios.get('/users/tasks/' + userID).then(data => data);
    return res["data"];
}

async function updateUser(userID, data) {//
    let res = await axios.put('/users/updateUser', {userID: userID, data: data}).then(data => data);
    return res["data"];
}

async function getUserData(userID) {//
    let res = await axios.get('/users/userdata/' + userID).then(data => data);
    return res["data"];
}

async function authenticate(data) {
    let res = await axios.post('/users/authenticate', data).then(data => data);
    return res["data"];
}

async function addTasks(userID, data) {//

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

async function login(data) {//

    /*
     data schema:
     data = {
            loginType: "google" or "facebook" or "password",
            (if loginType is google or facebook fill out the following)
            key: token,
            (if loginType is password fill out the following)
            username: username,
            password: password
        }
    */

    let loginType = data.loginType;
    let res;
	sessionStorage.setItem("loginType", loginType);
    if(loginType === "password") {
        res = await axios.get('/users/login/' + data.name + '/' + data.password).then(data => data);
    } else {
        res = await axios.get('/users/authLogin/' + data.loginType + '/' + data.key).then(data => data);
    }   

    if(typeof res["data"] !== String) {
        axios.get('/successfulAuth/' + res["data"]._id).then(data => data);
        return res["data"];
    }
}

async function logout(id) {//
    let res = await axios.get('/users/logout/' + id).then(data => data);
    console.log(res);
    return res["data"];
}

async function markAsOnline(id) {
    let res = await axios.get('/users/markOnline/' + id ).then(data => data);
    return res["data"];
}


export default class userDAO {
    static getUser(data) {
        return getUser(data);
    }

    static addUser(data) {
        return addUser(data);
    }

    // static getGroups(userID) {
    //     return getGroups(userID);
    // }

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

    static authenticate(userID) {
        return authenticate(userID);
    }
    static login(data) {
        return login(data);
    }

    static logout(id) {
        return logout(id);
    }

    static markAsOnline(id) {
        return markAsOnline(id);
    }


}