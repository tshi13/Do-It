import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import ProfileImage from '../unused/ProfilePictureEditor';
import userDAO from '../utils/userDAO';
import taskDAO from '../utils/taskDAO';

import '../styles/profile.css';
import '../styles/Home.css';

export default function Profile(props) {
    const user = props.user;
    const userID = props.userID;
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [privateTasks, setPrivateTasks] = useState([]);
    const [section, setSection] = useState('profile');
    

   
    const handleSave = async () => {
        let data = {
            profilePicture: image
        }
       await userDAO.updateUser(userID, data);
    }

  
    
    const renderMainContent = () => {
        if (section === 'profile') {
            return (
                <div className="profile-container">
                    <div className="profile-image-container">
                        <h1>Profile Picture Editor</h1>
                        <ProfileImage image={image} setImage={setImage} />
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <div className="profile">
                <div className = "profileSideBar">
                    <button className="settingsButton" onClick={() => setSection('profile')}>Edit Profile</button>
                    {/*<button className = "settingsButton" onClick = {() => {setSection('tasks')}}>My Tasks</button>*/}
                    <button className = "settingsButton" onClick = {() => {handleSave()}}>Save Settings</button>
                </div>
                <div className ="mainContent" id = "mainContent">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );

    
}

