import React, { Component } from "react";
import TaskModal from "../components/TaskModal";

export default class Home extends Component {
    render() {
        return (
        <div>
            <div className="taskModal">
                <TaskModal/>
            </div>
            <h1>Home</h1>
            <button onClick={() => {}}> 
                Login
            </button>
        </div>
        );
    }

}