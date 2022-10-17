import {List, Grid, Typography} from '@mui/material';
import TaskCard from '../components/TaskCard';
import {Component} from 'react';
import taskDAO from '../utils/taskDAO';
import { useEffect } from 'react';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

export default function DisplayTasks{
    // const { tasks } = this.props;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: "",
            messages: [],
            variant:  false,
            tasks: props.privateTasks,
            style: props.style,
            userID: props.userID,
            groupID: props.groupID,
        };		
    }

    componentDidMount () {
        // this.getTasks = this.getTasks.bind(this);
        this.props.getTasks();
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({messages: [...this.state.messages, this.state.message]});
        this.setState({message: ""});
    }

	

    // getTasks = () => {
    //     taskDAO.getTasks({userID: this.state.userID})
    //         .then((response) => {
    //             this.setState({tasks: response});
    //         })
    // }

    render() {
        return (
            <>
                {/* <List style={ flexContainer }>
                    {tasks.map((task, index) => {
                        return <TaskCard task = {task} key = {index}/>
                    })}
                </List> */}
                <Typography variant="h5" component="div" style={{"color": 'black', "margin": '2vw'}}>
                    My Tasks
                </Typography>
                <Grid container spacing={1}>
                    {
                        this.props.privateTasks.map((task, index) => {
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
}