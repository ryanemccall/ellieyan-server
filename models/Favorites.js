
module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("Favorites", {
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
    })
        return Favorites
}