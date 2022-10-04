import React, { Component } from "react";
import ChatBox from "../components/ChatBox";
import axios from 'axios';
import TaskModal from "../components/TaskModal";

const api = axios.create({
    baseURL: `http://localhost:3000/`,
});

export default class Home extends Component {




    // this constructor could also probably be moved into the ChatBox.js class
    constructor(props) {
        super();
        this.state = {
            tasks: props.tasks ? props.tasks : [],
        };
        this.getTasks();
    }

    // getting the list of tasks associated with a particular user
    // and storing it in the state' tasks variable
    getTasks = async() => {
        try {
            // testing the _id with Terry's _id
            let data = await api.get('/tasks', {
                body: {
                    "_id": "6337dbc4d47cf068e83480f5"
                }
            }).then(({data}) => data);
            // stored tasks in data
            // then updating React state with the data (the tasks list)
            this.setState({tasks: data});
        }
        catch (err) {
            // error checking
            console.log(err);
        }
    }

    addTask = async() => {
        
        // add a list of tasks,
        // and make sure res
        // output is good
        let res = await api
            .post('/addTask', {
                userID: "6337dbc4d47cf068e83480f5",
                taskName: "Test task: Mon 10-3-2022 3:30pm",
                time: "1 hour",
                coinsEntered: 1,
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
            <div style = {{marginRight: '50%'}}>
                <TaskModal />
            </div>
            {/* <div style ={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
                <ChatBox tasks={this.state.tasks} />
            </div> */}
            
        </div>
        );
    }

}