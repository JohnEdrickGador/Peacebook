import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.name,
            userId: this.props.userId,
            personalPostCount: null,
            friendsCount: null,
            requestsCount: null,
        };
    }

    componentDidMount() {
        const user = {
            username : this.state.username,
            userId : this.state.userId
        }
        //send get request to server

        //multiple fetch requests
        Promise.all([fetch("http://localhost:3001/GetUserPosts",
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }),fetch("http://localhost:3001/ViewStats",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        })])
       
        .then(([res1,res2]) => {
            return Promise.all([res1.json(),res2.json()])
        })

        .then(([res1,res2]) => {
            this.setState({personalPostCount:res1.length})
            this.setState({friendsCount:res2.friends.length})
            this.setState({requestsCount:res2.requests.length})
        })
    }

    render() {
        return(
            <div className="profile-container">
                <div className="profile-card">
                    <h2>{this.state.username}</h2>
                    <div className="user-stats">
                        <div className="stats-container">
                            <h3>{this.state.personalPostCount}</h3>
                            <h4>Posts</h4>
                        </div>
                        <div className="stats-container">
                            <h3>{`${this.state.friendsCount}`}</h3>
                            <h4>Friends</h4>
                        </div>
                        <div className="stats-container">
                            <h3>{`${this.state.requestsCount}`}</h3>
                            <h4>Pending requests</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;