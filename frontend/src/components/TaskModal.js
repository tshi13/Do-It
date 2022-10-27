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
    const [TaskForUser, setTaskForUser] = useState("Group Task");
    const userID = props.userID;
    const userList = props.userList;


  const handleSubmit = () => {
    // checks if the user inputs are valid and exist
    if(taskName === "" || time === 0 || coinsEntered === 0 || TaskForUser === "") {
      if(taskName === "") {
        alert("Please enter a task name");
      } else if(time === 0) {
        alert("Please enter a time");
      }
      else if(coinsEntered === 0) {
        alert("Please enter a coin amount");
      }
      else if(TaskForUser === "") {
        alert("Please select a user");
      }
    } else  {
      // add task to database
      let coinsEnteredInt;
      let timeInt;
      let taskID;
      try { // try to convert the input to an integer and catch any errors that may occur
        coinsEnteredInt = parseInt(coinsEntered);
        timeInt = parseInt(time);
        if(type !== "group") {
          taskID = TaskForUser.id;
        } else {
          taskID = "Group Task";
        }
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
                userID: taskID,
                taskName: taskName,
                time: timeInt,
                coinsEntered: coinsEnteredInt,
              }
              groupDAO.addTasks(groupID, data);
              userDAO.updateUser(userID, {coins: res.coins - coinsEnteredInt});
              setShow(false);
              setType("group");
              props.taskCallback({_id: res._id, taskName: taskName, time: timeInt, coinsEntered: coinsEnteredInt, userID: TaskForUser, completed: false, completedList: [], groupID: groupID, userList: userList});
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
    if(type !== "group") {
      personal.classList.add("on");
      group.classList.remove("on");
      autoPersonal.style.display = "none";
      setType("group");
      setTaskForUser("Group Task");
    } else {
      autoPersonal.style.display = "block";
      personal.classList.remove("on");
      group.classList.add("on");
      setType("personal");
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
                { userList && type !== "group" ?
                  <Autocomplete 
                  onChange={(event, value) => {setTaskForUser(value)}}
                  options = {userList}
                  getOptionLabel={(userList) => userList.name}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input type="text" {...params.inputProps} className = "taskBox2" placeholder = "Select User"/>
                    </div>
                  )}
                /> : null}

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
