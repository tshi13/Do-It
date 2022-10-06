import React from 'react';
import '../styles/navigation.css';

export const Navigation = (props) => { 
	
	function logOut(e) {
		e.preventDefault();
		props.setUser(null);
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
		<>
		<div>
			<form className="d-flex">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble font-weight-bold" aria-current="page" href="/"  style = {{fontWeight: 'bold'}} onClick={logOut}>Logout</a>
					</li>
				</ul>
			</form>
		</div>
		</>
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
					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search For Groups" aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit"  style = {{fontWeight: 'bold'}}>Search</button>
					</form>
			</div>

            {props.isLoggedIn ? logoutOptions : loginOptions}

		</nav>		
    );

}