import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import GroupModal from './GroupModal';
import "../styles/GroupList.css"

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            style: props.style,
            userID: props.userID,
        };
    }

    handleClose = () => this.setState({show: false, variant: false});

    handleShow = () => {this.setState({show: true, variant: true});};


    handleCardClose = (show) => {
        this.setState({show: false})
    }

    render() {
        return (
            <div style = {this.state.style}>
                <button className = "buttonDesign" size = "lg" onClick={() => {this.handleShow();}}  style ={{marginTop: '5%'}}>
                    Create Group
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <div>
                        <Modal.Body className = "scrollWrapper">
                            <span style = {{width: '100%'}}>
                                <GroupModal userID = {this.state.userID} close = {this.handleCardClose} groupCallback = {this.props.groupCallback} createGroup = "true" />
                            </span>                     
                        </Modal.Body>
                    </div>
                </Modal>
            </div>
        );
    }
};