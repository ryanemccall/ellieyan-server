const Express = require("express");
const router = Express.Router();
const Auth = require('../middleware/Auth')
const { User, Post, Comment } = require('../models');

//CREATE COMMENT
router.post('/post/:pid', Auth, async(req, res) => {
   try {
     const post = await Post.findOne({where: { id: req.params.pid }})  
        if (post) {
            const comment = await Comment.create({
                content: req.body.comment.content,
                UserId: req.user.id,
                PostId: req.params.pid
            })
            res.status(200).json({
                message: 'Comment made',
                comment: comment
            })
        } else {
            res.status(405).json({
                message: "There doesn't seem to be a post to comment on"
            })
        }
} catch (err) {
    res.status(500).json({
        message: "Failed to create comment"
    })
}
})
//GET COMMENTS
router.get("/all/post/:pid", Auth, async(req, res) => {
    let p = await Post.findOne({
        where: {
            id: req.params.pid
        }
    })
    let comments = p ? await p.getComments(): null
    if (comments){
        let cleanComments = comments.map(c => {
            const {id, content } = c
            return { id, content }
        })
        res.send(cleanComments)
    } else {
        res.send(comments)
    }
})

//UPDATE POSTS

router.put("/post/:pid/user/:uid/:cid", Auth, async (req, res) => {
    const { content } = req.body.comment
    const query = {
        where: {
            id: req.params.cid,
            PostId: req.params.pid,
            UserId: req.params.uid
        }
    };

    const updateComment = {
        content: content,
    }
    
    try {
        const update = await Comment.update(updateComment, query);
        res.status(200).json({
            update,
            message: "Your Comment has been updated!"
        });
    } catch (err) {
        res.status(500).json({
            message: `Sorry, there was an issue updating your comment: ${err}`
        })
    }
})

//DELETE POSTS

router.delete("/delete/:id", Auth, async (req, res) => {
    const owner = req.user.id;
    const commentId = req.params.id;

    try {
        const query = {
            where: {
                id: commentId,
                UserId: owner
            },
        };

        await Comment.destroy(query);
        res.status(200).json({ message: "Comment has been removed."})
    } catch (err) {
        res.status(500).json( `There was an issue removing your comment: ${err}`)
    }
})

module.exports = router