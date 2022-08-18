import React from 'react';
import RequestTab from './RequestTab';

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications : this.props.notifications
        }
    }
    render() {
        return(
            <div className='recomms-container'>
                {
                    this.state.notifications.map((notification,i) => {
                        return <RequestTab senderId={notification.userId} key={i} notifId={notification._id}/>
                    })
                }
            </div>
        )
    }
}

export default Request