import React, {Component} from 'react';
import TaskCard from '../TaskCard';

import '../../styles/GroupTaskBar.css';

export default function GroupTaskBar(props) {
    const tasks = props.tasks ? props.tasks : [];
    const style = props.style ? props.style : {};

    const renderTasks = () => {
        if(tasks.length > 0) {
            return (
                
                <div style = {style} className = "taskList">

                    <div className = "scrollWrapper" style ={{height: '83%'}}>
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
        renderTasks()
    );
}