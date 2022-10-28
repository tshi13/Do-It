import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

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


	useEffect(()=> {
		const setupChat = async() => {
			await chatClient.connectUser( //create new user or connect to existing user
			{
				id: userID,
				name: username,
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken(userID), //use devtoken as usertoken for now
		)	;
	
			let tempChannel = await chatClient.channel('messaging', groupID, {  //make channel
				// add as many custom fields as you'd like
				image: 'https://www.drupal.org/files/project-images/react.png',
				name: groupName
			});
			await tempChannel.create(); // create channel
			console.log()
			await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
			setChannel(tempChannel);
			console.log("chat setup completed");
			console.log(groupName, username);
		}
		setupChat();		
	},[groupName]);

	console.log(channel);
	return (
		<Chat client={chatClient} theme='str-chat__theme-light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
	);
}


