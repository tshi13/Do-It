import {Navigation} from './components/Navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useUser from './utils/useUser';
import SearchGroup from './containers/searchGroupPage';
import Profile from './containers/Profile';
import InvitePage from './containers/InvitePage';
import IntroPage from './components/IntroPage';
import RegisterForm from './components/RegisterForm';

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
      {isLoggedIn ? 
        <div>
          <BrowserRouter>
          <Navigation  backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString}/>
            <Routes>
              <Route path="/" element={<Home userID={userID} newHeight={newHeight} />} />
              <Route path="/search" element={<SearchGroup searchString={searchString} />} />
              <Route path="/profile" element={<Profile userID={userID} />} />
              <Route path="/invite" element={<InvitePage userID={userID} />} />
            </Routes>
          </BrowserRouter>
        </div>
        :
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IntroPage user = {user} setUser = {setUser}/>} />
              <Route path="/register" element={<RegisterForm setUser = {setUser}/>} />
            </Routes>
          </BrowserRouter>
        </div>
      }
    </div>

  );
}

export default App;
