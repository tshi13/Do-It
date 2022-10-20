import {Navigation} from './components/Navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useUser from './utils/useUser';
import SearchGroup from './containers/searchGroupPage';
import Profile from './containers/Profile';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


function App() {

  const { user, setUser, userID} = useUser();
  
  const isLoggedIn = user !== null;

  const [profilePicture, setProfilePicture] = useState(null);


  const backgroundColor = '#99ffdd';
  const [searchString, setSearchString] = useState("");

  const [width, height] = useWindowSize();

  let newHeight = height - 75;


  return (    
    <div>
      <Navigation  backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username = {user} userID = {userID} backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} newHeight = {newHeight}/>}/>
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
