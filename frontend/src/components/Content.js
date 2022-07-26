import React from "react";
import UserPost from "./UserPost";

class Content extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userId : localStorage.getItem("userId")
        }
        this.SubmitPost = this.SubmitPost.bind(this);
    }
    //add submit post functionality
    SubmitPost(e) {
        e.preventDefault();
        //create a post object
        const post = {
            content: document.getElementById('post-input').value,
            author: this.state.userId
        }
        //send post request to server
        fetch("http://localhost:3001/submitPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(body => {
            if (body.success) { alert("Successfully saved post"); }
            else { alert("Failed to save post"); }
        })
        document.getElementById('post-input').value = "";
    }

        render() {
            return (
                <div className="content">
                <h1>Peacebook Posts</h1>
                <div className="user-post">
                    <textarea placeholder="What's on your mind?" id="post-input"></textarea>
                    <div className="btn-cont">
                        <button className="btn-post" onClick={this.SubmitPost}>Post</button>
                    </div>
                </div>
                <UserPost />
                <UserPost />
                <UserPost />
            </div>
            )
        }  
}

export default Content