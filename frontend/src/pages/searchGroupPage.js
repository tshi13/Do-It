import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import GroupCard from "../components/groupCard";
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
    <>
        {
            groups?.map((item, index) => {
                return (
                    <GroupCard key = {index} item={item} userID={userID} />
                );
            })
        }
    </>
   );
   
}

export default SearchGroup;