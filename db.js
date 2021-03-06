const { Sequelize } = require('sequelize')

const sequelize = new Sequelize( process.env.DATABASE_URL,
    // process.env.DB_DBNAME,
    // process.env.DB_USER,
    // process.env.DB_PASS,
    //Can have change that heroku will track for environment
    {
        //host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: { 
                require: true,
                rejectUnauthorized: false
            }
        }
        //have to comment out dialectOptions to run on local
    }
)

async function synceDb(sequelize, options){
    const {force, alter } = options
    try {
        if (force) await sequelize.sync({force: true})
        else if (alter) await sequelize.sync({ alter: true})
        else await sequelize.sync()
    } catch (err){
        console.log(err)
    }
}

module.exports = {
    sequelize,
    synceDb
}