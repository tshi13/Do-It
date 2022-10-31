import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import groupDao from "../utils/groupDAO";
import '../styles/AnimatedGroupCard.css';
import {Buffer} from 'buffer';
import userDAO from '../utils/userDAO';
import PromptBox from './PromptBox';
import ConfirmBox from './ConfirmBox';
import MessageBox from './MessageBox';
import chatDAO from '../utils/chatDAO';



export default function AnimatedGroupCard(props) {
  const { item, userID, username, groupID, groupName } = props;
  const groupPicture = item.groupPicture ? Buffer.from(item.groupPicture).toString('base64'): null;
  const [groupTypeText, setgroupTypeText] = useState("");
  const [groupStatus, setGroupStatus] = useState("");
  const [groupType, setGroupType] = useState(item.typeOfGroup);
  const [joined, setJoined] = useState(false);

  const [showPrompt, setShowPrompt] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const style = props.style ? props.style : {};

  


  useEffect(() => {
    let type = item.typeOfGroup ? item.typeOfGroup : "public";
    let status = item.groupStatus ? item.groupStatus : "open";

    if(status == "open") {
      setGroupStatus("Open");
      if(type == "public") {
        setgroupTypeText("Public");
      } else if(type == "password") {
        setgroupTypeText("Password Protected");
      } else if(type == "cost") {
        setgroupTypeText("Cost To Join: " + item.costToJoin);
      }
    } else if(status == "closed") {
      setGroupStatus("Closed");
    } else {
      setGroupStatus("Unknown");
    }
  
  }, []);

  const handleJoinGroup = (input) => {
    const data = {
      userID: userID,
      groupID: item._id,
    }
    if(groupType == "public") {
      groupDao.addToGroup(data);
      console.log(item);
      chatDAO.moderatorAddUser(userID, sessionStorage.getItem("user"), item._id, item.groupName);
      setJoined(true);
    } else 
    if(groupType == "cost") {
      userDAO.getUserData(userID).then((res) => {
        if(res.coins >= item.costToJoin) {
          groupDao.addToGroup(data);
          setJoined(true);
        } else {
          setTitle("Insufficient Funds");
          setMessage("You do not have enough funds to join this group. Please add funds to your account and try again.");
          setShowMessage(true);
        }
      })        
    } else if(groupType == "password") {
      if(input == item.password) {
        groupDao.addToGroup(data);
        setJoined(true);
      } else {
        setMessage("Incorrect Password");
        setTitle("Error");
        setShowMessage(true);
      }
    }
    setShowPrompt(false);
    setShowConfirm(false);
  }

  const handleClose = () => {
    setShowPrompt(false);
    setShowConfirm(false);
    setShowMessage(false);
  }



  const handleSubmit = () => {
      if(groupType == "public") {
        setMessage("Are you sure you want to join this group?");
        setTitle("Join Group");
        setShowConfirm(true);
      } else if(groupType == "password") {
        setMessage("Please enter the password for this group");
        setTitle("Password Protected Group");
        setShowPrompt(true);
      } else if(groupType == "cost") {
        setMessage("Are you sure you want to join this group?");
        setTitle("Join Group");
        setShowConfirm(true);
      }
    }


  const joinedButton = (
	  <Button size="small" disabled>Joined</Button>
    );

    return (
    <div style ={style} className = "card">
      { groupPicture ? <img src={`data:image/png;base64,${groupPicture}`} className="card__image" alt="" /> : <img src= "https://i.imgur.com/pPJmXV7.png" className="card__image" alt="" style = {{width: '100%', height: '100%'}} /> }
      <div className="card__overlay" style ={{backgroundColor: 'white'}}>
        <div className="card__header"  style ={{backgroundColor: 'white'}}>
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <div className="card__header-text">
            <h3 className="card__title">{item.groupName}</h3>            
            <span className="card__status">{groupTypeText}</span>

          </div>
        </div>
        <div style ={{display: 'inline-flex', width: '95%'}}>
          {item.idList.includes(userID) || joined ? joinedButton : <Button size="small" value={item._id} onClick={handleSubmit}>Join</Button>}
          <p className="card__description" style ={{padding: '0px', marginLeft: 'auto', fontWeight: '400'}}>Online Users: {item.users}</p>
        </div>
      </div>
      <PromptBox show={showPrompt} title={title} message={message} onConfirm = {(input) => {handleJoinGroup(input)}} onCancel = {() => handleClose()} />
      <ConfirmBox show={showConfirm} title={title} message={message} groupID={item._id} onConfirm = {() => {handleJoinGroup()}} onCancel = {() => handleClose()} />
      <MessageBox show={showMessage} title={title} message={message} onConfirm = {() => handleClose()} />
    </div>
  );
}