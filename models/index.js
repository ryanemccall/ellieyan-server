// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefinePosts = require('./Posts')
const DefineComment = require('./Comment')
const DefineFavorites = require('./Favorites')


const User = DefineUser(sequelize, DataTypes); // Defines the model
const Posts = DefinePosts(sequelize, DataTypes);  // Defines the model
const Comment = DefineComment(sequelize, DataTypes); 
const Favorites = DefineFavorites(sequelize, DataTypes);
// Define Associations
// User.hasMany(Post)
// Post.belongsTo(User)

// Sync
synceDb(sequelize, true)


module.exports = { User, Posts, Comment, Favorites }