import * as React from 'react';
import { useState, useRef } from 'react';
import ProfileImage from '../components/profilePictureMaker';
import userDAO from '../utils/userDAO';

import '../styles/profile.css';
import '../styles/Home.css';

export default function Profile(props) {
    const user = props.user;
    const userID = props.userID;
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
   
    const handleSave = async () => {
        let data = {
            profilePicture: image
        }
       await userDAO.updateProfile(userID, data);
    }

    return(
        <div>
            <div style = {{width: '25%', marginRight: 'auto', marginLeft: 'auto', marginTop: '5%'}}>
                <h1>Profile Picture Editor</h1>
                <ProfileImage image={image} setImage={setImage} />
            </div>
            <div className ="h-divider"></div>
            <div style = {{width: '25%', marginRight: 'auto', marginLeft: 'auto', marginTop: '5%', display: 'flex', flexDirection: 'column'}}>
                <h1 style ={{marginBottom: '10%', width: '100%'}}>Change Password</h1>
            </div>
            <div style ={{width: '25', marginRight: 'auto', marginLeft: 'auto', marginTop: '5%'}}>
                <button className = "buttonDesign" style = {{marginRight: 'auto', marginLeft: 'auto', marginBottom: '5%'}} onClick={handleSave}>Save</button> 
            </div>
            
        </div>
    );

    
}

