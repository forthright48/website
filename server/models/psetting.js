var mongoose = require ( "mongoose" ),
    express = require ( "express" );

var schema = new mongoose.Schema({
    index: 'number',
    name: 'string',
    usedIn: 'string',
    link: "string"
});

var Psetting = mongoose.model("Psetting", schema );

var router = express.Router();

router.get ( "/psetting", getAllProblems );
router.post ( "/auth/psetting", addProblem );
router.delete ( "/auth/psetting/:p_id", deleteProblem );
router.post ( "/auth/psetting/:p_id", editProblem );

module.exports = function ( app ) {
    app.use ( "/api", router );
}

/********************Implementation*********************/

function getAllProblems ( req, res ) {
    Psetting.find({},function( err, data ){
        if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Psettings database"});
        else res.json ( data );
    });
}

function addProblem ( req, res ) {
    if ( !req.body ) return res.status ( 500 ).send ( {error: "Something happened while posting in Psettings"});
    Psetting.create ( {

        index: req.body.index,
        name: req.body.name,
        usedIn: req.body.usedIn,
        link: req.body.link

    }, function ( err, data ) {
        if ( err ) res.status ( 500 ).send ( {error: "Something happened while creating in Psettings"});
        else res.json ( data );
    });
}

function deleteProblem ( req, res ) {
    Psetting.remove ( {_id: req.params.p_id }, function ( err, data ) {
        if ( err ) return res.status ( 500 ).send ( {error: "Server Side Delete Error"} );
        else res.send ( "Successfully Deleted" );
    })
}

function editProblem ( req, res ) {
    Psetting.findOne( { _id: req.params.p_id }, function ( err, data ) {
        if ( err ) return res.status ( 500 ).send ( {error : "Database Retrieval Problem"} );
        else {

            data.index = req.body.index;
            data.name = req.body.name;
            data.usedIn = req.body.usedIn;
            data.link = req.body.link;

            data.save(function (err){
                if ( err ) return res.status ( 500 ).send ( {error: "Server Side Saving Error"} );
                else return res.status ( 200 ).send ( {msg: "Successfully Saved"} );
            })
        }
    })
}
