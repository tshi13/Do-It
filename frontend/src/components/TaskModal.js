import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function TaskModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const styleSheet = {
    circle: {
        borderRadius: '50%',
        float: 'right',
    
    },
    inputStyle: {
        width: '100%',
        height: '30px',
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        border: 'none',
        marginBottom: '5%',
    },
  }

  return (
    <div>
        <Button variant="primary" onClick={handleShow} style ={styleSheet.circle}>
            +
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className="form-group">
                    <input type="text" placeholder="Task Name" style ={styleSheet.inputStyle} />
                    <input type="text" placeholder="Task Description" style ={styleSheet.inputStyle} />
                    <input type="text" placeholder="Coins Per Task"  style ={styleSheet.inputStyle}/>
                    <input type="text" placeholder="Task Due Date" style ={styleSheet.inputStyle} />
                </div>

            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Confirm</Button>
            </Modal.Footer>
        </Modal>
      </div>
  );
}
