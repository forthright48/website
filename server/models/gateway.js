var mongoose = require ( "mongoose" ),
    express = require ( "express" );

var schema = new mongoose.Schema({
    name: 'string',
    oj: "string"
});

var Gate = mongoose.model("Gateway", schema );

var router = express.Router();

router.get ( "/gateway", getAllProblems );
router.post ( "/auth/gateway", addProblem );
router.delete ( "/auth/gateway/:p_id", deleteProblem );
router.post ( "/auth/gateway/:p_id", editProblem );

module.exports = function ( app ) {
    app.use ( "/api", router );
}

/********************Implementation*********************/

function getAllProblems ( req, res ) {
    Gate.find({},function( err, data ){
        if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Gateway database"});
        else res.json ( data );
    });
}

function addProblem ( req, res ) {
    if ( !req.body ) return res.status ( 500 ).send ( {error: "Something happened while posting in Gateway"});
    Gate.create ( {
        name: req.body.name,
        oj: req.body.oj,
    }, function ( err, data ) {
        if ( err ) res.status ( 500 ).send ( {error: "Something happened while creating in Gateway"});
        else res.json ( data );
    });
}

function deleteProblem ( req, res ) {
    Gate.remove ( {_id: req.params.p_id }, function ( err, data ) {
        if ( err ) return res.status ( 500 ).send ( {error: "Server Side Delete Error"} );
        else res.send ( "Successfully Deleted" );
    })
}

function editProblem ( req, res ) {
    Gate.findOne( { _id: req.params.p_id }, function ( err, data ) {
        if ( err ) return res.status ( 500 ).send ( {error : "Database Retrieval Problem"} );
        else {

            data.name = req.body.name;
            data.oj = req.body.oj;

            data.save(function (err){
                if ( err ) return res.status ( 500 ).send ( {error: "Server Side Saving Error"} );
                else return res.status ( 200 ).send ( {msg: "Successfully Saved"} );
            })
        }
    })
}
