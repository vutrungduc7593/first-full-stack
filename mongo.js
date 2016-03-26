'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/localdb');

var db = mongoose.connection;
var path = process.cwd();

var Users = require(path + '/app/models/users.js');

var gcmId = '';

db.on('open', function() {

    Users.find({
            gcmIds: gcmId
        })
        .exec(function(err, users) {
            if (err) return console.error(err);

            console.log(users);

            // if (users.length === 0) {
            //     var newUser = new Users();
            //     newUser.gcmIds.push(req.body.gcmId);
            //     Users.create(newUser, function(err, result) {
            //         if (err) return handleRes.error(res, err);
            //         handleRes.send(res, 'Register Successful', result._id);
            //     });
            // }

            // handleRes.send(res, 'Register Successful', users[0]._id);
        });

});