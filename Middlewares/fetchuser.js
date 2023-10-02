const express=require("express");
const jwt=require("jsonwebtoken");

const JWT_SECRET="$sham";
const fetchUser=async (req,res)=>{
    const token=req.header("auth-token");
    if(!token)
    {
        res.status(401).json({error:"Please authenticate using a valid token"});
    }

    try{
        const data=await jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).json({error:"Please authenticate using a valid token"});
    }

}

module.exports=fetchUser;