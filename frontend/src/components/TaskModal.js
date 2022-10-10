import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Database from '../utils/database';

export default function TaskModal(props) {

    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    // preventDefault();

    // checks if the user inputs are valid and exist
    if(taskName === "" || time === 0 || coinsEntered === 0) {
      alert("Please fill out all fields");
    } else  {
      // add task to database
      let coinsEnteredInt;
      let timeInt;
      try { // try to convert the input to an integer and catch any errors that may occur
        coinsEnteredInt = parseInt(coinsEntered);
        timeInt = parseInt(time);
      } catch (err) {
        alert("Please enter a valid number for time and coins");
      }
      Database.addData('tasks', {userID: props.userID, groupID: props.groupID, taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt});
      setState({taskName: "", time: 0, coinsEntered: 0});
      setShow(false);
    }
  }
  
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

   // JSX code for taskModal form
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Task Name" style ={styleSheet.inputStyle} onInput={e => setTaskName(e.target.value)} />
                    <input type="text" placeholder="Task Description" style ={styleSheet.inputStyle} />
                    <input type="text" placeholder="Coins Per Task"  style ={styleSheet.inputStyle} onInput={e => setCoinsEntered(e.target.value)}/>
                    <input type="text" placeholder="Task Due Date" style ={styleSheet.inputStyle} onInput={e => setTimeForTask(e.target.value)} />
                </div>
                
                <Button variant="primary" type="button" onClick={handleSubmit}>Confirm</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </form>
            </Modal.Body>
            <Modal.Footer>
                
                
            </Modal.Footer>
        </Modal>
      </div>
  );
}
