import React from 'react';
import {StreamChat} from 'stream-chat'
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useClient } from './UseClient';
import 'stream-chat-react/dist/css/v2/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibXV0ZS1kYXJrbmVzcy00In0.O80JYT4w7LNhR-3XDE_rrm6ka0r7DnWxes2K3EwmY1o';

const user = {
  id: 'mute-darkness-4',
  name: 'mute-darkness-4',
  image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
};

const filters = { type: 'messaging', members: { $in: ['mute-darkness-4'] } };
const sort = { last_message_at: -1 };



export default function Chatbox(props)  {
	const chatClient = useClient({ apiKey: 'hm7ff5yafac3', userData: user, tokenOrProvider: userToken });
	if (!chatClient) {
    return <LoadingIndicator />;
  }

	const channel = chatClient.channel('messaging', 'custom_channel_id', {
		// add as many custom fields as you'd like
		image: 'https://www.drupal.org/files/project-images/react.png',
		name: 'Talk about React',
		members: ['mute-darkness-4'],
	});
	
	return (
		<Chat client={chatClient} theme='str-chat__theme-light'>
      {/* <ChannelList filters={filters} sort={sort} /> */}
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


