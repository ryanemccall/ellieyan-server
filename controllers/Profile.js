const router = require('express').Router()
const Auth = require('../middleware/Auth')
const { User, Profile } = require('../models')

router.get('/all', Auth, async (req, res) => {
    try {
        const all = await Profile.findAll()
        res.status(200).json(all)
    } catch (err) {
        res.status(500).json({err})
    }
})

router.get('/user/:uid', Auth, async (req, res) => {
    try {
        //Eager
        const user = await User.findOne({
            where: {id: req.params.uid },
            include: Profile
        })
        res.status(200).json(user.Profile)
    } catch (err) {
        res.status(500).json({err})
    }
})

router.get('/', Auth, async (req, res) => {
    try {
        const oneP = await Profile.findOne({ where: { UserId: req.user.id }})
        res.status(200).json(oneP)
    } catch (err) {
        res.status(500).json({err})
    }
})

router.post('/', Auth, async (req, res) => {
    try {
        const result = await Profile.create({
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName,
            aboutMe: req.body.profile.aboutMe,
            birthDate: req.body.profile.birthDate,
            UserId: req.user.id
        })
        res.status(200).json('Profile has been created', result)
    } catch (err) {
        res.status(500).json({ err })
    }
})

module.exports = router;