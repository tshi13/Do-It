import React, {useState, useEffect} from 'react';
import groupDAO from '../utils/groupDAO';
import InviteGroupCard from '../components/InviteGroupCard';
import '../styles/IntroPage.css';


export default function InvitePage(props) {

    const userID = props.userID;
    const [inviteID, setInviteID] = useState("");
    const [group, setGroup] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/ID=') + 4);
        if(userID !== null) {
            if(id.match( '^[A-Za-z0-9]') && id.length === 10) {
                groupDAO.searchGroup(id, "ID").then((group) => {
                    if(group[0] !== null) {
                        setGroup(group[0]);
                    }
                });
                setInviteID(id);
            }  else {
                setError("Invalid invite ID");
            }
        } else {
            setError("You must be logged in to join a group");
        }
    }, [userID]);


    return (
        <div>
            <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginTop: '5%'}}>
                {
                inviteID ? 
                <div> 
                    {group.length !== 0 ? <InviteGroupCard item = {group} userID={userID}  /> : <h2>Group not found</h2>}
                </div>
                : <div>
                    <h2>{error}</h2>
                    {
                        error === "Invalid invite ID" ? <h3>Invite ID must be 10 characters long and contain only letters and numbers</h3> : null
                    } {
                        error === "You must be logged in to join a group" ? <h3>Click <a href = "/">here</a> to login</h3> : null
                    }
                </div>
            }
            </div>
        </div>
    );
}