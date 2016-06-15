'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	http = require('http').Server(app),
    io = require('socket.io')(http),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	ioHandler = require('./app/controllers/ioHandler.server.js');

var app = express();

require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	secret: 'secretMealOrder', // secretMealOrder
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);
io.on('connection', ioHandler);

var port = process.env.PORT || 8080;
var ioPort = process.env.IOPORT || 8081;

app.listen(port, function () {
	console.log('Express listening on port ' + port + '...');
});

http.listen(ioPort, function () {
	console.log('Socket.io listening on port ' + ioPort + '...');
});