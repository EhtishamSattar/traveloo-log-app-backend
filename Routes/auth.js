const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const JWT_SECRET="$sham";

router.post("/signUp", [
    body("username", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 6 }),

], async (req, res) => {

    let success = false;	
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    // if it finds the email , 400 status will be displayed
    if (user) {
        return res.status(400).json({ success, error: "Sorry, A user with this email exists" });
    }

    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = User.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    success=true;

    const data={
        user:{
            id:user.id
        }
    }
    const id=user._id;

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({id,username,email,success, authToken});


});

router.post('/login',[
    body("username", "Please enter a valid name").isLength({ min: 3 }),
    body("email","Enter a valid Email").isEmail(),
    body("password","Password cant be blank").exists()
],async (req,res)=>{

    console.log(req.body);
    let success=false;
    let errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    try 
    {
        const {username,email,password}=req.body;
        let user=await User.findOne({email});
        console.log(user);
        const id=user._id;
        if(!user)
        {
            success=false;
            return res.status(400).json({success,error:'Invalid Email'});
        }

       // user from the findone function , that user password is compared with the entered 
       //password
        const passwordCompare=await bcrypt.compare(password,user.password);

        if(!passwordCompare)
        {
            success=false;
            return res.status(400).json({success,error:'Incorrect Password'});
        }

    
        const data={
            user:{

                id:user.id
            }
        }
        
        success=true;
    
        var authToken = jwt.sign(data, JWT_SECRET);
        console.log(username,email);
        res.json({id,username,email,success,authToken});

    }catch (error) {
        res.status(500).send('Internal server error');
    }

})

module.exports=router;