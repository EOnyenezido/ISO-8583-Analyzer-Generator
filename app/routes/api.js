var User = require('../model/user.js'); // grab our user model
var config = require('../../config.js'); // grab our configuration
var jwt = require('jsonwebtoken');

// We are not grabbing app or express because we want to pass them as variables when we grab api.js from our main server.js
// We would do this by wrapping the code in module.exports as a function
module.exports = function(app, express)	{
	// Main api route
var apiRouter = express.Router();

// Authentication and tokenization route accessed at POST http://localhost:8080/authenticate
apiRouter.post('/authenticate', function(req, res)	{
	// Find the user
	// Select a user, specifying the password explicitly so the database returns it
	User.findOne({username: req.body.username}).select('name username password approved').exec(function(err, user)	{
		// Unknown errors
		if (err) throw err;
		// No user with that username was found
		if (!user)	{
			res.json({success: false, message: 'Authentication failed, user not found.'});
		}
		else if (user)	{
			var validPassword = user.comparePassword(req.body.password);
			// Password is wrong
			if (!validPassword)	{
				res.json({success: false, message: 'Authentication failed, wrong password.'});
			}
			else if (!user.approved) {
				res.json({success: false, message: 'Authentication failed, user has not yet been approved.'});
			}
			else	{
				// Password is correct
				// Create a token
				var token = jwt.sign({name: user.name, username: user.username}, config.secret, {expiresIn: 86400}); // expires in 24 hours

				// Send the token
				res.json({
					success: true,
					message: 'User authenticated successfully',
					token: token
				});
			}
		}
	});
})

apiRouter.route('/users')
	// Create a user (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res)	{
		// Create a new instance of the user model
		var user = new User();
		// Set the users information from the request
		user.name = req.body.name;
		user.email = req.body.email;
		user.username = req.body.username;
		user.password = req.body.password;
		user.approved = true;
		user.isAdmin = false;
		// Save the user and check for errors
		user.save(function(err)	{
			if (err) {
				// Duplicate entry
				if (err.code == 11000)	{
					return res.json({success: false, message: 'A user with that username already exists!'});
				}
				else	{
					return res.send(err);
				}
			}
			res.json({success: true, message: 'Access successfully granted. Redirecting to dashboard...'})
		});
	})

// Middleware for our API route
apiRouter.use(function(req, res, next)	{
	// Verifying the token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	if (token)	{

		//Verify the token
		jwt.verify(token, config.secret, function(err, decoded)	{
			// Wrong token
			if (err)	{
				res.status(403).send({success: false, message: 'Failed to authenticate token, incorrect or expired token'});
			}
			else	{
				// If everything is good pass on to other routes
				req.decoded = decoded;

				next();
			}
		})
	}
	else
		// no token
	res.status(403).send({success: false, message: 'No token provided'});
});

apiRouter.get('/', function(req, res)	{
	res.json({ message: 'Welcome to our API!'});
});

apiRouter.get('/me', function(req, res)	{
	res.send(req.decoded);
});

// More api routes to be added here
apiRouter.route('/users')
	// Get all the users
	.get(function(req, res)	{
		User.find(function(err, users)	{
			if (err)	res.send(err);
			//return the users
			res.json(users);
		});
	});

apiRouter.route('/username/:user_name')
	// Get the user with that username
	.get(function(req, res)	{
		User.findOne({username: req.params.user_name}, function(err, user)	{
			if (err) res.send(err);
			// Return the user with that username if found
			res.json(user);
		})
	})

apiRouter.route('/users/:user_id')
	// Get user with the user id specified
	.get(function(req, res)	{
		User.findById(req.params.user_id, function(err, user)	{
			if (err) res.send(err);
			// Return the user with the id
			res.json(user);
		});
	})
	// Update a user's details using his specified id
	.put(function(req, res)	{
		// Use our model to find the user
		User.findById(req.params.user_id, function(err, user)	{
			if (err) res.send(err);

			// Make sure the user details are not NULL or empty before saving
			if (req.body.name) user.name = req.body.name;
			if (req.body.email) user.email = req.body.email;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			if (req.body.isAdmin != null) user.isAdmin = req.body.isAdmin;
			if (req.body.isApproved != null) user.approved = req.body.isApproved;

			user.save(function(err)	{
				if (err) res.send(err);
				// Return a message
				res.send({message: 'User updated successfully!'});
			});
		});
	})
	// Delete a user with a specified id
	.delete(function(req, res)	{
		// Remove the user
		User.remove({_id: req.params.user_id}, function(err, user)	{
			if (err) return res.send(err);

			// Send a message
			res.send({message: 'User successfully deleted!'});
		});
	});


	return apiRouter;
	// end Module.export
};