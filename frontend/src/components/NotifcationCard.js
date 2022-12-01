import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/NotificationCard.css';
import groupDAO from '../utils/groupDAO';
import userDAO from '../utils/userDAO';

const convertDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    return month + "/" + day + "/" + year;
}

const convertHTMLTextToHTML = (htmlText) => {
    console.log("htmlText: ", htmlText);
    return {__html: htmlText};
}

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


    return (
        <Card sx={{ minWidth: 300, maxWidth: 600, margin: 1 }}>
            <div style = {{display: 'flex', flexDirection: 'row-reverse'}}>
                <button className = "NCButton" onClick={() => {deleteNotification(notification.id)}} style ={style.buttonStyle}>
                    X
                </button>
            </div>
            <div className='center' style ={{textAlign: 'center'}}>
                <Typography component="div" gutterBottom>
                        Created on: {convertDate(notification.date)}
                    </Typography>
                    <Typography component="div" gutterBottom>
                        {notification.title}
                    </Typography>
            </div>
            <CardContent>
                <Typography component="div" gutterBottom>
                    {new DOMParser().parseFromString(notification.message, "text/html").documentElement.textContent}

                </Typography>
                {notification.groupID ? 
                <CardActions>
                    <Button size="small" onClick={() => {openGroup(notification.groupID)}}>
                        Go to Group
                    </Button>
                </CardActions> : null}
            </CardContent>
        </Card>
    );


}