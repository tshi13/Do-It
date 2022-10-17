import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import '../styles/navigation.css';
import ProfilePicture from './ProfilePicture';


export const Navigation = (props) => { 

	const [coins, setCoins] = useState(0);
	const [username, setUsername] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	
	useEffect(() => {
		if(props.isLoggedIn){
			setUsername(props.username);
			setProfilePicture(props.profilePicture);
			//setCoins(0); //have to find a way to get the coins from the database
		}
	}, [props.username, props.userID]); 
	
	function logOut(e) {
		e.preventDefault();
		props.setUser(null, null);
	}

	async function handleSubmit (e) {
		e.preventDefault();
		window.sessionStorage.setItem("searchQuery", props.searchString);
		window.location.href = '/searchGroup';
	}
	
	const loginOptions = (
		<>
		<div>
			<form className="d-flex">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble font-weight-bold" aria-current="page" href="Register"  style = {{fontWeight: 'bold'}}>Register</a>
					</li>
				</ul>
			</form>
		</div>
		<div>
			<form className="d-flex">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble font-weight-bold" aria-current="page" href="Login"  style = {{fontWeight: 'bold'}}>Login</a>
					</li>
				</ul>
			</form>
		</div>
		</>
	);

	const logoutOptions = (
		<div>
			<ul className="navbar-nav">
				<NavDropdown title={<ProfilePicture profilePicture={props.profilePicture} />} id="basic-nav-dropdown">
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
			<div className="center">
					<form onSubmit={handleSubmit} className="d-flex" action="/searchGroup" >
						<input className="form-control me-2" type="search" placeholder="Search For Groups" onChange={e => {props.setSearchString(e.target.value)}}  aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit"  style = {{fontWeight: 'bold'}}>Search</button>
					</form>
			</div>

            {props.isLoggedIn ? logoutOptions : loginOptions}

		</nav>		
    );

}