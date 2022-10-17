import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import GroupModal from './GroupModal';

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            variant: false,
            style: props.style,
            userID: props.userID,
        };
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

    handleCardClose = (show) => {
        this.setState({show: false})
    }



    render() {
        return (
            <div style = {this.state.style}>
                <Button className = "buttonDesign" size = "lg" onClick={() => {this.handleShow();}} >
                    Create Group
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <div>
                        <Modal.Body style = {{height: '500px'}} className = "scrollWrapper">
                            <span style = {{width: '100%'}}>
                                <GroupModal userID = {this.state.userID} close = {this.handleCardClose} groupsChange = {this.props.groupsChange} setGroupsChange = {this.props.setGroupsChange}/>
                            </span>                     
                        </Modal.Body>
                    </div>
                </Modal>
            </div>
        );
    }
};