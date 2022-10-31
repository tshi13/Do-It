import {List, Grid, Typography} from '@mui/material';
import TaskCard from './TaskCard';
import {Component} from 'react';
import taskDAO from '../utils/taskDAO';
import { useEffect } from 'react';


export default function DisplayTasks(props){

    const tasks = props.privateTasks;

    return (
        <>
            <Typography variant="h5" component="div" style={{"color": 'black', "margin": '2vw'}}>
                My Tasks
            </Typography>
            <Grid container spacing={1}>
                {
                    tasks.map((task, index) => {
                        let taskData = {
                            taskName: task.taskName,
                            coinsEntered: task.coinsEntered,
                            time: task.time,
                            id: task._id,
                            completed: task.completed,
                            type: "private",
                            userID: props.userID,
                        }
                        return (
                            <Grid item xs={2.2} key={index}>
                                <TaskCard key={index} task={taskData}/>
                            </Grid>
                        );
                    })
                }
            </Grid>
            
        </>
    );
}
