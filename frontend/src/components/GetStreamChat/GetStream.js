import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('hm7ff5yafac3');
const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!
let channel;

(async () => {
	await chatClient.connectUser( //create new user or connect to existing user
		{
			id: 'DEV',
			name: 'DEV',
			image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
		},
		chatClient.devToken(userToken), //use devtoken as usertoken for now
	);

	channel = chatClient.channel('messaging', 'TEST', {  //make channel
		// add as many custom fields as you'd like
		image: 'https://www.drupal.org/files/project-images/react.png',
		name: 'TEST CHANNEL'
	});
	await channel.create(); // create channel
	await channel.addMembers(['DEV'],{ text: 'Dev joined the channel.' }); // add someone to channel
})();




export default function Chatbox(props)  {
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


