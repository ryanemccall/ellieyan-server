const Express = require("express");
const router = Express.Router();
const Auth = require('../middleware/Auth')
const { User, Post, } = require('../models');

//CREATE POST
router.post('/create/', Auth, async(req, res) => {
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
            let post = await Post.create(postEntry);
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
//GET POSTS
router.get("/all/:id", Auth, async(req, res) => {
    let u = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    let posts = u ? await u.getPosts(): null
    if (posts){
        let cleanPosts = posts.map(p => {
            const {id, content } = p
            return { id, content }
        })
        res.send(cleanPosts)
    } else {
        res.send(posts)
    }
})

//UPDATE POSTS

router.put("/post/:id", Auth, async (req, res) => {
    const { postTitle, content } = req.body.post
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id,
        }
    };

    const updatePost = {
        postTitle: postTitle,
        content: content,
    }
    
    try {
        const update = await Post.update(updatePost, query);
        res.status(200).json({
            message: "Your Post has been updated!"
        });
    } catch (err) {
        res.status(500).json({
            message: `Sorry, there was an issue updating your post: ${err}`
        })
    }
})

//DELETE POSTS

router.delete("/post/delete/:id", Auth, async (req, res) => {
    const owner = req.user.id;
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
                userId: owner
            },
        };

        await Post.destroy(query);
        res.status(200).json({ message: "Post has been removed."})
    } catch (err) {
        res.status(500).json( `There was an issue removing your post: ${err}`)
    }
})

//Need to Like + Disklike and store that data
module.exports = router