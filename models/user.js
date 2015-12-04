var mongoose = require ( "mongoose" ),
    express = require ( "express" ),
    jwt = require ( "jwt-simple");

var schema = new mongoose.Schema ( {
    username: "string",
    password: "string"
});

var router = express.Router();

var User = mongoose.model ( "User", schema );

router.post ( "/login", function ( req, res ) {
    User.find( { _id: res.body._id }, function ( err, user ){
        if ( err ) res.status ( 500 ).send ( {error: "Something wrong with database connection"} );

        if ( !user ) {
            res.json( {success: false, msg: "User not found." } );
        }else {
            ///Check if password matches
            if ( user.password != req.body.password ) {
                res.json ( {success: false, msg: "Password Doesn't Match"});
            }
            else { ///Mathces
                ///Create a token
                var token = jwt.encode ( user, app.get("superSecret"), {
                    expiresIn: "24h"
                });

                res.json( {
                    success: true,
                    msg: "Here is your token",
                    token: token
                });
            }
        }
    });
});

module.exports = function ( app ) {

};
