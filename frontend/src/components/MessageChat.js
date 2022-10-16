import React, {Component} from 'react';

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
                <div>
                    <div style ={{display: 'flex', flexDirection: 'row'}}>
                        <img src = {this.state.profilePicture} style ={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                        <div style ={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                            <h3 >{this.state.userName}</h3>
                            <h4>{this.state.time}</h4>
                        </div>
                    </div>
                    <div style ={{marginLeft: '60px', marginRight: '2%'}}>
                        <p>{this.state.message}</p>
                    </div>
                </div>
            </div>
        );
    }
}