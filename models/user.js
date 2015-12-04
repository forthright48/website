var mongoose = require ( "mongoose" ),
    express = require ( "express" );

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
            ///Check if password match
        }
    });
});

module.exports = function ( app ) {

};
