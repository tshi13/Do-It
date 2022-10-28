import React, {useEffect} from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import '../styles/IntroPage.css';


export default function IntroPage(props)  {
    const user = props.user;
    const setUser = props.setUser;

    return (
        <div className="introPage">
            <div className="left">
                <div className="leftContent">
                    
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
