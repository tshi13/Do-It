import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useUser from './utils/useUser';
import {Navigation} from './layouts/Navigation';
import Home from './routes/HomePage';
import SearchGroup from './routes/searchGroupPage';
import Profile from './routes/ProfilePage';
import InvitePage from './routes/InvitePage';
import IntroPage from './routes/IntroPage';
import RegisterForm from './routes/RegisterPage';
import NotFound from './routes/NotFoundPage';


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

  const [coins, setNavCoins] = useState(sessionStorage.getItem("coins"));

  let newHeight = height - 72;

  return (    
    <div>
      {isLoggedIn ? 
        <div>
          <BrowserRouter>
          <Navigation  backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString} coins={coins}/>
            <Routes>
              <Route path="/" element={<Home userID={userID} username = {user} newHeight={newHeight} setNavCoins={setNavCoins} />} />
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
