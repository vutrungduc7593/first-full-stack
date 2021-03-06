'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var FoodHandler = require(path + '/app/controllers/foodHandler.server.js');
var TableHandler = require(path + '/app/controllers/tableHandler.server.js');
var RestaurantHandler = require(path + '/app/controllers/restaurantHandler.server.js');
var OrderHandler = require(path + '/app/controllers/orderHandler.server.js');
var GcmHandler = require(path + '/app/controllers/gcmHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var CategoryHandler = require(path + '/app/controllers/categoryHandler.server.js');
var RoleHandler = require(path + '/app/controllers/roleHandler.server.js');
var PermissionHandler = require(path + '/app/controllers/permissionHandler.server.js');
// new Handler

module.exports = function(app, passport) {

	var clickHandler = new ClickHandler();
	var foodHandler = new FoodHandler();
	var tableHandler = new TableHandler();
	var restaurantHandler = new RestaurantHandler();
    var orderHandler = new OrderHandler();
    var gcmHandler = new GcmHandler();
    var userHandler = new UserHandler();
    var categoryHandler = new CategoryHandler();
    var roleHandler = new RoleHandler();
    var permissionHandler = new PermissionHandler();
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

    app.route('/api/orders')
    	.get(orderHandler.getDocs)
    	.post(orderHandler.addDoc);
    	
    app.route('/api/orders/:id')
    	.get(orderHandler.getDoc)
    	.put(orderHandler.updateDoc)
    	.delete(orderHandler.deleteDoc);
    	
    app.route('/api/orders/:id/pay')
    	.put(orderHandler.payOrder);
    	
    app.route('/api/login')
    	.post(userHandler.login);
    	
    app.route('/api/gcm/register')
    	.post(gcmHandler.register);
    
    app.route('/api/gcm/unregister')
    	.post(gcmHandler.unregister);
    	
    app.route('/api/gcm/push')
    	.post(gcmHandler.pushNotification);

    app.route('/api/categories')
    	.get(categoryHandler.getCategories)
    	.post(categoryHandler.addCategory);

    app.route('/api/categories/:id')
    	.get(categoryHandler.getCategory)
    	.put(categoryHandler.updateCategory)
    	.delete(categoryHandler.deleteCategory);

    app.route('/api/roles')
    	.get(roleHandler.getRoles)
    	.post(roleHandler.addRole);

    app.route('/api/roles/:id')
    	.get(roleHandler.getRole)
    	.put(roleHandler.updateRole)
    	.delete(roleHandler.deleteRole);

    app.route('/api/permissions')
    	.get(permissionHandler.getPermissions)
    	.post(permissionHandler.addPermission);

    app.route('/api/permissions/:id')
    	.get(permissionHandler.getPermission)
    	.put(permissionHandler.updatePermission)
    	.delete(permissionHandler.deletePermission);

    // new Route
	
};
