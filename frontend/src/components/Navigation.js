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
	
	const loginOptions = (
		<>
		<div>
			<form className="d-flex">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble font-weight-bold" aria-current="page" href="/Register"  style = {{fontWeight: 'bold'}}>Register</a>
					</li>
				</ul>
			</form>
		</div>
		<div>
			<form className="d-flex">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble font-weight-bold" aria-current="page" href="/Login"  style = {{fontWeight: 'bold'}}>Login</a>
					</li>
				</ul>
			</form>
		</div>
		</>
	);

	const logoutOptions = (
		<div>
			<ul className="navbar-nav">
				<NavDropdown title={ profilePicture ? <ProfilePicture profilePicture={profilePicture} />: <ProfilePicture /> } id="basic-nav-dropdown">
					<NavDropdown.Item disabled >Username: {username}</NavDropdown.Item>
					<NavDropdown.Item disabled >Coins: {coins}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
					<NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="/logout" onClick={logOut}>Logout</NavDropdown.Item>
				</NavDropdown>
			</ul>
		</div>
	
	);

    return ( 
        <nav className="navbar navbar-expand-lg" style = {{backgroundColor: props.backgroundColor}}>
			<a className="navbar-brand block" href="/" style = {{marginLeft: '2%', fontWeight: 'bold'}}>Do/It</a>
			<div>
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble" aria-current="page" href="/" style = {{fontWeight: 'bold'}}>Home</a>
					</li>
				</ul>
			</div>
			<div className="center" style = {{width: '20%'}}>
					<input className="form-control me-2" type="search" placeholder="Search For Groups" onChange={e => {handleSearchChange(e)}}  aria-label="Search"/>
					<div id = "searchDropDown" className="searchButton" style ={{position: 'absolute', display: 'none', zIndex: '10', width: '20%'}}>
						<button className="form-control me-2" type="submit" onClick={e => {handleSubmit(e, "name")}}>Search by Name</button>
						<Dropdown.Divider />
						<button className="form-control me-2" type="submit" onClick={e => {handleSubmit(e, "ID")}}>Search by ID</button>
					</div>

			</div>

            {props.isLoggedIn ? logoutOptions : loginOptions}

		</nav>		
    );

}