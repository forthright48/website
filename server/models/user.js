var mongoose = require ( "mongoose" ),
    express = require ( "express" ),
    jwt = require ( "jsonwebtoken"),
    bcrypt = require ( "bcryptjs" ),
    secret = require("./../secret.js").secret;

var schema = new mongoose.Schema ( {
    username: "string",
    password: "string"
});

var router = express.Router();

var User = mongoose.model ( "User", schema );

router.post ( "/login", function ( req, res ) {
    User.findOne( { username: req.body.username }, function ( err, user ){
        if ( err ) return res.status ( 500 ).send ( {error: "Something wrong with database connection"} );

        if ( !user ) {
            return res.json( {success: false, msg: "User not found." } );
        }else {
            ///Check if password matches
            var pass = req.body.password;

            bcrypt.compare ( req.body.password, user.password, function ( err, match ) {
                if ( err ) return res.json( {success: false, msg: "Couldn't hash." } );

                if ( match == false ) return res.json ( {success: false, msg: "Password Doesn't Match"});
                else { ///Matches
                    ///Create a token
                    var token = jwt.sign ( user, secret, {
                        expiresIn: "24h"
                    });

                    return res.json( { success: true, msg: "Here is your token", token: token });
                }
            });
        }
    });
});

router.post ( "/register", function ( req, res ) {
    bcrypt.genSalt(12, function(err, salt) { // Create a random salt
        if ( err ) return res.status(500).send( "Salt creation failed" );
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            User.create ( { username: req.body.username, password: hash }, function ( err, data ) {
                if ( err ) return res.status(500).send ( "User Creation Error" );
                return res.send ( data );
            })
        });
    });
});

module.exports = function ( app ) {
    app.use ( "/api", router );
};
