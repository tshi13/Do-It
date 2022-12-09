import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useState, useLayoutEffect, useEffect } from 'react';
import useUser from './utils/useUser';
import {Navigation} from './layouts/Navigation';
import Home from './routes/HomePage';
import SearchGroup from './routes/searchGroupPage';
import Profile from './routes/ProfilePage';
import InvitePage from './routes/InvitePage';
import IntroPage from './routes/IntroPage';
import RegisterForm from './routes/RegisterPage';
import NotFound from './routes/NotFoundPage';
import userDAO from './utils/userDAO';


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

const handleLogout = (userID) => {
  let useID = typeof userID === String ? userID : JSON.parse(sessionStorage.getItem("userID"));;
    if(useID) {
    userDAO.logout(useID);
    }  
    console.log("Logged out");
}

const handleLogin = (userID) => {
  let useID = typeof userID === String ? userID : JSON.parse(sessionStorage.getItem("userID"));;
  console.log(useID);
  if(useID) {
    sessionStorage.setItem("activeSession", true);
    userDAO.markAsOnline(useID);
  }
  console.log("Logged in");
}

const handleChange = (e) => {
  let type = e.type;
  if(type === "visibilitychange" || type === "pagehide") {
    if(document.visibilityState === "visible") {
      handleLogin();
    } else {
      handleLogout();
    }
  } 
}

function App() {

  const { user, setUser, userID} = useUser();
  
  const isLoggedIn = user !== null;

  const [profilePicture, setProfilePicture] = useState(null);


  const backgroundColor = '#99ffdd';
  const [searchString, setSearchString] = useState("");

  const [width, height] = useWindowSize();

  const [coins, setNavCoins] = useState(sessionStorage.getItem("coins"));

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const updateNotifications = (newNotifications) => {
    /*let newNotificationList = notifications;
    newNotificationList.push(newNotifications);
    setNotifications(newNotificationList);*/
    //bug with this, it's not updating the notifications in the navbar. (sorry lidia)      
  }

  useEffect(() => {
    window.addEventListener('load', handleLogin);
    window.addEventListener('visibilitychange', handleChange);
    window.addEventListener('pagehide', handleChange);
    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('load', handleLogin);
      window.removeEventListener('visibilitychange', handleLogout);
      window.removeEventListener('pagehide', handleLogout);
      window.removeEventListener('beforeunload', handleLogout);
    }
  }, []);


  // let newHeight = height - (height * 0.142);
  let newHeight = height - (height * 0.112);

  return (    
    <div style = {{maxHeight: '100vh'}}>
      <link rel="icon" type="image/ico" href="../public/favicon.ico"/>
      {isLoggedIn ? 
        <div>
          <BrowserRouter>
          <Navigation handleLogout = {handleLogout}  notifications = {notifications} setNotifications = {setNotifications} backgroundColor = {backgroundColor} isLoggedIn = {isLoggedIn} setUser = {setUser} username = {user} userID = {userID} searchString = {searchString} setSearchString = {setSearchString} coins={coins} groupCallback = {setSelectedGroup}/>
            <Routes>
              <Route path="/" element={<Home setNotifications = {updateNotifications} userID={userID} username = {user} newHeight={newHeight} setNavCoins={setNavCoins} selectedGroup = {selectedGroup} setSelectedGroup = {setSelectedGroup} />} />
              <Route path="/searchGroup" element={<SearchGroup searchString={searchString} userID = {userID} newHeight = {newHeight} />} />
              <Route path="/profile" element={<Profile userID={userID} setNavCoins = {setNavCoins} />} />
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
