import {Navigation} from './components/Navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useUser from './utils/useUser';
import SearchGroup from './containers/searchGroupPage';
import Profile from './containers/Profile';
import InvitePage from './containers/InvitePage';
import IntroPage from './containers/IntroPage';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';

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

  let newHeight = height - 72;

  return (    
    <div>
      {isLoggedIn ? 
        <div>
          <BrowserRouter>
          <Navigation  backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString}/>
            <Routes>
              <Route path="/" element={<Home userID={userID} username = {user} newHeight={newHeight} />} />
              <Route path="/searchGroup" element={<SearchGroup searchString={searchString} userID = {userID} />} />
              <Route path="/profile" element={<Profile userID={userID} />} />
              <Route path="/invite/*" element={<InvitePage userID={userID} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/register" element={<RegisterForm  user = {user} setUser = {setUser}  isLoggedIn = {isLoggedIn} />} />
            </Routes>
          </BrowserRouter>
        </div>
        :
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IntroPage user = {user} setUser = {setUser}/>} />
              <Route path="/register" element={<RegisterForm  user = {user} setUser = {setUser} isLoggedIn = {isLoggedIn}/>} />
              <Route path="/invite/*" element={<InvitePage userID={userID} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      }
    </div>
  );
}

export default App;
