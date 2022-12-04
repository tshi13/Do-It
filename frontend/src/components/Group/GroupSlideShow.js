import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Card} from 'react-bootstrap';

import '../../styles/GroupSlideshow.css';
import { Typography } from '@mui/material';

export default function GroupSlideshow(props) {
    const groups = props.groups;

    const handleImage = (groupPicture) => {
        if(groupPicture) {
            return (
                <img src={`data:image/png;base64,${groupPicture}`} alt="group image" className="groupImage" style ={{maxWidth: '50%'}}/>
            );
        } else {
            return (
                <img src="https://i.imgur.com/pPJmXV7.png" alt="group image" className="groupImage" style ={{maxWidth: '50%'}}/>
            );
        }
    }

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        arrows: true,
    } 

    return (
        <div className="slide-container" style = {props.style}>
            {groups.length > 0 ? (
            <Slide {...properties}>
                {groups.map((group, index) => {
                    return (
                        <div className="each-slide-effect" key = {index}>
                            <div className="slide-image">
                                <Card style={{ width: '20rem', height: '100%'}}>
                                    <Card.Body>
                                        <Card.Title>{group.groupName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Group Stats</Card.Subtitle>
                                        <Card.Body>
                                            {handleImage(group.groupPicture)}
                                            <Typography variant="body2" color="text.secondary">
                                                Group Name: {group.groupName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Group Description: {group.groupDescription}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Group Members: {group.groupMembers}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Online Users: {group.onlineUsers}
                                            </Typography>
                                        </Card.Body>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    );
                })}
            </Slide> ) : null }
        </div>
    )

}


