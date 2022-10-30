import React, {useEffect, useState} from 'react';
import TaskCard from '../Task/TaskCard';
import TaskModal from '../Task/TaskModal';
import GroupSettings from './GroupSettings';

import '../../styles/GroupTaskBar.css';

export default function GroupTaskBar(props) {
    const tasks = props.tasks ? props.tasks : [];
    const style = props.style ? props.style : {};
    const newHeight = props.newHeight;
    const userID = props.userID;
    const userList = props.userList;
    const [sorted, setSorted] = useState(false);

    const firstPartOfURL = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

    const [showTaskModal, setShowTaskModal] = useState(false);

    const [individualTask, setIndividualTask] = useState({});
    const [groupTask, setGroupTask] = useState({});


    const leaveGroup = () => {
        props.leaveGroupCallback(props.groupID, userID);
    }

    const taskCallback = (task) => {
        props.taskCallback(task);
    }
    

    useEffect(() => {
        let individualTask = [];
        let groupTask = [];
        tasks.map((item, index) => {
            if(item.userID !== "Group Task") {
                individualTask.push(item);
            } else {
                groupTask.push(item);
            }
        });
        setIndividualTask(individualTask);
        setGroupTask(groupTask);
        setSorted(true);
        
    
    }, [tasks]);
            
            
    
    const renderTasks = () => {
        if(tasks.length > 0 && sorted ) {
            return (
            <div style = {{height: newHeight}} className = "taskList">
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
                                     let taskData = {
                                        id: item._id,
                                        taskName: item.taskName,
                                        coinsEntered: item.coinsEntered,
                                        time: item.time,
                                        id: item._id,
                                        completed: item.completed,
                                        type: "group",
                                        userID: userID,
                                        completedList: item.completedList,
                                        groupSize: userList.length,
                                    }
                                    return (
                                        <TaskCard task = {taskData} key = {index} taskCallback = {taskCallback} />
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
                                    let taskData = {
                                        id: item._id,
                                        taskName: item.taskName,
                                        coinsEntered: item.coinsEntered,
                                        time: item.time,
                                        id: item._id,
                                        completed: item.completed,
                                        type: "groupIndividual",
                                        userID: userID,
                                        completedList: item.completedList,
                                        groupSize: userList.length,
                                    }
                                    return (
                                        <TaskCard task = {taskData} key = {index} taskCallback = {taskCallback} />
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
                    <GroupSettings leaveGroup = {leaveGroup} setShow = {setShowTaskModal} />
                    <h1 style ={{textAlign: 'center'}}>Task List</h1>
                    <p style = {{textAlign: 'center'}}>Group Invite: {props.inviteID}</p>
                    <button className = "button" onClick = {() => {navigator.clipboard.writeText(firstPartOfURL +"/invite/ID=" + props.inviteID)}}>Copy Invite Link To Clipboard</button>
                    <div style = {{height: '65%'}}>
                        <h2 style ={{textAlign: 'center'}}>No Tasks</h2>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <TaskModal style ={{float: 'right', marginRight: '1%', marginLeft: '2%', zIndex: "5000"}} show = {showTaskModal} setShow = {setShowTaskModal} groupID = {props.groupID} taskCallback = {taskCallback} userID = {userID} userList = {userList}/>
            {renderTasks()}
        </div>
    );
}