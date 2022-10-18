import * as React from 'react';
import Button from '@mui/material/Button';
import groupDao from "../utils/groupDAO";
import '../styles/searchGroupCard.css';

export default function groupCard(props) {
  const { item, userID } = props;
  const groupPicture = item.groupPicture ? item.groupPicture : "https://i.imgur.com/pPJmXV7.png";

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
    <div style ={{maxWidth: '300px'}} className = "card">
      <img src={groupPicture} className="card__image" alt="" style = {{width: '100%', height: '100%'}} />
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