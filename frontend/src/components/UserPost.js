import React from "react";  

class UserPost extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            content: this.props.content,
            author: this.props.author,
            date: this.props.date,
            id: this.props.id,
            isDisabled: this.props.isDisabled
        }
    }

    componentDidMount() {

    }

    render(){
        return(
            <div className="other-post" id={this.props.id}>
                <p>{this.state.author}</p>
                <p>{this.state.content}</p>
                <p>{this.state.date}</p>
                <button disabled={this.state.isDisabled}>Edit</button>
                <button disabled={this.state.isDisabled}>Delete</button>
            </div>
        )
    }
}

export default UserPost;