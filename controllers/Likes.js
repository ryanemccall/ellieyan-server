const Express = require("express");
const router = Express.Router();
const Auth = require('../middleware/Auth')
const { User, Post, } = require('../models');

//Like A Post
router.post('/user/:uid/post/:pid', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.uid }})
        const post = await Post.findOne({ where: {id: req.params.pid }})

        const like = await user.addpLikee(post)
        res.status(200).json({
            message: "Post has been liked",
            like: like 
        })
    } catch (err) {
        res.status(500).json({
            message: "There was an issue liking the post",
            error: err 
        })
    }
})

//Unlike a Post
router.delete('/user/:uid/post/:pid', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.uid }})
        const unlike = await user.removepLikee(req.params.pid)
        res.status(200).json({
            message: "Post has been liked",
            unlike: unlike 
        })
    } catch (err) {
        res.status(500).json({
            message: "There was an issue liking the post",
            error: err 
        })
    }
})

//Like a Comment
router.post('/user/:uid/comment/:cid', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.uid }})
        const comment = await Comment.findOne({ where: {id: req.params.cid }})

        const like = await user.addcLikee(comment)
        res.status(200).json({
            message: "Post has been liked",
            like: like 
        })
    } catch (err) {
        res.status(500).json({
            message: "There was an issue liking the post",
            error: err 
        })
    }
})

//Unlike a Comment
router.delete('/user/:uid/comment/:cid', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.uid }})
        const unlike = await user.removecLikee(req.params.cid)
        res.status(200).json({
            message: "Post has been liked",
            unlike: unlike 
        })
    } catch (err) {
        res.status(500).json({
            message: "There was an issue liking the post",
            error: err 
        })
    }
})