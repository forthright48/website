var express = require("express"),
    app = express(),
    path = require ( "path" ),
    mongoose = require ( "mongoose" ),
    bodyParser = require ( "body-parser"),
    secret = require("./secret.js"), ///Secret object
    expressjwt = require ( "express-jwt");

// Set constants
app.set ( "superSecret", secret.secret );

// Set Middlewares
app.use ( express.static ( path.join( __dirname, "../public" ) ) ); // Serve Public Files
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded( { extended: true} ) ); // to support URL-encoded bodies
app.use ( "/api/auth", expressjwt({secret: secret.secret}) ); // Check for JWT in /api/auth and decode it in req.user

// Mongoose Connection Code
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
mongoose.connect ( "mongodb://localhost:27017/myapp" );

// Mongoose configuration with different tables
require ( "./models/psetting.js")(app); // Connect app with RESTful api for psetting
require ( "./models/user.js")(app); // Connect login and register API

// Send the angularJS view
app.get("/", function( req, res ) {
    res.sendFile( path.join( __dirname, "../public", "index.html") );
});

app.listen(48, function() {
    console.log("Listening on port 48");
});
