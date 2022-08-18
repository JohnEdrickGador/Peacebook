import React from 'react';
import Recomms from './Recomms';
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
                <div className='recomms-container'>
                {
                    this.state.recommendations.map((person,i) => {
                        return <Recomms firstname={person.firstname} lastname={person.lastname} email={person.email} userId={person._id} key={i}/>
                    })
                }
                </div>
            </div>
        )
    }
}

export default FriendRecomms;