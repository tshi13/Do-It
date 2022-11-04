import {List, Grid, Typography} from '@mui/material';
import TaskCard from './Task/TaskCard';
import {Component} from 'react';
import taskDAO from '../utils/taskDAO';
import { useEffect } from 'react';


export default function DisplayTasks(props){

    const tasks = props.privateTasks;
    const userID = props.userID;
    const deleteTask = props.deleteTask;
    const setCoins = props.setCoins;

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
                            completedList: task.completedList,
                            type: "private",
                            userID: null,
                        }
                        return (
                            <Grid item xs={2.2} key={index}>
                                <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} userID = {userID} owner = {userID} />
                            </Grid>
                        );
                    })
                }
            </Grid>
            
        </>
    );
}
