import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import '../styles/RegisterForm.css';

axios.defaults.baseURL = 'http://localhost:5000';

function RegisterForm() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const data = {
      name : userName,
      coins : 6,
      taskIDList : [],
    }  

    axios
    .post("/createUser", data)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    setIsSubmitted(true);

  
  };

  // Generate JSX code for error message
  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>New Username </label>
          <input type="text" name="uname" value={userName} onChange={e => setUserName(e.target.value)} required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass"  />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="input-container">
          <label>Re-enter Password </label>
          <input type="password" name="pass"  />
          {/* {renderErrorMessage("pass")} */}
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
        {isSubmitted ? <div>Register successfully</div> : renderForm}
      </div>
    </div>
  );
}

export default RegisterForm;