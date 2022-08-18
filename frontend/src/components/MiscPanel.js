import React from 'react';
import FriendRecomms from './FriendRecomms';
class MiscPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className='misc-container'>
                <FriendRecomms />
                <div className='friend-requests'>
                    <h2>Friend requests</h2>
                </div>
            </div>
        )
    }
}

export default MiscPanel;