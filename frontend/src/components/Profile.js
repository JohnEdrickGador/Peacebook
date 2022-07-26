import React from "react";

class Profile extends React.Component {
    render() {
        return(
            <div className="profile-container">
                <div className="profile-card">
                    <h2>{this.props.name}</h2>
                    <div className="user-stats">
                        <div className="stats-container">
                            <h3>5</h3>
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