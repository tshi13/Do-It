import {StreamChat} from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, Avatar } from  'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('hm7ff5yafac3');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibXV0ZS1kYXJrbmVzcy00In0.O80JYT4w7LNhR-3XDE_rrm6ka0r7DnWxes2K3EwmY1o';


chatClient.connectUser(
  {
    id: 'mute-darkness-4',
    name: 'mute-darkness-4',
    image: 'https://getstream.io/random_png/?id=mute-darkness-4&name=mute-darkness-4',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['mute-darkness-4'],
});


const GroupPicture = (props) => {
    const { groupPicture } = props ? props : "";
    if(groupPicture !== "") {
        return (
            <Avatar image={`data:image/png;base64,${groupPicture}`} name="group image" size={40} />
        );
    } else {
        return (
            <img src="https://i.imgur.com/pPJmXV7.png" alt="group image" className="group image"/>
        );
    }
}



export default function Chatbox(props)  {

    const groupName = props.groupName;
    const newHeight = props.newHeight ? props.newHeight : '100%';
    const groupPic = props.groupPicture;


	return (
		<div style = {{height: newHeight}} >
			<Chat client={chatClient} theme='str-chat__theme-light'>
				<Channel channel={channel}>
					<Window>
						<ChannelHeader title = {groupName} image = {GroupPicture(groupPic)} />
						<MessageList />
						<MessageInput />
					</Window>
					<Thread />
				</Channel>
			</Chat>
		</div>
	);
}


