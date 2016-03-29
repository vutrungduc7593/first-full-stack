'use strict';

var Users = require('../models/users.js');
var HandleRes = require('../common/handleRes.js');
var request = require('request');

function GcmHandler() {

    var count = 0;
    var countSuccess = 0;
    var sendItems = 0;

    var handleRes = new HandleRes();

    var send = function(id) {
        count++;
        countSuccess++;
    };

    this.register = function(req, res) {

        if (!req.body.gcmId)
            return handleRes.error(res, new Error('Not found gcmId'));

        // Directly find element in array
        Users.find({
                gcmIds: req.body.gcmId
            })
            .exec(function(err, users) {
                if (err) return handleRes.error(res, err);

                if (users.length === 0) {
                    var newUser = new Users();
                    newUser.gcmIds.push(req.body.gcmId);
                    Users.create(newUser, function(err, result) {
                        if (err) return handleRes.error(res, err);
                        handleRes.send(res, 'Register Successful', result._id);
                    });
                }
                else {
                    handleRes.send(res, 'Register Successful', users[0]._id);
                }
            });
    };

    this.unregister = function(req, res) {
        if (!req.body.gcmId)
            return handleRes.error(res, new Error('Not found gcmId'));

        Users.remove({
                gcmIds: req.body.gcmId
            })
            .exec(function(err, result) {
                if (err) return handleRes.error(res, err);
                handleRes.send(res, 'Unregister Successful', result.result.n);
            });
    };

    this.pushNotification = function(req, res) {

        if (!req.body.gcmId)
            return handleRes.error(res, new Error('Not found gcmId'));

        Users.find({})
            .exec(function(err, users) {
                if (err) return handleRes.error(res, err);

                var gcmIds = [];
                for (var i = 0, len = users.length; i < len; i++) {
                    var ids = users[i].gcmIds;
                    for (var j = 0, jLen = ids.length; j < jLen; j++)
                        gcmIds.push(ids[j]);
                }
                gcmIds.splice(gcmIds.indexOf(req.body.gcmId), 1);

                count = 0;
                countSuccess = 0;
                sendItems = gcmIds.length;

                for (i = 0, len = gcmIds.length; i < len; i++) {
                    send(gcmIds[i]);

                    if (count === sendItems) {
                        handleRes.send(res, 'Send Complete', countSuccess);
                    }
                }
            });
    };

    this.pushNewOrder = function(order) {
        
        order.populate('_food', function (err, populatedOrder) {
            if (err) return console.error(err);
            
            console.log(populatedOrder);
            
            request({
                method: 'POST',
                uri: 'https://android.googleapis.com/gcm/send',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=' + process.env.GCM_KEY
                },
                body: JSON.stringify({
                    to: '/topics/global',
                    data: {
                        message: 'NEW_ORDER',
                        data: populatedOrder
                    }
                })
            },
            function(error, response, body) {
                if (error) return console.error(error);
                //console.log('Push success');
            }
        );
                
        });
        
    };

}

module.exports = GcmHandler;