require ('dotenv').config()
const Express = require('express');
const app = Express()
// const {sequelize} = require('./db')


const port = 3000


//const controllers = require("./controllers");

 

//  app.use(Express.json());



 //app.use(require('./middleware/Auth'));
 //app.use('/post', controllers.Posts);
 //app.use('/comment', controllers.Comment);
 //app.use('/favorites', controllers.Favorites);

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
    app.use('/user', user);

    app.listen(port, () => {
        console.log(`[Server]: App is listening on 3000.`)
    })
})()
