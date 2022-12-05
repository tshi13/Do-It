import React, { useState } from "react";
import userDAO from "../utils/userDAO";
import GoogleAuth from "./GoogleAuth";
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import '../styles/LoginForm.css';
import FacebookLogin from 'react-facebook-login';



function LoginForm(props) {
  
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  // User Login info
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const data = {
      loginType: "password",
      name : userName,
      password: password
    }  
    if (password === "" || userName === ""){
      setErrorMessages({name: "pass", message: "Please fill out all fields"});
    } else {    
    userDAO.getUser(data).then((response) => {
      if (response !== "User not found") {
        userDAO.authenticate(data).then((msg) => {
          console.log(msg);
          if (msg.message == "Authentication successful!") {
            userDAO.getUserData(response._id).then((res) => {
              props.setUser(data.name, res._id, res.coins);
              setIsSubmitted(true);
              window.location.href = "/";
            });
          } else {
            setIsSubmitted(false);
            setErrorMessages({ name: "uname", message: "Unmatched Credentials!" });
            setErrorMessages({ name: "pass", message: "Unmatched Credentials!!" });
          }
        });
        
        
      } else {
        setIsSubmitted(false);
        setErrorMessages({ name: "uname", message: "User Not Found" });
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

  
  return (
    <div className="app" style = {{width: '100%'}}>
      {isSubmitted ? <div>User is successfully logged in <br></br> <p>Redirecting to Main Page</p></div> : 
      <div className="login-form">
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
          <div style = {{marginTop: '5%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding:'15px',marginTop:'0px'}}>
							<GoogleAuth handleGoogle = {handleGoogle}/>
					</div>

          <div className="header"><h6>or</h6></div>
        
          <p className="title" style ={{color: 'rgb(0, 104, 74)', fontFamily: '"MongoDB Value Serif", "Times New Roman", serif', fontSize: '3vh'}}>Log in to your account</p>
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
              <input type="password" name="password" placeholder="Password" className = "inputLogin" onChange={(e) => setPassword(e.target.value)}/>
              {renderErrorMessage("pass")}
            </div>
            <div className="input">
              <input type="submit" value="Login" className = "inputButton"/>
            </div>
           
            
            
						
						
          </form>


     
              {/* <form action="/register" style = {{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}> */}
              <span style = {{ display: 'flex', justifyContent: 'center', fontFamily: 'Euclid Circular A', fontSize: '1.6vh'}}>
                Don't have an account?
                &nbsp;<a href="/register" style = {{fontFamily: 'Euclid Circular A', fontSize: '1.6vh'}}>Sign Up</a>
              </span>
                {/* <input type="submit" value="Register" className = "inputButton"/> */}
              {/* </form> */}
    
      	</div>
    }
    </div>
  );
}

export default LoginForm;