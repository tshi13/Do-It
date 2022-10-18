import {Navigation} from './components/Navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import TaskCard from './components/TaskCard';
import DisplayTasks from './pages/DisplayTasks'
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import React, { useEffect, useState } from 'react';
import useUser from './utils/useUser';
import test from './assets/test.jpg';
import SearchGroup from './pages/searchGroupPage';
import Profile from './containers/Profile';

import {Buffer} from 'buffer';


function App() {

  const { user, setUser, userID} = useUser();
  
  const isLoggedIn = user !== null;

  const [profilePicture, setProfilePicture] = useState(null);


  const backgroundColor = '#99ffdd';
  const [searchString, setSearchString] = useState("");

  return (    
    <div style ={{width: '100%', height: '100%'}}>
      <Navigation backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username = {user} userID = {userID} backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn}/>}/>
          <Route path="/login" element={<Login user = {user} setUser = {setUser} />}/>
          <Route path="/Register" element={<Register user = {user} setUser = {setUser} />}/>
          <Route path="/SearchGroup" element={<SearchGroup user = {user} setUser = {setUser} searchString = {searchString} setSearchString = {setSearchString}  userID = {userID} />}/>
          <Route path="/Profile" element={<Profile user = {user} setUser = {setUser} searchString = {searchString} setSearchString = {setSearchString}  userID = {userID}  />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
