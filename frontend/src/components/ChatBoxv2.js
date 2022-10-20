import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import TaskModal from "../components/TaskModal";
import Database from '../utils/database';
import ChatFeed from './chatcomponents/ChatFeed';

import  '../styles/chatBoxv2.css';
import {ChatEngine} from "react-chat-engine";
import LoginForm from './chatcomponents/LoginForm';


export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            style: props.style,
            userID: props.userID,
            groupID: props.groupID,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({messages: [...this.state.messages, this.state.message]});
        this.setState({message: ""});
    }


    render() {
        const{store} = this.props;
        //const tasks = store.getTasks();
        // const messages = store.getMessagesFromChannel(activeChannel);
        //if (!localStorage.getItem('username')) return <LoginForm />

        return (
            <div style = {this.state.style}>
                <div className = "rectangleContainer"  >
                    <ChatEngine
                    height = "100vh"
                    projectID = "9fbc3a05-49fe-4279-b30b-858265ba077c"
                    userName = 'doit'
                    userSecret = '123123'
                    // userName = {localStorage.getItem('username')}
                    // userSecret = {localStorage.getItem('password')}
                    renderChatFeed = {(chatProps) => <ChatFeed {...chatProps}/>}
                    />
                </div>

            </div>
        );
    }
}