import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import groupDAO from '../../utils/groupDAO';
import userDAO from '../../utils/userDAO';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import '../../styles/taskModal.css'; 

export default function TaskModal(props) {

    const show = props.show;
    const setShow = props.setShow;
    const [taskName, setTaskName] = useState("");
    const [time, setTimeForTask] = useState(-1);
    const [coinsEntered, setCoinsEntered] = useState(0);
    const [groupID] = useState(props.groupID);
    const [type, setType] = useState("group");
    const [TaskForUser, setTaskForUser] = useState("");
    const userID = props.userID;
    const userList = props.userList;
    const userMap = props.userMap;
    const setNotifications = props.setNotifications;

   
    const informUsers = (taskID) => {
      groupDAO.getGroup(groupID).then((group) => {
        if(group) {
          userDAO.getUserData(userID).then((creator) => {
            if(creator) {
              if(type === "group") {
                let newNotification = {
                  message: '<b>' + creator.name + '</b> created a new task in <b>' + group.groupName + '</b>' + ' called <b>' + taskName + '</b>' + ' with a time limit of <b>' + time + '</b> days'  + ' and a reward of <b>' + coinsEntered + '</b> coins',
                  messageType: "task",
                  type: "group",
                  groupID: groupID,
                  taskID: taskID,
                  createdBy: userID,
                  title: "New Task Created",
                  subtitle: "A Group Task has been created in " + group.groupName,
                  date: new Date(),
                }
                group.idList.forEach((user) => {
                  userDAO.getUserData(user).then((user) => {
                    if(user) {
                      user.notifications.push(newNotification);
                      userDAO.updateUser(user._id, user);
                    }
                  });
                });
              } else {
                let newNotification = {
                  message: '<b>' + creator.name + '</b> has challenged you to a task called <b>' + taskName + '</b>' + ' with a time limit of <b>' + time + '</b> days'  + ' and a reward of <b>' + coinsEntered + '</b> coins',
                  messageType: "task",
                  type: "challenge",
                  groupID: groupID,
                  taskID: taskID,
                  createdBy: userID,
                  title: "Challenge Task Created",
                  subtitle: "A Task has been created for you by " + creator.name,
                  date: new Date(),
                }
                userDAO.getUserData(TaskForUser.id).then((user) => {
                  if(user) {
                    user.notifications.push(newNotification);
                    userDAO.updateUser(user._id, user);
                  }
                });
              }
            }
          });
        }
      });
    }


  const handleSubmit = () => {
    // checks if the user inputs are valid and exist
    if(taskName === "" || coinsEntered === 0 || (TaskForUser === "" && type !== "group") || isNaN(time) || (time < -1)) {
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
             {
              let data = {
                userID: taskID,
                taskName: taskName,
                coinsEntered: coinsEnteredInt,
                time: timeInt,
                createdBy: userID,
              }
              if(type === "group") {
                groupDAO.addTasks(groupID, data).then((res) => {
                  if(res) {
                    props.taskCallback({_id: res._id, taskName: taskName, coinsEntered: coinsEnteredInt, userID: taskID, completedList: [], groupID: groupID, userList: userList, time: timeInt, checkedDate: new Date(), createdBy: userID});
                    setShow(false);  
                    informUsers(res._id);
                    setType("group");       
                  }
                });
              } else {
                if(userRes.coins < coinsEnteredInt) {
                  alert("You do not have enough coins to create this task");
                } else {
                  data.joinedList = [];
                  data.joinedList.push(userID);
                  data.coinPool = coinsEnteredInt;
                  groupDAO.addTasks(groupID, data).then((res) => {
                    if(res) {
                      props.taskCallback({_id: res._id, taskName: taskName, coinsEntered: coinsEnteredInt, userID: taskID, completedList: [], groupID: groupID, userList: userList, time: timeInt, checkedDate: new Date(), createdBy: userID, joinedList: data.joinedList, coinPool: coinsEnteredInt});
                      setShow(false);  
                      informUsers(res._id);
                      setType("group");
                      let newCoins = userRes.coins - coinsEnteredInt;
                      userDAO.updateUser(userID, {coins: newCoins});
                    }
                  });
              } 
            }
          }
      }
    });
  }}}
  

  const flipModal = () => {
    let personal = document.getElementById("individual");
    let autoPersonal = document.getElementById("individualAuto");
    let group = document.getElementById("group");
    if(type !== "group") {
      personal.classList.add("on");
      group.classList.remove("on");
      autoPersonal.style.display = "none";
      setType("group");
      setTaskForUser("");
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
          <Modal.Title><h1 className='class_title'>Add Task</h1></Modal.Title>
          <div id="switch" onClick ={() => {flipModal()}} style ={{width: '60%', marginLeft: '5%'}}>
            <div className="choice on" id ="individual"><h1 className='sub_title'>Individual</h1></div>
            <div className="choice" id = "group"><h1 className='sub_title'>Group</h1></div>
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
                      <input type="text" {...params.inputProps} className = "taskBox2" placeholder = "   Select User"/>
                    </div>
                  )}
                /> 
                : null}

                  </div>
                  <div style={{marginBottom: "8%"}}>
                  {/* <TextField type="text" id="filled-basic" label="Group Name" inputProps={ariaLabel} */}
                  <TextField type="text" label="Task Name"  className = "taskBox" onInput={e => setTaskName(e.target.value)} />
                  </div>
                  <div style={{marginBottom: "8%"}}>
                  <TextField type="text" label="Task Description" className = "taskBox"/>
                  </div>
                  <div style={{marginBottom: "8%"}}>
                  {userList && type !== "group" ? <TextField type="text" label="Coins For Completition" className = "taskBox"  onInput={e => setCoinsEntered(e.target.value)}/>
                  : <TextField type="text" label="Coins To Join Task"  className = "taskBox"  onInput={e => setCoinsEntered(e.target.value)}/>}
                  </div>
                  {type === "group" ? 
                  <div style={{marginBottom: "8%"}}>
                    <TextField type="text" label="Days Between Task Reset" className = "taskBox" onInput={e => setTimeForTask(e.target.value)}/>
                    <h1 style = {{color: 'red', fontSize: '12px', marginTop: "8%"}}>Note: If you do not enter a number for days between task reset, the task will not reset. Furthermore, the tasks reset occurs at Midnight.</h1>
                  </div>
                  :
                  <div style={{marginBottom: "5%"}}> 
                    <TextField type="text" label="Days For Task Completition" className = "taskBox" onInput={e => setTimeForTask(e.target.value)}/>
                    <h1 style = {{color: 'red', fontSize: '12px', marginTop: "8%"}}>Note: If you do not enter a number for days for completition, the task will not be automatically checked. Furthermore, the tasks checks occurs at Midnight.</h1>
                  </div>
                  }

                 
              </div>
              <div style ={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
              <Button variant="primary" className='button-63' type="button" onClick={handleSubmit}>Confirm</Button>
              <Button variant="secondary" className='button-64' onClick={() => {setShow(false)}}>
                  Close
              </Button>
              </div>
          </form>
          </Modal.Body>
      </Modal>
    </div>
  );
}
