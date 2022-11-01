import React, {Component} from 'react';
import GroupCard from './GroupCard';

import '../../styles/GroupList.css';


export default function GroupList(props) {
    const style = props.style ? props.style : {};
    const groups = props.groups ? props.groups : [];
    const groupCallback = props.groupCallback ? props.groupCallback : () => {};
    const newHeight = props.newHeight - 155;
    const setSelectedGroupID = props.setSelectedGroupID ? props.setSelectedGroupID : () => {};

    return (
        <div style = {style} className = "groupList">
            <button className = "buttonDesign" onClick = {() => {setSelectedGroupID(null)}}>Close Chat</button>
            <div className = "overflowWrapper" style = {style}>
                <div style ={{height: newHeight}}>
                    {groups.map((group, index) => {
                        return (
                            <GroupCard groupData = {group} key = {index} groupCallback = {groupCallback} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}