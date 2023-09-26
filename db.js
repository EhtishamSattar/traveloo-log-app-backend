const mongoose=require('mongoose');
const mongooseURI='mongodb://localhost:27017/inotebook';

const connectToMongoose=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongoose successfully");
    })
}
module.exports=connectToMongoose;