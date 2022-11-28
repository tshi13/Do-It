import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import CreateGroup from "../components/Group/CreateGroup";
import GroupComponent from "../components/Group/GroupComponent";
import GroupList from "../components/Group/GroupList";
import groupDAO from '../utils/groupDAO';
import {Buffer} from 'buffer';
import DisplayTasks from "../components/DisplayTasks";
import TaskModalUser from "../components/Task/TaskModalUser";
import taskDAO from '../utils/taskDAO';
import userDAO from '../utils/userDAO';

export default function Home(props) {
    const [groups, setGroups] = useState([]);
    const setCoins = props.setNavCoins;
    const setSelectedGroupID = props.setSelectedGroup;
    const selectedGroupID = props.selectedGroup;
    const [selectedGroupPicture, setSelectedGroupPicture] = useState(null);
    const userID = props.userID;
    const setNotifications = props.setNotifications;
    const [showTasks, setShowTasks] = useState(false);
    const [privateTasks, setPrivateTasks] = useState([]);

    const newHeight = props.newHeight;
    
    useEffect(() => {
        //grab groups from database for userID
        //set groups to the groups from the database
        groupDAO.getGroups(userID).then((groups) => {
            let groupList = [];
            for(let i = 0; i < groups.length; i++) {
                let groupData = {
                    id: groups[i]._id,
                    groupName: groups[i].groupName,
                    groupPicture: groups[i].groupPicture ? Buffer.from(groups[i].groupPicture).toString('base64') : null,
                }
                groupList.push(groupData);
            }
            setGroups(groupList);
        });
        
    }, []);

    useEffect(() => {
        userDAO.getTasks(userID)
            .then((tasks) => {
                if (tasks) {
                    let removeNull = tasks.filter((task) => task !== null);
                    setPrivateTasks(removeNull);
                }
            })
    }, []);

    const deleteTaskCallback = (taskID) => {
        taskDAO.deleteTask(userID, taskID).then(() => {
            setPrivateTasks(privateTasks.filter((task) => task._id !== taskID));
        });
    }

    const taskCallback = (task) => {
        setPrivateTasks([...privateTasks, task]);
        props.setNavCoins(sessionStorage.getItem("coins"));
    }

    const groupCallback = (group) => {
        let newGroup = {
            id: group._id,
            groupName: group.groupName,
            groupPicture: group.groupPicture ? Buffer.from(group.groupPicture).toString('base64') : null,
        }
        setGroups([...groups, newGroup]);
    }

    const leaveGroupCallback = (groupID) => {
        let newGroups = groups.filter((group) => {
            return group.id !== groupID;
        });
        setGroups(newGroups);
        setSelectedGroupID(null);
    }


    const setSelectedID = (groupID) => {
        setSelectedGroupID(groupID);

        let groupPicture = groups.filter((group) => {
            return group.id === groupID;
        });

        let groupPictureString = groupPicture[0].groupPicture;
        setSelectedGroupPicture(groupPictureString);
    }

    const checkUserStillInGroup = (groupID) => {
        if(groupID !== null) {
            let group = groups.filter((group) => {
                return group.id === groupID;
            });
            if (group.length === 0) {
                setSelectedGroupID(null);
            }
            return group.length !== 0;
        } else {
            return false;
        }
    }
    
    const handleShowTasks = () => {
        setShowTasks(!showTasks);
    }

    const renderGroup = () => {
                    
        if(selectedGroupID !== null && checkUserStillInGroup(selectedGroupID) && !showTasks)  {
            return (
                <GroupComponent setNotifications = {setNotifications} setCoins = {setCoins} groupPicture = {selectedGroupPicture} groupID = {selectedGroupID} userID = {props.userID} username = {props.username} leaveGroupCallback = {leaveGroupCallback} newHeight = {newHeight}  />
            );
        } else {
            return (
                <div>
                    <button className="roundButton" onClick={() => handleShowTasks()}>{!showTasks ? "Show Private Tasks" : "Back"}</button>
                    {showTasks ? 
                        <div>
                        <TaskModalUser style ={{float: 'right', margin: '1vw'}} taskCallback = {taskCallback} userID = {userID}/>
                        <DisplayTasks setCoins = {props.setNavCoins} userID={userID} privateTasks = {privateTasks} deleteTask = {deleteTaskCallback} />
                        </div>
                        : null }
                </div>
            )
        }
    }

    return (
        <div>
            <div className="home" style = {{display: 'flex', flexDirection: 'row'}}>

                <div className="groupList" style ={{backgroundColor: '#99ffdd', padding: '10px', height: newHeight}}>
                    <div className ="sideBar" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <GroupList groups={groups} groupCallback = {setSelectedID} newHeight = {newHeight} setSelectedGroupID = {setSelectedGroupID}/>
                        <CreateGroup userID = {props.userID} groupCallback = {groupCallback}/>
                    </div>
                </div>
                <div style = {{width: '100%'}}>
                    {renderGroup()}
                </div>
            </div>
        </div>

    );

}