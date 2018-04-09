var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        var sessionToken = req.headers.authorization; //var created to hold token, pulled from auth header of request coming in
        console.log(sessionToken) //for debugging purposes - should not be left in final code for security reasons
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' }); //403 error message if no token provided
        else { //only tokens get checked, prevents unauthorized use of a token that was asigned to different user
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => { //verify method decodes the token with provided secret, then sends a callback with two variables. If successful, decoded will contain the decoded payload; if not, decoded remains undefined. err is null by default
                if(decoded){
                    User.findOne({where: { id: decoded.id}}).then(user => { //if decoded has a value, sequelize uses findOne method to look for id in the users table
                        req.user = user; //callback sets the user value for the request as the id value passed to it then sends the request on to its next destination. This property will be necessary later in adding to the database
                        next();
                    },
                    function(){ //If no matching id is found, an error message is thrown
                        res.status(401).send({error: 'Not authorized'});
                    });
                } else { //If no value for decoded, an error message is thrown
                    res.status(400).send({error: 'Not authorized'});
                }
            });
        }
    }
}