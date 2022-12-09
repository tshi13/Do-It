import * as React from 'react';
import '../../styles/GroupCard.css';


export default function GroupCard(props) {
  const { groupData } = props;
  const { groupName, groupPicture } = groupData;

  const handleGroupPicture = () => {
    if(groupPicture) {
        return (
            <img src={`data:image/png;base64,${groupPicture}`} alt="group image" className="group image"/>
        );
    } else {
        return (
            <img src="https://i.imgur.com/rCYsHUb.png" alt="group image" className="group image"/>
        );
    }
}

  return (
    <div className="groupCard" onClick ={() => {props.groupCallback(groupData.id)}}>
        <div className = "groupCard-container">
            <div className="groupCard__image">
                {handleGroupPicture()}
            </div>
            <p className = "customText" style = {{ width: '90%', fontSize: 'auto', backgroundColor: '#1899D6', borderRadius: 5}}> {groupData.groupName} </p>
            <div className = "overlay">
            </div>
        </div>
    </div>
  );
}