// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefinePost = require('./Post')
const DefineComment = require('./Comment')
const DefineFavorites = require('./Favorites')
const DefineProfile = require('./Profile')
const DefineRole = require('./Role')


const User = DefineUser(sequelize, DataTypes); // Defines the model
const Post = DefinePost(sequelize, DataTypes);  // Defines the model
const Comment = DefineComment(sequelize, DataTypes); 
const Favorites = DefineFavorites(sequelize, DataTypes);
const Profile = DefineProfile(sequelize, DataTypes);

// Define Associations
User.hasOne(Profile)
Profile.belongsTo(User) //One to One

 User.hasMany(Post)
Post.belongsTo(User) //one to Many

User.hasMany(Comment)
Comment.belongsTo(Post) //one to Many

User.hasMany(Favorites)
Favorites.belongsTo(User) //one to Many


User.belongsToMany(Post, {through: 'pLikes', as: 'pLikee'})
Post.belongsToMany(User, {through: 'pLikes', as: 'pLiker'}) //Many to Many

User.belongsToMany(Comment, {through: 'cLikes', as: 'cLikee'}) 
Comment.belongsToMany(User, {through: 'cLikes', as: 'cLiker'}) //Many to Many


// Sync
synceDb(sequelize, true)


module.exports = { User, Post, Comment, Favorites, Profile }