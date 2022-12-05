import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import CreateGroup from "../components/Group/CreateGroupButton";
import GroupComponent from "../components/Group/GroupComponent";
import GroupList from "../components/Group/GroupList";
import GroupSlideshow from "../components/Group/GroupSlideShow";
import groupDAO from '../utils/groupDAO';
import {Buffer} from 'buffer';
import DisplayTasks from "../components/DisplayTasks";
import PersonalTaskModal from "../components/Task/PersonalTaskModal";
import taskDAO from '../utils/taskDAO';
import userDAO from '../utils/userDAO';
import { Chart } from "react-google-charts";


import Tutorial from "../components/Tutorial";
import "../styles/GroupList.css"
import coin from '../assets/coin.webp';

export default function Home(props) {
    const [groups, setGroups] = useState([]);
    const setCoins = props.setNavCoins;
    const setSelectedGroupID = props.setSelectedGroup;
    const selectedGroupID = props.selectedGroup;
    const [selectedGroupPicture, setSelectedGroupPicture] = useState(null);
    const userID = props.userID;
    const setNotifications = props.setNotifications;
    const [showTasks, setShowTasks] = useState(false);
    const [privateTasks, setPrivateTasks] = useState([]);
    const [coins, setLocalCoins] = useState(0);
    const [ongoingPrivateTasks, setOngoingPrivateTasks] = useState();
    const [completedPrivateTasks, setCompletedPrivateTasks] = useState();
    const [showTutorial, setShowTutorial] = useState(true);

    const newHeight = props.newHeight;

		const pieData = [
			["Task", "Hours per Day"],
			["Ongoing Tasks", ongoingPrivateTasks],
			["Completed Tasks", completedPrivateTasks],
		];

		
		const options = {
			title: (completedPrivateTasks == 0 && ongoingPrivateTasks == 0)? "Create a task to see your progress here!" :"Private tasks progress",
			titleTextStyle: {
        fontSize: 18, // 12, 18 whatever you want (don't specify px)
        bold: true
    }
		};

		// get data for pie chart 
		useEffect(() => {
			userDAO.getUserData(userID).then((data) => {
				setCompletedPrivateTasks(data.completedPrivateTasks);
				setOngoingPrivateTasks(data.ongoingPrivateTasks);
			})
		},[showTasks]);

    
    useEffect(() => {
        //grab groups from database for userID
        //set groups to the groups from the database
        groupDAO.getGroups(userID).then((groups) => {
            let groupList = [];
            for(let i = 0; i < groups.length; i++) {
                let groupData = {
                    id: groups[i]._id,
                    groupPicture: groups[i].groupPicture ? Buffer.from(groups[i].groupPicture).toString('base64') : null,
                }
                groupData = {...groups[i], ...groupData};
                groupList.push(groupData);
            }
            setGroups(groupList);


        });
        setLocalCoins(sessionStorage.getItem("coins"));
        
    }, []);

    
    useEffect(() => {
        userDAO.getTasks(userID)
            .then((tasks) => {
                if (tasks) {
                    let removeNull = tasks.filter((task) => task !== null);
                    setPrivateTasks(removeNull);
                }
            });
       
    }, []);

    useEffect(() => {
        let shownTut = sessionStorage.getItem("shownTutorial");
        shownTut = "false"; // TODO: REMOVE THIS LINE AFTER TESTING

        if (shownTut === "false" || shownTut === null ) {
            setShowTutorial(true);
        } else {
            setShowTutorial(false);
        }
    }, []);

    

    const deleteTaskCallback = (taskID) => {
        taskDAO.deleteTask(userID, taskID).then(() => {
            setPrivateTasks(privateTasks.filter((task) => task._id !== taskID));
        });
    }

    const taskCallback = (task) => {
        setPrivateTasks([...privateTasks, task]);
        props.setNavCoins(sessionStorage.getItem("coins"));
    }

    const groupCallback = (group) => {
        let newGroup = {
            id: group._id,
            groupName: group.groupName,
            groupPicture: group.groupPicture ? Buffer.from(group.groupPicture).toString('base64') : null,
        }
        setGroups([...groups, newGroup]);
    }

    const leaveGroupCallback = (groupID) => {
        let newGroups = groups.filter((group) => {
            return group.id !== groupID;
        });
        setGroups(newGroups);
        setSelectedGroupID(null);
    }


    const setSelectedID = (groupID) => {
        setSelectedGroupID(groupID);

        let groupPicture = groups.filter((group) => {
            return group.id === groupID;
        });

        let groupPictureString = groupPicture[0].groupPicture;
        setSelectedGroupPicture(groupPictureString);
    }

    const checkUserStillInGroup = (groupID) => {
        if(groupID !== null) {
            let group = groups.filter((group) => {
                return group.id === groupID;
            });
            if (group.length === 0) {
                setSelectedGroupID(null);
            }
            return group.length !== 0;
        } else {
            return false;
        }
    }
    
    const handleShowTasks = () => {
        setShowTasks(!showTasks);
    }

    const handleShowTutorial = () => {
        setShowTutorial(true);
    }
    

    const renderGroup = () => {
                    
        if(selectedGroupID !== null && checkUserStillInGroup(selectedGroupID) && !showTasks)  {
            return (
                <GroupComponent setNotifications = {setNotifications} setCoins = {setCoins} groupPicture = {selectedGroupPicture} groupID = {selectedGroupID} userID = {props.userID} username = {props.username} leaveGroupCallback = {leaveGroupCallback} newHeight = {newHeight}  />
            );
        } else {
            return (
                <div>
                    <div className = "buttonList" style = {{display: 'flex', flexDirection: 'column', float: 'left', width: '25%'}} >
                        <button className="buttonDesign" onClick={() => handleShowTasks()}>{!showTasks ? "Private Tasks" : "Back"}</button>
                        <button className="buttonDesign" onClick={() => {window.location.href = "/profile"}}>Go To Profile</button>
                        <button className="buttonDesign" onClick={() => handleShowTutorial()}>Tutorial</button>
                        <button className="buttonDesign" onClick={() => handleShowTutorial()}>Create Personal Task</button>
                        <CreateGroup groupCallback = {groupCallback} userID = {props.userID} style = {{marginRight: '0px'}} />
                    </div>
                    <div className = "personalTaskGrid" style = {{display: 'flex', flexDirection: 'column', float: 'left', width: '50%', marginLeft: '4%'}}>
                        {/* <CreateGroup groupCallback = {groupCallback} userID = {props.userID} style = {{marginRight: '0px'}} /> */}
                        {showTasks ? 
                        <div>
                        {/* <PersonalTaskModal style ={{float: 'right', margin: '1vw'}} taskCallback = {taskCallback} userID = {userID}/> */}
                        <DisplayTasks setCoins = {props.setNavCoins} userID={userID} privateTasks = {privateTasks} deleteTask = {deleteTaskCallback} />
                        </div>
                        : null }
                    </div>
                    <div className = "groupList" style = {{display: 'flex', flexDirection: 'column', float: 'right', marginRight: '4%', marginTop: '2%', alignText: 'right'}}>
                        <a className = "purchaseCoins" href = "/purchaseCoins">Purchase Coins</a>
                        <p style = {{fontWeight: 'bold'}}>Current Coins: {coins}</p>
                    </div>
										

                    {showTasks ? 
                        <div>
                        <PersonalTaskModal style ={{float: 'right', margin: '1vw'}} taskCallback = {taskCallback} userID = {userID}/>
                        <DisplayTasks setCoins = {props.setNavCoins} userID={userID} privateTasks = {privateTasks} deleteTask = {deleteTaskCallback} />
                        </div>
                        : 
												
                        <div style = {{position:'relative', width: '100%', display: 'flex'}}>
                        <Chart
                            chartType="PieChart"
                            data={pieData}
                            options={options}
                            width={"60%"}
                            height={"400px"}
                        />
                        <GroupSlideshow groups = {groups} setSelectedID = {setSelectedID} style = {{width: '50vh', float: 'right'}} />
                        </div> }
                </div>
            )
        }
    }

    return (
        <div>
            <div className="home" style = {{display: 'flex', flexDirection: 'row'}}>
                <Tutorial showTutorial = {showTutorial} setShowTutorial = {setShowTutorial} />
                <div className="groupList" style ={{backgroundColor: '#33DCFF', padding: '10px', height: newHeight}}>
                    <div className ="sideBar" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <GroupList groups={groups} groupCallback = {setSelectedID} newHeight = {newHeight} setSelectedGroupID = {setSelectedGroupID}/>
                        <CreateGroup userID = {props.userID} groupCallback = {groupCallback}/>
                    </div>
                </div>
                <div style = {{width: '100%'}}>
                    {renderGroup()}
                </div>
            </div>
        </div>

    );

}