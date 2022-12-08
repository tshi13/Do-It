import React, {useEffect, useState} from 'react';
import TaskCard from '../Task/TaskCard';
import TaskModal from '../Task/TaskModal';
import GroupSettings from './GroupSettings';
import userDAO from '../../utils/userDAO';

import '../../styles/GroupTaskBar.css';

export default function GroupTaskBar(props) {

    const tasks = props.tasks ? props.tasks : [];
    const style = props.style ? props.style : {};
    const newHeight = props.newHeight;
    const userID = props.userID ? props.userID : null;
    const owner = props.owner;
    const userList = props.userList;
    const setCoins = props.setCoins;
    const setNotifications = props.setNotifications;

    const [sorted, setSorted] = useState(false);
    const [userMap, setUserMap] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [individualTask, setIndividualTask] = useState({});
    const [groupTask, setGroupTask] = useState({});
    
    const firstPartOfURL = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

    // Helper function to return dates for tasks
    function getFormattedDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    // Callback for leaving a group
    const leaveGroup = () => {
        props.leaveGroupCallback(props.groupID, userID);
    }

    // Callback for tasks
    const taskCallback = (task) => {
        props.taskCallback(task);
    }

    // Callback for deleting a task
    const deleteTask = (taskID) => {
        props.deleteTaskCallback(taskID);
    }

    // Setting state variables, like tasks array,
    // to prepare to render them
    useEffect(() => {
        let individualTask = [];
        let groupTask = [];
        tasks.map((item, index) => {
            if(item !== null) {
                if(item.userID !== "Group Task") {
                    individualTask.push(item);
                } else {
                    groupTask.push(item);
                }
            }
        });
        setIndividualTask(individualTask);
        setGroupTask(groupTask);
        setSorted(true);

        let userMap = [];
        for(let i = 0; i < userList.length; i++) {
            if(userList[i] !== null) {
                userDAO.getUserData(userList[i]).then((user) => {
                    if(user) {
                        let temp = {
                            id: user._id,
                            name: user.name,
                        }
                        userMap.push(temp); 
                        
                    }
                });
            }
        }
        setUserMap(userMap);   
        
    }, [tasks]);
    
    // using .map() to render the list of tasks
    // in the GroupTaskBar
    const renderTasks = () => {
        if(tasks.length > 0 && sorted ) {
            return (
            <div style = {{height: newHeight}} className = "taskList" >
            {/* <div className = "taskList">     */}
                <GroupSettings leaveGroup = {leaveGroup} setShow = {setShowTaskModal} />
                <h1 style ={{textAlign: 'center'}}>Task List</h1>
                <p style = {{textAlign: 'center'}}>Group Invite: {props.inviteID}</p>
                 <button className = "button" onClick = {() => {navigator.clipboard.writeText(firstPartOfURL +"/invite/ID=" + props.inviteID)}}>Copy Invite Link To Clipboard</button>
                <div className = "scrollWrapper" style ={{height: '65%'}} >
                    <div style ={{alignItems: 'center'}}>
                        {groupTask.length > 0 ? 
                            <div className = "taskWrapper">
                                <h2 style = {{textAlign: 'center'}}>Group Tasks</h2>
                                {groupTask.map((item, index) => {
                                     let checkedDate = new Date(item.checkedDate);
                                     let modifiedDate = new Date(item.checkedDate);
                                        modifiedDate.setDate(modifiedDate.getDate() + item.time);
                                     let taskData = {
                                        id: item._id,
                                        taskName: item.taskName,
                                        coinsEntered: item.coinsEntered,
                                        time: item.time,
                                        type: "group",
                                        userID: null,
                                        completedList: item.completedList,
                                        joinedList: item.joinedList ? item.joinedList : [],
                                        coinPool: item.coinPool ? item.coinPool : 0,
                                        lastCheckOff: getFormattedDate(checkedDate),
                                        nextCheckOff: getFormattedDate(modifiedDate),
                                        createdBy: item.createdBy,
                                    }
                                    return (
                                        <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} taskCallback = {taskCallback} userID = {userID}  owner = {owner} />
                                    )
                                })}
                            </div>
                            :
                            null
                        } 
                        {individualTask.length > 0 ?
                            <div className = "taskWrapper">
                                <h2 style = {{textAlign: 'center'}}>Individual Tasks</h2>
                                {individualTask.map((item, index) => {
                                    let checkedDate = new Date(item.checkedDate);
                                    let modifiedDate = new Date(item.checkedDate);
                                       modifiedDate.setDate(modifiedDate.getDate() + item.time);
                                    let taskData = {
                                        id: item._id,
                                        taskName: item.taskName,
                                        coinsEntered: item.coinsEntered,
                                        time: item.time,
                                        type: "groupIndividual",
                                        userID: item.userID,
                                        completedList: item.completedList,
                                        lastCheckOff: getFormattedDate(checkedDate),
                                        nextCheckOff: getFormattedDate(modifiedDate),
                                        createdBy: item.createdBy,
                                        joinedList: item.joinedList ? item.joinedList : [],
                                        coinPool: item.coinPool ? item.coinPool : 0,
                                    }
                                    return (
                                        <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} taskCallback = {taskCallback} userID = {userID} owner = {owner} groupSize = {userList.length} />
                                    )
                                })}
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            );
        } else {
            return (
                <div style = {{height: newHeight}} className = "taskList">
                {/* <div className = "taskList"> */}
                    
                    <GroupSettings leaveGroup = {leaveGroup} setShow = {setShowTaskModal} />
                    <h1 style ={{textAlign: 'center'}}>Task List</h1>
                    <p style = {{textAlign: 'center'}}>Group Invite: {props.inviteID}</p>
                    <button className = "button" onClick = {() => {navigator.clipboard.writeText(firstPartOfURL +"/invite/ID=" + props.inviteID)}}>Copy Invite Link To Clipboard</button>
                    <div>
                        <h2 style ={{textAlign: 'center'}}>No Tasks</h2>
                    </div>
                </div>
            );
        }
    }

    // Render the .map() list of tasks,
    // along with the Task Modal (to create new tasks)
    return (
        <div width="100%">
            <TaskModal setNotifications = {setNotifications} style ={{float: 'right', marginRight: '1%', marginLeft: '2%', zIndex: "5000"}} show = {showTaskModal} setShow = {setShowTaskModal} groupID = {props.groupID} taskCallback = {taskCallback} userID = {userID} userList = {userList} userMap = {userMap}/>
            {renderTasks()}
        </div>
    );
}