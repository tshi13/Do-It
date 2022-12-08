import React, {useEffect} from 'react';
import RegisterForm from './RegisterPage';
import LoginForm from '../components/LoginForm';
import DoitLogo from '../assets/DoItCrop.png';
import CoverPage from '../assets/cover_page.jpg';
import WallPaper from '../assets/wallpaper.jpeg';
import {motion} from 'framer-motion';
import { Typography } from '@mui/material';
import Typical from 'react-typical'
import Typed from "react-typed"

import '../styles/IntroPage.css';


export default function IntroPage(props)  {
    const user = props.user;
    const setUser = props.setUser;

    return (
			<div className="introPage">
			<div className="left">
					<div className="leftContent">
					<img src={WallPaper} alt="Cover Page" style={{width:'250%', objectPosition:'-250px 0px'}} /> 
							{/* <div class="top-right">Create, learn and grow in the Do/it 1.0</div> */}
							<div class = "top-right">
							<h1 style={{color:'white'}}>
							<Typed
								strings={[
									"Hello!",
									"Welcome to Do it! ",
								]}
								typeSpeed={100}
								backSpeed={100}
								
								/>
								</h1>
							</div>
							<div class="sub-right">
							<h3>
								Here, you can: 
								<br></br>
								<br></br>
								<h4>
									<Typed
								strings={[
									"Set Private Goals 🎯",
									"Meet New Friends 😎",
									"Create Groups 🤩",
									"Bet on Your Success 🥂",
									"Win Money 💵"
								]}
								typeSpeed={70}
								backSpeed={20}
								loop
								/>
								</h4>
								
								</h3>
							</div>
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
