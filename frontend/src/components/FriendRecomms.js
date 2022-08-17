import React from 'react';

class FriendRecomms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId'),
            recommendations: [],
            
        }
    }

    componentDidMount() {
        const user = {
            username : this.state.username,
            userId : this.state.userId
        }
        //get friends
        fetch("http://localhost:3001/GetFriends",
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(body => {
            if (body != null) {
                const newReq = {
                    friendList : body.friends,
                    userId : this.state.userId,
                }
                fetch("http://localhost:3001/RecommendFriends",
                {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newReq)
                })
                .then(response => response.json())
                .then(body => {
                    if (body != null) {
                        this.setState({recommendations:body})
                    }
                })
            }
        })
    }

    render() {
        return(
            <div className='friend-recomms'>
                <h2>People you might know</h2>
                {
                    this.state.recommendations.map((person,i) => {
                        return <p key={i}>{`${person.firstname} ${person.lastname}`}</p>
                    })
                }
            </div>
        )
    }
}

export default FriendRecomms;