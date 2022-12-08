import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userDAO from '../../utils/userDAO';
import TextField from '@mui/material/TextField';

import '../../styles/taskModal.css';

export default function TaskModalUser(props) {

    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [userID] = useState(props.userID);


    useEffect(() => {
      if (props.showPersonalTaskModal) {
        setShow(true);
      }
      else {
        setShow(false);
      }
  }, []);

  const handleClose = () => {
    setShow(false);
    props.setShowPersonalTaskModal();
  }
  const handleShow = () => {
    setShow(true);
  }
  const handleSubmit = () => {
    // checks if the user inputs are valid and exist
    if(taskName === "" || coinsEntered === 0 || isNaN(time) || (time < -1)) {
      if(taskName === "") {
        alert("Please enter a task name");
      }
      else if(coinsEntered === 0) {
        alert("Please enter a coin amount");
      }
      else if(isNaN(time) || (time < -1 && time !== -1) ) {
        alert("Please enter a valid number for time");
      }
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
      if(isNaN(coinsEnteredInt)) {
        alert("Please enter a valid number for coins");
      }
      if(isNaN(timeInt)) {
        alert("Please enter a valid number for time. Please do not use Decimals.");
      }
       else {
        // add task to database
        userDAO.getUserData(userID).then((userData) => {
          if(userData) {
            if(userData.coins < coinsEnteredInt) {
              alert("You do not have enough coins to enter this task");
            } else {
              let data = {
                userID: userID,
                taskName: taskName,
                time: timeInt,
                coinsEntered: coinsEnteredInt,
              }
              userDAO.addTasks(userID, data).then((res) => {
                if(res) {
                  userDAO.updateUser(userID, {coins: userData.coins - coinsEnteredInt});
                  sessionStorage.setItem("coins",  sessionStorage.getItem("coins") - coinsEnteredInt);
                  setShow(false);
                  props.taskCallback({_id: res._id, taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt, userID: userID, completed: false, completedList: [],  checkedDate: new Date()});
                  } else {
                  alert("Error adding task");
                }
              });
            }
          }
        });
        }
      }
      handleClose();
    }

 

   // JSX code for taskModal form
  return (
    <div style ={props.style}>
      

        <Modal
            show={props.showPersonalTaskModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style = {{width: '100%', top: '25%',}}
        >
            <Modal.Header closeButton>
            <Modal.Title><h1 className='class_title'>Add Task</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div style={{marginBottom: "8%"}}> 
                      <TextField type="text" label="Task Name" className = "taskBox" onInput={e => setTaskName(e.target.value)} />
                    </div>
                    <div style={{marginBottom: "8%"}}> 
                      <TextField type="text" label="Task Description" className = "taskBox" />
                    </div>
                    <div style={{marginBottom: "8%"}}> 
                      <TextField type="text" label="Coins For Task"  className = "taskBox" onInput={e => setCoinsEntered(e.target.value)}/>
                    </div>
                    <div> 
                    <TextField type="text" label="Days For Task Completition" className = "taskBox" onInput={e => setTimeForTask(e.target.value)}/>
                      <h1 style = {{color: 'red', fontSize: '12px', marginTop: "8%"}}>Note: If you do not enter a number for days for completition, the task will not be automatically checked. Furthermore, the tasks checks occurs at Midnight.</h1>
                  </div>
                </div>
                <div style ={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
                <Button variant="primary" className='button-63' type="button" onClick={handleSubmit}>Confirm</Button>
                <Button variant="secondary" className='button-64' onClick={handleClose}>
                    Close
                </Button>
                </div>
            </form>
            </Modal.Body>
        </Modal>
      </div>
  );
}
