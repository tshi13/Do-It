import React, { useEffect, useState } from "react";
import '../styles/RegisterForm.css';
import userDAO from "../utils/userDAO";

function RegisterForm(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  let user = props.user;
  let isLoggedIn = props.isLoggedIn;

    // useEffect hook to redirect to home page after login

  
  const errors = {
    uname: "User Already Exist",
    pass: "Password Not Matched"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const data = {
      name : userName,
      password : firstPassword,
      coins : 6,
      taskIDList : [],
      groupIDList : [],
    }

    if (firstPassword !== secondPassword) {
      setIsSubmitted(false);
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      userDAO.getUser(data).then((response) => {
        if (response !== "User not found") {
          setIsSubmitted(false);
          setErrorMessages({ name: "uname", message: errors.uname });
        } else {
          userDAO.addUser(data)
            .then((res) => 
            {
              setIsSubmitted(true);
              props.setUser(data.name, res._id, 6);
              window.location.href = "/";
            })
            .catch(err => console.log(err));
        }
      });  
  }
  };

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
          <label>New Username </label>
          <input type="text" name="uname"  value={userName} onChange={e => setUserName(e.target.value)} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" onChange={(e) => setFirstPassword(e.target.value)}/>
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="input-container">
          <label>Re-enter Password </label>
          <input type="password" name="pass"  onChange={(e) => setSecondPassword(e.target.value)}/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" className="registering"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Registration </div>
        {!isSubmitted && !isLoggedIn ? renderForm : null}
        {isLoggedIn && <div>Login Successful</div>}

      </div>
    </div>
  );
}

export default RegisterForm;