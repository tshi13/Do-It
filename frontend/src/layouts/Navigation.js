import React, { useEffect, useState } from 'react';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import '../styles/navigation.css';
import ProfilePicture from './ProfilePicture';
import {Buffer} from 'buffer';

import userDAO from '../utils/userDAO';

export const Navigation = (props) => { 

	const [coins, setCoins] = useState(0);
	const [username, setUsername] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	const [buttonSelected, setButtonSelected] = useState(null);
	const [profileWindow, setProfileWindow] = useState(false);

	
	useEffect(() => {
		if(props.isLoggedIn){
			setUsername(props.username);
			userDAO.getUserData(props.userID).then((res) => {
				try {
					setProfilePicture(Buffer.from(res.profilePicture).toString('base64'));
				}
				catch (err) {
					
				}
				setCoins(res.coins)
			});
		}
	}, [props.username, props.userID]);
	
	function logOut(e) {
		e.preventDefault();
		props.setUser(null, null);
		window.location.href = '/';
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

			<div className="dropdown">
				<button className="dropbtn">{props.isLoggedIn ? 
					<ProfilePicture profilePicture = {profilePicture} username = {username} /> :
					<ProfilePicture profilePicture = {null} username = {null} />
				}</button>
				<div className="dropdown-content">
				<p>{props.isLoggedIn ? "Username: "  + username : "Guest"}</p>
				<p>{props.isLoggedIn ? "Coins: " + coins : ""}</p>
				<div className="dividerCustom"></div>
				 <a href="/profile">Profile</a>
				 <a href="/settings">Settings</a>
				 <a href="/login" onClick={e => {logOut(e)}}>Log Out</a>

				</div>
			</div>


		</nav>		
    );

}