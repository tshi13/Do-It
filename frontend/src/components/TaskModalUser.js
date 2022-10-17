import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userDAO from '../utils/userDAO';

export default function TaskModalUser(props) {

    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [userID] = useState(props.userID);


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
      if(isNaN(coinsEnteredInt) || isNaN(timeInt)) {
        alert("Please enter a valid number for time and coins");
      } else {
        // add task to database

        let data = {
          userID: props.userID,
          taskName: taskName,
          time: timeInt,
          coinsEntered: coinsEnteredInt,
        }

        userDAO.addTasks(userID, data).then(data => console.log(data));
        setCoinsEntered(0);
        setTimeForTask(0);
        setTaskName("");
        setShow(false);
        // props.taskCallback({taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt});
        this.props.getTasks();
      }
    }
  }
  
  const styleSheet = {
    circle: {
        borderRadius: '50%',
        float: 'center',
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
    <div style ={props.style}>
      <div className ="parent" style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div>
            <p style ={{marginBottom: '1%'}}>Create a task</p>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow} style ={styleSheet.circle}>
                +
            </Button>
          </div> 
        </div>


        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style = {{width: '100%', top: '25%',}}
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
        </Modal>
      </div>
  );
}
