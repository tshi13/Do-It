import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import TaskModal from "../components/TaskModal";
import '../styles/Home.css';
import Database from "../utils/database";
import frontpage from ".././assets/frontpage.png";
import CreatGroup from "../components/CreateGroup";


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
                    <div className="home__container__right">
                        <CreatGroup userID = {props.userID}/>
                    </div>
                </div>
            </div>
        </div>
    );

    const homePage = (
        <div className="home">
            <div className="home__container">
                    <div className="customContainer" style = {{backgroundColor: props.backgroundColor}}>
                        <div style ={{float: 'left', width: '50%', marginTop: '10%', marginLeft: '10%'}}>
                            <h1 className="h1" style ={{color: 'black', width: '25%'}}>Achieve Dreams!</h1>
                            <h2 className="h2" style ={{color: 'black', width: '25%'}}>Please login to get started!</h2>
                        </div>
                        <div className="home__container__right" style ={{float: 'right', marginTop: '2%', marginRight: '2%'}}>
                                <img src= {frontpage} alt="logo" />
                        </div>
                </div>
            </div>
        </div>
    );
    return (
        <div>
            {props.isLoggedIn ? loggedInPage : homePage}
        </div>
    );

}