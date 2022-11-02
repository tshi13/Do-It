import React, {useEffect, useState } from "react";
import userDAO from "../utils/userDAO";

import '../styles/LoginForm.css';

function LoginForm(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  // User Login info

  const errors = {
    uname: "User Doesn't Exist",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const data = {
      name : userName,
    }  
    
    userDAO.getUser(data).then((response) => {
      
      if (response !== "User not found") {
        userDAO.getUserData(response._id).then((res) => {
          props.setUser(data.name, res._id, res.coins);
          setIsSubmitted(true);
          window.location.href = "/";
        });
        
      } else {
        setIsSubmitted(false);
        setErrorMessages({ name: "uname", message: errors.uname });
      }

    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  })};

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
                onChange={(e) => setUserName(e.target.value)}
              />
              {renderErrorMessage("uname")}
            </div>
            <div className="input">
              <input type="password" name="password" placeholder="Password" className = "inputLogin" />
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
      </div>
    }
    </div>
  );
}

export default LoginForm;