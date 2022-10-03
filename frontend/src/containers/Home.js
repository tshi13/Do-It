import React, { Component } from "react";
import ChatBox from "../components/ChatBox";
import TaskModal from "../components/TaskModal";
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/`,
});

export default class Home extends Component {

    // const {username} = this.props;

    // this state could also probably be moved into the ChatBox.js class
    state = {
        _id: "",
        tasks: [],
    }

    // this constructor could also probably be moved into the ChatBox.js class
    constructor() {
        super();
        this.getUserID();
        this.getTasks();
    }

    getUserID() {
        const username = this.props.username;
        // let userId = api.get('');
        
        //----------------------
        const userId = "6337dbc4d47cf068e83480f5";
        // test above for now

        this.setState({_id: userId});
    }

    // getting the list of tasks associated with a particular user
    // and storing it in the state' tasks variable
    getTasks = async() => {
        try {
            // testing the _id with Terry's _id
            let data = await api.get('/tasks', {
                body: {
                    "_id": this.state.userId,
                }
            }).then(({data}) => data);
            // stored tasks in data
            // then updating React state with the data (the tasks list)
            this.setState({tasks: data});
            console.log(data);
        }
        catch (err) {
            // error checking
            console.log(err);
        }
    }

    addTask = async(taskName, time, coinsEntered) => {
        
        // add a list of tasks,
        // and make sure res
        // output is good
        let res = await api
            .post('/addTask', {
                userID: this.state.userId,
                taskName: taskName,
                time: time,
                coinsEntered: coinsEntered,
            })
            .catch(err=>console.log(err));
        console.log(res);

        // provided the res output was good,
        // refresh the list of tasks after you add a task
            // to the index.js backend and database
        // so we can see the updated list of tasks
        this.getTasks();
    }

    render() {
        return (

        <div>
            {/* <TaskModal addTask={this.addTask} getTasks={this.getTasks} /> */}
            <div style ={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
                <ChatBox tasks={this.state.tasks} />
            </div>
            
        </div>
        );
    }

}