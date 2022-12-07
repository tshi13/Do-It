import {Grid, Typography} from '@mui/material';
import TaskCard from './Task/TaskCard';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Pagination } from "@mui/material";
import '../styles/Home.css';
import AnimatedGroupCard from "../components/AnimatedGroupCard";
// import groupDao from "../utils/groupDAO";

async function createPages(tasks, numberPerPage = 4) {
    // partition the tasks array up into subarrays
    // of 4 tasks each (called pages)
    let pages = {};
    let maxPages = Math.ceil(tasks.length / numberPerPage);
    // console.log();
    for (let i = 0; i < maxPages; i++) {
        // each page gets only a slice of 4 of the original tasks array
        pages[i + 1] = tasks.slice(i * numberPerPage, i * numberPerPage + numberPerPage);
        // console.log(pages[i + 1]);
    }
    let data = { pages, maxPages };
    return data;
}

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

export default function DisplayTasks(props){

    const privateTasks = props.privateTasks;
    const userID = props.userID;
    const deleteTask = props.deleteTask;
    const setCoins = props.setCoins;

    // const { userID } = props;
    // const [groups, setGroups] = useState([]);
    let [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState({});
    const [maxPages, setMaxPages] = useState(0);
    // const newHeight = props.newHeight;
    const [renderPage, setRenderPage] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        // setTasks([...privateTasks]);
        tasks = privateTasks;
        // console.log(tasks);
        // console.log(privateTasks);
        // const query = window.sessionStorage.getItem("searchQuery");
        // const type = window.sessionStorage.getItem("searchType");
        // groupDao.searchGroup(query, type).then((data) => {
        //     setGroups(data)
            createPages(tasks, 6).then((data) => {
                setPages(data["pages"]);
                setMaxPages(data["maxPages"]);
                setRenderPage(true);
            });
        // });   
    }, [privateTasks]);

    
    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    const handleRenderPage = () => {
        if (renderPage) {
            // let boxWidth = width/6;
            return (
                <div>
                    <div className="groups" style ={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Grid container spacing = {0} style = {{marginLeft: '-8px', marginTop: '10px', width: '100%', justifyContent: 'center'}} >
                            {pages[page].map((task, index) => {
                                let checkedDate = new Date(task.checkedDate);
                                let modifiedDate = new Date(task.checkedDate);
                                modifiedDate.setDate(modifiedDate.getDate() + task.time);
                                let taskData = {
                                    taskName: task.taskName,
                                    coinsEntered: task.coinsEntered,
                                    time: task.time,
                                    id: task._id,
                                    completedList: task.completedList,
                                    type: "private",
                                    userID: null,
                                    lastCheckOff: getFormattedDate(checkedDate),
                                    nextCheckOff: getFormattedDate(modifiedDate),
                                }
        
                                return (
                                        <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} userID = {userID} owner = {userID} />
                                    
                                );
                            })}
                        </Grid>
                    </div>
                    <div className="pagination" style ={{justifyContent: 'center', display: 'flex', marginTop: '5%'}}>
                            <Pagination count={maxPages} page={page} onChange={handlePageChange} color="primary" />
                    </div>
                </div>

            );
        }
    }

    function getFormattedDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    return (
        <>
            {/* <Grid container spacing={0}>
                {
                   
                    tasks.map((task, index) => {
                        let checkedDate = new Date(task.checkedDate);
                        let modifiedDate = new Date(task.checkedDate);
                        modifiedDate.setDate(modifiedDate.getDate() + task.time);
                        let taskData = {
                            taskName: task.taskName,
                            coinsEntered: task.coinsEntered,
                            time: task.time,
                            id: task._id,
                            completedList: task.completedList,
                            type: "private",
                            userID: null,
                            lastCheckOff: getFormattedDate(checkedDate),
                            nextCheckOff: getFormattedDate(modifiedDate),
                        }

                        return (
                            <Grid item xs={5.8} key={index} width="100%" >
                                <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} userID = {userID} owner = {userID} />
                            </Grid>
                        );
                    })
                }
            </Grid> */}
            <div style ={{width: '100%'}}>
                {handleRenderPage()}
            </div>
        </>
    );
}
