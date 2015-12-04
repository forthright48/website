var mongoose = require ( "mongoose" ),
    express = require ( "express" );

var schema = new mongoose.Schema({
    index: 'number',
    name: 'string',
    usedIn: 'string'
});

var Psetting = mongoose.model("Psetting", schema );

var router = express.Router();
router.get( "/psetting", function ( req, res ) { ///Asking for list of Problems
    Psetting.find({},function( err, data ){
        if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Psettings database"});
        else res.json ( data );
    });
}).post ( "/psetting", function ( req, res ) { ///Adding a new problem
    if ( !req.body ) res.status ( 500 ).send ( {error: "Something happened while posting in Psettings"});
    Psetting.create ( { index: req.body.index, name: req.body.name, usedIn: req.body.usedIn }, function ( err, data ) {
        if ( err ) res.status ( 500 ).send ( {error: "Something happened while creating in Psettings"});
        res.json ( data );
    });
}).delete ( "/psetting/:p_id", function ( req, res ) { ///Deleting a problem
    Psetting.remove ( {_id: req.params.p_id }, function ( err, data ) {
        if ( err ) res.status ( 500 ).send ( {error: "Server Side Delete Error"} );
        res.send ( "Successfully Deleted" );
    })
});

module.exports = function ( app ) {
    app.use ( "/api", router );
}
