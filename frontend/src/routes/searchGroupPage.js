import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import SearchGroupCard from "../components/searchGroupCard";
import groupDao from "../utils/groupDAO";

function SearchGroup(props) {
    const { userID } = props;
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const query = window.sessionStorage.getItem("searchQuery");
        const type = window.sessionStorage.getItem("searchType");
        groupDao.searchGroup(query, type).then((data) => {setGroups(data)});
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