import {Grid, Typography} from '@mui/material';
import TaskCard from './Task/TaskCard';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Pagination } from "@mui/material";
import '../styles/Home.css';
import AnimatedGroupCard from "../components/AnimatedGroupCard";

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

    let [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState({});
    const [maxPages, setMaxPages] = useState(0);
    // const newHeight = props.newHeight;
    const [renderPage, setRenderPage] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        tasks = privateTasks;
        createPages(tasks, 6).then((data) => {
            setPages(data["pages"]);
            setMaxPages(data["maxPages"]);
            setRenderPage(true);
        });
    }, [privateTasks]);

    
    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    const handleRenderPage = () => {
        if (renderPage) {
            return (
                <div>
                    
                        {pages[page] === undefined || pages[page].length === 0 ?
                        
                        <Grid item xs={5.8} width="100%" >
                            <Typography variant="h6" style={{margin:"5vh"}} align="center" color="textSecondary" paragraph>
                                You have no ongoing private tasks currently!
                            </Typography>
                        </Grid>

                        :
                        
                        <>
                            <div className="groups" style ={{marginTop: "3vh", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {/* <div style={{maxHeight:"10px"}}> */}
                            {/* <Grid container spacing = {0} direction = {"row"} style = {{marginLeft: '-8px', marginTop: '10px', width: '100%', justifyContent: 'flex-start', wrap: 'nowrap'}} > */}
                            <Grid container spacing = {0} direction = {"row"} style = {{width: '100%', justifyContent: 'center', wrap: 'nowrap'}} >
                            
                            {/* <Grid xs={6} style = {{marginLeft: '-8px', marginTop: '10px', width: '100%', justifyContent: 'flex-start', wrap: 'nowrap'}}> */}
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
                                        // <Grid item xs={6} key={index} width="100%">
                                            <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} userID = {userID} owner = {userID} />
                                        // </Grid>
                                    );
                                })}
                            </Grid>
                            </div>
                            <div className="pagination" style ={{justifyContent: 'center', display: 'flex', marginTop: '2vh'}}>
                                    <Pagination count={maxPages} page={page} onChange={handlePageChange} color="primary" />
                            </div>
                        </>

                        }
                    
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
            <div style ={{width: '100%'}}>
                {handleRenderPage()}
            </div>
        </>
    );
}
