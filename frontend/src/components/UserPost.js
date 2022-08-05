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
        this.editPost = this.editPost.bind(this);
    }

    submitEditPost(post_id,newContent) {
        const req = {
            id : post_id,
            content : newContent
        }
        fetch("http://localhost:3001/EditPost",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(body => {
            if (body.success) { alert("Successfully edited post"); }
            else { alert("Failed to edit post"); }
        })
        window.location.reload();

    }

    editPost(e) {
        let postContent = e.target.parentElement.children[1];
        let editBtn = e.target;
        let cancelBtn = e.target.parentElement.children[4];
        let postId = e.target.parentElement.id;
        if (editBtn.innerHTML === "Edit") {
            cancelBtn.innerHTML = "Cancel";
            postContent.contentEditable = true;
            postContent.focus();
            editBtn.innerHTML = "Save"; 
        }
        else{
            cancelBtn.innerHTML = "Delete"
            console.log(postContent.innerHTML);
            this.submitEditPost(postId,postContent.innerHTML);
            postContent.contentEditable = false;
            editBtn.innerHTML = "Edit";
        }
    }

    deletePost(e){
        let postContent = e.target.parentElement.children[1];
        let deleteBtn = e.target;
        let editBtn = e.target.parentElement.children[3];
        let postId = e.target.parentElement.id;
        if (deleteBtn.innerHTML == "Delete") {
            console.log(postId)
        }
        else{
            postContent.blur();
            postContent.contentEditable = false;
            editBtn.innerHTML = "Edit";
            deleteBtn.innerHTML = "Delete";
        }
    }

    render(){
        return(
            <div className="other-post" id={this.props.id}>
                <p>{this.state.author}</p>
                <p contentEditable={false}>{this.state.content}</p>
                <p>{this.state.date}</p>
                <button disabled={this.state.isDisabled} id="edit-post" onClick={this.editPost}>Edit</button>
                <button disabled={this.state.isDisabled} id="delete-post" onClick={this.deletePost}>Delete</button>
            </div>
        )
    }
}

export default UserPost;