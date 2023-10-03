const router = require ('express').Router();
const fetchUser=require('../middleware/fetchUser');
const Post = require('../Models/Post')

router.get('/getPosts',fetchUser,async (req,res)=>{
    try{
        const post=await Post.find({user:req.user.id});
        res.status(200).json({post});

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})  

router.post('/createPost',fetchUser,async (req,res)=>{
    try{
        const {title,description,url,status}=req.body;
        if(!title || !description || !url || !status)
        {
            return res.status(400).json({error:"Please fill all the fields"});
        }
        const post=new Post({
            title,description,url,status,user:req.user.id
        })
        const savedPost=await post.save();
        res.json({savedPost});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/updatePost/:id',fetchUser,async (req,res)=>{
    try{
        const {title,description,url,status}=req.body;
        if(!title || !description || !url || !status)
        {
            return res.status(400).json({error:"Please fill all the fields"});
        }
        let newPost={};
        newPost.title=title;
        newPost.description=description;
        newPost.url=url;
        newPost.status=status;
        let post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send("Not Found");
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        post=await Post.findByIdAndUpdate(req.params.id,{$set:newPost},{new:true});
        res.json({post});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}); 

router.delete('/deletePost/:id',fetchUser,async (req,res)=>{
    try{
        let post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send("Not Found");
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        post=await Post.findByIdAndDelete(req.params.id);
        res.json({success:"Post Deleted",post:post});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}   );
