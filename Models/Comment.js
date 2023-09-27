const Mongoose = require("mongoose");

// this is Comment's Schema

const CommentSchema = new Mongoose.Schema({
    comment_content: {
        type: String,
        required: true,
    },
    comment_author: {
        type: String,
        required: true,
    },
    comment_date: {
        type: Date,
        default: Date.now,
    },
    comment_to_post: {
        type: Mongoose.Schema.Types.ObjectId, // Reference to Post's ObjectId
        ref: 'Post', // Reference to the Post collection
        required: true,
    },});

module.exports = Mongoose.model("Comment", CommentSchema); // Export the model  