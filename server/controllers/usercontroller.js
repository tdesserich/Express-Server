var express = require('express') //bring in Express
var router = express.Router()   //new variable router, uses express variable to access Router() method
var sequelize = require('../db'); //bring in sequelize
var User = sequelize.import('../models/user'); //import user model and store in User variable
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); //bring in jwt


/*********************************
** Create User Endpoint: Starter***
***********************************/
// router.post('/createuser', function (req, res) { //use post method to create '/createuser' endpoint

//   var username = "The Dude";
//   var pass = "therugtiedtheroomtogether";  

//   User.create({
//     username: username, 
//     passwordhash: pass

//   }).then(
//     function message(){
//       res.send("I hate The Eagles, man");
//     }
//   );
// })

/*********************************
** Refactor***
***********************************/
router.post('/createuser', function (req, res) {

    var username = req.body.user.username;
    var pass = req.body.user.password;
  
    User.create({
      username: username,
      passwordhash: bcrypt.hashSync(pass, 10)
  
    }).then(
      function createSuccess(user) {
          var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); 

        res.json({
          user: user,
          message: 'created', //sends a message that object was created along with object itself
          sessionToken: token
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
  });


router.post('/signin', function(req, res) { //use post because we are sending data
            
    User.findOne( { where: { username: req.body.user.username } } ) //findOne is Sequelize method; where is username column
        .then( //promise is handled with a .then function
            function (user) {
                if (user) { //check to see that a match for user was found
                    bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                        // use the callback function from the compare() method. If username and password are a match, this will be set to true, and the expression in the conditional will execute
                        if (matches) { 
                            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 }); //Upon success, create a new token for session. Note that this code uses the same jwt.sign method that we used upon sign up
                            res.json({  //will return with success mesage and session token
                                user: user,
                                message: "successfully authenticated",
                                sessionToken: token
                            });
                        } else { 
                            res.status(502).send({ error: "you failed, yo" });
                        }
                    });
                } else {
                    res.status(500).send({ error: "failed to authenticate" });
                }
            },       
  
            function (err) {
                res.status(501).send({ error: "no user found" }); //function called if promise is rejected (user is not found)
            }
        );
    });
  
module.exports = router;