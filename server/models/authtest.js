module.exports = function(sequelize, DataTypes) {
    return sequelize.define('authtestdata', {
        authtestdata: DataTypes.STRING, //providing two properties: authtestdata and owner
        owner: DataTypes.INTEGER //owner is a number, a foreign key, that will point to a specific user on the users table
    });
};