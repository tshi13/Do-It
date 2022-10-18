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
        setIsSubmitted(true);
        props.setUser(data.name, response._id);
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
  useEffect(() => {
    if (isSubmitted) {
      window.location.href = "/";
    }
  }, [isSubmitted]);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" value={userName} onChange={e => setUserName(e.target.value)} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass"  />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="button-container">
          <input type="submit" className="logining" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in <br></br> <p>Redirecting to Main Page</p></div> : renderForm}
      </div>
    </div>
  );
}

export default LoginForm;