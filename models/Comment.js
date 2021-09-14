const { DataTypes } = require("sequelize");

const db = require('../db')

const Comment = db.define('comment', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // postAuth: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // commAuth: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    content: {
        type: DataTypes.STRING
    },
    upVotes: {
        type: DataTypes.INTEGER
    },
    downVotes: {
        type: DataTypes.INTEGER
    },

})

module.exports = Comment;