require ('dotenv').config()
const express = require('express')
const app = express()
const {sequelize} = require('./db')

;(async () => {
    try{
        await sequelize.authenticate();
        console.log('Server is working')
    } catch (error) {
        console.log('Server is failing', error)
    }
    sequelize.sync({force: true})
})()

const port = 3000
 const auth = require('./middleware/Auth');

 app.use('/', auth)

app.listen(port, () => {
    console.log(`[Server]: App is listening on 3000.`)
})