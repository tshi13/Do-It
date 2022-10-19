import React, {useState, useEffect} from 'react';
import ChatBox from "../ChatBox";
import GroupTaskBar from "./GroupTaskBar";
import groupDAO from '../../utils/groupDAO';

import '../../styles/groupComponent.css';
import userDAO from '../../utils/userDAO';
import {Buffer} from 'buffer';


export default function GroupComponent(props)  {
    const groupID = props.groupID;
    const userID = props.userID;
    const username = props.username;
    const [tasks, setTasks] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        //grab tasks from database for groupID
        //set tasks to the tasks from the database
        groupDAO.getTasks(groupID).then((tasks) => {
            let taskList = [];
            for(let i = 0; i < tasks.length; i++) {
                let taskData = {
                    id: tasks[i]._id,
                    taskName: tasks[i].taskName,
                    taskDescription: tasks[i].taskDescription,
                    coinsEntered: tasks[i].coinsEntered,
                    completed: tasks[i].completed,
                    time: tasks[i].time,
                }
                taskList.push(taskData);
            }
            setTasks(taskList);
        });

        groupDAO.getGroup(groupID).then((group) => {
            setGroupName(group.groupName);
        });

    }, [groupID]);

    useEffect(() => {
        userDAO.getUserData(userID).then((user) => {
            {user.profilePicture ? setProfilePicture(Buffer.from(user.profilePicture).toString('base64')) : setProfilePicture(null)}
        });
    }, [userID]);

    
    const renderTasks = () => {
        if(tasks.length > 0) {
            return (
                <GroupTaskBar tasks={tasks} style ={{width: '100%'}} />
            );
        }
    }

    const taskCallback = (newTask) => {
        setTasks([...tasks, newTask]);
    }

    const leaveGroupCallback = (groupID, userID) => {
        groupDAO.leaveGroup(groupID, userID).then(() => {
            props.leaveGroupCallback(groupID);
        });
    }
    

   const renderChat = () => {
        if(userID !== undefined && groupID !== undefined) {
            return (
                <ChatBox profilePicture = {profilePicture} username = {username} userID = {userID} groupID = {groupID} messages = {[]} taskCallback = {taskCallback} groupName = {groupName} leaveGroupCallback = {leaveGroupCallback}/>
            );
        }
    }

    return (
        <div className = "groupComponent">
            <div className = "centerSection" style ={{width: '85%', height: '100%'}}>
                {renderChat()}
            </div>
            <div className = "rightSection" style ={{width: '20%', height: '100%'}}>
                <h1 style ={{textAlign: 'center'}}>Task List</h1>
                {renderTasks()}
            </div>
        </div>
    );
}

