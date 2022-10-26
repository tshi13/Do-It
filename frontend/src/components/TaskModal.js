import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import groupDAO from '../utils/groupDAO';
import userDAO from '../utils/userDAO';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import '../styles/taskModal.css'; 

export default function TaskModal(props) {


    const show = props.show;
    const setShow = props.setShow;
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(0);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [groupID] = useState(props.groupID);
    const [type, setType] = useState("group");
    const [TaskForUser, setTaskForUser] = useState("");
    const userID = props.userID;
    const userList = props.userList;


    console.log(TaskForUser);

  const handleSubmit = () => {
    // preventDefault();

    // checks if the user inputs are valid and exist
    if(taskName === "" || time === 0 || coinsEntered === 0 || TaskForUser === "") {
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

          if(res) {
            if(res.coins < coinsEnteredInt) {
              alert("You do not have enough coins to enter this task");
            } else {
              let data = {
                userID: TaskForUser,
                taskName: taskName,
                time: timeInt,
                coinsEntered: coinsEnteredInt,
              }
              groupDAO.addTasks(groupID, data);
              userDAO.updateUser(userID, {coins: res.coins - coinsEnteredInt});
              setCoinsEntered(0);
              setTimeForTask(0);
              setTaskName("");
              setShow(false);
              props.taskCallback({taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt, userID: TaskForUser});
            }
          }
        });
      }
    }
  }
  

  const flipModal = () => {
    let personal = document.getElementById("individual");
    let autoPersonal = document.getElementById("individualAuto");
    let group = document.getElementById("group");
    if(type === "group") {
      personal.classList.add("on");
      group.classList.remove("on");
      autoPersonal.style.display = "none";
      setType("personal");
      setTaskForUser("Group Task");
    } else {
      autoPersonal.style.display = "block";
      personal.classList.remove("on");
      group.classList.add("on");
      setType("group");
      setTaskForUser("")
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
                <div id = "individualAuto" style ={{display: 'none', marginBottom: '2%'}}>
                <Autocomplete
                  sx={{
                    display: 'inline-block',
                    '& input': {
                      width: 200,
                      bgcolor: 'background.paper',
                      color: (theme) =>
                        theme.palette.getContrastText(theme.palette.background.paper),
                    },
                  }}
                  id="custom-input-demo"
                  options={}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input type="text" {...params.inputProps} />
                    </div>
                  )}
                />
                  </div>
                  <input type="text" placeholder="Task Name" className = "taskBox" onInput={e => setTaskName(e.target.value)} />
                  <input type="text" placeholder="Task Description" className = "taskBox"  />
                  <input type="text" placeholder="Coins Per Task"  className = "taskBox"  onInput={e => setCoinsEntered(e.target.value)}/>
                  <input type="text" placeholder="Task Due Date" className = "taskBox"  onInput={e => setTimeForTask(e.target.value)} />
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
