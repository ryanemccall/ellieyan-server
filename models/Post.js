

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(500),
        },
        likes: {
            type: DataTypes.INTEGER
        }
    })
    return Post
}