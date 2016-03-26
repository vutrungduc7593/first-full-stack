'use strict';

var Users = require('../models/users.js');
var HandleRes = require('../common/handleRes.js');

function UserHandler() {

    var handleRes = new HandleRes();
    
    this.getUsers = function(req, res) {
        Users
            .find({})
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Get list of users', result);
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