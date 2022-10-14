import {List} from '@mui/material';
import TaskCard from '../components/taskCard';
import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import TaskModal from "../components/TaskModal";
import BasicCard from "../components/taskCard";
import Database from '../utils/database';
import {Grid} from '@mui/material';

import  '../styles/chatBox.css';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

export default class DisplayTasks extends Component {
    // const { tasks } = this.props;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: "",
            messages: [],
            variant:  false,
            tasks: [],
            style: props.style,
            userID: props.userID,
            groupID: props.groupID,
        };
        this.getTasks();
    }

    handleClose = () => this.setState({show: false, variant: false});

    handleShow = () => {this.setState({show: true, variant: true});};

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({messages: [...this.state.messages, this.state.message]});
        this.setState({message: ""});
    }

    getTasks = () => {
        Database.getData('tasks', {userID: this.state.userID})
            .then((response) => {
                this.setState({tasks: response});
            })
    }

    render() {
        return (
            <>
                {/* <List style={ flexContainer }>
                    {tasks.map((task, index) => {
                        return <TaskCard task = {task} key = {index}/>
                    })}
                </List> */}
                <h3>
                    My Tasks
                </h3>
                <Grid container spacing={1}>
                    {
                        this.state.tasks.map((task, index) => {
                            return (
                                <Grid item xs={2}>
                                    <BasicCard key={index} task={task}/>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                
            </>
        );
    }
}