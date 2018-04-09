var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var AuthTestModel = sequelize.import('../models/authtest');

/*************************************
* GET ALL ITEMS FOR INDIVIDUAL USER
*************************************/
router.get('/getall', function (req, res) {
    var userid = req.user.id;

    AuthTestModel
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

/*************************************
* POST SINGLE ITEM FOR INDIVIDUAL USER
*************************************/
router.post('/create', function (req, res) {
    var owner = req.user.id;
    var authTestData = req.body.authtestdata.item;

    AuthTestModel
        .create({ //create adds an item to the table with the userid from the token
            authtestdata: authTestData,
            owner: owner
        })
        .then(
            function createSuccess(authtestdata) {
                res.json({
                    authtestdata: authtestdata
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

/******************
* GET SINGLE ITEM FOR INDIVIDUAL USER
******************/
router.get('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

/*********************************
* DELETE ITEM FOR INDIVIDUAL USER
*********************************/
                       
        router.delete('/delete/:id', function(req, res) { //We specify what we're doing in our endpoint to make it easy for the user to know what's happening. The :id allows a parameter to be passed through the URL to the server so we can use it later
            var data = req.params.id; //This is the parameter passed through the URL
            var userid = req.user.id; //our userid, set when validate-session is called
        
            AuthTestModel
                .destroy({ //.destroy() is a Sequelize method to remove an item from a database
                    where: { id: data, owner: userid } //tell Sequelize what to look for in trying to find an item to delete. If nothing matches exactly, nothing is done
                }).then(
                    function deleteLogSuccess(data){ //Callback function. This response is sent when the delete is successful
                        res.send("you removed a log");
                    },
                    function deleteLogError(err){ //Callback function. This response is sent when the delete is unsuccessful
                        res.send(500, err.message);
                    }
                );
        });

/******************
* UPDATE ITEM FOR INDIVIDUAL USER
******************/

       router.put('/update/:id', function(req, res) { //put is HTTP verb that means update; we use update in our route. We also allow a variable (id) to be passed through the URL again
        var data = req.params.id; //the parameter taken from the URL
        var authtestdata = req.body.authtestdata.item; //data went into the database replacing what already existed 
    
        AuthTestModel
            .update({ //update is sequelize method that takes two arguments
                authtestdata: authtestdata //First argument of update. Contains an object holding the new value we want to edit into the database
            },
            {where: {id: data}} //Second argument of update. Tells Sequelize where to place the new data if a match is found
            ).then(
                function updateSuccess(updatedLog) { //Callback function. Runs if update is successful, and returns the data entered.
                    res.json({
                        authtestdata: authtestdata
                    });            
                },
                function updateError(err){ //Callback function. Runs if update is not successful, and returns the error message.
                    res.send(500, err.message);
                }
            )
    });        

module.exports = router;