const Sequelize = require('sequelize'); //import the Sequelize package

const sequelize = new Sequelize('workoutlog', 'postgres', 'okinawa96', { //create an instance of Sequelize w/ sequelize variable, create new seqqulize object; identify db to connect to, username, password
    host: 'localhost', // host points to the local port for Sequelize. This is 5432.
    dialect: 'postgres' //identify the QL dialect being used. Could be MSSQL, SQLLite, or others
});

sequelize.authenticate().then( //use sequelize variable to access methods, call authenticate() method, authenticate() returns a promise (use .then)
    function() { //fire a function that shows if we are connected
        console.log('Connected to workoutlog postgres database');
    },
    function(err){ //find an error if there are any errors
        console.log(err);
    }
);

module.exports = sequelize; //export the module