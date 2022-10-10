import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
async function getData(type, data) {
    if(type === "user") {
        let res = await axios.get('/user/:' + data).then(data => data);
        return res["data"];
    } else if(type === "tasks") {
        let res = await axios.get('/tasks/:' + data).then(data => data);
        return res["data"];
    } else if(type === "group") {
        let res = await axios.get('/group/:' + data).then(data => data);
        return res["data"];
    }
}

async function addData(type, data) {
    if(type === "user") {
        let res = await axios.post('/createUser', data).then(data => data);
        return res["data"];
    } else if(type === "tasks") {
        let res = await axios.post('/createTask', data).then(data => data);
        return res["data"];
    } else if(type === "group") {
        let res = await axios.post('/group', data).then(data => data);
        return res["data"];
    } else {
        let res = await axios.post(type, data).then(data => data);
        return res["data"];
    }
}



export default class Database {
    static getData(type, data) {
        return getData(type, data);
    }

    static addData(type, data) {
        return addData(type, data);
    }
}


