import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import GroupModal from './GroupModal';
import "../../styles/GroupList.css"


export default function CreateGroup(props) {

    const[show, setShow] = useState(false)
    const style = props.style
    const userID = props.userID

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)


    const handleCardClose = () => {
        setShow(false)
    }

    return (
        <div style = {style}>
            <button className = "buttonDesign" size = "lg" onClick={() => {handleShow()}} >
                Create Group
            </button>
            <Modal show={show} onHide={handleClose}>
                <div>
                    <Modal.Body className = "scrollWrapper">
                        <span style = {{width: '100%'}}>
                            <GroupModal userID = {userID} close = {handleCardClose} groupCallback = {props.groupCallback} createGroup = "true" />
                        </span>                     
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
};

