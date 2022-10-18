import { Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Database from '../utils/database';
import groupDAO from '../utils/groupDAO';

export default function GroupModal(props) {

    const [groupName, setGroupName] = useState("");
    const [userID] = useState(props.userID);
    //const [description, setDiscription] = useState("");


  const handleSubmit = () => {
    // preventDefault();

    // checks if the user inputs are valid and exist
    if(groupName === "") {
      alert("Please fill out all fields");
    } else  {
      let newGroupIDList = [userID];
      let taskList = [];
      groupDAO.createGroup({groupName: groupName, idList: newGroupIDList, taskIDList: taskList})
			.then((group) => {
				props.groupCallback({id: group._id, groupName: group.groupName});
			});
    }
		props.close();
  }
  
  const styleSheet = {
    circle: {
        borderRadius: '50%',
        float: 'right',
    
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

   // JSX code for taskModal form
  return (
    <div>
        <Divider textAlign="center">
            Create Group
        </Divider>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder="Group Name" style ={styleSheet.inputStyle} onInput={e => setGroupName(e.target.value)} />
                {/* <input type="text" placeholder="Group Description" style ={styleSheet.inputStyle} /> */}
            </div>
            <Button variant="primary" type="button" onClick={handleSubmit}>Confirm</Button>
            <Button variant="secondary" onClick={props.close}>
                Close
            </Button>
            </form>
      </div>
  );
}