import React, {useState} from 'react';
import  '../../styles/chatBoxv2.css';
import gearIcon from '../../assets/gear.ico';
import GroupModal from './GroupModal';
import ConfirmBox from '../ConfirmBox';
export default function GroupSettings(props) {

    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const toggleLogoutModal = () => {
        setShowModal(!showModal);
        setShowConfirm(!showConfirm);
    }

    const handleLogout = () => {
        setShowModal(!showModal);
        setShowConfirm(!showConfirm);
        props.leaveGroup();
    }
    
    return (
        <div className="dropdown" style ={{display: 'flex', flexDirection: 'column'}}>
            <div>
                <img src={gearIcon} className = "imgAsButton" alt="gearIcon" onClick ={() => setShowModal(!showModal)} />
            </div>
            <div className="dropdown-content" style = {{display: showModal ? 'flex' : 'none', flexDirection: 'column'}}>
                <button onClick = {() => {console.log("settings")}}>Settings</button>
                <button onClick = {() => {props.setShow(true)}}>Create Task</button>
                <button onClick = {() => {toggleLogoutModal()}}>Leave Group</button>
            </div>
            <div>
                <ConfirmBox title = "Leave Group" message = "Are you sure you want to leave this group?" onConfirm = {() => {handleLogout()}} onCancel = {() => {setShowConfirm(false)}} show = {showConfirm}/>
            </div>
        </div>
    )

}
