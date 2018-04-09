require('dotenv').config(); //can make items in the .env file available to whole application

var express = require('express'); //require the use of express npm packages we've installed in our dependencies
var app = express(); //we create an instance of Express (firing off a top-level Express function, a function exprted by the Express module), allows us to create an Express app
var test = require('./controllers/testcontroller'); //import route and store in variable test
var authTest = require('./controllers/authtestcontroller'); //imported the authtestcontroller file for access to the endpoints
var user = require('./controllers/usercontroller'); //import the usercontroller file
var sequelize = require('./db') //import route and store in variable sequelize
var bodyParser = require('body-parser'); //pull in body-parser library and store in bodyParser variable



sequelize.sync(); //use sequelize variable to call .sync() - this method will ensure we sync all defined models to the DB

app.use(bodyParser.json()); //tells the application that we want json to be used as we process this request.

app.use(require('./middleware/header')); //activate headers in this file

/******************
 * EXPOSED ROUTES
*******************/
app.use('/test', test); //call app.use and add test to base URL

app.use('/api/user', user); //call app.use and add set up a route to endpoints for api/user route

// app.use('/api/test', function(req, res){
//     res.send("This is data from the /api/test endpoint. It's from the server."); // when we get the /api/test endpoint we fire off Express function res.send
//     //res handles packaging the response object, .send method sends off the response
// });


/******************
 * PROTECTED ROUTES
*******************/

app.use(require('./middleware/validate-session')); //imported validate-session middleware which will check to see if incoming request has a token
app.use('/authtest', authTest); //Anything beneath the validate-session will require a token to access, thus becoming protected. Anything above it will not require a token, remaining unprotected

app.listen(3000, function(){ //use express to start a UNIX socket and listen for connections on the given path, which is localhost:3000
    console.log('App is listening on 3000.') //call a callback function when the connection happens with a simple console.log
});


