import React from 'react';

class Recomms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            userId: this.props.userId
        }
    }
    render() {
        return(
            <div className='recommendation' id={this.state.userId}>
                <p>{`${this.state.firstname} ${this.state.lastname}`}</p>
                <p>{`${this.state.email}`}</p>
                <button className='add-friend'>Add Friend</button>
            </div>
        )
    }
}

export default Recomms