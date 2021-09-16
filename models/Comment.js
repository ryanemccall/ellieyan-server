
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
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
    return Comment
}