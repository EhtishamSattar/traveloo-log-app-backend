const Mongoose = require("mongoose"); // Import mongoose dependency

// this is Post's Schema

const PostSchema = new Mongoose.Schema({
    post_title: {
        type: String,
        required: true,
    },
    post_content: {
        type: String,
        required: true,
    },
    post_author: {
        type: Mongoose.Schema.Types.ObjectId, // Reference to User's ObjectId
        ref: 'User', // Reference to the User collection
        required: true,
    },
    post_date: {
        type: Date,
        default: Date.now,
    },
    post_last_modified: {
        type: Date,
        default:null,
    },
    post_likes: {
        type: Number,
        default: 0,
    },
    post_comments: {
        type: Number,
        default: 0,
    },
    post_image: {
        type: Buffer, // Store image as binary data
        default: null,
    },
});


module.exports =Mongoose.model("Post", PostSchema); // Export the model