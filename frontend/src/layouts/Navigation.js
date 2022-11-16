import React, { useEffect, useState } from 'react';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import '../styles/navigation.css';
import ProfilePicture from './ProfilePicture';
import {Buffer} from 'buffer';
import {GoogleLogout } from 'react-google-login';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

import userDAO from '../utils/userDAO';
import Bell from '../assets/bell.png';
import NotificationCard from '../components/NotifcationCard';


export const Navigation = (props) => { 

	const [coins, setCoins] = useState(0);
	const [username, setUsername] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	const [buttonSelected, setButtonSelected] = useState(null);
	const [profileWindow, setProfileWindow] = useState(false);
	const notifications = props.notifications ? props.notifications : {};
	const setNotifications = props.setNotifications;
	const userID = props.userID;

	
	useEffect(() => {
		if(props.isLoggedIn){
			setUsername(props.username);
			userDAO.getUserData(props.userID).then((res) => {
				if(res) {
					let profilePicture = res.profilePicture ? Buffer.from(res.profilePicture.data).toString('base64') : null;
					setProfilePicture(profilePicture);
					setNotifications(res.notifications);
					setCoins(res.coins);
				}				
			});
		}
	}, [props.username, props.userID, props.coins]);

	const handleRemoveNotification = (taskID) => {
		let newNotifications = notifications;
		let newNotification = newNotifications.filter((notification) => {
			return notification.taskID !== taskID;
		});
		setNotifications(newNotification);
	}


	const clientId = '311523881473-odufi85njfn04idsir7pr8ckmarl9hak.apps.googleusercontent.com';
	
	function logOut(e) {
		e.preventDefault();
		props.setUser(null, null);
		if (sessionStorage.getItem("loginType") === "facebook") { // handle facebook logout
			facebookLogOut();
		}
		sessionStorage.clear();
		window.location.href = '/';
	}

	function googleLogOut() {
		props.setUser(null, null);
		window.location.href = '/';
		sessionStorage.clear();
	}

	function facebookLogOut() {
		FacebookLoginClient.logout(() => {
			window.FB.init({ apiKey: '865292997959919', version: 'v9.0' });
			window.FB.getLoginStatus(handleSessionResponse);
			console.log('logout completed!');
		});
	}

	//handle a session response from any of the auth related calls
	function handleSessionResponse(response) {
		//if we dont have a session (which means the user has been logged out, redirect the user)
		if (!response.session) {
				window.location = "/";
				return;
		}

		//if we do have a non-null response.session, call FB.logout(),
		//the JS method will log the user out of Facebook and remove any authorization cookies
		window.FB.logout(handleSessionResponse);
	}

	async function handleSubmit (e, type) {
		e.preventDefault();
		window.sessionStorage.setItem("searchQuery", props.searchString);
		window.sessionStorage.setItem("searchType", type);
		window.location.href = "/searchGroup";
	}

	function handleSearchChange(e) {
		props.setSearchString(e.target.value);
		if(e.target.value != "") {
			document.getElementById("searchDropDown").style.display = "block";
		} else {
			document.getElementById("searchDropDown").style.display = "none";
		}
	}
	
    return ( 
        <nav className="navbar navbar-expand-lg" style = {{backgroundColor: props.backgroundColor}}>
			<a className="navbar-brand bubble" aria-current="page" href="/" style = {{marginLeft: '2%', fontWeight: 'bold'}}>Do/It</a>
			<div className="center" style = {{width: '20%'}}>
					<input className="form-control me-2" type="search" placeholder="Search For Groups" onChange={e => {handleSearchChange(e)}}  aria-label="Search"/>
					<div id = "searchDropDown" className="searchButton" style ={{position: 'absolute', display: 'none', zIndex: '10', width: '20%'}}>
						<button className="form-control me-2" type="submit" onClick={e => {handleSubmit(e, "name")}}>Search by Name</button>
						<Dropdown.Divider />
						<button className="form-control me-2" type="submit" onClick={e => {handleSubmit(e, "ID")}}>Search by Invite Code</button>
					</div>
			</div>

			<div className="dropdown" style ={{marginRight: '1%'}}>
				<button className="dropbtn">
					<img className = "dropbtn" src={Bell} alt="Bell" style={{width: '30px', height: '30px', fill: 'black'}}/>
					{notifications.length > 0 ? <span className="badge" style ={{color: 'gray'}}>{notifications.length}</span> : null}
				</button>
				<div className="dropdown-content scrollable-menu">
					{notifications && notifications.length > 0 ? notifications.map((notification, index) => {
						return (
							<NotificationCard userID = {userID} notification = {notification} key = {index} removeNotification = {handleRemoveNotification} groupCallback = {props.groupCallback}/>
						)
					}) : <a href="#">No Notifications</a>}			
				</div>
			</div>
			<div className="dropdown">
				<button className="dropbtn">{props.isLoggedIn ? 
					<ProfilePicture profilePicture = {profilePicture} username = {username} /> :
					<ProfilePicture profilePicture = {null} username = {null} />
				}</button>
				<div className="dropdown-content">
					<p>{props.isLoggedIn ? "Username: "  + username : "Guest"}</p>
					<p>{props.isLoggedIn ? "Coins: " + props.coins : ""}</p>
					<div className="dividerCustom"></div>
					<a href="/profile">Profile</a>
					<a href="/settings">Settings</a>
					{sessionStorage.getItem("loginType") === "password" ? 
					<a href="/login" onClick={e => {logOut(e)}}>Log Out</a>  
					:	<GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={googleLogOut} /> }
				</div>
			</div>
		</nav>		
    );

}