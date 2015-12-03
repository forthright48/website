var express = require("express"),
    app = express(),
    path = require ( "path" ),
    mongoose = require ( "mongoose" ),
    bodyParser = require ( "body-parser");

app.use ( express.static ( path.join( __dirname, "public" ) ) );
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
mongoose.connect ( "mongodb://localhost:27017/myapp" );

require ( "./models/psetting.js")(app);


app.get("/", function( req, res ) {
    res.sendFile( path.join( __dirname, "public", "home.html") );
})

app.listen(48, function() {
    console.log("Listening on port 48");
});
