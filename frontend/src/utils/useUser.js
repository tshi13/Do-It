import { useState } from "react";

export default function useUser() {
  const getUser = () => {
    const UserString = sessionStorage.getItem("user");
    const userUser = JSON.parse(UserString);
    return userUser;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (userUser) => {
    sessionStorage.setItem("user", JSON.stringify(userUser));
    setUser(userUser);
    if (userUser === "") {
      sessionStorage.removeItem("user");
    }
  };

  return {
    setUser: saveUser,
    user,
  };
}