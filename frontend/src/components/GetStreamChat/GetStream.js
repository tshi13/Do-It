import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import GetStream2 from "./GetStream2";
import 'stream-chat-react/dist/css/v2/index.css';

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



export default function Chatbox(props)  {
	const [channel, setChannel] = useState();
	const [channelName, setChannelName] = useState();
	const {userID,username,groupID,groupName} = props;
	const [flag, setFlag] = useState(false);

	useEffect(()=> {
		const setupChat = async() => {

			if (flag === false) {
				await chatClient.connectUser( //create new user or connect to existing user
			{
				id: "global_moderator108438945109697465891073291325065231",
				name: "global_moderator108438945109697465891073291325065231",
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken("global_moderator108438945109697465891073291325065231"), //use devtoken as usertoken for now
		)	;
			
			// await chatClient.partialUpdateUser({id: userID, set: { role: "global_moderator"}});

			// await chatClient.disconnectUser();

		// 	await chatClient.connectUser( //create new user or connect to existing user
		// 	{
		// 		id: userID,
		// 		name: username,
		// 		image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
		// 	},
		// 	chatClient.devToken(userID), //use devtoken as usertoken for now
		// )	;
	
			let tempChannel = await chatClient.channel('messaging', groupID, {  //make channel
				// add as many custom fields as you'd like
				image: 'https://www.drupal.org/files/project-images/react.png',
				name: groupName
			});

			// await tempChannel.inviteMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' });
			await tempChannel.create(); // create channel
			console.log()
			await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
			setChannel(tempChannel);
			console.log("chat setup completed");
			console.log(groupName, username);
			// chatClient.disconnectUser();

			await chatClient.disconnectUser();
			
			setFlag(true);

			}
			else {
				await chatClient.connectUser( //create new user or connect to existing user
					{
						id: userID,
						name: username,
						image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
					},
					chatClient.devToken(userID), //use devtoken as usertoken for now
				)	;
			}
	
		}
		setupChat();		
	},[groupName]);

	console.log(channel);
	return (
		<GetStream2 userID = {userID} username = {username} groupID = {groupID} groupName = {groupName}/>
	);
}


