const router = require('express').Router();
const fetchuser = require('../Middlewares/fetchuser');
const Post = require('../Models/Post')


router.get('/getPosts', fetchuser, async (req, res) => {

        // these are all the posts created by all the users
        const posts=await Post.find();

        // the result contains username and email of the user who created the post
        const result = await Post.aggregate([
            {
              $lookup: {
                from: 'users', // Replace with the actual name of the User collection
                localField: 'post_author',
                foreignField: '_id',
                as: 'user_data'
              }
            },
            {
              $unwind: '$user_data'
            },
            {
              $project: {
                'post.title': 1,
                'post.description': 1,
                'user_data.username': 1,
                'user_data.email': 1,
                _id: 0 // Exclude _id field
              }
            }
          ]);
          
          console.log(posts,result);
          return res.json({posts});
          
})

router.post('/createPost', fetchuser, async (req, res) => {
    let success = false;
    try {
        const { title, description, post_author } = req.body;
        console.log(title, description, post_author);

        if (!title || !description || !post_author) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const post = new Post({
            post_title: title,
            post_content: description,
            post_author: post_author,
        })
        const savedPost = await post.save();
        if (savedPost) {
            success = true;
        }

        res.json({ success, savedPost });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/updatePost/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, url, status } = req.body;
        if (!title || !description || !url || !status) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        let newPost = {};
        newPost.title = title;
        newPost.description = description;
        newPost.url = url;
        newPost.status = status;
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true });
        res.json({ post });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/deletePost/:id', fetchuser, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        post = await Post.findByIdAndDelete(req.params.id);
        res.json({ success: "Post Deleted", post: post });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;