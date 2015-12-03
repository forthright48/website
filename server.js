var express = require("express"),
    app = express(),
    path = require ( "path" );

app.use ( express.static ( path.join( __dirname, "public" ) ) );

app.get("/", function( req, res ) {
    res.sendFile( path.join( __dirname, "public", "home.html") );
})

app.listen(48, function() {
    console.log("Listening on port 48");
});
