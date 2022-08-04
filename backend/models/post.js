import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: {type: String, required: true},
    authorId: {type: String},
    authorName: {type: String},
    date: {type: Date}
});


mongoose.model("Post", PostSchema);