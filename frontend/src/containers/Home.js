import React, { Component } from "react";
import ChatBox from "../components/ChatBox";

export default class Home extends Component {
    render() {
        return (
        <div>
            <div style = {{backgroundColor: "#212529"}} >
                <div style ={{display: 'flex', justifyContent: 'center'}}>
                    <ChatBox style = {{marginTop: '5%'}} color = 'white' />
                </div>
            </div> 
        </div>
        );
    }

}