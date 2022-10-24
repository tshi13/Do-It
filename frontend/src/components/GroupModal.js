import { Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Database from '../utils/database';
import groupDAO from '../utils/groupDAO';
import ProfileImage from './imageEditor';

import '../styles/groupModal.css';

export default function GroupModal(props) {

    const [groupName, setGroupName] = useState("");
    const [userID] = useState(props.userID);
    const [image, setImage] = useState(null);
    //const [description, setDiscription] = useState("");
    const createGroup = props.createGroup ? props.createGroup : false;
    const [type, setType] = useState("public");
    const [pass, setPass] = useState("");
    const [cost, setCost] = useState(0);


  const handleSubmit = () => {
    // preventDefault();

    // checks if the user inputs are valid and exist
    if(createGroup) {
      if(groupName === "") {
        alert("Please enter a group name");
        return;
      }
       else if(type === "private" && pass === "") {
        alert("Please enter a password");
        return;
      } else {
        // create a new group
        const group = {
          groupName: groupName,
          idList: [userID],
          taskIDList: [],
          groupPicture: image,
          typeOfGroup: type,
          owner: userID,
          costToJoin: cost,
          password: pass,
        }
        groupDAO.createGroup(group).then((group) => {
          props.groupCallback({_id: group._id, groupName: group.groupName, groupPicture: image})
        });
        props.close();
      }
    } else {
      // update the group
      const group = {
        groupName: groupName,
        idList: [userID],
        taskIDList: [],
        groupPicture: image,
        typeOfGroup: type,
        owner: userID,
        costToJoin: cost,
        password: pass,
      }
      groupDAO.updateGroup(props.group._id, group).then((group) => {
        props.groupCallback({_id: group._id, groupName: group.groupName, groupPicture: image})
      });
      props.close();
    }
  }


   // JSX code for groupModal form
  return (
    <div>
        <Divider textAlign="center">
           {createGroup ? <p variant="h4">Create Group</p> : <p variant="h4">Edit Group</p>}
        </Divider>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder="Group Name" className = "inputBox" onInput={e => setGroupName(e.target.value)} />
            </div>
            <div className='type' style ={{display: 'flex', flexDirection: 'column'}}>
              <label className='typeLabel'>Type of Group: </label>
              <select onChange={e => setType(e.target.value)}>
                <option value = "default" disabled hidden>Choose Type</option>
                <option value="public">Public</option>
                <option value="password">Private with Password</option>
                <option value="cost">Private with Cost</option>
              </select>
              {type === "password" ? <input type="text" placeholder="Password" className = "inputBox" onInput={e => setPass(e.target.value)} /> : null}
              {type === "cost" ? <input type="number" placeholder="Cost" className = "inputBox" onInput={e => setCost(e.target.value)} /> : null}

            </div>
            <ProfileImage setImage = {setImage} />
            <Button variant="primary" type="button" onClick={handleSubmit}>Confirm</Button>
            <Button variant="secondary" onClick={props.close}>
                Close
            </Button>
            </form>
      </div>
  );
}