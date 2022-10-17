import React, {Component} from 'react';
import GroupCard from './GroupCard';

import '../../styles/GroupList.css';


export default function GroupTaskBar(props) {
    const style = props.style ? props.style : {};
    const groups = props.groups ? props.groups : [];
    const groupCallback = props.groupCallback ? props.groupCallback : () => {};

    return (
        <div style = {style}>
            <div style ={{height: '100%'}}>
                {groups.map((group, index) => {
                    return (
                        <GroupCard groupData = {group} key = {index} groupCallback = {groupCallback} />
                    );
                })}
            </div>
        </div>
    );
}