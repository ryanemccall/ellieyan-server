require ('dotenv').config()
const Express = require('express');
const app = Express()
// const {sequelize} = require('./db')


//const port = 3000


 ;(async () => {
    // try{
    //     await sequelize.authenticate();
    //     console.log('Server is working')
    // } catch (error) {
    //     console.log('Server is failing', error)
    // }
    // sequelize.sync({force: true})
    app.use(require('./middleware/Headers'));
    app.use(Express.json())

    const user = require('./controllers/User')
    const post = require('./controllers/Post')
    const comment = require('./controllers/Comment')
    const profile = require('./controllers/Profile')
    const like = require('./controllers/Likes')
    const favorite = require('./controllers/Favorites')
    app.use('/user', user);
    app.use('/post', post);
    app.use('/comment', comment);
    app.use('/profile', profile);
    app.use('/like', like);
    app.use('/favorite', favorite);


    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on port: ${process.env.PORT}.`)
    })
})()
