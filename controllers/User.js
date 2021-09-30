const Express = require("express");
const router = Express.Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User} = require("../models/");

//REGISTER
router.post('/register', async (req, res) => {
    let { username, email, password, Role } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 15),
            Role: Role || 'User',
        });

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 12});
       
        res.status(201).json({
            message: `Thanks for signing up! Welcome!`,
            user: user,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use. Try signing in with email."
            });
        } else {
            res.status(500).json({
                message: "Something went wrong. Please try again.",
                err
            });
            console.log(err)
        }
    }
   
});

// USER LOGIN

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

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

//ADMIN GET ALL
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll()
        if (allUsers.length === 0){
            res.status(404).json({
                message: 'There are no users at this time'
            })
        } else {
            res.status(200).json({
                message: 'All the Users',
                allUsers: allUsers})
        }
    } catch (err) {
        res.status(500).json({
            message: `There was an issue: ${err}`
        })
    }
})

//ADMIN DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.destroy({where: { id: req.params.id }})
        if (deleteUser === 1) {
            res.status(200).json({
                message: 'User has been removed',
                deleteUser: deleteUser
            })
        } else {
            res.status(404).json('No user found')
        }
    } catch (err) {
        res.status(500).json({
            message: `There was an issue: ${err}`
        })
    }
})

module.exports = router;