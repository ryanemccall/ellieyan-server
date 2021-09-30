const Express = require("express");
const router = Express.Router();
const Auth = require('../middleware/Auth')
const { User, Post, } = require('../models');

//CREATE POST
router.post('/', Auth, async(req, res) => {
    
    try {
        const post = await Post.create({
                postTitle: req.body.post.postTitle,
                content: req.body.post.content,
                UserId: req.user.id
            }) 
            res.status(200).json({
                message:'Post made!', 
                post: post})
        }  catch (err) {
    res.status(500).json({
        message: "Failed to create Post"
    })
}
})
//GET POSTS FOR USER
router.get("/myPosts", Auth, async(req, res) => {
    let u = await User.findOne({
        where: {
            id: req.user.id
        }
    })
    let posts = u ? await u.getPosts(): null
    if (posts){
        let cleanPosts = posts.map(p => {
            const {id, postTitle, content } = p
            return { id, postTitle, content }
        })
        res.send(cleanPosts)
    } else {
        res.send(posts)
    }
})

//GET ONE POST
router.get('/:id', Auth, async (req, res) => {
    const { id } = req.params 
    try {
        const post = await Post.findOne({ where: {id: id }})
        if (post.length === 0) {
            res.status(404).json({
                message: "No post could be found."
            })
        } else {
            res.status(200).json({
                message: `Here is the post: ${post}`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'There seems to be an issue',
            error: err
        })
    }
})

//GET ALL POSTS
router.get('/all', async (req, res) => {
    try {
        const allPosts = await Post.findAll()
        if (allPosts.length === 0) {
            res.status(404).json({
                message: 'There are no posts at this time'
            })
        } else {
            res.status(200).json({
                message: 'Here is the feed',
                allPosts: allPosts
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error',
            error: err
        })
    }
})

//UPDATE POSTS

router.put("/:id", Auth, async (req, res) => {
    const { postTitle, content } = req.body.post
    const query = {
        where: {
            id: req.params.id,
            UserId: req.user.id,
        }
    };

    const updatePost = {
        postTitle: postTitle,
        content: content,
    }
    
    try {
        const update = await Post.update(updatePost, query);
        res.status(200).json({
            message: "Your Post has been updated!",
            update: update
        });
    } catch (err) {
        res.status(500).json({
            message: `Sorry, there was an issue updating your post: ${err}`
        })
    }
})

//DELETE POSTS

router.delete("/delete/:id", Auth, async (req, res) => {
    const owner = req.user.id;
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
                UserId: owner
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