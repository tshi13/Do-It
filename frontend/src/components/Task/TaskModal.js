import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import groupDAO from '../../utils/groupDAO';
import userDAO from '../../utils/userDAO';
import Autocomplete from '@mui/material/Autocomplete';

import '../../styles/taskModal.css'; 

export default function TaskModal(props) {

    const show = props.show;
    const setShow = props.setShow;
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(-1);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [groupID] = useState(props.groupID);
    const [type, setType] = useState("group");
    const [TaskForUser, setTaskForUser] = useState("Group Task");
    const userID = props.userID;
    const userList = props.userList;
    const userMap = props.userMap;
    const setNotifications = props.setNotifications;

   
    const informUsers = (taskID) => {
      if(type === "group") {
        for (let i = 0; i < userList.length; i++) {
            userDAO.getUserData(userList[i].id).then((user) => {
                let newTask = {
                    taskID: taskID,
                    taskName: taskName,
                    groupID : groupID,
                    createdBy: userID,
                    type: type,
                    messageType: "task",
                    time: time,
                    coinsEntered: coinsEntered,
                }
                user.notifications = user.notifications ? user.notifications : [];
                user.notifications.push(newTask);
                userDAO.updateUser(user._id, user);
                setNotifications(newTask);
            });
        }
      }
      else {
        userDAO.getUserData(TaskForUser.id).then((user) => {
            let newTask = {
              taskID: taskID,
              taskName: taskName,
              groupID : groupID,
              createdBy: userID,
              type: type,
              messageType: "task",
              time: time,
              coinsEntered: coinsEntered,
            } 
            user.notifications = user.notifications ? user.notifications : [];
            user.notifications.push(newTask);
            userDAO.updateUser(user._id, user);
            setNotifications(newTask);
        });
      }
    }


  const handleSubmit = () => {
    // checks if the user inputs are valid and exist
    if(taskName === "" || coinsEntered === 0 || TaskForUser === "" || isNaN(time) || (time < -1)) {
      if(taskName === "") {
        alert("Please enter a task name");
      }
      else if(coinsEntered === 0) {
        alert("Please enter a coin amount");
      }
      else if(TaskForUser === "") {
        alert("Please select a user");
      } 
      else if(isNaN(time) || (time < -1 && time !== -1) ) {
        alert("Please enter a valid number for time");
      }
    } else  {
      // add task to database
      let coinsEnteredInt;
      let taskID;
      let timeInt;
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
      if(isNaN(coinsEnteredInt)) {
        alert("Please enter a valid number for coins");
      }
      if(isNaN(timeInt)) {
        alert("Please enter a valid number for time. Please do not use Decimals.");
      }
       else {
        // add task to database
        userDAO.getUserData(userID).then((userRes) => {
          if(userRes) {
            if(userRes.coins < coinsEnteredInt) {
              alert("You do not have enough coins to enter this task");
            } else {
              let data = {
                userID: taskID,
                taskName: taskName,
                coinsEntered: coinsEnteredInt,
                time: timeInt,
                createdBy: userID,
              }
              groupDAO.addTasks(groupID, data).then((res) => {
                if(res) {
                  if(type !== "group") {  
                    sessionStorage.setItem("coins",  sessionStorage.getItem("coins") - coinsEnteredInt);
                    userDAO.updateUser(userID, {coins: userRes.coins - coinsEnteredInt});
                  }
                  props.taskCallback({_id: res._id, taskName: taskName, coinsEntered: coinsEnteredInt, userID: taskID, completedList: [], groupID: groupID, userList: userList, time: timeInt, checkedDate: new Date(), createdBy: userID});
                  setShow(false);
                  
                  informUsers(res._id);
                  setType("group");       
                }
              });
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
                  options = {userMap ? userMap : []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input type="text" {...params.inputProps} className = "taskBox2" placeholder = "Select User"/>
                    </div>
                  )}
                /> 
                : null}

                  </div>
                  <input type="text" placeholder="Task Name" className = "taskBox" onInput={e => setTaskName(e.target.value)} />
                  <input type="text" placeholder="Task Description" className = "taskBox"  />
                  {userList && type !== "group" ? <input type="text" placeholder="Coins For Completition"  className = "taskBox"  onInput={e => setCoinsEntered(e.target.value)}/>
                  : <input type="text" placeholder="Coins To Join Task"  className = "taskBox"  onInput={e => setCoinsEntered(e.target.value)}/>}
                  {type === "group" ? 
                  <div>
                    <input type="text" placeholder="Days Between Task Reset" className = "taskBox" onInput={e => setTimeForTask(e.target.value)}/>
                    <h1 style = {{color: 'red', fontSize: '12px'}}>Note: If you do not enter a number for days between task reset, the task will not reset. Furthermore, the tasks reset occurs at Midnight.</h1>
                  </div>
                  :
                  <div> 
                    <input type="text" placeholder="Days For Task Completition" className = "taskBox" onInput={e => setTimeForTask(e.target.value)}/>
                    <h1 style = {{color: 'red', fontSize: '12px'}}>Note: If you do not enter a number for days for completition, the task will not be automatically checked. Furthermore, the tasks checks occurs at Midnight.</h1>
                  </div>
                  }

                 
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
