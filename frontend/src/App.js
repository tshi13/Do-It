import {Navigation} from './components/navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import React, { useEffect, useState } from 'react';
import useUser from './utils/useUser';
import test from './assets/test.jpg';


function App() {

  const { user, setUser, userID} = useUser();
  const isLoggedIn = user !== null;

  const backgroundColor = '#99ffdd';
  const [profilePicture, setProfilePicture] = useState(null);


  return (    
    <div style ={{width: '100%', height: '100%'}}>
      <Navigation backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} profilePicture = {test}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username = {user} userID = {userID} backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn}/>}/>
          <Route path="/login" element={<Login user = {user} setUser = {setUser} />}/>
          <Route path="/Register" element={<Register user = {user} setUser = {setUser} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
