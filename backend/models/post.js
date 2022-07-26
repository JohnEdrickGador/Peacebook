import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: {type: String, required: true},
    author: {type: String}
});


mongoose.model("Post", PostSchema);