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
                <div className = "scrollWrapper">
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
        }
    }

    return (
        <div>
            {renderTasks()}
        </div>
    );
}