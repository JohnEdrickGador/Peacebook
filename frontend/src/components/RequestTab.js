import React from "react";

class RequestTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            senderId : this.props.senderId,
            notifId : this.props.notifId,
            sender : {},
        }

        this.AcceptRequest = this.AcceptRequest.bind(this);
        this.RejectRequest = this.RejectRequest.bind(this);
    }
    componentDidMount() {
        const req = {
            userId : this.state.senderId
        }
        fetch("http://localhost:3001/ViewStats",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(body => {
            if (body != null) {
                this.setState({sender: body})
                
            } else {
                console.log("No user detected")
            }
        })
    }
    AcceptRequest(e) {
        e.preventDefault();
        const newFriend = e.target.parentNode.id
        const notif = e.target.parentNode.parentNode.id
        const newReq = {
            userId : localStorage.getItem('userId'),
            newFriend : newFriend,
            notifId : notif
        }
        fetch("http://localhost:3001/AcceptRequest",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newReq)
        })

        window.location.reload();
    }
    RejectRequest(e) {
        e.preventDefault();
        const newFriend = e.target.parentNode.id
        const notif = e.target.parentNode.parentNode.id
        const newReq = {
            userId : localStorage.getItem('userId'),
            newFriend : newFriend,
            notifId : notif
        }
        fetch("http://localhost:3001/RejectRequest",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newReq)
        })

        window.location.reload();
    }
    render() {
        return(
            <div className="request-tab" id={this.state.notifId}>
                <p>{`${this.state.sender.firstname} ${this.state.sender.lastname}`}</p>
                <p>{`${this.state.sender.email}`}</p>
                <div className="button-container" id={this.state.sender._id}>
                    <button onClick={this.AcceptRequest}>Accept</button>
                    <button onClick={this.RejectRequest}>Reject</button>
                </div>
            </div>
        )
    }
}

export default RequestTab