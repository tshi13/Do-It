import React, {useState, useEffect, useRef} from 'react';
import MessageChat from './MessageChat';
import TaskModal from "../components/TaskModal";

import  '../styles/chatBoxv2.css';


export default function Chatbox(props)  {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const groupName = props.groupName;
    const groupID = props.groupID;
    const userID = props.userID;
    const username = props.username;
    const profilePicture = props.profilePicture;
    const style = props.style ? props.style : {};
    const taskCallback = props.taskCallback ? props.taskCallback : () => {};

    const messageDiv = useRef(null);

    useEffect(() => {
        setMessages(props.messages);
    }, [props.messages]);

    
    useEffect(() => {
        if(messageDiv) {
            messageDiv.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
              });
            }
    }, []);



    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(message !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    }


    return (
            <div style = {style} >
                <div className = "rectangleContainer" style ={{width: '100%', height: '92vh'}} >
                    <div className = "chatBox" style={{height: '95%'}} >
                        <div className = "chatFeedHeaderTitle" style ={{width: '100%', display: 'inline-block'}}>
                            <h1 style ={{float: 'center'}}>{groupName}</h1>
                        </div>
                        <div className = "chatFeedHeaderButtons" style ={{display: 'inline-block'}}>
                            <TaskModal style ={{float: 'right', marginRight: '1%', marginLeft: '2%'}} groupID = {groupID} taskCallback = {taskCallback} userID = {userID} />
                        </div>
                        <div className= "chatFeed customscrollWrapper" style ={{height: '100%'}} ref = {messageDiv}>
                            {messages.map((message, index) => {
                                return (
                                    <MessageChat style ={{marginLeft: '1%'}} key={index} message={message} username={username} time={new Date().toLocaleTimeString()} profilePicture="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"/>
                                );})
                            }
                        </div>
                    </div>

                    <div className = "textBar">
                        <form className="input-area" onSubmit={handleSubmit}>
                            <div className ="input-wrapper">
                                <input style ={{width: '100%'}} type="text" placeholder="Type a message..." value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                            </div>
                            <button className ="iconButtons" style ={{float: 'right'}} type="button">+</button>
                            <button className ="iconButtons" style ={{float: 'right'}} type="button">˙ᵕ˙</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}

