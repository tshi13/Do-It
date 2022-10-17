import * as React from 'react';

import '../../styles/GroupCard.css';
import Test from '../../assets/test.jpg';


export default function GroupCard(props) {
  const { groupData } = props;

  return (
    <div className="groupCard" onClick ={() => {props.groupCallback(groupData.id)}}>
        <div className = "groupCard-container">
            <div className="groupCard__image">
                <img src={Test} alt="group image" />
            </div>
            <h2 className = "customText" > {groupData.groupName} </h2>
            <div className = "overlay">
            </div>
        </div>
    </div>
  );
}