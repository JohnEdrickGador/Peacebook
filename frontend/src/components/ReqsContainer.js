import React from 'react';
import Request from './Request';
class ReqsContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId : localStorage.getItem('userId'),
            notifications : [],
            isEmpty : true,
        }
    } 
    componentDidMount() {
        const req = {
            userId : this.state.userId
        }
        fetch("http://localhost:3001/ViewStats",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(body => {
            if (body.notifications.length > 0) {
                this.setState({isEmpty:false})
                this.setState({notifications:body.notifications})
                console.log(body.notifications)
            } else {
                this.setState({isEmpty:true})
            }
        })
    }

    render() {
        return(
            <div className='friend-requests'>
                <h2>Friend Requests</h2>
                {this.state.isEmpty ? <p>No requests</p> : <Request notifications={this.state.notifications}/>}
            </div>
        )
    }
}

export default ReqsContainer