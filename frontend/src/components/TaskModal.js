import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import groupDAO from '../utils/groupDAO';
import userDAO from '../utils/userDAO';

import '../styles/taskModal.css'; 

export default function TaskModal(props) {


    const show = props.show;
    const setShow = props.setShow;
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [groupID] = useState(props.groupID);
    const [type, setType] = useState("group");
    const userID = props.userID;

    
    
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

        userDAO.getUserData(userID).then((res) => {
          if(res.data) {
            if(res.data.coins < coinsEnteredInt) {
              alert("You do not have enough coins to enter this task");
            } else {
              let data = {
                userID: props.userID,
                taskName: taskName,
                time: timeInt,
                coinsEntered: coinsEnteredInt,
              }

              groupDAO.addTasks(groupID, data);
              userDAO.updateUser(userID, {coins: res.data.coins - coinsEnteredInt});
              setCoinsEntered(0);
              setTimeForTask(0);
              setTaskName("");
              setShow(false);
              props.taskCallback({taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt});
            }
          }
        });
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

  const flipModal = () => {
    let personal = document.getElementById("individual");
    let group = document.getElementById("group");
    if(type === "group") {
      personal.classList.add("on");
      group.classList.remove("on");

      setType("personal");

    } else {
      personal.classList.remove("on");
      group.classList.add("on");
      setType("group");
    }
  }

   // JSX code for taskModal form
  return (
    <div style ={props.style}>
      <Modal
          show={show}
          onHide={() => {setShow(false)}}
          backdrop="static"
          keyboard={false}
          style = {{width: '100%', top: '25%',}}
      >
          <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
          <div id="switch" onClick ={() => {flipModal()}} style ={{width: '60%', marginLeft: '5%'}}>
            <div className="choice on" id ="individual">Individual</div>
            <div className="choice" id = "group">Group</div>
          </div>
          
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
              <Button variant="secondary" onClick={() => {setShow(false)}}>
                  Close
              </Button>
          </form>
          </Modal.Body>
      </Modal>
    </div>
  );
}
