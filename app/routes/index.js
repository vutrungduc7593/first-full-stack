'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var FoodHandler = require(path + '/app/controllers/foodHandler.server.js');

module.exports = function(app, passport) {

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

	var clickHandler = new ClickHandler();
	var foodHandler = new FoodHandler();

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
		.get(foodHandler.getFoods)
		.post(foodHandler.addFood);

	app.route('/api/foods/:id')
		.get(foodHandler.getFood)
		.put(foodHandler.updateFood)
		.delete(foodHandler.deleteFood);
};
