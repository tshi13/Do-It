import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/NotificationCard.css';
import groupDAO from '../utils/groupDAO';
import userDAO from '../utils/userDAO';

export default function NotificationCard(props) {
    const { notification } = props;
    const userID = props.userID;
    const [groupName, setGroupName] = React.useState();
    const [createdBy, setCreatedBy] = React.useState();


    const openGroup = () => {
        props.groupCallback(notification.groupID);
    }

    const deleteNotification = () => {
       props.removeNotification(notification.taskID);
       userDAO.getUserData(userID).then((user) => {
              let newNotifications = user.notifications.filter((newID) => {
                return newID.taskID !== notification.taskID;
              });
              user.notifications = newNotifications;
              userDAO.updateUser(user._id, user);
         });
    }

    useEffect(() => {
        groupDAO.getGroup(notification.groupID).then((res) => {
            if(res) {
                setGroupName(res.groupName);
            }
        });
        if(notification.createdBy) {
            userDAO.getUserData(notification.createdBy).then((res) => {
                if(res) {
                    setCreatedBy(res.name);
                }
            });
        }   

            
    }, [notification]);


    const style = {
        buttonStyle: {
            backgroundColor: 'white',
            fontSize: '14px',
            width: '15%',
            marginBottom: '0px',
            '&:hover': {
                opacity: '0',
            },
        },
    };

    const renderNotification = () => {
        if (notification.messageType === "task") {
            if(notification.type === "group") {
                return (
                    <Card sx={{ minWidth: 300, maxWidth: 600, margin: 1 }}>
                        <div style = {{display: 'flex', flexDirection: 'row-reverse'}}>
                            <button className = "NCButton" onClick={() => {deleteNotification(notification.id)}} style ={style.buttonStyle}>
                                X
                            </button>
                        </div>
                    <CardContent>
                        <Typography component="div" gutterBottom>
                        Group Task Created in  <b>{groupName}</b> <br></br>
                        <b>{createdBy}</b> has created a new task in <b>{groupName}</b> called <b>{notification.taskName}</b> with a time limit of <b>{notification.time}</b> minutes and a reward of <b>{notification.coinsEntered}</b> coins.
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => {openGroup(notification.groupID)}}>
                                Go to Group
                            </Button>
                        </CardActions>

                    </CardContent>
                </Card>
                );
            } else if(notification.type == "personal") {
                return (
                    <Card sx={{ minWidth: 300, maxWidth: 600, margin: 1 }}>
                        <div style = {{display: 'flex', flexDirection: 'row-reverse'}}>
                            <button className = "NCButton" onClick={() => {deleteNotification(notification.id)}} style ={style.buttonStyle}>
                                X
                            </button>
                        </div>
                    <CardContent>
                        <Typography component="div" gutterBottom>
                        Personal Task created in  <b>{groupName}</b> <br></br>
                        <b>{createdBy}</b> has created a new task for you in <b>{groupName}</b> called <b>{notification.taskName}</b> with a time limit of <b>{notification.time}</b> minutes and a reward of <b>{notification.coinsEntered}</b> coins.
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => {openGroup(notification.groupID)}}>
                                Go to Group
                            </Button>
                        </CardActions>

                    </CardContent>
                </Card>
                );
            }
        }
    }


    return (
        <div>
            {renderNotification()}
        </div>
    );


}