import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

async function getTasks(data) {
    let res = await axios.get('/tasks/' + data.userID).then(data => data);
    return res["data"];
}

async function addTask(data) {
    let res = await axios.put('/createTask', data).then(data => data);
    return res["data"];
}

export default class taskDAO {
    static getTasks(data) {
        return getTasks(data);
    }

    static addTasks(data) {
        return addTask(data);
    }
}


