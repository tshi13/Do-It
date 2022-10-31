import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';

export default function MessageBox(props) {
    let {title, message, onConfirm} = props;
    const show = props.show;
    return (
        <Modal show={show} onHide={() => {onConfirm();}} style = {{width: '100%'}}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => {onConfirm(); }}>Confirm</button>
            </Modal.Footer>
        </Modal>
    )
}
    
