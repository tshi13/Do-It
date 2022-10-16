import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import '../styles/Home.css';
import frontpage from ".././assets/frontpage.png";
import CreatGroup from "../components/CreateGroup";
import GroupComponent from "../components/GroupClasses/GroupComponent";
import GroupList from "../components/GroupClasses/GroupList";
import groupDAO from '../utils/groupDAO';



export default function Home(props) {
    const [groups, setGroups] = useState([]);
    
    const [coins, setCoins] = useState(0);
    const [selectedGroupID, setSelectedGroupID] = useState(null);
    const userID = props.userID;

    useEffect(() => {
        //grab groups from database for userID
        //set groups to the groups from the database
        console.log();
        groupDAO.getGroups(userID).then((groups) => {
            let groupList = [];
            for(let i = 0; i < groups.length; i++) {
                let groupData = {
                    id: groups[i]._id,
                    groupName: groups[i].groupName,
                }
                groupList.push(groupData);
            }
            setGroups(groupList);
        });

    }, []);


    const setSelectedID = (groupID) => {
        setSelectedGroupID(groupID);
    }

    const renderGroup = () => {
        if(selectedGroupID !== null) {
            return (
                <GroupComponent groupID = {selectedGroupID} userID = {props.userID} username = {props.username}/>
            );
        }
    }

    const remiainingHeightOfPage = window.innerHeight - 100;

    const loggedInPage = (
        <div className="home">
            <div className="home__container">
                <div className="customContainer" style = {{backgroundColor: props.backgroundColor}}>
                    <div className="home__container__left">
                  </div>
                    <div className="home__container__right">
                        <ChatBox userID = {props.userID} groupID = {props.groupID} />
                    </div>
                    <div className="home__container__right">
                        <CreatGroup userID = {props.userID}/>
                    </div>
        <div className="home" style = {{display: 'flex', flexDirection: 'row', height: '100%'}}>
            <div className="groupList" style ={{backgroundColor: '#99ffdd', padding: '10px'}}>
                <div className ="sideBar" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', height: {remiainingHeightOfPage}}}>
                    <button className = "buttonDesign" onClick = {() => {setSelectedGroupID(null)}}>Close Chat</button>
                    <GroupList groups={groups} groupCallback = {setSelectedID} />
                </div>
            </div>
            <div style = {{width: '100%'}}>
                {renderGroup()}
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
                                <img src= {frontpage} alt="frontPicture" />
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