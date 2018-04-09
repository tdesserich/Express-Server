//module is exported to allow Sequelize to create the tests table with the testdata column the next time the server connects to the database and a user makes a POST request that uses the model.
module.exports = function(sequelize, DataTypes) { //run an anonymous function that has two parameters: sequelize and DataTypes. The function will return the value of what is created by sequelize.define
    return sequelize.define('test', { //use the sequelize object to call the define method, which will map model properties in server file to a table in Postgres; test will become table called tests in Postgres 
        testdata: DataTypes.STRING //testdata is a key and will become a column in database; datatypes must be in string format
    });
};