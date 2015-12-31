var express = require("express"),
    app = express(),
    path = require ( "path" ),
    mongoose = require ( "mongoose" ),
    bodyParser = require ( "body-parser"),
    secret = process.env.OPENSHIFT_SECRET_TOKEN || require("./secret.js").secret, ///Secret object
    expressjwt = require ( "express-jwt"),
    http = require ( "http" );

// Set constants
app.set ( "superSecret", secret );
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 48 );
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

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

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/myapp';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect ( 'mongodb://'+connection_string );

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
