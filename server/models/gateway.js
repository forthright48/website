var mongoose = require ( "mongoose" ),
    express = require ( "express" );

var schema = new mongoose.Schema({
    section: "number",
    chapter: "number",
    parent: "string",
    ind: "number",
    type: "string",
    name: "string",
    body: "string",
    platform: "string",
    pid: "string",
    link: "string",
    hint: "string"
});

var Gate = mongoose.model("Gateway", schema );

var router = express.Router();

router.get ( "/gateway/:section/:chapter", getProblems );
router.get ( "/gateway", getAllProblems );
router.get ( "/gateway/:parent", getChildren);
router.post ( "/auth/gateway", addProblem );
router.delete ( "/auth/gateway/:p_id", deleteProblem );
router.post ( "/auth/gateway/:p_id", editProblem );

module.exports = function ( app ) {
    app.use ( "/api", router );
}

/********************Implementation*********************/

function getProblems ( req, res ) {
    Gate.find({ section : req.params.section, chapter : req.params.chapter },function( err, data ){
        if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Gateway database"});
        else res.json ( data );
    });
}

function getAllProblems ( req, res ) {
    Gate.find({},function( err, data ){
        if ( err ) res.status ( 500 ).send ( {error: "Something occured when dealing with Gateway database"});
        else res.json ( data );
    });
}

function getChildren ( req, res ) {
    console.log(req.params.parent);
    Gate.find({ parent : req.params.parent },function( err, data ){
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
    data.section= req.body.section;
    data.chapter= req.body.chapter;
    data.parent = req.body.parent;
    data.ind = req.body.ind;
    data.type = req.body.type;
    data.name = req.body.name;
    data.body = req.body.body;
    data.platform = req.body.platform;
    data.pid = req.body.pid;
    data.link = req.body.link;
    data.hint = req.body.hint;
    return data;
}
