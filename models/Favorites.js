const { DataTypes } =require('sequelize');
const db = require('../db');

const Favorites = db.define('favorites', {
    gameTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gameInfo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gameImage: {
        type: DataTypes.STRING,

    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Favorites