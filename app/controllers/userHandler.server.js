'use strict';

var Users = require('../models/users.js');
var HandleRes = require('../common/handleRes.js');

function UserHandler() {

    var handleRes = new HandleRes();

    this.login = function(req, res) {
        Users
            .findOne({
                username: req.body.username,
                password: req.body.password
            })
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);

                if (result) {
                    result.populate('_role', function(err, populatedUser) {
                        if (err) return console.error(err);
                        handleRes.send(res, 'Login', populatedUser);
                    });
                } else {
                    handleRes.send(res, 'Login', result);
                }
            });
    };

    this.updateUser = function(req, res) {
        Users
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body, function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Update user', result._id);
            });
    };

}

module.exports = UserHandler;