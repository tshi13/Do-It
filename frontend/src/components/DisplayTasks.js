import {List, Grid, Typography} from '@mui/material';
import TaskCard from './TaskCard';
import {Component} from 'react';
import taskDAO from '../utils/taskDAO';
import { useEffect } from 'react';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

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
                        return (
                            <Grid item xs={2.2} key={index}>
                                <TaskCard key={index} task={task}/>
                            </Grid>
                        );
                    })
                }
            </Grid>
            
        </>
    );
}
