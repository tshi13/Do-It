import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import TaskModal from "../components/TaskModal";
// import TaskModal from "../components/TaskModal";
import '../styles/Home.css';
import Database from "../utils/database";

// const api = axios.create({
//     baseURL: `http://localhost:5000/`,
// });


export default function Home(props) {
    const loggedInPage = (
        <div className="home">
            <div className="home__container">
                <div className="customContainer" style = {{backgroundColor: props.backgroundColor}}>
                    <h1 className="title">Welcome to the Home Page, {props.username}!</h1>
                    <div className="home__container__left">
                  </div>
                    <div className="home__container__right">
                        <ChatBox userID = {props.userID} groupID = {props.groupID} />
                    </div>
                </div>
            </div>
        </div>
    );

    const homePage = (
        <div className="home">
            <p>Home Page</p>
        </div>
    );
    return (
        <div>
            {props.isLoggedIn ? loggedInPage : homePage}
        </div>
    );

}