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
    const [inviteID, setInviteID] = useState("");
    const [userList, setUserList] = useState([]);
    

    const newHeight = props.newHeight;

    async function getGroupTasks() {
        let taskList = [];
        groupDAO.getTasks(groupID).then((tasks) => {
            taskList = tasks;
        }).then(() => {
            setTasks(taskList);
        });
    }

    useEffect(() => {
        //grab tasks from database for groupID
        //set tasks to the tasks from the database
        setTasks([]);
        getGroupTasks();
        groupDAO.getGroup(groupID).then((group) => {
            setGroupName(group.groupName);
            setInviteID(group.inviteID);
            let userListIDs = group.idList;
            let userList = [];
            for(let i = 0; i < userListIDs.length; i++) {
                userDAO.getUserData(userListIDs[i]).then((user) => {
                    let userData = {
                        id: user._id,
                        name: user.name,
                        profilePicture: user.profilePicture,
                    }
                    userList.push(userData);
                });
            }
            setUserList(userList);
        });

    }, [groupID]);

    useEffect(() => {
        userDAO.getUserData(userID).then((user) => {
            {user.profilePicture ? setProfilePicture(Buffer.from(user.profilePicture).toString('base64')) : setProfilePicture(null)}
        });
    }, [userID]);

    
    const renderTasks = () => {
        return (
            <GroupTaskBar tasks={tasks} style ={{width: '100%'}} newHeight = {newHeight} inviteID = {inviteID} userID = {userID} userList = {userList} />
        );
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
                <ChatBox newHeight = {newHeight} profilePicture = {profilePicture} username = {username} userID = {userID} groupID = {groupID} messages = {[]} taskCallback = {taskCallback} groupName = {groupName} leaveGroupCallback = {leaveGroupCallback} userList = {userList}/>
            );
        }
    }

    return (
        <div className = "groupComponent">
            <div className = "centerSection" style ={{width: '85%', height: '100%'}}>
                {renderChat()}
            </div>
            <div className = "rightSection" style ={{width: '20%', height: '100%'}}>
                {renderTasks()}
            </div>
        </div>
    );
}

