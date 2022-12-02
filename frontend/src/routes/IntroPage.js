import React, {useEffect} from 'react';
import RegisterForm from './RegisterPage';
import LoginForm from '../components/LoginForm';
import DoitLogo from '../assets/DoItCrop.png';

import '../styles/IntroPage.css';


export default function IntroPage(props)  {
    const user = props.user;
    const setUser = props.setUser;

    return (
        <div className="introPage">
            <div className="left">
                <div className="leftContent">
                    <img src={DoitLogo} alt="DoIt Logo" className="doItLogo"/>  
                </div>
            </div>
            <div className="right">
                <div className="rightContent">
                    <div className="login">
                        <LoginForm setUser={setUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}
