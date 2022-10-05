import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import TaskModal from "../components/TaskModal";
import BasicCard from "../components/taskCard";


export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: "",
            messages: [],
            variant:  false,
            tasks: props.tasks,
            style: props.style,
        };
    }

    handleClose = () => this.setState({show: false, variant: false});

    handleShow = () => this.setState({show: true, variant: true});

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({messages: [...this.state.messages, this.state.message]});
        this.setState({message: ""});
    }

    render() {
        return (
            <div style = {this.state.style}>
                <Button variant = {this.state.variant ? "primary" : "outline-primary"} size = "lg" onClick={this.handleShow} style ={{backgroundColor: this.props.color}}>
                    Group Chat
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title style ={{color: 'lightblue'}}>Chat</Modal.Title>
    
                        </Modal.Header>
                        <Modal.Body style = {{height: '500px'}}>
                            <span style = {{width: '100%'}}>
                                <TaskModal />
                            </span>
                            {this.state.messages.map((message, index) => {
                                return (
                                    <p style = {{color: 'blue'}} key={index}>{message}</p>
                                );
                            })}
                            {
                                this.state.tasks.map((task, index) => {
                                    return (
                                        <BasicCard key={index} task={task}/>
                                    );
                                })
                            }
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Form onSubmit={this.handleSubmit} style ={{width: '100%'}}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter message" value={this.state.message} onChange={this.handleChange}/>
                                </Form.Group>
                            </Form>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        );
    }
}