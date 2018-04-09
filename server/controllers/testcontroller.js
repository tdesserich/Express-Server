var express = require('express'); //require use of Express npm packages we've installed - import the Express framework, inside it the variable express - this instance becomes gateway to using Express methods
var router = express.Router();  //new variable router, uses express variable to access Router() method 
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test'); //import test model and store in TestModel variable

router.post('/one', function(req, res){ //use the Express router object to call the post() method, telling the server that incoming request has data in it; /one will be the endpoint
    res.send("Test one went through")
});


/****************************************
 * Controller Method #1: Simple Response
****************************************/
router.get('/', function (req, res) { //
  res.send('Hey!!! This is a test route!'); //inside callback function, we call res.send(). send() is express method that can be called on the res (response) object. Our response parameter is simple string.
});


/****************************************
 * Controller Method #2: Persisting Data
****************************************/
router.post('/two', function (req, res) {
    let testData = "Test data for endpoint two"; // testData will have a fixed string that we'll use every time a POST request comes in
  
    TestModel //use the TestModel variable to access the model we are using, gets us access to TestModel properties and Sequlelize methods 
      .create({ //creates an instance of the Test model and sends to db as long as date types match the model
        testdata: testData //testdata is the key in the object, represents column being used in table; pass value of testData down to satisfy the key/value pair for the model
      })
    res.send("Test two went through!")
  });


  /****************************************
 * Controller Method #3: req.body
****************************************/
router.post('/three', function(req, res) {
    var testData = req.body.testdata.item; //use req.body middleware provided by Express. req is request sent, body is where data is being held;  testdata is a property of body, while item is a property of testdata

    TestModel
        .create({ //create() is a Sequelize method - creates a SQL statement that will insert our data into the database
            testdata: testData
        })
    res.send('Test three went through')
});
  

/***********************************************
 * Controller Method #4: use this with Postman
************************************************/
router.post('/four', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
      .create({
        testdata: testData
      })
      .then( // returns a promise, forces the message to wait for the insert statement to finish 
        function message() { // callback function will print the success message to the console once testData is done running
         res.send("Test 4 went through!");
        }
      );
  });


/************************************
 * Route 5: Return data in a Promise
 ***********************************/
router.post('/five', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
      .create({
        testdata: testData
      })
      .then( // note that the .then is chained to .create()
        function message(data) { 
          res.send(data);  //returning data that was just added ('data' parameter could have any name)
        }
      );
  });


  /*********************************
 * Route 6: Return response as JSON
 ***********************************/
router.post('/six', function (req, res) {  //**this looks the same in Postman but is not the same to the computer */
    var testData = req.body.testdata.item;
    TestModel
      .create({
        testdata: testData
      })
      .then(
        function message(testdata) {
          res.json({ // packages our results as json
            testdata: testdata  //the same object that was added to the database is now being sent back to the client and stored in a testdata property.
          });
        }
      );
  });


/*************************
 * Route 7: Handle errors
 *************************/
router.post('/seven', function (req, res){ //use the Express router object to call the post() method, telling the server that incoming request has data in it; /seven will be the endpoint
    var testData = req.body.testdata.item; //use req.body middleware provided by Express. req is request sent, body is where data is being held;  testdata is a property of body, while item is a property of testdata
    TestModel //use the TestModel variable to access the model we are using, gets us access to TestModel properties and Sequelize methods
        .create({ //create() is a Sequelize method, creates an instance of the Test model and sends to db as long as date types match the model
            testdata: testData // We pass the value of testData down to satisfy the key/value pair for the model. The string that we are sending will be the value that's stored in the variable.
        })
        .then( // returns a promise, forces the message to wait for the insert statement to finish; the .then is chained to .create
            function createSuccess(testData) { // callback function will print the success message to the console once testData is done running
                res.json({ // packages our results as json
                    testdata: testData //the same object that was added to the database is now being sent back to the client and stored in a testdata property
                });
            },
            function createError(err) { // if the create() function returns an error, it will be picked up by the createError() method. That method will then send back a 500 error with a message
                res.send(500, err.message);
            }
        );
});

/************************************
* GET:  Get simple message from server
**************************************/
router.get('/helloclient', function (req, res) {
    res.send('This is a message from the server to the client.')
    })

/************************
 * GET:  /one
 ***********************/
router.get('/one', function(req, res) {

  TestModel
    .findAll({ //1
        attributes: ['id', 'testdata']
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

// router.get('/about', function(req, res){  // adding about to test route
//     res.send('This is an about route') // response is a string
// });

// router.get('/contact', function(req, res){ //contact route added to test
//     res.send({"user": "tracy", "email": "tracy@fakeemail.com" // returns a contact object
//     })
// })

// router.get('/projects', function(req, res){ //projects route added to test
//     res.send(['Project 1', 'Project 2']) //returns an array of projects
// })

// router.get('/mycontacts', function(req, res){ //mycontacts added to test
//     res.send([ // returns array of contact objects
//         {user: "kenn", email: "kenn@beastmode.com"},
//         {user: "aaron", email: "aaron@beastmode.com"},
//         {user: "quincy", email: "quincy@beastmode.com"},
//         {user: "tom", email: "tom@beastmode.com"}
//     ])
// })

module.exports = router; //export module for use outside of the file