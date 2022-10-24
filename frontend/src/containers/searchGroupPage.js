import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import SearchGroupCard from "../components/searchGroupCard";
import groupDao from "../utils/groupDAO";

function SearchGroup(props) {
    const { userID } = props;
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const query = window.sessionStorage.getItem("searchQuery");
            groupDao.searchGroup(query).then((data) => {setGroups(data)});
        }
        fetchData();
    }, []);

   
   return (
    <div style ={{display: 'flex', flexDirection: 'row'}}>
        {
            groups?.map((item, index) => {
                return (
                    <SearchGroupCard key = {index} item={item} userID={userID} />
                );
            })
        }
    </div>
   );
   
}

export default SearchGroup;