import React, { useState, useEffect, useLayoutEffect } from "react";
import Grid from '@mui/material/Grid';
import { Pagination } from "@mui/material";
import '../styles/Home.css';
import AnimatedGroupCard from "../components/AnimatedGroupCard";
import groupDao from "../utils/groupDAO";


async function createPages(groups, numberPerPage = 6) {
    let pages = {};
    let maxPages = Math.ceil(groups.length / numberPerPage);
    for (let i = 0; i < maxPages; i++) {
        pages[i + 1] = groups.slice(i * numberPerPage, i * numberPerPage + numberPerPage);
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
    

function SearchGroup(props) {
    const { userID } = props;
    const [groups, setGroups] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState({});
    const [maxPages, setMaxPages] = useState(0);
    const newHeight = props.newHeight;
    const [renderPage, setRenderPage] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        const query = window.sessionStorage.getItem("searchQuery");
        const type = window.sessionStorage.getItem("searchType");
        groupDao.searchGroup(query, type).then((data) => {
            setGroups(data)
            createPages(data, 10).then((data) => {
                setPages(data["pages"]);
                setMaxPages(data["maxPages"]);
                setRenderPage(true);
            }
            );
        });   
    }, []);

    
    const handlePageChange = (e) => {
        let intPage = parseInt(e.target.textContent);
        setPage(intPage);
    };

    const handleRenderPage = () => {
        if (renderPage) {
            let boxWidth = width/6;
            return (
                <div>
                    <div className="groups" style ={{display: 'flex', flexDirection: 'column', justifyContent: 'center', allignItems: 'center'}}>
                        <Grid container spacing = {2} style = {{marginLeft: '-8px', marginTop: '10px', width: '100%', justifyContent: 'center'}} >
                            {pages[page]?.map((item, index) => (
                                <Grid item key = {index}>
                                    <AnimatedGroupCard style = {{maxWidth: boxWidth, height: boxWidth}} key = {index} item={item} userID={userID}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="pagination" style ={{justifyContent: 'center', display: 'flex'}}>
                            <Pagination count={maxPages} page={page} onChange={handlePageChange} />
                    </div>
                </div>

            );
        }
    }
    
   return (
        <div style ={{width: '100%'}}>
            {handleRenderPage()}
        </div>
    );
   
}

export default SearchGroup;