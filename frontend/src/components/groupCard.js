import * as React from 'react';
import Button from '@mui/material/Button';
import groupDao from "../utils/groupDAO";
import '../styles/searchGroupCard.css';
import {Buffer} from 'buffer';


export default function groupCard(props) {
  const { item, userID } = props;
  const groupPicture = item.groupPicture ? Buffer.from(item.groupPicture).toString('base64'): null;
 

  function handleSubmit (e) {
    e.preventDefault();
    const data = {
      userID: userID,
      groupID: e.target.value
    }
    groupDao.addToGroup(data);
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
            <span className="card__status">{item.status}</span>
          </div>
        </div>
        <p className="card__description">{item.description}</p>
        <div style ={{display: 'inline-flex', width: '95%'}}>
          {item.idList.includes(userID) ? joinedButton : <Button size="small" value={item._id} onClick={handleSubmit}>Join</Button>}
          <p className="card__description" style ={{padding: '0px', marginLeft: 'auto', fontWeight: '400'}}>Online Users: {item.users}</p>
        </div>
      </div>
    </div>
  );
}