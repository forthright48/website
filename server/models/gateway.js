var mongoose = require ( "mongoose" ),
    express = require ( "express" );

var schema = new mongoose.Schema({
    ind: "number",
    type: "string",
    textTitle: "string",
    textBody: "string",
    platform: "string",
    pid: "string",
    name: "string",
    link: "string",
    hint: "string"
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

    var sync = {};
    Gate.create ( syncSchema ( sync, req ), function ( err, data ) {
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

            syncSchema ( data, req );

            data.save(function (err){
                if ( err ) return res.status ( 500 ).send ( {error: "Server Side Saving Error"} );
                else return res.status ( 200 ).send ( {msg: "Successfully Saved"} );
            })
        }
    })
}

// Syncs db data with req body
function syncSchema ( data, req ) {
    data.ind = req.body.ind;
    data.type = req.body.type;
    data.textTitle = req.body.textTitle;
    data.textBody = req.body.textBody;
    data.platform = req.body.platform;
    data.pid = req.body.pid;
    data.name = req.body.name;
    data.name = req.body.name;
    data.link = req.body.link;
    data.hint = req.body.hint;

    return data;
}
