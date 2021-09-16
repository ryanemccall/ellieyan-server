// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefinePost = require('./Post')
const DefineComment = require('./Comment')
const DefineFavorites = require('./Favorites')
const DefineProfile = require('./Profile')


const User = DefineUser(sequelize, DataTypes); // Defines the model
const Post = DefinePost(sequelize, DataTypes);  // Defines the model
const Comment = DefineComment(sequelize, DataTypes); 
const Favorites = DefineFavorites(sequelize, DataTypes);
const Profile = DefineProfile(sequelize, DataTypes);
// Define Associations
 User.hasMany(Post)
Post.belongsTo(User) //one to Many

User.hasOne(Profile)
Profile.belongsTo(User) //one to one


// Sync
synceDb(sequelize, true)


module.exports = { User, Posts, Comment, Favorites, Profile }