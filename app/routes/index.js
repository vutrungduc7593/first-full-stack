'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var FoodHandler = require(path + '/app/controllers/foodHandler.server.js');
var TableHandler = require(path + '/app/controllers/tableHandler.server.js');
var RestaurantHandler = require(path + '/app/controllers/restaurantHandler.server.js');
// new Handler

module.exports = function(app, passport) {

	var clickHandler = new ClickHandler();
	var foodHandler = new FoodHandler();
	var tableHandler = new TableHandler();
	var restaurantHandler = new RestaurantHandler();
    // new Handler Instance

	var auth = function(req, res, next) {
		if (req.headers.authorization) {
			var auth = req.headers.authorization.split(' ');
			// var name = auth[0]; (Auth type: Basic - Http basic auth, Bearer - OAuth 2.0 with Bearer Tokens)
			var encoded = auth[1];
			var decoded = new Buffer(encoded, 'base64').toString('utf8');
			var id = decoded.split(':')[0];
			var secret = decoded.split(':')[1];

			if (id === process.env.API_KEY_ID && secret === process.env.API_KEY_SECRET) {
				return next();	
			}
		}
		
		res.sendStatus(401);
	};

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function(req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/web/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.github);
		});

	app.route('/web/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

	app.route('/api/*')
		.all(auth);

	app.route('/api/foods')
		.get(foodHandler.getDocs)
		.post(foodHandler.addDoc);

	app.route('/api/foods/:id')
		.get(foodHandler.getDoc)
		.put(foodHandler.updateDoc)
		.delete(foodHandler.deleteDoc);
		
	app.route('/api/tables')
		.get(tableHandler.getDocs)
		.post(tableHandler.addDoc);

	app.route('/api/tables/:id')
		.get(tableHandler.getDoc)
		.delete(tableHandler.deleteDoc);
		
	app.route('/api/restaurants')
		.get(restaurantHandler.getDocs)
		.post(restaurantHandler.addDoc);

	app.route('/api/restaurants/:id')
		.get(restaurantHandler.getDoc)
		.put(restaurantHandler.updateDoc)
		.delete(restaurantHandler.deleteDoc);

    // new Route
	
};
