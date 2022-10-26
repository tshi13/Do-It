import React, {Component} from 'react';
import TaskCard from '../TaskCard';

import '../../styles/GroupTaskBar.css';

export default function GroupTaskBar(props) {
    const tasks = props.tasks ? props.tasks : [];
    const style = props.style ? props.style : {};
    const newHeight = props.newHeight

    const renderTasks = () => {
        if(tasks.length > 0) {
            return (
            <div style = {{height: newHeight}} className = "taskList">
                <h1 style ={{textAlign: 'center'}}>Task List</h1>
                <p style = {{textAlign: 'center'}}>Group Invite ID: {props.inviteID}</p>
                <div className = "scrollWrapper" style = {{height: '85%'}}>
                    <div style ={{alignItems: 'center'}}>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <TaskCard key={index} task={task}/>
                                );
                            }) 
                        }
                    </div>
                </div>
            </div>
            );
        } else {
            return (
                <div style = {{height: newHeight}} className = "taskList">
                    <h1 style ={{textAlign: 'center'}}>Task List</h1>
                    <p style = {{textAlign: 'center'}}>Group Invite ID: {props.inviteID}</p>
                    <div style = {{height: '85%'}}>
                        <h2 style ={{textAlign: 'center'}}>No Tasks</h2>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            {renderTasks()}
        </div>
    );
}