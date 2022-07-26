import React from "react";

export default function Content() {
        return (
            <div className="content">
            <h1>Peacebook Posts</h1>
            <div className="user-post">
                <textarea placeholder="What's on your mind?"></textarea>
                <div className="btn-cont">
                    <button className="btn-post">Post</button>
                </div>
            </div>
            <div className="other-post">
                <p>This is the first post</p>
            </div>
            <div className="other-post">
                <p>This is the second post</p>
            </div>
            <div className="other-post">
                <p>This is the third post</p>
            </div>
        </div>
        )
}