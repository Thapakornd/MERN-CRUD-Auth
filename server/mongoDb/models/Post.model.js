import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    author: { type:Schema.Types.ObjectId, ref: 'User'},
},
{
    timestamps: true,
})

const Post = mongoose.model('Post', postSchema);

export default Post;