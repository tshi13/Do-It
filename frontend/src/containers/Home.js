import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import frontpage from ".././assets/frontpage.png";
import CreateGroup from "../components/CreateGroup";
import GroupComponent from "../components/GroupClasses/GroupComponent";
import GroupList from "../components/GroupClasses/GroupList";
import groupDAO from '../utils/groupDAO';
import taskDAO from "../utils/taskDAO";
import userDAO from "../utils/userDAO";
import DisplayTasks from "../components/DisplayTasks";
import TaskModalUser from "../components/TaskModalUser";
import {Buffer} from 'buffer';


export default function Home(props) {
    const [groups, setGroups] = useState([]);
	const [privateTasks, setPrivateTasks] = useState([]);
    const [coins, setCoins] = useState(0);
    const [selectedGroupID, setSelectedGroupID] = useState(null);
    const [selectedGroupPicture, setSelectedGroupPicture] = useState(null);
    const userID = props.userID;



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
        taskDAO.getTasks({userID: props.userID})
            .then((tasks) => {
                if (tasks[0]) {
                    setPrivateTasks(tasks);
                }
            })
    }, []);

    
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

    const taskCallback = (task) => {
        setPrivateTasks([...privateTasks, task]);
    }

    const setSelectedID = (groupID) => {
        setSelectedGroupID(groupID);

        let groupPicture = groups.filter((group) => {
            return group.id === groupID;
        });

        let groupPictureString = groupPicture[0].groupPicture;
        setSelectedGroupPicture(groupPictureString);

    }

    const renderGroup = () => {
        if(selectedGroupID !== null) {
            return (
                <GroupComponent groupPicture = {selectedGroupPicture} groupID = {selectedGroupID} userID = {props.userID} username = {props.username} leaveGroupCallback = {leaveGroupCallback} newHeight = {newHeight} />
            );
        }
        else {
            return (
                <>
                    <TaskModalUser style ={{float: 'right', margin: '1vw'}} taskCallback = {taskCallback} userID = {userID}/>
                    <DisplayTasks userID={userID} privateTasks = {privateTasks} />
                </>
            );
        }
    }


   
    return (
        <div>
            <div className="home" style = {{display: 'flex', flexDirection: 'row'}}>
                <div className="groupList" style ={{backgroundColor: '#99ffdd', padding: '10px'}}>
                    <div className ="sideBar" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <GroupList groups={groups} groupCallback = {setSelectedID} newHeight = {newHeight} setSelectedGroupID = {setSelectedGroupID}/>
                        <CreateGroup userID = {props.userID} groupCallback = {groupCallback}/>
                    </div>
                </div>
                <div style = {{width: '100%'}}>
                    {/* <TaskModalUser style ={{float: 'right', margin: '1vw'}} taskCallback = {taskCallback} userID = {userID}/>
                    <DisplayTasks userID={props.userID} privateTasks = {privateTasks} /> */}
                    {/* <TaskModal ></TaskModal> */}
                    {renderGroup()}
                </div>
            </div>
        </div>

    );

}