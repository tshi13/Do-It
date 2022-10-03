import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Home from '../containers/Home';

export default function TaskModal() {
    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);

  // state of input form
//   state = {
//     taskName: "",
//     taskName: "",
//     coinsEntered: 0,
//   }

  const handleClose = () => {
    setShow(false);
    this.props.addTask();
  }
  const handleShow = () => setShow(true);


  // onChange handlers for when the user
  // updates the text field
  // to update the state
//   const setTaskName = (taskName) => {
//     this.setState({
//         taskName: taskName
//     });
//   }
//   const setCoinsEntered = (coinsEntered) => {
//     this.setState({
//         coinsEntered: coinsEntered
//     });
//   }
//   const setTimeForTask = (time) => {
//     this.setState({
//         time: time
//     });
//   }

  
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
            <form onSubmit={this.props.addTask(taskName, time, coinsEntered)}>
                <div className="form-group">
                    <input type="text" placeholder="Task Name" style ={styleSheet.inputStyle} onChange={e => setTaskName(e.target.value)} />
                    <input type="text" placeholder="Task Description" style ={styleSheet.inputStyle} />
                    <input type="text" placeholder="Coins Per Task"  style ={styleSheet.inputStyle} onChange={e => setCoinsEntered(e.target.value)}/>
                    <input type="text" placeholder="Task Due Date" style ={styleSheet.inputStyle} onChange={e => setTimeForTask(e.target.value)} />
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
