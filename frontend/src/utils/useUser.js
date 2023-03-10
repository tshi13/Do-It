import { useState } from "react";
import userDAO from './userDAO';

export default function useUser() {
  const getUser = () => {
    const UserString = sessionStorage.getItem("user");
    const userUser = JSON.parse(UserString);
    return userUser;
  };

  const getUserID = () => {
    const UserString = sessionStorage.getItem("userID");
    const userUser = JSON.parse(UserString);
    return userUser;
  };

  const [user, setUser] = useState(getUser()); 

  const [userID] = useState(getUserID());

  const saveUser = (userUser, userUserID, coins) => {
    sessionStorage.setItem("coins", parseInt(JSON.stringify(coins)));
    sessionStorage.setItem("user", JSON.stringify(userUser));
    sessionStorage.setItem("userID", JSON.stringify(userUserID));
    
    setUser(userUser);
    if (userUser === "") {
      sessionStorage.removeItem("user");
    }
  };

  return {
    setUser: saveUser,
    user,
    userID: getUserID(),
  };
}