import React, { Component } from "react";
import TaskModal from "../components/TaskModal";
import ChatBox from "../components/ChatBox";

export default class Home extends Component {
    render() {
        return (
        <div>
            <div className="taskModal">
                <TaskModal/>
                <ChatBox />
            </div>
            <h1>Home</h1>
            <button onClick={() => {}}> 
                Login
            </button>
        </div>
        );
    }

}