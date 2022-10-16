import React,  {Component} from 'react';

export default class ProfilePicture extends Component {
    constructor (props) {
        super(props);
        this.state = {
            picture: props.profilePicture,
        }
        this.style = {
            height: this.props.radius ? this.props.radius : 50,
            width: this.props.radius ? this.props.radius : 50,
            borderRadius: '50%',
        }
    }


    render() {
        return (
            <img src={this.state.picture} alt="profile" className="profilePicture" style ={this.style}/>
        );
    }
}