const Express = require("express");
const router = Express.Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//REGISTER
router.post('/register', async (req, res) => {
    let { username, email, password } = req.body.username;

    try {
        const User = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 15)
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 12});
       
        res.status(200).json({
            message: `Thanks for signing up! Welcome ${req.body.username}`,
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use. Try signing in with email."
            });
        } else {
            res.status(500).json({
                message: "Something went wrong. Please try again."
            });
        }
    }
   
});

// USER LOGIN

router.post('/login', async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const loggedInUser = await User.findOne({
            where: {
                username: username,
            },
        });
        if (loggedInUser) {
            let passwordCompare = await bcrypt.compare(password, loggedInUser.password);
        
            if (passwordCompare) {
                let token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 12 });

                res.status(200).json({
                    user: loggedInUser,
                    message: `Welcome back, ${loggedInUser.username}`,
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Username or Password is incorrect."
                })
            }
        } else {
            res.status(401).json({
                message: "Username or Password is incorrect."
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Sorry! Something went wrong. Make sure you are registered with us."
        })
    }
});

module.exports = router;