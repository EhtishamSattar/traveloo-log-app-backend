// this middle ware will autheticate the request made by user and will check if the user is valid or not
// for the request (the user session will be maintained in locat storage of browser)
//

const jwt=require("jsonwebtoken");

const JWT_SECRET="$sham";
const fetchUser=async (req,res,next)=>{
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