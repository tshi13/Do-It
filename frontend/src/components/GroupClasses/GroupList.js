import React, {Component} from 'react';
import GroupCard from './GroupCard';

import '../../styles/GroupList.css';


export default function GroupList(props) {
    const style = props.style ? props.style : {};
    const groups = props.groups ? props.groups : [];
    const groupCallback = props.groupCallback ? props.groupCallback : () => {};

    return (
        <div className = "overflowWrapper" style = {style}>
            <div>
                {groups.map((group, index) => {
                    return (
                        <GroupCard groupData = {group} key = {index} groupCallback = {groupCallback} />
                    );
                })}
            </div>
        </div>
    );
}