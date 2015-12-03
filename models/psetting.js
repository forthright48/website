var mongoose = require ( "mongoose" );

var schema = new mongoose.Schema({
    index: 'number',
    name: 'string',
    usedIn: 'string'
});

var Psetting = mongoose.model("Psetting", schema );

module.exports = function ( app ) {
    app.get ( "/api/psetting", function ( req, res ) {
        Psetting.find({},function( err, data ){
            console.log("I am asking for data");

            if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Psettings database"});
            else res.json ( data );
        });
    });

    app.post ( "/api/psetting", function ( req, res ) {
        if ( !req.body ) res.status ( 500 ).send ( {error: "Something happened while posting in Psettings"});

        Psetting.create ( {
            index: req.body.index,
            name: req.body.name,
            usedIn: req.body.usedIn
        }, function ( err, data ) {
            if ( err ) res.status ( 500 ).send ( {error: "Something happened while creating in Psettings"});
            res.json ( data );
        });
    });

    app.delete ( "/api/psetting/:p_id", function ( req, res ) {
        Psetting.remove ( {
            _id: req.params.p_id
        }, function ( err, data ) {
            if ( err ) res.status ( 500 ).send ( {error: "Server Side Delete Error"} );
            res.send ( "Successfully Deleted" );
        })
    });
}
