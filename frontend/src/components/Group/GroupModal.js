import { Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import groupDAO from '../../utils/groupDAO';
import ProfileImage from '../../unused/ProfilePictureEditor';
import chatDAO from '../../utils/chatDAO';
import '../../styles/groupModal.css';

export default function GroupModal(props) {

    const [groupName, setGroupName] = useState("");
    const [userID] = useState(props.userID);
    const [image, setImage] = useState(null);
    //const [description, setDiscription] = useState("");
    const createGroup = props.createGroup ? props.createGroup : false;
    const [type, setType] = useState("public");
    const [pass, setPass] = useState("");
    const [cost, setCost] = useState(0);


      /** 
     *  This function is called when a new group is created
     *  It will generate random number as invitation code of the group, people can join the group through this invitation code
     */
    const generateRandomInviteCode = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

  const handleSubmit = () => {
		let groupID;
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
          inviteID: generateRandomInviteCode(10),
        }
        groupDAO.createGroup(group)
					.then((group) => {
            
						props.groupCallback(
							{_id: group._id,
							 groupName: group.groupName,
							 groupPicture: image,
							 idList: group.idList, 
							 taskIDList: group.taskIDList, 
							 typeOfGroup: group.typeOfGroup, 
							 owner: group.owner, 
							 costToJoin: group.costToJoin, 
							 password: group.password, 
							 inviteID: group.inviteID});
						groupID = group._id;
						return group.groupName;
					})
					.then((name) => {
            
						chatDAO.createChannel(group.owner, sessionStorage.getItem("user"), groupID, name);
					})
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