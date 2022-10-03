import React from 'react';
import './navigation.css';

export const Navigation = (props) => { 
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<a className="navbar-brand block" href="/" style = {{marginLeft: '2%'}}>Do/It</a>
			<div>
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active bubble" aria-current="page" href="/">Home</a>
					</li>
				</ul>
			</div>
			<div className="center">
					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search For Groups" aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
			</div>

			<div>
				<form className="d-flex">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active bubble" aria-current="page" href="Register">Register</a>
						</li>
					</ul>
				</form>
			</div>


			<div>
				<form className="d-flex">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active bubble" aria-current="page" href="Login">Login</a>
						</li>
					</ul>
				</form>
			</div>

		</nav>		
    );

}