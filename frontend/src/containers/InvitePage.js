import React, {useState, useEffect} from 'react';
import groupDAO from '../utils/groupDAO';
import InviteGroupCard from '../components/InviteGroupCard';

export default function InvitePage(props) {

    const userID = props.userID;
    const [inviteID, setInviteID] = useState("");

    const [group, setGroup] = useState([]);


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
                return false;
            }
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
                :<h2>Invalid Invite ID or you need to log in</h2>}
            </div>
        </div>
    );
}