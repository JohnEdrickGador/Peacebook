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
        e.preventDefault();
        let buttonsContainer = e.target.parentElement;
        let postContent = buttonsContainer.parentElement.children[1];
        let editBtn = e.target;
        let cancelBtn = buttonsContainer.children[1];
        let postId = buttonsContainer.parentElement.id;
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
        e.preventDefault();
        let buttonsContainer = e.target.parentElement;
        let postContent = buttonsContainer.parentElement.children[1];
        let deleteBtn = e.target;
        let editBtn = buttonsContainer.children[1];
        let postId = buttonsContainer.parentElement.id;
        if (deleteBtn.innerHTML === "Delete") {
            const req = {
                id : postId,
            }
            fetch("http://localhost:3001/DeletePost",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(req)
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) { alert("Successfully deleted post"); }
                else { alert("Failed to delete post"); }
            })
            window.location.reload();
        }
        else{
            postContent.blur();
            postContent.contentEditable = false;
            editBtn.innerHTML = "Edit";
            deleteBtn.innerHTML = "Delete";
        }
    }

    render(){
        if (this.state.isDisabled === false) {
            return(
                <div className="other-post" id={this.props.id}>
                    <p>{this.state.author}</p>
                    <p contentEditable={false}>{this.state.content}</p>
                    <p>{this.state.date}</p>
                    <div className="post-buttons-container">
                        <button disabled={this.state.isDisabled} id="edit-post"  className="post-buttons" onClick={this.editPost}>Edit</button>
                        <button disabled={this.state.isDisabled} id="delete-post" className="post-buttons" onClick={this.deletePost}>Delete</button>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="other-post" id={this.props.id}>
                    <p>{this.state.author}</p>
                    <p contentEditable={false}>{this.state.content}</p>
                    <p>{this.state.date}</p>
                </div>
            )
        }
        
    }
}

export default UserPost;