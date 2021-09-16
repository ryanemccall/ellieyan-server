const Express = require("express");
const router = Express.Router();
const Auth = require('../middleware/Auth')
const { Posts, Comment } = require('../models');

//CREATE COMMENT
router.post('/comment/', Auth, async(req, res) => {
    const owner = req.user.id;
    const postId = req.params.id;
    const commentEntry = {
        postId: postId,
        content,
        userId: owner
    }
    try {
        let p = await Posts.findOne({ where: {id: req.body.id }})
        if(p) {
            let comment = await Comment.create(commentEntry);
            res.status(200).json({
                comment,
                message: "Comment made!"
            });
        } else {
            res.status(405).json({
                message: "Can't make comment, post not found"
        })
    }
} catch (err) {
    res.status(500).json({
        message: "Failed to create comment"
    })
}
})
//GET COMMENTS
router.get("/comment/all/:id", Auth, async(req, res) => {
    let p = await Posts.findOne({
        where: {
            id: req.params.id
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

router.put("/comment/:id", Auth, async (req, res) => {
    const { content } = req.body.post
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id,
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

router.delete("/comment/delete/:id", Auth, async (req, res) => {
    const owner = req.user.id;
    const commentId = req.params.id;

    try {
        const query = {
            where: {
                id: commentId,
                userId: owner
            },
        };

        await Comment.destroy(query);
        res.status(200).json({ message: "Comment has been removed."})
    } catch (err) {
        res.status(500).json( `There was an issue removing your comment: ${err}`)
    }
})

module.exports = router