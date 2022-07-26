import React from "react";  

class UserPost extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            content: "",
            author: "",
            date: null
        }
    }

    render(){
        return(
            <div className="other-post">
                <p>Author</p>
                <p>Content</p>
                <p>Date</p>
            </div>
        )
    }
}

export default UserPost;