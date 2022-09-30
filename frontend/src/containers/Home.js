import React, { Component } from "react";
import ChatBox from "../components/ChatBox";

export default class Home extends Component {
    render() {
        return (
        <div>
            <div className="taskModal">
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