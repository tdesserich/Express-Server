module.exports = function(sequelize, DataTypes) {

    return sequelize.define('user', { //a function with a Sequelize object that calls define method, first parameter that creates a users table in Postgres
        username: DataTypes.STRING, //username will be a column in table
        passwordhash: DataTypes.STRING //passwordhash will be a column in table
    });
};