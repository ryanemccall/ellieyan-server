

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        firstName: {
            type: DataTypes.STRING 
        },
        lastName: {
            type: DataTypes.STRING
        },
        aboutMe: {
            type: DataTypes.TEXT
        },
        birthDate: {
            type: DataTypes.DATEONLY
        }
    })
    return Profile
}