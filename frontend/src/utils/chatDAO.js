import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('hm7ff5yafac3');

//CREATE A USER
async function createUser(userID, username) {
	await chatClient.connectUser( //create new user or connect to existing user
			{
				id: userID,
				name: username,
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken(userID) //use devtoken as usertoken for now
		);
	await chatClient.disconnectUser();
}

//ADD A USER TO EXISTING CHANNEL
async function moderatorAddUser(userID, username, groupID, groupName) {
	await chatClient.connectUser( //create new user or connect to existing user
	{
		id: "global_moderator108438945109697465891073291325065231",
		name: "global_moderator108438945109697465891073291325065231",
		image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
	},
	chatClient.devToken("global_moderator108438945109697465891073291325065231"), //use devtoken as usertoken for now
	);

	// getting the channel
	let tempChannel = await chatClient.channel('messaging', groupID, { 
		image: 'https://www.drupal.org/files/project-images/react.png',
		name: groupName
	});

	await tempChannel.addMembers([{user_id:userID}],{ text: `${username} joined the channel.` }); // add someone to channel
	await chatClient.disconnectUser();
}

// CREATE A NEW CHANNEL
async function createChannel(userID,username,groupID,groupName) {
	await chatClient.connectUser( //create new user or connect to existing user
			{
				id: userID,
				name: username,
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken(userID) //use devtoken as usertoken for now
		);

	let tempChannel = await chatClient.channel('messaging', groupID, { 
		image: 'https://www.drupal.org/files/project-images/react.png',
		name: groupName
	});

	await tempChannel.create();
	await tempChannel.addMembers([{user_id:userID}],{ text: `${username} joined the channel.` }); // add someone to channel
	await chatClient.disconnectUser();
}

export default class chatDAO {
	static createUser(userID, username) {
		return createUser(userID, username);
	}

	static moderatorAddUser(userID, username, groupID) {
		return moderatorAddUser(userID, username, groupID);
	}

	static createChannel(userID,username,groupID,groupName){
		return createChannel(userID,username,groupID,groupName);
	}
} 