import React from 'react';
import FriendRecomms from './FriendRecomms';
import ReqsContainer from './ReqsContainer';
class MiscPanel extends React.Component {    
    render() {
        return(
            <div className='misc-container'>
                <FriendRecomms />
                <ReqsContainer />
            </div>
        )
    }
}

export default MiscPanel;