import React, {useEffect, useState } from "react";
import userDAO from "../utils/userDAO";
import GoogleAuth from "./GoogleAuth";
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';


import '../styles/LoginForm.css';
// 
import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from '@greatsumini/react-facebook-login';

function LoginForm(props) {
  
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // User Login info
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const data = {
      loginType: "password",
      name : username,
      password: password
    }  

    if(password === "" || username === ""){
      setErrorMessages({name: "pass", message: "Please fill out all fields"});
    } else {
      userDAO.login(data).then((response) => {
        
        if (typeof response !== "string") {
					props.setUser(data.name, response._id, response.coins);
					setIsSubmitted(true);
					window.location.href = "/";
        } else {
          setIsSubmitted(false);
          setErrorMessages({ name: "pass", message: response });
        }
    })
  }
};

	const handleGoogle = async (event) => {
		const googleID = event.googleId;
		const name = event.name;
		const loginData = {
			loginType: "google",
			key: googleID
		};

		const data = {
      name : name,
      coins : 6,
      taskIDList : [],
      groupIDList : [],
			googleID: googleID,
			email: event.email
    }

		let response = await userDAO.login(loginData);
		let id = response._id;
		let coins = response.coins;
		if (typeof response === "string") {
			let newUser = await userDAO.addUser(data);
			id = newUser._id;
			coins = newUser.coins;
		}
		
		props.setUser(data.name, id, coins);
		setIsSubmitted(true);
		window.location.href = "/";	
	}

  // useEffect hook to redirect to home page after login


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  const handleFacebookSubmit = async (facebookResponse) => {

		FacebookLoginClient.init({appId: "865292997959919", version: 'v9.0'});
		FacebookLoginClient.login((res) => {});

  
    // this is the id associated with a user
    // on facebook.com
    const facebookID = facebookResponse.id;
    const name = facebookResponse.name;
    const email = facebookResponse.email;
		
    // preparing to send data to login function
    const loginData = {
			loginType: "facebook",
			key: facebookID
		};

		const data = {
      name : name,
      coins : 6,
      taskIDList : [],
      groupIDList : [],
			facebookID: facebookID,
			email: email
    }

		let response = await userDAO.login(loginData);
		let id = response._id;
		let coins = response.coins;
		if (typeof response === "string") {
			let newUser = await userDAO.addUser(data);
			id = newUser._id;
			coins = newUser.coins;
		}
		
		props.setUser(data.name, id, coins);
		setIsSubmitted(true);
		window.location.href = "/";	    
};

  
  return (
    <div className="app" style = {{width: '100%'}}>
      {isSubmitted ? <div>User is successfully logged in <br></br> <p>Redirecting to Main Page</p></div> : 
        <div style = {{width: '50%'}}>
        <div className="login-form">
          <p className="title" style ={{color: 'black', fontFamily: 'Brush Script MT', fontSize: '5vh'}}>DoIt</p>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                name="name"
                placeholder="Username"
                className = "inputLogin"
                onChange={(e) => setUsername(e.target.value)}
              />
              {renderErrorMessage("uname")}
            </div>
            <div className="input">
              <input type="password" name="password" placeholder="Password" className = "inputLogin" onChange={(e) => setPassword(e.target.value)} />
              {renderErrorMessage("pass")}
            </div>
            <div className="input">
              <input type="submit" value="Login" className = "inputButton"/>
            </div>
           
            <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <FacebookLogin
							appId="865292997959919"
							autoLoad={false}
							fields="name,email,picture"
							// onClick={componentClicked}
							callback={(res) => {handleFacebookSubmit(res);}} />
            </div>
            
						<div style = {{marginTop: '5%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
							Or login with
						</div>
						<div style = {{marginTop: '5%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
							<GoogleAuth handleGoogle = {handleGoogle}/>
						</div>
          </form>

        </div>
          <div className="login-form" style ={{marginTop: '5%'}}>
              <form action="/register" style = {{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <p>Don't have an account?</p>
                <input type="submit" value="Register" className = "inputButton"/>
              </form>
          </div>
      	</div>
    }
    </div>
  );
}

export default LoginForm;