
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
                content: {
                    type: DataTypes.STRING
                },
                likes: {
                    type: DataTypes.INTEGER
                },
            
    })
    return Comment
}