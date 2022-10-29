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



// the purpose of this function in <GetStream2 /> is to actually display the chat
// after the user has already been added to the chat by the global_moderator
// back in <GetStream />

export default function Chatbox2(props)  {
	const [channel, setChannel] = useState();
	const [channelName, setChannelName] = useState();
	const {userID,username,groupID,groupName} = props;
	const [flag, setFlag] = useState(false);

	useEffect(()=> {
		const setupChat = async() => {
	
      // connecting the actual user with userID
			await chatClient.connectUser( //create new user or connect to existing user
			{
				id: userID,
				name: username,
				image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
			},
			chatClient.devToken(userID), //use devtoken as usertoken for now
		)	;
	
      // creating or recreating the channel
			let tempChannel = await chatClient.channel('messaging', groupID, {  //make channel
				// add as many custom fields as you'd like
				image: 'https://www.drupal.org/files/project-images/react.png',
				name: groupName
			});

			
      // commented out the below tempChannel.create(), because I think
      // this was already done in <GetStream />
      // although I could be mistaken, maybe the below line
      // should be added in -- not sure -Chris

      // await tempChannel.create(); // create channel
			console.log()
			// await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
			setChannel(tempChannel);
			console.log("chat setup completed");
			console.log(groupName, username);
	
		}
		setupChat();		
	},[groupName]);

	console.log(channel);
	return (
    // actually rendering the chat since the user has been added to the
    // group already
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


