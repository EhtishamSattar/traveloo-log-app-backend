const mongoose=require('mongoose');
const mongooseURI='mongodb://127.0.0.1:27017/travelooBackend';

const connectDb=()=>{
    console.log("in function");
    mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}

module.exports=connectDb;