import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import '../styles/Home.css';
import frontpage from ".././assets/frontpage.png";



export default function Home(props) {
    const [groups, setGroups] = useState([]);
    const [coins, setCoins] = useState(0);


    const loggedInPage = (
        <div className="home">
            <div className="home__container">
                <div className="customContainer" style = {{backgroundColor: props.backgroundColor}}>
                    
                    <div className="home__container__right">
                        <ChatBox userID = {props.userID} groupID = {props.groupID} />
                    </div>
                    <div className="home__container__left">
                        
                    <DisplayTasks userID = {props.userID} groupID = {props.groupID} />
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