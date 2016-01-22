// set up ======================================================================
var express  = require('express');
var app      = express(); 							
var mongoose = require('mongoose'); 					
var port  	 = process.env.PORT || 8080; 				
var database = require('./config/database'); 			
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


app.use(express.static(__dirname + '/public')); 		
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 


var db = mongoose.connection;

db.on('connecting', function() {
    console.log('connecting');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('connected', function() {
    console.log('connected!');
});

db.once('open', function() {
    console.log('connection open');
});

db.on('reconnected', function () {
    console.log('reconnected');
});

db.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+database.url);
    mongoose.connect(database.url, {server:{auto_reconnect:true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
  });
console.log('dbURI is: '+ database.url);
mongoose.connect(database.url, {server:{auto_reconnect:true}});


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
console.log(database.url);