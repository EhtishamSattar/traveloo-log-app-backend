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
        type: String,
        required: true,
    },
    post_date: {
        type: Date,
        default: Date.now,
    },
    post_last_modified: {
        type: Date,
    },
    post_likes: {
        type: Number,
        default: 0,
    },
    post_comments: {
        type: Number,
        default: 0,
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId, // Reference to User's ObjectId
        ref: 'User', // Reference to the User collection
        required: true,
    },
    post_image: {
        type: String, // You can store the image URL or file path
    },
});


module.exports =Mongoose.model("Post", PostSchema); // Export the model