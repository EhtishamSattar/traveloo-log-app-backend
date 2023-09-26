const connectToMongoose=require('./db');
const express=require('express');

const app=express();

app.use(express.json());

app.listen(5000,()=>{
    console.log("hey there! server is running at port 5000");
});


