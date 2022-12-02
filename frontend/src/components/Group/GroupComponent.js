import React, {useState, useEffect} from 'react';
import GroupTaskBar from "./GroupTaskBar";
import groupDAO from '../../utils/groupDAO';
import GetStream2 from '../GetStreamChat/GetStream';

import '../../styles/groupComponent.css';

export default function GroupComponent(props)  {
    const groupID = props.groupID;
    const userID = props.userID ? props.userID : null;
    const username = props.username;
    const groupPicture = props.groupPicture;
    const setCoins = props.setCoins;
    const setNotifications = props.setNotifications;
    const newHeight = props.newHeight;

    const [tasks, setTasks] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [inviteID, setInviteID] = useState("");
    const [userList, setUserList] = useState([]);
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        //grab tasks from database for groupID
        //set tasks to the tasks from the database
        setTasks([]);
        getGroupTasks();
        groupDAO.getGroup(groupID).then((group) => {
            setGroupName(group.groupName);
            setInviteID(group.inviteID);
            setOwner(group.owner);
            let userListIDs = group.idList;
            setUserList(userListIDs);
        });
    }, [groupID]);

    // Gets list of group tasks from database
    async function getGroupTasks() {
        let taskList = [];
        groupDAO.getTasks(groupID).then((tasks) => {
            tasks.map((item, index) => {
                taskList.push(item);
            });
            setTasks(taskList);
        });
    }

    const taskCallback = (newTask) => {
        setCoins(sessionStorage.getItem("coins"));
        setTasks([...tasks, newTask]);
    }

    // Allows user to delete a task
    const deleteTaskCallback = (taskID) => {
        groupDAO.deleteTask(groupID, taskID).then(() => {
            setTasks(tasks.filter((task) => task._id !== taskID));
            //setTasks(tasks.filter((tasks) => tasks !== null));
        });
    }
    
    // Allows user to leave a group
    const leaveGroupCallback = (groupID) => {
        groupDAO.leaveGroup(groupID, userID).then(() => {
            props.leaveGroupCallback(groupID);
        });
    }
    
    // Renders the sidebar of tasks in the group component
    const renderTasks = () => {
        return (
            <GroupTaskBar setNotifications = {setNotifications} setCoins = {setCoins} deleteTaskCallback = {deleteTaskCallback} owner = {owner} tasks={tasks} style ={{width: '100%'}}  groupID = {groupID}  newHeight = {newHeight} inviteID = {inviteID} userID = {userID} userList = {userList} leaveGroupCallback = {leaveGroupCallback} taskCallback = {taskCallback} />
        );
    }

    // Renders the entire group component
    return (
        <div className = "groupComponent">
            <div className = "centerSection" style = {{width: '100%', height: newHeight}}>
                {userID && username && groupName && groupID ? 
                <GetStream2 userID = {userID} username = {username} groupID = {groupID} groupName = {groupName} newHeight = {newHeight} groupPicture = {groupPicture} />
                : null}

            </div>
            <div className = "rightSection" style = {{width: '20%',  height: newHeight}}>
                {renderTasks()}
            </div>
        </div>
    );
}

