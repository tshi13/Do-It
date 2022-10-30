import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
export default function ConfirmBox(props) {
let {title, message, onConfirm, onCancel} = props;
const show = props.show;
    return (
        <Modal show={show} onHide={() => {onCancel();}} style = {{width: '100%'}}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => {onConfirm(); }}>Confirm</button>
                <button className="btn btn-secondary" onClick={() => {onCancel(); }}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}