import React, { useEffect, useState } from "react";
import '../styles/RegisterForm.css';
import userDAO from "../utils/userDAO";
import GoogleAuth from "../components/GoogleAuth";
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import FacebookLogin from 'react-facebook-login';
import DoitLogo from '../assets/DoItCrop.png';

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

   // facebook submitting for login
  const handleFacebookSubmit = async (facebookResponse) => {

		FacebookLoginClient.init({appId: "865292997959919", version: 'v9.0'});

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
			email: email,
			password: null
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


  // JSX code for login form
  const renderForm = (
    <div>
      <form onSubmit={handleSubmit}>
      <img src={DoitLogo} alt="DoIt Logo" style={{width:'20%', justifyContent:'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop:'-10%'}}/>
      <h2 class="css-13nuthu leafygreen-ui-1wgcd7w" style={{justifyContent:'center', display: 'block', marginLeft: '20%', marginRight: 'auto', marginBottom:'5%'}}>Create your account</h2>
      <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <FacebookLogin
							appId="865292997959919"
							autoLoad={false}
							fields="name,email,picture"
              textButton="Sign in with Facebook"
              // icon="fa-facebook"
              cssClass="btnFacebook"
							callback={(res) => {handleFacebookSubmit(res);}} />
          </div>
          <div style = {{marginTop: '5%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding:'15px', marginTop:'0px'}}>
							<GoogleAuth handleGoogle = {handleGoogle}/>
					</div>

        <div className="header"><h6>or</h6></div>
        <div className="input-container">
          <label>New Username </label>
          <input type="text" name="uname" class="leafygreen-ui-ceps5p"  value={userName} onChange={e => setUserName(e.target.value)} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" class="leafygreen-ui-ceps5p"  onChange={(e) => setFirstPassword(e.target.value)}/>
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="input-container">
          <label>Re-enter Password </label>
          <input type="password" name="pass" class="leafygreen-ui-ceps5p"   onChange={(e) => setSecondPassword(e.target.value)}/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Sign up" style={{fontFamily:'"Euclid Circular A", Akzidenz, "Helvetica Neue", Helvetica, Arial, sans-serif'}} className="registering"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {/* <div className="title">Registration </div> */}
        {!isSubmitted && !isLoggedIn ? renderForm : null}
        {isLoggedIn && <div>Login Successful</div>}

      </div>
    </div>
  );
}

export default RegisterForm;