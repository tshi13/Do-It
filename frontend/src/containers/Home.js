import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import TaskModal from "../components/TaskModal";
import axios from 'axios';
import DisplayTasks from '../pages/DisplayTasks'
// import TaskModal from "../components/TaskModal";
import '../styles/Home.css';

// const api = axios.create({
//     baseURL: `http://localhost:5000/`,
// });


export default function Home(props) {

    useEffect(()=>{
        getTasks();
        // getUserID(); // will only run once
        // due to empty dependency array below
    }, [])

    // const {username} = this.props;

    // this state could also probably be moved into the ChatBox.js class
    // state = {
    //     _id: "",
    //     tasks: [],
    // }
    const [id, setId] = useState("");
    const [tasks, setTasks] = useState([]);

    // this constructor could also probably be moved into the ChatBox.js class
    // constructor() {
    //     super();
    //     this.getUserID();
    //     this.getTasks();
    // }

    const getUserID = async() => {

        // getting username from the props
        let username = props.username;
        if (username === null) {
            username = "Terry"; // default hardcoded username
            setId("6337dbc4d47cf068e83480f5"); // default hardcoded _id
        }

        // getting _id from the username (going to database)
        let data = await axios.get('/user/' + username).then(data => data);

        // setting id as the returned _id from the database
        setId(data["data"]);
    }

    // getting the list of tasks associated with a particular user
    // and storing it in the state' tasks variable
    const getTasks = async() => {
        getUserID();
        try {
            // testing the _id with Terry's _id
            let data = await axios.get('/tasks/' + id)
            .then(data => data);
            // stored tasks in data
            // then updating React state with the data (the tasks list)
            // this.setState({tasks: data});
            

            // this line is confusing me -- not sure how to
            // get the tasks state variable to reflect
            // what was loaded in from axios
            setTasks(data["data"]);
        }
        catch (err) {
            // error checking
            console.log(err);
        }
        return tasks;
    }

    const addTask = async(taskName="test", time, coinsEntered) => {
        getUserID();
        // add a list of tasks,
        // and make sure res
        // output is good
        let res = await axios
            .put('/addTask', {
                "userID": id,
                "taskName": taskName,
                "time": time,
                "coinsEntered": coinsEntered,
            })
            .catch(err=>console.log(err));

        // provided the res output was good,
        // refresh the list of tasks after you add a task
            // to the index.js backend and database
        // so we can see the updated list of tasks
        getTasks();
    }

    // getUserID(); // runs repeatedly here
    // getTasks(); // runs repeatedly here

    const loggedInPage = (
        <div className="home">
            <div className="home__container">
                <div className="customContainer" style = {{backgroundColor: props.backgroundColor}}>
                    <h1 className="title">Welcome to the Home Page, {props.username}!</h1>
                    <div className="home__container__left">
                  </div>
                    <div className="home__container__right">
                        <TaskModal addTask={addTask} />
                        <ChatBox tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );

    const homePage = (
        <div className="home">
            <p>Home Page</p>
        </div>
    );

        


    return (
        <div>
            {props.isLoggedIn ? loggedInPage : homePage}
        </div>
    );

}