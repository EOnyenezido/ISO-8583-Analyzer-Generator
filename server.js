/*This is a the API for the ISO 8583 generator.
	Only users have been included.
	Author: Chukwuemeka Onyenezido*/

// BASE SETUP
// ==============================================

// CALL OUR NODE PACKAGES
var express = require('express'); // call express for routing
var bodyParser = require('body-parser'); // call body-parser for reading the headers of POST requests
var morgan = require('morgan'); // call morgan for logging requests to the console for debugging purposes
var mongoose = require('mongoose'); // call mongoose for connecting with our mongodb database
var path = require('path');
var config = require('./config'); // call our configuration file

// Import our user model
var User = require('./app/model/user.js');

// connect to our database
mongoose.connect(config.database);

// APP configuration
// Define our app using Express
var app = express();
// Use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure our app to handle cross domain - CORS - requests
app.use(function(req, res, next)	{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
		Authorization');
	next();
})

// Log all requests to the console for debugging purposes
app.use(morgan('dev'));

// Set static files location
// All frontend requests will be directed to this folder, nobody can access the root folder
app.use(express.static(__dirname + '/Public'));

// REGISTER OUR ROUTES
// ==============================================
// API
// ROUTES FOR OUR API
// ==============================================

// All our api routes
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// Main Catchall route - sends users to the angular frontend
// Must come after API routes

app.get('*', function(req, res)	{
	res.sendFile(path.join(__dirname + '/Public/index.html'));
});

// Create a our admin user
// Check if the admin user already exists
User.findOne({username: config.admin.username}, function(err, user)	{
	if (err) res.send(err);
	// If the admin user has not been created, create the admin user
	if (user == null) {
		var user = new User();
		// Set the admin user information from the config file or environment variable
		user.name = config.admin.name;
		user.email = config.admin.email;
		user.username = config.admin.username;
		user.password = config.admin.password;
		user.approved = true;
		user.isAdmin = true;
		// Save the user and check for errors
		user.save(function(err)	{
			if (err) {
				// Duplicate entry
				if (err.code == 11000)	{
					return;
				}
				else	{
					return console.log(err);
				}
			}
		});
	};
})


// START THE SERVER
// ==============================================
app.listen(config.port);
console.log('Come find me at ' + config.port);
