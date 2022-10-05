import {Navigation} from './components/navigation';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './containers/Home';
import TaskCard from './components/taskCard';
import DisplayTasks from './pages/DisplayTasks'

const user = {
  username:"username_test",
  tasks:[
      { name:"name_test1", second_title: "Second title test1", content: "content test1"},
      { name:"name_test2", second_title: "Second title test2", content: "content test2"},
      { name:"name_test3", second_title: "Second title test3", content: "content test3"}
  ]
}

import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import React, { useEffect, useState } from 'react';
import useUser from './utils/useUser';




function App() {

  const { user, setUser } = useUser();


  return (    
    <div style ={{width: '100%', height: '100%'}}>
      <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username = {user} />}/>
          <Route path="/login" element={<Login user = {user} setUser = {setUser} />}/>
          <Route path="/Register" element={<Register user = {user} setUser = {setUser} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
