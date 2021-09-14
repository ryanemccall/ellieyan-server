const { DataTypes } = require("sequelize");

const db = require('../db')

const Posts = db.define('posts', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(500),
    },
    upVotes: {
        type: DataTypes.INTEGER
    },
    downVotes: {
        type: DataTypes.INTEGER
    },
    commentCount: {
        type: DataTypes.INTEGER
    }

})