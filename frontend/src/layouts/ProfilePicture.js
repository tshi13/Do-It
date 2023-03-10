import React from 'react';

export default function ProfilePicture(props)  {

    const profilePicture = props.profilePicture ? props.profilePicture : null;

    const style = {
        height: props.radius ? props.radius : 50,
        width: props.radius ? props.radius : 50,
        borderRadius: '50%',
    }

    const handleProfilePicture = () => {
        if(profilePicture) {
            return (
                <img src={`data:image/png;base64,${profilePicture}`} alt="profile" className="profilePicture" style ={style}/>
            );
        } else {
            return (
                <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile" className="profilePicture" style ={style}/>
            );
        }
    }

    return (
        <div>
            {handleProfilePicture()}
        </div>
    );

}