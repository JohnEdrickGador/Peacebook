import React from 'react';

class Recomms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            userId: this.props.userId,
            display: "flex"
        }

        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    sendFriendRequest(e) {
        e.preventDefault();
        const personId = e.target.parentNode.id;
        const request = {
            receiver : personId,
            sender : localStorage.getItem('userId')
        }
        fetch("http://localhost:3001/SendFriendRequest",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(request)
        })
        alert("Request sent")
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
    render() {
        return(
            <div className='recommendation' id={this.state.userId}>
                <p>{`${this.state.firstname} ${this.state.lastname}`}</p>
                <p>{`${this.state.email}`}</p>
                <button className='add-friend' onClick={this.sendFriendRequest}>Add Friend</button>
            </div>
        )
    }
}

export default Recomms