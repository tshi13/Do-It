import React, {Component} from 'react';

import '../styles/MessageChat.css';

export default class MessageChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style ? this.props.style : {},
            userName: this.props.username,
            time: this.props.time,
            message: this.props.message,
            profilePicture: this.props.profilePicture,
        };
    }
    
    render() {
        return (
            <div style ={this.state.style}>
                <div className = "chat">
                    <div className = "profileBox">
                        {this.state.profilePicture ?  <img src={`data:image/png;base64,${this.state.profilePicture}`} alt="v" className="profilePicture"/> : <img className = "profilePicture" src = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt = "profilePicture"/>}
                    </div>
                    <div className = "content"> 
                        <div className = "textBox">
                            <div className = "userName">
                                {this.state.userName}
                            </div>
                            {this.state.message}
                        </div>
                        <div className = "time">
                            {this.state.time}
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}