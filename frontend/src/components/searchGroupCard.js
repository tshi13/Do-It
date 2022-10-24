import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import groupDao from "../utils/groupDAO";
import '../styles/searchGroupCard.css';
import {Buffer} from 'buffer';
import userDAO from '../utils/userDAO';


export default function SearchGroupCard(props) {
  const { item, userID } = props;
  const groupPicture = item.groupPicture ? Buffer.from(item.groupPicture).toString('base64'): null;
  const [groupTypeText, setgroupTypeText] = useState("");
  const [groupStatus, setGroupStatus] = useState("");
  const [groupType, setGroupType] = useState(item.typeOfGroup);
  const [joined, setJoined] = useState(false);


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


 
  function handleSubmit (e) {
    /*e.preventDefault();
    const data = {
      userID: userID,
      groupID: e.target.value
    }
    groupDao.addToGroup(data);*/

    if(groupType == "public") {
      let val = window.confirm ("Are you sure you want to join this group?");
      if(val) {
        const data = {
          userID: userID,
          groupID: e.target.value
        }
        groupDao.addToGroup(data);
        setJoined(true);
      } else {
        return;
      }
    } else if(groupType == "password") {
      let val = window.prompt("Please enter the password for this group");
      if(val == item.password) {
        const data = {
          userID: userID,
          groupID: e.target.value
        }
        groupDao.addToGroup(data);
        setJoined(true);
      } else {
        alert("Incorrect password");
        return;
      }
    } else if(groupType == "cost") {
      let val = window.confirm("Are you sure you want to join this group? It costs " + item.costToJoin + " to join");
      if(val) {
        userDAO.getUserData(userID).then((user) => {
          if(user.coins >= item.costToJoin) {
            let userData = {
              userID: userID,
              coins: user.coins - item.costToJoin
            }
            userDAO.updateUser(userID, userData).then(() => {
             const data = {
                userID: userID,
                groupID: e.target.value
              }
              groupDao.addToGroup(data);
              setJoined(true);
          });
          } else {
            alert("You do not have enough coins to join this group");
            return;
          }
        });
      } else {
        return;
      }
    }


  }
  

  const joinedButton = (
	  <Button size="small" disabled>Joined</Button>
    );

  
    return (
    <div style ={{maxWidth: '200px', maxHeight: '200px', margin: '10px'}} className = "card">
      { groupPicture ? <img src={`data:image/png;base64,${groupPicture}`} className="card__image" alt="" /> : <img src= "https://i.imgur.com/pPJmXV7.png" className="card__image" alt="" style = {{width: '100%', height: '100%'}} /> }
      <img src= "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" className="card__image" alt="" style = {{width: '100%', height: '100%'}} />  
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
    </div>
  );
}