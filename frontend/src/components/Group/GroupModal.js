import { Divider, Typography, FormControl, Input} from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import groupDAO from '../../utils/groupDAO';
import ProfileImage from '../../unused/ProfilePictureEditor';
import chatDAO from '../../utils/chatDAO';
import '../../styles/groupModal.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const ariaLabel = { 'aria-label': 'description' };


export default function GroupModal(props) {

    const [groupName, setGroupName] = useState("");
    const [userID] = useState(props.userID);
    const [image, setImage] = useState(null);
    //const [description, setDiscription] = useState("");
    const createGroup = props.createGroup ? props.createGroup : false;
    const [type, setType] = useState("public");
    const [pass, setPass] = useState("");
    const [cost, setCost] = useState(0);

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
    // preventDefault();
    // const { user, setUser, userID} = useUser();
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
        <header>
          <div >
            {createGroup ? <p variant="h4" ><h1 className='class_title'>Create Group</h1></p> : <p variant="h4">Edit Group</p>}
          </div>
        </header>
        <form onSubmit={handleSubmit}>
            <div className="form-group" style ={{marginTop: "2%"}}>
                <TextField type="text" id="filled-basic" label="Group Name" inputProps={ariaLabel} className = "inputBox" onInput={e => setGroupName(e.target.value)} />
            </div>
            <div className='type' style ={{display: 'flex', flexDirection: 'column', marginBottom: "5%", marginTop: "10%"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type of Group</InputLabel>
              <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type of Group"
                onChange={e => setType(e.target.value)}
              >
                <MenuItem value={"public"}>Public</MenuItem>
                <MenuItem value={"password"}>Private with Password</MenuItem>
                <MenuItem value={"cost"}>Private with Cost</MenuItem>
              </Select>
            </FormControl>
              
              {/* <select onChange={e => setType(e.target.value)}>
                <option value = "default" disabled hidden>Choose Type</option>
                <option value="public">Public</option>
                <option value="password">Private with Password</option>
                <option value="cost">Private with Cost</option>
              </select> */}
              {type === "password" ? <TextField type="text" label="Password" className = "inputBox" style ={{marginTop: "2%", marginBottom: "3%"}}  onInput={e => setPass(e.target.value)} /> : null}
              {type === "cost" ? <TextField type="number" label="Cost" className = "inputBox" style ={{marginTop: "2%", marginBottom: "3%"}} onInput={e => setCost(e.target.value)} /> : null}

            </div>
            <ProfileImage setImage = {setImage} />
            <div style ={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
            <Button variant="primary" type="button" class="button-63" onClick={handleSubmit}>Confirm</Button>
            <Button variant="secondary" class="button-64" onClick={props.close}>Close</Button>
            </div>
            </form>
      </div>
  );
}