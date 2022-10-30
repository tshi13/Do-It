import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import GetStream2 from "./GetStream2";
import 'stream-chat-react/dist/css/v2/index.css';
import chatDAO from '../../utils/chatDAO';

const chatClient = new StreamChat('hm7ff5yafac3');
const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!


// (async () => {
// 	await chatClient.connectUser( //create new user or connect to existing user
// 		{
// 			id: 'DEV',
// 			name: 'DEV',
// 			image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
// 		},
// 		chatClient.devToken(userToken), //use devtoken as usertoken for now
// 	);

// 	channel = chatClient.channel('messaging', 'TEST', {  //make channel
// 		// add as many custom fields as you'd like
// 		image: 'https://www.drupal.org/files/project-images/react.png',
// 		name: 'TEST CHANNEL'
// 	});
// 	await channel.create(); // create channel
// 	await channel.addMembers(['DEV'],{ text: 'DEV joined the channel.' }); // add someone to channel
	
// })();


// the purpose of this function is to login as a global_moderator
// and use the global_moderator to add the userID to the chat
// then we will call <GetStream2 /> to form a whole new re-render
// so that the userID can login and send messages (done in <GetStream2 />)

// re-render was suggested by the following link:
// https://bytemeta.vip/repo/GetStream/stream-chat-react/issues/1188
		
export default function Chatbox(props)  {
	const [channel, setChannel] = useState();
	const [channelName, setChannelName] = useState();
	const {userID,username,groupID,groupName} = props;
	const [flag, setFlag] = useState(false);

	useEffect(()=> {
		const setupChat = async() => {
			// await chatDAO.createUser(userID, username); // DO NOT DELETE THIS LINE! THIS LINE WORKS AND 
			// ACTS AS AN EXAMPLE OF HOW WE CAN DO STUFF WITHOUT INTRODUCING MULTIPLE RENDERS. THIS FUNCTIONALITY IS ALREADY ACHIEVED IN USERDAO addUser(). 

		
			//log in as global_moderator, add the userID to the group
				await chatClient.connectUser( //create new user or connect to existing user
			{
				id: "global_moderator108438945109697465891073291325065231",
				name: "global_moderator108438945109697465891073291325065231",
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken("global_moderator108438945109697465891073291325065231"), //use devtoken as usertoken for now
		);
				
		// getting the group
			let tempChannel = await chatClient.channel('messaging', groupID, {  //make channel
				// add as many custom fields as you'd like
				image: 'https://www.drupal.org/files/project-images/react.png',
				name: groupName
			});

			
			// using the global_moderator logged in to create or recreate the channel
			// and add the userID to become a member of the group 
			await tempChannel.create(); // create channel
			await tempChannel.addMembers([{user_id:userID}],{ text: `${username} joined the channel.` }); // add someone to channel
			setChannel(tempChannel);
			console.log("chat setup completed 1");
			console.log(groupName, username);

			// logging out of the global_moderator, since we are done with the adding of users
			await chatClient.disconnectUser();
			setFlag(true);	
		}

		if (username && groupName){
			setupChat();		
		}
	},[username, groupName]);


	if (flag ){
		return (
		<GetStream2 userID = {userID} username = {username} groupID = {groupID} groupName = {groupName}/>		
	);
	}
}


