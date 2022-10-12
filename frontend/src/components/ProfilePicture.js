import React,  {Component} from 'react';

export default class ProfilePicture extends Component {
    constructor (props) {
        super(props);
        this.state = {
            picture: props.profilePicture,
        }
    }

    style = {
        profilePicture: {
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            marginTop: '0px',
        }, 
    }

    render() {
        return (
            <img src={this.state.picture} alt="profile" className="profilePicture" style ={this.style.profilePicture}/>
        );
    }
}