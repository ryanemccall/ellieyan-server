const Express = require("express");
const Post = require("../../../db-api/models/Post");
const router = Express.Router();
//let Auth = require('../middleware/Auth');
const { User, Posts } = require('../models');

//CREATE POST
router.post('/create/', async(req, res) => {
    // const newPost = new Posts(req.body);
     const { id } = req.user;
    const postEntry = {
        postTitle,
        content,
        userId: id
    }
    try {
        let u = await User.findOne({ where: {id: req.body.id }})
        if(u) {
            let post = await Posts.create(postEntry);
            res.status(200).json({
                post,
                message: "Post made!"
            });
        } else {
            res.status(405).json({
                message: "Can't make post, user not found"
        })
    }
} catch (err) {
    res.status(500).json({
        message: "Failed to create Post"
    })
}
})