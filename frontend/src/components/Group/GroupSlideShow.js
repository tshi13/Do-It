import React, {useEffect} from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Card} from 'react-bootstrap';
import userDAO from '../../utils/userDAO';
import { Chart } from "react-google-charts";
import '../../styles/GroupSlideshow.css';
import { Typography } from '@mui/material';

export default function GroupSlideshow(props) {
    const groups = props.groups;

    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [owners, setOwners] = React.useState([]);

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
    };

		let completedPrivateTasks;
		let ongoingPrivateTasks;

		const pieData = [
			["Task", "Hours per Day"],
			["Ongoing Tasks", 2],
			["Completed Tasks", 3],
		];

		
		const options = {
			title: (completedPrivateTasks == 0 && ongoingPrivateTasks == 0)? "Create a task to see your progress here!" :"Private tasks progress",
			titleTextStyle: {
        fontSize: 18, // 12, 18 whatever you want (don't specify px)
        bold: true
    }
		};
    
    useEffect(() => {
        getAllOnlineUsers();
        getAllOwners();
    }, [groups]);


    const getAllOnlineUsers = () => {
        let onlineUsers = [[]];
        groups.map((group) => {
            let onlineUsersInGroup = [];
            let onlineUsersInGroupIDs = group.onlineUsers;
            onlineUsersInGroupIDs.map((userID) => {
                userDAO.getUserData(userID).then((user) => {
                    onlineUsersInGroup.push(user.name);
                });
            });
            onlineUsers.push(onlineUsersInGroup);
        });
    }

    const getAllOwners = () => {
        let owners = [];
        groups.map((group) => {
            userDAO.getUserData(group.owner).then((user) => {
                owners.push(user);
                if(owners.length === groups.length) {
                    setOwners(owners);
                }
            });
        });
    }

    return (
        <div className="slide-container" style = {props.style}>
            {groups.length > 0 ? (
            <Slide {...properties}>
                {groups.map((group, index) => {
                    return (
                        <div className="each-slide-effect" key = {index}>
                            <div className="slide-image">
                                <Card>
                                    <Card.Body >
                                        <Card.Title>{group.groupName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Group Stats</Card.Subtitle>
																				<div style={{display:'flex', flexDirection: 'row'}}>

																				
                                        <div>
                                            {handleImage(group.groupPicture)}
                                            <Typography variant="body2" color="text.secondary">
                                                Group Type: {group.typeOfGroup}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Online Users: {group.onlineUsers.length + 1}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Member Count: {group.idList.length}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Group Owner: {owners[index] ? owners.filter((data) => data._id === group.owner)[0].name : "Loading..."}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Number of Current Tasks: {group.taskIDList.length}
                                            </Typography>
                                        </div>
																				<Chart
																			chartType="PieChart"
																			data={pieData}
																			options={options}
																			width={"50%"}
																			// height={"400px"}
																			/>
																				</div>
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


