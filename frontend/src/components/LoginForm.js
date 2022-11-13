import React, {useEffect, useState } from "react";
import userDAO from "../utils/userDAO";
import GoogleAuth from "./GoogleAuth";

import '../styles/LoginForm.css';


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
          userDAO.getUserData(response._id).then((res) => {
            props.setUser(data.name, res._id, res.coins);
            setIsSubmitted(true);
            window.location.href = "/";
          });
          
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
		console.log(event);
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
		if (typeof response === "string") {
			await userDAO.addUser(data);
		}
		userDAO.getUserData(response._id).then((res) => {
			props.setUser(data.name, res._id, res.coins);
			setIsSubmitted(true);
			window.location.href = "/";
		});
	}

  // useEffect hook to redirect to home page after login


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


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
          </form>

        </div>
          <div className="login-form" style ={{marginTop: '5%'}}>
              <form action="/register" style = {{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <p>Don't have an account?</p>
                <input type="submit" value="Register" className = "inputButton"/>
              </form>
          </div>
					<div style = {{marginTop: '10%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
						<GoogleAuth handleGoogle = {handleGoogle}/>
					</div>
      	</div>
    }
    </div>
  );
}

export default LoginForm;