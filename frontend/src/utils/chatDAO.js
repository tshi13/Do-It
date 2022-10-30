import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('hm7ff5yafac3');

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
	return ("created");
}

export default class chatDAO {
	static createUser(userID, username) {
		return createUser(userID, username);
	}
} 