import React from "react";
import UserPost from "./UserPost";

class Content extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userId : this.props.userId,
            username : this.props.username,
            friends : [],
            posts : []
        }
        this.SubmitPost = this.SubmitPost.bind(this);
    }

    //add submit post functionality
    SubmitPost(e) {
        e.preventDefault();
        //create a post object
        const post = {
            content: document.getElementById('post-input').value,
            authorId: this.state.userId,
            authorName: this.state.username,
            date: Date()
        }
        //send post request to server
        fetch("http://localhost:3001/submitPost",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(body => {
            if (body.success) { alert("Successfully saved post"); }
            else { alert("Failed to save post"); }
        })
        document.getElementById('post-input').value = "";
        window.location.reload();
    }
    
    componentDidMount() {
        const user = {
            username : this.state.username,
            userId : this.state.userId
        }
        //send POST request to server for friendslist
        fetch("http://localhost:3001/GetFriends",
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })

        .then(response => response.json())
        .then(body => {
            if (body != null) {
                // this.setState({friends: body.friends});
                const friends = {
                    friends: body.friends,
                    userId: this.state.userId
                }
                //send POST request to server for posts
                fetch("http://localhost:3001/GetPosts",
                {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(friends)
                })
        
            .then(response => response.json())
            .then(body => {
                if (body != null){
                    this.setState({posts : body});
                }
                })
            }
        })

        
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
                {
                    this.state.posts.map((post,i) => {
                        if (post.authorId === this.state.userId) {
                            return <UserPost author = {post.authorName} content = {post.content} date = {post.date} key = {post._id} id = {post._id} isDisabled = {false}/>
                        }
                        else{
                            return <UserPost author = {post.authorName} content = {post.content} date = {post.date} key = {post._id} id = {post._id} isDisabled = {true}/>
                        }
                        
                    })
                }

                
                

            </div>
            )
        }  
}

export default Content