var express = require("express"),
    app = express(),
    path = require ( "path" ),
    mongoose = require ( "mongoose" ),
    bodyParser = require ( "body-parser"),
    secret = process.env.SECRET_TOKEN || require("./secret.js").secret, ///Secret object
    expressjwt = require ( "express-jwt"),
    http = require ( "http" );

// Set constants
app.set ( "superSecret", secret );
app.set('port', process.env.PORT || 48 );
//app.set('ip', process.env.IP || "127.0.0.1");

// Set Middlewareses
app.use ( express.static ( path.join( __dirname, "../public" ) ) ); // Serve Public Files
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded( { extended: true} ) ); // to support URL-encoded bodies
app.use ( "/api/auth", expressjwt({secret: secret}) ); // Check for JWT in /api/auth and decode it in req.user


/*****************/
/*MongoDB        */
/*****************/

// Mongoose Connection Code
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

mongoose.connect ( process.env.MONGOLAB_URI || require("./secret.js").db );

// Mongoose configuration with different tables
require ( "./models/psetting.js")(app); // Connect app with RESTful api for psetting
require ( "./models/user.js")(app); // Connect login and register API
require ( "./models/gateway.js")(app); // RESTful api for Gateway

/********************/

// Send the angularJS view
app.get("/", function( req, res ) {
    res.sendFile( path.join( __dirname, "../public", "index.html") );
});

app.listen ( app.get("port"), app.get("ip"), function() {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});
