import React, {useEffect} from 'react';
import RegisterForm from './RegisterPage';
import LoginForm from '../components/LoginForm';
import DoitLogo from '../assets/DoItCrop.png';
import CoverPage from '../assets/cover_page.jpg';
import WallPaper from '../assets/wallpaper.jpeg';
import {motion} from 'framer-motion';
import { Typography } from '@mui/material';
import Typical from 'react-typical'

import '../styles/IntroPage.css';
import zIndex from '@mui/material/styles/zIndex';


export default function IntroPage(props)  {
    const user = props.user;
    const setUser = props.setUser;

    return (
			
        <div className="introPage">
            <div className="left">
                <div className="leftContent">
                    <img src={WallPaper} alt="Cover Page" style={{width:'250%', objectPosition:'-250px 0px'}} />
										
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
