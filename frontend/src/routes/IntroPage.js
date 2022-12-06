import React, {useEffect} from 'react';
import RegisterForm from './RegisterPage';
import LoginForm from '../components/LoginForm';
import DoitLogo from '../assets/DoItCrop.png';
import CoverPage from '../assets/cover_page.jpg';


import '../styles/IntroPage.css';


export default function IntroPage(props)  {
    const user = props.user;
    const setUser = props.setUser;

    return (
        <div className="introPage">
            <div className="left">
                <div className="leftContent">
                    <img src={CoverPage} alt="Cover Page" />  
                    <div class="top-right">Create, learn and grow in the Do/it 1.0</div>
                    <div class="sub-right">Power modern applications with enriched collboation capabilities, new mode, added motivational features and more.</div>
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
