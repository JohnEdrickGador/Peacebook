import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.name,
            userId: this.props.userId,
            personalPostCount: 0
        };
    }

    componentDidMount() {
        const user = {
            username : this.state.username,
            userId : this.state.userId
        }
        //send get request to server
        fetch("http://localhost:3001/GetUserPosts",
    {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    .then(response => response.json())
    .then(body => {
        if (body != null){
            this.setState({personalPostCount:body.length})
        }
        
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
                            <h3>2</h3>
                            <h4>Friends</h4>
                        </div>
                        <div className="stats-container">
                            <h3>3</h3>
                            <h4>Pending requests</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;