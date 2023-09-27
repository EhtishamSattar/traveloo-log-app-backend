const Mongoose = require("mongoose")

// this is User's Schema
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
})

module.exports = Mongoose.model("User", UserSchema);
