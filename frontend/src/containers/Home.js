import React, { Component } from "react";
import ChatBox from "../components/ChatBox";

export default class Home extends Component {
    render() {
        return (
        <div>
            <div style ={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
                <ChatBox />
            </div>
            
        </div>
        );
    }

}