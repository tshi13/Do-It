import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import GroupCard from "../components/groupCard";
import axios from 'axios';

function SearchGroup(props) {
    const { userID } = props;
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const query = window.sessionStorage.getItem("searchQuery");
        let res = await axios.get('/searchGroup/' + query).then(data => data);
        setGroups(res.data);
        }
            fetchData();
    }, [groups]);
   
    

   return (
    <>
        {
            groups?.map((item, index) => {
                return (
                    <GroupCard item={item} userID={userID} />
                );
            })
        }
    </>
   );
   
}

export default SearchGroup;